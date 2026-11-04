"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { getPhone } from "@/data/phones";
import { computeTotals, PROMO_CODES, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";
import { formatUSD } from "@/lib/format";
import PhoneImage from "@/components/PhoneImage";

export default function CartPage() {
  const { items, promo, loaded, setQty, remove, clear, applyPromo } = useCart();
  const [promoDraft, setPromoDraft] = useState("");
  const [promoError, setPromoError] = useState("");

  const priceOf = (id: string) => getPhone(id)?.price ?? 0;
  const totals = computeTotals(items, promo, priceOf);

  const applyCode = () => {
    const code = promoDraft.trim().toUpperCase();
    if (!PROMO_CODES[code]) {
      setPromoError("Invalid promo code. Try SAVE10 or FREESHIP.");
      return;
    }
    applyPromo(code);
    setPromoDraft("");
    setPromoError("");
  };

  if (!loaded) {
    return <div className="h-64 animate-pulse rounded-xl bg-white" />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
        <p className="text-3xl font-black">Your cart is empty</p>
        <p className="mt-2 text-gray-500">Add a phone and it will show up here.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3 font-extrabold text-white hover:bg-brand-dark"
        >
          Shop phones
        </Link>
      </div>
    );
  }

  const awayFromFree = FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount);

  return (
    <div>
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-black">
        <span className="inline-block h-7 w-2 rounded bg-brand" />
        Your Cart ({items.length} {items.length === 1 ? "item" : "items"})
      </h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {items.map((item) => {
            const phone = getPhone(item.phoneId);
            if (!phone) return null;
            return (
              <div
                key={`${item.phoneId}-${item.color}`}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                <Link href={`/products/${phone.id}`} className="shrink-0">
                  <PhoneImage seed={`${phone.id}-${item.color}`} label={phone.brand} className="h-20 w-20 rounded-lg" />
                </Link>
                <div className="min-w-40 flex-1">
                  <Link href={`/products/${phone.id}`} className="font-bold hover:text-brand">
                    {phone.name}
                  </Link>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <p className="text-sm text-gray-500">{formatUSD(phone.price)} each</p>
                </div>
                <div className="flex items-center rounded-full border-2 border-gray-300">
                  <button
                    onClick={() => setQty(item.phoneId, item.color, item.qty - 1)}
                    className="px-3 py-1.5 font-black text-brand"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.phoneId, item.color, item.qty + 1)}
                    className="px-3 py-1.5 font-black text-brand"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <p className="w-20 text-right font-extrabold">{formatUSD(phone.price * item.qty)}</p>
                <button
                  onClick={() => remove(item.phoneId, item.color)}
                  className="text-sm font-bold text-gray-400 hover:text-brand"
                  aria-label={`Remove ${phone.name}`}
                >
                  ✕
                </button>
              </div>
            );
          })}
          <button onClick={clear} className="text-sm font-bold text-gray-500 underline hover:text-brand">
            Clear cart
          </button>
        </div>

        <div className="h-fit space-y-4 rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-36">
          <p className="text-lg font-black">Order Summary</p>
          {awayFromFree > 0 && (
            <p className="rounded-lg bg-gold/30 px-3 py-2 text-sm font-bold text-ink">
              Add {formatUSD(awayFromFree)} more for FREE shipping!
            </p>
          )}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">{formatUSD(totals.subtotal)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Promo ({promo})</span>
                <span className="font-bold">−{formatUSD(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-bold">{totals.shipping === 0 ? "FREE" : formatUSD(totals.shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-lg">
              <span className="font-black">Total</span>
              <span className="font-black text-price">{formatUSD(totals.total)}</span>
            </div>
          </div>
          <div>
            {promo ? (
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
                <p className="text-sm font-bold text-emerald-700">
                  ✓ {promo}: {PROMO_CODES[promo].label}
                </p>
                <button
                  onClick={() => applyPromo(null)}
                  className="text-xs font-bold text-gray-500 underline hover:text-brand"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    value={promoDraft}
                    onChange={(e) => setPromoDraft(e.target.value)}
                    placeholder="Promo code"
                    className="input-field"
                    aria-label="Promo code"
                  />
                  <button
                    onClick={applyCode}
                    className="shrink-0 rounded-md bg-ink px-4 py-2 text-sm font-extrabold text-white hover:bg-gray-700"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="mt-1 text-xs font-bold text-brand">{promoError}</p>}
              </>
            )}
          </div>
          <Link
            href="/checkout"
            className="block rounded-full bg-brand px-6 py-3 text-center text-lg font-extrabold text-white hover:bg-brand-dark"
          >
            Checkout →
          </Link>
          <Link href="/products" className="block text-center text-sm font-bold text-brand hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
