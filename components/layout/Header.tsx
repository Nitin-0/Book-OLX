"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { LOCATIONS } from "@/data/categories";
import {
  BookOpen,
  MapPin,
  Search,
  Heart,
  ShoppingBag,
  Plus,
  Menu,
  X,
  ChevronDown,
  User as UserIcon,
  Package,
  BookMarked,
  LogOut,
  ArrowUpRight,
} from "lucide-react";

export function Header() {
  const router = useRouter();
  const {
    user,
    cartTotals,
    wishlist,
    filters,
    setFilters,
    openAuth,
    logout,
    setIsCartOpen,
    listings,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState(filters.search);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync internal search input with global filter state
  useEffect(() => {
    setSearchVal(filters.search);
  }, [filters.search]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowSuggestions(false);
    setFilters((prev) => ({ ...prev, search: searchVal }));
    router.push("/browse");
  };

  const handleLocationChange = (loc: string) => {
    setFilters((prev) => ({ ...prev, location: loc }));
  };

  const suggestions = searchVal.trim()
    ? listings
        .filter((b) =>
          (b.title + " " + b.author + " " + b.category)
            .toLowerCase()
            .includes(searchVal.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-ink/10 shadow-[0_2px_20px_-10px_rgba(0,47,52,0.2)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 sm:gap-3 py-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl hover:bg-paper flex items-center justify-center transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-ink rounded-xl flex items-center justify-center relative overflow-hidden shadow-popSm">
              <BookOpen className="text-sun w-5 h-5" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-sun/20 rounded-full" />
            </div>
            <div className="leading-none hidden xs:block sm:block">
              <div className="font-display font-black text-xl tracking-tight text-ink">
                Book<span className="text-ink/40">OLX</span>
              </div>
              <div className="text-[9px] font-extrabold tracking-[0.18em] text-ink/50 uppercase hidden sm:block">
                Old Books • New Stories
              </div>
            </div>
          </Link>

          {/* Location Selector (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 bg-paper border border-ink/10 rounded-xl px-3 py-2.5 min-w-[172px] hover:border-ink/30 transition">
            <MapPin className="w-4 h-4 text-ink/40" />
            <select
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none w-full cursor-pointer pr-2 appearance-none"
            >
              <option>All Locations</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 relative max-w-2xl">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full bg-white border-2 border-ink rounded-xl overflow-hidden focus-within:shadow-pop transition-shadow"
            >
              <input
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search books, authors, ISBN…"
                className="flex-1 px-4 py-2.5 outline-none text-sm bg-transparent min-w-0 font-medium"
              />
              <button
                type="submit"
                className="bg-ink text-white px-5 flex items-center gap-2 text-sm font-bold hover:bg-inkLight transition shrink-0"
              >
                <Search className="w-4 h-4 text-sun" />
                <span className="hidden xl:inline">Search</span>
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchVal.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-ink/10 overflow-hidden z-50">
                {suggestions.length > 0 ? (
                  suggestions.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setShowSuggestions(false);
                        router.push(`/books/${b.id}`);
                      }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-paper text-left transition border-b last:border-0 border-ink/5"
                    >
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-10 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-sm truncate">{b.title}</div>
                        <div className="text-xs text-ink/50 font-medium">
                          {b.author} • ₹{b.price}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-ink/20" />
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-sm font-semibold text-ink/50">
                    No matches for &ldquo;{searchVal}&rdquo; — try &ldquo;Dune&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-bold ml-1">
            <Link
              href="/browse"
              className="px-3 py-2 rounded-lg hover:bg-paper transition"
            >
              Browse
            </Link>
            <Link
              href="/wishlist"
              className="px-3 py-2 rounded-lg hover:bg-paper transition"
            >
              Wishlist
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            {/* Wishlist Button */}
            <Link
              href="/wishlist"
              className="relative w-10 h-10 rounded-xl hover:bg-paper flex items-center justify-center transition"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-ink" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 bg-red-500 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-xl hover:bg-paper flex items-center justify-center transition cursor-pointer"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-ink" />
              {cartTotals.count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 bg-ink text-sun text-[11px] font-extrabold rounded-full flex items-center justify-center">
                  {cartTotals.count}
                </span>
              )}
            </button>

            {/* Sell Button */}
            <button
              onClick={() => {
                if (!user) {
                  openAuth("signup");
                } else {
                  router.push("/sell");
                }
              }}
              className="hidden sm:flex items-center gap-1.5 bg-sun text-ink font-extrabold px-4 lg:px-5 py-2.5 rounded-xl border-2 border-ink shadow-popSm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> SELL
            </button>

            {/* Auth / Profile Area */}
            <div className="relative" ref={dropdownRef}>
              {!user ? (
                <button
                  onClick={() => openAuth("login")}
                  className="bg-ink text-white font-extrabold px-4 sm:px-5 py-2.5 rounded-xl text-sm hover:bg-inkLight transition whitespace-nowrap cursor-pointer"
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-paper rounded-xl p-1 pr-2 transition cursor-pointer"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-xl object-cover border-2 border-ink/10"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-ink/40 hidden sm:block" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-ink/10 overflow-hidden z-50 pop-in">
                      <div className="bg-ink text-white p-4">
                        <div className="font-extrabold text-sm truncate">{user.name}</div>
                        <div className="text-xs text-white/60 truncate">{user.email}</div>
                      </div>
                      <div className="p-2 text-sm font-bold">
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-paper flex items-center gap-3 transition"
                        >
                          <UserIcon className="w-4 h-4 text-ink/40" /> My Profile
                        </Link>
                        <Link
                          href="/profile?tab=listings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-paper flex items-center gap-3 transition"
                        >
                          <BookMarked className="w-4 h-4 text-ink/40" /> My Listings
                        </Link>
                        <Link
                          href="/profile?tab=orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-paper flex items-center gap-3 transition"
                        >
                          <Package className="w-4 h-4 text-ink/40" /> My Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setUserDropdownOpen(false)}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-paper flex items-center gap-3 transition"
                        >
                          <Heart className="w-4 h-4 text-ink/40" /> Wishlist
                        </Link>
                        <div className="border-t my-1 border-ink/10" />
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 flex items-center gap-3 transition cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex bg-paper border-2 border-ink/10 focus-within:border-ink rounded-xl overflow-hidden transition"
          >
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search books, authors…"
              className="flex-1 px-3 py-2.5 outline-none text-sm bg-transparent min-w-0 font-medium"
            />
            <button
              type="submit"
              className="bg-ink text-sun px-4 flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ink/10 bg-white px-4 py-3 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-2.5 rounded-xl font-bold hover:bg-paper flex items-center gap-3"
          >
            <BookOpen className="w-5 h-5 text-ink/40" /> Home
          </Link>
          <Link
            href="/browse"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-2.5 rounded-xl font-bold hover:bg-paper flex items-center gap-3"
          >
            <Search className="w-5 h-5 text-ink/40" /> Browse Books
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (!user) openAuth("signup");
              else router.push("/sell");
            }}
            className="w-full text-left px-3 py-2.5 rounded-xl font-bold hover:bg-paper flex items-center gap-3 cursor-pointer"
          >
            <Plus className="w-5 h-5 text-ink/40" /> Sell a Book
          </button>
          <Link
            href="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-2.5 rounded-xl font-bold hover:bg-paper flex items-center gap-3"
          >
            <Heart className="w-5 h-5 text-ink/40" /> Wishlist
          </Link>
          <Link
            href="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left px-3 py-2.5 rounded-xl font-bold hover:bg-paper flex items-center gap-3"
          >
            <UserIcon className="w-5 h-5 text-ink/40" /> My Account
          </Link>
          <div className="pt-2">
            <label className="text-xs font-bold text-ink/50 uppercase tracking-wider">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="mt-1 w-full bg-paper border rounded-xl px-3 py-2.5 font-bold text-sm outline-none"
            >
              <option>All Locations</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
