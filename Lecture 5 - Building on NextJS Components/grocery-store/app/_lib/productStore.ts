import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Product } from "../_data/catalog";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "products.json");

async function readProducts(): Promise<Product[]> {
  try {
    const contents = await readFile(dataFile, "utf8");
    return JSON.parse(contents) as Product[];
  } catch {
    return [];
  }
}

async function writeProducts(products: Product[]): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(products, null, 2), "utf8");
}

export async function getProducts(): Promise<Product[]> {
  return readProducts();
}

export async function addProduct(product: Product): Promise<void> {
  const products = await readProducts();
  await writeProducts([product, ...products]);
}

export async function findProduct(id: string): Promise<Product | undefined> {
  const products = await readProducts();
  return products.find((p) => p.id === id);
}

export async function replaceProduct(updated: Product): Promise<void> {
  const products = await readProducts();
  await writeProducts(
    products.map((p) => (p.id === updated.id ? updated : p))
  );
}

export async function removeProduct(id: string): Promise<boolean> {
  const products = await readProducts();
  const exists = products.some((p) => p.id === id);
  if (exists) {
    await writeProducts(products.filter((p) => p.id !== id));
  }
  return exists;
}
