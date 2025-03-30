
import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 fixed top-0 left-0 right-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-brand-purple" />
              <span className="text-xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                TrendWave
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium text-slate-600 hover:text-brand-purple">
              Home
            </Link>
            <Link href="/dashboard" className="font-medium text-slate-600 hover:text-brand-purple">
              Dashboard
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex">Log in</Button>
            <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
              Sign up free
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
