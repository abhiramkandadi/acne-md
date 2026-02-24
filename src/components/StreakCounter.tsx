import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import { getStreak } from "@/lib/skinDiary";

const StreakCounter = () => {
  const streak = getStreak();

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass px-4 py-2 flex items-center gap-2"
      style={{ borderRadius: "9999px" }}
    >
      <Flame
        className="w-4 h-4"
        style={{ color: streak > 0 ? "hsl(30, 100%, 55%)" : "hsl(var(--muted-foreground))" }}
      />
      <span className="text-sm font-semibold">
        {streak > 0 ? `${streak}-day streak` : "Start your streak!"}
      </span>
    </motion.div>
  );
};

export default StreakCounter;
