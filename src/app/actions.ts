"use server"
import {PrismaClient} from "@prisma/client"
import {searchFromMedia} from '@/utils'
export interface Post{
    socialMedia:"X"|"YouTube"|"Reddit"
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
//   const xData = await searchFromMedia({
//     query,
//     media:'X'
//   })
//   console.log('X: xData',xData)

//   // parse X data

//   const youtubeData = await searchFromMedia({
//     query,
//     media:'YouTube'
//   })

//   console.log('YT:', youtubeData)

//   // parse YT Data

//   const redditData =await searchFromMedia({
//     query,
//     media:"Reddit"
//   })

//   console.log('Reddit: ', redditData)

  // parse redditData

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

  return {
    responses
  }

}
