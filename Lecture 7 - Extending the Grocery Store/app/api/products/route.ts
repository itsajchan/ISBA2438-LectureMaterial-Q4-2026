import { connection } from "next/server";
import type { ProductInput } from "../../_data/catalog";
import { prisma, toProduct } from "../../_lib/prisma";

export async function GET() {
  await connection();
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return Response.json({ products: rows.map(toProduct) });
}

export async function POST(request: Request) {
  let body: ProductInput;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.name || typeof body.price !== "number") {
    return Response.json(
      { error: "name and price are required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.findUnique({
    where: { name: body.category },
  });
  if (!category) {
    return Response.json({ error: "Unknown category" }, { status: 400 });
  }

  const created = await prisma.product.create({
    data: {
      name: body.name,
      categoryId: category.id,
      unit: body.unit || "each",
      price: body.price,
      was: body.was ?? body.price,
      emoji: body.emoji || "🛒",
      color: body.color || "bg-stone-100",
      badge: body.badge || "New",
    },
    include: { category: true },
  });

  return Response.json({ product: toProduct(created) }, { status: 201 });
}
