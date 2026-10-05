"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Home, Search, Plus, Heart, User } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist, user, openAuth } = useApp();

  const isHome = pathname === "/";
  const isBrowse = pathname.startsWith("/browse");
  const isWishlist = pathname.startsWith("/wishlist");
  const isProfile = pathname.startsWith("/profile");

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 bg-white/98 backdrop-blur border-t border-ink/10 z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-5 gap-1 px-2 pt-2 pb-2">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 rounded-xl text-[10px] font-extrabold transition ${
            isHome ? "text-ink" : "text-ink/40"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* Search */}
        <Link
          href="/browse"
          className={`flex flex-col items-center gap-1 py-1 rounded-xl text-[10px] font-extrabold transition ${
            isBrowse ? "text-ink" : "text-ink/40"
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </Link>

        {/* Floating SELL button */}
        <button
          onClick={() => {
            if (!user) openAuth("signup");
            else router.push("/sell");
          }}
          className="flex flex-col items-center -mt-6 cursor-pointer"
        >
          <span className="w-13 h-13 bg-sun border-[3px] border-ink rounded-2xl flex items-center justify-center shadow-pop rotate-3 active:rotate-0 transition">
            <Plus className="w-6 h-6 text-ink stroke-[3]" />
          </span>
          <span className="text-[10px] font-extrabold mt-1 text-ink">SELL</span>
        </button>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center gap-1 py-1 rounded-xl text-[10px] font-extrabold transition ${
            isWishlist ? "text-ink" : "text-ink/40"
          }`}
        >
          <Heart className="w-5 h-5" />
          <span>Saved</span>
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-3 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Account */}
        <Link
          href="/profile"
          className={`flex flex-col items-center gap-1 py-1 rounded-xl text-[10px] font-extrabold transition ${
            isProfile ? "text-ink" : "text-ink/40"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Account</span>
        </Link>
      </div>
    </nav>
  );
}
