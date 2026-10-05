"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { triggerGlobalConfetti } from "@/components/ui/Confetti";
import { Star, Gift, Package } from "lucide-react";

export function TestimonialsSection() {
  const { showToast } = useApp();
  const [email, setEmail] = useState("");

  const testimonials = [
    {
      name: "Ritika Malhotra",
      city: "Delhi",
      avatar: "https://i.pravatar.cc/60?img=36",
      text: "Bought 6 books for the price of 2 new ones. The condition grading was spot-on — 'Like New' genuinely looked untouched!",
      badge: "Atomic Habits + 5 more",
    },
    {
      name: "Farhan Sheikh",
      city: "Bangalore",
      avatar: "https://i.pravatar.cc/60?img=14",
      text: "Sold my entire engineering shelf in 3 days. Doorstep pickup, instant UPI payment. This is how OLX should feel for books.",
      badge: "Sold 22 books • ₹6,400 earned",
    },
    {
      name: "Lakshmi Venkat",
      city: "Chennai",
      avatar: "https://i.pravatar.cc/60?img=25",
      text: "The chat with sellers is so smooth. Negotiated politely, met at a café, got a first-edition classic. My weekend ritual now!",
      badge: "Pride & Prejudice • ₹159",
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    triggerGlobalConfetti(90);
    showToast("Welcome aboard! ₹100 coupon sent to your email 🎁");
    setEmail("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
            Loved by readers across India
          </h2>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="flex text-sunDark">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-sunDark text-sunDark" />
              ))}
            </span>
            <strong className="text-ink">4.9/5</strong>
            <span className="text-ink/40">• 12,400+ verified reviews</span>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid sm:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white border border-ink/10 rounded-3xl p-5 hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex text-sunDark gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-sunDark text-sunDark" />
                ))}
              </div>
              <p className="text-sm font-medium text-ink/70 mt-3 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-ink/10">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                  alt={t.name}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm text-ink truncate">{t.name}</div>
                  <div className="text-[11px] font-bold text-ink/40">
                    {t.city} • Verified Buyer
                  </div>
                </div>
              </div>
              <div className="mt-3 bg-paper rounded-xl px-3 py-2 text-[11px] font-extrabold text-ink/60 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-ink/40 shrink-0" />
                <span className="truncate">{t.badge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Claim Banner */}
      <div className="mt-10 bg-gradient-to-r from-sun via-[#FFE27A] to-sun rounded-3xl border-2 border-ink shadow-pop p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-14 h-14 bg-ink rounded-2xl flex items-center justify-center shrink-0 rotate-3 shadow-popSm">
          <Gift className="w-7 h-7 text-sun" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-display font-black text-xl sm:text-2xl text-ink">
            Get ₹100 off your first pre-loved haul
          </h3>
          <p className="text-sm font-semibold text-ink/60 mt-1">
            Join 48,000+ readers. Weekly drops, seller tips &amp; exclusive coupons.
          </p>
        </div>
        <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-2">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 sm:w-56 px-4 py-3 rounded-xl border-2 border-ink outline-none text-sm font-semibold bg-white"
          />
          <button
            type="submit"
            className="bg-ink text-white font-extrabold px-5 py-3 rounded-xl text-sm hover:bg-inkLight transition whitespace-nowrap cursor-pointer"
          >
            Claim ₹100
          </button>
        </form>
      </div>
    </div>
  );
}
