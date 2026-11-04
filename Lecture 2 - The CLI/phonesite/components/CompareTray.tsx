"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompare } from "@/lib/compare-context";
import { getPhone } from "@/data/phones";
import PhoneImage from "@/components/PhoneImage";

export default function CompareTray() {
  const { ids, remove, clear } = useCompare();
  const pathname = usePathname();

  if (ids.length === 0 || pathname === "/compare") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-gold bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <p className="text-sm font-extrabold uppercase tracking-wide text-brand-dark">
          Compare ({ids.length}/3)
        </p>
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {ids.map((id) => {
            const phone = getPhone(id);
            if (!phone) return null;
            return (
              <div key={id} className="relative flex items-center gap-2 rounded-lg border border-gray-200 bg-cream p-1.5 pr-7">
                <PhoneImage seed={id} label={phone.brand} className="h-8 w-8 rounded" />
                <span className="max-w-36 truncate text-xs font-bold">{phone.name}</span>
                <button
                  onClick={() => remove(id)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand"
                  aria-label={`Remove ${phone.name} from compare`}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={clear} className="text-xs font-bold text-gray-500 underline hover:text-brand">
          Clear all
        </button>
        <Link
          href="/compare"
          className={`rounded-full px-5 py-2 text-sm font-extrabold ${
            ids.length >= 2 ? "bg-brand text-white hover:bg-brand-dark" : "pointer-events-none bg-gray-300 text-gray-500"
          }`}
        >
          Compare now
        </Link>
      </div>
    </div>
  );
}
