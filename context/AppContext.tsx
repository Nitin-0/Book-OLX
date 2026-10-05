"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Book, CartItem, Order, User, FilterState, ToastMessage, ShippingAddress, PaymentDetails } from "@/types";
import { MOCK_BOOKS } from "@/data/mockBooks";
import { PROMOS, FREE_SHIP_THRESHOLD, SHIPPING_COST } from "@/data/categories";

const STORAGE_KEYS = {
  LISTINGS: "bookolx_listings_v3",
  CART: "bookolx_cart_v3",
  USER: "bookolx_user_v3",
  USERS: "bookolx_users_v3",
  WISHLIST: "bookolx_wish_v3",
  ORDERS: "bookolx_orders_v3",
  RECENT: "bookolx_recent_v3",
};

interface CartTotals {
  items: Array<{ book: Book; qty: number }>;
  sub: number;
  mrpTotal: number;
  saved: number;
  promoDisc: number;
  ship: number;
  total: number;
  count: number;
}

interface AppContextType {
  listings: Book[];
  addListing: (bookData: Omit<Book, "id" | "postedAt" | "postedDays" | "views">) => string;
  updateListing: (id: string, updates: Partial<Book>) => void;
  deleteListing: (id: string) => void;
  getBook: (id: string) => Book | undefined;
  
  cart: CartItem[];
  addToCart: (bookId: string, qty?: number) => boolean;
  updateCartQty: (bookId: string, delta: number) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  cartTotals: CartTotals;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  promoApplied: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;

  wishlist: string[];
  toggleWishlist: (bookId: string) => void;
  isWishlisted: (bookId: string) => boolean;

  orders: Order[];
  placeOrder: (shipping: ShippingAddress, payment: PaymentDetails) => Promise<Order>;
  cancelOrder: (orderId: string) => void;
  lastOrder: Order | null;

  user: User | null;
  users: User[];
  login: (email: string) => boolean;
  signup: (userData: { name: string; email: string; phone: string; location: string; pass: string }) => boolean;
  demoLogin: () => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthOpen: boolean;
  authMode: "login" | "signup";
  openAuth: (mode?: "login" | "signup") => void;
  closeAuth: () => void;

  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;

  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;

  chatBookId: string | null;
  openChat: (bookId: string) => void;
  closeChat: () => void;

  deleteModalId: string | null;
  openDeleteModal: (bookId: string) => void;
  closeDeleteModal: () => void;

  lightboxSrc: string | null;
  openLightbox: (src: string) => void;
  closeLightbox: () => void;

  recentViewed: string[];
  addRecentView: (bookId: string) => void;
  resetDemoData: () => void;
}

