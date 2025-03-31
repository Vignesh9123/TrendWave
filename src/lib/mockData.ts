import { TrendCardProps } from "../components/TrendCard";

export interface TrendData {
  trends: TrendCardProps[];
  query: string;
}

export function getMockTrendData(query: string): TrendData {
  const createdAt = new Date();
  const oneHourAgo = new Date(createdAt);
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);

  const twoHoursAgo = new Date(createdAt);
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

  const fourHoursAgo = new Date(createdAt);
  fourHoursAgo.setHours(fourHoursAgo.getHours() - 4);

  const dayAgo = new Date(createdAt);
  dayAgo.setDate(dayAgo.getDate() - 1);

  const formatTime = (date: Date): string => {
    const diff = Math.floor((Date.now() - date.getTime()) / 60000); // diff in minutes

    if (diff < 60) {
      return `${diff}m ago`;
    } else if (diff < 24 * 60) {
      return `${Math.floor(diff / 60)}h ago`;
    } else {
      return `${Math.floor(diff / (60 * 24))}d ago`;
    }
  };

  const mockData: Record<string, TrendData> = {
    "Apple Vision Pro": {
      query: "Apple Vision Pro",
      trends: [
        {
          socialMedia: "YouTube",
          title: "Apple Vision Pro: Hands-on with Apple's first spatial computer",
          summary: "I spent 30 minutes with the Vision Pro, and I'm going to tell you about the design, weight, latency, image quality, passthrough quality, eye tracking, hand tracking, and more.",
          sentiment: "positive",
          engagement: {
            likes: 245000,
            comments: 12400
          },
          createdAt: formatTime(oneHourAgo),
          url: "https://www.youtube.com/watch?v=example1",
          creator: "John Doe"
        },
        {
          socialMedia: "Reddit",
          title: "Just tried the Vision Pro at the Apple Store - My honest thoughts",
          summary: "The spatial computing aspect is revolutionary, but the weight distribution needs improvement. After 15 minutes, I started feeling discomfort on my cheekbones and forehead.",
          sentiment: "neutral",
          engagement: {
            likes: 3240,
            comments: 982
          },
          createdAt: formatTime(twoHoursAgo),
          url: "https://www.reddit.com/r/apple/comments/example2",
          creator: "John Doe"
        },
        {
          socialMedia: "X",
          title: "Apple Vision Pro sells out across major retailers within hours",
          summary: "Despite the $3,499 price tag, Apple's first spatial computer is seeing demand exceeding supply. Online preorders now showing 4-6 week shipping estimates.",
          sentiment: "positive",
          engagement: {
            likes: 5670,
            comments: 1230
          },
          createdAt: formatTime(fourHoursAgo),
          url: "https://twitter.com/example3",
          creator: "John Doe"
        },
        {
          socialMedia: "YouTube",
          title: "Is Apple Vision Pro Worth $3,500?",
          summary: "In this review, I break down the pros and cons of Apple's most expensive consumer product to date. Is it the future of computing or an expensive tech demo?",
          sentiment: "neutral",
          engagement: {
            likes: 178000,
            comments: 8900
          },
          createdAt: formatTime(dayAgo),
          url: "https://www.youtube.com/watch?v=example4",
          creator: "John Doe"
        },
        {
          socialMedia: "Reddit",
          title: "Vision Pro Development - What we've learned in the first month",
          summary: "Our team has been developing for visionOS since launch. Here are the challenges, opportunities, and unexpected issues we've encountered.",
          sentiment: "positive",
          engagement: {
            likes: 1850,
            comments: 423
          },
          createdAt: formatTime(twoHoursAgo),
          url: "https://www.reddit.com/r/augmentedreality/comments/example5",
          creator: "John Doe"
        },
        {
          socialMedia: "X",
          title: "Vision Pro battery life is a serious problem in real-world use",
          summary: "After a week of testing, the 2-hour battery limit is more impactful than expected. Carrying multiple batteries is becoming standard practice.",
          sentiment: "negative",
          engagement: {
            likes: 4230,
            comments: 890
          },
          createdAt: formatTime(twoHoursAgo),
          url: "https://twitter.com/example6",
          creator: "John Doe"
        },
      ]
    },
    "Artificial Intelligence": {
      query: "Artificial Intelligence",
      trends: [
        {
          socialMedia: "YouTube",
          title: "The AI Revolution: How Machine Learning is Transforming Industries",
          summary: "A comprehensive look at how artificial intelligence is changing healthcare, finance, transportation, and more through real-world applications.",
          sentiment: "positive",
          engagement: {
            likes: 326000,
            comments: 15700
          },
          createdAt: formatTime(twoHoursAgo),
          url: "https://www.youtube.com/watch?v=example7",
          creator: "John Doe"
        },
        {
          socialMedia: "Reddit",
          title: "I built an AI that writes music in any style - Open source project",
          summary: "After 8 months of development, I'm releasing my music generation AI. It can mimic any artist's style or create unique compositions based on text prompts.",
          sentiment: "positive",
          engagement: {
            likes: 8960,
            comments: 1240
          },
          createdAt: formatTime(fourHoursAgo),
          url: "https://www.reddit.com/r/MachineLearning/comments/example8",
          creator: "John Doe"
        },
        {
          socialMedia: "X",
          title: "EU's AI Act passes final vote - What it means for AI developers",
          summary: "The world's first comprehensive AI regulation has passed. Timeline, requirements, and impact on companies developing AI systems within the EU.",
          sentiment: "neutral",
          engagement: {
            likes: 3450,
            comments: 890
          },
          createdAt: formatTime(oneHourAgo),
          url: "https://twitter.com/example9",
          creator: "John Doe"
        },
        {
          socialMedia: "YouTube",
          title: "The Dark Side of AI: Ethical Concerns We Can't Ignore",
          summary: "From deepfakes to algorithmic bias, this documentary explores the ethical challenges posed by advancing AI technology and potential solutions.",
          sentiment: "negative",
          engagement: {
            likes: 203000,
            comments: 34500
          },
          createdAt: formatTime(dayAgo),
          url: "https://www.youtube.com/watch?v=example10",
          creator: "John Doe"
        },
      ]
    },
    "Climate Change": {
      query: "Climate Change",
      trends: [
        {
          socialMedia: "YouTube",
          title: "Latest Climate Data Reveals Accelerating Global Warming Trends",
          summary: "New satellite data shows unprecedented rates of polar ice melt and global temperature increase over the past year, exceeding previous climate models.",
          sentiment: "negative",
          engagement: {
            likes: 187000,
            comments: 23400
          },
          createdAt: formatTime(fourHoursAgo),
          url: "https://www.youtube.com/watch?v=example11",
          creator: "John Doe"
        },
        {
          socialMedia: "Reddit",
          title: "New study: Carbon capture technology efficiency improved by 40%",
          summary: "Researchers at MIT have developed a breakthrough carbon capture method that requires significantly less energy while increasing CO2 absorption rates.",
          sentiment: "positive",
          engagement: {
            likes: 6740,
            comments: 1350
          },
          createdAt: formatTime(twoHoursAgo),
          url: "https://www.reddit.com/r/science/comments/example12",
          creator: "John Doe"
        },
        {
          socialMedia: "X",
          title: "Major corporations announce joint climate initiative with $30B investment",
          summary: "A coalition of 25 global corporations has committed to a combined $30 billion investment in renewable energy infrastructure and carbon reduction technologies.",
          sentiment: "positive",
          engagement: {
            likes: 12400,
            comments: 3200
          },
          createdAt: formatTime(oneHourAgo),
          url: "https://twitter.com/example13",
          creator: "John Doe"
        },
      ]
    },
    "default": {
      query: query || "trending topics",
      trends: [
        {
          socialMedia: "YouTube",
          title: "Latest trends in technology and innovation",
          summary: "Exploring the cutting-edge developments in technology that are shaping our future.",
          sentiment: "positive",
          engagement: {
            likes: 125000,
            comments: 7800
          },
          createdAt: formatTime(twoHoursAgo),
          url: "https://www.youtube.com/watch?v=example14",
          creator: "John Doe"
        },
        {
          socialMedia: "Reddit",
          title: "Discussion: Most impactful scientific discoveries of the past year",
          summary: "From quantum computing breakthroughs to new medical treatments, redditors discuss the most significant scientific advancements.",
          sentiment: "positive",
          engagement: {
            likes: 5240,
            comments: 1320
          },
          createdAt: formatTime(fourHoursAgo),
          url: "https://www.reddit.com/r/science/comments/example15",
          creator: "John Doe"
        },
        {
          socialMedia: "X",
          title: "Global economic trends everyone should be watching",
          summary: "Analysis of key economic indicators and market trends that could impact the global economy in the coming months.",
          sentiment: "neutral",
          engagement: {
            likes: 3820,
            comments: 940
          },
          createdAt: formatTime(oneHourAgo),
          url: "https://twitter.com/example16",
          creator: "John Doe"
        },
      ]
    }
  };

  const normalizedQuery = query?.toLowerCase() || "";

  if (normalizedQuery.includes("apple") || normalizedQuery.includes("vision") || normalizedQuery.includes("pro")) {
    return mockData["Apple Vision Pro"];
  } else if (normalizedQuery.includes("ai") || normalizedQuery.includes("artificial") || normalizedQuery.includes("intelligence")) {
    return mockData["Artificial Intelligence"];
  } else if (normalizedQuery.includes("climate") || normalizedQuery.includes("change") || normalizedQuery.includes("global warming")) {
    return mockData["Climate Change"];
  } else {
    return {
      ...mockData.default,
      query: query || mockData.default.query
    };
  }
}