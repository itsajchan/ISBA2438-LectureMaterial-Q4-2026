"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { phones, brands } from "@/data/phones";
import ProductCard from "@/components/ProductCard";

const PRICE_BUCKETS: Record<string, { label: string; min: number; max: number }> = {
  "0-300": { label: "Under $300", min: 0, max: 300 },
  "300-700": { label: "$300 – $700", min: 300, max: 700 },
  "700-1000": { label: "$700 – $1000", min: 700, max: 1000 },
  "1000+": { label: "Over $1000", min: 1000, max: Infinity },
};

const STORAGES = [128, 256, 512];
const RAMS = [6, 8, 12, 16];
const SORTS: Record<string, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Highest Rated",
  newest: "Newest",
};

export default function ProductListing() {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") ?? "";
  const brandParam = sp.get("brand") ?? "";
  const selectedBrands = brandParam ? brandParam.split(",") : [];
  const price = sp.get("price") ?? "";
  const storage = sp.get("storage") ?? "";
  const ram = sp.get("ram") ?? "";
  const dealsOnly = sp.get("deals") === "1";
  const sort = sp.get("sort") ?? "featured";
  const [searchDraft, setSearchDraft] = useState(q);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearchDraft(q);
  }, [q]);

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(sp.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    }
    router.replace(`/products?${next.toString()}`, { scroll: false });
  };

  const toggleBrand = (brand: string) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    update({ brand: next.join(",") });
  };

  const results = useMemo(() => {
    const activeBrands = brandParam ? brandParam.split(",") : [];
    let list = [...phones];
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(needle) || p.brand.toLowerCase().includes(needle)
      );
    }
    if (activeBrands.length > 0) list = list.filter((p) => activeBrands.includes(p.brand));
    if (price && PRICE_BUCKETS[price]) {
      const bucket = PRICE_BUCKETS[price];
      list = list.filter((p) => p.price >= bucket.min && p.price < bucket.max);
    }
    if (storage) list = list.filter((p) => p.storage >= Number(storage));
    if (ram) list = list.filter((p) => p.ram >= Number(ram));
    if (dealsOnly) list = list.filter((p) => p.onSale);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
    }
    return list;
  }, [q, brandParam, price, storage, ram, dealsOnly, sort]);

  const hasFilters = q || selectedBrands.length > 0 || price || storage || ram || dealsOnly;

  const filters = (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-dark">Brand</p>
        <div className="space-y-1.5">
          {brands.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="h-4 w-4 accent-brand"
              />
              {b}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-dark">Price</p>
        <select
          value={price}
          onChange={(e) => update({ price: e.target.value })}
          className="input-field"
          aria-label="Price range"
        >
          <option value="">Any price</option>
          {Object.entries(PRICE_BUCKETS).map(([key, b]) => (
            <option key={key} value={key}>
              {b.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-dark">Storage (min)</p>
        <select
          value={storage}
          onChange={(e) => update({ storage: e.target.value })}
          className="input-field"
          aria-label="Storage"
        >
          <option value="">Any storage</option>
          {STORAGES.map((s) => (
            <option key={s} value={s}>
              {s}GB+
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-brand-dark">RAM (min)</p>
        <select
          value={ram}
          onChange={(e) => update({ ram: e.target.value })}
          className="input-field"
          aria-label="RAM"
        >
          <option value="">Any RAM</option>
          {RAMS.map((r) => (
            <option key={r} value={r}>
              {r}GB+
            </option>
          ))}
        </select>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-bold">
        <input
          type="checkbox"
          checked={dealsOnly}
          onChange={(e) => update({ deals: e.target.checked ? "1" : null })}
          className="h-4 w-4 accent-brand"
        />
        Deals only
      </label>
      {hasFilters && (
        <button
          onClick={() => router.replace("/products", { scroll: false })}
          className="w-full rounded-full border-2 border-brand px-4 py-2 text-sm font-extrabold text-brand hover:bg-brand hover:text-white"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex gap-6">
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute inset-y-0 left-0 w-80 overflow-y-auto bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-black">Filters</p>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-brand" aria-label="Close filters">
                ✕
              </button>
            </div>
            {filters}
            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full rounded-full bg-brand px-4 py-2 text-sm font-extrabold text-white"
            >
              Show {results.length} results
            </button>
          </div>
        </div>
      )}
      <aside className="hidden w-60 shrink-0 rounded-xl border border-gray-200 bg-white p-5 lg:block">
        {filters}
      </aside>
      <div className="flex-1">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: searchDraft.trim() || null });
            }}
            className="flex-1 sm:max-w-sm"
          >
            <input
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              placeholder="Search phones…"
              className="input-field"
              aria-label="Search phones"
            />
          </form>
          <select
            value={sort}
            onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
            className="input-field sm:w-48"
            aria-label="Sort"
          >
            {Object.entries(SORTS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters(true)}
            className="rounded-full border-2 border-brand px-4 py-2 text-sm font-extrabold text-brand lg:hidden"
          >
            Filters
          </button>
        </div>
        <p className="mb-4 text-sm text-gray-500">
          {results.length} {results.length === 1 ? "phone" : "phones"} found
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} phone={p} />
          ))}
        </div>
        {results.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-xl font-black text-ink">No phones match your filters</p>
            <p className="mt-1 text-sm text-gray-500">Try clearing a filter or searching for something else.</p>
            <button
              onClick={() => router.replace("/products", { scroll: false })}
              className="mt-4 rounded-full bg-brand px-6 py-2 text-sm font-extrabold text-white hover:bg-brand-dark"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
