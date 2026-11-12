import type { Product } from "../_data/catalog";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <div
        className={`relative grid h-32 place-items-center ${product.color} text-5xl`}
        aria-hidden
      >
        {product.emoji}
        <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-white">
          {product.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-xs text-stone-500">{product.unit}</p>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-brand">
            ${product.price.toFixed(2)}
          </span>
          {product.was > product.price && (
            <span className="text-xs text-stone-400 line-through">
              ${product.was.toFixed(2)}
            </span>
          )}
        </div>
        <button
          type="button"
          className="mt-2 rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white transition group-hover:bg-brand-dark"
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
}
