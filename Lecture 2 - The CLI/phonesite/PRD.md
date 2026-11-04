# PRD: PhoneMart — Mobile Phone Ecommerce Site

Version: 1.0 · Status: Draft · Last updated: 2026-10-29

---

## 1. Overview

PhoneMart is a client-side ecommerce website for buying mobile phones, built with Next.js. It supports browsing a catalog of ~30 phones across multiple brands, filtering/searching, comparing specs, reading/writing reviews, and completing a fully simulated checkout. No backend or database — all persistent state (cart, reviews, orders) lives in `localStorage`.

### Design Direction

**T&T Supermarket–inspired vibrant retail look** (palette taken from tntsupermarket.us — `theme-color #007852`, bg `#f5f5f5`, Noto Sans):
- Primary brand color: T&T green `#007852` (headers, CTAs, logo), darker `#005C3E` / pine `#0B3A28` shades
- Prominent deal badges and red prices (`#C8102E`) on yellow price tags — classic T&T flyer style
- Big horizontal promo/hero banners carousel on the home page (like weekly flyers)
- Yellow/gold promo accents (`#FFC72C`) for price chips, top strip, star ratings
- Dense but clean product grid on light-gray `#f5f5f5` surface, category/brand quick-nav bar
- Typography: Noto Sans (self-hosted via next/font), bold weights for prices/headlines

---

## 2. Goals

1. Allow users to browse, search, and filter a multi-brand phone catalog
2. Support a complete simulated purchase flow: cart → checkout form → order confirmation
3. Allow users to compare 2–3 phones side by side
4. Show star ratings and reviews; allow guests to submit reviews (localStorage)
5. Surface deals/promotions with badges and sale pricing
6. Deliver a polished, T&T-style visual experience with promo banners

### Non-Goals

- Real payments, real authentication, or a backend/database
- Order history across devices (orders live only in localStorage)
- Admin panel (V2 candidate)
- Mobile app / native

---

## 3. Tech Stack

| Concern    | Choice                                        |
|------------|-----------------------------------------------|
| Framework  | Next.js (App Router) + TypeScript             |
| Styling    | Tailwind CSS                                  |
| State      | React context/hooks + `localStorage`          |
| Data       | Static TS data file (`data/phones.ts`)        |
| Images     | Placeholder product images (static assets or generated) |
| Linting    | ESLint + Prettier                             |

---

## 4. Catalog Data

- `data/phones.ts`: ~30 phones across Apple, Samsung, Google, OnePlus, Xiaomi (and optionally Motorola)
- Each product:

```ts
interface Phone {
  id: string;               // slug, e.g. "galaxy-s25"
  brand: string;
  name: string;
  price: number;            // USD, current price
  originalPrice?: number;   // for sale items
  storage: number;          // GB
  ram: number;              // GB
  screen: number;           // inches
  camera: string;           // e.g. "50MP triple"
  battery: number;          // mAh
  colors: string[];
  releaseYear: number;
  image: string;            // path to placeholder
  stock: number;
  rating: number;           // 0–5, seeded average
  reviewCount: number;
  onSale: boolean;
}
```

- Reviews are seeded inline (product-level defaults) and merged with user-submitted reviews from localStorage at render time.

---

## 5. Pages & Routes

| Route          | Purpose                                                                 |
|----------------|-------------------------------------------------------------------------|
| `/`            | Home: promo banner carousel, "Deals of the Week" grid, brand quick-nav, featured products |
| `/products`    | Listing with search, brand/price/storage/RAM filters, sorting, sale-badge grid |
| `/products/[id]` | Product detail: image, price (strikethrough if sale), specs, color picker, reviews, add-to-cart |
| `/compare`     | Side-by-side spec comparison (2–3 phones)                               |
| `/cart`        | Cart contents, quantity edit, remove, subtotal, promo-code field (mock) |
| `/checkout`    | Contact/shipping/payment form (all simulated), order summary            |
| `/order/[id]`  | Order confirmation with fake order number                               |

---

## 6. Feature Details

### 6.1 Search & Filters (`/products`)
- Text search over name + brand
- Filters: brand (multi-select), price range, storage, RAM; sort by price/rating/newest
- URL search params as source of truth (shareable/refreshable)
- Empty state when no results

