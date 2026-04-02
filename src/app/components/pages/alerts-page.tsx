import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { useBasePath } from "../../hooks/use-base-path";
import { ChevronDown } from "lucide-react";
import { MobileHeader } from "../mobile-header";
import { supabase } from "../../../lib/supabase";
import { useBrand } from "../../contexts/brand-context";

type Severity = "Positive" | "Negative" | "Neutral";

interface AlertData {
  id: number;
  severity: Severity;
  dimensionDot: string;
  dimensionKey: string;
  title: string;
  body: string;
  timestamp: string;
}

const dimDotColors: Record<string, string> = {
  I1: "var(--dim-I1)",
  C1: "var(--dim-C1)",
  O:  "var(--dim-O)",
  N:  "var(--dim-N)",
  I2: "var(--dim-I2)",
  C2: "var(--dim-C2)",
};

function mapSeverity(raw: string): Severity {
  if (raw === "positive") return "Positive";
  if (raw === "neutral")  return "Neutral";
  return "Negative"; // "negative" → Negative
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const filters: ("All" | Severity)[] = ["All", "Positive", "Negative", "Neutral"];

const severityColors: Record<Severity, string> = {
  Positive: "var(--color-positive)",
  Negative: "var(--color-negative)",
  Neutral:  "var(--color-neutral)",
};

const legendItems: { label: string; color: string }[] = [
  { label: "Positive", color: "var(--color-positive)" },
  { label: "Negative", color: "var(--color-negative)" },
  { label: "Neutral",  color: "var(--color-neutral)"  },
];

export function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | Severity>("All");
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const { mainBrand, selectedCategory } = useBrand();
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  useEffect(() => {
    setAlerts([]);
    async function load() {
      const { data } = await supabase
        .from("iconic_alerts")
        .select("id, brand_name, page_key, alert_severity, alert_title, alert_body, alert_created_at")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .order("alert_created_at", { ascending: false });

      if (!data?.length) return;

      setAlerts(
        data.map((row) => ({
          id:           row.id,
          severity:     mapSeverity(row.alert_severity),
          dimensionDot: dimDotColors[row.page_key] ?? "var(--text-muted)",
          dimensionKey: row.page_key,
          title:        row.alert_title,
          body:         row.alert_body,
          timestamp:    formatTimestamp(row.alert_created_at),
        }))
      );
    }
    load();
  }, [mainBrand, selectedCategory]);

  const filtered =
    activeFilter === "All"
      ? alerts
      : alerts.filter((a) => a.severity === activeFilter);

  return (
    <>
      <MobileHeader title="Alerts" onMenuClick={openMobileMenu} />
      <div
        className="flex flex-col"
        style={{
          padding: "16px",
          minHeight: "100%",
          width: "100%",
          gap: 12,
        }}
      >
        {/* Row 2 — Filter Bar + Legend */}
        <div
          className="flex items-center justify-between flex-wrap gap-3"
          style={{ flexShrink: 0 }}
        >
          {/* Left: severity pill filter + dimension dropdown */}
          <div className="flex items-center gap-3 flex-wrap">
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

          {/* Right: colour legend */}
          <div className="flex items-center gap-4">
            {legendItems.map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--text-muted)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 — Alert cards */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          {filtered.length === 0 ? (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--text-muted)",
                paddingTop: 8,
              }}
            >
              No alerts found.
            </span>
          ) : (
            filtered.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

function AlertCard({ alert }: { alert: AlertData }) {
  const borderColor = severityColors[alert.severity];
  const navigate = useNavigate();
  const base = useBasePath();

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        padding: 16,
        borderTop: "1px solid var(--border-subtle)",
        borderRight: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        borderLeft: `3px solid ${borderColor}`,
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
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
          onClick={() => navigate(`${base}/deep-dive/${alert.dimensionKey}`)}
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
