"use client";

import Link from "next/link";
import { useCompare } from "@/lib/compare-context";
import { getPhone } from "@/data/phones";
import { mergedReviews } from "@/lib/reviews";
import { formatUSD } from "@/lib/format";
import PhoneImage from "@/components/PhoneImage";
import RatingStars from "@/components/RatingStars";
import PriceTag from "@/components/PriceTag";

type Row = {
  label: string;
  value: (p: NonNullable<ReturnType<typeof getPhone>>) => string;
  best?: (p: NonNullable<ReturnType<typeof getPhone>>) => number;
  bestHigh: boolean;
};

function specRow(
  label: string,
  value: (p: NonNullable<ReturnType<typeof getPhone>>) => string,
  best?: (p: NonNullable<ReturnType<typeof getPhone>>) => number,
  bestHigh = true
): Row {
  return { label, value, best, bestHigh };
}

const ROWS: Row[] = [
  specRow("Price", (p) => formatUSD(p.price), (p) => p.price, false),
  specRow("Rating", (p) => `${p.rating.toFixed(1)} / 5`, (p) => p.rating),
  specRow("Storage", (p) => `${p.storage} GB`, (p) => p.storage),
  specRow("RAM", (p) => `${p.ram} GB`, (p) => p.ram),
  specRow("Screen", (p) => `${p.screen}"`, (p) => p.screen),
  specRow("Camera", (p) => p.camera),
  specRow("Battery", (p) => `${p.battery} mAh`, (p) => p.battery),
  specRow("Colors", (p) => p.colors.join(", ")),
  specRow("Release year", (p) => String(p.releaseYear)),
  specRow("Stock", (p) => (p.stock === 0 ? "Sold out" : `${p.stock} in stock`)),
];

export default function ComparePage() {
  const { ids, remove, clear, loaded } = useCompare();

  if (!loaded) {
    return <div className="h-96 animate-pulse rounded-xl bg-white" />;
  }

  const items = ids.map((id) => getPhone(id)).filter((p) => p !== undefined);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-black">
          <span className="inline-block h-7 w-2 rounded bg-brand" />
          Compare Phones
        </h1>
        {items.length > 0 && (
          <button onClick={clear} className="text-sm font-bold text-gray-500 underline hover:text-brand">
            Clear all
          </button>
        )}
      </div>

      {items.length < 2 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
          <p className="text-2xl font-black">
            {items.length === 0 ? "No phones selected" : "Add at least one more phone"}
          </p>
          <p className="mt-2 text-gray-500">
            Click the ⇄ Compare button on any product card to add phones here (up to 3).
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-brand px-8 py-3 font-extrabold text-white hover:bg-brand-dark"
          >
            Browse phones
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr>
                <th className="w-32 border-b border-gray-200 p-4 text-left text-xs font-extrabold uppercase tracking-wide text-gray-400">
                  Product
                </th>
                {items.map((p) => (
                  <th key={p.id} className="border-b border-l border-gray-200 p-4 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/products/${p.id}`} className="min-w-0">
                        <PhoneImage seed={p.id} label={p.brand} className="mb-2 h-16 w-16 rounded-lg" />
                        <p className="font-bold hover:text-brand">{p.name}</p>
                      </Link>
                      <button
                        onClick={() => remove(p.id)}
                        className="text-gray-400 hover:text-brand"
                        aria-label={`Remove ${p.name} from compare`}
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                let bestIdx = -1;
                if (row.best && new Set(items.map((p) => row.best!(p))).size > 1) {
                  let bestVal: number | null = null;
                  for (let i = 0; i < items.length; i++) {
                    const v = row.best(items[i]);
                    if (bestVal === null || (row.bestHigh ? v > bestVal : v < bestVal)) {
                      bestVal = v;
                      bestIdx = i;
                    }
                  }
                }
                return (
                  <tr key={row.label} className="even:bg-cream/50">
                    <td className="p-4 text-xs font-extrabold uppercase tracking-wide text-gray-500">
                      {row.label}
                    </td>
                    {items.map((p, i) => (
                      <td
                        key={p.id}
                        className={`border-l border-gray-100 p-4 font-semibold ${
                          i === bestIdx ? "bg-emerald-50 font-black text-emerald-700" : ""
                        }`}
                      >
                        {i === bestIdx && "★ "}
                        {row.value(p)}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr>
                <td className="p-4" />
                {items.map((p) => (
                  <td key={p.id} className="border-l border-gray-100 p-4">
                    <PriceTag price={p.price} originalPrice={p.originalPrice} />
                    <p className="mt-2 flex items-center gap-1.5">
                      <RatingStars rating={p.rating} />
                      <span className="text-xs text-gray-500">({mergedReviews(p).length})</span>
                    </p>
                    <Link
                      href={`/products/${p.id}`}
                      className="mt-3 inline-block rounded-full bg-brand px-4 py-2 text-xs font-extrabold text-white hover:bg-brand-dark"
                    >
                      View details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
