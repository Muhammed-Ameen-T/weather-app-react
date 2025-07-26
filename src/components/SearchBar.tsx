import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { fetchCitySuggestions } from '../utils/api';
import type { CityItem } from '../types/weather';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      fetchCitySuggestions(debouncedQuery)
        .then(cities => {
          setSuggestions(cities);
          setShowSuggestions(cities.length > 0);
        })
        .catch(() => {
          setSuggestions([]);
          setShowSuggestions(false);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: CityItem) => {
    const cityName = city.state ? `${city.name}, ${city.state}` : city.name;
    setQuery(cityName);
    setShowSuggestions(false);
    onSearch(cityName);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 z-100" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full pl-12 pr-16 py-4 rounded-2xl backdrop-blur-md bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white transition-colors duration-200 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-md bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg z-50 max-h-64 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(city)}
              className="w-full px-4 py-3 text-left hover:bg-white/20 dark:hover:bg-gray-700/20 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl flex items-center space-x-3 text-gray-900 dark:text-white"
            >
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <div>
                <div className="font-medium">
                  {city.name}, {city.country}
                </div>
                {city.state && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {city.state}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}