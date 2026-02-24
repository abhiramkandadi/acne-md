import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getDiaryEntries,
  addDiaryEntry,
  getEntryForDate,
  formatDateKey,
  type DiaryEntry,
} from "@/lib/skinDiary";
import StreakCounter from "./StreakCounter";

const MOODS = [
  { emoji: "😊", label: "Clear" },
  { emoji: "😐", label: "Mild" },
  { emoji: "😟", label: "Moderate" },
  { emoji: "😣", label: "Bad" },
  { emoji: "🌟", label: "Glowing" },
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const SkinDiary = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [entries, setEntries] = useState<DiaryEntry[]>(getDiaryEntries);
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [year, month]);

  const entryMap = useMemo(() => {
    const map: Record<string, DiaryEntry> = {};
    entries.forEach((e) => (map[e.date] = e));
    return map;
  }, [entries]);

  const navMonth = (dir: -1 | 1) => {
    setCurrentMonth(new Date(year, month + dir, 1));
    setSelectedDate(null);
    setShowMoodPicker(false);
  };

  const handleDayClick = (day: number) => {
    const key = formatDateKey(new Date(year, month, day));
    setSelectedDate(key);
    setShowMoodPicker(!entryMap[key]);
  };

  const handleMoodSelect = (mood: string) => {
    if (!selectedDate) return;
    const entry: DiaryEntry = { date: selectedDate, mood };
    addDiaryEntry(entry);
    setEntries(getDiaryEntries());
    setShowMoodPicker(false);
  };

  const today = formatDateKey(new Date());
  const selectedEntry = selectedDate ? entryMap[selectedDate] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-6rem)] px-5 py-8 flex flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="font-display text-xl font-bold">Skin Diary</h1>
        <StreakCounter />
      </motion.div>

      {/* Calendar Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass p-5"
      >
        {/* Month nav */}
        <div className="flex items-center justify-between mb-5">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navMonth(-1)} className="p-1.5 rounded-full glass-strong">
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <span className="font-display text-sm font-semibold">
            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navMonth(1)} className="p-1.5 rounded-full glass-strong">
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] text-muted-foreground font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const key = formatDateKey(new Date(year, month, day));
            const entry = entryMap[key];
            const isToday = key === today;
            const isSelected = key === selectedDate;
            const isFuture = key > today;

            return (
              <motion.button
                key={key}
                whileTap={{ scale: 0.9 }}
                disabled={isFuture}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "relative aspect-square flex items-center justify-center rounded-xl text-xs font-medium transition-all",
                  isSelected && "ring-2 ring-primary",
                  isToday && !isSelected && "ring-1 ring-muted-foreground/30",
                  isFuture && "opacity-20 cursor-not-allowed",
                  entry ? "glass-strong" : "hover:bg-secondary",
                )}
              >
                {entry ? (
                  <span className="text-base">{entry.mood}</span>
                ) : (
                  <span>{day}</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Mood Picker / Selected Entry */}
      <AnimatePresence mode="wait">
        {showMoodPicker && selectedDate && (
          <motion.div
            key="mood-picker"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="glass p-5 mt-4"
          >
            <p className="text-sm font-medium mb-3">How's your skin today?</p>
            <div className="flex justify-between">
              {MOODS.map((m) => (
                <motion.button
                  key={m.emoji}
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => handleMoodSelect(m.emoji)}
                  className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:bg-secondary transition-colors"
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-[10px] text-muted-foreground">{m.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {selectedEntry && !showMoodPicker && (
          <motion.div
            key="entry-display"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="glass p-5 mt-4 flex items-center gap-3"
          >
            <span className="text-3xl">{selectedEntry.mood}</span>
            <div>
              <p className="text-sm font-medium">
                {new Date(selectedEntry.date + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-muted-foreground">Skin mood logged</p>
            </div>
            <Check className="w-4 h-4 text-primary ml-auto" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Today CTA */}
      {!entryMap[today] && selectedDate !== today && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedDate(today);
            setShowMoodPicker(true);
          }}
          className="mt-auto mb-4 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
        >
          <Plus className="w-4 h-4" /> Log Today's Skin
        </motion.button>
      )}
    </motion.div>
  );
};

export default SkinDiary;
