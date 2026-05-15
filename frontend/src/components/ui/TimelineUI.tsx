"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clapperboard, MonitorPlay, Sparkles, Feather, FileText } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export const categoryIcons: Record<string, ReactNode> = {
  NOVEL: <BookOpen size={20} />,
  NATOK: <MonitorPlay size={20} />,
  MOVIE: <Clapperboard size={20} />,
  SCIENCE_FICTION: <Sparkles size={20} />,
  MEMOIR: <Feather size={20} />,
  SHORT_STORY: <FileText size={20} />,
};

interface TimelineLayoutProps {
  children: ReactNode;
}

export function TimelineLayout({ children }: TimelineLayoutProps) {
  return (
    <div className="relative container mx-auto px-6 py-12">
      {/* Center line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
      <div className="relative flex flex-col gap-12 sm:gap-20">
        {children}
      </div>
    </div>
  );
}

interface DecadeMarkerProps {
  decade: string;
}

export function DecadeMarker({ decade }: DecadeMarkerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex justify-start md:justify-center w-full z-10 sticky top-24"
    >
      <div className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold tracking-widest shadow-lg shadow-yellow-500/20 text-lg md:text-xl transform -translate-x-1/2 md:translate-x-0 ml-6 md:ml-0 border border-yellow-400">
        {decade}
      </div>
    </motion.div>
  );
}

interface TimelineItemProps {
  id: string;
  title: string;
  originalTitle: string;
  category: string;
  year: number;
  description?: string;
  align: "left" | "right";
}

export function TimelineItem({ id, title, originalTitle, category, year, description, align }: TimelineItemProps) {
  const isLeft = align === "left";
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={clsx(
        "flex flex-col md:flex-row w-full items-center relative",
        isLeft ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Spacer for the other side */}
      <div className="hidden md:block md:w-1/2" />

      {/* The node/dot */}
      <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)] transform -translate-x-1/2 border-2 border-[#0a0a0a] z-10" />

      {/* Content Card */}
      <div className={clsx(
        "w-full md:w-1/2 pl-16 md:pl-0",
        isLeft ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"
      )}>
        <Link href={`/works/${id}`} className="group block bg-neutral-900 border border-white/5 rounded-xl p-6 hover:border-yellow-500/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/10">
          <div className={clsx(
            "flex items-center gap-3 mb-3 text-yellow-500",
            isLeft ? "md:justify-end" : "justify-start"
          )}>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              {categoryIcons[category] || <BookOpen size={20} />}
            </div>
            <span className="font-semibold tracking-wider text-sm">{year}</span>
          </div>

          <h3 className="text-2xl font-bold font-bengali text-white mb-1 group-hover:text-yellow-400 transition-colors">
            {originalTitle}
          </h3>
          <p className="text-neutral-400 font-medium mb-3">{title}</p>
          
          {description && (
            <p className="text-neutral-500 text-sm line-clamp-2 mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </Link>
      </div>
    </motion.div>
  );
}
