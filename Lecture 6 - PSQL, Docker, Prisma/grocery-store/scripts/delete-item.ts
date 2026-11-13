import { prisma, run } from "./db";

const id = process.argv[2];

if (!id) {
  console.log("Usage: npm run item:delete -- <id>");
  console.log("Find ids with: npm run item:list");
  process.exit(1);
}

run(async () => {
  const item = await prisma.product.delete({ where: { id } });
  console.log(`Deleted: ${item.emoji ?? "•"} ${item.name}`);
});
