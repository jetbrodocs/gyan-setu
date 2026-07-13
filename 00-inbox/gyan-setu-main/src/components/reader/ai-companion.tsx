"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Bot, User, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiCompanionProps {
  bookId: string;
  bookTitle: string;
  chapterContent: string;
}

export function AiCompanion({
  bookId,
  bookTitle,
  chapterContent,
}: AiCompanionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm your AI Reading Companion for **${bookTitle}**. Ask me anything about what you're reading — I can explain passages, answer questions, translate text, or provide context.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          bookId,
          chapterContent,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className="flex flex-col border-l border-slate-200 bg-slate-50"
      style={{ width: 360, minWidth: 360 }}
    >
      {/* Header */}
      <div className="h-12 shrink-0 flex items-center gap-2.5 px-4 border-b border-slate-200 bg-white">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <span className="text-sm font-semibold text-navy">
            AI Reading Companion
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center mt-0.5 ${
                msg.role === "assistant"
                  ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                  : "bg-blue-500"
              }`}
            >
              {msg.role === "assistant" ? (
                <Bot className="h-3.5 w-3.5 text-white" />
              ) : (
                <User className="h-3.5 w-3.5 text-white" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[280px] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-tr-sm"
                  : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-sm"
              }`}
            >
              {msg.role === "assistant" ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-slate-800">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-slate-600">{children}</em>
                    ),
                    ul: ({ children }) => (
                      <ul className="ml-3 mb-2 last:mb-0 space-y-1 list-disc marker:text-blue-400">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="ml-3 mb-2 last:mb-0 space-y-1 list-decimal marker:text-blue-400">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="pl-1">{children}</li>
                    ),
                    code: ({ children }) => (
                      <code className="bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
                    ),
                    h1: ({ children }) => (
                      <p className="font-semibold text-slate-800 text-sm mb-1.5">{children}</p>
                    ),
                    h2: ({ children }) => (
                      <p className="font-semibold text-slate-800 text-sm mb-1.5">{children}</p>
                    ),
                    h3: ({ children }) => (
                      <p className="font-semibold text-slate-800 text-sm mb-1.5">{children}</p>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-blue-300 pl-3 italic text-slate-500 mb-2 last:mb-0">{children}</blockquote>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="bg-white shadow-sm border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />
              <span className="text-[13px] text-slate-400">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-slate-200 p-3 bg-white">
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this chapter..."
            className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
            aria-label="Send message"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
