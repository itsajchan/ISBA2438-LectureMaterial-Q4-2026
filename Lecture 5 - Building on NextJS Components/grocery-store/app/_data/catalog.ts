export type Category = {
  name: string;
  emoji: string;
  color: string;
};

export const categories: Category[] = [
  { name: "Fresh Produce", emoji: "🥬", color: "bg-green-100" },
  { name: "Meat & Poultry", emoji: "🥩", color: "bg-red-100" },
  { name: "Seafood", emoji: "🦞", color: "bg-sky-100" },
  { name: "Bakery", emoji: "🥐", color: "bg-amber-100" },
  { name: "Dairy & Eggs", emoji: "🧀", color: "bg-yellow-100" },
  { name: "Frozen Foods", emoji: "🧊", color: "bg-cyan-100" },
  { name: "Pantry Staples", emoji: "🍚", color: "bg-orange-100" },
  { name: "Snacks & Sweets", emoji: "🍩", color: "bg-pink-100" },
  { name: "Beverages", emoji: "🧋", color: "bg-purple-100" },
  { name: "Household", emoji: "🧻", color: "bg-stone-100" },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  was: number;
  emoji: string;
  color: string;
  badge: string;
};

export type ProductInput = {
  name: string;
  category: string;
  unit: string;
  price: number;
  was?: number;
  emoji?: string;
  color?: string;
  badge?: string;
};

export const colorOptions = [
  { label: "Red", value: "bg-red-100" },
  { label: "Rose", value: "bg-rose-100" },
  { label: "Sky", value: "bg-sky-100" },
  { label: "Amber", value: "bg-amber-100" },
  { label: "Slate", value: "bg-slate-100" },
  { label: "Orange", value: "bg-orange-100" },
  { label: "Cyan", value: "bg-cyan-100" },
  { label: "Lime", value: "bg-lime-100" },
];

export const emojiOptions = [
  "🍓",
  "🍎",
  "🥑",
  "🥬",
  "🥕",
  "🍇",
  "🥩",
  "🐟",
  "🦐",
  "🥖",
  "🥐",
  "🥛",
  "🧀",
  "🍩",
  "🧋",
  "🧊",
  "🍚",
];
