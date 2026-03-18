import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import {
  computeAxisDates,
  getAxisLabels as getLabels,
} from "../utils/date-utils";

export type DateMode = "Daily" | "Rolling 30" | "Monthly";

interface DateModeContextType {
  dateMode: DateMode;
  setDateMode: (mode: DateMode) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  /** Returns 7 x-axis labels based on current mode & selected date */
  getAxisLabels: () => string[];
  /** Returns 7 Date objects for data lookups */
  getAxisDates: () => Date[];
}

const DateModeContext = createContext<DateModeContextType | undefined>(undefined);

export function DateModeProvider({ children }: { children: ReactNode }) {
  const [dateMode, setDateMode] = useState<DateMode>("Daily");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 2, 19)); // 19/Mar/26

  const getAxisDates = useCallback(
    () => computeAxisDates(dateMode, selectedDate),
    [dateMode, selectedDate]
  );

  const getAxisLabels = useCallback(
    () => getLabels(dateMode, selectedDate),
    [dateMode, selectedDate]
  );

  return (
    <DateModeContext.Provider
      value={{ dateMode, setDateMode, selectedDate, setSelectedDate, getAxisLabels, getAxisDates }}
    >
      {children}
    </DateModeContext.Provider>
  );
}

export function useDateMode() {
  const context = useContext(DateModeContext);
  if (!context) {
    throw new Error("useDateMode must be used within a DateModeProvider");
  }
  return context;
}