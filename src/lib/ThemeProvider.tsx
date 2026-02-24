import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

export interface AccentColor {
  name: string;
  hsl: string; // e.g. "80 100% 50%"
  preview: string; // CSS color for preview swatch
}

export const ACCENT_COLORS: AccentColor[] = [
  { name: "Acid Green", hsl: "80 100% 50%", preview: "hsl(80, 100%, 50%)" },
  { name: "Violet", hsl: "271 76% 53%", preview: "hsl(271, 76%, 53%)" },
  { name: "Hot Pink", hsl: "330 100% 65%", preview: "hsl(330, 100%, 65%)" },
  { name: "Cyan", hsl: "185 100% 50%", preview: "hsl(185, 100%, 50%)" },
  { name: "Amber", hsl: "40 100% 55%", preview: "hsl(40, 100%, 55%)" },
  { name: "Coral", hsl: "16 100% 65%", preview: "hsl(16, 100%, 65%)" },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  accentColor: AccentColor;
  setAccentColor: (c: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  accentColor: ACCENT_COLORS[0],
  setAccentColor: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("md-acne-theme");
    return (stored === "light" ? "light" : "dark") as Theme;
  });

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const stored = localStorage.getItem("md-acne-accent");
    if (stored) {
      const found = ACCENT_COLORS.find((c) => c.name === stored);
      if (found) return found;
    }
    return ACCENT_COLORS[0];
  });

  useEffect(() => {
    localStorage.setItem("md-acne-theme", theme);
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("md-acne-accent", accentColor.name);
    document.documentElement.style.setProperty("--primary", accentColor.hsl);
    document.documentElement.style.setProperty("--ring", accentColor.hsl);
  }, [accentColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
