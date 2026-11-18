import { readFileSync } from "node:fs";
import { categories } from "../app/_data/catalog";
import { prisma, run } from "./db";

run(async () => {
  const products = JSON.parse(
    readFileSync(new URL("../data/products.json", import.meta.url), "utf8")
  );

  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (const c of categories) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: { emoji: c.emoji, color: c.color },
      create: { name: c.name, emoji: c.emoji, color: c.color },
    });
  }

  const data = await Promise.all(
    products.map(async (p: any) => ({
      name: p.name,
      categoryId: (
        await prisma.category.findUniqueOrThrow({ where: { name: p.category } })
      ).id,
      unit: p.unit,
      price: p.price,
      was: p.was,
      emoji: p.emoji,
      color: p.color,
      badge: p.badge,
      quantity: 20,
    }))
  );
  await prisma.product.createMany({ data });

  console.log(
    `Seeded ${categories.length} categories and ${products.length} product(s)`
  );
});
