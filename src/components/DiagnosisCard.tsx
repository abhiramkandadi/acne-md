import { ChevronDown, RotateCcw, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DiagnosisCardProps {
  onRescan: () => void;
}

const DiagnosisCard = ({ onRescan }: DiagnosisCardProps) => {
  const [fixOpen, setFixOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-6rem)] px-5 py-8 flex flex-col gap-4"
    >
      {/* Spotify Wrapped-style Skin Vibe Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-4xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(271, 76%, 20%), hsl(330, 60%, 18%), hsl(220, 20%, 10%))',
          border: '1px solid hsla(271, 76%, 53%, 0.2)',
        }}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30" style={{
          background: 'radial-gradient(circle, hsl(330, 100%, 71%), transparent 70%)',
          filter: 'blur(40px)',
        }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" style={{ color: 'hsl(80, 100%, 50%)' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'hsl(80, 100%, 50%)' }}>skin vibe check</span>
          </div>

          <h2 className="font-display text-2xl font-bold mb-2 leading-tight">
            Current Mood:
            <br />
            <span style={{ color: 'hsl(330, 100%, 71%)' }}>Spying some texture.</span>
          </h2>

          <div className="flex gap-3 mt-4">
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
              background: 'hsla(330, 100%, 71%, 0.15)',
              color: 'hsl(330, 100%, 71%)',
              border: '1px solid hsla(330, 100%, 71%, 0.2)',
            }}>
              papulopustular
            </span>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
              background: 'hsla(0, 0%, 100%, 0.08)',
              color: 'hsla(0, 0%, 100%, 0.6)',
            }}>
              t-zone + chin
            </span>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
              background: 'hsla(80, 100%, 50%, 0.12)',
              color: 'hsl(80, 100%, 50%)',
            }}>
              moderate
            </span>
          </div>
        </div>
      </motion.div>

      {/* Why section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="glass p-5"
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          your skin's going through it rn. excess sebum + bacteria = inflammation. 
          hormonal shifts, stress, and maybe a sneaky product in your routine could be making it worse. 
          <span className="font-medium text-foreground"> but we've got a plan.</span>
        </p>
      </motion.div>

      {/* The Fix */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setFixOpen(!fixOpen)}
          className="glass p-4 text-left w-full"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold">the fix ✨</span>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-300", fixOpen && "rotate-180")} />
          </div>
        </button>

        <AnimatePresence>
          {fixOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-3">
                {[
                  { name: "Salicylic Acid 2%", desc: "unclogs pores like a charm", emoji: "🧴" },
                  { name: "Benzoyl Peroxide 2.5%", desc: "kills the bacteria causing this", emoji: "💊" },
                  { name: "Blue Light Therapy", desc: "calms inflammation down", emoji: "💙" },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-4 flex items-center gap-3"
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Privacy */}
      <p className="text-center text-xs text-muted-foreground mt-2">
        🔒 processed on-device. your face, your data.
      </p>

      {/* Actions */}
      <div className="flex gap-3 mt-auto pb-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onRescan}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full glass text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" /> re-scan
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold glow-green"
          style={{ background: 'hsl(80, 100%, 50%)', color: 'hsl(0, 0%, 7%)' }}
        >
          <Shield className="w-4 h-4" /> clog-test
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DiagnosisCard;
