import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, ArrowUpRight, TrendingUp, TrendingDown, Minus, Download, Image } from "lucide-react";
import { useReportSummaries, useReportBrand } from "../../hooks/use-reports";
import type { ReportSummary } from "../../hooks/use-reports";

// ── Template cache ────────────────────────────────────────────────────────────
let cachedTemplate: string | null = null;
async function getTemplate(): Promise<string> {
  if (cachedTemplate) return cachedTemplate;
  const res = await fetch("/report-template.html");
  cachedTemplate = await res.text();
  return cachedTemplate;
}

// ── html2canvas cache (fetched once, injected inline into srcdoc) ─────────────
// Inlining avoids CDN blocks in sandboxed srcdoc iframes.
let cachedH2C: string | null = null;
async function getHtml2Canvas(): Promise<string> {
  if (cachedH2C) return cachedH2C;
  const res = await fetch("https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js");
  cachedH2C = await res.text();
  return cachedH2C;
}

// ── Filter dropdown ───────────────────────────────────────────────────────────
function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 12px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-subtle)",
          backgroundColor: value !== "All" ? "color-mix(in srgb, var(--accent-primary) 8%, transparent)" : "var(--bg-card)",
          color: value !== "All" ? "var(--accent-primary)" : "var(--text-primary)",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          cursor: "pointer",
          minWidth: 140,
          justifyContent: "space-between",
          whiteSpace: "nowrap",
        }}
      >
        <span>{value === "All" ? label : value}</span>
        <ChevronDown size={13} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            zIndex: 300,
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-card)",
            minWidth: 180,
            maxHeight: 260,
            overflowY: "auto",
          }}
        >
          {["All", ...options].map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                padding: "9px 12px",
                textAlign: "left",
                background: opt === value
                  ? "color-mix(in srgb, var(--accent-primary) 10%, transparent)"
                  : "transparent",
                color: opt === value ? "var(--accent-primary)" : "var(--text-primary)",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                border: "none",
                cursor: "pointer",
                borderBottom: "1px solid var(--border-subtle)",
              }}
              onMouseEnter={(e) => { if (opt !== value) e.currentTarget.style.backgroundColor = "var(--card-hover)"; }}
              onMouseLeave={(e) => { if (opt !== value) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Report card ───────────────────────────────────────────────────────────────
function ReportCard({ summary, onClick }: { summary: ReportSummary; onClick: () => void }) {
  const deltaColor =
    summary.delta > 0 ? "var(--positive)" :
    summary.delta < 0 ? "var(--negative)" :
    "var(--text-muted)";
  const DeltaIcon =
    summary.delta > 0 ? TrendingUp :
    summary.delta < 0 ? TrendingDown :
    Minus;

  // Format week label: "W4_22Mar-28Mar" → "W4 · 22 Mar – 28 Mar"
  const weekDisplay = summary.week
    .replace(/_/, " · ")
    .replace(/-/, "–");

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "18px 20px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
        e.currentTarget.style.borderColor = "var(--accent-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--border-subtle)";
      }}
    >
      {/* Arrow icon */}
      <div style={{ position: "absolute", top: 14, right: 14, color: "var(--text-muted)" }}>
        <ArrowUpRight size={14} />
      </div>

      {/* Brand name */}
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 3,
          }}
        >
          {summary.brand}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          {weekDisplay}
        </div>
      </div>

      {/* Score row */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 26,
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            {summary.score.toFixed(1)}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>
            ICONIC Score
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            color: deltaColor,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          <DeltaIcon size={12} />
          {summary.delta > 0 ? "+" : ""}{summary.delta.toFixed(1)}
        </div>
      </div>

      {/* Rank badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "3px 8px",
          borderRadius: "var(--radius-pill)",
          backgroundColor: "color-mix(in srgb, var(--accent-primary) 10%, transparent)",
          color: "var(--accent-primary)",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 600,
          alignSelf: "flex-start",
        }}
      >
        #{summary.rank} this week
      </div>
    </div>
  );
}

// ── Report viewer modal ───────────────────────────────────────────────────────
function ReportViewer({
  brand,
  week,
  onClose,
}: {
  brand: string;
  week: string;
  onClose: () => void;
}) {
  const { brand: templateBrand, loading } = useReportBrand(brand, week);
  const [srcdoc, setSrcdoc] = useState<string>("");
  const [pngLoading, setPngLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDownloadPDF = () => {
    iframeRef.current?.contentWindow?.print();
  };

  const handleDownloadPNG = async () => {
    const win = iframeRef.current?.contentWindow as any;
    if (!win?.downloadPNG) return;
    setPngLoading(true);
    try {
      const filename = `${brand}-${week}-report.png`.replace(/\s+/g, "-").toLowerCase();
      await win.downloadPNG(filename);
    } finally {
      setPngLoading(false);
    }
  };

  useEffect(() => {
    if (loading || !templateBrand) return;
    Promise.all([getTemplate(), getHtml2Canvas()]).then(([html, h2cScript]) => {
      const injection =
        `<script>${h2cScript}<\/script>` +
        `<script>window.__REPORT_BRANDS__ = ${JSON.stringify([templateBrand])};<\/script>`;
      setSrcdoc(html.replace("<head>", "<head>" + injection));
    });
  }, [templateBrand, loading]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const weekDisplay = week.replace(/_/, " · ").replace(/-/, "–");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0,0,0,0.55)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          height: "90vh",
          backgroundColor: "var(--bg-card)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            flexShrink: 0,
            padding: "14px 20px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--text-primary)", fontWeight: 600 }}>
              {brand}
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)", marginLeft: 10 }}>
              {weekDisplay}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* PNG button */}
            <button
              onClick={handleDownloadPNG}
              disabled={!srcdoc || pngLoading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
                color: srcdoc ? "var(--text-primary)" : "var(--text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                cursor: srcdoc && !pngLoading ? "pointer" : "default",
                opacity: srcdoc && !pngLoading ? 1 : 0.5,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (srcdoc && !pngLoading) e.currentTarget.style.backgroundColor = "var(--card-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-surface)"; }}
            >
              <Image size={13} />
              {pngLoading ? "Generating…" : "Download PNG"}
            </button>
            {/* PDF button */}
            <button
              onClick={handleDownloadPDF}
              disabled={!srcdoc}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                backgroundColor: "var(--bg-surface)",
                color: srcdoc ? "var(--text-primary)" : "var(--text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: 12,
                cursor: srcdoc ? "pointer" : "default",
                opacity: srcdoc ? 1 : 0.5,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (srcdoc) e.currentTarget.style.backgroundColor = "var(--card-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-surface)"; }}
            >
              <Download size={13} />
              Download PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                padding: 4,
                borderRadius: "var(--radius-sm)",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Loading state */}
        {(loading || (!srcdoc && !loading)) && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
              {loading ? "Loading report…" : "No data found for this report."}
            </p>
          </div>
        )}

        {/* Report iframe */}
        {srcdoc && (
          <iframe
            ref={iframeRef}
            key={srcdoc.length}
            title={`${brand} ${week}`}
            srcDoc={srcdoc}
            style={{ flex: 1, border: "none", width: "100%" }}
            sandbox="allow-scripts allow-same-origin allow-modals"
          />
        )}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function ReportsPage() {
  const { summaries, allBrands, allWeeks, loading } = useReportSummaries();
  const [brandFilter, setBrandFilter] = useState("All");
  const [weekFilter, setWeekFilter]   = useState("All");
  const [openReport, setOpenReport]   = useState<{ brand: string; week: string } | null>(null);

  const filtered = summaries
    .filter((s) => brandFilter === "All" || s.brand === brandFilter)
    .filter((s) => weekFilter  === "All" || s.week  === weekFilter);

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
          gap: 12,
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
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>
            Weekly ICONIC brand health reports
          </p>
        </div>

        {/* Filters */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <FilterDropdown
            label="All Brands"
            value={brandFilter}
            options={allBrands}
            onChange={setBrandFilter}
          />
          <FilterDropdown
            label="All Weeks"
            value={weekFilter}
            options={allWeeks}
            onChange={setWeekFilter}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
              Loading reports…
            </p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)" }}>
              No reports found for this selection.
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {filtered.map((s) => (
              <ReportCard
                key={`${s.brand}__${s.week}`}
                summary={s}
                onClick={() => setOpenReport({ brand: s.brand, week: s.week })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Report viewer modal */}
      {openReport && (
        <ReportViewer
          brand={openReport.brand}
          week={openReport.week}
          onClose={() => setOpenReport(null)}
        />
      )}
    </div>
  );
}
