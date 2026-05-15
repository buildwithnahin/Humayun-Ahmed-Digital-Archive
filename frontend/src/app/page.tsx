import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative isolate min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 cinematic-gradient" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold font-bengali leading-tight text-white drop-shadow-lg">
            জীবন যেখানে <span className="text-yellow-500">উপন্যাস</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
            Journey through the absolute magic of Humayun Ahmed&apos;s literary universe. Explore his timeless novels, iconic characters, and cinematic masterpieces in one definitive archive.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Link 
              href="/explore" 
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-sm transition-all flex items-center gap-2"
            >
              Explore Archive <ArrowRight size={20} />
            </Link>
            <Link 
              href="/characters" 
              className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-sm transition-all"
            >
              Meet the Characters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
