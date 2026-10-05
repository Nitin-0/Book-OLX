"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ShippingAddress, PaymentDetails } from "@/types";
import { triggerGlobalConfetti } from "@/components/ui/Confetti";
import {
  ChevronRight,
  Truck,
  CreditCard,
  ClipboardCheck,
  Check,
  Smartphone,
  Banknote,
  Lock,
  Leaf,
  ShieldCheck,
  Cpu,
} from "lucide-react";

function CheckoutContent() {
  const router = useRouter();
  const { user, openAuth, cartTotals, placeOrder, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shipping, setShipping] = useState<ShippingAddress>({
    name: user ? user.name : "",
    phone: user ? user.phone : "",
    address: "",
    city: user ? user.location.split(",")[0] : "Mumbai",
    pincode: "400001",
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    method: "upi",
    upi: "reader@okhdfcbank",
    cardNumber: "4111 2222 3333 4444",
    expiry: "12/28",
    cvv: "123",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cartTotals.items.length === 0) {
      router.push("/cart");
    }
  }, [cartTotals.items.length, router]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    showToast("Shipping details saved ✓", "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      await placeOrder(shipping, payment);
      triggerGlobalConfetti(160);
      router.push("/order-success");
    } catch {
      showToast("Order could not be processed", "error");
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Shipping", icon: <Truck className="w-4 h-4" /> },
    { num: 2, label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
    { num: 3, label: "Review", icon: <ClipboardCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold text-ink/40">
        <Link href="/" className="hover:text-ink transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/cart" className="hover:text-ink transition">
          Cart
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink">Checkout</span>
      </div>

      <h1 className="font-display font-black text-3xl sm:text-4xl mt-3 text-ink">
        Secure checkout 🔒
      </h1>

      {/* Guest Notice */}
      {!user && (
        <div className="mt-4 bg-sun/40 border-2 border-dashed border-ink/25 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3 text-sm font-bold">
          <span className="flex-1 text-ink">
            Checking out as guest.{" "}
            <span className="text-ink/60">Login to track orders and earn reader rewards.</span>
          </span>
          <button
            onClick={() => openAuth("login")}
            className="bg-ink text-white text-xs font-extrabold px-5 py-2.5 rounded-xl whitespace-nowrap cursor-pointer hover:bg-inkLight transition"
          >
            Login / Sign Up
          </button>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex mt-6 mb-6 max-w-xl">
        {steps.map((st) => {
          const isCurrent = step === st.num;
          const isDone = step > st.num;
          return (
            <div key={st.num} className="flex-1 flex flex-col items-center relative">
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition ${
                  isDone
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-ink text-sun shadow-popSm"
                    : "bg-white border-2 border-ink/15 text-ink/30"
                }`}
              >
                {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : st.icon}
              </div>
              <span
                className={`text-[11px] font-extrabold mt-1.5 ${
                  isCurrent ? "text-ink" : "text-ink/35"
                }`}
              >
                {st.num}. {st.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Panels */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-7 shadow-sm">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div>
              <h3 className="font-extrabold text-lg text-ink">Where should we deliver?</h3>
              <form onSubmit={handleShippingSubmit} className="grid sm:grid-cols-2 gap-3.5 mt-4">
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Full name *
                  </label>
                  <input
                    required
                    value={shipping.name}
                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                    placeholder="Aarav Patel"
                    className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Phone (10 digits) *
                  </label>
                  <input
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={shipping.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                    placeholder="9876543210"
                    className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Address *
                  </label>
                  <input
                    required
                    value={shipping.address}
                    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    placeholder="Flat 402, Sea Breeze Apartments, MG Road"
                    className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    City *
                  </label>
                  <input
                    required
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    placeholder="Mumbai"
                    className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Pincode (6 digits) *
                  </label>
                  <input
                    required
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={shipping.pincode}
                    onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                    placeholder="400001"
                    className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>

                <div className="sm:col-span-2 flex gap-3 mt-2">
                  <Link
                    href="/cart"
                    className="border-2 border-ink/15 font-extrabold px-6 py-3.5 rounded-2xl text-sm flex items-center justify-center hover:border-ink transition text-ink"
                  >
                    ← Cart
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm hover:bg-inkLight transition cursor-pointer"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <h3 className="font-extrabold text-lg text-ink">How would you like to pay?</h3>
              <div className="grid grid-cols-3 gap-2.5 mt-4">
                {[
                  { id: "upi", label: "UPI", icon: <Smartphone className="w-5 h-5 mx-auto" /> },
                  { id: "card", label: "Card", icon: <CreditCard className="w-5 h-5 mx-auto" /> },
                  { id: "cod", label: "COD", icon: <Banknote className="w-5 h-5 mx-auto" /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayment({ ...payment, method: m.id as PaymentDetails["method"] })}
                    className={`border-2 rounded-2xl p-4 text-center transition cursor-pointer ${
                      payment.method === m.id
                        ? "border-ink bg-cream shadow-card text-ink"
                        : "border-ink/10 text-ink/50 hover:border-ink/30"
                    }`}
                  >
                    {m.icon}
                    <div className="font-extrabold text-sm mt-1.5">{m.label}</div>
                  </button>
                ))}
              </div>

              <form onSubmit={handlePaymentSubmit} className="mt-5">
                {payment.method === "upi" && (
                  <div>
                    <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                      UPI ID *
                    </label>
                    <input
                      required
                      value={payment.upi || ""}
                      onChange={(e) => setPayment({ ...payment, upi: e.target.value })}
                      placeholder="name@okhdfcbank"
                      className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                    />
                    <div className="flex gap-2 mt-3">
                      {["GPay", "PhonePe", "Paytm"].map((app) => (
                        <span
                          key={app}
                          className="bg-paper text-xs font-extrabold px-3 py-1.5 rounded-lg text-ink/70"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {payment.method === "card" && (
                  <div>
                    {/* Visual Card Preview */}
                    <div className="bg-gradient-to-br from-ink to-inkLight text-white rounded-2xl p-5 relative overflow-hidden shadow-card">
                      <div className="dot-grid absolute inset-0 opacity-20 pointer-events-none" />
                      <div className="relative">
                        <div className="flex justify-between items-center">
                          <Cpu className="w-6 h-6 text-sun" />
                          <span className="font-black text-sm tracking-widest text-sun">
                            VISA / MC
                          </span>
                        </div>
                        <div className="font-mono tracking-[0.2em] mt-4 text-sm">
                          {payment.cardNumber || "•••• •••• •••• ••••"}
                        </div>
                        <div className="flex justify-between text-[11px] font-mono mt-3 text-white/60">
                          <span>EXP: {payment.expiry || "MM/YY"}</span>
                          <span>CVV: {payment.cvv ? "•••" : "•••"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5 mt-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                          Card number *
                        </label>
                        <input
                          required
                          value={payment.cardNumber || ""}
                          onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                          placeholder="4111 1111 1111 1111"
                          className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                          Expiry *
                        </label>
                        <input
                          required
                          value={payment.expiry || ""}
                          onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                          CVV *
                        </label>
                        <input
                          required
                          type="password"
                          maxLength={4}
                          value={payment.cvv || ""}
                          onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                          placeholder="•••"
                          className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {payment.method === "cod" && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm font-semibold text-amber-900 flex gap-3">
                    <Banknote className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      Pay <strong>₹{cartTotals.total}</strong> in cash or UPI when your books arrive
                      at your doorstep. Please keep exact change ready. COD fee: FREE.
                    </span>
                  </div>
                )}

                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border-2 border-ink/15 font-extrabold px-6 py-3.5 rounded-2xl text-sm hover:border-ink transition cursor-pointer text-ink"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm hover:bg-inkLight transition cursor-pointer"
                  >
                    Review Order →
                  </button>
                </div>
              </form>

              <p className="text-[11px] font-bold text-ink/35 text-center mt-3 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> 256-bit encrypted • Mock demo payment — no real charge.
              </p>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <h3 className="font-extrabold text-lg text-ink">Review &amp; place order</h3>

              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="bg-paper rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-ink/45">
                      📍 Deliver to
                    </span>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-extrabold text-blue-600 cursor-pointer hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="font-extrabold text-sm mt-1.5 text-ink">
                    {shipping.name} • {shipping.phone}
                  </div>
                  <div className="text-xs font-medium text-ink/55 mt-0.5">
                    {shipping.address}, {shipping.city} — {shipping.pincode}
                  </div>
                </div>

                <div className="bg-paper rounded-2xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-ink/45">
                      💳 Payment
                    </span>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-extrabold text-blue-600 cursor-pointer hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="font-extrabold text-sm mt-1.5 text-ink">
                    {payment.method === "upi"
                      ? `UPI • ${payment.upi}`
                      : payment.method === "card"
                      ? `Card •••• ${(payment.cardNumber || "").slice(-4)}`
                      : "Cash on Delivery"}
                  </div>
                  <div className="text-xs font-medium text-ink/55 mt-0.5">
                    {payment.method === "cod" ? "Pay on arrival" : "Charged securely on order"}
                  </div>
                </div>
              </div>

              {/* Items summary */}
              <div className="mt-4 space-y-2.5">
                {cartTotals.items.map(({ book, qty }) => (
                  <div
                    key={book.id}
                    className="flex items-center gap-3 bg-paper/60 rounded-2xl p-2.5 border border-ink/5"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-11 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block font-extrabold text-sm truncate text-ink">
                        {book.title}
                      </span>
                      <span className="text-[11px] font-bold text-ink/45">
                        Qty {qty} • {book.seller}
                      </span>
                    </div>
                    <span className="font-black text-sm text-ink">
                      ₹{book.price * qty}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setStep(2)}
                  className="border-2 border-ink/15 font-extrabold px-6 py-4 rounded-2xl text-sm hover:border-ink transition cursor-pointer text-ink"
                >
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-extrabold py-4 rounded-2xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-75"
                >
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>
                    {isSubmitting
                      ? "Placing order…"
                      : `Place Order • ₹${cartTotals.total}`}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:sticky lg:top-28 bg-ink text-white rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-card">
          <div className="dot-grid absolute inset-0 opacity-15 pointer-events-none" />
          <div className="relative">
            <h3 className="font-extrabold">Order summary</h3>

            <div className="mt-4 space-y-2.5 text-sm font-semibold">
              <div className="flex justify-between text-white/60">
                <span>Subtotal ({cartTotals.count})</span>
                <span className="text-white font-extrabold">₹{cartTotals.sub}</span>
              </div>
              {cartTotals.promoDisc > 0 && (
                <div className="flex justify-between text-green-300">
                  <span>Coupon savings</span>
                  <span>− ₹{cartTotals.promoDisc}</span>
                </div>
              )}
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span
                  className={
                    cartTotals.ship === 0 ? "text-green-300 font-extrabold" : "text-white"
                  }
                >
                  {cartTotals.ship === 0 ? "FREE" : `₹${cartTotals.ship}`}
                </span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>You save vs MRP</span>
                <span className="text-sun font-extrabold">
                  ₹{cartTotals.saved + cartTotals.promoDisc}
                </span>
              </div>
            </div>

            <div className="border-t border-white/15 mt-4 pt-4 flex justify-between items-end">
              <span className="font-extrabold text-white/60">Total</span>
              <span className="font-display font-black text-3xl text-sun">
                ₹{cartTotals.total}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-[11px] font-bold text-white/50">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-tealx" />
                <span>
                  Delivery in 2–4 business days
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-tealx" />
                <span>Buyer protection + 7-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-tealx" />
                <span>You are saving ~{(cartTotals.count * 2.7).toFixed(1)}kg CO₂ 🌱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <CheckoutContent />;
}
