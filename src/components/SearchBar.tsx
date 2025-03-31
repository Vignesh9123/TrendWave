
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { useIsMobile } from '@/hooks/use-mobile';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  // Popular searches
  const popularSearches = [
    'Apple Vision Pro',
    'Artificial Intelligence',
    'Climate Change',
    'Cryptocurrency',
    'Electric Vehicles'
  ];

  // Recent searches (would be from local storage in a real app)
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
    
    // Set up keyboard shortcut to open search
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isMobile) {
          router.push('/search');
        } else {
          setOpen((open) => !open);
        }
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [router, isMobile]);

  const saveRecentSearch = (term: string) => {
    const newRecent = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
      router.push(`/dashboard?query=${encodeURIComponent(query)}`);
      setOpen(false);
    }
  };

  const executeSearch = (term: string) => {
    saveRecentSearch(term);
    router.push(`/dashboard?query=${encodeURIComponent(term)}`);
    setOpen(false);
  };

  // Redirect to search page on mobile
  const handleMobileSearchClick = () => {
    router.push('/search');
  };

  // Use different UI for mobile and desktop
  if (isMobile) {
    return (
      <Button 
        variant="outline" 
        className="w-full flex justify-between items-center h-12 px-4 border-slate-200 dark:border-slate-700"
        onClick={handleMobileSearchClick}
      >
        <div className="flex items-center text-muted-foreground">
          <Search className="mr-2 h-4 w-4" />
          <span>Search a topic...</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
    );
  }

  return (
    <>
      <form onSubmit={handleSearch} className="relative flex w-full max-w-2xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <Input
            type="text"
            placeholder="Search a topic (e.g., Apple Vision Pro)"
            className="pl-10 h-12 pr-32 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-full w-full focus:ring-brand-purple"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={() => setOpen(true)}
          />
        </div>
        {/* <Button 
          type="submit" 
          className="absolute right-1 top-1 h-10 bg-gradient-to-r from-brand-purple to-brand-blue text-white rounded-full px-6"
        >
          Search
        </Button> */}
        <kbd className="absolute right-3 top-3.5 pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </form>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleSearch}>
          <CommandInput 
            placeholder="Search a topic (e.g., Apple Vision Pro)" 
            value={query}
            onValueChange={setQuery}
          />
        </form>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {recentSearches.length > 0 && (
            <CommandGroup heading="Recent Searches">
              {recentSearches.map((term) => (
                <CommandItem 
                  key={term} 
                  onSelect={() => executeSearch(term)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  {term}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Popular Searches">
            {popularSearches.map((term) => (
              <CommandItem 
                key={term} 
                onSelect={() => executeSearch(term)}
              >
                <Search className="mr-2 h-4 w-4" />
                {term}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;