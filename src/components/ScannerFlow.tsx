import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScannerFlowProps {
  onComplete: () => void;
}

const funTexts = [
  "analyzing vibes...",
  "checking ingredients...",
  "decoding your skin...",
  "almost there bestie...",
  "reading the signs...",
];

const ScannerFlow = ({ onComplete }: ScannerFlowProps) => {
  const [stage, setStage] = useState<"viewfinder" | "analyzing">("viewfinder");
  const [progress, setProgress] = useState(0);
  const [textIdx, setTextIdx] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage("analyzing"), 1000);
    return () => clearTimeout(t1);
  }, []);

  const stableOnComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    if (stage !== "analyzing") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(stableOnComplete, 400);
          return 100;
        }
        return p + 1.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [stage, stableOnComplete]);

  useEffect(() => {
    if (stage !== "analyzing") return;
    const interval = setInterval(() => {
      setTextIdx((i) => (i + 1) % funTexts.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [stage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-6"
    >
      {/* Viewfinder */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-72 h-72 rounded-4xl overflow-hidden glass-strong"
      >
        {/* Corner brackets styled like IG camera */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl-xl" style={{ borderColor: 'hsl(80, 100%, 50%)' }} />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-xl" style={{ borderColor: 'hsl(80, 100%, 50%)' }} />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-xl" style={{ borderColor: 'hsl(80, 100%, 50%)' }} />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br-xl" style={{ borderColor: 'hsl(80, 100%, 50%)' }} />

        {/* Face silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 120" className="w-32 h-32" style={{ color: 'hsla(0, 0%, 100%, 0.08)' }} fill="currentColor">
            <ellipse cx="50" cy="45" rx="30" ry="38" />
            <ellipse cx="50" cy="100" rx="40" ry="22" />
          </svg>
        </div>

        {/* Scan line */}
        {stage === "analyzing" && (
          <div
            className="absolute left-0 right-0 h-0.5 scan-line"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(80, 100%, 50%), transparent)',
              boxShadow: '0 0 12px hsl(80, 100%, 50%, 0.6)',
            }}
          />
        )}

        {/* REC dot */}
        <div className="absolute top-4 right-14 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(340, 100%, 60%)' }} />
          <span className="text-[10px] text-muted-foreground font-medium">LIVE</span>
        </div>
      </motion.div>

      {/* Status text */}
      <div className="mt-8 text-center h-16">
        {stage === "viewfinder" ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground text-sm"
          >
            positioning...
          </motion.p>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.p
                key={textIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-display text-sm font-medium mb-4"
                style={{ color: 'hsl(80, 100%, 50%)' }}
              >
                {funTexts[textIdx]}
              </motion.p>
            </AnimatePresence>
            <div className="w-56 h-1.5 rounded-full overflow-hidden mx-auto" style={{ background: 'hsla(0, 0%, 100%, 0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, hsl(271, 76%, 53%), hsl(80, 100%, 50%))',
                  width: `${progress}%`,
                }}
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ScannerFlow;
