import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "assistant" | "user";
  text: string;
}

const mockResponses: Record<string, string> = {
  default:
    "That's a great question. Based on your recent scan showing Grade II inflammatory acne, I'd recommend focusing on a gentle, non-comedogenic routine. Would you like me to break down a morning or evening protocol?",
  retinoid:
    "Retinoids (like adapalene 0.1%) are excellent for inflammatory acne. They promote cell turnover and prevent clogged pores. Start every other night to minimize irritation, and always pair with SPF 30+ in the morning.",
  diet:
    "While diet alone doesn't cause acne, high-glycemic foods and dairy have been associated with increased breakouts in some studies. Consider reducing processed sugars and monitoring your skin's response over 4-6 weeks.",
  stress:
    "Cortisol from chronic stress increases sebum production, which can worsen acne. Techniques like sleep hygiene, exercise, and mindfulness have shown measurable improvements in skin health.",
};

const findResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("retinoid") || lower.includes("retinol") || lower.includes("tretinoin")) return mockResponses.retinoid;
  if (lower.includes("diet") || lower.includes("food") || lower.includes("eat")) return mockResponses.diet;
  if (lower.includes("stress") || lower.includes("anxiety") || lower.includes("sleep")) return mockResponses.stress;
  return mockResponses.default;
};

const DrAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hello. I'm Dr. AI, your skin health consultant. I've reviewed your latest scan — Grade II papulopustular acne with moderate inflammation. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    const q = input;
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: findResponse(q) }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <h1 className="text-lg font-semibold">Dr. AI</h1>
        <p className="text-xs text-muted-foreground">Skin health consultant • AI-powered</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
              msg.role === "assistant"
                ? "bg-secondary text-foreground rounded-bl-sm"
                : "bg-safe/15 text-foreground ml-auto rounded-br-sm"
            )}
          >
            {msg.text}
          </div>
        ))}
        {typing && (
          <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about your skin..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrAIChat;
