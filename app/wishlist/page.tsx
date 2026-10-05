"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { BookCard } from "@/components/books/BookCard";
import { ChevronRight, Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, getBook, toggleWishlist, showToast } = useApp();

  const savedBooks = wishlist.map(getBook).filter(Boolean) as ReturnType<typeof getBook>[];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold text-ink/40">
        <Link href="/" className="hover:text-ink transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink">Wishlist</span>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-ink">
            Your wishlist ❤️
          </h1>
          <p className="text-sm font-semibold text-ink/50 mt-1">
            {savedBooks.length} saved {savedBooks.length === 1 ? "book" : "books"}
          </p>
        </div>

        {savedBooks.length > 0 && (
          <button
            onClick={() => {
              savedBooks.forEach((b) => b && toggleWishlist(b.id));
            }}
            className="text-xs font-extrabold text-red-500 hover:underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {savedBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">
          {savedBooks.map((book) => book && <BookCard key={book.id} book={book} />)}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-ink/20 mt-6 max-w-xl mx-auto">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-display font-black text-xl mt-4 text-ink">Nothing saved yet</h3>
          <p className="text-sm text-ink/50 mt-1">
            Tap the heart icon on any book to save it for later.
          </p>
          <Link
            href="/browse"
            className="mt-5 inline-block bg-ink text-white font-extrabold text-sm px-7 py-3 rounded-2xl hover:bg-inkLight transition"
          >
            Discover books
          </Link>
        </div>
      )}
    </div>
  );
}
