import { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { ArrowRight } from "lucide-react";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { useDateMode } from "../../contexts/date-mode-context";
import { useBrand } from "../../contexts/brand-context";
import { useAppData } from "../../data/app-data-context";
import { supabase } from "../../../lib/supabase";
import { computeAxisDates, toISODateString } from "../../utils/date-utils";
import type { DateMode } from "../../utils/date-utils";
import { IconicScoreRing } from "../iconic-score-ring";
import { DimensionScoreCard, dimensionVariants } from "../dimension-score-card";
import { AlertsPanel } from "../alerts-panel";
import { LiveFeedLatest } from "../live-feed-latest";
import { LiveFeedGreatest } from "../live-feed-greatest";
import { MobileHeader } from "../mobile-header";

const CARD_HEIGHT = 175;
const GAP = 12;
const RING_HEIGHT = CARD_HEIGHT * 2 + GAP;
const PAGE_KEYS = ["I1", "C1", "O", "N", "I2", "C2"] as const;

type DimLiveData = Record<string, { score: number | null; delta: number | null; trendValues: (number | null)[] }>;

type ScoreDimRow = { date: string; page_key: string; daily_dimension_score: number };

function shiftDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function avgDimRows(rows: ScoreDimRow[], from: string, to: string, key: string): number | null {
  const filtered = rows.filter((r) => r.page_key === key && r.date >= from && r.date <= to);
  if (!filtered.length) return null;
  return filtered.reduce((s, r) => s + r.daily_dimension_score, 0) / filtered.length;
}

function round1(n: number) { return Math.round(n * 10) / 10; }

function useDimensionScores(): DimLiveData {
  const { mainBrand, selectedCategory } = useBrand();
  const { dateMode, selectedDate } = useDateMode();
  const [liveData, setLiveData] = useState<DimLiveData>({});

  useEffect(() => {
    async function load() {
      const todayISO = toISODateString(selectedDate);
      const mode = dateMode as DateMode;
      let fetchFrom: string;
      let fetchTo: string = todayISO;

      if (mode === "Daily") {
        fetchFrom = toISODateString(shiftDays(selectedDate, -7)); // 7 days + 1 for delta
      } else if (mode === "Rolling 30") {
        fetchFrom = toISODateString(shiftDays(selectedDate, -65)); // 60d for delta + 6 extra for sparkline
      } else {
        // Monthly: sparkline needs 7 months back, delta needs prev month
        fetchFrom = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 7, 1));
        fetchTo = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0));
      }

      const { data } = await supabase
        .from("iconic_dimension_scores")
        .select("date, page_key, daily_dimension_score")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .in("page_key", PAGE_KEYS as unknown as string[])
        .gte("date", fetchFrom)
        .lte("date", fetchTo)
        .order("date", { ascending: true });

      if (!data?.length) return;

      const axisDates = computeAxisDates(mode, selectedDate);
      const result: DimLiveData = {};

      for (const dimKey of PAGE_KEYS) {
        const rows = data.filter((r) => r.page_key === dimKey) as ScoreDimRow[];

        // Score + delta
        let cur: number | null = null;
        let prev: number | null = null;

        if (mode === "Daily") {
          const todayRow = rows.find((r) => r.date === todayISO);
          const yestISO = toISODateString(shiftDays(selectedDate, -1));
          const yestRow = rows.find((r) => r.date === yestISO);
          cur = todayRow?.daily_dimension_score ?? null;
          prev = yestRow?.daily_dimension_score ?? null;
        } else if (mode === "Rolling 30") {
          const start30 = toISODateString(shiftDays(selectedDate, -29));
          const prevStart = toISODateString(shiftDays(selectedDate, -59));
          const prevEnd = toISODateString(shiftDays(selectedDate, -30));
          cur = avgDimRows(rows, start30, todayISO, dimKey);
          prev = avgDimRows(rows, prevStart, prevEnd, dimKey);
        } else {
          const currStart = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
          const currEnd = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0));
          const prevStart = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
          const prevEnd = toISODateString(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0));
          cur = avgDimRows(rows, currStart, currEnd, dimKey);
          prev = avgDimRows(rows, prevStart, prevEnd, dimKey);
        }

        // Sparkline: one value per axis date
        const trendValues: (number | null)[] = axisDates.map((axisDate) => {
          const axisISO = toISODateString(axisDate);
          if (mode === "Daily") {
            const row = rows.find((r) => r.date === axisISO);
            return row?.daily_dimension_score ?? null;
          } else if (mode === "Rolling 30") {
            const from30 = toISODateString(shiftDays(axisDate, -29));
            return avgDimRows(rows, from30, axisISO, dimKey) ?? null;
          } else {
            const mStart = toISODateString(new Date(axisDate.getFullYear(), axisDate.getMonth(), 1));
            const mEnd = toISODateString(new Date(axisDate.getFullYear(), axisDate.getMonth() + 1, 0));
            return avgDimRows(rows, mStart, mEnd, dimKey) ?? null;
          }
        });

        result[dimKey] = {
          score: cur !== null ? round1(cur) : null,
          delta: cur !== null && prev !== null ? round1(cur - prev) : null,
          trendValues,
        };
      }

      setLiveData(result);
    }

    load();
  }, [mainBrand, selectedCategory, dateMode, selectedDate]);

  return liveData;
}

