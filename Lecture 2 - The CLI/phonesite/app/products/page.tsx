import { Suspense } from "react";
import ProductListing from "@/components/ProductListing";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-xl bg-white" />
          ))}
        </div>
      }
    >
      <ProductListing />
    </Suspense>
  );
}
