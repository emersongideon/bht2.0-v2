import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";

interface PanelAlert {
  id: number;
  severityColor: string;
  dotColor: string;
  dimension: string;
  text: string;
  time: string;
}

const dimDotColors: Record<string, string> = {
  I1: "var(--dim-I1)",
  C1: "var(--dim-C1)",
  O:  "var(--dim-O)",
  N:  "var(--dim-N)",
  I2: "var(--dim-I2)",
  C2: "var(--dim-C2)",
};

const severityColorMap: Record<string, string> = {
  positive: "var(--color-positive)",
  negative: "var(--color-negative)",
  neutral:  "var(--color-neutral)",
};

function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60)  return diffMins <= 1 ? "Just now" : `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)   return `${diffDays} days ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function AlertsPanel() {
  const { mainBrand, selectedCategory } = useBrand();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<PanelAlert[]>([]);

  useEffect(() => {
    setAlerts([]);
    async function load() {
      const { data } = await supabase
        .from("iconic_alerts")
        .select("id, page_key, alert_severity, alert_title, alert_body, alert_created_at")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .order("alert_created_at", { ascending: false })
        .limit(5);

      if (!data?.length) return;

      setAlerts(
        data.map((row) => ({
          id:            row.id,
          severityColor: severityColorMap[row.alert_severity] ?? "var(--color-neutral)",
          dotColor:      dimDotColors[row.page_key] ?? "var(--text-muted)",
          dimension:     row.alert_title,
          text:          row.alert_body,
          time:          formatRelativeTime(row.alert_created_at),
        }))
      );
    }
    load();
  }, [mainBrand, selectedCategory]);

  return (
    <div
      className="relative w-full md:w-[280px]"
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-subtle)" }}
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
        <span
          onClick={() => navigate("/alerts")}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--accent-primary)",
            cursor: "pointer",
          }}
        >
          See all →
        </span>
      </div>

      {/* Alert items */}
      {alerts.length === 0 ? (
        <div
          style={{
            padding: "20px 16px",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          No alerts yet.
        </div>
      ) : (
        alerts.map((alert, i) => (
          <div
            key={alert.id}
            className="flex flex-col gap-1 relative"
            style={{
              padding: "10px 16px 10px 13px",
              borderLeft: `3px solid ${alert.severityColor}`,
              minHeight: 60,
              justifyContent: "center",
              borderBottom: i < alerts.length - 1 ? "1px solid var(--border-subtle)" : "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/alerts")}
          >
            <div className="flex items-center gap-2">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: alert.dotColor,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {alert.dimension}
              </span>
            </div>
            <div className="flex items-center justify-between" style={{ paddingLeft: 14 }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "var(--text-secondary)",
                }}
              >
                {alert.text}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  marginLeft: 8,
                }}
              >
                {alert.time}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
