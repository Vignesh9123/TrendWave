import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendCardProps } from './TrendCard';
import { BarChart3, BarChart4, TrendingUp, ThumbsUp, MessageSquare } from 'lucide-react';

interface TrendSummaryProps {
  trends: TrendCardProps[];
  query: string;
  sentimentAnalysis: {
    positive: number;
    negative: number;
    neutral: number;
  } | null;
  sentimentLoading: boolean;
}

const TrendSummary = ({ trends, query, sentimentAnalysis, sentimentLoading }: TrendSummaryProps) => {
  const sentimentCounts = sentimentAnalysis;
  
  const platformCounts = {
    youtube: trends.filter(t => t.socialMedia === 'YouTube').length,
    reddit: trends.filter(t => t.socialMedia === 'Reddit').length,
    twitter: trends.filter(t => t.socialMedia === 'X').length
  };
  
  const totalLikes = trends.reduce((sum, trend) => sum + trend.engagement.likes, 0);
  const totalComments = trends.reduce((sum, trend) => sum + trend.engagement.comments, 0);
  
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {sentimentLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
            </div>
          ) : (
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-brand-purple mr-3" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{sentimentCounts?.positive.toFixed(2) || 0}% Positive</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">{sentimentCounts?.neutral.toFixed(2) || 0}% Neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">{sentimentCounts?.negative.toFixed(2) || 0}% Negative</span>
              </div>
            </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Platform Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <BarChart4 className="h-8 w-8 text-brand-purple mr-3" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">{platformCounts.youtube} YouTube</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-sm">{platformCounts.reddit} Reddit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-sm">{platformCounts.twitter} Twitter</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500">Total Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-brand-purple mr-3" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ThumbsUp className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{formatNumber(totalLikes)} Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{formatNumber(totalComments)} Comments</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendSummary;
