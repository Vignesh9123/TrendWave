"use server"
import {PrismaClient} from "@prisma/client"
import {searchFromMedia, trendingInMedia} from '@/utils'
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject, generateText } from 'ai';
import config, { systemPrompt } from "@/config";
import {z} from 'zod'
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

const prisma = new PrismaClient()
export const search = async (query: string) => {
  await prisma.searchQuery.upsert({
    where:{
        query:query
    },
    update:{
        count:{
            increment:1
        }
    },
    create:{
        query:query,
        count:1
    }
  })
  // TODO:add redis logic

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
  return {
    responses: timeSortedResponses
  }

}

export const trending = async() =>{
  // TODO: Implement redis logic

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

  return {
    responses: timeSortedResponses
  }

}

export const getSentimentAnalysis = async (posts: Post[]) => {
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
  return {posts:object?.posts,overall, takeAways: object?.takeAways.split('\n')}
}
