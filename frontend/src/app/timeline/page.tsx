"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { TimelineLayout, TimelineItem, DecadeMarker } from "@/components/ui/TimelineUI";

interface Work {
  id: string;
  title: string;
  original_title: string;
  category: string;
  publication_year: number;
  description: string;
}

export default function TimelinePage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllWorks() {
      try {
        // Fetch up to 100 works for timeline to populate properly, sorted by year natively via API
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1") + "/works?limit=100");
        const json = await res.json();
        
        if (json.success && json.data.works) {
          // Sort chronologically ascending for timeline
          const sortedWorks = json.data.works.sort((a: Work, b: Work) => a.publication_year - b.publication_year);
          setWorks(sortedWorks);
        }
      } catch (error) {
        console.error("Failed to fetch works for timeline:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllWorks();
  }, []);

  // Group works by decade
  const groupedWorks = works.reduce((acc, work) => {
    if (!work.publication_year) return acc;
    const decade = Math.floor(work.publication_year / 10) * 10;
    const decadeKey = `${decade}s`;
    
    if (!acc[decadeKey]) {
      acc[decadeKey] = [];
    }
    acc[decadeKey].push(work);
    return acc;
  }, {} as Record<string, Work[]>);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-yellow-500">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-bengali tracking-widest animate-pulse">আর্কাইভ লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-neutral-900/50 border-b border-white/5 pt-20 pb-12 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bengali font-bold text-white mb-4 drop-shadow-lg">
            সময়ের সরণিতে
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Explore Humayun Ahmed's literary evolution chronologically. From his early breakthroughs in the 1970s to his modern cinematic masterpieces.
          </p>
        </div>
      </div>

      {Object.keys(groupedWorks).length === 0 ? (
        <div className="text-center text-neutral-500 py-12">
          No chronological data available yet.
        </div>
      ) : (
        <TimelineLayout>
          {Object.entries(groupedWorks).map(([decade, decadeWorks]) => (
            <div key={decade} className="contents">
              {/* Render the Decade Marker */}
              <DecadeMarker decade={decade} />

              {/* Render Works in this decade */}
              {decadeWorks.map((work, index) => (
                <TimelineItem
                  key={work.id}
                  id={work.id}
                  title={work.title}
                  originalTitle={work.original_title}
                  category={work.category}
                  year={work.publication_year}
                  description={work.description}
                  align={index % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
          ))}
        </TimelineLayout>
      )}
    </div>
  );
}
