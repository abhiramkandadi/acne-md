import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Check, X, FileText, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getDiaryEntries,
  addDiaryEntry,
  updateEntryNote,
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

// Mock scan thumbnails per mood
const MOOD_THUMBNAILS: Record<string, string> = {
  "😊": "🟢",
  "😐": "🟡",
  "😟": "🟠",
  "😣": "🔴",
  "🌟": "✨",
};

const MOCK_SCAN_DATA: Record<string, { blemishCount: number; areas: string[]; severity: string }> = {
  "😊": { blemishCount: 2, areas: ["forehead"], severity: "minimal" },
  "😐": { blemishCount: 8, areas: ["t-zone", "chin"], severity: "mild" },
  "😟": { blemishCount: 15, areas: ["t-zone", "cheeks", "chin"], severity: "moderate" },
  "😣": { blemishCount: 25, areas: ["forehead", "cheeks", "chin", "jawline"], severity: "active" },
  "🌟": { blemishCount: 0, areas: [], severity: "clear" },
};

const SkinDiary = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [entries, setEntries] = useState<DiaryEntry[]>(getDiaryEntries);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [showDayDetail, setShowDayDetail] = useState(false);
  const [noteText, setNoteText] = useState("");

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
    setShowDayDetail(false);
  };

  const handleDayClick = (day: number) => {
    const key = formatDateKey(new Date(year, month, day));
    setSelectedDate(key);
    if (entryMap[key]) {
      setShowDayDetail(true);
      setShowMoodPicker(false);
      setNoteText(entryMap[key].note || "");
    } else {
      setShowMoodPicker(true);
      setShowDayDetail(false);
    }
  };

  const handleMoodSelect = (mood: string) => {
    if (!selectedDate) return;
    const scanData = MOCK_SCAN_DATA[mood];
    const entry: DiaryEntry = { date: selectedDate, mood, scanSummary: scanData };
    addDiaryEntry(entry);
    setEntries(getDiaryEntries());
    setShowMoodPicker(false);
    setShowDayDetail(true);
    setNoteText("");
  };

  const handleSaveNote = () => {
    if (!selectedDate) return;
    updateEntryNote(selectedDate, noteText);
    setEntries(getDiaryEntries());
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

        {/* Day cells with thumbnails */}
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
                  "relative aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-all",
                  isSelected && "ring-2 ring-primary",
                  isToday && !isSelected && "ring-1 ring-muted-foreground/30",
                  isFuture && "opacity-20 cursor-not-allowed",
                  entry ? "glass-strong" : "hover:bg-secondary",
                )}
              >
                {entry ? (
                  <>
                    <span className="text-sm leading-none">{entry.mood}</span>
                    <span className="text-[8px] text-muted-foreground mt-0.5">
                      {MOOD_THUMBNAILS[entry.mood] || "•"}
                    </span>
                  </>
                ) : (
                  <span>{day}</span>
                )}
                {entry?.note && (
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Mood Picker */}
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

        {/* Day Detail View */}
        {showDayDetail && selectedEntry && (
          <motion.div
            key="day-detail"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="mt-4 space-y-3"
          >
            {/* Summary header */}
            <div className="glass p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
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
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setShowDayDetail(false); setSelectedDate(null); }}
                  className="p-1.5 rounded-full glass-strong"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              {/* Scan summary */}
              {selectedEntry.scanSummary && (
                <div className="glass-strong p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Scan Summary</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-lg font-display font-bold">{selectedEntry.scanSummary.blemishCount}</p>
                      <p className="text-[10px] text-muted-foreground">blemishes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-display font-bold">{selectedEntry.scanSummary.areas.length}</p>
                      <p className="text-[10px] text-muted-foreground">areas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium px-2 py-1 rounded-full glass-strong">{selectedEntry.scanSummary.severity}</p>
                    </div>
                  </div>
                  {selectedEntry.scanSummary.areas.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mt-2">
                      {selectedEntry.scanSummary.areas.map((area) => (
                        <span key={area} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                          {area}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Notes section */}
            <div className="glass p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Notes</span>
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onBlur={handleSaveNote}
                placeholder="diet, sleep, products used..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[80px]"
              />
              {noteText !== (selectedEntry.note || "") && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveNote}
                  className="mt-2 text-xs font-medium px-4 py-2 rounded-full bg-primary text-primary-foreground"
                >
                  Save Note
                </motion.button>
              )}
            </div>
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
            setShowDayDetail(false);
          }}
          className="mt-auto mb-4 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 bg-primary text-primary-foreground"
        >
          <Plus className="w-4 h-4" /> Log Today's Skin
        </motion.button>
      )}
    </motion.div>
  );
};

export default SkinDiary;
