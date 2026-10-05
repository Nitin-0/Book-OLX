"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/categories";
import { triggerGlobalConfetti } from "@/components/ui/Confetti";
import { BookOpen, CheckCircle, Star, X, Zap } from "lucide-react";

export function AuthModal() {
  const { isAuthOpen, closeAuth, authMode, openAuth, login, signup, demoLogin } = useApp();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [suName, setSuName] = useState("");
  const [suPhone, setSuPhone] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPass, setSuPass] = useState("");
  const [suCity, setSuCity] = useState("Mumbai");

  if (!isAuthOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = signup({
      name: suName,
      phone: suPhone,
      email: suEmail,
      location: suCity,
      pass: suPass,
    });
    if (success) {
      triggerGlobalConfetti(100);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 modal-bg" onClick={closeAuth} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl overflow-hidden w-full max-w-4xl grid md:grid-cols-[0.9fr_1.1fr] pop-in max-h-[92vh] overflow-y-auto">
        {/* Left Side Banner (Desktop) */}
        <div className="hidden md:block bg-ink text-white p-8 relative overflow-hidden">
          <div className="dot-grid absolute inset-0 opacity-20 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-sun rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-ink" />
              </div>
              <div className="font-display font-black text-xl">BookOLX</div>
            </div>

            <h3 className="font-display font-black text-3xl mt-8 leading-tight">
              Join 48,000+ readers saving big.
            </h3>

            <ul className="mt-6 space-y-3 text-sm font-semibold text-white/70">
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-4 h-4 text-tealx mt-0.5 shrink-0" />
                <span>Buy pre-loved at up to 70% off MRP</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-4 h-4 text-tealx mt-0.5 shrink-0" />
                <span>Sell in 60 seconds, zero listing fee</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-4 h-4 text-tealx mt-0.5 shrink-0" />
                <span>Buyer protection + 7-day returns</span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-4 h-4 text-tealx mt-0.5 shrink-0" />
                <span>₹100 welcome coupon instantly</span>
              </li>
            </ul>

            <div className="mt-8 bg-white/10 rounded-2xl p-4 flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/60?img=45"
                className="w-11 h-11 rounded-full object-cover shrink-0"
                alt="Reader"
              />
              <div className="text-xs">
                <div className="flex text-sun text-[10px] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-sun text-sun" />
                  ))}
                </div>
                <p className="text-white/80 font-medium mt-1">
                  &ldquo;Sold 14 books in a week. Payouts are instant!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-6 sm:p-8 relative">
          <button
            onClick={closeAuth}
            className="absolute top-4 right-4 w-9 h-9 bg-paper rounded-xl hover:bg-ink hover:text-white transition flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Mode Switcher */}
          <div className="flex bg-paper rounded-full p-1 gap-1 w-fit">
            <button
              onClick={() => openAuth("login")}
              className={`px-6 py-2 rounded-full text-sm font-extrabold transition cursor-pointer ${
                authMode === "login" ? "bg-ink text-white shadow" : "text-ink/50 hover:text-ink"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => openAuth("signup")}
              className={`px-6 py-2 rounded-full text-sm font-extrabold transition cursor-pointer ${
                authMode === "signup" ? "bg-ink text-white shadow" : "text-ink/50 hover:text-ink"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {authMode === "login" ? (
            <div className="mt-6">
              <h3 className="font-display font-black text-2xl">Welcome back, reader 📖</h3>
              <p className="text-sm text-ink/50 font-medium mt-1">Your shelf missed you.</p>

              <form onSubmit={handleLoginSubmit} className="mt-5 space-y-3">
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm hover:bg-inkLight transition cursor-pointer"
                >
                  Login to BookOLX
                </button>
              </form>

              <button
                type="button"
                onClick={demoLogin}
                className="w-full mt-3 border-2 border-dashed border-ink/20 hover:border-ink font-extrabold py-3 rounded-2xl text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-sunDark fill-sunDark" />
                <span>One-click Demo Login</span>
              </button>

              <p className="text-xs text-ink/40 font-semibold text-center mt-4">
                New here?{" "}
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="text-ink font-extrabold underline cursor-pointer"
                >
                  Create account
                </button>{" "}
                &amp; get ₹100 off
              </p>
            </div>
          ) : (
            /* Signup Form */
            <div className="mt-6">
              <h3 className="font-display font-black text-2xl">Create your shelf ✨</h3>
              <p className="text-sm text-ink/50 font-medium mt-1">
                Free forever. Get ₹100 welcome coupon.
              </p>

              <form onSubmit={handleSignupSubmit} className="mt-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                      Full name
                    </label>
                    <input
                      required
                      value={suName}
                      onChange={(e) => setSuName(e.target.value)}
                      placeholder="Aarav Patel"
                      className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                      Phone
                    </label>
                    <input
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={suPhone}
                      onChange={(e) => setSuPhone(e.target.value)}
                      placeholder="9876543210"
                      className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={suEmail}
                    onChange={(e) => setSuEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength={4}
                      value={suPass}
                      onChange={(e) => setSuPass(e.target.value)}
                      placeholder="Min 4 chars"
                      className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                      City
                    </label>
                    <select
                      value={suCity}
                      onChange={(e) => setSuCity(e.target.value)}
                      className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition cursor-pointer"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sun border-2 border-ink text-ink font-extrabold py-3.5 rounded-2xl text-sm shadow-popSm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer"
                >
                  Create Account &amp; Claim ₹100
                </button>
              </form>

              <p className="text-[11px] text-ink/40 font-medium text-center mt-3">
                By signing up you agree to our Terms. Demo marketplace — data stays in your browser.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
