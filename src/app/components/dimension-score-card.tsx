import { useDateMode } from "../contexts/date-mode-context";

export interface DimensionData {
  letter: string;
  name: string;
  score: number;
  delta: number;
  color: string;
  dimKey: string;
  selected?: boolean;
  flex?: boolean;
  fixedHeight?: number;
  onClick?: () => void;
  showConnector?: boolean;
}

// 7 data points per sparkline [values 0-36 range]
const sparklineData: Record<string, number[]> = {
  I1: [28, 20, 18, 14, 10, 8, 10],
  C1: [30, 22, 18, 12, 8, 6, 8],
  O:  [26, 28, 20, 14, 10, 14, 6],
  N:  [24, 26, 20, 20, 16, 14, 16],
  I2: [28, 20, 24, 12, 8, 10, 10],
  C2: [12, 16, 14, 20, 22, 24, 26],
};

// X-axis labels based on date mode
const dailyLabels = ["1", "2", "3", "4", "5", "6", "7"];
const rolling30Labels = ["Feb 5", "Feb 9", "Feb 13", "Feb 17", "Feb 21", "Feb 25", "Mar 1"];
const monthlyLabels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

function buildSparklinePath(data: number[], width: number, height: number): string {
  if (data.length < 2) return "";
  const stepX = width / (data.length - 1);
  const maxVal = 36;
  const points = data.map((v, i) => ({
    x: i * stepX,
    y: (v / maxVal) * height,
  }));
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + stepX * 0.4;
    const cpx2 = curr.x - stepX * 0.4;
    d += ` C${cpx1},${prev.y} ${cpx2},${curr.y} ${curr.x},${curr.y}`;
  }
  return d;
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
}: DimensionData) {
  const { dateMode } = useDateMode();
  const isPositive = delta >= 0;
  const data = sparklineData[dimKey] || sparklineData.I1;
  const svgW = 120;
  const svgH = 36;
  const sparkPath = buildSparklinePath(data, svgW, svgH);

  // Get appropriate labels based on date mode
  const axisLabels = 
    dateMode === "Daily" ? dailyLabels :
    dateMode === "Rolling 30" ? rolling30Labels :
    monthlyLabels;

  return (
    <div style={{ position: "relative", flex: flex ? 1 : undefined, minWidth: flex ? 0 : undefined }}>
      <div
        className="relative transition-all duration-200"
        onClick={onClick}
        style={{
          width: flex ? "100%" : 200,
          height: fixedHeight,
          backgroundColor: "var(--bg-card)",
          backdropFilter: `blur(var(--blur-glass))`,
          WebkitBackdropFilter: `blur(var(--blur-glass))`,
          borderRadius: "var(--radius-sm)",
          boxShadow: "var(--shadow-card)",
          padding: 16,
          borderLeft: selected ? `3px solid ${color}` : undefined,
          border: selected ? undefined : "1px solid var(--border-subtle)",
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
            background: `linear-gradient(to bottom, ${color}10, transparent)`,
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
              backgroundColor: color,
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
            {score}
          </span>
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
            {isPositive ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}
          </span>
        </div>

        {/* Bottom: sparkline with x-axis */}
        <div className="relative z-10" style={{ marginTop: "auto" }}>
          {/* Sparkline area */}
          <div style={{ height: 36, position: "relative" }}>
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
                    fontFamily: "var(--font-body)",
                    fontSize: 8,
                    color: "var(--text-muted)",
                    marginTop: 1,
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
  { letter: "I", name: "Imprinted in AI", score: 74, delta: 2.8, color: "var(--dim-I1)", dimKey: "I1" },
  { letter: "C", name: "Capturing Attention", score: 82, delta: 3.1, color: "var(--dim-C1)", dimKey: "C1" },
  { letter: "O", name: "Openly Adored", score: 85, delta: 1.6, color: "var(--dim-O)", dimKey: "O" },
  { letter: "N", name: "Never Lost in Translation", score: 71, delta: 0.9, color: "var(--dim-N)", dimKey: "N" },
  { letter: "I", name: "Ingrained in Culture", score: 78, delta: 2.3, color: "var(--dim-I2)", dimKey: "I2" },
  { letter: "C", name: "Chosen for a Reason", score: 66, delta: -1.2, color: "var(--dim-C2)", dimKey: "C2" },
];