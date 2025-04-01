'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, Menu } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./Theme-Toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSidebar from "./MobileSidebar";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 fixed top-0 left-0 right-0 z-30">
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
            <Link href="/" className="font-medium text-slate-600 dark:text-slate-300 hover:text-brand-purple dark:hover:text-brand-purple">
              Home
            </Link>
            <Link href="/dashboard" className="font-medium text-slate-600 dark:text-slate-300 hover:text-brand-purple dark:hover:text-brand-purple">
              Dashboard
            </Link>
            
          </nav>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            {session ? (
              <Button onClick={() => signOut()} variant="ghost">Log out</Button>
            ) : (
              <>
                <Button onClick={() => router.push('/signin')} variant="ghost">Log in</Button>
                <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                  Sign up free
                </Button>
              </>
            )}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;