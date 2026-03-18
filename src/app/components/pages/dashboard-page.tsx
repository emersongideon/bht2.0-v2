import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { ArrowRight } from "lucide-react";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { IconicScoreRing } from "../iconic-score-ring";
import { DimensionScoreCard, dimensionVariants } from "../dimension-score-card";
import { AlertsPanel } from "../alerts-panel";
import { LiveFeedLatest } from "../live-feed-latest";
import { LiveFeedGreatest } from "../live-feed-greatest";
import { MobileHeader } from "../mobile-header";
import { useBrand } from "../../contexts/brand-context";
import { useDateMode } from "../../contexts/date-mode-context";
import { useAppData } from "../../data/app-data-context";
import { getBrandTrendValues } from "../../utils/brand-utils";

const CARD_HEIGHT = 175;
const GAP = 12;
const RING_HEIGHT = CARD_HEIGHT * 2 + GAP;

export function DashboardPage() {
  const [I1, C1, O, N, I2, C2] = dimensionVariants;
  const [selectedDim, setSelectedDim] = useState("I1");
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const { dateMode, selectedDate } = useDateMode();
  const { mainBrand, selectedCategory } = useBrand();

  const topRow = [I1, C1, O];
  const bottomRow = [N, I2, C2];
  const selectedData = dimensionVariants.find((d) => d.dimKey === selectedDim) || I1;

  const formatSubtitle = () => {
    const dateStr = selectedDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const modeStr = dateMode === "Rolling 30" ? "Rolling 30 Days" : dateMode;
    return `${selectedCategory} • ${mainBrand} • ${dateStr} (${modeStr})`;
  };

  return (
    <>
      <MobileHeader
        title="Dashboard Overview"
        subtitle={formatSubtitle()}
        onMenuClick={openMobileMenu}
      />
      <div
        className="flex flex-col"
        style={{
          padding: "16px",
          minHeight: "100%",
          width: "100%",
          gap: GAP,
        }}
      >
        {/* Row 1 — Top bar (Desktop only) */}
        <div className="hidden md:flex items-center justify-between" style={{ flexShrink: 0 }}>
          <CategoryBrandSelector />
          <DateModeSelector />
        </div>

        {/* Rows 2-3: ICONIC Ring + 6 Dimension Cards */}
        <div className="flex flex-col md:flex-row" style={{ gap: GAP, flexShrink: 0 }}>
          {/* ICONIC Ring — full width on mobile, fixed sidebar on desktop */}
          <div className="w-full md:w-[180px]" style={{ flexShrink: 0 }}>
            <IconicScoreRing height={RING_HEIGHT} />
          </div>

          {/* Dimension cards grid */}
          <div className="flex flex-col" style={{ flex: 1, minWidth: 0, gap: GAP }}>
            {/* Top row — stacks on mobile */}
            <div className="flex flex-col md:flex-row" style={{ gap: GAP }}>
              {topRow.map((dim) => (
                <DimensionScoreCard
                  key={dim.dimKey}
                  {...dim}
                  selected={selectedDim === dim.dimKey}
                  flex
                  fixedHeight={CARD_HEIGHT}
                  showConnector={selectedDim === dim.dimKey}
                  onClick={() => setSelectedDim(dim.dimKey)}
                />
              ))}
            </div>
            {/* Bottom row — stacks on mobile */}
            <div className="flex flex-col md:flex-row" style={{ gap: GAP }}>
              {bottomRow.map((dim) => (
                <DimensionScoreCard
                  key={dim.dimKey}
                  {...dim}
                  selected={selectedDim === dim.dimKey}
                  flex
                  fixedHeight={CARD_HEIGHT}
                  showConnector={selectedDim === dim.dimKey}
                  onClick={() => setSelectedDim(dim.dimKey)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Row 4 — Trend chart + Alerts (stacks on mobile) */}
        <div className="flex flex-col md:flex-row" style={{ gap: GAP }}>
          <div style={{ flex: 1, minWidth: 0, minHeight: 340 }}>
            <TrendChartFull selectedDim={selectedData} />
          </div>
          <div className="w-full md:w-[280px]" style={{ flexShrink: 0, minHeight: 340 }}>
            <AlertsPanel />
          </div>
        </div>

        {/* Row 5 — Live Feed Section (stacks on mobile) */}
        <div className="flex flex-col md:flex-row" style={{ gap: GAP }}>
          <div style={{ flex: 1, minWidth: 0, minHeight: 380 }}>
            <LiveFeedLatest />
          </div>
          <div style={{ flex: 1, minWidth: 0, minHeight: 380 }}>
            <LiveFeedGreatest />
          </div>
        </div>
      </div>
    </>
  );
}

/** Full-height trend chart that updates based on selected dimension */
function TrendChartFull({ selectedDim }: { selectedDim: { name: string; color: string; dimKey: string } }) {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { getAxisLabels } = useDateMode();
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();

  const axisLabels = getAxisLabels();
  const categoryBrands = brandsByCategory[selectedCategory] ?? [];

  const lines = [
    ...categoryBrands.filter(b => b.name === mainBrand && selectedBrands.includes(b.name)),
    ...categoryBrands.filter(b => b.name !== mainBrand && selectedBrands.includes(b.name)),
  ].map(b => ({
    name: b.name,
    color: b.color,
    values: getBrandTrendValues(b.name),
    isMainBrand: b.name === mainBrand,
    width: b.name === mainBrand ? 2.5 : 1.5,
  }));

  const yMin = 35;
  const yMax = 85;
  const yTicks = [40, 50, 60, 70, 80];
  const chartHeight = 180;

  const toXPct = (i: number) => (i / (axisLabels.length - 1)) * 100;
  const toYPct = (v: number) => ((yMax - v) / (yMax - yMin)) * 100;
  const toYPx = (v: number) => (toYPct(v) / 100) * chartHeight;

  const buildPath = (values: number[]) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"}${toXPct(i).toFixed(2)},${toYPct(v).toFixed(2)}`).join(" ");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const idx = Math.round(xRatio * (axisLabels.length - 1));
    setHoverIndex(Math.max(0, Math.min(axisLabels.length - 1, idx)));
  };

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: 20,
        border: "1px solid var(--border-subtle)",
        height: "100%",
      }}
    >
      {/* Caption */}
      <div className="flex items-center gap-2" style={{ marginBottom: 4, flexShrink: 0 }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-muted)" }}>
          Showing:
        </span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: selectedDim.color, flexShrink: 0 }} />
        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>
          {selectedDim.name}
        </span>
      </div>

      {/* Brand legend + nav arrow */}
      <div className="flex items-center justify-between" style={{ marginBottom: 12, flexShrink: 0 }}>
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          {lines.map((line) => (
            <div key={line.name} className="flex items-center gap-1 md:gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: line.color }} />
              <span style={{ fontWeight: line.isMainBrand ? 700 : 400, whiteSpace: "nowrap" }}>{line.name}</span>
            </div>
          ))}
        </div>

        {/* Arrow — desktop only */}
        <div className="hidden md:block" style={{ position: "relative" }}>
          <button
            onClick={() => navigate(`/deep-dive/${selectedDim.dimKey}`)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, transition: "background-color 0.2s" }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-secondary)"; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <ArrowRight size={16} color="var(--text-secondary)" />
          </button>
          {showTooltip && (
            <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 4, backgroundColor: "var(--text-primary)", color: "#FFFFFF", padding: "6px 10px", borderRadius: 6, fontSize: 12, fontFamily: "var(--font-body)", whiteSpace: "nowrap", zIndex: 1000, boxShadow: "var(--shadow-lg)" }}>
              Go to "{selectedDim.name}" deep dive
            </div>
          )}
        </div>
      </div>

      {/* Chart: Y-axis + plot */}
      <div className="flex" style={{ flex: 1, minHeight: 0 }}>
        {/* Y-axis labels */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: chartHeight, paddingRight: 8, flexShrink: 0 }}>
          {[...yTicks].reverse().map((tick) => (
            <span key={tick} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", textAlign: "right", lineHeight: "1" }}>
              {tick}
            </span>
          ))}
        </div>

        {/* Plot area */}
        <div
          style={{ flex: 1, position: "relative", height: chartHeight }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
            {yTicks.map((tick) => (
              <line key={tick} x1="0" y1={toYPct(tick)} x2="100" y2={toYPct(tick)} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            ))}
            {lines.map((line) => (
              <path key={line.name} d={buildPath(line.values)} fill="none" stroke={line.color} strokeWidth={line.isMainBrand ? 2.5 : line.width} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" opacity={line.isMainBrand ? 1 : 0.8} />
            ))}
            {hoverIndex !== null && (
              <line x1={toXPct(hoverIndex)} y1="0" x2={toXPct(hoverIndex)} y2="100" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3,3" vectorEffect="non-scaling-stroke" />
            )}
          </svg>

          {/* Hover dots */}
          {hoverIndex !== null && lines.map((line) => (
            <div key={`dot-${line.name}`} style={{ position: "absolute", left: `${toXPct(hoverIndex)}%`, top: toYPx(line.values[hoverIndex]), width: line.isMainBrand ? 8 : 6, height: line.isMainBrand ? 8 : 6, borderRadius: "50%", backgroundColor: line.color, transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
          ))}

          {/* Hover tooltip */}
          {hoverIndex !== null && (
            <div style={{ position: "absolute", left: `${toXPct(hoverIndex)}%`, top: 8, transform: hoverIndex > axisLabels.length / 2 ? "translateX(-105%)" : "translateX(5%)", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-card)", padding: "10px 14px", zIndex: 10, pointerEvents: "none", minWidth: 160 }}>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, borderBottom: "1px solid var(--border-subtle)", paddingBottom: 6 }}>
                {axisLabels[hoverIndex]}
              </div>
              {lines.map((line) => (
                <div key={line.name} className="flex items-center justify-between" style={{ marginBottom: 4, gap: 12 }}>
                  <div className="flex items-center gap-1.5">
                    <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: line.color }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-primary)", fontWeight: line.isMainBrand ? 700 : 400 }}>{line.name}</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-secondary)", fontWeight: line.isMainBrand ? 700 : 400 }}>{line.values[hoverIndex]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex items-center justify-between" style={{ marginLeft: 32, marginTop: 6, flexShrink: 0 }}>
        {axisLabels.map((label, i) => (
          <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.2 }}>
            {label}
          </span>
        ))}
      </div>

      {/* Mobile "Go to Deep Dive" button */}
      <button
        onClick={() => navigate(`/deep-dive/${selectedDim.dimKey}`)}
        className="md:hidden flex items-center justify-center gap-2"
        style={{ marginTop: 12, padding: "10px 16px", backgroundColor: "var(--accent-primary)", color: "#FFFFFF", border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, transition: "opacity 0.2s" }}
        onMouseOver={(e) => { e.currentTarget.style.opacity = "0.9"; }}
        onMouseOut={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        Go to "{selectedDim.name}" Deep Dive
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
