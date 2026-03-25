import { useState, useEffect } from "react";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { useDateMode } from "../../contexts/date-mode-context";
import { useBrand } from "../../contexts/brand-context";
import { useDimension } from "../../data/use-dimensions";
import { useDimensionScore } from "../../hooks/use-dimension-score";
import { useAppData } from "../../data/app-data-context";
import { getBrandSubScore } from "../../utils/brand-utils";
import { useSubmetricScores } from "../../hooks/use-submetric-scores";
import { useAllBrandsSubmetricScores } from "../../hooks/use-all-brands-submetric-scores";
import { MobileHeader } from "../mobile-header";
import { useOutletContext } from "react-router";
import { supabase } from "../../../lib/supabase";
import { toISODateString, computeAxisDates } from "../../utils/date-utils";

export function DeepDiveC2Page() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const subScores = useSubmetricScores("C2");

  return (
    <>
      <MobileHeader title="Deep Dive • C2" dimensionKey="C2" onMenuClick={openMobileMenu} />
      <div
        className="flex flex-col"
        style={{
          padding: "16px",
          minHeight: "100%",
          width: "100%",
          gap: 12,
        }}
      >
        {/* Row 1 — Top bar (Desktop only) */}
        <div className="hidden md:flex items-center justify-between" style={{ flexShrink: 0 }}>
          <CategoryBrandSelector />
          <DateModeSelector />
        </div>

        {/* Row 2 — Dimension Tabs (Desktop only) */}
        <div className="hidden md:block" style={{ flexShrink: 0 }}>
          <DimensionTabs activeKey="C2" />
        </div>

        {/* Row 3 — Dimension Header */}
        <DimensionHeader pageKey="C2" />

        {/* Row 4 — Sub-metric cards (2 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 12, flexShrink: 0 }}>
          <ScoreCard title="Price Perception" badge="Social" liveScore={subScores["Price Perception"]?.score ?? null} liveDelta={subScores["Price Perception"]?.delta ?? null} trendValues={subScores["Price Perception"]?.trendValues} />
          <ScoreCard title="Quality Perception" badge="Social" liveScore={subScores["Quality Perception"]?.score ?? null} liveDelta={subScores["Quality Perception"]?.delta ?? null} trendValues={subScores["Quality Perception"]?.trendValues} />
        </div>

        {/* Row 5 — Brand Comparison */}
        <BrandComparison />

        {/* Row 6 — Share of "Worth It" Conversations */}
        <WorthItConversations />

        {/* Row 7 — What Drives Value Perception */}
        <ValueDrivers />

        {/* Row 8 — Value Perception Insight */}
        <ValueInsight />
      </div>
    </>
  );
}

function DimensionHeader({ pageKey }: { pageKey: string }) {
  const { dimension: dim } = useDimension(pageKey);
  const { score, delta } = useDimensionScore(pageKey);
  const isPositive = !delta || delta >= 0;
  return (
    <div
      style={{
        flexShrink: 0,
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        padding: 20,
      }}
    >
      {/* Mobile: Vertical Stack */}
      <div className="flex md:hidden flex-col gap-3">
        {/* Title */}
        <div className="flex items-center gap-3">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#3F1411",
              flexShrink: 0,
            }}
          />
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            {dim ? `${dim.page_letter} — ${dim.page_name}` : "C — Chosen for a Reason"}
          </h1>
        </div>

        {/* Score */}
        <div className="flex items-baseline gap-2">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#7A6F65",
            }}
          >
            Score:
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 32,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            {score ?? "—"}
          </span>
        </div>

        {/* Delta */}
        <div>
          {delta !== null && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: isPositive ? "rgba(74,102,68,0.1)" : "rgba(184,106,84,0.1)",
                color: isPositive ? "#4A6644" : "var(--color-negative, #B43C3C)",
                fontWeight: 600,
              }}
            >
              {isPositive ? "▲" : "▼"} {Math.abs(delta)}
            </span>
          )}
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontStyle: "italic",
            color: "#7A6F65",
            margin: 0,
          }}
        >
          {dim?.page_description ?? "Whether people think the brand delivers on its promise and is worth their money."}
        </p>
      </div>

      {/* Desktop: Horizontal Layout */}
      <div className="hidden md:block">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-3">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#3F1411",
                flexShrink: 0,
              }}
            />
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {dim ? `${dim.page_letter} — ${dim.page_name}` : "C — Chosen for a Reason"}
            </h1>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "#7A6F65",
              }}
            >
              Score:
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 32,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {score ?? "—"}
            </span>
            {delta !== null && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: isPositive ? "rgba(74,102,68,0.1)" : "rgba(184,106,84,0.1)",
                  color: isPositive ? "#4A6644" : "var(--color-negative, #B43C3C)",
                  fontWeight: 600,
                }}
              >
                {isPositive ? "▲" : "▼"} {Math.abs(delta)}
              </span>
            )}
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontStyle: "italic",
            color: "#7A6F65",
            marginTop: 8,
          }}
        >
          {dim?.page_description ?? "Whether people think the brand delivers on its promise and is worth their money."}
        </p>
      </div>
    </div>
  );
}

