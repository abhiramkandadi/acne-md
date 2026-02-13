import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

type ScanState = "idle" | "scanning" | "unsafe" | "safe";

const unsafeProduct = {
  name: "Glow Radiance Night Cream",
  verdict: "unsafe" as const,
  cloggers: [
    { name: "Isopropyl Myristate", risk: "High", note: "Comedogenic rating 5/5" },
    { name: "Coconut Oil (Cocos Nucifera)", risk: "High", note: "Comedogenic rating 4/5" },
    { name: "Acetylated Lanolin", risk: "Moderate", note: "Comedogenic rating 3/5" },
  ],
};

const safeProduct = {
  name: "CeraVe Moisturizing Lotion",
  verdict: "safe" as const,
  ingredients: ["Ceramides", "Hyaluronic Acid", "Niacinamide"],
};

const ProductShield = () => {
  const [state, setState] = useState<ScanState>("idle");
  const [showSafe, setShowSafe] = useState(false);

  const handleScan = () => {
    setState("scanning");
    setTimeout(() => {
      setState(showSafe ? "safe" : "unsafe");
    }, 2000);
  };

  const reset = () => {
    setState("idle");
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] px-5 py-8 flex flex-col">
      <div className="mb-6">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5 text-safe" /> Product Shield
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Check if your skincare is secretly breaking you out.
        </p>
      </div>

      {state === "idle" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {/* Toggle */}
          <div className="flex items-center gap-3 glass-card px-4 py-3">
            <button
              onClick={() => setShowSafe(false)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-medium transition-colors",
                !showSafe ? "bg-clinical text-clinical-foreground" : "text-muted-foreground"
              )}
            >
              Unsafe Demo
            </button>
            <button
              onClick={() => setShowSafe(true)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-medium transition-colors",
                showSafe ? "bg-safe text-safe-foreground" : "text-muted-foreground"
              )}
            >
              Safe Demo
            </button>
          </div>

          <button
            onClick={handleScan}
            className="w-32 h-32 rounded-2xl bg-secondary border border-border flex flex-col items-center justify-center gap-2 transition-transform active:scale-95 hover:border-muted-foreground/30"
          >
            <ScanLine className="w-8 h-8 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Scan Product</span>
          </button>
          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Point your camera at a product's ingredient list to check for pore-clogging compounds.
          </p>
        </div>
      )}

      {state === "scanning" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-2xl border-2 border-border flex items-center justify-center animate-pulse">
            <ScanLine className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Reading ingredients...</p>
        </div>
      )}

      {state === "unsafe" && (
        <div className="flex-1 flex flex-col gap-4 animate-fade-in">
          <div className="glass-card p-5 border-clinical/30">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-clinical" />
              <span className="text-sm font-semibold text-clinical">Unsafe — Pore-Clogging Ingredients Found</span>
            </div>
            <p className="text-foreground text-sm font-medium">{unsafeProduct.name}</p>
          </div>

          <div className="space-y-2">
            {unsafeProduct.cloggers.map((c) => (
              <div key={c.name} className="glass-card p-4 border-clinical/20">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-clinical">{c.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-clinical/20 text-clinical font-medium">{c.risk}</span>
                </div>
                <p className="text-xs text-muted-foreground">{c.note}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-2">
            Recommendation: Discontinue use. These ingredients may worsen acne cosmetica.
          </p>

          <button onClick={reset} className="mt-auto mb-4 py-3 rounded-xl border border-border text-sm font-medium transition-colors hover:bg-secondary">
            Scan Another Product
          </button>
        </div>
      )}

      {state === "safe" && (
        <div className="flex-1 flex flex-col gap-4 animate-fade-in">
          <div className="glass-card p-5 border-safe/30">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-safe" />
              <span className="text-sm font-semibold text-safe">Safe — No Comedogenic Ingredients</span>
            </div>
            <p className="text-foreground text-sm font-medium">{safeProduct.name}</p>
          </div>

          <div className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-3">Key beneficial ingredients:</p>
            <div className="flex flex-wrap gap-2">
              {safeProduct.ingredients.map((i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-safe/10 text-safe border border-safe/20">{i}</span>
              ))}
            </div>
          </div>

          <button onClick={reset} className="mt-auto mb-4 py-3 rounded-xl border border-border text-sm font-medium transition-colors hover:bg-secondary">
            Scan Another Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductShield;
