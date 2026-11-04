"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartItem } from "@/lib/types";
import { readJSON, writeJSON } from "@/lib/storage";

interface CartContextValue {
  items: CartItem[];
  promo: string | null;
  loaded: boolean;
  count: number;
  add: (phoneId: string, color: string, qty?: number) => void;
  setQty: (phoneId: string, color: string, qty: number) => void;
  remove: (phoneId: string, color: string) => void;
  clear: () => void;
  applyPromo: (code: string | null) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "cart";
const PROMO_KEY = "cart-promo";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = readJSON<{ items: CartItem[] }>(CART_KEY, { items: [] });
    setItems(data.items ?? []);
    setPromo(readJSON<string | null>(PROMO_KEY, null));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeJSON(CART_KEY, { items, updatedAt: Date.now() });
  }, [items, loaded]);

  const add = (phoneId: string, color: string, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.phoneId === phoneId && i.color === color);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: Math.min(10, i.qty + qty) } : i));
      }
      return [...prev, { phoneId, color, qty }];
    });
  };

  const setQty = (phoneId: string, color: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.phoneId === phoneId && i.color === color))
        : prev.map((i) => (i.phoneId === phoneId && i.color === color ? { ...i, qty: Math.min(10, qty) } : i))
    );
  };

  const remove = (phoneId: string, color: string) => {
    setItems((prev) => prev.filter((i) => !(i.phoneId === phoneId && i.color === color)));
  };

  const clear = () => {
    setItems([]);
    setPromo(null);
    writeJSON(PROMO_KEY, null);
  };

  const applyPromo = (code: string | null) => {
    setPromo(code);
    writeJSON(PROMO_KEY, code);
  };

  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, promo, loaded, count, add, setQty, remove, clear, applyPromo }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
