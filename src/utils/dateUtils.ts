export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 6 = Saturday

  return { daysInMonth, startingDayOfWeek, year, month };
};

export const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const s = new Date(start);
  s.setHours(0, 0, 0, 0);
  const e = new Date(end);
  e.setHours(0, 0, 0, 0);
  return d >= s && d <= e;
};

export const generateCalendarDays = (
  daysInMonth: number,
  startingDayOfWeek: number
): (number | null)[] => {
  const calendarDays: (number | null)[] = [];

  // Add null values for days before the month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }

  // Add actual day numbers
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return calendarDays;
};

export const getDaysBetween = (start: Date, end: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const startMs = new Date(start).setHours(0, 0, 0, 0);
  const endMs = new Date(end).setHours(0, 0, 0, 0);
  return Math.round((endMs - startMs) / msPerDay);
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const formatDateRange = (start: Date, end: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  if (isSameDay(start, end)) {
    return start.toLocaleDateString("en-US", { ...options, year: "numeric" });
  }

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.getDate()}`;
  }

  return `${start.toLocaleDateString(
    "en-US",
    options
  )} - ${end.toLocaleDateString("en-US", { ...options, year: "numeric" })}`;
};

export const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const isPastDate = (date: Date): boolean => {
  const today = getToday();
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const getMonthName = (
  date: Date,
  format: "long" | "short" = "long"
): string => {
  return date.toLocaleString("en-US", { month: format });
};

export const createDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month, day);
};

export const formatDate = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};



