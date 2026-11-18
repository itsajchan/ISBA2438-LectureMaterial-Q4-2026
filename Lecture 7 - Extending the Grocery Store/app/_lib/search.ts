import { prisma, toProduct } from "./prisma";

export async function searchProducts(query: string, limit = 10) {
  const q = query.trim();
  if (!q) return [];
  const rows = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { category: { name: { contains: q, mode: "insensitive" } } },
      ],
    },
    include: { category: true },
    orderBy: { name: "asc" },
    take: limit,
  });
  return rows.map(toProduct);
}
