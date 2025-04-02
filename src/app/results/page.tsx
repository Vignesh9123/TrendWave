'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DashboardFilters from '@/components/DashboardFilters';
import TrendCard, { TrendCardProps } from '@/components/TrendCard';
import TrendSummary from '@/components/TrendSummary';
import Footer from '@/components/Footer';
// import { getMockTrendData } from '@/lib/mockData';
import {getSentimentAnalysis, Post, search} from '@/app/actions'
import Masonry from 'react-masonry-css';
import { getMockTrendData } from '@/lib/mockData';
import {motion} from 'framer-motion'
import { Loader2 } from 'lucide-react';
import {breakpointColumnsObj} from '@/config/clientConfig';
const Results = () => {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('query') || '';
    const [socialMedia, setSocialMedia] = useState('all');
    const [sentiment, setSentiment] = useState('all');
    const [postsLoading, setPostsLoading] = useState(true);
    const [sentimentLoading, setSentimentLoading] = useState(true);
    const [sortBy, setSortBy] = useState('recent');
    const [trends, setTrends] = useState<TrendCardProps[]>([]);
    const [filteredTrends, setFilteredTrends] = useState<TrendCardProps[]>([]);
    const [query, setQuery] = useState(queryParam);
    const [sentimentAnalysis, setSentimentAnalysis] = useState<{
        positive: number;
        negative: number;
        neutral: number;
    } | null>(null);
    const [takeAways, setTakeAways] = useState<string[]>([]);
    const [loadingStateInd, setLoadingStateInd] = useState<number>(0)

    useEffect(() => {
        setQuery(queryParam)
        async function fetchTrends(){
            setPostsLoading(true);
            setSentimentLoading(true);
            const { responses } = await search(queryParam);
            const formattedTrends = responses.map((response: Post, ind: number) => ({
                ...response,
                engagement: {
                    likes: response.upvotes || 0,
                    comments: response.comments || 0
                },
            }));
            console.log('formattedTrends',formattedTrends)
            setTrends(formattedTrends);
            setFilteredTrends(formattedTrends);
            setPostsLoading(false);
            const sentiment = await getSentimentAnalysis(responses, queryParam);
            setSentimentAnalysis(sentiment?.overall);
            const updatedTrends = formattedTrends.map((trend : any) => ({
                ...trend,
                sentiment: sentiment?.posts.find((s : any) => s.id === trend.uid)?.sentiment || 'neutral'
            }));
            setTrends(updatedTrends);
            setFilteredTrends(updatedTrends);
            setSentimentLoading(false);
            setTakeAways(sentiment?.takeAways || []);
        
        }
        fetchTrends();
        // const res = getMockTrendData(queryParam);
        // setTrends(res.trends);
        // setFilteredTrends(res.trends);
        // setTakeAways(res.takeAways)
        // setPostsLoading(false);
        // setSentimentLoading(false)
    }, [queryParam]);

    useEffect(() => {
        let filtered = [...trends];

        if (socialMedia !== 'all') {
            filtered = filtered.filter(trend => trend.socialMedia === socialMedia);
        }

        if (sentiment !== 'all') {
            filtered = filtered.filter(trend => trend.sentiment === sentiment);
        }
        if (sortBy === 'recent') {
        } else if (sortBy === 'likes') {
            filtered = filtered.sort((a, b) => b.engagement.likes - a.engagement.likes);
        } else if (sortBy === 'comments') {
            filtered = filtered.sort((a, b) => b.engagement.comments - a.engagement.comments);
        }

        setFilteredTrends(filtered);
    }, [trends, socialMedia, sentiment, sortBy]);

    const loadingStates = [
        "Collecting Different Sources",
        "Searching query in different sources",
        "Organizing the data"
    ]
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        
        if (postsLoading) {
          interval = setInterval(() => {
            setLoadingStateInd((prev) => {
              return prev === loadingStates.length - 1 ? 0 : prev + 1;
            });
          }, 3000);
        }
        
        return () => {
          if (interval !== null) {
            clearInterval(interval);
          }
        };
      }, [postsLoading]);
    return (
        <>
            <Header />
            <div className="pt-24 pb-16 min-h-screen bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center mb-10">
                        <SearchBar />
                    </div>
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-1">
                            Trend results for <span className="text-brand-purple">{query}</span>
                        </h1>
                        <div className="text-muted-foreground">
                            {postsLoading?
                                 (
                                    <div className='flex gap-2 items-center'>
                                      {loadingStates[loadingStateInd]}
                                      <span ><Loader2 className='animate-spin ' size={15}/></span>
                                    </div>
                                  )
                            
                        :`Showing ${filteredTrends.length} trends from across the web`}
                        </div>
                    </div>
                    <TrendSummary trends={trends} query={query} sentimentAnalysis={sentimentAnalysis} sentimentLoading={sentimentLoading} postsLoading={postsLoading}/>
                    <div className="mt-6">
                        {sentimentLoading ? (
                            <div className="flex flex-col gap-2 my-3">
                                {[1,2,3,4].map((k)=>{
                                    return(
                                        <div key={k} className='bg-muted h-8 w-full animate-pulse'></div>
                                    )
                                })}
                            </div>
                        ) : takeAways.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-xl lg:text-2xl text-center font-bold mb-1">Major Takeaways</h2>
                                <ul className="">
                                    {takeAways.map((takeAway, index) => (
                                        <motion.li 
                                            initial={{opacity:0, filter: 'blur(3px)'}}
                                            animate={{opacity: 1,  filter: 'blur(0px)'}}
                                            transition={{duration: 0.5, delay: index*0.3}}
                                        key={index} className='lg:text-lg p-1 bg-muted rounded mb-1'>{takeAway.split(' ').map((word, ind)=>{
                                            return(
                                                <motion.span key={ind} initial={{opacity: 0,filter:'blur(5px)'}} animate={{opacity:1,filter:'blur(0px)'}}
                                                transition={{duration: 0.2, delay: ind*0.1}}
                                                >
                                                    {word + " "}
                                                </motion.span>
                                            )
                                        })}</motion.li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <DashboardFilters
                        socialMedia={socialMedia}
                        onSocialMediaChange={setSocialMedia}
                        sentiment={sentiment}
                        onSentimentChange={setSentiment}
                        sortBy={sortBy}
                        onSortByChange={setSortBy}
                    />
                   
                    <div className="mt-6">
                        {postsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {[1,2,3,4,5,6].map((k)=>{
                                    return(
                                        <div key={k} className='h-64
                                         bg-muted animate-pulse'>

                                        </div>
                                    )                                
                                })}
                            </div>
                        ) : filteredTrends.length > 0 ? (
                            <Masonry breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                                {filteredTrends.map((trend, index) => (
                                    <TrendCard key={index} {...trend} sentimentLoading={sentimentLoading} index={index}/>
                                ))}
                            </Masonry>
                        ) : (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-medium mb-2">No trends found</h3>
                                <p className="text-slate-600">Try adjusting your filters or search for a different topic</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Results;
