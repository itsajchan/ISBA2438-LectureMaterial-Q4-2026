import { connection } from "next/server";
import {
  categories,
  type Product,
  type ProductInput,
} from "../../../_data/catalog";
import {
  findProduct,
  removeProduct,
  replaceProduct,
} from "../../../_lib/productStore";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  await connection();
  const { id } = await ctx.params;
  const product = await findProduct(id);
  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
  return Response.json({ product });
}

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  await connection();
  const { id } = await ctx.params;
  const current = await findProduct(id);
  if (!current) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  let body: Partial<ProductInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (body.category && !categories.some((c) => c.name === body.category)) {
    return Response.json({ error: "Unknown category" }, { status: 400 });
  }

  const updated: Product = {
    ...current,
    name: body.name ?? current.name,
    category: body.category ?? current.category,
    unit: body.unit ?? current.unit,
    price: typeof body.price === "number" ? body.price : current.price,
    was: typeof body.was === "number" ? body.was : current.was,
    emoji: body.emoji ?? current.emoji,
    color: body.color ?? current.color,
    badge: body.badge ?? current.badge,
  };
  await replaceProduct(updated);

  return Response.json({ product: updated });
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/products/[id]">
) {
  await connection();
  const { id } = await ctx.params;
  if (!(await removeProduct(id))) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }
  return Response.json({ deleted: id });
}
