import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "assistant" | "user";
  text: string;
}

const mockResponses: Record<string, string> = {
  default:
    "great question! based on your last skin check, you've got some inflammation going on. i'd recommend keeping your routine gentle and non-comedogenic. want me to break down a morning or night routine? 💫",
  retinoid:
    "retinoids are literally the GOAT for acne. start with adapalene 0.1%, every other night. your skin might purge for a few weeks — that's normal. always, always use SPF the next morning ☀️",
  diet:
    "ok so — diet alone won't cause acne, but high-glycemic foods and dairy have been linked to more breakouts in some people. try cutting processed sugar for 4-6 weeks and see how your skin vibes 🥑",
  stress:
    "stress = cortisol = more sebum = more breakouts. it's a whole cycle. sleep, movement, and honestly just chilling can make a real difference. your skin reflects your peace ✌️",
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
      text: "hey! i'm Dr. AI, your skin bestie 🧬 i've peeped your last scan — looks like some active inflammation. what's on your mind?",
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
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-5 py-4 glass-strong mx-4 mt-4"
        style={{ borderRadius: '1.5rem' }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: 'hsl(80, 100%, 50%)' }} />
          <h1 className="font-display text-lg font-bold">Dr. AI</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">your skin consultant • always on</p>
      </motion.div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "max-w-[85%] px-4 py-3 text-sm leading-relaxed",
                msg.role === "assistant"
                  ? "glass rounded-3xl rounded-bl-lg"
                  : "ml-auto rounded-3xl rounded-br-lg"
              )}
              style={msg.role === "user" ? {
                background: 'linear-gradient(135deg, hsl(271, 50%, 25%), hsl(271, 40%, 18%))',
                border: '1px solid hsl(271, 76%, 53%, 0.2)',
              } : {}}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl rounded-bl-lg px-4 py-3 max-w-[85%]"
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'hsl(80, 100%, 50%)' }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3">
        <div className="glass-strong flex items-center gap-2 px-4 py-2.5" style={{ borderRadius: '9999px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="ask about your skin..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <motion.button
            onClick={send}
            disabled={!input.trim()}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full disabled:opacity-30 transition-all"
            style={input.trim() ? { background: 'hsl(80, 100%, 50%)', color: 'hsl(0, 0%, 7%)' } : {}}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DrAIChat;
