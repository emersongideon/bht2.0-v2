import { Calendar } from "lucide-react";
import { useDateMode } from "../contexts/date-mode-context";

const modes = ["Daily", "Rolling 30", "Monthly"] as const;

export function DateModeSelector() {
  const { dateMode, setDateMode } = useDateMode();

  return (
    <div className="flex items-center gap-4">
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
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Date display */}
      <div className="flex items-center gap-2">
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          Mar 2026
        </span>
        <Calendar size={14} style={{ color: "var(--text-muted)" }} />
      </div>
    </div>
  );
}