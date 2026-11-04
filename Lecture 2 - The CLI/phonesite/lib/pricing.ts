import type { CartItem } from "@/lib/types";

export const FREE_SHIPPING_THRESHOLD = 499;
export const SHIPPING_FEE = 19.99;

export const PROMO_CODES: Record<string, { type: "percent" | "free-ship"; value: number; label: string }> = {
  SAVE10: { type: "percent", value: 0.1, label: "10% off your order" },
  FREESHIP: { type: "free-ship", value: 0, label: "Free shipping" },
};

export interface Totals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export function computeTotals(items: CartItem[], promo: string | null, priceOf: (phoneId: string) => number): Totals {
  const subtotal = items.reduce((sum, item) => sum + priceOf(item.phoneId) * item.qty, 0);
  const promoDef = promo ? PROMO_CODES[promo] : undefined;
  const discount = promoDef?.type === "percent" ? subtotal * promoDef.value : 0;
  let shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  if (promoDef?.type === "free-ship") shipping = 0;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}
