import { Home, Shield, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Tab = "home" | "shield" | "chat";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs = [
  { id: "home" as Tab, icon: Home, label: "Skin Check" },
  { id: "shield" as Tab, icon: Shield, label: "Clog-Test" },
  { id: "chat" as Tab, icon: MessageCircle, label: "Dr. AI" },
];

const BottomNav = ({ active, onChange }: BottomNavProps) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
        className="glass-strong px-2 py-2 flex items-center gap-1"
        style={{ borderRadius: '9999px' }}
      >
        {tabs.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            onClick={() => onChange(id)}
            whileTap={{ scale: 0.92 }}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300",
              active === id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active === id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-primary"
                style={{ boxShadow: '0 0 20px hsl(80, 100%, 50%, 0.4)' }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="w-4 h-4 relative z-10" strokeWidth={active === id ? 2.5 : 1.8} />
            {active === id && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="text-xs font-semibold relative z-10 whitespace-nowrap overflow-hidden"
              >
                {label}
              </motion.span>
            )}
          </motion.button>
        ))}
      </motion.nav>
    </div>
  );
};

export default BottomNav;
