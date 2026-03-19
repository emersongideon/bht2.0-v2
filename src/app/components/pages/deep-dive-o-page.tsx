import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { useState, useEffect } from "react";
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
import { useOSentimentLatest } from "../../hooks/use-o-sentiment";
import { Instagram } from "lucide-react";

export function DeepDiveOPage() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const subScores = useSubmetricScores("O");

  return (
    <>
      <MobileHeader title="Deep Dive • O" dimensionKey="O" onMenuClick={openMobileMenu} />
      <div
        className="flex flex-col"
        style={{
          padding: "16px",
          minHeight: "100%",
          width: "100%",
          maxWidth: "100%",
          gap: 12,
          overflowX: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Row 1 — Top bar (Desktop only) */}
        <div className="hidden md:flex items-center justify-between" style={{ flexShrink: 0 }}>
          <CategoryBrandSelector />
          <DateModeSelector />
        </div>

        {/* Row 2 — Dimension Tabs (Desktop only) */}
        <div className="hidden md:block" style={{ flexShrink: 0 }}>
          <DimensionTabs activeKey="O" />
        </div>

        {/* Row 3 — Dimension Header */}
        <DimensionHeader pageKey="O" />

        {/* Row 4 — Sub-metric card (1 card) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, flexShrink: 0 }}>
          <ScoreCard title="Favorability" badge="Social" liveScore={subScores["Favorability"]?.score ?? null} liveDelta={subScores["Favorability"]?.delta ?? null} trendValues={subScores["Favorability"]?.trendValues} />
        </div>

        {/* Row 5 — Brand Comparison */}
        <BrandComparison />

        {/* Row 6 — Sentiment Over Time + Sentiment Breakdown - stacks on mobile */}
        <div className="flex flex-col md:flex-row" style={{ gap: 12, alignItems: "stretch", minWidth: 0 }}>
          <div style={{ flex: 2, display: "flex", minWidth: 0, maxWidth: "100%" }}>
            <SentimentTrend />
          </div>
          <div style={{ flex: 1, display: "flex", minWidth: 0, maxWidth: "100%" }}>
            <SentimentSplit />
          </div>
        </div>

        {/* Row 7 — Passion Score + Recommendation List - stacks on mobile */}
        <div className="flex flex-col md:flex-row" style={{ gap: 12 }}>
          <div style={{ flex: 1 }}>
            <PassionScore />
          </div>
          <div style={{ flex: 2 }}>
            <RecommendationList />
          </div>
        </div>

        {/* Row 8 — Insight */}
        <InsightCard />
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
              backgroundColor: "#B86A54",
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
            {dim ? `${dim.page_letter} — ${dim.page_name}` : "O — Openly Adored"}
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
          {dim?.page_description ?? "What people and machines actually say and feel about the brand."}
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
                backgroundColor: "#B86A54",
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
              {dim ? `${dim.page_letter} — ${dim.page_name}` : "O — Openly Adored"}
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
          {dim?.page_description ?? "What people and machines actually say and feel about the brand."}
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
            {sparkDots.map((pt) => (
              <circle key={pt.i} cx={pt.x} cy={pt.y} r={hoverIndex === pt.i ? "3.5" : "2.5"} fill="#B5ADA5" stroke="#fff" strokeWidth="1" />
            ))}
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
  const allScores = useAllBrandsSubmetricScores("O");
  const favourabilityData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Favorability"] ?? null, color: b.color }));

  const maxScore = 100;

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
          Favourability across brands
        </p>
      </div>

      {/* Single column layout */}
      <div>
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
          FAVOURABILITY
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {favourabilityData.map((item) => (
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
    </div>
  );
}

function SentimentTrend() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { selectedDate, dateMode, getAxisLabels } = useDateMode();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  type BrandLine = { name: string; color: string; values: (number | null)[] };
  const [brandLines, setBrandLines] = useState<BrandLine[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [sortedDates, setSortedDates] = useState<string[]>([]);

  useEffect(() => {
    setBrandLines([]);
    setChartLabels([]);
    setSortedDates([]);

    async function load() {
      // Always use 7 fixed axis positions determined by date mode
      const axisDates = computeAxisDates(dateMode, selectedDate);
      const fromDate = axisDates[0];
      const toDate = axisDates[axisDates.length - 1];

      // For monthly mode, extend toDate to end of that month so we capture all rows
      const toDateEnd = dateMode === "Monthly"
        ? new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0)
        : toDate;

      const { data } = await supabase
        .from("o_sentiment")
        .select("brand_name, date, o_positive_pct")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .gte("date", toISODateString(fromDate))
        .lte("date", toISODateString(toDateEnd))
        .order("date", { ascending: true });

      const colors: Record<string, string> = {};
      for (const b of categoryBrandList) colors[b.name] = b.color;

      const axisISODates = axisDates.map(d => toISODateString(d));

      if (!data?.length) {
        // No data: set empty values for all brands aligned to axis
        setBrandLines(
          selectedBrands.map(b => ({
            name: b,
            color: colors[b] ?? "#B86A54",
            values: Array(axisDates.length).fill(null),
          }))
        );
        setSortedDates(axisISODates);
        setChartLabels(getAxisLabels());
        return;
      }

      let brandValues: Record<string, (number | null)[]>;

      if (dateMode === "Monthly") {
        // Aggregate by month: average o_positive_pct per brand per YYYY-MM
        const byBrandMonth: Record<string, Record<string, number[]>> = {};
        for (const row of data) {
          const monthKey = row.date.slice(0, 7); // "YYYY-MM"
          if (!byBrandMonth[row.brand_name]) byBrandMonth[row.brand_name] = {};
          if (!byBrandMonth[row.brand_name][monthKey]) byBrandMonth[row.brand_name][monthKey] = [];
          byBrandMonth[row.brand_name][monthKey].push(row.o_positive_pct);
        }
        brandValues = {};
        for (const b of selectedBrands) {
          brandValues[b] = axisDates.map(axisDate => {
            const monthKey = toISODateString(axisDate).slice(0, 7);
            const vals = byBrandMonth[b]?.[monthKey];
            if (!vals || vals.length === 0) return null;
            return vals.reduce((a, c) => a + c, 0) / vals.length;
          });
        }
      } else {
        // Daily / Rolling 30: exact date match
        const byBrandDate: Record<string, Record<string, number>> = {};
        for (const row of data) {
          if (!byBrandDate[row.brand_name]) byBrandDate[row.brand_name] = {};
          byBrandDate[row.brand_name][row.date] = row.o_positive_pct;
        }
        brandValues = {};
        for (const b of selectedBrands) {
          brandValues[b] = axisISODates.map(isoDate => byBrandDate[b]?.[isoDate] ?? null);
        }
      }

      setBrandLines(
        selectedBrands.map(b => ({
          name: b,
          color: colors[b] ?? "#B86A54",
          values: brandValues[b] ?? Array(axisDates.length).fill(null),
        }))
      );
      setSortedDates(axisISODates);
      setChartLabels(getAxisLabels());
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate, dateMode]);

  // Chart dimensions in viewBox units
  const VB_W = 600;
  const VB_H = 200;
  const PAD_TOP = 20;
  const PAD_BOT = 20;

  const allValues = brandLines.flatMap(b => b.values).filter((v): v is number => v !== null);
  const rawMin = allValues.length ? Math.min(...allValues) : 30;
  const rawMax = allValues.length ? Math.max(...allValues) : 90;
  const Y_MIN = Math.max(0, Math.floor(rawMin - 5));
  const Y_MAX = Math.ceil(rawMax + 5);
  const plotH = VB_H - PAD_TOP - PAD_BOT;

  const valueToY = (val: number) =>
    PAD_TOP + ((Y_MAX - val) / (Y_MAX - Y_MIN)) * plotH;
  const indexToX = (i: number) => (i / Math.max(sortedDates.length - 1, 1)) * VB_W;

  const buildPath = (values: (number | null)[]) => {
    const parts: string[] = [];
    const yBottom = valueToY(Y_MIN); // physical bottom of plot area
    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      // Nulls draw at physical bottom (continuous line, no gaps)
      const y = v !== null ? valueToY(v) : yBottom;
      parts.push(`${i === 0 ? "M" : "L"}${indexToX(i).toFixed(1)},${y.toFixed(1)}`);
    }
    return parts.join(" ");
  };

  const gridStep = Math.round((Y_MAX - Y_MIN) / 3 / 10) * 10 || 10;
  const gridlines = Array.from({ length: 4 }, (_, i) => Math.round(Y_MIN + i * (Y_MAX - Y_MIN) / 3));

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
      className="sentiment-trend-card"
    >
      <style>
        {`
          @media (max-width: 768px) {
            .sentiment-trend-card {
              padding: 16px !important;
              overflow: hidden;
            }
            .sentiment-chart-wrapper {
              transform: scale(0.85);
              transform-origin: left center;
              margin-left: 0;
              margin-right: -50px;
              padding-bottom: 10px;
            }
          }
        `}
      </style>
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 4,
          }}
        >
          Share of Positive Sentiment
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >Across earned consumer content over time. Hover over the lines for the size.        </p>
      </div>

      {/* Brand legend - single row with horizontal scroll */}
      <div style={{ marginBottom: 12, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ 
          backgroundColor: "#F5F0EB",
          borderRadius: "var(--radius-pill)",
          padding: "3px",
          display: "inline-flex",
          gap: "3px",
          minWidth: "max-content",
        }}>
          {brandLines.map((brand) => (
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

      <div className="sentiment-chart-wrapper" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Chart area with Y-axis labels */}
      <div className="flex" style={{ flex: 1, marginBottom: 8, minWidth: 0 }}>
        {/* Y-axis labels */}
        <div
          style={{
            width: 28,
            flexShrink: 0,
            position: "relative",
            paddingTop: `${PAD_TOP * 0.6}px`,
            paddingBottom: `${PAD_BOT * 0.6}px`,
            boxSizing: "border-box",
          }}
        >
          {gridlines.map((val) => (
            <span
              key={val}
              style={{
                position: "absolute",
                right: 4,
                top: `${((Y_MAX - val) / (Y_MAX - Y_MIN)) * 100}%`,
                transform: "translateY(-50%)",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "#B5ADA5",
              }}
            >
              {val}%
            </span>
          ))}
        </div>

        {/* SVG chart */}
        <div style={{ position: "relative", flex: 1 }}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            style={{ display: "block", position: "absolute", inset: 0 }}
            onMouseMove={(e) => {
              const svg = e.currentTarget;
              const svgRect = svg.getBoundingClientRect();
              const container = svg.parentElement;
              if (!container) return;
              const containerRect = container.getBoundingClientRect();
              const mouseXRatio = (e.clientX - svgRect.left) / svgRect.width;
              const mouseXInVB = mouseXRatio * VB_W;
              // Snap to nearest data point
              const idx = Math.round((mouseXInVB / VB_W) * (sortedDates.length - 1));
              const clampedIdx = Math.max(0, Math.min(sortedDates.length - 1, idx));
              // Pixel X for that month's data point
              const pointXRatio = indexToX(clampedIdx) / VB_W;
              const pixelX = pointXRatio * svgRect.width + (svgRect.left - containerRect.left);
              setHoveredIndex(clampedIdx);
              setTooltipPos({ x: pixelX, y: 0 });
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setTooltipPos(null);
            }}
          >
            {/* Gridlines */}
            {gridlines.map((val) => (
              <line
                key={val}
                x1="0"
                y1={valueToY(val)}
                x2={VB_W}
                y2={valueToY(val)}
                stroke="#F0EBE6"
                strokeWidth="1"
              />
            ))}

            {/* Brand lines */}
            {brandLines.map((brand) => (
              <path
                key={brand.name}
                d={buildPath(brand.values)}
                fill="none"
                stroke={brand.color}
                strokeWidth={brand.name === mainBrand ? 2.5 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Hover vertical indicator line */}
            {hoveredIndex !== null && (
              <line
                x1={indexToX(hoveredIndex)}
                y1={PAD_TOP}
                x2={indexToX(hoveredIndex)}
                y2={VB_H - PAD_BOT}
                stroke="#B5ADA5"
                strokeWidth="1"
                opacity="0.4"
              />
            )}

            {/* Clickable date zones */}
            {sortedDates.map((_d, i) => {
              const zoneW = VB_W / Math.max(sortedDates.length, 1);
              return (
                <rect
                  key={i}
                  x={indexToX(i) - zoneW / 2}
                  y={0}
                  width={zoneW}
                  height={VB_H}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </svg>

          {/* Always-visible dots at every non-null data point */}
          {brandLines.map((brand) =>
            brand.values.map((v, i) => {
              if (v === null || v === undefined) return null;
              const isMain = brand.name === mainBrand;
              const size = isMain ? 7 : 5;
              return (
                <div
                  key={`dot-${brand.name}-${i}`}
                  style={{
                    position: "absolute",
                    left: `${(indexToX(i) / VB_W) * 100}%`,
                    top: `${(valueToY(v) / VB_H) * 100}%`,
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

          {/* Tooltip */}
          {hoveredIndex !== null && tooltipPos && (
            <div
              style={{
                position: "absolute",
                left: `clamp(80px, ${tooltipPos.x}px, calc(100% - 80px))`,
                top: 0,
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                border: "1px solid #E8E2DC",
                borderRadius: 8,
                padding: "8px 12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                pointerEvents: "none",
                zIndex: 1000,
                minWidth: 150,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  color: "#B5ADA5",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                {hoveredIndex !== null ? chartLabels[hoveredIndex] ?? "" : ""}
              </div>
              {brandLines.map((brand) => (
                <div
                  key={brand.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 3,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: brand.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      color: "var(--text-primary)",
                      fontWeight: brand.name === mainBrand ? 700 : 400,
                      flex: 1,
                    }}
                  >
                    {brand.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {hoveredIndex !== null && brand.values[hoveredIndex] != null ? `${(brand.values[hoveredIndex] as number).toFixed(1)}%` : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* X-axis labels */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 12, paddingLeft: 28 }}
      >
        {chartLabels.map((label, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B5ADA5",
              textAlign: "center",
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

function SentimentSplit() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];
  const latestByBrand = useOSentimentLatest();

  const colors: Record<string, string> = {};
  for (const b of categoryBrandList) colors[b.name] = b.color;

  const data = selectedBrands
    .filter(b => latestByBrand[b])
    .map(b => ({
      brand: b,
      color: colors[b] ?? "#B86A54",
      positive: Math.round(latestByBrand[b].o_positive_pct ?? 0),
      neutral: Math.round(latestByBrand[b].o_neutral_pct ?? 0),
      negative: Math.round(latestByBrand[b].o_negative_pct ?? 0),
    }));

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        padding: 20,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 4,
          }}
        >
          Sentiment Split
        </h3>
        
      </div>

      {/* Stacked bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, justifyContent: "center" }}>
        {data.map((item) => (
          <div key={item.brand}>
            {/* Brand name */}
            <div className="flex items-center gap-1.5" style={{ marginBottom: 4 }}>
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
                  fontSize: 10,
                  color: "var(--text-primary)",
                  fontWeight: item.brand === mainBrand ? 700 : 400,
                }}
              >
                {item.brand}
              </span>
            </div>

            {/* Stacked bar */}
            <div
              className="flex"
              style={{
                height: 16,
                borderRadius: 4,
                overflow: "hidden",
                opacity: item.brand === mainBrand ? 1 : 0.4,
              }}
            >
              <div
                style={{
                  width: `${item.positive}%`,
                  backgroundColor: "#4A6644",
                }}
              />
              <div
                style={{
                  width: `${item.neutral}%`,
                  backgroundColor: "#D8C6A0",
                }}
              />
              <div
                style={{
                  width: `${item.negative}%`,
                  backgroundColor: "#B86A54",
                }}
              />
            </div>

            {/* Percentages */}
            <div style={{ marginTop: 4 }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 8,
                  color: "#B5ADA5",
                }}
              >
                {item.positive}% pos · {item.neutral}% neu · {item.negative}% neg
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3" style={{ marginTop: "auto", paddingTop: 16 }}>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 10, height: 10, backgroundColor: "#4A6644", borderRadius: 2 }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "#7A6F65" }}>
            Positive
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 10, height: 10, backgroundColor: "#D8C6A0", borderRadius: 2 }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "#7A6F65" }}>
            Neutral
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 10, height: 10, backgroundColor: "#B86A54", borderRadius: 2 }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "#7A6F65" }}>
            Negative
          </span>
        </div>
      </div>
    </div>
  );
}

function PassionScore() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];
  const latestByBrand = useOSentimentLatest();

  const colors: Record<string, string> = {};
  for (const b of categoryBrandList) colors[b.name] = b.color;

  const donutData = selectedBrands
    .filter(b => latestByBrand[b])
    .map(b => ({
      brand: b,
      percentage: latestByBrand[b].o_passion_score ?? 0,
      color: colors[b] ?? "#B86A54",
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const mainRow = latestByBrand[mainBrand];
  const mainScore = mainRow?.o_passion_score ?? 0;
  const mainColor = colors[mainBrand] ?? "#B86A54";
  const mainLlmRec = mainRow?.o_llm_rec_share ?? null;


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
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 4,
          }}
        >Passion Score</h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >How passionate are people when talking about the brand</p>
      </div>

      {/* Donut chart */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <div style={{ position: "relative", width: 180, height: 180 }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* Background track */}
            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke="#E8E2DC"
              strokeWidth="16"
            />
            {/* Score arc */}
            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke={mainColor}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${(mainScore / 100) * 2 * Math.PI * 70} ${2 * Math.PI * 70}`}
              transform="rotate(-90 90 90)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 28,
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1,
              }}
            >
              {mainScore}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#B5ADA5",
                marginTop: 4,
              }}
            >
              out of 100
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {donutData.map((item) => (
          <div key={item.brand} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
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
                  fontWeight: item.brand === mainBrand ? 700 : 400,
                }}
              >
                {item.brand}
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-secondary)",
                fontWeight: item.brand === mainBrand ? 700 : 400,
              }}
            >
              {item.percentage}
            </span>
          </div>
        ))}
      </div>

      {/* LLM Recommendation mini card */}
      <div
        style={{
          backgroundColor: "#F5F0EB",
          borderRadius: "var(--radius-md)",
          padding: 12,
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 6 }}>
          <h4
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              fontWeight: 600,
              color: "#B5ADA5",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >LLM FREQUENCY OF RECOMMENDATION</h4>
        </div>
        <div style={{ marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >{mainLlmRec != null ? `${mainLlmRec.toFixed(1)}%` : "—"}</span>
        </div>
      </div>
    </div>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  const bgColor = p === "instagram" ? "#E4405F" : p === "reddit" ? "#FF4500" : p === "youtube" ? "#FF0000" : "#000000";
  return (
    <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${bgColor}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
      <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: bgColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {p === "instagram" ? (
          <Instagram size={12} color="#FFFFFF" />
        ) : p === "tiktok" ? (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        ) : p === "youtube" ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
          </svg>
        )}
      </div>
    </div>
  );
}

function RecommendationList() {
  const { mainBrand, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();

  type Rec = { id: number; platform: string; author: string; quote: string; sentiment: string; posted_at: string };
  const [recs, setRecs] = useState<Rec[]>([]);

  useEffect(() => {
    setRecs([]);
    async function load() {
      const { data } = await supabase
        .from("o_recommendations")
        .select("id, o_platform, o_author, o_quote, o_sentiment, o_posted_at")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .order("o_posted_at", { ascending: false });
      if (!data?.length) return;
      setRecs(data.map(r => ({ id: r.id, platform: r.o_platform, author: r.o_author, quote: r.o_quote, sentiment: r.o_sentiment, posted_at: r.o_posted_at })));
    }
    load();
  }, [mainBrand, selectedCategory, selectedDate]);

  const sentimentDotColor = (s: string) => s === "positive" ? "#4A6644" : s === "negative" ? "#B86A54" : "#B5ADA5";

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
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: 4,
            }}
          >
            What People Are Saying
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#B5ADA5",
            }}
          >
            Top recommendations and endorsements from earned content
          </p>
        </div>
        
      </div>

      {/* Scrollable list */}
      <div style={{ maxHeight: 380, overflowY: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recs.map((rec, index) => (
            <div key={rec.id}>
              {index > 0 && (
                <div style={{ height: 1, backgroundColor: "#F0EBE6", marginBottom: 12 }} />
              )}
              <div className="flex items-start gap-3">
                {/* Platform icon */}
                <PlatformBadge platform={rec.platform} />

                {/* Quote + metadata */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "var(--text-primary)",
                      lineHeight: 1.5,
                      marginBottom: 4,
                    }}
                  >
                    "{rec.quote}"
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      color: "#B5ADA5",
                    }}
                  > · {rec.platform} {rec.author}</p>
                </div>

                {/* Sentiment dot */}
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: sentimentDotColor(rec.sentiment),
                    flexShrink: 0,
                    marginTop: 6,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightCard() {
  const loveIt = ["visible results", "clean formulas", "simple routine", "hydration"];
  const recommendIt = [
    "value for money",
    "repurchase rate",
    "converts friends",
    "aesthetic packaging",
  ];
  const watchOut = ["hype fatigue", "dupe mentions rising", "size complaints"];

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        borderLeft: "3px solid #B86A54",
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
          Why People Love & Recommend Rhode
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
        Rhode's organic advocacy is driven by three core themes: product efficacy ('results you
        can see'), value-for-money in the clean beauty space ('Drunk Elephant results without the
        price'), and the simplicity of the routine ('doesn't need 12 steps'). The brand benefits
        from strong word-of-mouth — consumers who try it become recruiters.
      </p>

      {/* Three mini cards */}
      <div className="flex" style={{ gap: 12, marginBottom: 16 }}>
        {/* Why They Love It */}
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
              WHY THEY LOVE IT
            </h4>
          </div>
          <div className="flex flex-wrap" style={{ gap: 6 }}>
            {loveIt.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "4px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(74,102,68,0.12)",
                  color: "#4A6644",
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Why They Recommend It */}
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
              WHY THEY RECOMMEND IT
            </h4>
          </div>
          <div className="flex flex-wrap" style={{ gap: 6 }}>
            {recommendIt.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "4px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(74,102,68,0.12)",
                  color: "#4A6644",
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Watch Out For */}
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
              WATCH OUT FOR
            </h4>
          </div>
          <div className="flex flex-wrap" style={{ gap: 6 }}>
            {watchOut.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "4px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(184,106,84,0.12)",
                  color: "#B86A54",
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer badge */}
      <div className="flex items-center gap-2">
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: "#7B68A6",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "#7B68A6",
            fontWeight: 600,
          }}
        >
          Cultural Pulse
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "#B5ADA5",
          }}
        >
          Social Sentiment (p=0.033) predicts sales at 6-month lead
        </span>
      </div>
    </div>
  );
}