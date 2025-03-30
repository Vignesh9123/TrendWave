import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/dashboard?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full max-w-2xl">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search a topic (e.g., Apple Vision Pro)"
          className="pl-10 h-12 pr-32 bg-white border-slate-200 rounded-full w-full focus:ring-brand-purple"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button 
        type="submit" 
        className="absolute right-1 top-1 h-10 bg-gradient-to-r from-brand-purple to-brand-blue text-white rounded-full px-6"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
