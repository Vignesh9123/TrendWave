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
import {getSentimentAnalysis, search} from '@/app/actions'
import Masonry from 'react-masonry-css';
const Dashboard = () => {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('query') || '';
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
      };
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

    useEffect(() => {
        async function fetchTrends(){
            setPostsLoading(true);
            setSentimentLoading(true);
            const { responses } = await search(queryParam);
            const formattedTrends = responses.map((response) => ({
                ...response,
                engagement: {
                    likes: response.upvotes || 0,
                    comments: response.downvotes || 0
                },
                createdAt: response.createdAt.toISOString()
            }));
            setTrends(formattedTrends);
            setPostsLoading(false);
            const sentiment = await getSentimentAnalysis(responses);
            setSentimentAnalysis(sentiment?.overall);
            const updatedTrends = formattedTrends.map((trend) => ({
                ...trend,
                sentiment: sentiment?.posts.find((s) => s.id === trend.uid)?.sentiment || 'neutral'
            }));
            setTrends(updatedTrends);
            setFilteredTrends(updatedTrends);
            setSentimentLoading(false);
        }
        fetchTrends();
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

    return (
        <>
            <Header />
            <div className="pt-24 pb-16 min-h-screen bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center mb-10">
                        <SearchBar />
                    </div>
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold mb-1">
                            Trend results for <span className="text-brand-purple">{query}</span>
                        </h1>
                        <p className="text-slate-600">
                            Showing {filteredTrends.length} trends from across the web
                        </p>
                    </div>
                    <TrendSummary trends={trends} query={query} sentimentAnalysis={sentimentAnalysis} sentimentLoading={sentimentLoading}/>
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
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
                            </div>
                        ) : filteredTrends.length > 0 ? (
                            <Masonry breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                                {filteredTrends.map((trend, index) => (
                                    <TrendCard key={index} {...trend} sentimentLoading={sentimentLoading}/>
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

export default Dashboard;
