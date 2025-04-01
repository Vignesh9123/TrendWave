import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
export interface TrendCardProps {
  socialMedia: 'X' | 'YouTube' | 'Reddit';
  title?: string;
  content?: string;
  summary?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  engagement: {
    likes: number;
    comments: number;
  };
  image?: string[];
  createdAt: Date;
  url: string;
  creator: string;
  sentimentLoading?: boolean;
  index?: number;
}

const TrendCard = ({
  socialMedia,
  title,
  content,
  summary,
  sentiment,
  engagement,
  createdAt,
  image,
  url,
  creator,
  sentimentLoading,
  index
}: TrendCardProps) => {
  const platformColors = {
    YouTube: 'bg-red-500',
    Reddit: 'bg-orange-600',
    X: 'bg-blue-400'
  };
  
  const platformIcons = {
    YouTube: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-youtube" viewBox="0 0 16 16">
        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
      </svg>
    ),
    Reddit: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 0v-8.5m0 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>
    ),
    X: (
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
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.3, delay: index ? index * 0.1 : 0 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-max">
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <div className={`${platformColors[socialMedia]} rounded-full p-1 flex items-center justify-center`}>
              <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 flex items-center justify-center">{platformIcons[socialMedia]}</div>
              <div className="line-clamp-1">{creator}</div>
              </div>
            </div>
            {sentimentLoading ? (
              <div className="w-14 h-6 flex items-center justify-center">
                <div className="w-14 h-6 rounded-full bg-gray-200 animate-pulse" />
              </div>
            ) : (
              <Badge className={sentimentColors[sentiment || 'neutral']}>
                {(sentiment?.charAt(0).toUpperCase() || 'N') + (sentiment || 'neutral').slice(1)}
              </Badge>
            )}
          </div>
          
          <h3 className={`text-lg font-semibold mb-2 ${socialMedia == 'X' ? 'line-clamp-5' : 'line-clamp-2'}`}>{socialMedia == 'X' ? content : title}</h3>
          {image && image.length > 0 && (
            <div className="mb-4">
              <Image src={image[0]} alt="Trend Image" className="w-full h-auto" width={300} height={300} />
            </div>
          )}
          <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{summary}</p>
          
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
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 border-t border-slate-100 text-brand-purple hover:bg-slate-50 dark:hover:bg-muted text-sm font-medium flex items-center justify-center"
        >
          View Original <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
    </motion.div>
  );
};

export default TrendCard;