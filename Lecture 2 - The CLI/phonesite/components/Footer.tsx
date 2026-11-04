import Link from "next/link";
import { brands } from "@/data/phones";

export default function Footer() {
  return (
    <footer className="mt-16 bg-pine text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="mb-3 text-2xl font-black text-white">
            Phone<span className="text-gold">Mart</span>
          </p>
          <p className="text-sm leading-relaxed">
            Your neighborhood phone superstore. Big deals, big savings — every day.
          </p>
          <p className="mt-4 text-xs text-gray-500">Simulated demo store. No real orders or payments.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-extrabold uppercase tracking-wide text-gold">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">All Phones</Link></li>
            <li><Link href="/products?deals=1" className="hover:text-white">Weekly Deals</Link></li>
            {brands.slice(0, 4).map((b) => (
              <li key={b}>
                <Link href={`/products?brand=${encodeURIComponent(b)}`} className="hover:text-white">
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-extrabold uppercase tracking-wide text-gold">Help</p>
          <ul className="space-y-2 text-sm">
            <li><span className="cursor-default">Shipping &amp; Returns</span></li>
            <li><span className="cursor-default">Warranty</span></li>
            <li><span className="cursor-default">Contact Us</span></li>
            <li><Link href="/compare" className="hover:text-white">Compare Phones</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © 2026 PhoneMart. All rights reserved.
      </div>
    </footer>
  );
}
