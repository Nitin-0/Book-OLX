"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { BookCard } from "@/components/books/BookCard";
import { ArrowRight } from "lucide-react";

export function FreshRecommendations() {
  const { listings } = useApp();
  const [activeTab, setActiveTab] = useState<"all" | "new" | "used" | "under250">("all");

  let filtered = [...listings];
  if (activeTab === "new") {
    filtered = filtered.filter((b) => b.type === "new");
  } else if (activeTab === "used") {
    filtered = filtered.filter((b) => b.type === "used");
  } else if (activeTab === "under250") {
    filtered = filtered.filter((b) => b.price < 250);
  }

  // Sort featured first, then show 8 items
  filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const displayBooks = filtered.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-green-700 bg-green-100 w-fit px-3 py-1 rounded-full mb-2">
            <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" /> FRESH TODAY
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
            Fresh recommendations
          </h2>
          <p className="text-sm text-ink/50 font-medium mt-1">
            Handpicked for you from 2,000+ sellers
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white border border-ink/10 rounded-full p-1 gap-1 w-fit shadow-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition cursor-pointer ${
              activeTab === "all" ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition cursor-pointer ${
              activeTab === "new" ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            New
          </button>
          <button
            onClick={() => setActiveTab("used")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition cursor-pointer ${
              activeTab === "used" ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            Pre-loved
          </button>
          <button
            onClick={() => setActiveTab("under250")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition cursor-pointer whitespace-nowrap ${
              activeTab === "under250" ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            Under ₹250
          </button>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {displayBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Explore All CTA */}
      <div className="text-center mt-8">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 bg-white border-2 border-ink font-extrabold px-8 py-3 rounded-2xl shadow-pop hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all text-sm text-ink"
        >
          <span>Explore all books</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
