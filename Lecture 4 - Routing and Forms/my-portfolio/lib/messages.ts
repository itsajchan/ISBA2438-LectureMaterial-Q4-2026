import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type Message = {
  name: string;
  message: string;
  at: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "messages.json");

export async function readMessages(): Promise<Message[]> {
  try {
    const raw = await readFile(dataFile, "utf8");
    return JSON.parse(raw) as Message[];
  } catch {
    return [];
  }
}

export async function addMessage(name: string, message: string): Promise<void> {
  const messages = await readMessages();
  messages.push({ name, message, at: new Date().toISOString() });
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(messages, null, 2));
}
