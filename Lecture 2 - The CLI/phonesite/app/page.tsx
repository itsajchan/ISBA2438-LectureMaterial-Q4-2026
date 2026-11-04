import Link from "next/link";
import { phones, brands } from "@/data/phones";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-2xl font-black text-ink">
        <span className="inline-block h-6 w-2 rounded bg-brand" />
        {title}
      </h2>
      {href && (
        <Link href={href} className="text-sm font-extrabold text-brand hover:underline">
          View all →
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const deals = phones.filter((p) => p.onSale);
  const featured = [...phones].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="space-y-10">
      <BannerCarousel />

      <section>
        <SectionHeader title="Shop by Brand" href="/products" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {brands.map((b) => (
            <Link
              key={b}
              href={`/products?brand=${encodeURIComponent(b)}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-xl font-black text-white">
                {b.charAt(0)}
              </span>
              <span className="text-sm font-bold">{b}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Deals of the Week" href="/products?deals=1" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} phone={p} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Top Rated Phones" href="/products?sort=rating" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} phone={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
