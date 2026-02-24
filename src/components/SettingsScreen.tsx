import { Moon, Sun, Info, Palette, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme, ACCENT_COLORS } from "@/lib/ThemeProvider";
import { cn } from "@/lib/utils";

const SettingsScreen = () => {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-6rem)] px-5 py-8 flex flex-col gap-4"
    >
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-display text-xl font-bold mb-2"
      >
        Settings
      </motion.h1>

      {/* Theme Toggle */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass p-5"
      >
        <p className="text-sm font-medium mb-3">Appearance</p>
        <div className="flex gap-2">
          {[
            { value: "dark" as const, icon: Moon, label: "Dark" },
            { value: "light" as const, icon: Sun, label: "Light" },
          ].map(({ value, icon: Icon, label }) => (
            <motion.button
              key={value}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(value)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-all",
                theme === value
                  ? "bg-primary text-primary-foreground"
                  : "glass hover:bg-secondary"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Accent Color Picker */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="glass p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium">App Color</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ACCENT_COLORS.map((color) => (
            <motion.button
              key={color.name}
              whileTap={{ scale: 0.92 }}
              onClick={() => setAccentColor(color)}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-medium transition-all",
                accentColor.name === color.name
                  ? "glass-strong ring-2 ring-primary"
                  : "glass hover:bg-secondary"
              )}
            >
              <div
                className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: color.preview }}
              >
                {accentColor.name === color.name && (
                  <Check className="w-3 h-3" style={{ color: "hsl(0, 0%, 7%)" }} />
                )}
              </div>
              <span className="truncate">{color.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass p-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium">About MD Acne</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          MD Acne uses YOLOv8 computer vision to analyze skin conditions and provide
          evidence-based recommendations aligned with the Global Alliance to Improve Outcomes
          in Acne guidelines.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mt-2">
          🔒 Privacy-first: all analysis is processed locally. Your face is your data, not ours.
        </p>
      </motion.div>

      {/* Version */}
      <div className="mt-auto text-center">
        <p className="text-xs text-muted-foreground">MD Acne v1.0.0</p>
      </div>
    </motion.div>
  );
};

export default SettingsScreen;
