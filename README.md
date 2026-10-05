# BookOLX — Modern Next.js Marketplace Framework

A full-featured, modern second-hand book marketplace frontend built with **Next.js (App Router)**, **React 19**, **Tailwind CSS**, and **TypeScript**.

---

## 🏗️ Architecture & Project Structure

```text
├── app/                              # Next.js App Router (Pages, Layouts & Routing)
│   ├── layout.tsx                    # Root layout with fonts, theme, providers & modals
│   ├── page.tsx                      # Homepage (Hero, Categories, Recommendations, Testimonials)
│   ├── browse/
│   │   └── page.tsx                  # Browse & search catalogue with responsive filters & sorting
│   ├── books/
│   │   └── [id]/
│   │       └── page.tsx              # Detailed Book View (Gallery, Specs, Seller info, Reviews)
│   ├── sell/
│   │   └── page.tsx                  # Sell a book / Edit listing with live preview card
│   ├── cart/
│   │   └── page.tsx                  # Dedicated shopping cart with coupon engine
│   ├── checkout/
│   │   └── page.tsx                  # 3-step checkout (Shipping, Payment, Review & Place Order)
│   ├── order-success/
│   │   └── page.tsx                  # Order confirmation with tracking & delivery ETA
│   ├── profile/
│   │   └── page.tsx                  # User profile & seller dashboard (Listings, Orders, Wishlist)
│   ├── wishlist/
│   │   └── page.tsx                  # Dedicated saved books view
│   └── globals.css                   # Custom theme, typography, animations, scrollbars
│
├── components/                       # Modular React components
│   ├── layout/
│   │   ├── Header.tsx                # Sticky navbar with search autocomplete, location dropdown & badges
│   │   ├── Footer.tsx                # Comprehensive footer with links & eco statements
│   │   ├── PromoBar.tsx              # Top promo bar with live active reader count
│   │   └── MobileNav.tsx             # Bottom navigation bar for mobile devices
│   ├── books/
│   │   ├── BookCard.tsx              # Reusable book card with condition badge & quick actions
│   │   └── BookFilters.tsx           # Multi-facet filter sidebar (type, category, price, condition)
│   ├── home/
│   │   ├── HeroSection.tsx           # 3D floating book covers, stats counter & ticker
│   │   ├── CategoryShelves.tsx       # 12 curated book shelves with item counts
│   │   ├── FreshRecommendations.tsx # Tabbed recommendations (All, New, Pre-loved, Under ₹250)
│   │   ├── SellerCtaSection.tsx      # Seller benefits banner & earnings preview
│   │   ├── HowItWorksSection.tsx     # 3-step workflow & buyer protection guarantees
│   │   └── TestimonialsSection.tsx   # Verified buyer reviews & ₹100 newsletter signup
│   ├── cart/
│   │   └── CartDrawer.tsx            # Slide-over cart drawer with free shipping progress bar
│   ├── modals/
│   │   ├── AuthModal.tsx             # Login / Sign up modal with 1-click demo login
│   │   ├── ChatModal.tsx             # Interactive seller chat with smart simulated auto-replies
│   │   ├── DeleteListingModal.tsx    # Confirmation dialog for removing listings
│   │   └── LightboxModal.tsx         # Full-screen image preview & zoom
│   └── ui/
│       ├── ToastContainer.tsx        # Floating notification toasts
│       └── Confetti.tsx              # Canvas celebration confetti generator
│
├── context/                          # State management & React Context
│   └── AppContext.tsx                # Global state (Listings, Cart, Wishlist, Orders, User, Filters)
│
├── types/                            # TypeScript interfaces & models
│   └── index.ts                      # Book, User, Cart, Order, FilterState definitions
│
├── data/                             # Mock initial data & configurations
│   ├── categories.ts                 # Categories, conditions, cities, promo codes
│   └── mockBooks.ts                  # 20 rich pre-loaded books with Unsplash imagery
│
├── public/                           # Static assets
├── tailwind.config.ts                # Custom BookOLX theme tokens (ink, sun, tealx, paper)
├── postcss.config.mjs                # PostCSS configuration
├── tsconfig.json                     # TypeScript compiler configuration
├── next.config.ts                    # Next.js configuration (remote image patterns)
└── package.json                      # Dependencies and npm scripts
```

---

## 🎨 Theme & Styling System

The application features a warm, tactile neobrutalist aesthetic inspired by printed paper and India's vibrant second-hand book bazaars:

| Token | Hex / Class | Purpose |
| :--- | :--- | :--- |
| `ink` | `#002F34` | Primary brand dark tone (text, buttons, primary dark surfaces) |
| `inkLight` | `#0E4B51` | Hover state for primary buttons |
| `sun` | `#FFCE32` | Accent yellow (badges, SELL action, highlights) |
| `sunDark` | `#E6B800` | Rating stars & warm icons |
| `tealx` | `#23E5DB` | Accent cyan for secondary highlights |
| `paper` | `#FAF6EF` | Warm paper background |
| `cream` | `#FFF8E7` | Soft off-white for highlighted cards |
| `shadow-pop` | `4px 4px 0px #002F34` | Neobrutalist bold shadow |

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```
