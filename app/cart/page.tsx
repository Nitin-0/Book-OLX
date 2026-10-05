"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { PROMOS, FREE_SHIP_THRESHOLD } from "@/data/categories";
import {
  ChevronRight,
  ShoppingBag,
  Trash2,
  Ticket,
  ArrowRight,
  ArrowLeft,
  Lock,
  RotateCcw,
  ShieldCheck,
  CheckCircle,
  X,
  BookOpen,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const {
    cartTotals,
    updateCartQty,
    removeFromCart,
    clearCart,
    promoApplied,
    applyPromo,
    removePromo,
  } = useApp();

  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    if (!code) return;
    const ok = applyPromo(code);
    if (ok) setPromoInput("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold text-ink/40">
        <Link href="/" className="hover:text-ink transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink">Shopping Cart</span>
      </div>

      <div className="mt-3 flex items-end justify-between flex-wrap gap-2">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-ink">
            Your cart 🛒
          </h1>
          <p className="text-sm font-semibold text-ink/50 mt-1">
            {cartTotals.count} {cartTotals.count === 1 ? "item" : "items"} • Buyer protection
            included
          </p>
        </div>

        {cartTotals.items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-extrabold text-red-500 hover:underline cursor-pointer"
          >
            Clear cart
          </button>
        )}
      </div>

      {cartTotals.items.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-ink/20 mt-6 max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-paper rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-10 h-10 text-ink/15" />
          </div>
          <h3 className="font-display font-black text-2xl mt-5 text-ink">
            An empty shelf is a sad shelf
          </h3>
          <p className="text-sm text-ink/50 mt-2">
            Fill it with pre-loved treasures at up to 70% off.
          </p>
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            <Link
              href="/browse"
              className="bg-ink text-white font-extrabold text-sm px-7 py-3 rounded-2xl hover:bg-inkLight transition"
            >
              Browse books
            </Link>
            <Link
              href="/wishlist"
              className="border-2 border-ink/15 font-extrabold text-sm px-6 py-3 rounded-2xl hover:border-ink transition text-ink"
            >
              View wishlist
            </Link>
          </div>
        </div>
      ) : (
        /* Active Cart Layout */
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6 items-start">
          {/* Items List */}
          <div className="space-y-3">
            {cartTotals.items.map(({ book, qty }) => (
              <div
                key={book.id}
                className="bg-white rounded-3xl border border-ink/10 p-4 flex gap-4 hover:shadow-card transition fade-up"
              >
                <Link href={`/books/${book.id}`} className="shrink-0">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl object-cover hover:opacity-90 transition"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${book.id}/300/360`;
                    }}
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            book.type === "new"
                              ? "bg-green-100 text-green-700"
                              : "bg-ink text-tealx"
                          }`}
                        >
                          {book.type === "new" ? "✨ NEW" : "📚 PRE-LOVED"} •{" "}
                          {book.condition.toUpperCase()}
                        </span>
                        <Link
                          href={`/books/${book.id}`}
                          className="font-extrabold text-base sm:text-lg mt-1.5 block hover:underline truncate text-ink"
                        >
                          {book.title}
                        </Link>
                        <p className="text-xs font-semibold text-ink/45 truncate">
                          by {book.author} • Sold by {book.seller}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(book.id)}
                        className="text-ink/25 hover:text-red-500 transition cursor-pointer p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-3 gap-2 flex-wrap">
                    {/* Qty Modifier */}
                    <div className="flex items-center bg-paper rounded-xl border border-ink/10">
                      <button
                        onClick={() => updateCartQty(book.id, -1)}
                        className="w-9 h-9 font-black hover:bg-white rounded-l-xl transition cursor-pointer flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-black text-sm">{qty}</span>
                      <button
                        onClick={() => updateCartQty(book.id, 1)}
                        className="w-9 h-9 font-black hover:bg-white rounded-r-xl transition cursor-pointer flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Price and discount */}
                    <div className="text-right">
                      <span className="font-black text-lg text-ink">
                        ₹{book.price * qty}
                      </span>
                      {book.mrp > book.price && (
                        <span className="text-xs line-through text-ink/35 font-bold ml-2">
                          ₹{book.mrp * qty}
                        </span>
                      )}
                      <div className="text-[11px] font-bold text-green-700">
                        ₹{book.price} each •{" "}
                        {Math.round((1 - book.price / book.mrp) * 100)}% off
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/browse"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-ink hover:gap-3 transition-all mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue shopping</span>
            </Link>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:sticky lg:top-28 space-y-4">
            {/* Coupon Box */}
            <div className="bg-white rounded-3xl border border-ink/10 p-5 shadow-sm">
              <h3 className="font-extrabold flex items-center gap-2 text-ink">
                <Ticket className="w-4 h-4 text-sunDark" /> Have a coupon?
              </h3>

              {promoApplied ? (
                <div className="mt-3 bg-green-50 border border-green-300 rounded-2xl p-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="flex-1 text-sm font-extrabold text-green-800">
                    {promoApplied} • {PROMOS[promoApplied]}% off applied
                  </span>
                  <button
                    onClick={removePromo}
                    className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 mt-3">
                    <input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try BOOK10"
                      className="flex-1 bg-paper rounded-xl px-4 py-2.5 text-sm font-extrabold outline-none uppercase min-w-0 border-2 border-transparent focus:border-ink"
                    />
                    <button
                      onClick={() => handleApplyPromo()}
                      className="bg-ink text-white font-extrabold text-sm px-5 rounded-xl cursor-pointer hover:bg-inkLight transition"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {Object.keys(PROMOS).map((p) => (
                      <button
                        key={p}
                        onClick={() => handleApplyPromo(p)}
                        className="text-[11px] font-extrabold border border-dashed border-ink/30 rounded-full px-3 py-1 hover:bg-sun hover:border-ink transition cursor-pointer text-ink"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="bg-white rounded-3xl border border-ink/10 p-5 shadow-sm">
              <h3 className="font-extrabold text-ink">Order summary</h3>

              <div className="mt-4 space-y-2.5 text-sm font-semibold">
                <div className="flex justify-between">
                  <span className="text-ink/50">Subtotal</span>
                  <span className="font-extrabold text-ink">₹{cartTotals.sub}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>You save vs MRP</span>
                  <span className="font-extrabold">− ₹{cartTotals.saved}</span>
                </div>
                {cartTotals.promoDisc > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Coupon ({promoApplied})</span>
                    <span className="font-extrabold">− ₹{cartTotals.promoDisc}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-ink/50">Shipping</span>
                  <span
                    className={`font-extrabold ${
                      cartTotals.ship === 0 ? "text-green-600" : "text-ink"
                    }`}
                  >
                    {cartTotals.ship === 0 ? "FREE" : `₹${cartTotals.ship}`}
                  </span>
                </div>
              </div>

              {cartTotals.ship > 0 && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] font-bold text-amber-800">
                  Add ₹{FREE_SHIP_THRESHOLD - (cartTotals.sub - cartTotals.promoDisc)} more for
                  FREE shipping 🚚
                </div>
              )}

              <div className="border-t border-dashed border-ink/20 mt-4 pt-4 flex justify-between items-end">
                <span className="font-extrabold text-ink">Total</span>
                <span className="font-display font-black text-3xl text-ink">
                  ₹{cartTotals.total}
                </span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full mt-4 bg-ink text-white font-extrabold py-4 rounded-2xl text-sm hover:bg-inkLight transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 mt-3 text-[11px] font-bold text-ink/40">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Secure
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> 7-day returns
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Protected
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
