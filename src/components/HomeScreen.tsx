import { useState } from "react";
import { Scan, Zap, Eye, ShieldCheck, Flame } from "lucide-react";
import { motion } from "framer-motion";
import ScannerFlow from "./ScannerFlow";
import DiagnosisCard from "./DiagnosisCard";
import StreakCounter from "./StreakCounter";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "good morning";
  if (h < 18) return "good afternoon";
  return "good evening";
};

type Phase = "idle" | "scanning" | "result";

const howItWorks = [
  { icon: Eye, title: "Capture", desc: "Our camera module captures your skin in high detail." },
  { icon: Zap, title: "Analyze", desc: "YOLOv8 AI detects acne types & severity in real-time." },
  { icon: ShieldCheck, title: "Act", desc: "Get a personalized protocol backed by dermatology science." },
];

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
      className="flex flex-col items-center min-h-[calc(100vh-6rem)] px-6 pt-12"
    >
      {/* Streak */}
      <StreakCounter />

      {/* Greeting */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-2 mt-6"
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
        <span className="text-glow-green text-primary">your skin</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-sm text-center max-w-xs mb-8"
      >
        AI-powered skin analysis. tap to scan.
      </motion.p>

      {/* Scan Button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 rounded-full pulse-ring" style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)',
          transform: 'scale(1.4)',
        }} />
        <motion.button
          onClick={() => setPhase("scanning")}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          className="relative w-36 h-36 rounded-full glass-strong flex items-center justify-center"
          style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.2), inset 0 0 30px hsl(0, 0%, 100%, 0.03)' }}
        >
          <Scan className="w-11 h-11 text-primary" />
        </motion.button>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass p-5 max-w-xs w-full mb-6"
      >
        <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> How It Works
        </h3>
        <div className="space-y-4">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ x: -15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-xl glass-strong flex items-center justify-center shrink-0">
                <step.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomeScreen;
