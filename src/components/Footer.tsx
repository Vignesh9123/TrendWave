import React from 'react';
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-brand-purple" />
              <span className="text-xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                TrendWave
              </span>
            </div>
            <p className="text-foreground text-sm">
              Discover and track trending discussions across multiple platforms in one place.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-foreground-muted hover:text-brand-purple text-sm">Features</Link></li>
              <li><Link href="/dashboard" className="text-foreground-muted hover:text-brand-purple text-sm">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-foreground-muted hover:text-brand-purple text-sm">About</Link></li>
              <li><Link href="/blog" className="text-foreground-muted hover:text-brand-purple text-sm">Blog</Link></li>
              <li><Link href="/contact" className="text-foreground-muted hover:text-brand-purple text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-foreground-muted hover:text-brand-purple text-sm">Privacy</Link></li>
              <li><Link href="/terms" className="text-foreground-muted hover:text-brand-purple text-sm">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-8 pt-8 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} TrendWave. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="https://twitter.com" className="hover:text-brand-purple">Twitter</Link>
            <Link href="https://linkedin.com" className="hover:text-brand-purple">LinkedIn</Link>
            <Link href="https://github.com" className="hover:text-brand-purple">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;