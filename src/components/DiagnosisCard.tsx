import { ChevronDown, RotateCcw, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DiagnosisCardProps {
  onRescan: () => void;
}

const DiagnosisCard = ({ onRescan }: DiagnosisCardProps) => {
  const [whyOpen, setWhyOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-5rem)] px-5 py-8 flex flex-col gap-5 animate-fade-in">
      {/* Result Header */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-3 h-3 rounded-full bg-clinical animate-pulse" />
          <span className="text-xs font-medium text-clinical tracking-wider uppercase">Active Inflammation</span>
        </div>
        <h2 className="text-lg font-semibold mb-1">Inflammatory Acne Detected</h2>
        <p className="text-muted-foreground text-sm">
          Classification: <span className="text-foreground">Grade II — Papulopustular</span>
        </p>
        <p className="text-muted-foreground text-xs mt-3">Severity: Moderate • Regions: T-zone, chin</p>
      </div>

      {/* Why */}
      <button
        onClick={() => setWhyOpen(!whyOpen)}
        className="glass-card p-4 text-left w-full"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Why is this happening?</span>
          <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", whyOpen && "rotate-180")} />
        </div>
        {whyOpen && (
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Inflammatory papules form when the walls of hair follicles break down due to excess sebum and
            <span className="text-foreground"> C. acnes </span>
            bacteria proliferation. This triggers your immune system, causing redness and swelling. Contributing factors include hormonal fluctuations, comedogenic skincare products, and stress-related cortisol spikes.
          </p>
        )}
      </button>

      {/* Protocol */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-medium mb-4">Recommended Protocol</h3>
        <div className="space-y-3">
          {[
            { name: "Salicylic Acid 2%", desc: "BHA exfoliant — unclogs pores", safe: true },
            { name: "Benzoyl Peroxide 2.5%", desc: "Antimicrobial — kills C. acnes", safe: true },
            { name: "Blue Light Therapy", desc: "415nm wavelength — reduces inflammation", safe: true },
          ].map((item) => (
            <div key={item.name} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-safe mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <p className="text-center text-xs text-muted-foreground">
        🔒 This scan was processed locally. No data was stored.
      </p>

      {/* Actions */}
      <div className="flex gap-3 mt-auto pb-4">
        <button
          onClick={onRescan}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-medium transition-colors hover:bg-secondary"
        >
          <RotateCcw className="w-4 h-4" /> Re-scan
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-safe text-safe-foreground text-sm font-medium transition-colors hover:bg-safe/90">
          <Shield className="w-4 h-4" /> Check Products
        </button>
      </div>
    </div>
  );
};

export default DiagnosisCard;
