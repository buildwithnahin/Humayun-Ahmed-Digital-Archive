"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    // Only fire if the user typed something or cleared the input.
    // The parent controls the exact fetch threshold.
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {isLoading ? (
          <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
        ) : (
          <Search className="h-5 w-5 text-neutral-400 group-focus-within:text-yellow-500 transition-colors" />
        )}
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-4 bg-neutral-900 border border-white/10 rounded-full text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all font-bengali tracking-wide text-lg shadow-inner"
        placeholder="উপন্যাস, নাটক, বা চরিত্র খুঁজুন... (Search works)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Decorative Glow */}
      <div className="absolute -inset-0.5 bg-yellow-500/20 rounded-full blur opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none -z-10" />
    </div>
  );
}
