"use client";

import { useState, useEffect, useCallback } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { BookCard, BookSkeleton } from "@/components/ui/BookCard";

interface Work {
  id: string;
  title: string;
  original_title: string;
  category: string;
  publication_year: number;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ExplorePage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSearch, setActiveSearch] = useState("");

  const fetchWorks = useCallback(async (searchQuery: string = "") => {
    setLoading(true);
    try {
      const url = new URL(process.env.NEXT_PUBLIC_API_URL + "/works" || "http://localhost:5000/api/v1/works");
      if (searchQuery) url.searchParams.append("search", searchQuery);
      url.searchParams.append("limit", "12");

      const res = await fetch(url.toString());
      const json = await res.json();

      if (json.success) {
        setWorks(json.data.works);
        setPagination(json.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch works:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchWorks();
  }, [fetchWorks]);

  // Triggered by the Debounced SearchBar
  const handleSearch = (query: string) => {
    setActiveSearch(query);
    fetchWorks(query);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col items-center gap-8 mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-bengali font-bold text-center text-white drop-shadow-md">
          সৃষ্টির আর্কাইভে খুঁজুন
        </h1>
        <p className="text-neutral-400 text-center max-w-xl">
          Search seamlessly using English transliteration or native Bengali characters. Experience our robust ranking system powered by PostgreSQL.
        </p>
        
        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      {activeSearch && !loading && (
        <p className="text-sm tracking-widest uppercase text-yellow-500 font-semibold mb-6 flex items-center justify-between">
          <span>Search Results for "{activeSearch}"</span>
          <span className="text-neutral-500 font-normal">{pagination?.total || 0} works found</span>
        </p>
      )}

      {/* Grid Layout taking advantage of reusable BookCard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {loading ? (
          // Render Suspense Skeletons
          Array.from({ length: 12 }).map((_, i) => <BookSkeleton key={i} />)
        ) : works.length > 0 ? (
          works.map((work) => (
            <BookCard
              key={work.id}
              id={work.id}
              title={work.title}
              originalTitle={work.original_title}
              category={work.category}
              year={work.publication_year}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center opacity-70">
            <p className="text-2xl font-bengali text-neutral-400 mb-2">কোনো ফলাফল পাওয়া যায়নি</p>
            <p className="text-neutral-500">Try searching for a different novel, character, or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
