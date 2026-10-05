"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Camera, Truck, IndianRupee, Plus, Wallet } from "lucide-react";

export function SellerCtaSection() {
  const router = useRouter();
  const { user, openAuth } = useApp();

  const handleStartSelling = () => {
    if (!user) {
      openAuth("signup");
    } else {
      router.push("/sell");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="bg-ink text-white rounded-3xl overflow-hidden grid md:grid-cols-2 relative shadow-card">
        <div className="dot-grid absolute inset-0 opacity-30 pointer-events-none" />

        <div className="p-8 lg:p-12 relative">
          <span className="bg-sun text-ink text-[11px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase">
            For Sellers
          </span>
          <h3 className="font-display font-black text-3xl lg:text-4xl mt-4 leading-tight">
            Turn your shelf into cash in 60 seconds.
          </h3>
          <p className="text-white/60 mt-3 text-sm sm:text-base leading-relaxed">
            Snap a photo, set your price, get paid on pickup. Zero listing fee. 4.9★ seller support.
          </p>

          <ul className="mt-5 space-y-2.5 text-sm font-semibold">
            <li className="flex items-center gap-3">
              <span className="w-7 h-7 bg-tealx/20 rounded-lg flex items-center justify-center">
                <Camera className="w-4 h-4 text-tealx" />
              </span>
              <span>Free photo &amp; price guidance</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-7 h-7 bg-tealx/20 rounded-lg flex items-center justify-center">
                <Truck className="w-4 h-4 text-tealx" />
              </span>
              <span>Doorstep pickup in 40+ cities</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-7 h-7 bg-tealx/20 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-tealx" />
              </span>
              <span>Instant UPI payout on delivery</span>
            </li>
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={handleStartSelling}
              className="bg-sun text-ink font-extrabold px-7 py-3.5 rounded-2xl hover:bg-white transition text-sm flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Start Selling — It&apos;s Free</span>
            </button>
            <Link
              href="/browse"
              className="border-2 border-white/20 font-bold px-6 py-3.5 rounded-2xl hover:border-white transition text-sm flex items-center justify-center text-white"
            >
              See what sells
            </Link>
          </div>
        </div>

        {/* Right Visual Image */}
        <div className="relative min-h-[280px]">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Library"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://picsum.photos/seed/sell/800/600";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent" />

          {/* Floating Earnings Card */}
          <div className="absolute bottom-6 right-6 left-6 sm:left-auto bg-white text-ink rounded-2xl p-4 shadow-2xl flex items-center gap-4 pop-in border border-ink/10">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-ink/50 uppercase tracking-wide">
                Avg. seller earns
              </div>
              <div className="font-display font-black text-2xl">
                ₹4,280
                <span className="text-sm font-sans font-bold text-ink/40">/month</span>
              </div>
            </div>
            <div className="ml-auto bg-green-500 text-white text-xs font-extrabold px-2 py-1 rounded-lg">
              +18%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
