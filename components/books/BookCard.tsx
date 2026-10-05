"use client";

import React from "react";
import Link from "next/link";
import { Book } from "@/types";
import { useApp } from "@/context/AppContext";
import { Heart, ShoppingBag, Star, Clock } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { isWishlisted, toggleWishlist, addToCart, user } = useApp();
  const wish = isWishlisted(book.id);
  const discount = book.mrp > book.price ? Math.round((1 - book.price / book.mrp) * 100) : 0;
  const isMine = Boolean(user && book.mine && book.sellerId === user.email);

  const conditionColorMap: Record<string, string> = {
    New: "bg-green-500",
    "Like New": "bg-teal-500",
    "Very Good": "bg-blue-500",
    Good: "bg-amber-500",
    Acceptable: "bg-gray-500",
  };

  return (
    <div className="book-card group bg-white rounded-2xl overflow-hidden border border-ink/10 hover:border-ink/25 hover:shadow-card transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Cover Image & Badges */}
      <div className="relative overflow-hidden shrink-0">
        <Link href={`/books/${book.id}`} className="block">
          <img
            src={book.image}
            alt={book.title}
            loading="lazy"
            className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${book.id}/600/500`;
            }}
          />
        </Link>

        {/* Top-left pills */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 items-start pointer-events-none">
          <span
            className={`text-white text-[10px] font-extrabold px-2 py-0.5 rounded-lg ${
              conditionColorMap[book.condition] || "bg-ink"
            } shadow`}
          >
            {book.condition.toUpperCase()}
          </span>
          {book.type === "new" ? (
            <span className="bg-sun text-ink border border-ink text-[10px] font-extrabold px-2 py-0.5 rounded-lg">
              ✨ NEW
            </span>
          ) : (
            <span className="bg-ink/90 backdrop-blur text-tealx text-[10px] font-extrabold px-2 py-0.5 rounded-lg">
              PRE-LOVED
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(book.id);
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow transition cursor-pointer hover:scale-110 ${
            wish ? "bg-red-500 text-white" : "bg-white/95 text-ink hover:text-red-500"
          }`}
          title={wish ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wish ? "fill-white" : ""}`} />
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute bottom-2 left-2 bg-green-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-lg pointer-events-none">
            -{discount}% OFF
          </span>
        )}

        {/* Mine Badge */}
        {isMine && (
          <span className="absolute bottom-2 right-2 bg-sun text-ink border border-ink text-[10px] font-extrabold px-2 py-0.5 rounded-lg pointer-events-none">
            YOUR LISTING
          </span>
        )}
      </div>

      {/* Book Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-ink/40 uppercase">
          {book.category} • {book.location.split(",")[0]}
        </div>

        <Link
          href={`/books/${book.id}`}
          className="font-extrabold text-sm sm:text-[15px] leading-snug line-clamp-1 mt-0.5 text-ink group-hover:text-inkLight transition"
        >
          {book.title}
        </Link>
        <p className="text-xs text-ink/50 font-medium truncate">by {book.author}</p>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center text-sunDark">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.round(book.rating) ? "fill-sunDark text-sunDark" : "text-ink/20"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-ink/40">({book.reviews})</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-end justify-between mt-auto pt-2 gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-base sm:text-lg">₹{book.price}</span>
              {book.mrp > book.price && (
                <span className="text-[11px] line-through text-ink/35 font-bold">₹{book.mrp}</span>
              )}
            </div>
            <div className="text-[10px] font-bold text-ink/40 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" />
              <span>{book.postedAt}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(book.id, 1);
            }}
            className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-ink text-sun rounded-xl flex items-center justify-center hover:bg-sun hover:text-ink hover:border-ink border-2 border-ink transition shadow-popSm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
            title="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
