
import React from 'react';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-16">
      {/* Background decor elements */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-0 w-72 h-72 bg-brand-blue opacity-5 dark:opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-brand-purple opacity-5 dark:opacity-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-dark dark:from-[gray] dark:via-brand-purple dark:to-brand-blue via-brand-purple to-brand-blue bg-clip-text text-transparent">
            Discover What's Trending Across The Web
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Get real-time insights into trending discussions from YouTube, Reddit, and Twitter. 
            Analyze sentiment and track engagement all in one place.
          </p>
          
          <div className="flex justify-center mb-8">
            <SearchBar />
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span>Popular searches:</span>
            <a href="/dashboard?query=Apple%20Vision%20Pro" className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:border-brand-purple hover:text-brand-purple transition-colors">
              Apple Vision Pro
            </a>
            <a href="/dashboard?query=Artificial%20Intelligence" className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:border-brand-purple hover:text-brand-purple transition-colors">
              Artificial Intelligence
            </a>
            <a href="/dashboard?query=Climate%20Change" className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:border-brand-purple hover:text-brand-purple transition-colors">
              Climate Change
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;