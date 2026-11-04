import type { Phone, Review } from "@/lib/types";
import { hashString } from "./format";
import { readJSON, writeJSON } from "./storage";

const NAMES = ["Jamie L.", "Priya S.", "Marcus T.", "Elena R.", "David K.", "Aisha M.", "Tom H.", "Grace W.", "Leo P.", "Nina V.", "Chris B.", "Sofia D."];

const POSITIVE = [
  "Absolutely love this phone. Battery easily lasts all day and the camera is stunning.",
  "Upgraded from a three-year-old model and the difference is night and day.",
  "Fast, smooth, and the display is gorgeous. Zero regrets.",
  "Best phone I have owned. Setup was painless and it flies through everything.",
];
const MIXED = [
  "Great performance overall, though it took a day to get used to the size.",
  "Solid phone for the price. Camera is good but not mind-blowing.",
  "Battery life is excellent. Wished it came with a charger in the box.",
];
const CRITICAL = [
  "Decent, but for this money I expected better battery life.",
  "It works fine, just not a huge upgrade over last year's model.",
];

const REVIEWS_KEY = "reviews";

export function seededReviews(phone: Phone): Review[] {
  const h = hashString(phone.id);
  const count = 2 + (h % 3);
  const out: Review[] = [];
  for (let i = 0; i < count; i++) {
    const roll = (h + i * 7) % 10;
    const band = roll < 7 ? POSITIVE : roll < 9 ? MIXED : CRITICAL;
    const day = 1 + ((h + i * 13) % 28);
    const month = 1 + ((h + i * 5) % 12);
    const year = phone.releaseYear - 1 + ((h + i) % 2);
    const y = Math.min(year, 2026);
    out.push({
      name: NAMES[(h + i * 3) % NAMES.length],
      rating: Math.min(5, Math.max(3, Math.round(phone.rating - 1 + roll * 0.25))),
      text: band[(h + i) % band.length],
      date: new Date(Date.UTC(y, month, day)).toISOString(),
    });
  }
  return out;
}

export function getUserReviews(phoneId: string): Review[] {
  return readJSON<Record<string, Review[]>>(REVIEWS_KEY, {})[phoneId] ?? [];
}

export function addReview(phoneId: string, review: Review): Review[] {
  const all = readJSON<Record<string, Review[]>>(REVIEWS_KEY, {});
  const list = all[phoneId] ?? [];
  list.push(review);
  all[phoneId] = list;
  writeJSON(REVIEWS_KEY, all);
  return list;
}

export function mergedReviews(phone: Phone): Review[] {
  return [...seededReviews(phone), ...getUserReviews(phone.id)];
}

export function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
