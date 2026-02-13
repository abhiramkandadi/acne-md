import { useState } from "react";
import { Scan } from "lucide-react";
import { motion } from "framer-motion";
import ScannerFlow from "./ScannerFlow";
import DiagnosisCard from "./DiagnosisCard";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "good morning";
  if (h < 18) return "good afternoon";
  return "good evening";
};

type Phase = "idle" | "scanning" | "result";

const HomeScreen = () => {
  const [phase, setPhase] = useState<Phase>("idle");

  if (phase === "scanning") {
    return <ScannerFlow onComplete={() => setPhase("result")} />;
  }

  if (phase === "result") {
    return <DiagnosisCard onRescan={() => setPhase("idle")} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center min-h-[calc(100vh-6rem)] px-6 pt-16"
    >
      {/* Greeting */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-2"
      >
        {getGreeting()}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-3xl font-bold text-center mb-2 leading-tight"
      >
        let's check
        <br />
        <span className="text-glow-green" style={{ color: 'hsl(80, 100%, 50%)' }}>your skin</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-sm text-center max-w-xs mb-10"
      >
        no bs. just science. tap to scan.
      </motion.p>

      {/* Scan Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="relative mb-10"
      >
        <div className="absolute inset-0 rounded-full pulse-ring" style={{
          background: 'radial-gradient(circle, hsl(80, 100%, 50%, 0.15), transparent 70%)',
          transform: 'scale(1.4)',
        }} />
        <motion.button
          onClick={() => setPhase("scanning")}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-40 h-40 rounded-full glass-strong flex items-center justify-center"
          style={{ boxShadow: '0 0 40px hsl(80, 100%, 50%, 0.2), inset 0 0 30px hsl(0, 0%, 100%, 0.03)' }}
        >
          <Scan className="w-12 h-12" style={{ color: 'hsl(80, 100%, 50%)' }} />
        </motion.button>
      </motion.div>

      {/* Manifesto Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ rotateX: -3, rotateY: 5, scale: 1.02 }}
        style={{ perspective: 800, transformStyle: 'preserve-3d' }}
        className="glass p-5 max-w-xs w-full"
      >
        <p className="text-sm leading-relaxed" style={{ fontStyle: 'italic' }}>
          "I built this because I was tired of guessing. No BS, just science. Let's clear this up together. 🖤"
        </p>
        <p className="text-xs text-muted-foreground mt-3">— the founder</p>
      </motion.div>
    </motion.div>
  );
};

export default HomeScreen;
