import Link from "next/link";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  originalTitle: string;
  category: string;
  year: number;
}

export function BookCard({ id, title, originalTitle, category, year }: BookCardProps) {
  return (
    <Link href={`/works/${id}`} className="group relative rounded-lg overflow-hidden block aspect-[2/3] bg-neutral-900 border border-white/5 transition-all hover:border-white/20">
      {/* Placeholder Image/Cover */}
      <div className="absolute inset-0 bg-neutral-800 transition-transform group-hover:scale-105 duration-700 ease-out flex items-center justify-center opacity-50 text-neutral-600">
        <BookOpen size={48} />
      </div>
      
      <div className="absolute inset-0 cinematic-gradient" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-yellow-500 text-xs font-semibold tracking-wider uppercase mb-1">{category} • {year}</p>
        <h3 className="text-xl font-bold text-white font-bengali drop-shadow-md">{originalTitle}</h3>
        <p className="text-sm text-neutral-300 truncate">{title}</p>
      </div>
    </Link>
  );
}

export function BookSkeleton() {
  return (
    <div className="rounded-lg aspect-[2/3] bg-neutral-900 border border-white/5 animate-pulse relative">
      <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
        <div className="w-16 h-3 bg-neutral-700 rounded" />
        <div className="w-3/4 h-6 bg-neutral-700 rounded" />
        <div className="w-1/2 h-4 bg-neutral-700 rounded" />
      </div>
    </div>
  );
}
