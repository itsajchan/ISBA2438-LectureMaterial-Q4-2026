import { Agent, tool, setDefaultOpenAIClient, setOpenAIAPI } from "@openai/agents";
import OpenAI from "openai";
import { z } from "zod";
import { searchProducts } from "./search";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

setOpenAIAPI("chat_completions");
setDefaultOpenAIClient(client);

const searchProductsTool = tool({
  name: "search_products",
  description:
    "Search the A&A Market product catalog by keyword. Returns matching products with name, category, unit, price, and any sale price.",
  parameters: z.object({
    query: z
      .string()
      .describe("Keyword to search for, e.g. 'apples' or 'milk'"),
  }),
  execute: async ({ query }) => {
    const products = await searchProducts(query);
    if (products.length === 0) {
      return "No products found matching that search.";
    }
    return products
      .map(
        (p) =>
          `${p.emoji} ${p.name} (${p.category}, ${p.unit}): $${p.price.toFixed(2)}${
            p.was > p.price ? `, on sale from $${p.was.toFixed(2)}` : ""
          }`
      )
      .join("\n");
  },
});

export const groceryAgent = new Agent({
  name: "A&A Market Assistant",
  model: "viber-1",
  instructions: `You are the shopping assistant for A&A Market, a neighborhood grocery store.

Answer style:
- Keep answers short and concise. No filler, no chit-chat.
- Never make anything up. Only state information you have actually retrieved.
- To answer anything about products, prices, availability, or deals, always call the search_products tool first and only report what it returned. If the search returns nothing, say you couldn't find it.
- Do not use markdown. Reply in plain text only, and you may use emojis.
- Do not guess or estimate prices, stock, or deals.`,
  tools: [searchProductsTool],
});
