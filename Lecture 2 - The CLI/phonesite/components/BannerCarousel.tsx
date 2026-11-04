"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    title: "MEGA PHONE SALE",
    subtitle: "Up to 40% OFF flagship phones — this week only!",
    cta: "Shop deals",
    href: "/products?deals=1",
    bg: "from-brand to-pine",
    accent: "text-gold",
  },
  {
    title: "NEW ARRIVALS",
    subtitle: "Meet the Galaxy S26 Ultra, iPhone 18 Pro Max & Pixel 10 Pro XL.",
    cta: "Shop new phones",
    href: "/products?sort=newest",
    bg: "from-gold to-yellow-500",
    accent: "text-ink",
  },
  {
    title: "BUNDLE & SAVE",
    subtitle: "Extra 10% off with promo code SAVE10 at cart.",
    cta: "Browse all phones",
    href: "/products",
    bg: "from-pine to-brand-dark",
    accent: "text-gold",
  },
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md">
      <div
        className={`flex bg-gradient-to-r ${slide.bg} transition-all duration-500`}
        key={index}
      >
        <div className="flex w-full flex-col items-start gap-3 px-8 py-12 sm:px-14 sm:py-16">
          <span className={`rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-widest ${slide.accent}`}>
            PhoneMart Weekly Special
          </span>
          <h2 className={`text-4xl font-black leading-tight sm:text-6xl ${slide.accent}`}>{slide.title}</h2>
          <p className="max-w-xl text-lg font-semibold text-white/90">{slide.subtitle}</p>
          <Link
            href={slide.href}
            className={`mt-2 rounded-full px-6 py-3 text-sm font-extrabold shadow transition hover:scale-105 ${
              index === 1 ? "bg-pine text-white" : "bg-white text-brand-dark"
            }`}
          >
            {slide.cta} →
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
