import config, { youtube } from "@/config";
import axios from "axios";
import { xAxios, redditAxios } from "@/config";
import { Post } from "@/app/actions";

export const searchFromMedia = async ({query,media}: {query: string, media: 'X' | 'YouTube' | 'Reddit'}) => {
 try {
     switch (media) {
       case 'X':
           const xData = await searchFromX(query)
           console.log('X: xData',xData)
           /*
           {
      type: 'tweet',
      id: '1903850873551515716',
      url: 'https://x.com/hpnadig/status/1903850873551515716',
      twitterUrl: 'https://twitter.com/hpnadig/status/1903850873551515716',
      text: '#Mysuru has a great new restaurant that understands Italian, Mediterranean like no other in the region. \n' +
        '\n' +
        'Some beautiful execution of recipes - well sourced ingredients. Founded by a NRI couple, it’s a tremendous effort for a restaurant. https://t.co/WTIEi10Pte',
      source: 'Twitter for iPhone',
      retweetCount: 1,
      replyCount: 5,
      likeCount: 21,
      quoteCount: 0,
      viewCount: 2028,
      createdAt: 'Sun Mar 23 16:46:34 +0000 2025',
      lang: 'en',
      bookmarkCount: 7,
      isReply: false,
      inReplyToId: null,
      conversationId: '1903850873551515716',
      inReplyToUserId: null,
      inReplyToUsername: null,
      author: [Object],
      extendedEntities: [Object],
      card: null,
      place: {},
      entities: [Object],
      quoted_tweet: [Object],
      retweeted_tweet: null
    }
           */
          const parsedData = parseX(xData)
           return parsedData
         break;
       case 'YouTube':
        //    const youtubeData = await searchFromYoutube(query)
        //    console.log('YouTube: youtubeData',youtubeData)
           /*
           {
    kind: 'youtube#searchResult',
    etag: 'B7SoybbxGAu4vSRDOjLr8ic1UGQ',
    id: { kind: 'youtube#video', videoId: '2aYQvzYYaF8' },
    snippet: {
      publishedAt: '2025-03-29T11:15:00Z',
      channelId: 'UCE5ywHWaxPWJ9_NSevHaJ-g',
      title: '💥MYSURU SHATABDI EXPRESS 2.0 TRAVEL VLOG!!! CHENNAI to BENGALURU | Naveen Kumar',
      description: 'Journey Date - 14th March 2025 Follow me on Instagram https://www.instagram.com/naveen_kumar_vlogger/ #shatabdi #mysuru ...',
      thumbnails: [Object],
      channelTitle: 'Naveen Kumar',
      liveBroadcastContent: 'none',
      publishTime: '2025-03-29T11:15:00Z'
    }
  },
           */
        //    return youtubeData
         break;
       case 'Reddit':
           const redditData = await searchFromReddit(query)
           console.log('Reddit: redditData',redditData)
           /*
           {
    kind: 't3',
    data: {
      approved_at_utc: null,
      subreddit: 'india',
      selftext: '',
      author_fullname: 't2_ie9wf',
      saved: false,
      mod_reason_title: null,
      gilded: 0,
      clicked: false,
      title: 'Infosys lays off 700 at Mysuru campus: :"Bouncers, security personnel used," complain to Labour Ministry',
      link_flair_richtext: [Array],
      subreddit_name_prefixed: 'r/india',
      hidden: false,
      pwls: 6,
      link_flair_css_class: 'Business',
      downs: 0,
      thumbnail_height: 75,
      top_awarded_type: null,
      hide_score: false,
      name: 't3_1ijr1nz',
      quarantine: false,
      link_flair_text_color: 'dark',
      upvote_ratio: 0.99,
      author_flair_background_color: null,
      ups: 1101,
      total_awards_received: 0,
      media_embed: {},
      thumbnail_width: 140,
      author_flair_template_id: null,
      is_original_content: false,
      user_reports: [],
      secure_media: null,
      is_reddit_media_domain: false,
      is_meta: false,
      category: null,
      secure_media_embed: {},
      link_flair_text: 'Business/Finance',
      can_mod_post: false,
      score: 1101,
      approved_by: null,
      is_created_from_ads_ui: false,
      author_premium: false,
      thumbnail: 'https://b.thumbs.redditmedia.com/okicWgBIST7p3YJLdUUd0zSOTDJf5fXAplRAN4Hp2FM.jpg',
      edited: false,
      author_flair_css_class: null,
      author_flair_richtext: [],
      gildings: {},
      post_hint: 'link',
      content_categories: null,
      is_self: false,
      subreddit_type: 'public',
      created: 1738919922,
      link_flair_type: 'richtext',
      wls: 6,
      removed_by_category: null,
      banned_by: null,
      author_flair_type: 'text',
      domain: 'timesofindia.indiatimes.com',
      allow_live_comments: false,
      selftext_html: null,
      likes: null,
      suggested_sort: null,
      banned_at_utc: null,
      url_overridden_by_dest: 'https://timesofindia.indiatimes.com/technology/tech-news/infosys-lays-off-700-at-mysuru-campus-bouncers-security-personnel-used-complain-to-labour-ministry/articleshow/118008887.cms',
      view_count: null,
      archived: false,
      no_follow: false,
      is_crosspostable: false,
      pinned: false,
      over_18: false,
      preview: [Object],
      all_awardings: [],
      awarders: [],
      media_only: false,
      link_flair_template_id: '14165a30-316a-11e5-8f83-0ec07e44b9c3',
      can_gild: false,
      spoiler: false,
      locked: false,
      author_flair_text: null,
      treatment_tags: [],
      visited: false,
      removed_by: null,
      mod_note: null,
      distinguished: null,
      subreddit_id: 't5_2qh1q',
      author_is_blocked: false,
      mod_reason_by: null,
      num_reports: null,
      removal_reason: null,
      link_flair_background_color: '#f2d398',
      id: '1ijr1nz',
      is_robot_indexable: true,
      report_reasons: null,
      author: 'Indianopolice',
      discussion_type: null,
      num_comments: 131,
      send_replies: true,
      contest_mode: false,
      mod_reports: [],
      author_patreon_flair: false,
      author_flair_text_color: null,
      permalink: '/r/india/comments/1ijr1nz/infosys_lays_off_700_at_mysuru_campus_bouncers/',
      stickied: false,
      url: 'https://timesofindia.indiatimes.com/technology/tech-news/infosys-lays-off-700-at-mysuru-campus-bouncers-security-personnel-used-complain-to-labour-ministry/articleshow/118008887.cms',
      subreddit_subscribers: 2663016,
      created_utc: 1738919922,
      num_crossposts: 0,
      media: null,
      is_video: false
    }
  }
           */
           return redditData
         break;
     }
 } catch (error) {
    console.log(error)
    return []
 }
}

