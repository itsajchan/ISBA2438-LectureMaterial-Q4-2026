"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "@/lib/types";
import { readJSON } from "@/lib/storage";
import { formatUSD, formatDate } from "@/lib/format";
import PhoneImage from "@/components/PhoneImage";

export default function OrderConfirmation({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const orders = readJSON<Order[]>("orders", []);
    setOrder(orders.find((o) => o.id === id) ?? null);
    setLoaded(true);
  }, [id]);

  if (!loaded) {
    return <div className="h-96 animate-pulse rounded-xl bg-white" />;
  }

  if (!order) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
        <p className="text-3xl font-black">Order not found</p>
        <p className="mt-2 text-gray-500">We couldn&apos;t find order {id} on this device.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3 font-extrabold text-white hover:bg-brand-dark"
        >
          Back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border-2 border-emerald-500 bg-white p-8 text-center shadow-md">
        <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12.5l5 5L20 6.5" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="text-3xl font-black text-emerald-600">Order Confirmed!</h1>
        <p className="mt-2 text-gray-600">
          Thanks, {order.customer.name.split(" ")[0]}! Your order is on its way.
        </p>
        <p className="mt-4 inline-block rounded-full bg-gold px-6 py-2 font-black text-ink">
          Order #: {order.id}
        </p>
        <p className="mt-2 text-sm text-gray-500">Placed on {formatDate(order.date)}</p>
      </div>

      <div className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <p className="text-lg font-black">Items</p>
        {order.items.map((i) => (
          <div key={`${i.phoneId}-${i.color}`} className="flex items-center gap-4 border-b border-gray-100 pb-3">
            <PhoneImage seed={`${i.phoneId}-${i.color}`} label={i.name.split(" ")[0]} className="h-14 w-14 rounded-lg" />
            <div className="flex-1">
              <p className="font-bold">{i.name}</p>
              <p className="text-sm text-gray-500">
                {i.color} · Qty {i.qty}
              </p>
            </div>
            <p className="font-extrabold">{formatUSD(i.price * i.qty)}</p>
          </div>
        ))}
        <div className="space-y-1.5 pt-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold">{formatUSD(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span className="font-bold">−{formatUSD(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span className="font-bold">{order.shipping === 0 ? "FREE" : formatUSD(order.shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-lg">
            <span className="font-black">Total paid</span>
            <span className="font-black text-price">{formatUSD(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <p className="mb-2 text-lg font-black">Shipping to</p>
        <p className="text-sm text-gray-700">
          {order.customer.name}
          <br />
          {order.customer.address}
          <br />
          {order.customer.city}, {order.customer.state} {order.customer.zip}
          <br />
          {order.customer.email}
        </p>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Link href="/products" className="rounded-full bg-brand px-8 py-3 font-extrabold text-white hover:bg-brand-dark">
          Keep shopping
        </Link>
        <Link href="/" className="rounded-full border-2 border-brand px-8 py-3 font-extrabold text-brand hover:bg-brand hover:text-white">
          Back home
        </Link>
      </div>
    </div>
  );
}
