"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { BookCard } from "@/components/books/BookCard";
import { FREE_SHIP_THRESHOLD, SHIPPING_COST } from "@/data/categories";
import {
  ChevronRight,
  ArrowLeft,
  ZoomIn,
  ShieldCheck,
  Eye,
  Star,
  MapPin,
  Box,
  Heart,
  Share2,
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  RotateCcw,
  Handshake,
  Flag,
  CheckCircle2,
} from "lucide-react";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = typeof params.id === "string" ? params.id : "";

  const {
    getBook,
    listings,
    addToCart,
    toggleWishlist,
    isWishlisted,
    openChat,
    openLightbox,
    addRecentView,
    recentViewed,
    showToast,
    user,
  } = useApp();

  const book = getBook(bookId);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "ship">("desc");

  useEffect(() => {
    if (book) {
      setSelectedImage(book.image);
      addRecentView(book.id);
    }
  }, [bookId, book]);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="font-display font-black text-2xl text-ink">Book not found</h2>
        <p className="text-sm text-ink/50 mt-2">
          This listing may have been sold or removed by the seller.
        </p>
        <Link
          href="/browse"
          className="mt-6 inline-block bg-ink text-white font-extrabold px-6 py-3 rounded-2xl text-sm"
        >
          Explore other books
        </Link>
      </div>
    );
  }

  const wish = isWishlisted(book.id);
  const discount = book.mrp > book.price ? Math.round((1 - book.price / book.mrp) * 100) : 0;
  const isMine = Boolean(user && book.mine && book.sellerId === user.email);

  const related = listings
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const recentBooks = recentViewed
    .filter((id) => id !== book.id)
    .map(getBook)
    .filter(Boolean)
    .slice(0, 4) as typeof listings;

  const thumbs = [
    book.image,
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=700&auto=format&fit=crop",
  ];

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(
        `${book.title} by ${book.author} — ₹${book.price} on BookOLX`
      );
      showToast("Book link copied! Share the story 📤", "info");
    } catch {
      showToast("Could not copy link", "error");
    }
  };

  const handleBuyNow = () => {
    addToCart(book.id, quantity);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold text-ink/40 flex-wrap">
        <Link href="/" className="hover:text-ink transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/browse" className="hover:text-ink transition">
          Browse
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-ink transition">{book.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink truncate max-w-[200px]">{book.title}</span>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-3 flex items-center gap-2 text-sm font-extrabold text-ink hover:gap-3 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to results
      </button>

      {/* Main Grid: Gallery on left, Details on right */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 mt-4 items-start">
        {/* Left: Gallery */}
        <div className="space-y-3">
          <div className="bg-white rounded-3xl border border-ink/10 overflow-hidden shadow-sm relative group">
            <img
              src={selectedImage || book.image}
              onClick={() => openLightbox(selectedImage || book.image)}
              alt={book.title}
              className="w-full h-80 sm:h-[430px] object-cover cursor-zoom-in transition"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${book.id}/700/600`;
              }}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-ink text-sun text-xs font-extrabold px-3 py-1.5 rounded-xl shadow">
                {book.condition.toUpperCase()}
              </span>
              {book.type === "new" ? (
                <span className="bg-sun text-ink border-2 border-ink text-xs font-extrabold px-3 py-1.5 rounded-xl">
                  ✨ BRAND NEW
                </span>
              ) : (
                <span className="bg-ink text-tealx text-xs font-extrabold px-3 py-1.5 rounded-xl">
                  📚 PRE-LOVED
                </span>
              )}
            </div>

            {discount > 0 && (
              <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow">
                SAVE {discount}%
              </span>
            )}

            <button
              onClick={() => openLightbox(selectedImage || book.image)}
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-xs font-extrabold px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center gap-1.5 cursor-pointer text-ink shadow-sm"
            >
              <ZoomIn className="w-4 h-4" /> Zoom
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            {thumbs.map((thumb, idx) => (
              <img
                key={idx}
                src={thumb}
                onClick={() => setSelectedImage(thumb)}
                className={`w-full h-20 sm:h-24 object-cover rounded-2xl border cursor-pointer hover:opacity-85 transition ${
                  selectedImage === thumb ? "ring-3 ring-ink" : ""
                }`}
                alt="Thumbnail"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/dt${idx}/300/200`;
                }}
              />
            ))}
          </div>

          {/* Buyer Protection Guarantee */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3 text-xs font-medium text-blue-900 leading-relaxed items-start">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Buyer Protection enabled.</strong> Pay securely — money releases to seller
              only after you confirm the book matches this listing. 7-day easy returns.
            </span>
          </div>
        </div>

        {/* Right: Info & Purchase Controls */}
        <div>
          <div className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-7 shadow-sm">
            {/* Category, Views, Time */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-paper text-ink text-xs font-extrabold px-3 py-1.5 rounded-full border border-ink/10">
                {book.category}
              </span>
              <span className="text-xs font-bold text-ink/40 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {book.views} views
              </span>
              <span className="text-xs font-bold text-ink/40">• {book.postedAt}</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl mt-3 leading-tight text-ink">
              {book.title}
            </h1>
            <p className="font-semibold text-ink/55 mt-1">
              by <span className="text-ink font-extrabold">{book.author}</span>
            </p>

            {/* Ratings & Sold count */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <div className="flex text-sunDark gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-sunDark text-sunDark" />
                ))}
              </div>
              <strong className="text-sm text-ink">{book.rating}</strong>
              <span className="text-xs font-bold text-ink/40">({book.reviews} ratings)</span>
              <span className="text-green-700 bg-green-100 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                ✓ {book.sellerSales + 120}+ sold
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-end gap-3 mt-4 flex-wrap">
              <span className="font-display font-black text-4xl text-ink">₹{book.price}</span>
              {book.mrp > book.price && (
                <>
                  <span className="text-lg line-through text-ink/30 font-bold mb-1">
                    ₹{book.mrp}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs font-extrabold px-2.5 py-1 rounded-full mb-1.5">
                    {discount}% off MRP
                  </span>
                </>
              )}
            </div>

            <p className="text-[11px] font-bold text-ink/40 mt-1">
              Inclusive of all taxes • EMI from ₹{Math.round(book.price / 6)}/mo
            </p>

            {/* Badges: Location & Stock */}
            <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs font-bold">
              <div className="bg-paper rounded-xl px-3 py-2.5 flex items-center gap-2 text-ink">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{book.location}</span>
              </div>
              <div className="bg-paper rounded-xl px-3 py-2.5 flex items-center gap-2 text-ink">
                <Box className="w-4 h-4 text-ink/40" />
                <span>
                  {book.stock <= 1 ? "Only 1 copy left in stock!" : `${book.stock} copies in stock`}
                </span>
              </div>
            </div>

            {/* Own Listing vs Buyer Controls */}
            {isMine ? (
              <div className="mt-5 bg-sun/30 border-2 border-dashed border-ink/30 rounded-2xl p-4 flex items-center gap-3">
                <span className="font-bold text-sm flex-1 text-ink">
                  You posted this listing.
                </span>
                <Link
                  href={`/sell?edit=${book.id}`}
                  className="bg-ink text-white text-xs font-extrabold px-4 py-2 rounded-xl"
                >
                  Edit Listing
                </Link>
              </div>
            ) : (
              <>
                {/* Quantity & Save/Share */}
                <div className="flex items-center gap-3 mt-5">
                  <div className="flex items-center bg-paper rounded-xl border-2 border-ink/10">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-11 font-black hover:bg-white rounded-l-xl transition cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))}
                      className="w-10 h-11 font-black hover:bg-white rounded-r-xl transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(book.id)}
                    className={`h-11 px-4 rounded-xl border-2 font-extrabold text-sm transition flex items-center gap-2 cursor-pointer ${
                      wish
                        ? "border-red-500 text-red-500 bg-red-50"
                        : "border-ink/15 hover:border-ink text-ink"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wish ? "fill-red-500" : ""}`} />
                    <span className="hidden sm:inline">{wish ? "Saved" : "Save"}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="h-11 w-11 rounded-xl border-2 border-ink/15 hover:border-ink transition flex items-center justify-center cursor-pointer text-ink"
                    title="Share book link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Buy / Cart buttons */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button
                    onClick={() => addToCart(book.id, quantity)}
                    className="bg-white border-2 border-ink font-extrabold py-3.5 rounded-2xl text-sm shadow-popSm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer text-ink"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm hover:bg-inkLight transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Zap className="w-4 h-4 text-sun fill-sun" /> Buy Now
                  </button>
                </div>

                {/* Chat with Seller Button */}
                <button
                  onClick={() => openChat(book.id)}
                  className="w-full mt-3 bg-tealx/20 border-2 border-ink/10 hover:border-ink font-extrabold py-3 rounded-2xl text-sm transition flex items-center justify-center gap-2 cursor-pointer text-ink"
                >
                  <MessageCircle className="w-4 h-4 text-ink" /> Chat with Seller
                </button>
              </>
            )}
          </div>

          {/* Seller Card */}
          <div className="bg-white rounded-3xl border border-ink/10 p-5 mt-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={book.sellerAvatar}
                className="w-12 h-12 rounded-2xl object-cover shrink-0"
                alt={book.seller}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(book.seller) +
                    "&background=002F34&color=FFCE32";
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-extrabold flex items-center gap-1.5 truncate text-ink">
                  <span>{book.seller}</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white shrink-0" />
                </div>
                <div className="text-xs font-bold text-ink/50">
                  ★ {book.sellerRating} • {book.sellerSales} sales • {book.location.split(",")[0]}
                </div>
              </div>
              <button
                onClick={() => {
                  showToast(`Showing all books from ${book.seller}`, "info");
                  router.push(`/browse`);
                }}
                className="text-xs font-extrabold border border-ink/20 rounded-xl px-3 py-2 hover:bg-ink hover:text-white transition cursor-pointer"
              >
                All books
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[11px] font-extrabold">
              <div className="bg-paper rounded-xl py-2">
                <div className="text-ink">~5 min</div>
                <div className="text-ink/40 font-bold">Response</div>
              </div>
              <div className="bg-paper rounded-xl py-2">
                <div className="text-ink">98%</div>
                <div className="text-ink/40 font-bold">Ship on time</div>
              </div>
              <div className="bg-paper rounded-xl py-2">
                <div className="text-ink">{book.sellerSales}+</div>
                <div className="text-ink/40 font-bold">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Specs, Shipping */}
      <div className="bg-white rounded-3xl border border-ink/10 mt-6 overflow-hidden shadow-sm">
        <div className="flex border-b border-ink/10 overflow-x-auto no-scrollbar">
          {[
            { id: "desc", label: "📖 Description" },
            { id: "specs", label: "📋 Specifications" },
            { id: "ship", label: "🚚 Shipping & Returns" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-4 text-sm font-extrabold whitespace-nowrap border-b-[3px] transition cursor-pointer ${
                activeTab === tab.id
                  ? "border-ink text-ink"
                  : "border-transparent text-ink/40 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-7 text-sm leading-relaxed font-medium text-ink/70">
          {activeTab === "desc" && (
            <div>
              <p className="text-base text-ink/80 leading-relaxed">{book.description}</p>
              <div className="grid sm:grid-cols-3 gap-3 mt-5">
                <div className="bg-paper rounded-2xl p-3.5 text-center">
                  <div className="text-[11px] font-bold text-ink/40 uppercase tracking-wider">
                    Condition
                  </div>
                  <div className="font-extrabold text-ink mt-0.5">{book.condition}</div>
                </div>
                <div className="bg-paper rounded-2xl p-3.5 text-center">
                  <div className="text-[11px] font-bold text-ink/40 uppercase tracking-wider">
                    Pages
                  </div>
                  <div className="font-extrabold text-ink mt-0.5">{book.pages} pages</div>
                </div>
                <div className="bg-paper rounded-2xl p-3.5 text-center">
                  <div className="text-[11px] font-bold text-ink/40 uppercase tracking-wider">
                    Language
                  </div>
                  <div className="font-extrabold text-ink mt-0.5">{book.language}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Title", book.title],
                ["Author", book.author],
                ["Category", book.category],
                ["ISBN", book.isbn],
                ["Pages", `${book.pages} pages`],
                ["Language", book.language],
                ["Condition", book.condition],
                ["Type", book.type === "new" ? "Brand New" : "Pre-loved (Used)"],
                ["Seller", book.seller],
                ["Location", book.location],
              ].map(([key, val]) => (
                <div
                  key={key}
                  className="flex justify-between bg-paper rounded-xl px-4 py-3"
                >
                  <span className="font-bold text-ink/45 text-[13px]">{key}</span>
                  <span className="font-extrabold text-[13px] text-right text-ink">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ship" && (
            <div className="space-y-3">
              <div className="flex gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
                <Truck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Free shipping</strong> on orders over ₹{FREE_SHIP_THRESHOLD} (else ₹
                  {SHIPPING_COST}). Dispatched in 24 hours, delivered in 2–4 business days with live
                  tracking.
                </span>
              </div>
              <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <RotateCcw className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>7-day easy returns.</strong> Full refund guaranteed if the book does not
                  match the seller&apos;s described condition. No questions asked.
                </span>
              </div>
              <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <Handshake className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Local pickup available</strong> in {book.location.split(",")[0]}. Chat
                  with the seller to arrange a convenient meetup.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Meta Bar */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() =>
            showToast("Listing reported. Our moderation team will review this within 24 hours.", "info")
          }
          className="text-xs font-bold text-ink/35 hover:text-red-500 flex items-center gap-1.5 transition cursor-pointer"
        >
          <Flag className="w-3.5 h-3.5" /> Report this listing
        </button>
        <span className="text-xs font-bold text-ink/35">
          Listing ID: {book.id.toUpperCase()} • {book.isbn}
        </span>
      </div>

      {/* Related Books */}
      {related.length > 0 && (
        <div className="mt-8">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-display font-black text-2xl text-ink">You may also like</h2>
            <Link
              href="/browse"
              className="text-sm font-extrabold flex items-center gap-1.5 text-ink hover:underline"
            >
              More {book.category}
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {related.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentBooks.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display font-black text-2xl mb-4 text-ink">Recently viewed</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {recentBooks.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
