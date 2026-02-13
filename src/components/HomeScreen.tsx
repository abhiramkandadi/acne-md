import { useState } from "react";
import { Scan } from "lucide-react";
import ScannerFlow from "./ScannerFlow";
import DiagnosisCard from "./DiagnosisCard";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-6 text-center">
      <p className="text-muted-foreground text-sm mb-1 tracking-wide">MD ACNE</p>
      <h1 className="text-xl font-semibold mb-2">
        {getGreeting()}. <br />
        Let's check your skin health.
      </h1>
      <p className="text-muted-foreground text-sm max-w-xs mb-12">
        Your face is your data, not our product. All processing stays on your device.
      </p>

      <button
        onClick={() => setPhase("scanning")}
        className="relative w-36 h-36 rounded-full bg-secondary border border-border flex items-center justify-center scan-pulse transition-transform active:scale-95"
      >
        <div className="absolute inset-0 rounded-full border-2 border-clinical/30" />
        <Scan className="w-10 h-10 text-clinical" />
      </button>
      <p className="text-muted-foreground text-xs mt-6">Tap to scan your face</p>
    </div>
  );
};

export default HomeScreen;
