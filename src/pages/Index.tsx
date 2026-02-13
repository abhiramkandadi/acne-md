import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import ProductShield from "@/components/ProductShield";
import DrAIChat from "@/components/DrAIChat";

type Tab = "home" | "shield" | "chat";

const Index = () => {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pb-20 max-w-md mx-auto">
        {tab === "home" && <HomeScreen />}
        {tab === "shield" && <ProductShield />}
        {tab === "chat" && <DrAIChat />}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
};

export default Index;
