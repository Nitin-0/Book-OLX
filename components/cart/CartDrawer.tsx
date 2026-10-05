"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { FREE_SHIP_THRESHOLD } from "@/data/categories";
import { ShoppingBag, X, Trash2, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const router = useRouter();
  const {
    isCartOpen,
    setIsCartOpen,
    cartTotals,
    updateCartQty,
    removeFromCart,
  } = useApp();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    router.push("/cart");
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 modal-bg transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-paper shadow-2xl flex flex-col pop-in">
        {/* Header */}
        <div className="bg-ink text-white p-4 flex items-center justify-between shrink-0">
          <div className="font-extrabold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sun" />
            <span>Your Cart</span>
            <span className="bg-sun text-ink text-xs px-2 py-0.5 rounded-full font-black">
              {cartTotals.count}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 bg-white/10 rounded-xl hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartTotals.items.length > 0 ? (
            cartTotals.items.map(({ book, qty }) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-ink/10 p-3 flex gap-3 shadow-sm pop-in"
              >
                <Link
                  href={`/books/${book.id}`}
                  onClick={() => setIsCartOpen(false)}
                  className="shrink-0"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-20 rounded-xl object-cover cursor-pointer hover:opacity-90 transition"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${book.id}/200/240`;
                    }}
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/books/${book.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="font-extrabold text-sm truncate block text-ink hover:text-inkLight transition"
                  >
                    {book.title}
                  </Link>
                  <div className="text-[11px] font-bold text-ink/40">
                    {book.author} • {book.condition}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-paper rounded-lg border border-ink/10">
                      <button
                        onClick={() => updateCartQty(book.id, -1)}
                        className="w-7 h-7 font-black text-sm flex items-center justify-center hover:bg-white rounded-l-lg transition cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-black">{qty}</span>
                      <button
                        onClick={() => updateCartQty(book.id, 1)}
                        className="w-7 h-7 font-black text-sm flex items-center justify-center hover:bg-white rounded-r-lg transition cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-black text-sm">₹{book.price * qty}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(book.id)}
                  className="self-start text-ink/25 hover:text-red-500 transition p-1 cursor-pointer"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-14">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <ShoppingBag className="w-8 h-8 text-ink/20" />
              </div>
              <h3 className="font-extrabold mt-4 text-base">Your cart is empty</h3>
              <p className="text-xs font-semibold text-ink/40 mt-1">
                Great stories await. Go find yours!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/browse");
                }}
                className="mt-4 bg-ink text-white text-sm font-extrabold px-6 py-2.5 rounded-xl cursor-pointer hover:bg-inkLight transition"
              >
                Browse books
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartTotals.items.length > 0 && (
          <div className="p-4 bg-white border-t border-ink/10 shrink-0">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-ink/50">Subtotal ({cartTotals.count} items)</span>
              <span className="font-black text-base">₹{cartTotals.sub}</span>
            </div>
            <div className="text-[11px] font-bold text-green-700 mt-1">
              {cartTotals.sub >= FREE_SHIP_THRESHOLD
                ? "🎉 You unlocked FREE shipping!"
                : `Add ₹${FREE_SHIP_THRESHOLD - cartTotals.sub} more for FREE shipping`}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={handleViewCart}
                className="border-2 border-ink font-extrabold py-3 rounded-2xl text-sm hover:bg-paper transition cursor-pointer"
              >
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-ink text-white font-extrabold py-3 rounded-2xl text-sm hover:bg-inkLight transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
