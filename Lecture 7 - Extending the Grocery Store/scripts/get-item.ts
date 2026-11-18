import { prisma, run } from "./db";

const idOrName = process.argv[2];

if (!idOrName) {
  console.log("Usage: npm run item:get -- <id | name>");
  process.exit(1);
}

run(async () => {
  const item =
    (await prisma.product.findUnique({ where: { id: idOrName }, include: { category: true } })) ??
    (await prisma.product.findFirst({ where: { name: idOrName }, include: { category: true } }));

  if (!item) {
    console.log(`No item found for "${idOrName}". Try: npm run item:list`);
    return;
  }

  console.log(`${item.emoji ?? "•"} ${item.name}`);
  console.log(`  id:       ${item.id}`);
  console.log(`  category: ${item.category.name} (${item.category.emoji})`);
  console.log(`  unit:     ${item.unit}`);
  console.log(`  price:    $${item.price}${item.was ? ` (was $${item.was})` : ""}`);
  console.log(`  quantity: ${item.quantity}`);
});
