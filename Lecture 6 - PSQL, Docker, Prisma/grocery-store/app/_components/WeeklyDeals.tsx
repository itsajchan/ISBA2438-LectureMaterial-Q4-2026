"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../_data/catalog";

export default function WeeklyDeals() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => setProducts([]));
  }, []);

  return (
    <section id="deals" className="bg-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Weekly Deals
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Valid through Sunday — while supplies last.
            </p>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-brand hover:text-brand-dark"
          >
            View Weekly Ad →
          </a>
        </div>
        {products === null ? (
          <p className="py-12 text-center text-sm text-stone-400">
            Loading deals…
          </p>
        ) : products.length === 0 ? (
          <p className="py-12 text-center text-sm text-stone-400">
            No deals right now — check back soon!
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
