import { connection } from "next/server";
import { searchProducts } from "../../_lib/search";

export async function GET(request: Request) {
  await connection();
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const products = await searchProducts(q);
  return Response.json({ query: q, count: products.length, products });
}