export function DashboardPage() {
  const [selectedDim, setSelectedDim] = useState("I1");
  const trendChartRef = useRef<HTMLDivElement>(null);
  const { openMobileMenu, scrollContainerRef } = useOutletContext<{ openMobileMenu: () => void; scrollContainerRef: React.RefObject<HTMLDivElement> }>();
  const { dateMode, selectedDate } = useDateMode();
  const { mainBrand, selectedCategory } = useBrand();
  const dimLive = useDimensionScores();

  // Merge live Supabase data into dimensionVariants for rendering
  const liveDims = dimensionVariants.map((dim) => ({
    ...dim,
    liveScore: dimLive[dim.dimKey]?.score ?? null,
    liveDelta: dimLive[dim.dimKey]?.delta ?? null,
    trendValues: dimLive[dim.dimKey]?.trendValues,
  }));
  const [I1, C1, O, N, I2, C2] = liveDims;

  const topRow = [I1, C1, O];
  const bottomRow = [N, I2, C2];
  const selectedData = dimensionVariants.find((d) => d.dimKey === selectedDim) || I1;

  // Format the subtitle with category, brand, and timeframe
  const formatSubtitle = () => {
    const category = selectedCategory;
    const dateStr = selectedDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const modeStr = dateMode === "Rolling 30" ? "Rolling 30 Days" : dateMode;
    return `${category} • ${mainBrand} • ${dateStr} (${modeStr})`;
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
          {/* ICONIC Ring — spans both rows on desktop, full width on mobile */}
          <div className="w-full md:w-[180px]" style={{ flexShrink: 0 }}>
            <IconicScoreRing height={window.innerWidth >= 768 ? RING_HEIGHT : undefined} />
          </div>

          {/* Dimension cards grid */}
          <div className="flex flex-col" style={{ flex: 1, minWidth: 0, gap: GAP }}>
            {/* Top row - stacks on mobile */}
            <div className="flex flex-col md:flex-row" style={{ gap: GAP }}>
              {topRow.map((dim) => (
                <DimensionScoreCard
                  key={dim.dimKey}
                  {...dim}
                  selected={selectedDim === dim.dimKey}
                  flex
                  fixedHeight={CARD_HEIGHT}
                  showConnector={selectedDim === dim.dimKey}
                  onClick={() => {
                    setSelectedDim(dim.dimKey);
                    if (window.innerWidth < 768) {
                      setTimeout(() => {
                        const el = trendChartRef.current;
                        const container = scrollContainerRef.current;
                        if (el && container) {
                          const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 80;
                          container.scrollTo({ top, behavior: "smooth" });
                        }
                      }, 50);
                    }
                  }}
                />
              ))}
            </div>
            {/* Bottom row - stacks on mobile */}
            <div className="flex flex-col md:flex-row" style={{ gap: GAP }}>
              {bottomRow.map((dim) => (
                <DimensionScoreCard
                  key={dim.dimKey}
                  {...dim}
                  selected={selectedDim === dim.dimKey}
                  flex
                  fixedHeight={CARD_HEIGHT}
                  showConnector={selectedDim === dim.dimKey}
                  onClick={() => {
                    setSelectedDim(dim.dimKey);
                    if (window.innerWidth < 768) {
                      setTimeout(() => {
                        const el = trendChartRef.current;
                        const container = scrollContainerRef.current;
                        if (el && container) {
                          const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop - 80;
                          container.scrollTo({ top, behavior: "smooth" });
                        }
                      }, 50);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Row 4 — Trend chart + Alerts (stacks on mobile) */}
        <div className="flex flex-col md:flex-row" style={{ gap: GAP }}>
          <div ref={trendChartRef} style={{ flex: 1, minWidth: 0, minHeight: 340 }}>
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
  const { getAxisLabels, dateMode, selectedDate } = useDateMode();
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();
  const axisLabels = getAxisLabels();

  type BrandLine = { name: string; color: string; values: (number | null)[]; isMainBrand: boolean; width: number };
  const [brandLines, setBrandLines] = useState<BrandLine[]>([]);

  useEffect(() => {
    setBrandLines([]);
    async function load() {
      const axisDates = computeAxisDates(dateMode as DateMode, selectedDate);
      const lastAxis = axisDates[axisDates.length - 1];
      const toDateEnd = dateMode === "Monthly"
        ? new Date(lastAxis.getFullYear(), lastAxis.getMonth() + 1, 0)
        : lastAxis;
      // Rolling 30 needs extra history for the first axis point's 30-day window
      const fetchFrom = dateMode === "Rolling 30"
        ? toISODateString(new Date(axisDates[0].getTime() - 30 * 24 * 60 * 60 * 1000))
        : toISODateString(axisDates[0]);

      const { data } = await supabase
        .from("iconic_dimension_scores")
        .select("date, brand_name, daily_dimension_score")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .eq("page_key", selectedDim.dimKey)
        .gte("date", fetchFrom)
        .lte("date", toISODateString(toDateEnd))
        .order("date", { ascending: true });

      const colorMap: Record<string, string> = {};
      for (const b of (brandsByCategory[selectedCategory] ?? [])) colorMap[b.name] = b.color;

      const byBrand: Record<string, { date: string; daily_dimension_score: number }[]> = {};
      for (const row of data ?? []) {
        if (!byBrand[row.brand_name]) byBrand[row.brand_name] = [];
        byBrand[row.brand_name].push(row);
      }

      setBrandLines(selectedBrands.map(brandName => {
        const rows = byBrand[brandName] ?? [];
        const values: (number | null)[] = axisDates.map(axisDate => {
          const axisISO = toISODateString(axisDate);
          if (dateMode === "Daily") {
            return rows.find(r => r.date === axisISO)?.daily_dimension_score ?? null;
          } else if (dateMode === "Rolling 30") {
            const from30 = toISODateString(new Date(axisDate.getTime() - 29 * 24 * 60 * 60 * 1000));
            const f = rows.filter(r => r.date >= from30 && r.date <= axisISO);
            return f.length ? f.reduce((s, r) => s + r.daily_dimension_score, 0) / f.length : null;
          } else {
            const mStart = toISODateString(new Date(axisDate.getFullYear(), axisDate.getMonth(), 1));
            const mEnd = toISODateString(new Date(axisDate.getFullYear(), axisDate.getMonth() + 1, 0));
            const f = rows.filter(r => r.date >= mStart && r.date <= mEnd);
            return f.length ? f.reduce((s, r) => s + r.daily_dimension_score, 0) / f.length : null;
          }
        });
        return { name: brandName, color: colorMap[brandName] ?? "#B5ADA5", values, isMainBrand: brandName === mainBrand, width: brandName === mainBrand ? 2.5 : 1.5 };
      }));
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDim.dimKey, dateMode, selectedDate]);

  // Use live lines if loaded, else show empty placeholders while loading
  const lines: BrandLine[] = brandLines.length > 0 ? brandLines :
    (brandsByCategory[selectedCategory] ?? [])
      .filter(b => selectedBrands.includes(b.name))
      .map(b => ({ name: b.name, color: b.color, values: Array(axisLabels.length).fill(null) as (number | null)[], isMainBrand: b.name === mainBrand, width: b.name === mainBrand ? 2.5 : 1.5 }));

  // Dynamic Y scale based on actual data
  const allVals = lines.flatMap(l => l.values).filter((v): v is number => v !== null);
  const rawMin = allVals.length ? Math.min(...allVals) : 35;
  const rawMax = allVals.length ? Math.max(...allVals) : 85;
  const yMin = Math.max(0, Math.floor(rawMin - 5));
  const yMax = Math.ceil(rawMax + 5);
  const tickStep = (yMax - yMin) > 30 ? 10 : 5;
  const yTicks: number[] = [];
  for (let t = Math.ceil(yMin / tickStep) * tickStep; t <= yMax; t += tickStep) yTicks.push(t);

  const chartHeight = 180;
  const toXPct = (i: number) => axisLabels.length > 1 ? (i / (axisLabels.length - 1)) * 100 : 50;
  const toYPct = (v: number) => ((yMax - v) / (yMax - yMin)) * 100;
  const toYPx = (v: number) => (toYPct(v) / 100) * chartHeight;
  const yBottomPct = toYPct(yMin);

  const buildPath = (values: (number | null)[]) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"}${toXPct(i).toFixed(2)},${(v !== null ? toYPct(v) : yBottomPct).toFixed(2)}`).join(" ");

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
      {/* Caption: "Showing: DimensionName" */}
      <div style={{ marginBottom: 4, flexShrink: 0 }}>
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17.6,
              color: "var(--text-muted)",
            }}
          >
            Showing:
          </span>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: selectedDim.color,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17.6,
              color: "var(--text-secondary)",
              fontWeight: 600,
            }}
          >
            {selectedDim.name}
          </span>
        </div>
        {/* Hint: desktop only */}
        <span
          className="hidden md:inline"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--text-muted)",
            opacity: 0.7,
          }}
        >
          ↑ Click a dimension card above to switch
        </span>
        {/* Hint: mobile only */}
        <span
          className="md:hidden inline"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--text-muted)",
            opacity: 0.7,
          }}
        >
          ↑ Tap a dimension card above to switch
        </span>
      </div>

      {/* Header: brand legend + nav arrow */}
      <div className="flex items-center justify-between" style={{ marginBottom: 12, flexShrink: 0 }}>
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          {lines.map((line) => (
            <div key={line.name} className="flex items-center gap-1 md:gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-secondary)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: line.color }} />
              <span style={{ fontWeight: line.isMainBrand ? 700 : 400, whiteSpace: "nowrap" }}>{line.name}</span>
            </div>
          ))}
        </div>
        
        {/* Navigation icon to deep dive - hidden on mobile */}
        <div className="hidden md:block" style={{ position: "relative" }}>
          <button
            onClick={() => navigate(`/deep-dive/${selectedDim.dimKey}`)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <ArrowRight size={16} color="var(--text-secondary)" />
          </button>
          
          {/* Tooltip */}
          {showTooltip && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: 4,
                backgroundColor: "var(--text-primary)",
                color: "#FFFFFF",
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 12,
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
                zIndex: 1000,
                boxShadow: "var(--shadow-lg)",
              }}
            >
              Go to "{selectedDim.name}" deep dive
            </div>
          )}
        </div>
      </div>

      {/* Chart area with Y-axis labels + plot */}
      <div className="flex" style={{ flex: 1, minHeight: 0, gap: 0 }}>
        {/* Y-axis labels (HTML, never stretched) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: chartHeight,
            paddingRight: 8,
            flexShrink: 0,
          }}
        >
          {[...yTicks].reverse().map((tick) => (
            <span
              key={tick}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--text-muted)",
                textAlign: "right",
                lineHeight: "1",
              }}
            >
              {tick}
            </span>
          ))}
        </div>

        {/* Plot area (stretches to fill) */}
        <div
          style={{ flex: 1, position: "relative", height: chartHeight }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* SVG for lines & gridlines only — stretches full width */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ display: "block", overflow: "visible" }}
          >
            {/* Y-axis gridlines */}
            {yTicks.map((tick) => (
              <line
                key={tick}
                x1="0"
                y1={toYPct(tick)}
                x2="100"
                y2={toYPct(tick)}
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Brand lines */}
            {lines.map((line) => (
              <path
                key={line.name}
                d={buildPath(line.values)}
                fill="none"
                stroke={line.color}
                strokeWidth={line.isMainBrand ? 2.5 : line.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                opacity={line.isMainBrand ? 1 : 0.8}
              />
            ))}

            {/* Hover vertical line */}
            {hoverIndex !== null && (
              <line
                x1={toXPct(hoverIndex)}
                y1="0"
                x2={toXPct(hoverIndex)}
                y2="100"
                stroke="var(--text-muted)"
                strokeWidth="1"
                strokeDasharray="3,3"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {/* Hover dots (HTML so they don't stretch) */}
          {hoverIndex !== null &&
            lines.map((line) => {
              const v = line.values[hoverIndex];
              if (v === null || v === undefined) return null;
              return (
                <div
                  key={`dot-${line.name}`}
                  style={{
                    position: "absolute",
                    left: `${toXPct(hoverIndex)}%`,
                    top: toYPx(v),
                    width: line.isMainBrand ? 8 : 6,
                    height: line.isMainBrand ? 8 : 6,
                    borderRadius: "50%",
                    backgroundColor: line.color,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                />
              );
            })}

          {/* Tooltip */}
          {hoverIndex !== null && (
            <div
              style={{
                position: "absolute",
                left: `${toXPct(hoverIndex)}%`,
                top: 8,
                transform: hoverIndex > axisLabels.length / 2 ? "translateX(-105%)" : "translateX(5%)",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-card)",
                padding: "10px 14px",
                zIndex: 10,
                pointerEvents: "none",
                minWidth: 160,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 8,
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: 6,
                }}
              >
                {axisLabels[hoverIndex]}
              </div>
              {lines.map((line) => (
                <div
                  key={line.name}
                  className="flex items-center justify-between"
                  style={{ marginBottom: 4, gap: 12 }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: line.color,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        color: "var(--text-primary)",
                        fontWeight: line.isMainBrand ? 700 : 400,
                      }}
                    >
                      {line.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text-secondary)",
                      fontWeight: line.isMainBrand ? 700 : 400,
                    }}
                  >
                    {line.values[hoverIndex] != null ? Number(line.values[hoverIndex]).toFixed(1) : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* X-axis labels (HTML, positioned under the plot area) */}
      <div className="flex items-center justify-between" style={{ marginLeft: 32, marginTop: 6, flexShrink: 0 }}>
        {axisLabels.map((label, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text-muted)",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Mobile "Go to Deep Dive" button */}
      <button
        onClick={() => navigate(`/deep-dive/${selectedDim.dimKey}`)}
        className="md:hidden flex items-center justify-center gap-2"
        style={{
          marginTop: 12,
          padding: "10px 16px",
          backgroundColor: "var(--accent-primary)",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 600,
          transition: "opacity 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.opacity = "0.9";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        Go to "{selectedDim.name}" Deep Dive
        <ArrowRight size={16} />
      </button>
      
    </div>
  );
}