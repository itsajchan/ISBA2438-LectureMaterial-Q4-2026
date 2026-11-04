"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { getPhone } from "@/data/phones";
import { computeTotals, PROMO_CODES } from "@/lib/pricing";
import { formatUSD } from "@/lib/format";
import type { Customer, Order, OrderItem } from "@/lib/types";

interface FormState {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  card: string;
  expiry: string;
  cvc: string;
}

const EMPTY: FormState = { name: "", email: "", address: "", city: "", state: "", zip: "", card: "", expiry: "", cvc: "" };

export default function CheckoutPage() {
  const { items, promo, loaded, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [placing, setPlacing] = useState(false);

  const priceOf = (id: string) => getPhone(id)?.price ?? 0;
  const totals = computeTotals(items, promo, priceOf);

  const set = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const er: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) er.name = "Full name is required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = "Enter a valid email";
    if (!form.address.trim()) er.address = "Street address is required";
    if (!form.city.trim()) er.city = "City is required";
    if (!form.state.trim()) er.state = "State is required";
    if (!/^\d{5}(-\d{4})?$/.test(form.zip.trim())) er.zip = "Enter a valid ZIP code";
    if (!/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/.test(form.card.trim())) er.card = "Enter a 16-digit card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry.trim())) er.expiry = "Use MM/YY format";
    if (!/^\d{3,4}$/.test(form.cvc.trim())) er.cvc = "Enter a valid CVC";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    const orderItems: OrderItem[] = items.map((i) => {
      const phone = getPhone(i.phoneId);
      return {
        phoneId: i.phoneId,
        name: phone?.name ?? i.phoneId,
        color: i.color,
        qty: i.qty,
        price: phone?.price ?? 0,
      };
    });
    const customer: Customer = {
      name: form.name.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      zip: form.zip.trim(),
    };
    const order: Order = {
      id: `PM-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`,
      date: new Date().toISOString(),
      items: orderItems,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      customer,
    };
    const existing = JSON.parse(window.localStorage.getItem("orders") ?? "[]") as Order[];
    window.localStorage.setItem("orders", JSON.stringify([order, ...existing]));
    clear();
    router.push(`/order/${order.id}`);
  };

  if (!loaded) {
    return <div className="h-96 animate-pulse rounded-xl bg-white" />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
        <p className="text-3xl font-black">Nothing to check out</p>
        <p className="mt-2 text-gray-500">Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3 font-extrabold text-white hover:bg-brand-dark"
        >
          Shop phones
        </Link>
      </div>
    );
  }

  const field = (key: keyof FormState, label: string, placeholder: string, type = "text") => (
    <div>
      <label htmlFor={`co-${key}`} className="mb-1 block text-sm font-bold">
        {label}
      </label>
      <input
        id={`co-${key}`}
        type={type}
        value={form[key]}
        onChange={set(key)}
        placeholder={placeholder}
        className={`input-field ${errors[key] ? "border-brand ring-2 ring-brand/20" : ""}`}
      />
      {errors[key] && <p className="mt-1 text-xs font-bold text-brand">{errors[key]}</p>}
    </div>
  );

  return (
    <div>
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-black">
        <span className="inline-block h-7 w-2 rounded bg-brand" />
        Checkout
      </h1>
      <form onSubmit={placeOrder} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <fieldset className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
            <legend className="px-2 text-lg font-black text-brand-dark">1 · Contact & Shipping</legend>
            {field("name", "Full name", "Alex Nguyen")}
            {field("email", "Email", "alex@example.com", "email")}
            {field("address", "Street address", "123 Main St")}
            <div className="grid grid-cols-3 gap-4">
              {field("city", "City", "San Jose")}
              {field("state", "State", "CA")}
              {field("zip", "ZIP", "95112")}
            </div>
          </fieldset>
          <fieldset className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
            <legend className="px-2 text-lg font-black text-brand-dark">2 · Payment</legend>
            <p className="rounded-lg bg-gold/30 px-3 py-2 text-xs font-bold text-ink">
              Demo checkout — no real payment is processed. Use any numbers.
            </p>
            {field("card", "Card number", "4242 4242 4242 4242")}
            <div className="grid grid-cols-2 gap-4">
              {field("expiry", "Expiry (MM/YY)", "12/28")}
              {field("cvc", "CVC", "123")}
            </div>
          </fieldset>
        </div>
        <div className="h-fit space-y-4 rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-36">
          <p className="text-lg font-black">Order Summary</p>
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {items.map((i) => {
              const phone = getPhone(i.phoneId);
              if (!phone) return null;
              return (
                <div key={`${i.phoneId}-${i.color}`} className="flex items-center gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-black">
                    {i.qty}
                  </span>
                  <span className="flex-1 truncate font-semibold">{phone.name}</span>
                  <span className="font-bold">{formatUSD(phone.price * i.qty)}</span>
                </div>
              );
            })}
          </div>
          <div className="space-y-1.5 border-t border-gray-200 pt-3 text-sm">
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
          <button
            type="submit"
            disabled={placing}
            className="w-full rounded-full bg-brand px-6 py-3 text-lg font-extrabold text-white hover:bg-brand-dark disabled:bg-gray-300"
          >
            {placing ? "Placing order…" : `Place order · ${formatUSD(totals.total)}`}
          </button>
          <p className="text-center text-xs text-gray-500">
            Promo applied: <span className="font-bold">{promo ? `${promo} — ${PROMO_CODES[promo].label}` : "none"}</span>
          </p>
        </div>
      </form>
    </div>
  );
}