function ScoreCard({
  title,
  badge,
  liveScore,
  liveDelta,
  trendValues,
}: {
  title: string;
  badge: string;
  liveScore?: number | null;
  liveDelta?: number | null;
  trendValues?: (number | null)[];
}) {
  const isPositive = !liveDelta || liveDelta >= 0;
  const { getAxisLabels } = useDateMode();
  const axisLabels = getAxisLabels();

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const W = 300; const H = 36;
  const n = trendValues?.length ?? 0;
  const toX = (i: number) => n > 1 ? (i / (n - 1)) * W : W / 2;
  const toY = (v: number) => H - 1 - (v / 100) * (H - 2); // fixed 0-100 scale
  const yBottom = H - 1;
  // Baseline path: nulls draw at physical bottom (continuous line, no gaps)
  let sparkPath = "";
  if (trendValues && trendValues.length > 0) {
    const parts: string[] = [];
    for (let i = 0; i < trendValues.length; i++) {
      const v = trendValues[i];
      const y = v !== null ? toY(v) : yBottom;
      parts.push(`${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${y.toFixed(1)}`);
    }
    sparkPath = parts.join(" ");
  }
  const sparkDots = trendValues
    ? trendValues.map((v, i) => v !== null ? { x: toX(i), y: toY(v), i } : null).filter(Boolean) as { x: number; y: number; i: number }[]
    : [];
  const hasData = trendValues ? trendValues.some((v) => v !== null) : false;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        padding: 20,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>

      </div>

      {/* Score row */}
      <div className="flex items-baseline gap-3" style={{ marginBottom: 12 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 34,
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {liveScore !== null && liveScore !== undefined ? liveScore : "—"}
        </span>
        {liveDelta !== null && liveDelta !== undefined && (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: isPositive ? "rgba(74,102,68,0.1)" : "rgba(184,106,84,0.1)",
              color: isPositive ? "#4A6644" : "#B86A54",
              fontWeight: 600,
            }}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(liveDelta).toFixed(1)}
          </span>
        )}
      </div>

      {/* Sparkline */}
      <div>
        <div
          style={{ position: "relative" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const xRatio = (e.clientX - rect.left) / rect.width;
            const idx = Math.round(xRatio * (axisLabels.length - 1));
            setHoverIndex(Math.max(0, Math.min(axisLabels.length - 1, idx)));
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {hoverIndex !== null && trendValues && (
            <div style={{
              position: "absolute",
              bottom: "calc(100% + 4px)",
              left: `${(hoverIndex / Math.max(n - 1, 1)) * 100}%`,
              transform: hoverIndex > (n - 1) / 2 ? "translateX(-100%)" : "translateX(0%)",
              backgroundColor: "#FFFFFF",
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
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#B5ADA5" }}>
                {axisLabels[hoverIndex]}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--text-primary)" }}>
                {trendValues[hoverIndex] != null ? Number(trendValues[hoverIndex]).toFixed(1) : "—"}
              </span>
            </div>
          )}
          <svg width="100%" height="36" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            {!hasData && (
              <path d="M0,22 C50,24 100,20 150,18 C200,16 250,14 300,12" fill="none" stroke="#B5ADA5" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            )}
            {hasData && sparkPath && (
              <path d={sparkPath} fill="none" stroke="#B5ADA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
            {hoverIndex !== null && (() => { const pt = sparkDots.find(p => p.i === hoverIndex); return pt ? <line key={pt.i} x1={pt.x} y1={0} x2={pt.x} y2={H} stroke="#B5ADA5" strokeWidth="1" opacity="0.35" strokeDasharray="2 2" /> : null; })()}
          </svg>
        </div>
        <div className="flex items-center justify-between" style={{ marginTop: 4 }}>
          {axisLabels.map((label, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                color: "#B5ADA5",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandComparison() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();
  const categoryBrands = (brandsByCategory[selectedCategory] ?? []).filter(b => selectedBrands.includes(b.name));
  const allScores = useAllBrandsSubmetricScores("C2");
  const pricePerceptionData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Price Perception"] ?? null, color: b.color }));
  const qualityPerceptionData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Quality Perception"] ?? null, color: b.color }));

  const maxScore = 100;

  const renderColumn = (title: string, data: typeof pricePerceptionData) => (
    <div style={{ flex: 1, minWidth: 0 }}>
      <h4
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 600,
          color: "#7A6F65",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: 12,
        }}
      >
        {title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((item) => (
          <div key={item.brand} className="flex items-center gap-2">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "var(--text-primary)",
                width: 100,
                fontWeight: item.brand === mainBrand ? 700 : 400,
              }}
            >
              {item.brand}
            </span>
            <div
              style={{
                position: "relative",
                flex: 1,
                height: 14,
                backgroundColor: "#F0EBE6",
                borderRadius: 7,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((item.score ?? 0) / maxScore) * 100}%`,
                  backgroundColor: item.color,
                  opacity: item.brand === mainBrand ? 1 : 0.5,
                  borderRadius: 7,
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-secondary)",
                width: 24,
                textAlign: "right",
                fontWeight: item.brand === mainBrand ? 700 : 400,
              }}
            >
              {item.score ?? "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        padding: 20,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Brand Comparison
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Price & Quality across brands
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex" style={{ gap: 32 }}>
        {renderColumn("PRICE PERCEPTION", pricePerceptionData)}
        {renderColumn("QUALITY PERCEPTION", qualityPerceptionData)}
      </div>
    </div>
  );
}

function WorthItConversations() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { selectedDate, dateMode } = useDateMode();
  const { brandsByCategory } = useAppData();

  type ChartBrand = { name: string; color: string; values: (number | null)[] };
  const [chartBrands, setChartBrands] = useState<ChartBrand[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    setChartBrands([]);
    setDates([]);
    async function load() {
      // Last 7 periods: 7 days for Daily/Rolling 30, 7 months for Monthly
      const fromDate = computeAxisDates(dateMode, selectedDate)[0];
      const { data: rows } = await supabase
        .from("c2_worth_it_share")
        .select("brand_name, date, c2_share_pct")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .gte("date", toISODateString(fromDate))
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: true });

      // Always use the 7 fixed axis positions
      const axisDates = computeAxisDates(dateMode, selectedDate);
      const axisKeys = axisDates.map((d) => toISODateString(d));
      const categoryBrands = brandsByCategory[selectedCategory] ?? [];
      const colorMap = Object.fromEntries(categoryBrands.map((b) => [b.name, b.color]));

      // Always set dates from axis (7 labels always shown)
      setDates(axisKeys);

      if (!rows?.length) return;

      const byBrand: Record<string, Record<string, number>> = {};
      for (const row of rows) {
        if (!byBrand[row.brand_name]) byBrand[row.brand_name] = {};
        byBrand[row.brand_name][row.date] = row.c2_share_pct;
      }

      const brands: ChartBrand[] = selectedBrands
        .map((b) => ({
          name: b,
          color: colorMap[b] ?? "#B5ADA5",
          values: axisKeys.map((axisKey) => {
            const brandData = byBrand[b] ?? {};
            if (dateMode === "Monthly") {
              const month = axisKey.substring(0, 7);
              const matches = Object.keys(brandData).filter((d) => d.startsWith(month)).sort();
              const hit = matches.length ? matches[matches.length - 1] : null;
              return hit ? (brandData[hit] ?? null) : null;
            }
            return brandData[axisKey] ?? null;
          }),
        }));

      setChartBrands(brands);
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate, dateMode]);

  // Format axis labels — month+year for Monthly, month+day for Daily/Rolling 30
  const months = dates.map((d) => {
    const dt = new Date(d + "T00:00:00");
    return dateMode === "Monthly"
      ? dt.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
      : dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Dynamic y-axis range
  const allValues = chartBrands.flatMap((b) => b.values.filter((v): v is number => v !== null));
  const rawMin = allValues.length ? Math.min(...allValues) : 0;
  const rawMax = allValues.length ? Math.max(...allValues) : 30;
  const yMin = Math.max(0, Math.floor((rawMin - 5) / 5) * 5);
  const yMax = Math.ceil((rawMax + 5) / 5) * 5;
  const yStep = Math.max(5, Math.ceil((yMax - yMin) / 4 / 5) * 5);
  const yTicks: number[] = [];
  for (let t = yMin + yStep; t <= yMax; t += yStep) yTicks.push(t);

  const chartHeight = 180;
  const n = months.length;

  const toXPct = (i: number) => (n <= 1 ? 50 : (i / (n - 1)) * 100);
  const toYPct = (v: number) => ((yMax - v) / (yMax - yMin)) * 100;
  const toYPx = (v: number) => (toYPct(v) / 100) * chartHeight;

  const buildPath = (values: (number | null)[]) => {
    const parts: string[] = [];
    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      // Nulls draw at physical bottom (100 = bottom in SVG 0-100 percentage space)
      const yVal = v !== null ? toYPct(v) : 100;
      parts.push(`${i === 0 ? "M" : "L"}${toXPct(i).toFixed(2)},${yVal.toFixed(2)}`);
    }
    return parts.join(" ");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const idx = Math.round(xRatio * (n - 1));
    setHoverIndex(Math.max(0, Math.min(n - 1, idx)));
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        padding: 20,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between" style={{ marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: 4,
            }}
          >
            Share of "Worth It" Conversations
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#B5ADA5",
              marginBottom: 12,
            }}
          >
            Brand share of value-related discussions over time
          </p>
          
          {/* Brand legend - below description on both mobile and desktop */}
          <div 
            style={{ 
              overflowX: "auto", 
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div style={{ 
              backgroundColor: "#F5F0EB",
              borderRadius: "var(--radius-pill)",
              padding: "3px",
              display: "inline-flex",
              gap: "3px",
              minWidth: "max-content",
            }}>
              {chartBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    padding: "4px 10px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: brand.name === mainBrand ? "#FFFFFF" : "transparent",
                    color: brand.name === mainBrand ? "var(--text-primary)" : "#7A6F65",
                    fontWeight: brand.name === mainBrand ? 600 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: brand.color,
                    }}
                  />
                  {brand.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart area with Y-axis labels + plot */}
      <div className="flex" style={{ gap: 0 }}>
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
                color: "#B5ADA5",
                textAlign: "right",
                lineHeight: "1",
              }}
            >
              {tick}%
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
                stroke="#F0EBE6"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Brand lines */}
            {chartBrands.map((brand) => (
              <path
                key={brand.name}
                d={buildPath(brand.values)}
                fill="none"
                stroke={brand.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Hover vertical line */}
            {hoverIndex !== null && (
              <line
                x1={toXPct(hoverIndex)}
                y1="0"
                x2={toXPct(hoverIndex)}
                y2="100"
                stroke="#B5ADA5"
                strokeWidth="1"
                strokeDasharray="3,3"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {/* Always-visible dots at every non-null data point */}
          {chartBrands.map((brand) =>
            brand.values.map((v, i) => {
              if (v === null || v === undefined) return null;
              const isMain = brand.name === mainBrand;
              const size = isMain ? 7 : 5;
              return (
                <div
                  key={`static-dot-${brand.name}-${i}`}
                  style={{
                    position: "absolute",
                    left: `${toXPct(i)}%`,
                    top: toYPx(v),
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    backgroundColor: brand.color,
                    border: "1.5px solid #fff",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                />
              );
            })
          )}

          {/* Hover dots (HTML so they don't stretch) — larger on hover */}
          {hoverIndex !== null &&
            chartBrands.map((brand) => {
              const v = brand.values[hoverIndex];
              if (v === null || v === undefined) return null;
              return (
                <div
                  key={`dot-${brand.name}`}
                  style={{
                    position: "absolute",
                    left: `${toXPct(hoverIndex)}%`,
                    top: toYPx(v),
                    width: brand.name === mainBrand ? 10 : 8,
                    height: brand.name === mainBrand ? 10 : 8,
                    borderRadius: "50%",
                    backgroundColor: brand.color,
                    border: "2px solid #fff",
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
                transform: hoverIndex > months.length / 2 ? "translateX(-105%)" : "translateX(5%)",
                backgroundColor: "#FFFFFF",
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
                  borderBottom: "1px solid #F0EBE6",
                  paddingBottom: 6,
                }}
              >
                {months[hoverIndex]}
              </div>
              {chartBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-between"
                  style={{ marginBottom: 4, gap: 12 }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: brand.color,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        color: "var(--text-primary)",
                        fontWeight: brand.name === mainBrand ? 700 : 400,
                      }}
                    >
                      {brand.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text-secondary)",
                      fontWeight: brand.name === mainBrand ? 700 : 400,
                    }}
                  >
                    {brand.values[hoverIndex] !== null && brand.values[hoverIndex] !== undefined
                      ? `${(brand.values[hoverIndex] as number).toFixed(1)}%`
                      : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* X-axis labels (HTML, positioned under the plot area) */}
      <div className="flex items-center justify-between" style={{ marginLeft: 32, marginTop: 6 }}>
        {months.map((month, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              color: "#B5ADA5",
            }}
          >
            {month}
          </span>
        ))}
      </div>
    </div>
  );
}

function ValueDrivers() {
  const { mainBrand, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();

  type Driver = { rank: number; name: string; sentiment: string; share: number };
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    setDrivers([]);
    async function load() {
      const { data: rows } = await supabase
        .from("c2_value_drivers")
        .select("c2_attribute_name, c2_sentiment, c2_share_pct, date")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: false });

      if (!rows?.length) return;

      const latestDate = rows[0].date;
      const latestRows = rows.filter((r) => r.date === latestDate);
      latestRows.sort((a, b) => b.c2_share_pct - a.c2_share_pct);

      setDrivers(
        latestRows.map((r, i) => ({
          rank: i + 1,
          name: r.c2_attribute_name,
          sentiment: r.c2_sentiment,
          share: r.c2_share_pct,
        }))
      );
    }
    load();
  }, [mainBrand, selectedCategory, selectedDate]);

  const maxShare = drivers.length ? Math.max(...drivers.map((d) => d.share)) : 1;

  const getSentimentStyle = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return {
          bg: "rgba(74,102,68,0.08)",
          text: "#4A6644",
          barColor: "#4A6644",
        };
      case "mixed":
        return {
          bg: "rgba(218,197,140,0.15)",
          text: "#A89056",
          barColor: "#DAC58C",
        };
      case "negative":
        return {
          bg: "rgba(184,106,84,0.08)",
          text: "#B86A54",
          barColor: "#B86A54",
        };
      default:
        return {
          bg: "#F5F0EB",
          text: "#7A6F65",
          barColor: "#B5ADA5",
        };
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        padding: 20,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 4,
          }}
        >
          What Drives Value Perception
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Key themes in consumer conversations about price, quality, and worth
        </p>
      </div>

      {/* Driver rows */}
      {drivers.length === 0 && (
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", paddingBottom: 8 }}>
          Loading…
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {drivers.map((driver, index) => {
          const style = getSentimentStyle(driver.sentiment);
          return (
            <div key={driver.rank}>
              {index > 0 && (
                <div style={{ height: 1, backgroundColor: "#F0EBE6", marginBottom: 12 }} />
              )}
              
              {/* Desktop layout */}
              <div className="hidden md:flex items-center gap-3">
                {/* Rank */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "#B5ADA5",
                    width: 20,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {driver.rank}
                </span>

                {/* Driver name */}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-primary)",
                    width: 180,
                    flexShrink: 0,
                  }}
                >
                  {driver.name}
                </span>

                {/* Sentiment tag */}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    padding: "3px 10px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: style.bg,
                    color: style.text,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    width: 70,
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  {driver.sentiment}
                </span>

                {/* Strength bar */}
                <div
                  style={{
                    position: "relative",
                    flex: 1,
                    height: 8,
                    backgroundColor: "#F0EBE6",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 8,
                      backgroundColor: style.barColor,
                      borderRadius: 4,
                      width: `${(driver.share / maxShare) * 100}%`,
                    }}
                  />
                </div>

                {/* Share % */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "#7A6F65",
                    width: 32,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {driver.share.toFixed(1)}%
                </span>
              </div>
              
              {/* Mobile layout - 2 rows */}
              <div className="block md:hidden">
                {/* Row 1: Rank + Name */}
                <div className="flex items-start gap-2" style={{ marginBottom: 6 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "#B5ADA5",
                      width: 16,
                      textAlign: "right",
                      flexShrink: 0,
                      paddingTop: 1,
                    }}
                  >
                    {driver.rank}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      color: "var(--text-primary)",
                      flex: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {driver.name}
                  </span>
                </div>
                
                {/* Row 2: Sentiment + Bar + Percentage - all aligned */}
                <div className="flex items-center gap-2" style={{ paddingLeft: 18 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 9,
                      padding: "2px 6px",
                      borderRadius: "var(--radius-pill)",
                      backgroundColor: style.bg,
                      color: style.text,
                      fontWeight: 600,
                      textTransform: "capitalize",
                      flexShrink: 0,
                      minWidth: 52,
                      textAlign: "center",
                    }}
                  >
                    {driver.sentiment}
                  </span>

                  <div
                    style={{
                      position: "relative",
                      flex: 1,
                      height: 6,
                      backgroundColor: "#F0EBE6",
                      borderRadius: 3,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: 6,
                        backgroundColor: style.barColor,
                        borderRadius: 3,
                        width: `${(driver.share / maxShare) * 100}%`,
                      }}
                    />
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      color: "#7A6F65",
                      textAlign: "right",
                      flexShrink: 0,
                      width: 28,
                    }}
                  >
                    {driver.share.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      
    </div>
  );
}

function ValueInsight() {
  const strengths = ["Ingredient transparency", "Packaging quality", "Celebrity association"];
  const risks = ["Product size perception", "Dupe competition", "Price-to-quantity ratio"];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        borderLeft: "3px solid #B86A54",
        borderTop: "1px solid var(--border-subtle)",
        borderRight: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: 20,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 15 }}>💡</span>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Value Perception Summary
        </h3>
      </div>

      {/* Body text */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "#7A6F65",
          lineHeight: 1.6,
          marginBottom: 16,
        }}
      >
        Rhode's value perception is under pressure. Quality scores remain strong (74, Rank #2),
        but Price (62) and Worth (63) are declining — suggesting consumers appreciate the product
        but increasingly question whether it justifies the price point.
      </p>

      {/* Strengths / Risks cards */}
      <div className="flex" style={{ gap: 12, marginBottom: 16 }}>
        {/* Strengths */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(74,102,68,0.06)",
            borderRadius: "var(--radius-md)",
            padding: 12,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                fontWeight: 600,
                color: "#4A6644",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              STRENGTHS TO PROTECT
            </h4>
          </div>
          <div className="flex flex-wrap" style={{ gap: 6 }}>
            {strengths.map((strength) => (
              <span
                key={strength}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "4px 10px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(74,102,68,0.12)",
                  color: "#4A6644",
                  fontWeight: 600,
                }}
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(184,106,84,0.06)",
            borderRadius: "var(--radius-md)",
            padding: 12,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                fontWeight: 600,
                color: "#B86A54",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              RISKS TO ADDRESS
            </h4>
          </div>
          <div className="flex flex-wrap" style={{ gap: 6 }}>
            {risks.map((risk) => (
              <span
                key={risk}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "4px 10px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(184,106,84,0.12)",
                  color: "#B86A54",
                  fontWeight: 600,
                }}
              >
                {risk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 11,
          color: "#7A6F65",
          lineHeight: 1.6,
          marginBottom: 12,
        }}
      >
        <strong>Recommendation:</strong> The "dupe" conversation is growing — lean into ingredient
        education and clinical results to differentiate from alternatives. Consider value-pack
        sizing or loyalty mechanics to address the size/quantity concern without discounting.
      </p>

      {/* Footer badge */}
      <div className="flex items-center gap-2">
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: "#4A6644",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "#4A6644",
            fontWeight: 600,
          }}
        >
          Leading Indicator
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "#B5ADA5",
          }}
        >
          Share of Value Conversations (p=0.034) predicts sales at 2-month lead
        </span>
      </div>
    </div>
  );
}