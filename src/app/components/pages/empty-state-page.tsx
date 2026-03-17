import { ChevronDown, Folder, Plus } from "lucide-react";
import { DateModeSelector } from "../date-mode-selector";

export function EmptyStatePage() {
  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        height: 900,
        width: "100%",
        gap: 12,
        overflow: "hidden",
      }}
    >
      {/* Row 1 — Top bar */}
      <div
        className="flex items-center justify-between"
        style={{ flexShrink: 0 }}
      >
        {/* Simplified brand selector in empty state */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-pill)",
              padding: "8px 16px",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            <Folder size={14} style={{ color: "var(--text-muted)" }} />
            <span>Beauty</span>
            <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
          </button>

          {/* Dashed outline "Select primary brand" */}
          <button
            className="flex items-center gap-2"
            style={{
              backgroundColor: "transparent",
              border: "2px dashed var(--border-color)",
              borderRadius: "var(--radius-pill)",
              padding: "7px 16px",
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            <span>Select primary brand</span>
            <ChevronDown size={14} />
          </button>
        </div>
        <DateModeSelector />
      </div>

      {/* Row 2 — Scores top: Empty Ring + skeleton cards */}
      <div className="flex gap-3" style={{ flexShrink: 0 }}>
        <div style={{ width: 180, flexShrink: 0 }}>
          <EmptyRing />
        </div>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Row 3 — Scores bottom: Spacer + skeleton cards */}
      <div className="flex gap-3" style={{ flexShrink: 0 }}>
        <div style={{ width: 180, flexShrink: 0 }} />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Row 4 — Bottom: Empty chart + Empty alerts */}
      <div className="flex gap-3" style={{ flex: 1, minHeight: 0 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <EmptyChart />
        </div>
        <div style={{ width: 280, flexShrink: 0 }}>
          <EmptyAlerts />
        </div>
      </div>
    </div>
  );
}

function EmptyRing() {
  const circumference = 2 * Math.PI * 52;

  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{
        width: 180,
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: 20,
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="relative" style={{ width: 120, height: 120 }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Empty track only */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="8"
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 48,
            fontWeight: 700,
            color: "var(--text-muted)",
          }}
        >
          --
        </div>
      </div>

      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        ICONIC
      </span>

      <span
        style={{
          display: "inline-flex",
          padding: "3px 10px",
          borderRadius: "var(--radius-pill)",
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        — 0.0
      </span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Title skeleton */}
      <div className="flex items-center gap-2">
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "var(--bg-surface)",
          }}
        />
        <div
          style={{
            width: "60%",
            height: 12,
            borderRadius: 4,
            backgroundColor: "var(--bg-surface)",
          }}
        />
      </div>

      {/* Score skeleton */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 48,
            height: 28,
            borderRadius: 6,
            backgroundColor: "var(--bg-surface)",
          }}
        />
        <div
          style={{
            width: 52,
            height: 20,
            borderRadius: "var(--radius-pill)",
            backgroundColor: "var(--bg-surface)",
          }}
        />
      </div>

      {/* Sparkline skeleton */}
      <div
        style={{
          width: "100%",
          height: 36,
          borderRadius: 4,
          backgroundColor: "var(--bg-surface)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

function EmptyChart() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        height: "100%",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          color: "var(--text-muted)",
        }}
      >
        Select a brand to view trends
      </span>
    </div>
  );
}

function EmptyAlerts() {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Alerts
        </span>
      </div>
      <div
        className="flex flex-1 items-center justify-center"
        style={{ padding: 20 }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--text-muted)",
          }}
        >
          No alerts yet
        </span>
      </div>
    </div>
  );
}
