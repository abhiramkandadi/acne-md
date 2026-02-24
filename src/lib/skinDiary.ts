// Skin Diary persistence layer using localStorage

export interface DiaryEntry {
  date: string; // YYYY-MM-DD
  mood: string; // emoji
  note?: string;
  scanSummary?: {
    blemishCount: number;
    areas: string[];
    severity: string;
  };
}

const DIARY_KEY = "md-acne-diary";

export const getDiaryEntries = (): DiaryEntry[] => {
  try {
    const raw = localStorage.getItem(DIARY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addDiaryEntry = (entry: DiaryEntry): void => {
  const entries = getDiaryEntries().filter((e) => e.date !== entry.date);
  entries.push(entry);
  localStorage.setItem(DIARY_KEY, JSON.stringify(entries));
};

export const updateEntryNote = (date: string, note: string): void => {
  const entries = getDiaryEntries();
  const idx = entries.findIndex((e) => e.date === date);
  if (idx >= 0) {
    entries[idx].note = note;
    localStorage.setItem(DIARY_KEY, JSON.stringify(entries));
  }
};

export const getEntryForDate = (date: string): DiaryEntry | undefined => {
  return getDiaryEntries().find((e) => e.date === date);
};

export const getStreak = (): number => {
  const entries = getDiaryEntries();
  if (entries.length === 0) return 0;

  const dates = new Set(entries.map((e) => e.date));
  const today = new Date();
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if (dates.has(key)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};

export const formatDateKey = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
