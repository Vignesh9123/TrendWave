import React from 'react';
import { Search, TrendingUp, BarChart4, Clock } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-brand-purple" />,
      title: "Cross-Platform Search",
      description: "Find trending discussions across YouTube, Reddit, and Twitter with a single search query."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-brand-purple" />,
      title: "Real-time Trends",
      description: "Get the latest trending topics and discussions as they happen with our real-time data aggregation."
    },
    {
      icon: <BarChart4 className="h-8 w-8 text-brand-purple" />,
      title: "Sentiment Analysis",
      description: "Understand the general sentiment around topics with our AI-powered sentiment analysis."
    },
    {
      icon: <Clock className="h-8 w-8 text-brand-purple" />,
      title: "Trend History",
      description: "Track how trends evolve over time with historical data and engagement metrics."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful features for trend discovery</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our platform aggregates trend data from multiple sources to give you the most comprehensive view of what's happening online.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="inline-block p-3 bg-slate-50 dark:bg-slate-700 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl text-black dark:text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
