import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomNav, { type Tab } from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import ProductShield from "@/components/ProductShield";
import DrAIChat from "@/components/DrAIChat";
import SkinDiary from "@/components/SkinDiary";
import SettingsScreen from "@/components/SettingsScreen";
import AuraBackground from "@/components/AuraBackground";

const Index = () => {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <AuraBackground />
      <main className="relative z-10 pb-24 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "home" && <HomeScreen />}
            {tab === "diary" && <SkinDiary />}
            {tab === "shield" && <ProductShield />}
            {tab === "chat" && <DrAIChat />}
            {tab === "settings" && <SettingsScreen />}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
};

export default Index;
