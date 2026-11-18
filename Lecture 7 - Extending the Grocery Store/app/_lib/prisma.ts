import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import type { Prisma } from "../generated/prisma/client";
import type { Product } from "../_data/catalog";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env first."
  );
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaPg(url) });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type ProductRow = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category.name,
    unit: row.unit,
    price: Number(row.price),
    was: Number(row.was ?? row.price),
    emoji: row.emoji ?? "🛒",
    color: row.color ?? "bg-stone-100",
    badge: row.badge ?? "New",
  };
}