### 6.2 Cart
- Add from listing (quick-add) and product detail (with color choice)
- Quantity controls, per-line totals, cart subtotal, free shipping over $499 (mock threshold)
- Cart badge count in header; persisted to `localStorage`

### 6.3 Checkout (simulated)
- Form: contact, shipping address, mock payment fields (never validated for real)
- Client-side validation with friendly errors
- On submit: write order to `localStorage.orders`, clear cart, redirect to `/order/[id]`

### 6.4 Reviews & Ratings
- Star display (0–5, halves) on cards and detail pages
- Detail page lists reviews; guest review form (name, rating, text) → saved to `localStorage`, merged into display; product average recomputed live

### 6.5 Product Comparison
- "Add to compare" on cards/detail (max 3, visual counter, clear-all)
- `/compare` table: price, rating, storage, RAM, screen, camera, battery, colors; best-value row highlighting (e.g., lowest price, biggest battery)

### 6.6 Promo / Deals
- `onSale` products get badge + strikethrough original price
- Home banner carousel (3–4 static promo slides, auto-advance + dots)
- "Deals of the Week" section on home

---

## 7. localStorage Schema

| Key                 | Value                                  |
|---------------------|----------------------------------------|
| `cart`              | `{ items: [{ id, color, qty }], updatedAt }` |
| `orders`            | `[{ id, date, items, totals, customer }]` |
| `reviews`           | `{ [phoneId]: [{ name, rating, text, date }] }` |
| `compare`           | `string[]` (phone ids, max 3)          |
| `promoBannerSeen`   | index of last viewed banner            |

All access wrapped in small helper modules (`lib/storage.ts`) with JSON-parse safety and SSR guards (no `localStorage` during server render; hydrate after mount to avoid hydration mismatch).

---

## 8. Design System

- **Colors:** brand green `#007852` (T&T theme color), promo yellow `#FFC72C`, price red `#C8102E`, dark ink `#1A1A1A`, surface gray `#F5F5F5`
- **Typography:** Noto Sans (as on tntsupermarket.us), price tags in yellow "price chip" style with red price text
- **Components:** `Badge`, `PriceTag`, `BannerCarousel`, `ProductCard`, `RatingStars`, `QtyStepper`, `FilterSidebar`, `CompareTray`, `EmptyState`
- Responsive: mobile-first; filter sidebar becomes a drawer on small screens

---

## 9. Build Loops (Milestones)

Work proceeds in reviewable loops; each ends with a working app.

1. **Loop 1 — Skeleton:** Next.js + Tailwind setup, data file, header/footer/nav, home page with banner placeholders and product grid
2. **Loop 2 — Browse:** `/products` with search, filters, sorting; `/products/[id]` detail page
3. **Loop 3 — Cart:** localStorage cart context, add/edit/remove, header badge, `/cart` page
4. **Loop 4 — Checkout:** form + validation, fake order placement, `/order/[id]` confirmation
5. **Loop 5 — Reviews:** seeded + user reviews, rating display, review form
6. **Loop 6 — Compare:** compare tray, `/compare` page, best-value highlighting
7. **Loop 7 — Polish:** promo banner carousel, deal sections, responsive pass, empty/loading states, lint/typecheck clean

---

## 10. Acceptance Criteria

- [ ] All 7 routes render without errors; no hydration warnings from localStorage use
- [ ] Cart survives refresh; checkout clears it and produces a confirmation page with order id
- [ ] Filters/sort produce correct results; URL params reflect filter state
- [ ] Compare supports exactly 2–3 phones with guardrails
- [ ] User reviews persist across refresh and update displayed averages
- [ ] Sale items show badge + original price strikethrough site-wide
- [ ] `npm run lint` and `tsc --noEmit` pass clean

---

## 11. Open Questions (resolve during loops)

- ~~Exact red/yellow hexes and logo/wordmark for "PhoneMart"~~ Resolved: palette extracted from tntsupermarket.us (`#007852`, `#FFC72C`, `#C8102E`, `#F5F5F5`, Noto Sans)
- Placeholder images: generated assets vs. stock photos
- V2 candidates: admin edit page, wishlist, real auth, Stripe
