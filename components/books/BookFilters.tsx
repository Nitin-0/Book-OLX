"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, CONDITIONS, LOCATIONS } from "@/data/categories";
import { BookCondition } from "@/types";
import { Leaf, Star, Check } from "lucide-react";

export function BookFilters() {
  const { filters, setFilters, clearFilters, listings } = useApp();

  const handleTypeChange = (type: "all" | "new" | "used") => {
    setFilters((prev) => ({ ...prev, type }));
  };

  const handleCategoryToggle = (cat: string) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(cat);
      const newCats = exists ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat];
      return { ...prev, categories: newCats };
    });
  };

  const handleConditionToggle = (cond: BookCondition) => {
    setFilters((prev) => {
      const exists = prev.conditions.includes(cond);
      const newConds = exists
        ? prev.conditions.filter((c) => c !== cond)
        : [...prev.conditions, cond];
      return { ...prev, conditions: newConds };
    });
  };

  const conditionDot: Record<string, string> = {
    New: "bg-green-500",
    "Like New": "bg-teal-500",
    "Very Good": "bg-blue-500",
    Good: "bg-amber-500",
    Acceptable: "bg-gray-500",
  };

  return (
    <div className="bg-white rounded-3xl border border-ink/10 p-5 shadow-sm space-y-6">
      {/* Condition Type */}
      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-sm">Condition type</h4>
          <button
            onClick={clearFilters}
            className="text-[11px] font-extrabold text-red-500 hover:underline cursor-pointer"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1.5 mt-2.5 bg-paper rounded-2xl p-1.5">
          <button
            type="button"
            onClick={() => handleTypeChange("all")}
            className={`py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              filters.type === "all" ? "bg-ink text-white shadow" : "text-ink/50 hover:text-ink"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("new")}
            className={`py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              filters.type === "new" ? "bg-ink text-white shadow" : "text-ink/50 hover:text-ink"
            }`}
          >
            ✨ New
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("used")}
            className={`py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              filters.type === "used" ? "bg-ink text-white shadow" : "text-ink/50 hover:text-ink"
            }`}
          >
            📚 Used
          </button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-extrabold text-sm mb-2.5">Categories</h4>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => {
            const count = listings.filter((b) => b.category === cat.name).length;
            const checked = filters.categories.includes(cat.name);
            return (
              <label
                key={cat.name}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-paper rounded-xl px-2 py-1.5 transition"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCategoryToggle(cat.name)}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                    checked ? "bg-ink border-ink text-sun" : "border-ink/20 bg-white"
                  }`}
                >
                  {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </span>
                <span className="flex-1 text-[13px] font-bold text-ink">{cat.name}</span>
                <span className="text-[11px] font-extrabold text-ink/30 bg-paper px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-extrabold text-sm mb-2.5">Price range</h4>
        <div className="flex gap-2">
          <div className="flex-1 bg-paper rounded-xl px-3 py-2 flex items-center gap-1">
            <span className="text-xs font-bold text-ink/40">₹</span>
            <input
              type="number"
              min={0}
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minPrice: Number(e.target.value) || 0 }))
              }
              className="w-full bg-transparent outline-none text-sm font-extrabold min-w-0"
            />
          </div>
          <div className="flex-1 bg-paper rounded-xl px-3 py-2 flex items-center gap-1">
            <span className="text-xs font-bold text-ink/40">₹</span>
            <input
              type="number"
              min={filters.minPrice}
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) || 1500 }))
              }
              className="w-full bg-transparent outline-none text-sm font-extrabold min-w-0"
            />
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={1500}
          step={50}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="mt-3 cursor-pointer"
        />

        <div className="flex justify-between text-[11px] font-bold text-ink/40 mt-1">
          <span>₹0</span>
          <span className="text-ink">Up to ₹{filters.maxPrice}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, minPrice: 0, maxPrice: 250 }))}
            className="text-[11px] font-extrabold border border-ink/20 rounded-full px-3 py-1 hover:bg-ink hover:text-white transition cursor-pointer"
          >
            Under ₹250
          </button>
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, minPrice: 250, maxPrice: 500 }))}
            className="text-[11px] font-extrabold border border-ink/20 rounded-full px-3 py-1 hover:bg-ink hover:text-white transition cursor-pointer"
          >
            ₹250–500
          </button>
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, minPrice: 500, maxPrice: 1500 }))}
            className="text-[11px] font-extrabold border border-ink/20 rounded-full px-3 py-1 hover:bg-ink hover:text-white transition cursor-pointer"
          >
            ₹500+
          </button>
        </div>
      </div>

      {/* Book Condition */}
      <div>
        <h4 className="font-extrabold text-sm mb-2.5">Book condition</h4>
        <div className="space-y-1.5">
          {CONDITIONS.map((cond) => {
            const count = listings.filter((b) => b.condition === cond).length;
            const checked = filters.conditions.includes(cond as BookCondition);
            return (
              <label
                key={cond}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-paper rounded-xl px-2 py-1.5 transition"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleConditionToggle(cond as BookCondition)}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                    checked ? "bg-ink border-ink text-sun" : "border-ink/20 bg-white"
                  }`}
                >
                  {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </span>
                <span className={`w-2.5 h-2.5 ${conditionDot[cond]} rounded-full shrink-0`} />
                <span className="flex-1 text-[13px] font-bold text-ink">{cond}</span>
                <span className="text-[11px] font-extrabold text-ink/30">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* City */}
      <div>
        <h4 className="font-extrabold text-sm mb-2.5">City</h4>
        <select
          value={filters.location}
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          className="w-full bg-paper rounded-xl px-3 py-2.5 text-sm font-bold outline-none cursor-pointer border-2 border-transparent focus:border-ink transition"
        >
          <option>All Locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-extrabold text-sm mb-2.5">Rating</h4>
        <label className="flex items-center gap-2.5 cursor-pointer bg-paper rounded-xl px-3 py-2.5 hover:bg-cream transition">
          <input
            type="checkbox"
            checked={filters.minRating === 4}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minRating: e.target.checked ? 4 : 0 }))
            }
            className="hidden"
          />
          <span
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
              filters.minRating === 4 ? "bg-ink border-ink text-sun" : "border-ink/20 bg-white"
            }`}
          >
            {filters.minRating === 4 && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </span>
          <span className="text-sm font-bold flex items-center gap-1.5">
            4 <Star className="w-3.5 h-3.5 fill-sunDark text-sunDark" /> &amp; above
          </span>
        </label>
      </div>

      {/* Eco Impact Box */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-3.5 text-xs font-semibold text-green-900 leading-relaxed flex items-start gap-2">
        <Leaf className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
        <span>
          Buying used saves <strong>2.7kg CO₂</strong> per book. You are browsing{" "}
          <strong>{listings.length} listings</strong> today. 🌱
        </span>
      </div>
    </div>
  );
}