const searchFromX = async (query: string) => {
  try {
    const response = await xAxios.get(`/tweet/advanced_search?queryType=Top&query=${query}`)
    console.log('X:response.data',response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}


const searchFromYoutube = async (query: string) => {
  try {
    const response =  await youtube.search.list({
        part:["snippet" ],
        maxResults:5,
        q:query!,
        publishedAfter: new Date('2025-03-23T16:46:34+00:00').toISOString(),
               
    }, {params: {type:'video'}});
    console.log('YT:response.data',response.data)
    return response.data.items
  } catch (error) {
    console.log(error)
    return []
  }
}

const searchFromReddit = async (query: string)=>{
  try {
    const response = await redditAxios.get(`/search?q=${query}&limit=5`)
    // console.log('Reddit:response.data',response.data)
    return response.data.data.children
  } catch (error) {
    console.log(error)
    return []
  }
}

const parseX = (data: any) : Post[] => {
  const posts = data.map((item: any) => ({
    socialMedia: "X",
    url: item.url,
    uid: item.id.toString(),
    content: item.text,
    upvotes: item.likeCount,
    downvotes: 0,
    views: item.viewCount,
    image: item.extendedEntities.media.map((media: any) => media.media_url_https),
    createdAt: new Date(item.createdAt),
  }))
  return posts
}

const parseYoutube = (data: any) : Post[] => {
  const posts = data.map((item: any) => ({
    socialMedia: "YouTube",
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    uid: item?.id?.videoId,
    title: item?.snippet?.title,
    image: item.thumbnails.default.url,
    createdAt: new Date(item.createdAt),
  }))
  return posts
}
