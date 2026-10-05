"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { BookFilters } from "@/components/books/BookFilters";
import { BookCard } from "@/components/books/BookCard";
import {
  ChevronRight,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  Search,
  BookOpen,
  X,
} from "lucide-react";

function BrowseContent() {
  const { listings, filters, setFilters, clearFilters } = useApp();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Compute active filters
  const getActiveFilterCount = () => {
    let count = filters.categories.length + filters.conditions.length;
    if (filters.type !== "all") count++;
    if (filters.location !== "All Locations") count++;
    if (filters.minPrice > 0 || filters.maxPrice < 1500) count++;
    if (filters.minRating > 0) count++;
    if (filters.search) count++;
    return count;
  };

  const removeChip = (type: string, val?: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (type === "cat" && val) next.categories = next.categories.filter((c) => c !== val);
      if (type === "cond" && val) next.conditions = next.conditions.filter((c) => c !== val);
      if (type === "type") next.type = "all";
      if (type === "loc") next.location = "All Locations";
      if (type === "price") {
        next.minPrice = 0;
        next.maxPrice = 1500;
      }
      if (type === "search") next.search = "";
      if (type === "rating") next.minRating = 0;
      return next;
    });
  };

  // Filter books
  let filtered = [...listings];
  const q = filters.search.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter((b) =>
      (
        b.title +
        " " +
        b.author +
        " " +
        b.category +
        " " +
        b.isbn +
        " " +
        b.description +
        " " +
        b.seller +
        " " +
        b.location
      )
        .toLowerCase()
        .includes(q)
    );
  }
  if (filters.categories.length > 0) {
    filtered = filtered.filter((b) => filters.categories.includes(b.category));
  }
  filtered = filtered.filter(
    (b) => b.price >= filters.minPrice && b.price <= filters.maxPrice
  );
  if (filters.conditions.length > 0) {
    filtered = filtered.filter((b) => filters.conditions.includes(b.condition));
  }
  if (filters.type !== "all") {
    filtered = filtered.filter((b) => b.type === filters.type);
  }
  if (filters.location !== "All Locations") {
    filtered = filtered.filter((b) => b.location.includes(filters.location));
  }
  if (filters.minRating > 0) {
    filtered = filtered.filter((b) => b.rating >= filters.minRating);
  }

  // Sorting
  const sort = filters.sort;
  if (sort === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "newest") {
    filtered.sort((a, b) => a.postedDays - b.postedDays);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "discount") {
    const disc = (b: (typeof filtered)[0]) =>
      b.mrp > b.price ? (1 - b.price / b.mrp) * 100 : 0;
    filtered.sort((a, b) => disc(b) - disc(a));
  } else {
    // Featured
    filtered.sort(
      (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating
    );
  }

  const activeCount = getActiveFilterCount();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-ink/40">
        <Link href="/" className="hover:text-ink transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink">Browse Books</span>
      </div>

      {/* Header & Sort Controls */}
      <div className="mt-3 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-ink">
            Explore the bazaar
          </h1>
          <p className="text-sm font-semibold text-ink/50 mt-1">
            <span>{filtered.length} books found</span> •{" "}
            <span className="text-green-700">updated 5 min ago</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-ink text-white font-bold text-sm px-4 py-2.5 rounded-xl cursor-pointer shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-sun" />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="bg-sun text-ink text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold">
                {activeCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white border border-ink/15 rounded-xl px-3 py-2.5">
            <ArrowDownWideNarrow className="w-4 h-4 text-ink/40" />
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value as (typeof filters)["sort"],
                }))
              }
              className="bg-transparent text-sm font-bold outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.search && (
            <span className="flex items-center gap-2 bg-ink text-white text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full pop-in">
              <span>🔍 &ldquo;{filters.search}&rdquo;</span>
              <button
                onClick={() => removeChip("search")}
                className="w-5 h-5 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-[10px] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.categories.map((c) => (
            <span
              key={c}
              className="flex items-center gap-2 bg-white border border-ink/10 text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full pop-in text-ink shadow-sm"
            >
              <span>{c}</span>
              <button
                onClick={() => removeChip("cat", c)}
                className="w-5 h-5 bg-paper hover:bg-ink hover:text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.conditions.map((c) => (
            <span
              key={c}
              className="flex items-center gap-2 bg-white border border-ink/10 text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full pop-in text-ink shadow-sm"
            >
              <span>{c}</span>
              <button
                onClick={() => removeChip("cond", c)}
                className="w-5 h-5 bg-paper hover:bg-ink hover:text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.type !== "all" && (
            <span className="flex items-center gap-2 bg-sun border border-ink text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full pop-in text-ink shadow-sm">
              <span>{filters.type === "new" ? "✨ New" : "📚 Pre-loved"}</span>
              <button
                onClick={() => removeChip("type")}
                className="w-5 h-5 bg-ink text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(filters.minPrice > 0 || filters.maxPrice < 1500) && (
            <span className="flex items-center gap-2 bg-white border border-ink/10 text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full pop-in text-ink shadow-sm">
              <span>
                ₹{filters.minPrice}–₹{filters.maxPrice}
              </span>
              <button
                onClick={() => removeChip("price")}
                className="w-5 h-5 bg-paper hover:bg-ink hover:text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.location !== "All Locations" && (
            <span className="flex items-center gap-2 bg-white border border-ink/10 text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full pop-in text-ink shadow-sm">
              <span>📍 {filters.location}</span>
              <button
                onClick={() => removeChip("loc")}
                className="w-5 h-5 bg-paper hover:bg-ink hover:text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="flex items-center gap-2 bg-white border border-ink/10 text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-full pop-in text-ink shadow-sm">
              <span>★ 4+ rated</span>
              <button
                onClick={() => removeChip("rating")}
                className="w-5 h-5 bg-paper hover:bg-ink hover:text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer transition"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={clearFilters}
            className="text-xs font-extrabold text-red-600 hover:underline px-2 py-1 cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Grid & Sidebar Layout */}
      <div className="flex gap-6 mt-5 items-start">
        {/* Desktop Sticky Filters Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
          <BookFilters />
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* Quick Search within results */}
          <div className="bg-white border border-ink/10 rounded-2xl p-2 flex items-center gap-2 mb-4 shadow-sm">
            <Search className="w-4 h-4 text-ink/30 ml-2" />
            <input
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              placeholder="Search within results…"
              className="flex-1 outline-none text-sm font-medium bg-transparent py-1.5 min-w-0"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                className="text-xs font-extrabold text-ink/40 hover:text-ink px-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Book Cards Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-5">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-ink/20">
              <div className="w-20 h-20 bg-paper rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-ink/20" />
              </div>
              <h3 className="font-display font-black text-xl mt-4 text-ink">
                No books match those filters
              </h3>
              <p className="text-sm text-ink/50 mt-1">
                Try widening your price range or clearing categories.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-ink text-white font-bold text-sm px-6 py-2.5 rounded-xl cursor-pointer hover:bg-inkLight transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 modal-bg"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[88%] max-w-sm bg-paper shadow-2xl flex flex-col pop-in overflow-hidden">
            <div className="bg-ink text-white p-4 flex items-center justify-between shrink-0">
              <div className="font-extrabold flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sun" />
                <span>Filters</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <BookFilters />
            </div>
            <div className="p-4 bg-white border-t border-ink/10 flex gap-2 shrink-0">
              <button
                onClick={clearFilters}
                className="flex-1 border-2 border-ink/15 font-extrabold py-3 rounded-2xl text-sm"
              >
                Clear
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-[2] bg-ink text-white font-extrabold py-3 rounded-2xl text-sm"
              >
                Show {filtered.length} books
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return <BrowseContent />;
}
