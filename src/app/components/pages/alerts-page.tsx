import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";

type Severity = "Critical" | "Positive" | "Notable";

interface AlertData {
  severity: Severity;
  dimensionDot: string;
  dimensionKey: string;
  title: string;
  body: string;
  timestamp: string;
}

const alerts: AlertData[] = [
  {
    severity: "Critical",
    dimensionDot: "var(--dim-C1)",
    dimensionKey: "C1",
    title: "Capturing Attention — Share of Search",
    body: "Dropped 8% WoW. Glossier gained equivalent share.",
    timestamp: "Mar 4, 2026, 2:15 PM",
  },
  {
    severity: "Positive",
    dimensionDot: "var(--dim-I1)",
    dimensionKey: "I1",
    title: "Imprinted in AI — LLM Consistency",
    body: "Rose 5 pts to 85. Rhode now #2 behind Glossier.",
    timestamp: "Mar 3, 2026, 9:00 AM",
  },
  {
    severity: "Notable",
    dimensionDot: "var(--dim-O)",
    dimensionKey: "O",
    title: "Openly Adored — Social Sentiment",
    body: "Shifted +6% positive after influencer campaign.",
    timestamp: "Mar 4, 2026",
  },
  {
    severity: "Critical",
    dimensionDot: "var(--dim-C2)",
    dimensionKey: "C2",
    title: "Chosen for a Reason — Value Conversation Share",
    body: "Dropped 5%. Price increase backlash detected.",
    timestamp: "Mar 4, 2026, 11:30 AM",
  },
  {
    severity: "Positive",
    dimensionDot: "var(--dim-N)",
    dimensionKey: "N",
    title: "Never Lost in Translation — Sender-Receiver Alignment",
    body: "Improved by 4 pts. Campaign message landing as intended.",
    timestamp: "Mar 2, 2026",
  },
  {
    severity: "Notable",
    dimensionDot: "var(--dim-I2)",
    dimensionKey: "I2",
    title: "Ingrained in Culture — Value Associations",
    body: 'New association "clean beauty" emerging. Not yet in brand-owned messaging.',
    timestamp: "Mar 3, 2026",
  },
];

const filters: ("All" | Severity)[] = ["All", "Critical", "Positive", "Notable"];

const severityColors: Record<Severity, string> = {
  Critical: "var(--color-negative)",
  Positive: "var(--color-positive)",
  Notable: "var(--color-neutral)",
};

export function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | Severity>("All");

  const filtered =
    activeFilter === "All"
      ? alerts
      : alerts.filter((a) => a.severity === activeFilter);

  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        height: 900,
        width: "100%",
        gap: 12,
        overflow: "auto",
      }}
    >
      {/* Row 1 — Top bar */}
      <div
        className="flex items-center justify-between"
        style={{ flexShrink: 0 }}
      >
        <CategoryBrandSelector />
        <DateModeSelector />
      </div>

      {/* Row 2 — Filter Bar */}
      <div
        className="flex items-center gap-3"
        style={{ flexShrink: 0 }}
      >
        <div
          className="flex items-center"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderRadius: "var(--radius-pill)",
            padding: 3,
            border: "1px solid var(--border-subtle)",
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-pill)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: activeFilter === f ? 600 : 400,
                backgroundColor:
                  activeFilter === f ? "var(--bg-card-hover)" : "transparent",
                color:
                  activeFilter === f
                    ? "var(--text-primary)"
                    : "var(--text-muted)",
                transition: "all 0.2s ease",
                boxShadow:
                  activeFilter === f ? "var(--shadow-card)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          className="flex items-center gap-2"
          style={{
            padding: "6px 14px",
            borderRadius: "var(--radius-pill)",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-card)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--text-secondary)",
          }}
        >
          All Dimensions
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Row 3 — Alert cards */}
      <div
        className="flex flex-col"
        style={{ gap: 12 }}
      >
        {filtered.map((alert, i) => (
          <AlertCard key={i} alert={alert} />
        ))}
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: AlertData }) {
  const borderColor = severityColors[alert.severity];
  const navigate = useNavigate();

  return (
    <div
      className="relative"
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        padding: 16,
        borderLeft: `3px solid ${borderColor}`,
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: alert.dimensionDot,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {alert.title}
          </span>
        </div>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: borderColor,
            flexShrink: 0,
          }}
        />
      </div>

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          margin: 0,
          paddingLeft: 18,
        }}
      >
        {alert.body}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between"
        style={{ paddingLeft: 18 }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          {alert.timestamp}
        </span>
        <span
          onClick={() => navigate(`/deep-dive/${alert.dimensionKey}`)}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--accent-primary)",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          View dimension →
        </span>
      </div>
    </div>
  );
}