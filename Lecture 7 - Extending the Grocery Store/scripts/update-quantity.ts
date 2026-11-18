import { prisma, run } from "./db";

const [id, qty] = process.argv.slice(2);
const quantity = Number(qty);

if (!id || qty === undefined || !Number.isInteger(quantity) || quantity < 0) {
  console.log("Usage: npm run item:update-qty -- <id> <newQuantity>");
  console.log('Example: npm run item:update-qty -- 91766004-4b00-4114-b33f-8a003d0c5a5f 42');
  process.exit(1);
}

run(async () => {
  const item = await prisma.product.update({
    where: { id },
    data: { quantity },
  });
  console.log(`Updated ${item.emoji ?? "•"} ${item.name}: quantity is now ${item.quantity}`);
});
