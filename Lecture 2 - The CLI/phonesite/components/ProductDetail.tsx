"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Phone } from "@/lib/types";
import { phones } from "@/data/phones";
import { useCart } from "@/lib/cart-context";
import { useCompare } from "@/lib/compare-context";
import PhoneImage from "@/components/PhoneImage";
import PriceTag from "@/components/PriceTag";
import RatingStars from "@/components/RatingStars";
import Badge from "@/components/Badge";
import ReviewSection from "@/components/ReviewSection";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail({ phone }: { phone: Phone }) {
  const { add } = useCart();
  const { toggle, isSelected, isFull } = useCompare();
  const router = useRouter();
  const [color, setColor] = useState(phone.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = phones.filter((p) => p.brand === phone.brand && p.id !== phone.id).slice(0, 4);
  const selected = isSelected(phone.id);

  const addToCart = () => {
    add(phone.id, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specs: [string, string][] = [
    ["Display", `${phone.screen}" display`],
    ["Camera", phone.camera],
    ["Battery", `${phone.battery} mAh`],
    ["Storage", `${phone.storage} GB`],
    ["RAM", `${phone.ram} GB`],
    ["Release year", String(phone.releaseYear)],
  ];

  return (
    <div className="space-y-12">
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?brand=${encodeURIComponent(phone.brand)}`} className="hover:text-brand">
          {phone.brand}
        </Link>
        <span className="mx-2">/</span>
        <span className="font-bold text-ink">{phone.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-10">
          <div className="absolute left-4 top-4 flex flex-col gap-1">
            {phone.onSale && <Badge>Sale</Badge>}
            {phone.releaseYear >= 2026 && <Badge variant="new">New</Badge>}
            {phone.stock > 0 && phone.stock <= 10 && (
              <Badge variant="low-stock">Only {phone.stock} left</Badge>
            )}
          </div>
          <PhoneImage seed={`${phone.id}-${color}`} label={phone.brand} className="h-80 w-80" />
        </div>

        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-wide text-gray-500">{phone.brand}</p>
          <h1 className="text-3xl font-black leading-tight">{phone.name}</h1>
          <div className="flex items-center gap-2">
            <RatingStars rating={phone.rating} size="md" />
            <a href="#reviews" className="text-sm font-semibold text-brand hover:underline">
              {phone.rating.toFixed(1)} · See reviews
            </a>
          </div>
          <PriceTag price={phone.price} originalPrice={phone.originalPrice} large />
          <p className="text-sm font-semibold text-emerald-600">
            {phone.stock > 0 ? `In stock — ships in 1–2 business days` : "Out of stock"}
          </p>

          <div>
            <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-dark">
              Color: <span className="text-ink">{color}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {phone.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                    c === color ? "border-brand bg-brand text-white" : "border-gray-300 hover:border-brand"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border-2 border-gray-300">
              <button
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="px-4 py-2 text-lg font-black text-brand"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty((n) => Math.min(10, phone.stock, n + 1))}
                className="px-4 py-2 text-lg font-black text-brand"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={addToCart}
              disabled={phone.stock === 0}
              className="flex-1 rounded-full bg-brand px-8 py-3 text-lg font-extrabold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {phone.stock === 0 ? "Sold out" : added ? "✓ Added to cart!" : "Add to cart"}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => toggle(phone.id)}
              disabled={!selected && isFull}
              className={`flex-1 rounded-full border-2 px-4 py-2 text-sm font-extrabold transition ${
                selected
                  ? "border-brand bg-brand text-white"
                  : "border-brand text-brand hover:bg-brand hover:text-white disabled:opacity-40"
              }`}
            >
              {selected ? "✓ In compare list" : "⇄ Add to compare"}
            </button>
            <button
              onClick={() => {
                add(phone.id, color, qty);
                router.push("/checkout");
              }}
              disabled={phone.stock === 0}
              className="flex-1 rounded-full border-2 border-gold bg-gold px-4 py-2 text-sm font-extrabold text-ink transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Buy it now
            </button>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="mb-3 text-lg font-black">Specs</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {specs.map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-gray-100 py-1.5">
                  <dt className="text-gray-500">{label}</dt>
                  <dd className="font-bold">{value}</dd>
                </div>
              ))}
              <div className="col-span-2 flex justify-between border-b border-gray-100 py-1.5">
                <dt className="text-gray-500">Colors</dt>
                <dd className="font-bold">{phone.colors.join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <ReviewSection phone={phone} />

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black">
            <span className="inline-block h-6 w-2 rounded bg-brand" />
            More from {phone.brand}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} phone={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
