import { Home, Shield, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "home" | "shield" | "chat";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs = [
  { id: "home" as Tab, icon: Home, label: "Scan" },
  { id: "shield" as Tab, icon: Shield, label: "Products" },
  { id: "chat" as Tab, icon: MessageCircle, label: "Dr. AI" },
];

const BottomNav = ({ active, onChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors",
              active === id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/70"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={active === id ? 2.2 : 1.5} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
