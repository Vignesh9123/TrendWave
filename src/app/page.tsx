'use client'
import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PlatformsSection from '@/components/PlatformsSection';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PlatformsSection />
        
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-brand-purple to-brand-blue rounded-2xl p-6 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Start discovering trends today</h2>
              <p className="mb-6 md:mb-8 max-w-2xl mx-auto">
                Get insights into trending topics across multiple platforms and stay ahead of the curve.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/dashboard" className="px-6 py-3 bg-white text-brand-purple font-medium rounded-lg hover:bg-opacity-90 transition-colors">
                  Try it now
                </Link>
                <Link href="/pricing" className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;