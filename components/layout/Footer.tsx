"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { BookOpen } from "lucide-react";

export function Footer() {
  const router = useRouter();
  const { setFilters, openAuth, user, showToast, resetDemoData } = useApp();

  const handleCategoryClick = (cat: string) => {
    setFilters((prev) => ({ ...prev, categories: [cat], type: "all" }));
    router.push("/browse");
  };

  return (
    <footer className="bg-ink text-white mt-12 relative overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 py-12 relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sun rounded-xl flex items-center justify-center">
              <BookOpen className="text-ink w-5 h-5" />
            </div>
            <div className="font-display font-black text-xl">BookOLX</div>
          </div>
          <p className="text-sm text-white/50 mt-3 leading-relaxed">
            India&apos;s friendliest second-hand book bazaar. Every pre-loved book saves money, paper,
            and 2.7kg of CO₂.
          </p>
          <div className="flex gap-2 mt-4">
            <span className="w-9 h-9 bg-white/10 hover:bg-sun hover:text-ink rounded-xl flex items-center justify-center transition cursor-pointer">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </span>
            <span className="w-9 h-9 bg-white/10 hover:bg-sun hover:text-ink rounded-xl flex items-center justify-center transition cursor-pointer">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </span>
            <span className="w-9 h-9 bg-white/10 hover:bg-sun hover:text-ink rounded-xl flex items-center justify-center transition cursor-pointer">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </span>
            <span className="w-9 h-9 bg-white/10 hover:bg-sun hover:text-ink rounded-xl flex items-center justify-center transition cursor-pointer">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </span>
          </div>
        </div>

        {/* Marketplace */}
        <div>
          <h4 className="font-extrabold text-sm tracking-widest uppercase text-sun">
            Marketplace
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-white/60">
            <li>
              <Link href="/browse" className="hover:text-white transition">
                Browse all books
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("Fiction")}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Fiction
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("Self-Help")}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Self-Help
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("Business")}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Business
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (!user) openAuth("signup");
                  else router.push("/sell");
                }}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Sell your books
              </button>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-extrabold text-sm tracking-widest uppercase text-sun">Support</h4>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-white/60">
            <li>
              <button
                onClick={() => showToast("Help center opening soon", "info")}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Help Center
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  showToast("Buyer protection: full refund if book mismatches description", "info")
                }
                className="hover:text-white transition text-left cursor-pointer"
              >
                Buyer Protection
              </button>
            </li>
            <li>
              <button
                onClick={() => showToast("7-day easy returns on all orders", "info")}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Returns &amp; Refunds
              </button>
            </li>
            <li>
              <button
                onClick={() => showToast("Shipping: 2–4 days, free over ₹500", "info")}
                className="hover:text-white transition text-left cursor-pointer"
              >
                Shipping Info
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (confirm("Reset demo data? Restores 20 original books and clears cart/orders.")) {
                    resetDemoData();
                  }
                }}
                className="hover:text-white transition text-left text-sun cursor-pointer underline"
              >
                Reset demo data
              </button>
            </li>
          </ul>
        </div>

        {/* Frontend Stack */}
        <div>
          <h4 className="font-extrabold text-sm tracking-widest uppercase text-sun">
            Frontend Architecture
          </h4>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-white/10 border border-white/10 text-xs font-bold px-3 py-1.5 rounded-full">
              ▲ Next.js 15
            </span>
            <span className="bg-white/10 border border-white/10 text-xs font-bold px-3 py-1.5 rounded-full">
              ⚛ React 19
            </span>
            <span className="bg-white/10 border border-white/10 text-xs font-bold px-3 py-1.5 rounded-full">
              TS TypeScript
            </span>
            <span className="bg-white/10 border border-white/10 text-xs font-bold px-3 py-1.5 rounded-full">
              🌊 Tailwind CSS
            </span>
            <span className="bg-white/10 border border-white/10 text-xs font-bold px-3 py-1.5 rounded-full">
              💾 localStorage
            </span>
            <span className="bg-white/10 border border-white/10 text-xs font-bold px-3 py-1.5 rounded-full">
              ✨ App Router
            </span>
          </div>
          <p className="text-[11px] text-white/40 mt-4 font-medium">
            100% frontend marketplace. Cart, listings, orders and profile persist in your browser.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-white/40">
          <span>© 2026 BookOLX • Made with 📚 in India • Pre-loved book marketplace</span>
          <span className="flex items-center gap-3">
            <span>UPI</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>COD</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
