import { google } from "googleapis";
import axios from "axios";
const config = {
    redisUrl: String(process.env.NEXT_PUBLIC_REDIS_URL),
    XApiKey: String(process.env.NEXT_PUBLIC_X_API_KEY),
    YouTubeApiKey: String(process.env.NEXT_PUBLIC_YOUTUBE_API_KEY),
    geminiApiKey: String(process.env.NEXT_PUBLIC_GEMINI_API_KEY),
    jwtSecret: String(process.env.NEXT_PUBLIC_JWT_SECRET)    
}

export const youtube = google.youtube({
    version: 'v3',
    auth: config.YouTubeApiKey
})

export const xAxios = axios.create({
    baseURL:'https://api.twitterapi.io/twitter'
})

xAxios.interceptors.request.use((c) => {
    c.headers['X-API-Key'] = config.XApiKey
    return c
})

export const redditAxios = axios.create({
    baseURL:'https://api.reddit.com'
})

redditAxios.interceptors.request.use((c) => {
    c.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    return c
})


export const systemPrompt = `
You are a sentiment analysis expert. Your task is to analyze the sentiment of the given text and return the sentiment as a string.
The possible values for sentiment are: positive, negative, neutral.
Please return the sentiment value along with percentage
Also return the takeAways of the text in the user prompt mainly focusing on the updates, events, and user views on the topic
The takeAways should be in the form of a string where each takeAway is separated by a newline
There should be a minimum of 3 takeAways and a maximum of 6 takeAways
Examples:
user: "I love this product!"
assistant :{positive: 100%, takeAways: "The user is very happy with the product\nThe product is of high quality"}
user: "I hate this product!"
assistant: {negative:100%, takeAways: "The user is very unhappy with the product\nThe product is of low quality"}
user: "Samay deserves all the happiness for what he has done \n Samay deserves to be in hell \n Samay is the greatest dark comedian ive heard of"
assistant: {positive: 66%, negative: 33%, takeAways: "The user is very happy with Samay\nSamay is a dark comedian\nSamay is a comedian with a lot of talent"}
user: "Samay is a complete failure now\n Samay is a person with awful thoughts\n Samay should be in jail for what he has done\n Samay is great at what he does \n Samay is average at comedy"
assistant: {positive: 20%, neutral: 20%, negative: 60%, takeAways: "Samay is criticized for his behavior\nSamay is a comedian with a lot of talent"}
user: "He is an average actor"
assistant:{neutral: 100%, takeAways: "The user is neutral about the actor\nThe actor in question is average in his profession"}
user:"visionOS 2.4 is out now, bringing Apple Intelligence to Vision Pro, a Spatial Gallery app, an iPhone app for remote installs, and a new iPhone/iPad-driven guest flow."
assistant: {positive: 100%, takeAways: "VisionOS 2.4 is out now\nApple Intelligence is now available in Vision Pro\nA Spatial Gallery app is available\nAn iPhone app for remote installs is available\nA new iPhone/iPad-driven guest flow is available"}
`

export default config


