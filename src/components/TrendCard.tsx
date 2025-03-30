import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export interface TrendCardProps {
  platform: 'youtube' | 'reddit' | 'twitter';
  title: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: {
    likes: number;
    comments: number;
  };
  timestamp: string;
  link: string;
}

const TrendCard = ({
  platform,
  title,
  summary,
  sentiment,
  engagement,
  timestamp,
  link
}: TrendCardProps) => {
  const platformColors = {
    youtube: 'bg-red-500',
    reddit: 'bg-orange-600',
    twitter: 'bg-blue-400'
  };
  
  const platformIcons = {
    youtube: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-youtube" viewBox="0 0 16 16">
        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
      </svg>
    ),
    reddit: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 0v-8.5m0 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>
    ),
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
      </svg>
    )
  };
  
  const sentimentColors = {
    positive: 'bg-green-100 text-green-800',
    neutral: 'bg-blue-100 text-blue-800',
    negative: 'bg-red-100 text-red-800'
  };
  
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className={`${platformColors[platform]} rounded-full p-1 flex items-center justify-center h-6 w-6`}>
              {platformIcons[platform]}
            </div>
            <Badge className={sentimentColors[sentiment]}>
              {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
            </Badge>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
          <p className="text-slate-600 mb-4 text-sm line-clamp-3">{summary}</p>
          
          <div className="flex justify-between items-center text-xs text-slate-500">
            <div className="flex space-x-3">
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {formatNumber(engagement.likes)}
              </span>
              <span className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                {formatNumber(engagement.comments)}
              </span>
            </div>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {timestamp}
            </span>
          </div>
        </div>
        
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 border-t border-slate-100 text-brand-purple hover:bg-slate-50 text-sm font-medium flex items-center justify-center"
        >
          View Original <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
};

export default TrendCard;