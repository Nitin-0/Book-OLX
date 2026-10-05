"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { CATEGORIES } from "@/data/categories";
import {
  BookOpen,
  Layers,
  ArrowRight,
  Landmark,
  Sparkles,
  Rocket,
  Sprout,
  Briefcase,
  Hourglass,
  Cpu,
  Coins,
  Feather,
  Palette,
  Brain,
} from "lucide-react";

export function CategoryShelves() {
  const router = useRouter();
  const { listings, setFilters, clearFilters } = useApp();

  const handleCategorySelect = (catName: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: [catName],
      type: "all",
      search: "",
    }));
    router.push("/browse");
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      case "Landmark":
        return <Landmark className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Rocket":
        return <Rocket className="w-5 h-5" />;
      case "Sprout":
        return <Sprout className="w-5 h-5" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5" />;
      case "Hourglass":
        return <Hourglass className="w-5 h-5" />;
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Coins":
        return <Coins className="w-5 h-5" />;
      case "Feather":
        return <Feather className="w-5 h-5" />;
      case "Palette":
        return <Palette className="w-5 h-5" />;
      case "Brain":
        return <Brain className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
            Browse by category
          </h2>
          <p className="text-sm text-ink/50 font-medium mt-1">
            12 curated shelves • updated hourly
          </p>
        </div>
        <Link
          href="/browse"
          className="hidden sm:flex items-center gap-2 text-sm font-extrabold text-ink hover:gap-3 transition-all"
        >
          <span>View all</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
        {/* All Books Card */}
        <button
          onClick={() => {
            clearFilters();
            router.push("/browse");
          }}
          className="shrink-0 w-28 sm:w-32 bg-ink text-white rounded-2xl p-3.5 text-left hover:-translate-y-1 transition shadow-card cursor-pointer"
        >
          <span className="w-10 h-10 bg-sun rounded-xl flex items-center justify-center text-ink">
            <Layers className="w-5 h-5" />
          </span>
          <div className="font-extrabold text-sm mt-2.5">All Books</div>
          <div className="text-[11px] text-white/50 font-bold">{listings.length} listings</div>
        </button>

        {/* Category Cards */}
        {CATEGORIES.map((cat) => {
          const count = listings.filter((b) => b.category === cat.name).length;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className="shrink-0 w-28 sm:w-32 bg-white border border-ink/10 rounded-2xl p-3.5 text-left hover:border-ink hover:shadow-card hover:-translate-y-1 transition cursor-pointer"
            >
              <span
                className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center`}
              >
                {getIcon(cat.icon)}
              </span>
              <div className="font-extrabold text-sm mt-2.5 truncate text-ink">{cat.name}</div>
              <div className="text-[11px] text-ink/40 font-bold">{count} books</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
