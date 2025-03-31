
import React from 'react';
import Link from 'next/link';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { TrendingUp, X } from 'lucide-react';
import { ThemeToggle } from './Theme-Toggle';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Search', path: '/search' },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh] rounded-t-xl">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 text-brand-purple" />
              <DrawerTitle className="ml-2 text-xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                TrendWave
              </DrawerTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DrawerHeader>
        
        <div className="flex flex-col p-4">
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                onClick={onClose}
                className="flex items-center py-3 px-4 rounded-md text-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <DrawerFooter className="border-t pt-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <ThemeToggle />
              <span className="ml-2 text-sm text-muted-foreground">Toggle theme</span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>Login</Button>
              <Button>Sign up</Button>
            </div>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSidebar;