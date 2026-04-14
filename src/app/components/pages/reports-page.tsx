import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useReportWeeks, useReportBrands } from "../../hooks/use-reports";

// Fetches the report template HTML from public/report-template.html once
let cachedTemplate: string | null = null;
async function getTemplate(): Promise<string> {
  if (cachedTemplate) return cachedTemplate;
  const res = await fetch("/report-template.html");
  cachedTemplate = await res.text();
  return cachedTemplate;
}

export function ReportsPage() {
  const { weeks, loading: weeksLoading } = useReportWeeks();
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [weekOpen, setWeekOpen] = useState(false);
  const { brands, loading: brandsLoading } = useReportBrands(selectedWeek);
  const [srcdoc, setSrcdoc] = useState<string>("");

  // Auto-select the most recent week when weeks load
  useEffect(() => {
    if (weeks.length > 0 && !selectedWeek) {
      setSelectedWeek(weeks[0]);
    }
  }, [weeks, selectedWeek]);

  // Rebuild srcdoc whenever template or brands change
  useEffect(() => {
    if (brandsLoading) return; // wait for real data before rendering
    getTemplate().then((html) => {
      const injection = `<script>window.__REPORT_BRANDS__ = ${JSON.stringify(brands)};<\/script>`;
      setSrcdoc(html.replace("</body>", injection + "</body>"));
    });
  }, [brands, brandsLoading]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-surface)",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          flexShrink: 0,
          padding: "16px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: "var(--bg-card)",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              color: "var(--text-primary)",
              marginBottom: 2,
            }}
          >
            Reports
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-muted)",
            }}
          >
            Weekly ICONIC brand health reports
          </p>
        </div>

        {/* Week selector */}
        <div style={{ marginLeft: "auto", position: "relative" }}>
          <button
            onClick={() => setWeekOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              cursor: "pointer",
              minWidth: 180,
              justifyContent: "space-between",
            }}
          >
            <span>
              {weeksLoading
                ? "Loading…"
                : selectedWeek ?? (weeks.length === 0 ? "No reports yet" : "Select week")}
            </span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {weekOpen && weeks.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                zIndex: 200,
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-card)",
                minWidth: 200,
                maxHeight: 280,
                overflowY: "auto",
              }}
            >
              {weeks.map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    setSelectedWeek(w);
                    setWeekOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 14px",
                    textAlign: "left",
                    background: w === selectedWeek
                      ? "color-mix(in srgb, var(--accent-primary) 10%, transparent)"
                      : "transparent",
                    color: w === selectedWeek ? "var(--accent-primary)" : "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    border: "none",
                    cursor: "pointer",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                  onMouseEnter={(e) => { if (w !== selectedWeek) e.currentTarget.style.backgroundColor = "var(--card-hover)"; }}
                  onMouseLeave={(e) => { if (w !== selectedWeek) e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {w}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty state — no weeks found */}
      {!weeksLoading && weeks.length === 0 && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)" }}>
            No reports found for this category yet.
          </p>
        </div>
      )}

      {/* Loading state */}
      {(weeksLoading || (selectedWeek && brandsLoading)) && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
            Loading report…
          </p>
        </div>
      )}

      {/* Report iframe — driven entirely by srcdoc state */}
      {selectedWeek && !brandsLoading && srcdoc && (
        <iframe
          key={srcdoc.length} // force remount when content changes
          title="ICONIC Brand Report"
          srcDoc={srcdoc}
          style={{ flex: 1, border: "none", width: "100%" }}
          sandbox="allow-scripts allow-same-origin"
        />
      )}
    </div>
  );
}
