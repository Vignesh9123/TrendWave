import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardFiltersProps {
  platform: string;
  onPlatformChange: (value: string) => void;
  sentiment: string;
  onSentimentChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
}

const DashboardFilters = ({
  platform,
  onPlatformChange,
  sentiment,
  onSentimentChange,
  sortBy,
  onSortByChange
}: DashboardFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between pb-6 border-b border-slate-200">
      <div>
        <h3 className="text-sm font-medium mb-2 text-slate-500">Platform</h3>
        <Tabs 
          value={platform} 
          onValueChange={onPlatformChange} 
          className="w-fit"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="reddit">Reddit</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <h3 className="text-sm font-medium mb-2 text-slate-500">Sentiment</h3>
          <Select value={sentiment} onValueChange={onSentimentChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Sentiments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiments</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2 text-slate-500">Sort By</h3>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Most Recent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="likes">Most Likes</SelectItem>
              <SelectItem value="comments">Most Comments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;