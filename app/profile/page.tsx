"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { BookCard } from "@/components/books/BookCard";
import {
  User as UserIcon,
  BookOpen,
  Package,
  Heart,
  Settings,
  Plus,
  Search,
  PenSquare,
  Trash2,
  Camera,
  CheckCircle,
  Eye,
} from "lucide-react";

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "listings";

  const {
    user,
    openAuth,
    demoLogin,
    listings,
    orders,
    wishlist,
    getBook,
    cancelOrder,
    openDeleteModal,
    updateProfile,
    logout,
    resetDemoData,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [listingSearch, setListingSearch] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
      setCity(user.location || "");
      setBio(user.bio || "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4">
        <div className="bg-white rounded-3xl border border-ink/10 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="hero-pattern absolute inset-0 pointer-events-none" />
          <div className="relative">
            <div className="w-20 h-20 bg-ink rounded-3xl flex items-center justify-center mx-auto rotate-3 shadow-pop text-sun">
              <UserIcon className="w-10 h-10" />
            </div>

            <h1 className="font-display font-black text-3xl mt-5 text-ink">
              Your shelf awaits 📚
            </h1>
            <p className="text-sm font-semibold text-ink/50 mt-2">
              Login to manage listings, track orders, sync wishlist &amp; earn seller badges.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={() => openAuth("login")}
                className="flex-1 bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm hover:bg-inkLight transition cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => openAuth("signup")}
                className="flex-1 bg-sun border-2 border-ink font-extrabold py-3.5 rounded-2xl text-sm hover:bg-sunDark transition cursor-pointer text-ink shadow-popSm"
              >
                Create Account
              </button>
            </div>

            <button
              onClick={demoLogin}
              className="mt-4 text-xs font-extrabold text-ink/50 hover:text-ink underline cursor-pointer"
            >
              or continue with one-click demo →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User Data
  const myListings = listings.filter((b) => b.mine && b.sellerId === user.email);
  const myOrders = orders.filter((o) => o.userEmail === user.email || o.userEmail === "guest");
  const myWishlist = wishlist.map(getBook).filter(Boolean) as typeof listings;
  const totalSpent = myOrders.reduce((sum, o) => sum + o.total, 0);

  const filteredMyListings = myListings.filter(
    (b) =>
      !listingSearch ||
      (b.title + " " + b.author).toLowerCase().includes(listingSearch.toLowerCase())
  );

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim(),
      phone: phone.trim(),
      location: city.trim(),
      bio: bio.trim(),
    });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        updateProfile({ avatar: ev.target.result as string });
        showToast("Profile photo updated 📸", "success");
      }
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: "listings", label: `My Listings (${myListings.length})`, icon: <BookOpen className="w-4 h-4" /> },
    { id: "orders", label: `Orders (${myOrders.length})`, icon: <Package className="w-4 h-4" /> },
    { id: "wishlist", label: `Wishlist (${myWishlist.length})`, icon: <Heart className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Profile Header Card */}
      <div className="bg-ink text-white rounded-3xl overflow-hidden relative shadow-card">
        <div className="dot-grid absolute inset-0 opacity-15 pointer-events-none" />
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-sun/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <img
            src={user.avatar}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-4 border-sun object-cover shadow-2xl shrink-0"
            alt={user.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user.name) +
                "&background=FFCE32&color=002F34";
            }}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-black text-2xl sm:text-3xl truncate">
                {user.name}
              </h1>
              <span className="bg-sun text-ink text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                ★ VERIFIED READER
              </span>
            </div>
            <p className="text-sm text-white/55 font-medium mt-1 truncate">
              {user.bio || "Avid reader"}
            </p>
            <p className="text-xs font-bold text-white/40 mt-1">
              📍 {user.location || "India"} • Joined {user.joined || "2026"}
            </p>
          </div>

          <Link
            href="/sell"
            className="bg-sun text-ink font-extrabold px-6 py-3 rounded-2xl text-sm shrink-0 hover:bg-white transition flex items-center gap-1.5 shadow-popSm cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Sell a Book
          </Link>
        </div>

        {/* Counter Strip */}
        <div className="relative grid grid-cols-4 border-t border-white/10 text-center">
          {[
            { val: myListings.length, label: "Listings" },
            { val: myOrders.length, label: "Orders" },
            { val: myWishlist.length, label: "Wishlist" },
            { val: `₹${totalSpent}`, label: "Spent" },
          ].map((item, idx) => (
            <div key={idx} className="py-3.5 border-r last:border-0 border-white/10">
              <div className="font-black text-base sm:text-xl text-sun">{item.val}</div>
              <div className="text-[10px] font-extrabold tracking-widest uppercase text-white/40">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mt-5 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-extrabold whitespace-nowrap transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-ink text-white shadow-card"
                : "bg-white border border-ink/10 text-ink/55 hover:text-ink"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-5">
        {/* Tab 1: Listings */}
        {activeTab === "listings" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 justify-between sm:items-center mb-4">
              <div className="flex items-center gap-2 bg-white border border-ink/10 rounded-xl px-3 py-2 flex-1 sm:max-w-xs shadow-sm">
                <Search className="w-4 h-4 text-ink/30" />
                <input
                  value={listingSearch}
                  onChange={(e) => setListingSearch(e.target.value)}
                  placeholder="Search your listings…"
                  className="flex-1 outline-none text-sm font-semibold bg-transparent min-w-0"
                />
              </div>

              <Link
                href="/sell"
                className="bg-sun border-2 border-ink font-extrabold px-5 py-2.5 rounded-xl text-sm shadow-popSm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-1.5 text-ink"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Add New Listing
              </Link>
            </div>

            {filteredMyListings.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredMyListings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl border border-ink/10 overflow-hidden hover:shadow-card transition flex flex-col justify-between"
                  >
                    <div className="relative">
                      <Link href={`/books/${b.id}`}>
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-44 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${b.id}/400/300`;
                          }}
                        />
                      </Link>
                      <span className="absolute top-2.5 left-2.5 bg-green-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow">
                        ● LIVE
                      </span>
                      <span className="absolute top-2.5 right-2.5 bg-white/95 text-ink text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {b.views}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="font-extrabold text-base truncate text-ink">{b.title}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-black text-lg text-ink">₹{b.price}</span>
                        <span className="text-[11px] font-bold text-ink/40">{b.postedAt}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <Link
                          href={`/books/${b.id}`}
                          className="border border-ink/15 text-xs font-extrabold py-2 rounded-xl hover:bg-paper text-center flex items-center justify-center text-ink"
                        >
                          View
                        </Link>
                        <Link
                          href={`/sell?edit=${b.id}`}
                          className="bg-ink text-white text-xs font-extrabold py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-inkLight"
                        >
                          <PenSquare className="w-3.5 h-3.5" /> Edit
                        </Link>
                        <button
                          onClick={() => openDeleteModal(b.id)}
                          className="bg-red-50 text-red-600 text-xs font-extrabold py-2 rounded-xl hover:bg-red-500 hover:text-white transition flex items-center justify-center cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-14 bg-white rounded-3xl border border-dashed border-ink/20">
                <div className="w-16 h-16 bg-paper rounded-full flex items-center justify-center mx-auto text-ink/30">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold mt-3 text-ink">
                  {myListings.length ? "No matching listings" : "No listings yet"}
                </h3>
                <p className="text-xs font-semibold text-ink/45 mt-1">
                  {myListings.length
                    ? "Try adjusting your search terms."
                    : "List your first book in 60 seconds — it's free!"}
                </p>
                <Link
                  href="/sell"
                  className="mt-4 inline-block bg-ink text-white text-sm font-extrabold px-6 py-2.5 rounded-xl hover:bg-inkLight transition"
                >
                  + Create listing
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === "orders" && (
          <div>
            {myOrders.length > 0 ? (
              <div className="space-y-4">
                {myOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-ink/10 p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <div>
                        <span className="font-mono font-extrabold text-sm text-ink">
                          {order.id}
                        </span>
                        <span className="text-[11px] font-bold text-ink/40 ml-2">
                          {order.date}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
                          order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Book Thumbnails */}
                    <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                      {order.items.map((item) => (
                        <img
                          key={item.id}
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                          className="w-12 h-16 rounded-xl object-cover shrink-0 border border-ink/10"
                        />
                      ))}
                    </div>

                    {/* Stage Timeline */}
                    <div className="flex items-center gap-1.5 mt-3 text-[11px] font-extrabold">
                      <span className="flex items-center gap-1 text-green-700">
                        <CheckCircle className="w-3.5 h-3.5" /> Placed
                      </span>
                      <span className="flex-1 h-0.5 bg-green-200 rounded" />
                      <span
                        className={`flex items-center gap-1 ${
                          order.status === "Cancelled" ? "text-ink/25" : "text-green-700"
                        }`}
                      >
                        <Package className="w-3.5 h-3.5" /> Packed
                      </span>
                      <span
                        className={`flex-1 h-0.5 ${
                          order.status === "Cancelled" ? "bg-ink/10" : "bg-green-200"
                        } rounded`}
                      />
                      <span className="flex items-center gap-1 text-ink/30">Delivered</span>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-ink/10">
                      <span className="font-black text-ink">
                        ₹{order.total} • {order.items.reduce((s, i) => s + i.qty, 0)} items
                      </span>
                      <span className="text-[11px] font-bold text-ink/40 ml-2">
                        ETA {order.delivery}
                      </span>
                      <div className="ml-auto flex gap-2">
                        {order.status !== "Cancelled" && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="text-xs font-extrabold text-red-500 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <Link
                          href="/browse"
                          className="text-xs font-extrabold bg-ink text-white px-4 py-2 rounded-xl hover:bg-inkLight transition"
                        >
                          Buy Again
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-14 bg-white rounded-3xl border border-dashed border-ink/20">
                <div className="w-16 h-16 bg-paper rounded-full flex items-center justify-center mx-auto text-ink/20">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold mt-3 text-ink">No orders yet</h3>
                <p className="text-xs font-semibold text-ink/45 mt-1">
                  Your order history &amp; real-time delivery status will appear here.
                </p>
                <Link
                  href="/browse"
                  className="mt-4 inline-block bg-ink text-white text-sm font-extrabold px-6 py-2.5 rounded-xl hover:bg-inkLight transition"
                >
                  Start shopping
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === "wishlist" && (
          <div>
            {myWishlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {myWishlist.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            ) : (
              <div className="text-center py-14 bg-white rounded-3xl border border-dashed border-ink/20">
                <p className="font-extrabold text-ink">Wishlist is empty</p>
                <Link
                  href="/browse"
                  className="mt-3 inline-block bg-ink text-white text-sm font-extrabold px-6 py-2.5 rounded-xl hover:bg-inkLight transition"
                >
                  Discover books
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Settings */}
        {activeTab === "settings" && (
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Profile update form */}
            <form
              onSubmit={handleProfileSave}
              className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-6 shadow-sm"
            >
              <h3 className="font-extrabold text-ink">Profile details</h3>

              <div className="flex items-center gap-4 mt-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    className="w-20 h-20 rounded-3xl object-cover border-2 border-ink/10"
                    alt={user.name}
                  />
                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-ink text-sun rounded-full flex items-center justify-center cursor-pointer text-xs shadow-md">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-xs font-bold text-ink/45">
                  Click camera to change photo
                  <br />
                  Joined {user.joined}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full bg-paper rounded-xl px-4 py-2.5 text-sm font-bold outline-none border-2 border-transparent focus:border-ink transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                    Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full bg-paper rounded-xl px-4 py-2.5 text-sm font-bold outline-none border-2 border-transparent focus:border-ink transition"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Email (login ID)
                </label>
                <input
                  disabled
                  value={user.email}
                  className="mt-1.5 w-full bg-ink/5 rounded-xl px-4 py-2.5 text-sm font-bold outline-none text-ink/40 cursor-not-allowed"
                />
              </div>

              <div className="mt-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1.5 w-full bg-paper rounded-xl px-4 py-2.5 text-sm font-bold outline-none border-2 border-transparent focus:border-ink transition"
                />
              </div>

              <div className="mt-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Bio
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1.5 w-full bg-paper rounded-xl px-4 py-2.5 text-sm font-medium outline-none border-2 border-transparent focus:border-ink transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-ink text-white font-extrabold py-3 rounded-2xl text-sm hover:bg-inkLight transition cursor-pointer"
              >
                Save Changes
              </button>
            </form>

            {/* Notification preferences and Account controls */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-6 shadow-sm">
                <h3 className="font-extrabold text-ink">Preferences</h3>
                {[
                  { title: "Order updates", sub: "SMS + Email updates on shipping" },
                  { title: "Price-drop alerts", sub: "Instant alert on saved wishlist books" },
                  { title: "New arrivals", sub: "Weekly curated recommendations" },
                ].map((pref, i) => (
                  <label
                    key={pref.title}
                    className="flex items-center justify-between py-2.5 border-b last:border-0 border-ink/10 cursor-pointer"
                  >
                    <span>
                      <span className="block text-sm font-extrabold text-ink">{pref.title}</span>
                      <span className="text-[11px] font-bold text-ink/40">{pref.sub}</span>
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked={i < 2}
                      className="w-5 h-5 accent-[#002F34] cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-6 shadow-sm">
                <h3 className="font-extrabold text-ink">Account actions</h3>
                <div className="space-y-2 mt-3">
                  <button
                    onClick={logout}
                    className="w-full border-2 border-ink/15 font-extrabold py-3 rounded-2xl text-sm hover:border-ink transition cursor-pointer text-ink"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Reset demo data? This restores the 20 default books.")) {
                        resetDemoData();
                      }
                    }}
                    className="w-full bg-red-50 text-red-600 font-extrabold py-3 rounded-2xl text-sm hover:bg-red-500 hover:text-white transition cursor-pointer"
                  >
                    Reset demo data
                  </button>
                </div>
                <p className="text-[11px] font-semibold text-ink/35 mt-3">
                  All listings, cart and user preferences live locally in your browser.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold text-ink/50">Loading profile…</div>}>
      <ProfileContent />
    </Suspense>
  );
}
