import { useEffect, useState } from "react";

interface ScannerFlowProps {
  onComplete: () => void;
}

const ScannerFlow = ({ onComplete }: ScannerFlowProps) => {
  const [stage, setStage] = useState<"viewfinder" | "analyzing">("viewfinder");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage("analyzing"), 1200);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (stage !== "analyzing") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [stage, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6">
      <div className="relative w-64 h-64 rounded-2xl border-2 border-border overflow-hidden bg-secondary/50">
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-clinical rounded-tl" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-clinical rounded-tr" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-clinical rounded-bl" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-clinical rounded-br" />

        {/* Placeholder face silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 120" className="w-28 h-28 text-muted-foreground/30" fill="currentColor">
            <ellipse cx="50" cy="45" rx="30" ry="38" />
            <ellipse cx="50" cy="100" rx="40" ry="22" />
          </svg>
        </div>

        {/* Scan line */}
        {stage === "analyzing" && (
          <div className="absolute left-0 right-0 h-0.5 bg-clinical/80 scan-line shadow-[0_0_8px_hsl(var(--clinical)/0.6)]" />
        )}
      </div>

      <div className="mt-8 text-center">
        {stage === "viewfinder" ? (
          <p className="text-muted-foreground text-sm animate-pulse">Positioning...</p>
        ) : (
          <>
            <p className="text-foreground text-sm font-medium mb-3">Analyzing skin surface...</p>
            <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-clinical rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-muted-foreground text-xs mt-2">{progress}%</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ScannerFlow;
