"use client";

import React from "react";
import { Search, ShoppingBag, BookOpen, ShieldCheck, RotateCcw, Award, Leaf } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Discover & Chat",
      desc: "Search 25,000+ new & pre-loved books. Filter by condition, price and city. Chat with verified sellers instantly.",
      icon: <Search className="w-6 h-6 text-sun" />,
      boxStyle: "bg-ink shadow-popSm",
    },
    {
      num: "02",
      title: "Pay Securely",
      desc: "UPI, cards or cash on delivery. Money is held safely until you confirm the book matches its condition.",
      icon: <ShoppingBag className="w-6 h-6 text-ink" />,
      boxStyle: "bg-sun border-2 border-ink shadow-popSm",
    },
    {
      num: "03",
      title: "Read & Re-sell",
      desc: "Enjoy doorstep delivery in 2–4 days. Finished reading? Re-list in one tap and keep the story going.",
      icon: <BookOpen className="w-6 h-6 text-ink" />,
      boxStyle: "bg-tealx border-2 border-ink shadow-popSm",
    },
  ];

  return (
    <div className="bg-white border-y border-ink/10 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-ink/40">
            How BookOLX works
          </span>
          <h2 className="font-display font-black text-3xl mt-2 text-ink">
            Old-school bazaar, new-school ease
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-paper rounded-3xl p-6 border border-ink/10 hover:shadow-card hover:-translate-y-1 transition-all relative overflow-hidden"
            >
              <div className="font-display font-black text-6xl text-ink/10 absolute top-3 right-5 pointer-events-none select-none">
                {st.num}
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${st.boxStyle}`}>
                {st.icon}
              </div>
              <h3 className="font-extrabold text-lg mt-4 text-ink">{st.title}</h3>
              <p className="text-sm text-ink/55 mt-2 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Protection Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-extrabold">
          <span className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-green-600" /> Buyer Protection
          </span>
          <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full">
            <RotateCcw className="w-4 h-4 text-blue-600" /> 7-Day Easy Returns
          </span>
          <span className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full">
            <Award className="w-4 h-4 text-amber-600" /> Verified Sellers
          </span>
          <span className="flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-800 px-4 py-2 rounded-full">
            <Leaf className="w-4 h-4 text-purple-600" /> 1 Book = 2.7kg CO₂ Saved
          </span>
        </div>
      </div>
    </div>
  );
}
