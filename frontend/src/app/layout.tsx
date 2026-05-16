import type { Metadata } from "next";
import "./globals.css";
import { Search, Menu, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Humayun Ahmed Digital Archive",
  description: "A cinematic digital archive exploring the literary works, natoks, and characters of Humayun Ahmed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col">
        {/* Cinematic minimalist navbar */}
        <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bengali text-2xl font-bold tracking-wider text-white">
              হুমায়ূন আর্কাইভ
            </Link>
            <nav className="hidden md:flex gap-8 text-sm tracking-wide text-neutral-300">
              <Link href="/explore" className="hover:text-white transition-colors">EXPLORE</Link>
              <Link href="/timeline" className="hover:text-white transition-colors">TIMELINE</Link>
              <Link href="/characters" className="hover:text-white transition-colors">CHARACTERS</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Search">
                <Search size={20} />
              </button>
              <Link href="/profile" className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Profile">
                <User size={20} />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-16">{children}</main>

        <footer className="border-t border-white/10 mt-auto bg-[#0a0a0a] py-8">
          <div className="container mx-auto px-6 text-center text-sm text-neutral-500">
            <p className="font-bengali text-lg mb-2">আজকালকার ছেলেমেয়েরা বড় বেশি বাস্তববাদী, তাদের কাছে রহস্য গল্প মানেই মিথ্যা কাহিনী।</p>
            <p>© {new Date().getFullYear()} Humayun Ahmed Digital Archive. Open Source.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
