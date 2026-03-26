import { useState } from "react";
import { useDateMode } from "../contexts/date-mode-context";

export interface DimensionData {
  letter: string;
  name: string;
  score?: number;
  delta?: number;
  color: string;
  dimKey: string;
  selected?: boolean;
  flex?: boolean;
  fixedHeight?: number;
  onClick?: () => void;
  showConnector?: boolean;
  /** Live 7-point trend values (actual scores 0-100). When provided, overrides hardcoded sparklineData. */
  trendValues?: (number | null)[];
  /** Live score from Supabase. When provided, overrides the static score. */
  liveScore?: number | null;
  /** Live delta from Supabase. When provided, overrides the static delta. */
  liveDelta?: number | null;
}

// Fallback 7 data points per sparkline [inverted: lower value = visually higher = better trend]
const sparklineData: Record<string, number[]> = {
  I1: [28, 20, 18, 14, 10, 8, 10],
  C1: [30, 22, 18, 12, 8, 6, 8],
  O:  [26, 28, 20, 14, 10, 14, 6],
  N:  [24, 26, 20, 20, 16, 14, 16],
  I2: [28, 20, 24, 12, 8, 10, 10],
  C2: [12, 16, 14, 20, 22, 24, 26],
};

/** Fallback path using old inverted-value data (0-36 scale, lower=higher on screen) */
function buildSparklinePath(data: number[], width: number, height: number): string {
  if (data.length < 2) return "";
  const stepX = width / (data.length - 1);
  const maxVal = 36;
  const points = data.map((v, i) => ({ x: i * stepX, y: (v / maxVal) * height }));
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    d += ` C${prev.x + stepX * 0.4},${prev.y} ${curr.x - stepX * 0.4},${curr.y} ${curr.x},${curr.y}`;
  }
  return d;
}

/** Live path using actual scores (fixed 0-100 scale, higher=higher on screen). Nulls draw at physical bottom. */
function buildLiveSparklinePath(data: (number | null)[], width: number, height: number): string {
  if (data.length < 1) return "";
  const validVals = data.filter((v): v is number => v !== null);
  if (validVals.length === 0) return "";
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;
  // Fixed 0-100 scale so scores render at their true proportional height
  const yBottom = height - 1;
  const toX = (i: number) => data.length > 1 ? i * stepX : width / 2;
  const toY = (v: number) => height - 1 - (v / 100) * (height - 2);
  const parts: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    const y = v !== null ? toY(v) : yBottom;
    parts.push(`${i === 0 ? "M" : "L"}${toX(i).toFixed(2)},${y.toFixed(2)}`);
  }
  return parts.join(" ");
}

