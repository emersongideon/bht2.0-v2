import { Calendar } from "lucide-react";
import { useRef, useState } from "react";
import { useDateMode } from "../contexts/date-mode-context";
import { formatDisplayDate, toISODateString, parseISODateString } from "../utils/date-utils";
import { CustomDatePicker } from "./custom-date-picker";
import { useAvailableDates } from "../hooks/use-available-dates";

const modes = ["Daily", "Rolling 30", "Monthly"] as const;

export function DateModeSelector() {
  const { dateMode, setDateMode, selectedDate, setSelectedDate } = useDateMode();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const availableDates = useAvailableDates();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsPickerOpen(false);
  };

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      {/* Segmented control */}
      <div
        className="flex items-center"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderRadius: "var(--radius-pill)",
          padding: 3,
          border: "1px solid var(--border-subtle)",
        }}
      >
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => setDateMode(mode)}
            style={{
              padding: "6px 16px",
              borderRadius: "var(--radius-pill)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: dateMode === mode ? 600 : 400,
              backgroundColor: dateMode === mode ? "var(--accent-primary)" : "transparent",
              color: dateMode === mode ? "#FFFFFF" : "var(--text-secondary)",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Date display with custom picker */}
      <div style={{ position: "relative", width: "100%" }} className="md:w-auto">
        <button
          onClick={togglePicker}
          className="flex items-center gap-2 w-full md:w-auto"
          style={{
            cursor: "pointer",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            padding: "10px 14px",
            borderRadius: "var(--radius-md)",
            transition: "all 0.2s",
          }}
        >
          <Calendar size={16} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--text-primary)",
              letterSpacing: "0.02em",
              fontWeight: 500,
            }}
          >
            {formatDisplayDate(selectedDate)}
          </span>
        </button>

        <CustomDatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          isOpen={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          availableDates={availableDates}
        />
      </div>
    </div>
  );
}