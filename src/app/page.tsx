'use client'
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import PlatformsSection from '@/components/PlatformsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PlatformsSection />
      
      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-brand-purple to-brand-blue rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Start discovering trends today</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Get insights into trending topics across multiple platforms and stay ahead of the curve.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/dashboard" className="px-6 py-3 bg-white text-brand-purple font-medium rounded-lg hover:bg-opacity-90 transition-colors">
                Try it now
              </a>
             
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