const defaultFilters: FilterState = {
  search: "",
  categories: [],
  minPrice: 0,
  maxPrice: 1500,
  conditions: [],
  type: "all",
  location: "All Locations",
  minRating: 0,
  sort: "featured",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [listings, setListings] = useState<Book[]>(MOCK_BOOKS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentViewed, setRecentViewed] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [chatBookId, setChatBookId] = useState<string | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const storedListings = localStorage.getItem(STORAGE_KEYS.LISTINGS);
      if (storedListings) {
        setListings(JSON.parse(storedListings));
      } else {
        localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(MOCK_BOOKS));
      }

      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedRecent = localStorage.getItem(STORAGE_KEYS.RECENT);
      if (storedRecent) setRecentViewed(JSON.parse(storedRecent));

      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (storedUsers) setUsers(JSON.parse(storedUsers));
    } catch (e) {
      console.error("Error loading localStorage data", e);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [listings, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentViewed));
  }, [recentViewed, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users, isClient]);

  const showToast = (message: string, type: ToastMessage["type"] = "success") => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getBook = (id: string) => listings.find((b) => b.id === id);

  const addListing = (data: Omit<Book, "id" | "postedAt" | "postedDays" | "views">) => {
    const newId = "b" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const newBook: Book = {
      ...data,
      id: newId,
      postedAt: "Just now",
      postedDays: 0,
      views: 1,
      mine: true,
      seller: user ? user.name : "You",
      sellerId: user ? user.email : "guest",
      sellerAvatar: user ? user.avatar : "https://i.pravatar.cc/100?img=8",
      sellerRating: 5.0,
      sellerSales: 0,
      reviews: 0,
    };
    setListings((prev) => [newBook, ...prev]);
    showToast("🎉 Your book is LIVE! Buyers can now discover it.");
    return newId;
  };

  const updateListing = (id: string, updates: Partial<Book>) => {
    setListings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates, postedAt: "Just now" } : b))
    );
    showToast("Listing updated successfully ✓");
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((b) => b.id !== id));
    setCart((prev) => prev.filter((c) => c.id !== id));
    setWishlist((prev) => prev.filter((w) => w !== id));
    closeDeleteModal();
    showToast("Listing removed permanently", "info");
  };

  const addToCart = (bookId: string, qty: number = 1): boolean => {
    const book = getBook(bookId);
    if (!book) return false;
    const existing = cart.find((c) => c.id === bookId);
    const currentQty = existing ? existing.qty : 0;

    if (currentQty + qty > book.stock) {
      showToast(`Only ${book.stock} ${book.stock === 1 ? "copy" : "copies"} available`, "warning");
      return false;
    }

    if (existing) {
      setCart((prev) =>
        prev.map((c) => (c.id === bookId ? { ...c, qty: c.qty + qty } : c))
      );
    } else {
      setCart((prev) => [...prev, { id: bookId, qty }]);
    }
    showToast(`"${book.title}" added to cart 🛒`);
    setIsCartOpen(true);
    return true;
  };

  const updateCartQty = (bookId: string, delta: number) => {
    const book = getBook(bookId);
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === bookId) {
            const nextQty = item.qty + delta;
            if (nextQty <= 0) return null;
            if (book && nextQty > book.stock) {
              showToast(`Only ${book.stock} available`, "warning");
              return item;
            }
            return { ...item, qty: nextQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((c) => c.id !== bookId));
    showToast("Removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
    setPromoApplied(null);
  };

  const cartDetailedItems = cart
    .map((c) => {
      const book = getBook(c.id);
      return book ? { book, qty: c.qty } : null;
    })
    .filter(Boolean) as Array<{ book: Book; qty: number }>;

  const sub = cartDetailedItems.reduce((acc, item) => acc + item.book.price * item.qty, 0);
  const mrpTotal = cartDetailedItems.reduce((acc, item) => acc + item.book.mrp * item.qty, 0);
  const promoPercent = promoApplied ? PROMOS[promoApplied] || 0 : 0;
  const promoDisc = Math.round((sub * promoPercent) / 100);
  const ship = sub === 0 ? 0 : sub - promoDisc >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_COST;
  const total = sub - promoDisc + ship;
  const count = cartDetailedItems.reduce((acc, item) => acc + item.qty, 0);

  const cartTotals: CartTotals = {
    items: cartDetailedItems,
    sub,
    mrpTotal,
    saved: mrpTotal - sub,
    promoDisc,
    ship,
    total,
    count,
  };

  const applyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (PROMOS[upper]) {
      setPromoApplied(upper);
      showToast(`Coupon ${upper} applied — ${PROMOS[upper]}% off! 🎉`);
      return true;
    } else {
      showToast("Invalid coupon code", "error");
      return false;
    }
  };

  const removePromo = () => {
    setPromoApplied(null);
    showToast("Coupon removed", "info");
  };

  const toggleWishlist = (bookId: string) => {
    setWishlist((prev) => {
      if (prev.includes(bookId)) {
        showToast("Removed from wishlist", "info");
        return prev.filter((id) => id !== bookId);
      } else {
        showToast("Saved to wishlist ❤️");
        return [...prev, bookId];
      }
    });
  };

  const isWishlisted = (bookId: string) => wishlist.includes(bookId);

  const placeOrder = async (
    shipping: ShippingAddress,
    payment: PaymentDetails
  ): Promise<Order> => {
    const orderId = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const deliveryDate = new Date(Date.now() + 4 * 864e5).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const newOrder: Order = {
      id: orderId,
      items: cartTotals.items.map((x) => ({
        id: x.book.id,
        title: x.book.title,
        author: x.book.author,
        price: x.book.price,
        qty: x.qty,
        image: x.book.image,
        seller: x.book.seller,
      })),
      sub: cartTotals.sub,
      promoDisc: cartTotals.promoDisc,
      ship: cartTotals.ship,
      total: cartTotals.total,
      promo: promoApplied,
      date: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      delivery: deliveryDate,
      status: "Confirmed",
      address: { ...shipping },
      payment: payment.method,
      userEmail: user ? user.email : "guest",
    };

    // Update stock and seller sales
    setListings((prev) =>
      prev.map((b) => {
        const item = cartTotals.items.find((x) => x.book.id === b.id);
        if (item) {
          return {
            ...b,
            stock: Math.max(0, b.stock - item.qty),
            sellerSales: b.sellerSales + item.qty,
          };
        }
        return b;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setCart([]);
    setPromoApplied(null);
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" as const } : o))
    );
    showToast("Order cancelled. Refund will reflect in 3–5 days.", "info");
  };

  const login = (email: string) => {
    const em = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === em);
    if (!found) {
      showToast("No account found with this email. Please sign up.", "error");
      setAuthMode("signup");
      return false;
    }
    setUser(found);
    setIsAuthOpen(false);
    showToast(`Welcome back, ${found.name.split(" ")[0]}! 📚`);
    return true;
  };

  const signup = (userData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    pass: string;
  }) => {
    const em = userData.email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === em)) {
      showToast("Account already exists. Please login.", "error");
      setAuthMode("login");
      return false;
    }
    const newUser: User = {
      id: "u" + Date.now().toString(36),
      name: userData.name.trim(),
      email: em,
      phone: userData.phone.trim(),
      location: userData.location + ", IN",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userData.name
      )}&background=002F34&color=FFCE32&bold=true&size=100`,
      bio: "Avid reader • Buy & sell pre-loved books",
      joined: new Date().toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      }),
      pass: userData.pass,
    };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setIsAuthOpen(false);
    showToast(`Welcome to BookOLX, ${newUser.name.split(" ")[0]}! 🎉`);
    return true;
  };

  const demoLogin = () => {
    let demo = users.find((u) => u.email === "demo@bookolx.in");
    if (!demo) {
      const newDemo: User = {
        id: "demo1",
        name: "Demo Reader",
        email: "demo@bookolx.in",
        phone: "9876543210",
        location: "Mumbai, MH",
        avatar: "https://i.pravatar.cc/100?img=8",
        bio: "Demo account • Loves Sci-Fi & Self-Help",
        joined: "Jan 2026",
      };
      setUsers((prev) => [...prev, newDemo]);
      demo = newDemo;
    }
    setUser(demo);
    setIsAuthOpen(false);
    showToast("Logged in as Demo Reader ⚡");
  };

  const logout = () => {
    setUser(null);
    showToast("Logged out. Happy reading!", "info");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    showToast("Profile updated ✓");
  };

  const openAuth = (mode: "login" | "signup" = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => setIsAuthOpen(false);

  const clearFilters = () => {
    setFilters(defaultFilters);
    showToast("Filters reset", "info");
  };

  const openChat = (bookId: string) => setChatBookId(bookId);
  const closeChat = () => setChatBookId(null);

  const openDeleteModal = (bookId: string) => setDeleteModalId(bookId);
  const closeDeleteModal = () => setDeleteModalId(null);

  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  const addRecentView = (bookId: string) => {
    setRecentViewed((prev) => [bookId, ...prev.filter((id) => id !== bookId)].slice(0, 8));
    setListings((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, views: (b.views || 0) + 1 } : b))
    );
  };

  const resetDemoData = () => {
    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
      setListings(MOCK_BOOKS);
      setCart([]);
      setWishlist([]);
      setOrders([]);
      setRecentViewed([]);
      setUser(null);
      setPromoApplied(null);
      showToast("Demo data reset to original state", "info");
    }
  };

  return (
    <AppContext.Provider
      value={{
        listings,
        addListing,
        updateListing,
        deleteListing,
        getBook,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotals,
        isCartOpen,
        setIsCartOpen,
        promoApplied,
        applyPromo,
        removePromo,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        placeOrder,
        cancelOrder,
        lastOrder,
        user,
        users,
        login,
        signup,
        demoLogin,
        logout,
        updateProfile,
        isAuthOpen,
        authMode,
        openAuth,
        closeAuth,
        toasts,
        showToast,
        removeToast,
        filters,
        setFilters,
        clearFilters,
        chatBookId,
        openChat,
        closeChat,
        deleteModalId,
        openDeleteModal,
        closeDeleteModal,
        lightboxSrc,
        openLightbox,
        closeLightbox,
        recentViewed,
        addRecentView,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
