'use client'
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/Theme-Toggle';
import { getPopularSearches } from '../actions';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularFilteredSearches, setPopularFilteredSearches] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
    const fetchPopularSearches = async () => {
      try {
        const popularSearches = await getPopularSearches();
        setPopularSearches(popularSearches);
        setPopularFilteredSearches(popularSearches)
      } catch (error) {
        console.error('Failed to fetch popular searches', error);
      }
    };

    fetchPopularSearches();
    
    const searchInput = document.getElementById('mobile-search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  useEffect(()=>{
    if(query.length > 0){
      setPopularFilteredSearches(()=>{
        return popularSearches.filter((q)=>q.toLowerCase().includes(query.toLowerCase()))
      })
    }
    else setPopularFilteredSearches(popularSearches)
  }, [query])

  const saveRecentSearch = (term: string) => {
    const newRecent = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
      router.push(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  const executeSearch = (term: string) => {
    saveRecentSearch(term);
    router.push(`/results?query=${encodeURIComponent(term)}`);
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4 border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={goBack} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="mobile-search-input"
                type="text"
                placeholder="Search a topic..."
                className="pl-10 h-11 pr-4 w-full"
                value={query}
                autoFocus
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>
          <ThemeToggle />
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="space-y-6">
          {
            query && (
              <div onClick={()=>{
                executeSearch(query)
              }} className='hover:bg-muted flex items-center p-2 cursor-pointer'>
                <SearchIcon className="mr-3 h-4 w-4 text-muted-foreground"/>{query}
              </div>
            )
          }
          {recentSearches.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Recent Searches</h3>
              <ul className="space-y-1">
                {recentSearches.map((term) => (
                  <li 
                    key={term} 
                    onClick={() => executeSearch(term)}
                    className="flex items-center py-3 px-2 cursor-pointer hover:bg-accent rounded-md"
                  >
                    <SearchIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Popular Searches</h3>
            <ul className="space-y-1">
              { popularFilteredSearches.length > 0 && popularFilteredSearches.map((term) => (
                <li 
                  key={term} 
                  onClick={() => executeSearch(term)}
                  className="flex items-center py-3 px-2 cursor-pointer hover:bg-accent rounded-md"
                >
                  <TrendingUp className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;