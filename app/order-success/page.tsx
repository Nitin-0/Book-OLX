"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { triggerGlobalConfetti } from "@/components/ui/Confetti";
import {
  Check,
  Copy,
  Truck,
  BookOpen,
  Plus,
} from "lucide-react";

function OrderSuccessContent() {
  const router = useRouter();
  const { lastOrder, orders, user, showToast } = useApp();
  const order = lastOrder || orders[0];

  useEffect(() => {
    triggerGlobalConfetti(140);
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="font-display font-black text-2xl text-ink">No recent orders found</h2>
        <Link
          href="/"
          className="mt-4 inline-block bg-ink text-white font-extrabold px-6 py-3 rounded-2xl text-sm"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  const copyOrderId = () => {
    try {
      navigator.clipboard.writeText(order.id);
      showToast("Order ID copied to clipboard ✓", "info");
    } catch {}
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Success Badge */}
      <div className="text-center">
        <div className="check-pop w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <Check className="w-12 h-12 text-white stroke-[3]" />
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl mt-6 text-ink">
          Order placed! 🎉
        </h1>
        <p className="font-semibold text-ink/50 mt-2">
          Thanks{user ? ` ${user.name.split(" ")[0]}` : ""}! Your books are being packed with
          care.
        </p>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-2 bg-white border-2 border-dashed border-ink/20 rounded-2xl px-5 py-2.5 mt-4 font-mono font-extrabold text-ink">
          <span>{order.id}</span>
          <button
            onClick={copyOrderId}
            className="text-ink/30 hover:text-ink transition cursor-pointer p-1"
            title="Copy ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-6 mt-6 shadow-sm">
        {/* ETA Header */}
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-3.5 text-sm font-bold text-green-900">
          <Truck className="w-5 h-5 text-green-600 shrink-0" />
          <span>
            Arriving by <strong className="font-black">{order.delivery}</strong>
          </span>
          <span className="ml-auto bg-green-500 text-white text-[11px] px-2.5 py-1 rounded-full font-black">
            {order.status.toUpperCase()}
          </span>
        </div>

        {/* Items List */}
        <div className="mt-4 space-y-2.5">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-1">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-16 rounded-xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/100/120`;
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-sm truncate text-ink">{item.title}</div>
                <div className="text-[11px] font-bold text-ink/45">
                  Qty {item.qty} • {item.seller}
                </div>
              </div>
              <span className="font-black text-sm text-ink">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-dashed border-ink/20 mt-4 pt-4 space-y-1.5 text-sm font-semibold">
          <div className="flex justify-between text-ink/55">
            <span>Subtotal</span>
            <span>₹{order.sub}</span>
          </div>
          {order.promoDisc > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Coupon savings</span>
              <span>− ₹{order.promoDisc}</span>
            </div>
          )}
          <div className="flex justify-between text-ink/55">
            <span>Shipping</span>
            <span>{order.ship === 0 ? "FREE" : `₹${order.ship}`}</span>
          </div>
          <div className="flex justify-between font-black text-lg pt-1 text-ink">
            <span>Paid {order.payment === "cod" ? "(on delivery)" : ""}</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        {/* Shipping & Payment Meta */}
        <div className="grid sm:grid-cols-2 gap-2.5 mt-4 text-xs font-bold">
          <div className="bg-paper rounded-xl p-3 text-ink">
            📍 {order.address.address}, {order.address.city} — {order.address.pincode}
          </div>
          <div className="bg-paper rounded-xl p-3 text-ink">
            💳{" "}
            {order.payment === "upi"
              ? "UPI Payment"
              : order.payment === "card"
              ? "Card Payment"
              : "Cash on Delivery"}{" "}
            • Mock — no real charge
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        <Link
          href="/profile?tab=orders"
          className="bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm flex items-center justify-center hover:bg-inkLight transition"
        >
          Track Order
        </Link>
        <Link
          href="/browse"
          className="bg-white border-2 border-ink font-extrabold py-3.5 rounded-2xl text-sm flex items-center justify-center hover:bg-paper transition text-ink"
        >
          <BookOpen className="w-4 h-4 mr-1.5" /> Keep Shopping
        </Link>
        <Link
          href="/sell"
          className="bg-sun border-2 border-ink font-extrabold py-3.5 rounded-2xl text-sm flex items-center justify-center hover:bg-sunDark transition text-ink shadow-popSm"
        >
          <Plus className="w-4 h-4 mr-1.5 stroke-[3]" /> Sell a Book
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return <OrderSuccessContent />;
}
