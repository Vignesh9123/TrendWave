"use server"
import {searchFromMedia, trendingInMedia} from '@/utils'
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import config, { systemPrompt } from "@/config";
import Valkey from 'ioredis';
import {z} from 'zod'
import { prisma } from "@/prisma";
import { auth } from "@/auth";
const google = createGoogleGenerativeAI({
  apiKey: config.geminiApiKey 
});
export interface Post{
    socialMedia:"X"|"YouTube"|"Reddit"
    creator:string
    url:string
    uid?:string
    content?:string
    upvotes?:number
    downvotes?:number
    views?:number
    title?:string
    image?:string[]
    createdAt:Date
    updatedAt?:Date
    sentiment?: 'positive' | 'neutral' | 'negative',
    comments?:number
}

const redis = new Valkey(config.redisUrl)
export const search = async (query: string) => {
  const session = await auth()
  const searchQuery = await prisma.searchQuery.upsert({
    where:{
        query:query.toLowerCase().trim()
    },
    update:{
        count:{
            increment:1
        }
    },
    create:{
        query:query.toLowerCase().trim(),
        count:1
    }
  })
  if(session?.user?.id){
    await prisma.userSearchHistory.upsert({
      where:{
        userId_searchQueryId:{
          userId:session.user.id,
          searchQueryId:searchQuery.id
        }
      },
      update:{
        count:{
          increment:1
        }
      },
      create:{
        userId:session.user.id,
        searchQueryId:searchQuery.id,
        count:1
      }
    })
  }
  
  // The above two db calls can be made in a worker for every 10 seconds to first cache the search query and user search history in redis and then sync them to the database 
  
  const cachedResponse = await redis.get(`search:${query.toLowerCase().trim()}`)
  if(cachedResponse){
    const timeSortedResponses = JSON.parse(cachedResponse)
    return {
      responses: timeSortedResponses
    }

  }

  const responses = await Promise.all([
    searchFromMedia({
      query,
      media:'X'
    }),
    searchFromMedia({
      query,
      media:'YouTube'
    }),
    searchFromMedia({
      query,
      media:'Reddit'
    })
  ])
  const timeSortedResponses = responses.flat(1).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  await redis.setex(`search:${query.toLowerCase().trim()}`,3600,JSON.stringify(timeSortedResponses))
  return {
    responses: timeSortedResponses
  }

}

export const trending = async() =>{
  const cachedResponse = await redis.get('trending')
  if(cachedResponse){
    const timeSortedResponses = JSON.parse(cachedResponse)
    return {
      responses: timeSortedResponses
    }
  }
  const responses = await Promise.all([
    trendingInMedia({
      media: 'X'
    }),
    trendingInMedia({
      media: 'YouTube'
    }),
    trendingInMedia({
      media: 'Reddit'
    })
    
  ])
  const timeSortedResponses = responses.flat(1).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  await redis.setex('trending',3600,JSON.stringify(timeSortedResponses))
  return {
    responses: timeSortedResponses
  }

}

export const getSentimentAnalysis = async (posts: Post[], query: string) => {
  const cachedResponse = await redis.get(`sentiment:${query.toLowerCase().trim() || 'trending'}`)
  if(cachedResponse){
    return JSON.parse(cachedResponse)
  }
  const model = google('gemini-2.0-flash-001')
  const {object} = await generateObject({
    model,
    system: systemPrompt,
    prompt: JSON.stringify(posts.map(post => {
      return {
        id: post.uid,
        content: post.content,
        title: post.title
      }
    })),
    schema:z.object({
      posts:z.array(z.object({
        id:z.string(),
        titleOrContent:z.string(),
        sentiment: z.enum(['positive', 'negative', 'neutral'])
      })),
      takeAways: z.string()
    })
  })

  const sentimentData = object?.posts.reduce((acc, post) => {
    acc[post.sentiment] += 1;
    return acc;
  }, { positive: 0, negative: 0, neutral: 0 } as { positive: number; negative: number; neutral: number });
  const overall = {
    positive: (sentimentData?.positive/posts.length)*100 || 0,
    negative: (sentimentData?.negative/posts.length)*100 || 0,
    neutral: (sentimentData?.neutral/posts.length)*100 || 0
  }
  console.log('object',{object,overall})
  await redis.setex(`sentiment:${query.toLowerCase().trim()}`,3595,JSON.stringify({posts:object?.posts,overall, takeAways: object?.takeAways.split('\n')}))
  return {posts:object?.posts,overall, takeAways: object?.takeAways.split('\n')}
}

export const getPopularSearches = async () => {
  const cachedResponse = await redis.get('popularSearches')
  if(cachedResponse){
    return JSON.parse(cachedResponse)
  }
  const popularSearches = await prisma.searchQuery.findMany({
    orderBy: {
      count: 'desc'
    },
    take: 10
  })
  await redis.setex('popularSearches',3600,JSON.stringify(popularSearches.map(searchQuery => searchQuery.query)))
  if( popularSearches && popularSearches.length > 0 ){
    return popularSearches.map(searchQuery => searchQuery.query)
  }
  return []
}

export const getSearchHistory = async () => {
  const session = await auth()
  if(!session?.user?.id){
    return []
  }
  const searchHistories = await prisma.userSearchHistory.findMany({
    where: {
      userId: session?.user?.id
    },
    include:{
      searchQuery: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5
  })
  console.log('searchHistories',searchHistories)
  if( searchHistories && searchHistories.length > 0 ){
    return searchHistories.map(searchHistory => searchHistory.searchQuery.query)
  }
  return []
}
