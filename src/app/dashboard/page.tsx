'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DashboardFilters from '@/components/DashboardFilters';
import TrendCard, { TrendCardProps } from '@/components/TrendCard';
import TrendSummary from '@/components/TrendSummary';
import Footer from '@/components/Footer';
import { getMockTrendData } from '@/lib/mockData';

const Dashboard = () => {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('query') || '';

    const [platform, setPlatform] = useState('all');
    const [sentiment, setSentiment] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [trends, setTrends] = useState<TrendCardProps[]>([]);
    const [filteredTrends, setFilteredTrends] = useState<TrendCardProps[]>([]);
    const [query, setQuery] = useState(queryParam);

    useEffect(() => {
        const { trends, query: returnedQuery } = getMockTrendData(queryParam);
        setTrends(trends);
        setQuery(returnedQuery);
    }, [queryParam]);

    useEffect(() => {
        let filtered = [...trends];

        if (platform !== 'all') {
            filtered = filtered.filter(trend => trend.platform === platform);
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
    }, [trends, platform, sentiment, sortBy]);

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
                    <TrendSummary trends={trends} query={query} />
                    <DashboardFilters
                        platform={platform}
                        onPlatformChange={setPlatform}
                        sentiment={sentiment}
                        onSentimentChange={setSentiment}
                        sortBy={sortBy}
                        onSortByChange={setSortBy}
                    />
                    <div className="mt-6">
                        {filteredTrends.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTrends.map((trend, index) => (
                                    <TrendCard key={index} {...trend} />
                                ))}
                            </div>
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
