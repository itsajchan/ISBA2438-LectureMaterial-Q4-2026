"use client";

import Link from "next/link";
import type { Phone } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { useCompare } from "@/lib/compare-context";
import { mergedReviews } from "@/lib/reviews";
import PhoneImage from "@/components/PhoneImage";
import PriceTag from "@/components/PriceTag";
import RatingStars from "@/components/RatingStars";
import Badge from "@/components/Badge";

export default function ProductCard({ phone }: { phone: Phone }) {
  const { add } = useCart();
  const { toggle, isSelected, isFull } = useCompare();
  const reviews = mergedReviews(phone);
  const selected = isSelected(phone.id);
  const outOfStock = phone.stock === 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {phone.onSale && <Badge>Sale</Badge>}
        {phone.releaseYear >= 2026 && <Badge variant="new">New</Badge>}
        {phone.stock > 0 && phone.stock <= 10 && <Badge variant="low-stock">Only {phone.stock} left</Badge>}
      </div>
      <button
        onClick={() => toggle(phone.id)}
        disabled={!selected && isFull}
        title={!selected && isFull ? "Compare is full (max 3)" : "Add to compare"}
        className={`absolute right-2 top-2 z-10 rounded-full border px-2 py-1 text-[11px] font-bold transition ${
          selected
            ? "border-brand bg-brand text-white"
            : "border-gray-300 bg-white text-gray-600 hover:border-brand hover:text-brand disabled:opacity-40"
        }`}
      >
        {selected ? "✓ Compared" : "⇄ Compare"}
      </button>
      <Link href={`/products/${phone.id}`} className="block bg-cream p-6">
        <PhoneImage seed={phone.id} label={phone.brand} className="mx-auto h-44 w-44" />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{phone.brand}</p>
        <Link href={`/products/${phone.id}`} className="font-bold leading-snug hover:text-brand">
          {phone.name}
        </Link>
        <div className="flex items-center gap-1.5">
          <RatingStars rating={phone.rating} />
          <span className="text-xs text-gray-500">
            {phone.rating.toFixed(1)} ({reviews.length})
          </span>
        </div>
        <p className="text-xs text-gray-500">
          {phone.storage}GB · {phone.ram}GB RAM · {phone.screen}&quot;
        </p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <PriceTag price={phone.price} originalPrice={phone.originalPrice} />
          <button
            onClick={() => add(phone.id, phone.colors[0])}
            disabled={outOfStock}
            className="rounded-full bg-brand px-4 py-2 text-sm font-extrabold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {outOfStock ? "Sold out" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
