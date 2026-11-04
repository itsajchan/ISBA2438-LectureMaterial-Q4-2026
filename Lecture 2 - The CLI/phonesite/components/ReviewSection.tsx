"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Phone, Review } from "@/lib/types";
import { addReview, getUserReviews, seededReviews, averageRating } from "@/lib/reviews";
import { formatDate } from "@/lib/format";
import RatingStars from "@/components/RatingStars";

export default function ReviewSection({ phone }: { phone: Phone }) {
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setUserReviews(getUserReviews(phone.id));
  }, [phone.id]);

  const all = [...seededReviews(phone), ...userReviews];
  const avg = averageRating(all);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError("Please fill in your name and review.");
      return;
    }
    const list = addReview(phone.id, { name: name.trim(), rating, text: text.trim(), date: new Date().toISOString() });
    setUserReviews(list);
    setName("");
    setRating(5);
    setText("");
    setError("");
    setSubmitted(true);
  };

  return (
    <section id="reviews" className="scroll-mt-32">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-black">
        <span className="inline-block h-6 w-2 rounded bg-brand" />
        Customer Reviews ({all.length})
      </h2>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-center">
            <p className="text-5xl font-black text-brand">{avg > 0 ? avg.toFixed(1) : "–"}</p>
            <div className="mt-2 flex justify-center">
              <RatingStars rating={avg} size="md" />
            </div>
            <p className="mt-2 text-sm text-gray-500">Based on {all.length} reviews</p>
          </div>
          {submitted && (
            <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              ✓ Thanks! Your review was posted.
            </p>
          )}
          <form onSubmit={submit} className="space-y-3 rounded-xl border border-gray-200 bg-white p-5">
            <p className="font-extrabold">Write a review</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="input-field"
              aria-label="Your name"
            />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  aria-label={`Rate ${i} stars`}
                  className={`text-2xl leading-none transition ${i <= rating ? "text-gold" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 text-sm font-bold">{rating}/5</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="How is the phone?"
              rows={3}
              className="input-field resize-none"
              aria-label="Your review"
            />
            {error && <p className="text-sm font-bold text-brand">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-4 py-2.5 text-sm font-extrabold text-white hover:bg-brand-dark"
            >
              Post review
            </button>
          </form>
        </div>

        <div className="space-y-3 lg:col-span-2">
          {all
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((r, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-black text-white">
                      {r.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-sm font-bold">{r.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(r.date)}</span>
                </div>
                <div className="mt-2">
                  <RatingStars rating={r.rating} />
                </div>
                <p className="mt-2 text-sm text-gray-700">{r.text}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
