"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: string;
  content: string;
};

const STORAGE_KEY = "aa-conversation-id";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    fetch(`/api/chat?conversationId=${saved}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.messages?.length) {
          setMessages(data.messages);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const message = input.trim();
    if (!message || loading) return;

    setInput("");
    setError(null);
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: localStorage.getItem(STORAGE_KEY) ?? undefined,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        localStorage.setItem(STORAGE_KEY, data.conversationId);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setError("Could not reach the assistant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with A&A assistant"}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand text-2xl text-white shadow-lg transition hover:bg-brand-dark"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">
          <div className="flex items-center gap-2 bg-brand px-4 py-3 text-white">
            <span className="text-lg">🤖</span>
            <div>
              <p className="text-sm font-bold">A&A Assistant</p>
              <p className="text-xs text-white/80">
                Ask about products and deals
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-stone-50 px-4 py-4">
            {messages.length === 0 && !loading && (
              <p className="mt-8 text-center text-sm text-stone-400">
                Hi! Ask me anything about A&A Market.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-brand text-white"
                    : "bg-white text-stone-800 shadow-sm"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-2xl bg-white px-3 py-2 text-sm text-stone-400 shadow-sm">
                Typing…
              </div>
            )}
            {error && (
              <p className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-brand-dark">
                {error}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={send}
            className="flex items-stretch gap-2 border-t border-stone-200 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              aria-label="Chat message"
              className="w-full rounded-full border border-stone-300 px-4 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-dark disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
