import { connection } from "next/server";
import {
  categories,
  type Product,
  type ProductInput,
} from "../../_data/catalog";
import { addProduct, getProducts } from "../../_lib/productStore";

export async function GET() {
  await connection();
  const products = await getProducts();
  return Response.json({ products });
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
  if (!categories.some((c) => c.name === body.category)) {
    return Response.json({ error: "Unknown category" }, { status: 400 });
  }

  const product: Product = {
    id: crypto.randomUUID(),
    name: body.name,
    category: body.category,
    unit: body.unit || "each",
    price: body.price,
    was: body.was ?? body.price,
    emoji: body.emoji || "🛒",
    color: body.color || "bg-stone-100",
    badge: body.badge || "New",
  };
  await addProduct(product);

  return Response.json({ product }, { status: 201 });
}
