import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  { name: 'Fiction', icon: 'BookOpen', color: 'bg-blue-100 text-blue-700' },
  { name: 'Classics', icon: 'Landmark', color: 'bg-amber-100 text-amber-700' },
  { name: 'Fantasy', icon: 'Sparkles', color: 'bg-purple-100 text-purple-700' },
  { name: 'Sci-Fi', icon: 'Rocket', color: 'bg-indigo-100 text-indigo-700' },
  { name: 'Self-Help', icon: 'Sprout', color: 'bg-green-100 text-green-700' },
  { name: 'Business', icon: 'Briefcase', color: 'bg-orange-100 text-orange-700' },
  { name: 'History', icon: 'Hourglass', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Technology', icon: 'Cpu', color: 'bg-cyan-100 text-cyan-700' },
  { name: 'Finance', icon: 'Coins', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Memoir', icon: 'Feather', color: 'bg-rose-100 text-rose-700' },
  { name: 'Design', icon: 'Palette', color: 'bg-pink-100 text-pink-700' },
  { name: 'Psychology', icon: 'Brain', color: 'bg-teal-100 text-teal-700' },
];

export const CONDITIONS = ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'] as const;

export const LOCATIONS = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Jaipur'
];

export const PROMOS: Record<string, number> = {
  BOOK10: 10,
  WELCOME15: 15,
  READMORE20: 20,
};

export const FREE_SHIP_THRESHOLD = 500;
export const SHIPPING_COST = 49;
