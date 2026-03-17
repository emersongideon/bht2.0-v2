import { createContext, useContext, useState, ReactNode } from "react";

type DateMode = "Daily" | "Rolling 30" | "Monthly";

interface DateModeContextType {
  dateMode: DateMode;
  setDateMode: (mode: DateMode) => void;
}

const DateModeContext = createContext<DateModeContextType | undefined>(undefined);

export function DateModeProvider({ children }: { children: ReactNode }) {
  const [dateMode, setDateMode] = useState<DateMode>("Monthly");

  return (
    <DateModeContext.Provider value={{ dateMode, setDateMode }}>
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
