export const getSqliteTimestamp = (date: Date = new Date()) => {
  // JavaScript Date to SQLite timestamp
  return date.toISOString().replace("T", " ").replace("Z", " ").split(".")[0];
};
export function parseSqliteUTC(sqliteTimestamp: string): Date {
  // SQLite timestamp to JavaScript Date
  // Convert "2026-07-22 10:30:00" -> "2026-07-22T10:30:00Z"
  return new Date(sqliteTimestamp.replace(" ", "T") + "Z");
}

export const formatDisplayDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const formatDisplayTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};
