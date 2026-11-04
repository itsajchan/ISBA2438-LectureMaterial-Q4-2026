"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import { CompareProvider } from "@/lib/compare-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <CompareProvider>{children}</CompareProvider>
    </CartProvider>
  );
}
