export type BookCondition = 'New' | 'Like New' | 'Very Good' | 'Good' | 'Acceptable';
export type BookType = 'new' | 'used';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  mrp: number;
  condition: BookCondition;
  type: BookType;
  seller: string;
  sellerId?: string;
  sellerAvatar: string;
  sellerRating: number;
  sellerSales: number;
  location: string;
  image: string;
  description: string;
  pages: number;
  isbn: string;
  language: string;
  postedAt: string;
  postedDays: number;
  featured: boolean;
  rating: number;
  reviews: number;
  stock: number;
  views: number;
  mine?: boolean;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
}

export interface CartItem {
  id: string;
  qty: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface PaymentDetails {
  method: 'upi' | 'card' | 'cod';
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  upi?: string;
}

export interface Order {
  id: string;
  items: Array<{
    id: string;
    title: string;
    author: string;
    price: number;
    qty: number;
    image: string;
    seller: string;
  }>;
  sub: number;
  promoDisc: number;
  ship: number;
  total: number;
  promo: string | null;
  date: string;
  delivery: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  address: ShippingAddress;
  payment: string;
  userEmail: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  bio: string;
  joined: string;
  pass?: string;
}

export interface FilterState {
  search: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  conditions: BookCondition[];
  type: 'all' | 'new' | 'used';
  location: string;
  minRating: number;
  sort: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'discount';
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface ChatMessage {
  me: boolean;
  text: string;
  timestamp?: string;
}
