"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { useCompare } from "@/lib/compare-context";
import { brands } from "@/data/phones";

export default function Header() {
  const { count } = useCart();
  const { ids } = useCompare();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : "/products");
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brand-dark px-4 py-1 text-center text-xs font-bold text-gold">
        FREE SHIPPING on orders over $499 · Use code <span className="uppercase">SAVE10</span> for 10% off
      </div>
      <div className="bg-brand">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="7" y="2" width="10" height="20" rx="2.5" stroke="#FFC72C" strokeWidth="2" />
              <circle cx="12" cy="18" r="1" fill="#FFC72C" />
              <path d="M9 6h6M9 9h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-2xl font-black tracking-tight">
              Phone<span className="text-gold">Mart</span>
            </span>
          </Link>
          <form onSubmit={submitSearch} className="hidden flex-1 sm:block">
            <div className="relative max-w-xl">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search phones, brands…"
                className="w-full rounded-full px-4 py-2 pr-12 text-sm text-ink outline-none focus:ring-2 focus:ring-gold"
                aria-label="Search phones"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gold px-3 py-1.5 text-ink"
                aria-label="Search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M15 15l5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </form>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/compare"
              className="relative rounded-full px-3 py-2 text-sm font-bold text-white hover:bg-brand-dark"
            >
              Compare
              {ids.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-black text-ink">
                  {ids.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative rounded-full px-3 py-2 text-white hover:bg-brand-dark" aria-label="Cart">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 4h2l2.4 12.2a1.5 1.5 0 001.5 1.3h8.6a1.5 1.5 0 001.5-1.2L21 8H6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20.5" r="1.5" fill="currentColor" />
                <circle cx="18" cy="20.5" r="1.5" fill="currentColor" />
              </svg>
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-black text-ink">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-brand-dark">
          <Link href="/products" className="whitespace-nowrap rounded px-3 py-1.5 hover:bg-cream">
            All Phones
          </Link>
          <Link href="/products?deals=1" className="whitespace-nowrap rounded px-3 py-1.5 text-ink hover:bg-cream">
            Deals
          </Link>
          {brands.map((b) => (
            <Link
              key={b}
              href={`/products?brand=${encodeURIComponent(b)}`}
              className="whitespace-nowrap rounded px-3 py-1.5 hover:bg-cream"
            >
              {b}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
