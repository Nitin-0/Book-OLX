"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Search, BookOpen, Star, Check } from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const { setFilters } = useApp();
  const [heroSearchText, setHeroSearchText] = useState("");

  const handleHeroSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!heroSearchText.trim()) return;
    setFilters((prev) => ({ ...prev, search: heroSearchText.trim() }));
    router.push("/browse");
  };

  const handleQuickPill = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
    router.push("/browse");
  };

  const marqueeItems = [
    "♻️ SAVE TREES & MONEY",
    "UP TO 70% OFF MRP",
    "🚚 FREE SHIPPING OVER ₹500",
    "✓ VERIFIED SELLERS",
    "7-DAY EASY RETURNS",
    "48,000+ HAPPY READERS",
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-cream via-paper to-[#FFF0B8]">
      <div className="hero-pattern absolute inset-0 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-sun/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tealx/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center relative">
        {/* Left Column */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white border border-ink/10 rounded-full pl-2 pr-4 py-1.5 text-xs font-bold shadow-sm mb-5">
            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
            </span>
            <span>2,347 books sold this week</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.8rem] font-black leading-[1.04] tracking-tight text-ink">
            Give every book
            <br />
            <span className="relative inline-block">
              a second story.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 Q 75 2 150 7 T 298 5"
                  stroke="#FFCE32"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 text-ink/60 text-base sm:text-lg max-w-xl leading-relaxed">
            Buy pre-loved books at up to <strong className="text-ink">70% off MRP</strong>. Sell your shelf
            in 60 seconds. India&apos;s most loved second-hand book bazaar.
          </p>

          {/* Hero Search Box */}
          <form
            onSubmit={handleHeroSearch}
            className="mt-6 bg-white rounded-2xl p-2 shadow-card border border-ink/10 flex flex-col sm:flex-row gap-2 max-w-xl"
          >
            <div className="flex flex-1 items-center gap-2 px-3 py-1">
              <Search className="w-5 h-5 text-ink/30 shrink-0" />
              <input
                value={heroSearchText}
                onChange={(e) => setHeroSearchText(e.target.value)}
                placeholder="Try 'Atomic Habits' or 'Dune'…"
                className="flex-1 outline-none text-sm font-medium bg-transparent py-2 min-w-0"
              />
            </div>
            <button
              type="submit"
              className="bg-ink text-white rounded-xl px-6 py-3 font-bold text-sm hover:bg-inkLight transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <BookOpen className="w-4 h-4 text-sun" />
              <span>Search Books</span>
            </button>
          </form>

          {/* Quick Pills */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-ink/40">Popular:</span>
            {["Atomic Habits", "Harry Potter", "Dune", "Finance"].map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleQuickPill(topic)}
                className="bg-white border border-ink/10 rounded-full px-3 py-1.5 hover:border-ink hover:shadow-popSm hover:-translate-y-0.5 transition cursor-pointer text-ink"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Counters */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl text-ink">25K+</div>
              <div className="text-xs font-bold text-ink/50 uppercase tracking-wide">
                Books listed
              </div>
            </div>
            <div className="border-x border-ink/10 px-4">
              <div className="font-display font-black text-2xl sm:text-3xl text-ink">48K+</div>
              <div className="text-xs font-bold text-ink/50 uppercase tracking-wide">
                Happy readers
              </div>
            </div>
            <div>
              <div className="font-display font-black text-2xl sm:text-3xl flex items-center gap-1 text-ink">
                4.9 <Star className="w-5 h-5 fill-sunDark text-sunDark" />
              </div>
              <div className="text-xs font-bold text-ink/50 uppercase tracking-wide">
                Avg rating
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Visual Floating Books */}
        <div className="relative hidden md:block h-[480px]">
          {/* Card 1 */}
          <div className="absolute left-4 top-8 w-56 book-3d animate-floaty">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500&auto=format&fit=crop"
                className="w-full h-64 object-cover"
                alt="Atomic Habits"
              />
              <div className="p-3">
                <div className="font-extrabold text-sm text-ink truncate">Atomic Habits</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-black text-ink">₹349</span>
                  <span className="text-xs line-through text-ink/40">₹899</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="absolute right-8 top-0 w-60 book-3d animate-floaty2"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=500&auto=format&fit=crop"
                className="w-full h-72 object-cover"
                alt="Dune"
              />
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    BRAND NEW
                  </span>
                </div>
                <div className="font-extrabold text-sm mt-1 text-ink truncate">
                  Dune • Deluxe Edition
                </div>
                <div className="font-black mt-0.5 text-ink">₹549</div>
              </div>
            </div>
          </div>

          {/* Live notification pill 1 */}
          <div
            className="absolute left-0 bottom-6 bg-white rounded-2xl shadow-card border border-ink/10 p-3 flex items-center gap-3 animate-floaty"
            style={{ animationDelay: "1.4s" }}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-green-600 stroke-[3]" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-ink">SOLD in 12 mins</div>
              <div className="text-xs text-ink/50">Psychology of Money • ₹279</div>
            </div>
          </div>

          {/* Live notification pill 2 */}
          <div
            className="absolute right-2 bottom-16 bg-ink text-white rounded-2xl shadow-card p-3 flex items-center gap-3 animate-floaty2"
            style={{ animationDelay: "0.4s" }}
          >
            <img
              src="https://i.pravatar.cc/60?img=32"
              className="w-10 h-10 rounded-full border-2 border-sun shrink-0"
              alt="Seller"
            />
            <div>
              <div className="text-xs font-extrabold">Sneha just listed 3 books</div>
              <div className="text-[11px] text-white/60">Hyderabad • 2 min ago</div>
            </div>
          </div>

          {/* Floating Sticker */}
          <div className="absolute left-1/3 top-2 bg-sun border-2 border-ink rounded-full px-4 py-1.5 font-extrabold text-xs shadow-popSm rotate-[-6deg] text-ink pointer-events-none">
            UP TO 70% OFF MRP
          </div>
        </div>
      </div>

      {/* Infinite Marquee Banner */}
      <div className="bg-ink text-sun py-2.5 overflow-hidden relative">
        <div className="marquee-track gap-8 text-xs sm:text-sm font-extrabold tracking-widest uppercase">
          <span className="flex gap-8 pr-8">
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-8 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-white/30">•</span>
              </span>
            ))}
          </span>
          <span className="flex gap-8 pr-8">
            {marqueeItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-8 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-white/30">•</span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
