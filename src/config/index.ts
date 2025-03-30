import { google } from "googleapis";
import axios from "axios";
const config = {
    redisUrl: String(process.env.NEXT_PUBLIC_REDIS_URL),
    XApiKey: String(process.env.NEXT_PUBLIC_X_API_KEY),
    YouTubeApiKey: String(process.env.NEXT_PUBLIC_YOUTUBE_API_KEY)    
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

export default config
