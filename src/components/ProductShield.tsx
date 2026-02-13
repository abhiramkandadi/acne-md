import { useState, useEffect, useCallback } from "react";
import { Shield, AlertTriangle, CheckCircle, ScanLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

type ScanState = "idle" | "scanning" | "unsafe" | "safe";

const funTexts = ["reading the label...", "checking ingredients...", "cross-referencing...", "almost done..."];

const unsafeProduct = {
  name: "Glow Radiance Night Cream",
  cloggers: [
    { name: "Isopropyl Myristate", risk: "5/5", note: "major pore clogger" },
    { name: "Coconut Oil", risk: "4/5", note: "sounds nice, clogs pores" },
    { name: "Acetylated Lanolin", risk: "3/5", note: "sneaky comedogenic" },
  ],
};

const safeProduct = {
  name: "CeraVe Moisturizing Lotion",
  ingredients: ["Ceramides", "Hyaluronic Acid", "Niacinamide"],
};

const ProductShield = () => {
  const [state, setState] = useState<ScanState>("idle");
  const [showSafe, setShowSafe] = useState(false);
  const [textIdx, setTextIdx] = useState(0);

  const fireSafeConfetti = useCallback(() => {
    const emojis = ['✨', '🌿', '💧'];
    emojis.forEach((_, i) => {
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.6, x: 0.5 },
          colors: ['#CCFF00', '#2E8B57', '#87CEEB'],
          ticks: 80,
          gravity: 0.8,
          scalar: 1.2,
        });
      }, i * 200);
    });
  }, []);

  useEffect(() => {
    if (state !== "scanning") return;
    const interval = setInterval(() => {
      setTextIdx((i) => (i + 1) % funTexts.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  const handleScan = () => {
    setState("scanning");
    setTextIdx(0);
    setTimeout(() => {
      const result = showSafe ? "safe" : "unsafe";
      setState(result);
      if (result === "safe") {
        setTimeout(fireSafeConfetti, 300);
      }
    }, 3000);
  };

  const reset = () => setState("idle");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-6rem)] px-5 py-8 flex flex-col"
    >
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6"
      >
        <h1 className="font-display text-xl font-bold flex items-center gap-2">
          <Shield className="w-5 h-5" style={{ color: 'hsl(80, 100%, 50%)' }} /> the clog-test
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          is your product secretly breaking you out?
        </p>
      </motion.div>

      {state === "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-6"
        >
          {/* Toggle */}
          <div className="glass px-2 py-1.5 flex items-center gap-1" style={{ borderRadius: '9999px' }}>
            <button
              onClick={() => setShowSafe(false)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                !showSafe ? "text-primary-foreground" : "text-muted-foreground"
              )}
              style={!showSafe ? { background: 'hsl(340, 100%, 60%)', boxShadow: '0 0 15px hsl(340, 100%, 60%, 0.3)' } : {}}
            >
              unsafe demo
            </button>
            <button
              onClick={() => setShowSafe(true)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300",
                showSafe ? "text-primary-foreground" : "text-muted-foreground"
              )}
              style={showSafe ? { background: 'hsl(80, 100%, 50%)', boxShadow: '0 0 15px hsl(80, 100%, 50%, 0.3)' } : {}}
            >
              safe demo
            </button>
          </div>

          <motion.button
            onClick={handleScan}
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            className="w-36 h-36 rounded-4xl glass-strong flex flex-col items-center justify-center gap-3 transition-all"
          >
            <ScanLine className="w-10 h-10 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">scan product</span>
          </motion.button>

          <p className="text-xs text-muted-foreground text-center max-w-xs">
            point at the ingredient list. we'll tell you if it's friend or foe.
          </p>
        </motion.div>
      )}

      {state === "scanning" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 rounded-3xl glass-strong flex items-center justify-center"
          >
            <ScanLine className="w-10 h-10 text-muted-foreground" />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p
              key={textIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-sm font-display font-medium"
              style={{ color: 'hsl(80, 100%, 50%)' }}
            >
              {funTexts[textIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      )}

      {state === "unsafe" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col gap-4"
        >
          {/* Big unsafe result */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="rounded-4xl p-6 text-center glow-pink"
            style={{
              background: 'linear-gradient(135deg, hsl(340, 60%, 15%), hsl(340, 40%, 10%))',
              border: '1px solid hsl(340, 100%, 60%, 0.3)',
            }}
          >
            <AlertTriangle className="w-8 h-8 mx-auto mb-3" style={{ color: 'hsl(340, 100%, 70%)' }} />
            <h2 className="font-display text-2xl font-bold mb-1" style={{ color: 'hsl(340, 100%, 70%)' }}>
              UNSAFE
            </h2>
            <p className="text-sm text-muted-foreground">{unsafeProduct.name}</p>
          </motion.div>

          <p className="font-display text-xs font-semibold tracking-widest uppercase text-muted-foreground">pore-clogging ingredients found</p>

          {unsafeProduct.cloggers.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="glass p-4"
              style={{ borderColor: 'hsl(340, 100%, 60%, 0.15)' }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium" style={{ color: 'hsl(340, 100%, 70%)' }}>{c.name}</p>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold" style={{
                  background: 'hsl(340, 100%, 60%, 0.15)',
                  color: 'hsl(340, 100%, 70%)',
                }}>
                  {c.risk}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{c.note}</p>
            </motion.div>
          ))}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="mt-auto mb-4 py-3.5 rounded-full glass text-sm font-medium"
          >
            scan another
          </motion.button>
        </motion.div>
      )}

      {state === "safe" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col gap-4"
        >
          {/* Big safe result */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="rounded-4xl p-6 text-center glow-green"
            style={{
              background: 'linear-gradient(135deg, hsl(80, 40%, 10%), hsl(120, 30%, 8%))',
              border: '1px solid hsl(80, 100%, 50%, 0.3)',
            }}
          >
            <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: 'hsl(80, 100%, 50%)' }} />
            <h2 className="font-display text-2xl font-bold mb-1" style={{ color: 'hsl(80, 100%, 50%)' }}>
              SAFE ✨
            </h2>
            <p className="text-sm text-muted-foreground">{safeProduct.name}</p>
          </motion.div>

          <div className="glass p-5">
            <p className="text-xs text-muted-foreground mb-3 font-medium">the good stuff inside:</p>
            <div className="flex flex-wrap gap-2">
              {safeProduct.ingredients.map((i) => (
                <span key={i} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{
                  background: 'hsl(80, 100%, 50%, 0.1)',
                  color: 'hsl(80, 100%, 50%)',
                  border: '1px solid hsl(80, 100%, 50%, 0.2)',
                }}>
                  {i}
                </span>
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="mt-auto mb-4 py-3.5 rounded-full glass text-sm font-medium"
          >
            scan another
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductShield;
