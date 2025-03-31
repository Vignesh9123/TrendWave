import { youtube } from "@/config";
import { xAxios, redditAxios } from "@/config";
import { Post } from "@/app/actions";

export const searchFromMedia = async ({query,media}: {query: string, media: 'X' | 'YouTube' | 'Reddit'}) => {
 try {
     switch (media) {
       case 'X':
           const xData = await searchFromX(query)
          //  console.log('X: xData',xData)
          
          const parsedData = parseX(xData.tweets)
          console.log('X: parsedData',parsedData)
           return parsedData
         break;
       case 'YouTube':
           const youtubeData = await searchFromYoutube(query)
          //  console.log('YouTube: youtubeData',youtubeData)
          
          const parsedYoutubeData = parseYoutube(youtubeData)
          console.log('parsedYoutubeData',parsedYoutubeData)
           return parsedYoutubeData
         break;
       case 'Reddit':
           const redditData = await searchFromReddit(query)          
          const parsedRedditData = parseReddit(redditData)
          console.log('Reddit: parsedRedditData',parsedRedditData)
          return parsedRedditData
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
    // console.log('X:response.data',response.data)
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
        publishedAfter: new Date('2025-03-23T16:46:34+00:00').toISOString()        
    }, {params: {type:'video'}});
    const videoIds = response.data.items?.map((item)=>{
      return item.id?.videoId
    }).filter((i)=> i !== undefined)
    if(videoIds && videoIds.length > 0){
    const detailedResponse = await youtube.videos.list({
      part:["snippet", "contentDetails", "statistics"],
      id: videoIds as string[],
    })
    // console.log('Detailed response YT', detailedResponse.data.items)
    return detailedResponse.data.items
  }
  return []
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
    image: item?.extendedEntities?.media?.map((media: any) => media.media_url_https) || [],
    createdAt: new Date(item.createdAt),
    creator: item?.author?.userName
  }))
  return posts
}

const parseYoutube = (data: any) : Post[] => {
  const posts = data.map((item: any) => ({
    socialMedia: "YouTube",
    url: `https://www.youtube.com/watch?v=${item.id}`,
    uid: item?.id,
    title: item?.snippet?.title,
    upvotes: Number(item?.statistics?.likeCount),
    downvotes: 0,
    duration:convertDurationForYT(item?.contentDetails?.duration),
    views: Number(item?.statistics?.viewCount),
    image: [item?.snippet?.thumbnails?.maxres?.url || item?.snippet?.thumbnails?.default?.url],
    createdAt: new Date(item.snippet?.publishedAt),
    creator: item?.snippet?.channelTitle
  }))
  return posts
}

const convertDurationForYT = (duration: string) : string => {
  const durationRegex = /PT(\d+H)?(\d+M)?(\d+S)?/;
  const matches = duration.match(durationRegex);
  if (!matches) return '0';
  const hours = matches[1] ? matches[1].replace('H', '') : '0';
  const minutes = matches[2] ? matches[2].replace('M', '') : '0';
  const seconds = matches[3] ? matches[3].replace('S', '') : '0';
  return `${hours}h ${minutes}m ${seconds}s`;
};

