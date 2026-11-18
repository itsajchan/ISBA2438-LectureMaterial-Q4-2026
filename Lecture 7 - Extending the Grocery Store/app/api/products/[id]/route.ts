import { connection } from "next/server";
import type { ProductInput } from "../../../_data/catalog";
import { prisma, toProduct } from "../../../_lib/prisma";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  await connection();
  const { id } = await ctx.params;
  const row = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!row) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
  return Response.json({ product: toProduct(row) });
}

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  await connection();
  const { id } = await ctx.params;
  const current = await prisma.product.findUnique({ where: { id } });
  if (!current) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  let body: Partial<ProductInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  let categoryId: string | undefined;
  if (body.category) {
    const category = await prisma.category.findUnique({
      where: { name: body.category },
    });
    if (!category) {
      return Response.json({ error: "Unknown category" }, { status: 400 });
    }
    categoryId = category.id;
  }

  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: body.name ?? undefined,
      categoryId,
      unit: body.unit ?? undefined,
      price: typeof body.price === "number" ? body.price : undefined,
      was: typeof body.was === "number" ? body.was : undefined,
      emoji: body.emoji ?? undefined,
      color: body.color ?? undefined,
      badge: body.badge ?? undefined,
    },
    include: { category: true },
  });

  return Response.json({ product: toProduct(updated) });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  await connection();
  const { id } = await ctx.params;
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
  await prisma.product.delete({ where: { id } });
  return Response.json({ deleted: id });
}
