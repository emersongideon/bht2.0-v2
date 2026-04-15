import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  isOpen: boolean;
  onClose: () => void;
  /** ISO date strings (YYYY-MM-DD) that have data. Dates outside this set are greyed out. */
  availableDates?: Set<string>;
}

export function CustomDatePicker({ selectedDate, onDateChange, isOpen, onClose, availableDates }: CustomDatePickerProps) {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const selectDate = (day: number) => {
    const newDate = new Date(year, month, day);
    onDateChange(newDate);
    onClose();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
  };

  const hasData = (day: number) => {
    if (!availableDates || availableDates.size === 0) return true; // still loading → treat all as available
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return availableDates.has(iso);
  };

  const days = [];
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} />);
  }
  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const active = hasData(day);
    const selected = isSelected(day);
    const today = isToday(day);
    days.push(
      <button
        key={day}
        onClick={() => active ? selectDate(day) : undefined}
        disabled={!active}
        style={{
          padding: "10px",
          border: "none",
          borderRadius: "var(--radius-sm)",
          cursor: active ? "pointer" : "default",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          backgroundColor: selected ? "var(--accent-primary)" : today ? "var(--bg-surface)" : "transparent",
          color: selected ? "#FFFFFF" : active ? "var(--text-primary)" : "var(--text-muted)",
          fontWeight: selected || today ? 600 : 400,
          opacity: active ? 1 : 0.35,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          if (active && !selected) {
            e.currentTarget.style.backgroundColor = "var(--bg-surface)";
          }
        }}
        onMouseLeave={(e) => {
          if (!selected) {
            e.currentTarget.style.backgroundColor = today ? "var(--bg-surface)" : "transparent";
          }
        }}
      >
        {day}
      </button>
    );
  }

  return (
    <div
      ref={pickerRef}
      className="left-0 right-0 md:left-auto md:right-0"
      style={{
        position: "absolute",
        top: "100%",
        marginTop: 8,
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-lg)",
        padding: 16,
        zIndex: 1000,
        backdropFilter: "blur(var(--blur-glass))",
        minWidth: 280,
        maxWidth: 320,
      }}
    >
      {/* Header with month/year and navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-sm)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-surface)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <ChevronLeft size={18} color="var(--text-secondary)" />
        </button>

        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {monthNames[month]} {year}
        </span>

        <button
          onClick={nextMonth}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-sm)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-surface)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <ChevronRight size={18} color="var(--text-secondary)" />
        </button>
      </div>

      {/* Day names */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
          marginBottom: 8,
        }}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "var(--text-muted)",
              fontWeight: 600,
              padding: "4px 0",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
        }}
      >
        {days}
      </div>
    </div>
  );
}