const parseReddit = (data: any) : Post[] => {
  const posts = data.map((item: any) => ({
    socialMedia: "Reddit",
    url: `https://www.reddit.com${item.data.permalink}`,
    uid: item.data.id,
    title: item.data.title,
    upvotes: item.data.ups || 0,
    downvotes: item.data.downs || 0,
    views: item.data.view_count || 0,
    creator: item.data.subreddit_name_prefixed,
    createdAt: new Date(new Date(0).setUTCSeconds(item.data.created_utc)),
  }))
  return posts
}


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

   /*
           {
    kind: 'youtube#video',
    etag: '2ap0QRUxB1do8s2PsBxgRcXjp-Q',
    id: '-X3Wf5TVU-I',
    snippet: {
      publishedAt: '2025-03-28T10:15:00Z',
      channelId: 'UCotI-SqRXnkAZX4bMqlRNjw',
      title: 'Samay Raina displays SHOCKING expression at his second APPEARANCE before the Maharashtra Cyber Cell',
      description: "Stand-up comedian and YouTuber Samay Raina appeared before officials of the Maharashtra Cyber Cell on Friday, March 28, in connection with the controversial India's Got Latent case. Samay, who had been out of India, returned just a few days ago to comply with multiple summonses issued by the authorities. A video now going viral captures the moment Samay exits his car and heads into the Cyber Cell office. In the footage, his distressed expression is unmistakable. As he glances toward the camera, his face clearly shows the weight of the situation, yet he does not engage with the waiting media. His silence and the look of anxiety as he walks into the office have sparked discussions among his followers. Watch to know more!\n" +
        '\n' +
        '#samayraina #samayrainanews #samayrainashow #indiasgotlatent #ranveerallahbadia #ranveerallahabadiacontroversy #indiasgotlatentdeleted #zoom\n' +
        '\n' +
        "ZOOM TV is India's leading Hindi Entertainment news channel that provides the audience with the latest Bollywood updates, breaking news, celebrity and television gossip. It features a vibrant mix of Hindi entertainment and original programming, complemented by current music hits and chart-topping songs. \n" +
        'Along with the most recent developments in Bollywood, entertainment highlights, and celebrity scoops, ZOOM TV also features exclusive interviews with Bollywood, Hollywood, and Tollywood celebrities. By giving insights into the K-pop World along with exclusive interviews with Korean celebrities ZOOM TV is your ultimate destination for all things entertainment.\n' +
        '\n' +
        "Zoom TV also aims to give viewers original and fresh entertainment material through its in-house production section, 'ZOOM STUDIOS,' which develops original shows and series based on intriguing and current themes and formats.\n" +
        '\n' +
        "Zoom TV is a part of the Times Network, which is owned by The Times Group, India's largest media conglomerate.\n" +
        '\n' +
        'SUBSCRIBE ► https://www.youtube.com/@zoomtv/\n' +
        '& CLICK On The Bell Icon To Receive All The Latest Updates.\n' +
        'Stay Connected With Us On :\n' +
        '\n' +
        'Facebook - https://www.facebook.com/zoomtv\n' +
        'Twitter - https://www.twitter.com/zoomtv\n' +
        'Instagram - https://instagram.com/zoomtv/\n' +
        'Website - https://www.zoomtventertainment.com',
      thumbnails: [Object],
      channelTitle: 'zoom',
      tags: [Array],
      categoryId: '24',
      liveBroadcastContent: 'none',
      defaultLanguage: 'en',
      localized: [Object],
      defaultAudioLanguage: 'en'
    },
    contentDetails: {
      duration: 'PT3M12S',
      dimension: '2d',
      definition: 'hd',
      caption: 'false',
      licensedContent: true,
      contentRating: {},
      projection: 'rectangular'
    },
    statistics: {
      viewCount: '19706',
      likeCount: '120',
      favoriteCount: '0',
      commentCount: '58'
    }
  },
  {
    kind: 'youtube#video',
    etag: '81SodSK8OW0RzXj2c82SVGC5G34',
    id: 'e4BdetQ9vSI',
    snippet: {
      publishedAt: '2025-03-29T15:30:14Z',
      channelId: 'UCotI-SqRXnkAZX4bMqlRNjw',
      title: 'After Ranveer Allahbadia & Samay Raina, Comedian Swati Sachdeva faces criticism for VULGAR joke!',
      description: 'Stand-up comedian Swati Sachdeva is facing backlash after a clip from her recent YouTube episode went viral. In the video, she jokes about her mother discovering her vibrator, sparking debate on humor’s limits, especially regarding parents.  \n' +
        `She shared how her mother, trying to be the "cool mom," awkwardly brought up the topic. Swati joked, "I thought she was going to ask me to lend it to her. She called it a gadget, a toy. I told her, 'Mom, it belongs to Papa.' She replied, 'Don't talk nonsense; I know his taste.'"\n` +
        '\n' +
        '#swatisachdevacomedy #swatisachdeva #swatisachdevavulgarjoke #swatisachdevalatest #zoom #entertainment \n' +
        '\n' +
        "ZOOM TV is India's leading Hindi Entertainment news channel that provides the audience with the latest Bollywood updates, breaking news, celebrity and television gossip. It features a vibrant mix of Hindi entertainment and original programming, complemented by current music hits and chart-topping songs. \n" +
        'Along with the most recent developments in Bollywood, entertainment highlights, and celebrity scoops, ZOOM TV also features exclusive interviews with Bollywood, Hollywood, and Tollywood celebrities. By giving insights into the K-pop World along with exclusive interviews with Korean celebrities ZOOM TV is your ultimate destination for all things entertainment.\n' +
        '\n' +
        "Zoom TV also aims to give viewers original and fresh entertainment material through its in-house production section, 'ZOOM STUDIOS,' which develops original shows and series based on intriguing and current themes and formats.\n" +
        '\n' +
        "Zoom TV is a part of the Times Network, which is owned by The Times Group, India's largest media conglomerate.\n" +
        '\n' +
        'SUBSCRIBE ► https://www.youtube.com/@zoomtv/\n' +
        '& CLICK On The Bell Icon To Receive All The Latest Updates.\n' +
        'Stay Connected With Us On :\n' +
        '\n' +
        'Facebook - https://www.facebook.com/zoomtv\n' +
        'Twitter - https://www.twitter.com/zoomtv\n' +
        'Instagram - https://instagram.com/zoomtv/\n' +
        'Website - https://www.zoomtventertainment.com',
      thumbnails: [Object],
      channelTitle: 'zoom',
      tags: [Array],
      categoryId: '24',
      liveBroadcastContent: 'none',
      defaultLanguage: 'en',
      localized: [Object],
      defaultAudioLanguage: 'en'
    },
    contentDetails: {
      duration: 'PT3M9S',
      dimension: '2d',
      definition: 'hd',
      caption: 'false',
      licensedContent: true,
      contentRating: {},
      projection: 'rectangular'
    },
    statistics: {
      viewCount: '4375',
      likeCount: '14',
      favoriteCount: '0',
      commentCount: '9'
    }
  }
  },
           */


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