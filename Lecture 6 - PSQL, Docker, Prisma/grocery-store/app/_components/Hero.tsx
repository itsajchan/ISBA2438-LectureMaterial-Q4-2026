"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    tag: "This Week Only",
    title: "Weekly Fresh Savings",
    body: "Save up to 30% on farm-fresh produce, hand-picked every morning.",
    cta: "Shop the Weekly Ad",
    href: "#deals",
    background: "from-red-600 via-red-500 to-orange-400",
    emoji: "🍎🥬🍇",
  },
  {
    tag: "Now Open",
    title: "A&A Market Downtown",
    body: "Celebrate our grand opening — free tote bag for the first 200 customers!",
    cta: "Find a Store",
    href: "#locations",
    background: "from-emerald-700 via-emerald-600 to-lime-500",
    emoji: "🎉🛍️🥕",
  },
  {
    tag: "Join Free",
    title: "A&A Rewards",
    body: "Earn 1 point for every $1 spent. Redeem points for grocery discounts.",
    cta: "Start Earning",
    href: "#services",
    background: "from-amber-500 via-amber-400 to-yellow-300",
    emoji: "⭐🥩🥛",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6" aria-label="Promotions">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${slide.background} px-6 py-12 text-white sm:px-12 sm:py-20`}
      >
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {slide.tag}
          </p>
          <h1 className="text-3xl font-extrabold sm:text-5xl">{slide.title}</h1>
          <p className="mt-3 text-base text-white/90 sm:text-lg">
            {slide.body}
          </p>
          <a
            href={slide.href}
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-stone-900 shadow transition hover:bg-gold"
          >
            {slide.cta}
          </a>
        </div>
        <div
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-7xl sm:right-16 sm:text-9xl"
          aria-hidden
        >
          {slide.emoji}
        </div>
        <button
          type="button"
          onClick={() =>
            setCurrent((c) => (c - 1 + slides.length) % slides.length)
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/25 p-2 text-xl hover:bg-white/40"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/25 p-2 text-xl hover:bg-white/40"
          aria-label="Next slide"
        >
          ›
        </button>
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
