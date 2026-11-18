import { prisma, run } from "./db";

run(async () => {
  const items = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
    include: { category: true },
  });

  if (items.length === 0) {
    console.log("Inventory is empty. Seed it: npm run db:seed");
    return;
  }

  console.table(
    items.map((i) => ({
      id: i.id,
      emoji: i.emoji ?? "",
      name: i.name,
      category: i.category.name,
      unit: i.unit,
      price: Number(i.price),
      quantity: i.quantity,
    }))
  );
  console.log(`${items.length} item(s)`);
});
