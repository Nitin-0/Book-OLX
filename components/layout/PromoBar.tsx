"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export function PromoBar() {
  const { showToast } = useApp();

  const copyCode = (code: string) => {
    try {
      navigator.clipboard.writeText(code);
    } catch {}
    showToast(`Code ${code} copied! Apply at cart.`, "info");
  };

  return (
    <div
      className="bg-ink text-white text-xs sm:text-sm relative z-40"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 truncate">
          <span className="bg-sun text-ink px-2 py-0.5 rounded-full font-extrabold text-[10px] shrink-0">
            NEW
          </span>
          <span className="truncate">
            Flat 10% off first order • Use code{" "}
            <button
              onClick={() => copyCode("BOOK10")}
              className="underline font-bold text-sun hover:text-white transition cursor-pointer"
            >
              BOOK10
            </button>
          </span>
        </p>

        <div className="hidden sm:flex items-center gap-4 text-white/60 text-xs font-semibold shrink-0">
          <Link href="/browse" className="hover:text-white transition">
            Help
          </Link>
          <span className="w-px h-3 bg-white/20" />
          <span>EN | ₹ INR</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            1,248 online
          </span>
        </div>
      </div>
    </div>
  );
}
