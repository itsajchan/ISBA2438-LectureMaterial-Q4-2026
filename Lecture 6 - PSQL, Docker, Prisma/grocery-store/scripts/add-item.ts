import { prisma, run } from "./db";

const [name, category, unit, price, quantity = "0", emoji] = process.argv.slice(2);

if (!name || !category || !unit || !price) {
  console.log("Usage: npm run item:add -- <name> <category> <unit> <price> [quantity] [emoji]");
  console.log('Example: npm run item:add -- "Soy Milk" Beverages "1 Cup" 2.59 20 🥛');
  process.exit(1);
}

run(async () => {
  const cat = await prisma.category.findUnique({ where: { name: category } });
  if (!cat) {
    const all = await prisma.category.findMany({ orderBy: { name: "asc" } });
    console.log(`Unknown category "${category}". Valid categories:`);
    for (const c of all) console.log(`  - ${c.name}`);
    process.exitCode = 1;
    return;
  }

  const item = await prisma.product.create({
    data: {
      name,
      categoryId: cat.id,
      unit,
      price: Number(price),
      quantity: Number(quantity),
      emoji: emoji ?? null,
    },
  });
  console.log(`Added: ${item.emoji ?? "•"} ${item.name} (${cat.name}) — $${item.price}, qty ${item.quantity}`);
});