export function DimensionScoreCard({
  letter,
  name,
  score,
  delta,
  color,
  dimKey,
  selected = false,
  flex = false,
  fixedHeight,
  onClick,
  showConnector = false,
  trendValues,
  liveScore,
  liveDelta,
}: DimensionData) {
  const { getAxisLabels } = useDateMode();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  // Use live data only — show "—" while loading
  const displayScore: number | null = liveScore ?? null;
  const displayDelta: number | null = liveDelta ?? null;
  const isPositive = displayDelta === null || displayDelta >= 0;
  const svgW = 120;
  const svgH = 36;
  // Use live sparkline if provided, otherwise fall back to hardcoded
  const sparkPath = trendValues && trendValues.filter((v) => v !== null).length >= 1
    ? buildLiveSparklinePath(trendValues, svgW, svgH)
    : buildSparklinePath(sparklineData[dimKey] || sparklineData.I1, svgW, svgH);

  // Compute dot positions for live sparkline data (only non-null values get dots)
  // Uses same fixed 0-100 scale as buildLiveSparklinePath
  const sparkDots: { x: number; y: number; i: number }[] = (() => {
    if (!trendValues || trendValues.length < 1) return [];
    const validVals = trendValues.filter((v): v is number => v !== null);
    if (validVals.length === 0) return [];
    const stepX = trendValues.length > 1 ? svgW / (trendValues.length - 1) : 0;
    const toX = (i: number) => trendValues.length > 1 ? i * stepX : svgW / 2;
    const toY = (v: number) => svgH - 1 - (v / 100) * (svgH - 2);
    return trendValues
      .map((v, i) => v !== null ? { x: toX(i), y: toY(v), i } : null)
      .filter((pt): pt is { x: number; y: number; i: number } => pt !== null);
  })();

  const axisLabels = getAxisLabels();
  const n = trendValues?.length ?? axisLabels.length;

  const handleSparklineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const idx = Math.round(xRatio * (axisLabels.length - 1));
    setHoverIndex(Math.max(0, Math.min(axisLabels.length - 1, idx)));
  };

  return (
    <div style={{ position: "relative", flex: flex ? 1 : undefined, minWidth: flex ? 0 : undefined }}>
      <div
        className="relative transition-all duration-200"
        onClick={onClick}
        style={{
          width: flex ? "100%" : 200,
          height: fixedHeight,
          backgroundColor: selected ? `${color}12` : "var(--bg-card)",
          backdropFilter: `blur(var(--blur-glass))`,
          WebkitBackdropFilter: `blur(var(--blur-glass))`,
          borderRadius: "var(--radius-sm)",
          boxShadow: selected ? `0 0 0 2px ${color}` : "var(--shadow-card)",
          padding: 16,
          borderWidth: selected ? 2 : 1,
          borderStyle: "solid",
          borderColor: selected ? color : "var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 8,
          overflow: "hidden",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle gradient tint at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            background: `linear-gradient(to bottom, var(--text-muted)08, transparent)`,
            pointerEvents: "none",
            borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
          }}
        />

        {/* Top: dot + letter + name */}
        <div className="flex items-center gap-2 relative z-10">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "var(--text-secondary)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--text-primary)",
              fontWeight: 700,
              textTransform: "uppercase",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.3,
            }}
          >
            {name}
          </span>
        </div>

        {/* Middle: score + delta */}
        <div className="flex items-center gap-3 relative z-10">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 32,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            {displayScore ?? "—"}
          </span>
          {displayDelta !== null && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                padding: "2px 8px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: isPositive
                  ? "rgba(74, 102, 68, 0.10)"
                  : "rgba(184, 106, 84, 0.10)",
                color: isPositive ? "var(--color-positive)" : "var(--color-negative)",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {isPositive ? "▲" : "▼"} {Math.abs(displayDelta).toFixed(1)}
            </span>
          )}
        </div>

        {/* Bottom: sparkline with x-axis */}
        <div className="relative z-10" style={{ marginTop: "auto" }}>
          {/* Sparkline area */}
          <div
            style={{ height: 36, position: "relative" }}
            onMouseMove={handleSparklineMouseMove}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Hover tooltip */}
            {hoverIndex !== null && trendValues && (
              <div style={{
                position: "absolute",
                bottom: "calc(100% + 4px)",
                left: `${(hoverIndex / Math.max(n - 1, 1)) * 100}%`,
                transform: hoverIndex > (n - 1) / 2 ? "translateX(-100%)" : "translateX(0%)",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "3px 7px",
                boxShadow: "var(--shadow-card)",
                pointerEvents: "none",
                whiteSpace: "nowrap",
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)" }}>
                  {axisLabels[hoverIndex]}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--text-primary)" }}>
                  {trendValues?.[hoverIndex] != null ? Number(trendValues?.[hoverIndex]).toFixed(1) : "—"}
                </span>
              </div>
            )}
            {/* Main sparkline - clean line only, no dots */}
            <svg
              width="100%"
              height="36"
              viewBox={`0 0 ${svgW} ${svgH}`}
              preserveAspectRatio="none"
              style={{ display: "block", position: "relative", zIndex: 1 }}
            >
              <path
                d={sparkPath}
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
              {/* Hover indicator - subtle vertical line */}
              {hoverIndex !== null && (() => { const x = (hoverIndex / Math.max(n - 1, 1)) * svgW; return <line x1={x} y1={0} x2={x} y2={svgH} stroke="var(--text-secondary)" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />; })()}
            </svg>
          </div>
          {/* X-axis ticks & labels */}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 2 }}>
            {axisLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center" style={{ width: 0, position: "relative" }}>
                <div
                  style={{
                    width: 1,
                    height: 4,
                    backgroundColor: "var(--text-muted)",
                    opacity: 0.3,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 7,
                    color: "var(--text-muted)",
                    marginTop: 1,
                    textAlign: "center",
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const dimensionVariants: DimensionData[] = [
  { letter: "I", name: "Imprinted in AI",        color: "var(--dim-I1)", dimKey: "I1" },
  { letter: "C", name: "Capturing Attention",     color: "var(--dim-C1)", dimKey: "C1" },
  { letter: "O", name: "Openly Adored",           color: "var(--dim-O)",  dimKey: "O"  },
  { letter: "N", name: "Never Lost in Translation", color: "var(--dim-N)", dimKey: "N" },
  { letter: "I", name: "Ingrained in Culture",    color: "var(--dim-I2)", dimKey: "I2" },
  { letter: "C", name: "Chosen for a Reason",     color: "var(--dim-C2)", dimKey: "C2" },
];