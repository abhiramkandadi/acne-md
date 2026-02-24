import { useState, useRef } from "react";
import { Scan, Zap, Eye, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const carouselSlides = [
  {
    icon: Eye,
    title: "Capture",
    desc: "Our camera module captures your skin in high detail using your front-facing camera.",
    step: "01",
  },
  {
    icon: Zap,
    title: "Analyze",
    desc: "YOLOv8 AI detects acne types, counts blemishes, and maps affected areas in real-time.",
    step: "02",
  },
  {
    icon: ShieldCheck,
    title: "Act",
    desc: "Get a personalized skincare protocol backed by dermatology science, tailored to you.",
    step: "03",
  },
];

const HomeScreen = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [carouselIdx, setCarouselIdx] = useState(0);

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

      {/* Getting Started Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass p-5 max-w-xs w-full mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-sm font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> Getting Started
          </h3>
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setCarouselIdx((p) => Math.max(0, p - 1))}
              className="p-1 rounded-full glass-strong disabled:opacity-30"
              disabled={carouselIdx === 0}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setCarouselIdx((p) => Math.min(carouselSlides.length - 1, p + 1))}
              className="p-1 rounded-full glass-strong disabled:opacity-30"
              disabled={carouselIdx === carouselSlides.length - 1}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center shrink-0">
              {(() => {
                const Icon = carouselSlides[carouselIdx].icon;
                return <Icon className="w-5 h-5 text-primary" />;
              })()}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-primary">{carouselSlides[carouselIdx].step}</span>
                <p className="text-sm font-medium">{carouselSlides[carouselIdx].title}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{carouselSlides[carouselIdx].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {carouselSlides.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              animate={{
                width: i === carouselIdx ? 16 : 6,
                background: i === carouselIdx ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomeScreen;
