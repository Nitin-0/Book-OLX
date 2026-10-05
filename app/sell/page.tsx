"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, CONDITIONS, LOCATIONS } from "@/data/categories";
import { BookCondition, BookType } from "@/types";
import { triggerGlobalConfetti } from "@/components/ui/Confetti";
import {
  ChevronRight,
  Upload,
  Image as ImageIcon,
  X,
  Rocket,
  Sparkles,
  BookOpen,
} from "lucide-react";

function SellFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const { user, openAuth, addListing, updateListing, getBook, showToast } = useApp();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState<number | "">(300);
  const [isbn, setIsbn] = useState("");
  const [language, setLanguage] = useState("English");
  const [stock, setStock] = useState(1);

  const [type, setType] = useState<BookType>("used");
  const [condition, setCondition] = useState<BookCondition>("Like New");
  const [price, setPrice] = useState<number | "">("");
  const [mrp, setMrp] = useState<number | "">("");
  const [location, setLocation] = useState("Mumbai, MH");

  const [imageData, setImageData] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!user) {
      showToast("Please login to list or edit books", "warning");
      openAuth("signup");
    }
  }, [user, openAuth, showToast]);

  useEffect(() => {
    if (editId) {
      const book = getBook(editId);
      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setCategory(book.category);
        setDescription(book.description);
        setPages(book.pages);
        setIsbn(book.isbn);
        setLanguage(book.language);
        setStock(book.stock);
        setType(book.type);
        setCondition(book.condition);
        setPrice(book.price);
        setMrp(book.mrp);
        setLocation(book.location);
        setImageData(book.image);
      }
    }
  }, [editId, getBook]);

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("Photo must be under 5MB", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setImageData(ev.target.result as string);
        setImageUrl("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageUrlChange = (val: string) => {
    setImageUrl(val);
    if (val.trim()) {
      setImageData(val.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuth("login");
      return;
    }
    if (title.trim().length < 3) {
      showToast("Please enter a book title", "error");
      return;
    }
    if (author.trim().length < 2) {
      showToast("Please enter the author's name", "error");
      return;
    }
    if (description.trim().length < 20) {
      showToast("Description needs at least 20 characters", "error");
      return;
    }
    if (!price || Number(price) <= 0) {
      showToast("Please enter a valid price", "error");
      return;
    }

    const numericPrice = Number(price);
    const numericMrp = Number(mrp) || Math.round(numericPrice * 1.6);
    const finalImage =
      imageData ||
      `https://picsum.photos/seed/${encodeURIComponent(title)}/600/500`;

    if (editId) {
      updateListing(editId, {
        title: title.trim(),
        author: author.trim(),
        category,
        description: description.trim(),
        pages: Number(pages) || 250,
        isbn: isbn.trim() || "978-" + Math.floor(Math.random() * 1e10),
        language,
        stock: Number(stock) || 1,
        type,
        condition,
        price: numericPrice,
        mrp: numericMrp,
        location,
        image: finalImage,
      });
      triggerGlobalConfetti(70);
      router.push("/profile?tab=listings");
    } else {
      addListing({
        title: title.trim(),
        author: author.trim(),
        category,
        description: description.trim(),
        pages: Number(pages) || 250,
        isbn: isbn.trim() || "978-" + Math.floor(Math.random() * 1e10),
        language,
        stock: Number(stock) || 1,
        type,
        condition,
        price: numericPrice,
        mrp: numericMrp,
        location,
        image: finalImage,
        seller: user.name,
        sellerId: user.email,
        sellerAvatar: user.avatar,
        sellerRating: 5.0,
        sellerSales: 0,
        featured: false,
        rating: 5.0,
        reviews: 0,
        mine: true,
      });
      triggerGlobalConfetti(140);
      router.push("/profile?tab=listings");
    }
  };

  const numPrice = Number(price) || 0;
  const numMrp = Number(mrp) || 0;
  const discountPercent =
    numPrice > 0 && numMrp > numPrice
      ? Math.round((1 - numPrice / numMrp) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-bold text-ink/40">
        <Link href="/" className="hover:text-ink transition">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink">{editId ? "Edit Listing" : "Sell a Book"}</span>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-ink">
            {editId ? "Edit your listing" : "List your book"}
          </h1>
          <p className="text-sm font-semibold text-ink/50 mt-1">
            Free forever • Takes ~60 seconds • Live instantly across India
          </p>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <span className="bg-white border border-ink/10 px-3 py-1.5 rounded-full text-ink">
            ① Details
          </span>
          <span className="bg-white border border-ink/10 px-3 py-1.5 rounded-full text-ink">
            ② Photos
          </span>
          <span className="bg-sun border border-ink px-3 py-1.5 rounded-full text-ink">
            ③ Go Live 🚀
          </span>
        </div>
      </div>

      {/* Form and Preview Layout */}
      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-[1fr_380px] gap-6 mt-6 items-start"
      >
        <div className="space-y-5">
          {/* Section 1: Book Details */}
          <div className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-7 shadow-sm">
            <h3 className="font-extrabold text-lg flex items-center gap-2 text-ink">
              <span className="w-8 h-8 bg-ink text-sun rounded-xl flex items-center justify-center text-sm font-black">
                1
              </span>
              <span>Book details</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <div className="sm:col-span-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Title *
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Atomic Habits"
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Author *
                </label>
                <input
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. James Clear"
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Description *{" "}
                  <span className="normal-case font-semibold text-ink/40">
                    (min 20 characters)
                  </span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Condition notes, markings, why you are selling, edition details…"
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-medium outline-none transition resize-none"
                />
                <div className="text-right text-[11px] font-bold text-ink/40 mt-1">
                  {description.length}/500
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Pages
                </label>
                <input
                  type="number"
                  min={1}
                  value={pages}
                  onChange={(e) => setPages(e.target.value ? Number(e.target.value) : "")}
                  placeholder="320"
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  ISBN
                </label>
                <input
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="978-0735211292"
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition cursor-pointer"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Hinglish</option>
                  <option>Marathi</option>
                  <option>Tamil</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Copies in stock
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value) || 1)}
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Condition & Pricing */}
          <div className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-7 shadow-sm">
            <h3 className="font-extrabold text-lg flex items-center gap-2 text-ink">
              <span className="w-8 h-8 bg-sun border-2 border-ink rounded-xl flex items-center justify-center text-sm font-black">
                2
              </span>
              <span>Condition &amp; pricing</span>
            </h3>

            <div className="mt-5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                Is this book brand new or pre-loved? *
              </label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setType("new")}
                  className={`border-2 rounded-2xl p-4 text-center transition cursor-pointer ${
                    type === "new"
                      ? "bg-green-50 border-green-500 shadow-card"
                      : "border-ink/10 bg-white"
                  }`}
                >
                  <Sparkles className="w-6 h-6 text-green-600 mx-auto" />
                  <div className="font-extrabold text-sm mt-1 text-ink">Brand New</div>
                  <div className="text-[11px] text-ink/50 font-semibold">Sealed / unread</div>
                </button>

                <button
                  type="button"
                  onClick={() => setType("used")}
                  className={`border-2 rounded-2xl p-4 text-center transition cursor-pointer ${
                    type === "used"
                      ? "bg-amber-50 border-amber-500 shadow-card"
                      : "border-ink/10 bg-white"
                  }`}
                >
                  <BookOpen className="w-6 h-6 text-amber-600 mx-auto" />
                  <div className="font-extrabold text-sm mt-1 text-ink">Pre-loved</div>
                  <div className="text-[11px] text-ink/50 font-semibold">Gently used</div>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as BookCondition)}
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition cursor-pointer"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  Your price (₹) *
                </label>
                <input
                  required
                  type="number"
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                  placeholder="299"
                  className="mt-1.5 w-full bg-paper border-2 border-sun focus:border-ink rounded-xl px-4 py-3 text-sm font-extrabold outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  MRP (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value ? Number(e.target.value) : "")}
                  placeholder="599"
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition"
                />
              </div>
            </div>

            {/* Smart Pricing Hint */}
            <div className="mt-3 text-xs font-bold rounded-xl px-3 py-2 transition bg-green-50 border border-green-200 text-green-800">
              {discountPercent > 0 ? (
                <span>
                  🎯 Great pricing! <strong>{discountPercent}% off MRP</strong> — listings at
                  40–60% off sell 3× faster.
                </span>
              ) : numPrice > 0 ? (
                <span>💡 Tip: Add the MRP above to display discount % and attract buyers!</span>
              ) : (
                <span>Enter your price — similar books sell around ₹250–₹400.</span>
              )}
            </div>

            <div className="mt-4">
              <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                Pickup city *
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-semibold outline-none transition cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={`${loc}, IN`}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Photos */}
          <div className="bg-white rounded-3xl border border-ink/10 p-5 sm:p-7 shadow-sm">
            <h3 className="font-extrabold text-lg flex items-center gap-2 text-ink">
              <span className="w-8 h-8 bg-tealx border-2 border-ink rounded-xl flex items-center justify-center text-sm font-black">
                3
              </span>
              <span>Photos</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <label className="border-2 border-dashed border-ink/20 hover:border-ink rounded-2xl p-6 text-center cursor-pointer transition bg-paper/50 flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-ink/30" />
                <div className="font-extrabold text-sm mt-2 text-ink">Upload cover photo</div>
                <div className="text-xs text-ink/50 font-medium">JPG/PNG up to 5MB</div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="hidden"
                />
              </label>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-ink/50">
                  …or paste image URL
                </label>
                <input
                  value={imageUrl}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="https://images.unsplash.com/…"
                  className="mt-1.5 w-full bg-paper border-2 border-transparent focus:border-ink rounded-xl px-4 py-3 text-sm font-medium outline-none transition"
                />

                <div className="mt-3 rounded-2xl overflow-hidden bg-paper border border-ink/10 relative h-28 flex items-center justify-center">
                  {imageData ? (
                    <>
                      <img
                        src={imageData}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageData("");
                          setImageUrl("");
                        }}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-md cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-ink/30">
                      <ImageIcon className="w-6 h-6" />
                      <span className="text-xs font-bold mt-1">Preview appears here</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="sm:w-40 border-2 border-ink/20 font-extrabold py-3.5 rounded-2xl text-sm hover:border-ink transition cursor-pointer text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-ink text-white font-extrabold py-3.5 rounded-2xl text-sm hover:bg-inkLight transition shadow-card flex items-center justify-center gap-2 cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-sun" />
              <span>
                {editId ? "Save Changes" : "Publish Listing — Go Live"}
              </span>
            </button>
          </div>
        </div>

        {/* Right Sticky Preview Card */}
        <div className="lg:sticky lg:top-28 space-y-4">
          <div className="bg-white rounded-3xl border border-ink/10 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-sm text-ink flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                <span>Live preview</span>
              </h4>
              <span className="text-[10px] font-extrabold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                UPDATES IN REAL TIME
              </span>
            </div>

            {/* Preview Card Mock */}
            <div className="bg-paper rounded-2xl overflow-hidden border border-ink/10 shadow-sm">
              <div className="relative">
                {imageData ? (
                  <img
                    src={imageData}
                    alt="Preview cover"
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://picsum.photos/seed/placeholder/600/500";
                    }}
                  />
                ) : (
                  <div className="w-full h-52 flex flex-col items-center justify-center text-ink/25 bg-gradient-to-br from-cream to-paper">
                    <BookOpen className="w-10 h-10" />
                    <span className="text-xs font-bold mt-2">Cover preview</span>
                  </div>
                )}
                <span className="absolute top-2.5 left-2.5 text-white text-[10px] font-extrabold px-2 py-1 rounded-lg bg-ink">
                  {condition.toUpperCase()}
                </span>
              </div>

              <div className="p-4 bg-white">
                <div className="text-[10px] font-extrabold tracking-wider text-ink/40 uppercase">
                  {category} • {type === "new" ? "NEW" : "PRE-LOVED"}
                </div>
                <div className="font-extrabold truncate text-ink">
                  {title || "Your Book Title"}
                </div>
                <div className="text-xs text-ink/50 font-medium">
                  by {author || "Author Name"}
                </div>
                <div className="flex items-baseline gap-2 mt-1.5">
                  <span className="font-black text-xl text-ink">
                    {numPrice ? `₹${numPrice}` : "₹ —"}
                  </span>
                  {numMrp > numPrice && numPrice > 0 && (
                    <span className="text-xs line-through text-ink/35 font-bold">
                      ₹{numMrp}
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-bold text-ink/40 mt-1">
                  📍 {location.split(",")[0]} • Just now
                </div>
              </div>
            </div>
          </div>

          {/* Seller Tips */}
          <div className="bg-ink text-white rounded-3xl p-5 relative overflow-hidden shadow-card">
            <div className="dot-grid absolute inset-0 opacity-20 pointer-events-none" />
            <div className="relative">
              <h4 className="font-extrabold text-sm text-sun">💡 Sell 3× faster</h4>
              <ul className="text-xs text-white/70 font-medium mt-2 space-y-1.5">
                <li>• Price 40–60% below MRP for quick sale</li>
                <li>• Natural light photos get 2× more chats</li>
                <li>• Mention markings honestly — builds trust</li>
                <li>• Reply within 1 hour to close deals</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function SellPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-ink/50 font-bold">Loading sell page…</div>}>
      <SellFormContent />
    </Suspense>
  );
}
