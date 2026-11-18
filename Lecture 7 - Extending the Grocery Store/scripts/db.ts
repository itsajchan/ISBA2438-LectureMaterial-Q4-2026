import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Copy .env.example to .env first.");
  process.exit(1);
}

export const prisma = new PrismaClient({
  adapter: new PrismaPg(url),
});

export async function run(fn: () => Promise<void>) {
  try {
    await fn();
  } catch (e: any) {
    if (e?.code === "P2025") {
      console.error(`Record not found. Check ids with: npm run item:list`);
    } else {
      console.error(`Error: ${e.message ?? e}`);
    }
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}
