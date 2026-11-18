import { run, type AgentInputItem } from "@openai/agents";
import { prisma } from "../../_lib/prisma";
import { groceryAgent } from "../../_lib/agent";

export async function GET(request: Request) {
  const conversationId = new URL(request.url).searchParams.get(
    "conversationId"
  );
  if (!conversationId) {
    return Response.json(
      { error: "conversationId is required" },
      { status: 400 }
    );
  }

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
  return Response.json({ messages });
}

export async function POST(request: Request) {
  let body: { conversationId?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return Response.json({ error: "message is required" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not set on the server." },
      { status: 503 }
    );
  }

  let conversationId = body.conversationId;
  if (conversationId) {
    const existing = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!existing) {
      return Response.json({ error: "Conversation not found" }, { status: 404 });
    }
  } else {
    const created = await prisma.conversation.create({
      data: { title: message.slice(0, 60) },
    });
    conversationId = created.id;
  }

  const history = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });

  const input: AgentInputItem[] = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) =>
      m.role === "user"
        ? { role: "user", content: m.content }
        : {
            role: "assistant",
            status: "completed",
            content: [{ type: "output_text", text: m.content }],
          }
    );
  input.push({ role: "user", content: message });

  await prisma.message.create({
    data: { conversationId, role: "user", content: message },
  });

  try {
    const result = await run(groceryAgent, input);
    const reply = result.finalOutput ?? "";
    await prisma.message.create({
      data: {
        conversationId,
        role: "assistant",
        content: reply,
        metadata: { model: String(groceryAgent.model) },
      },
    });
    return Response.json({ conversationId, reply });
  } catch (err) {
    console.error("Agent run failed:", err);
    return Response.json(
      { error: "The assistant is unavailable right now." },
      { status: 500 }
    );
  }
}
