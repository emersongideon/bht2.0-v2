import { SortableBarChart } from "../sortable-bar-chart";
import { useState, useEffect } from "react";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { supabase } from "../../../lib/supabase";
import { toISODateString, computeAxisDates } from "../../utils/date-utils";
import { useDateMode } from "../../contexts/date-mode-context";
import { MobileHeader } from "../mobile-header";
import { useOutletContext } from "react-router";
import { useBrand } from "../../contexts/brand-context";
import { useDimension } from "../../data/use-dimensions";
import { useDimensionScore } from "../../hooks/use-dimension-score";
import { useAppData } from "../../data/app-data-context";
import { getBrandSubScore } from "../../utils/brand-utils";
import { useSubmetricScores } from "../../hooks/use-submetric-scores";
import { useAllBrandsSubmetricScores } from "../../hooks/use-all-brands-submetric-scores";
import { useC1LatestMetrics, type C1LatestRow } from "../../hooks/use-c1-latest-metrics";

export function DeepDiveC1Page() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const subScores = useSubmetricScores("C1");

  return (
    <>
      <MobileHeader title="Deep Dive • C1" dimensionKey="C1" onMenuClick={openMobileMenu} />
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
          <DimensionTabs activeKey="C1" />
        </div>

        {/* Row 3 — Dimension Header */}
        <DimensionHeader pageKey="C1" />

        {/* Row 4 — Sub-metric cards (3 source cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 12, flexShrink: 0 }}>
          <ScoreCard title="Search" badge="Search" liveScore={subScores["Search"]?.score ?? null} liveDelta={subScores["Search"]?.delta ?? null} trendValues={subScores["Search"]?.trendValues} />
          <ScoreCard title="Social" badge="Social" liveScore={subScores["Social"]?.score ?? null} liveDelta={subScores["Social"]?.delta ?? null} trendValues={subScores["Social"]?.trendValues} />
          <ScoreCard title="LLM" badge="LLM" liveScore={subScores["LLM"]?.score ?? null} liveDelta={subScores["LLM"]?.delta ?? null} trendValues={subScores["LLM"]?.trendValues} />
        </div>

        {/* Row 5 — Brand Comparison */}
        <BrandComparison />

        {/* Row 6 — Scale & Velocity Panel */}
        <ScaleVelocityPanel />

        {/* Row 7 — Competitive Ranking Table */}
        <CompetitiveRankingTable />

        {/* Row 8 — Historical View */}
        <HistoricalView />

        {/* Row 9 — Brand Comparison Trend */}
        <BrandComparisonTrend />

        {/* Row 10 — Insight Card */}
        <InsightCardC1 />
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
              backgroundColor: "#DAC58C",
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
            {dim ? `${dim.page_letter} — ${dim.page_name}` : "C — Capturing Attention"}
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
          {dim?.page_description ?? "The cultural energy and momentum the brand carries right now."}
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
                backgroundColor: "#DAC58C",
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
              {dim ? `${dim.page_letter} — ${dim.page_name}` : "C — Capturing Attention"}
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
          {dim?.page_description ?? "The cultural energy and momentum the brand carries right now."}
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

  // Build live sparkline path + dots from trendValues (fixed 0-100 scale)
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
          {/* Hover tooltip */}
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
            {/* Fallback line when no live data */}
            {!hasData && (
              <path
                d="M0,22 C50,24 100,20 150,18 C200,16 250,14 300,12"
                fill="none"
                stroke="#B5ADA5"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
              />
            )}
            {/* Live sparkline line */}
            {hasData && sparkPath && (
              <path
                d={sparkPath}
                fill="none"
                stroke="#B5ADA5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
  const allScores = useAllBrandsSubmetricScores("C1");
  const searchData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Search"] ?? null, color: b.color }));
  const socialData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Social"] ?? null, color: b.color }));
  const llmData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["LLM"] ?? null, color: b.color }));

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
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
          Brand Comparison
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#B5ADA5" }}>
          Search, Social & LLM performance across brands
        </p>
      </div>
      <div className="flex flex-col md:flex-row" style={{ gap: 24 }}>
        <SortableBarChart title="SEARCH" data={searchData} mainBrand={mainBrand} />
        <SortableBarChart title="SOCIAL" data={socialData} mainBrand={mainBrand} />
        <SortableBarChart title="LLM" data={llmData} mainBrand={mainBrand} />
      </div>
    </div>
  );
}

function ScaleVelocityPanel() {
  const { mainBrand } = useBrand();
  const latestByBrand = useC1LatestMetrics();
  const d = latestByBrand[mainBrand];

  const fmtPct = (v: number | null | undefined, digits = 1) =>
    v != null ? `${v.toFixed(digits)}%` : "—";
  const fmtPosPct = (v: number | null | undefined) =>
    v != null ? `+${v.toFixed(1)}%` : "—";
  const fmtM = (v: number | null | undefined) =>
    v != null ? `${(v / 1_000_000).toFixed(1)}M` : "—";
  const fmtK = (v: number | null | undefined) =>
    v != null ? `${(v / 1000).toFixed(0)}K` : "—";
  const fmtRank = (v: number | null | undefined) =>
    v != null ? `#${v}` : "—";
  const fmtPp = (v: number | null | undefined) =>
    v != null ? `${v > 0 ? "+" : ""}${(v * 100).toFixed(1)}pp` : "—";
  const fmtRankChange = (v: number | null | undefined) =>
    v != null ? (v === 0 ? "±0" : `${v > 0 ? "+" : ""}${v}`) : "—";

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
      {/* Summary Cards - stacks on mobile */}
      <div className="flex flex-col md:flex-row" style={{ gap: 12, marginBottom: 16 }}>
        {/* Scale Card */}
        <div style={{ flex: 1, backgroundColor: "rgba(245,240,235,0.6)", borderRadius: 14, padding: 16 }}>
          <div className="flex items-baseline justify-between" style={{ marginBottom: 12 }}>
            <div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#7A6F65", letterSpacing: "1px", textTransform: "uppercase" }}>SCALE</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#B5ADA5", marginLeft: 8 }}>Where you stand right now</span>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)" }}>{d?.c1_scale_score ?? "—"}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#B5ADA5" }}>/100</span>
            </div>
          </div>
          <div className="flex" style={{ gap: 10 }}>
            <MetricTile label="SHARE OF SEARCH" value={fmtPct(d?.c1_scale_share_of_search_pct)} />
            <MetricTile label="TOTAL FOLLOWERS" value={fmtM(d?.c1_scale_total_followers)} />
            <MetricTile label="INTERACTIONS" value={fmtK(d?.c1_scale_interactions)} />
            <MetricTile label="LLM RANK" value={fmtRank(d?.c1_scale_llm_rank)} />
          </div>
        </div>

        {/* Velocity Card */}
        <div style={{ flex: 1, backgroundColor: "rgba(74,102,68,0.04)", borderRadius: 14, padding: 16 }}>
          <div className="flex items-baseline justify-between" style={{ marginBottom: 12 }}>
            <div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#4A6644", letterSpacing: "1px", textTransform: "uppercase" }}>VELOCITY</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#B5ADA5", marginLeft: 8 }}>Where you're headed</span>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 700, color: "#4A6644" }}>{d?.c1_velocity_score ?? "—"}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#B5ADA5" }}>/100</span>
            </div>
          </div>
          <div className="flex" style={{ gap: 10 }}>
            <VelocityTile label="SEARCH MOMENTUM" value={fmtPosPct(d?.c1_velocity_search_momentum_pct)} />
            <VelocityTile label="FOLLOWER GROWTH" value={fmtPosPct(d?.c1_velocity_follower_growth_pct)} />
            <VelocityTile label="INTERACTIONS Δ" value={fmtPp(d?.c1_velocity_interactions_growth)} />
            <VelocityTile label="LLM RANK CHANGE" value={fmtRankChange(d?.c1_velocity_llm_rank_change)} />
          </div>
        </div>
      </div>

      {/* Scatter Chart */}
      <BrandPositioningScatter latestByBrand={latestByBrand} />
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.6)",
        borderRadius: 10,
        padding: "8px 6px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 7,
          color: "#B5ADA5",
          textTransform: "uppercase",
          marginBottom: 3,
          lineHeight: 1.1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: 1,
        }}
      >
        {value}
      </div>
      
    </div>
  );
}

function VelocityTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "rgba(74,102,68,0.06)",
        borderRadius: 10,
        padding: "8px 6px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 7,
          color: "#B5ADA5",
          textTransform: "uppercase",
          marginBottom: 3,
          lineHeight: 1.1,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 700,
          color: "#4A6644",
          marginBottom: 1,
        }}
      >
        {value}
      </div>
      
    </div>
  );
}

function BrandPositioningScatter({ latestByBrand }: { latestByBrand: Record<string, C1LatestRow> }) {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];

  const brandPositions = selectedBrands
    .filter(b => latestByBrand[b])
    .map(b => {
      const row = latestByBrand[b];
      const color = categoryBrandList.find(c => c.name === b)?.color ?? "#B86A54";
      return {
        name: b,
        color,
        x: row.c1_scale_score ?? 50,
        y: row.c1_velocity_score ?? 50,
      };
    });

  return (
    <div>
      {/* Mobile: Stacked layout */}
      <div className="block md:hidden" style={{ marginBottom: 12 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          Brand Positioning
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
            marginBottom: 8,
          }}
        >
          Scale (size) vs Velocity (momentum) for Capturing Attention
        </p>
        {/* Brand legend */}
        <div style={{ 
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}>
          <div className="flex items-center gap-1.5" style={{ 
            backgroundColor: "#F5F0EB",
            borderRadius: "var(--radius-pill)",
            padding: "3px",
            minWidth: "max-content",
            display: "inline-flex",
          }}>
            {brandPositions.map((brand) => (
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

      {/* Desktop: Title and legend on same row */}
      <div className="hidden md:block" style={{ marginBottom: 12 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Brand Positioning
          </h3>
          
          {/* Brand legend - top right on desktop */}
          <div style={{ 
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}>
            <div className="flex items-center gap-1.5" style={{ 
              backgroundColor: "#F5F0EB",
              borderRadius: "var(--radius-pill)",
              padding: "3px",
              minWidth: "max-content",
              display: "inline-flex",
            }}>
              {brandPositions.map((brand) => (
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
        
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Scale (size) vs Velocity (momentum) for Capturing Attention
        </p>
      </div>

      {/* Scatter Chart */}
      <div
        style={{
          backgroundColor: "rgba(245,240,235,0.4)",
          borderRadius: 10,
          padding: 20,
          position: "relative",
          height: 280,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 240" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <line x1="300" y1="0" x2="300" y2="240" stroke="#E8E2DC" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="120" x2="600" y2="120" stroke="#E8E2DC" strokeWidth="1" strokeDasharray="4 4" />

          {/* Quadrant labels */}
          <text x="8" y="16" fontSize="11" fill="#B5ADA5" textAnchor="start">
            Rising Star
          </text>
          <text x="592" y="16" fontSize="11" fill="#B5ADA5" textAnchor="end">
            Dominant
          </text>
          <text x="8" y="236" fontSize="11" fill="#B5ADA5" textAnchor="start">
            Stalling
          </text>
          <text x="592" y="236" fontSize="11" fill="#B5ADA5" textAnchor="end">
            Coasting
          </text>

          {/* Axis labels */}
          <text x="300" y="235" fontSize="11" fill="#7A6F65" textAnchor="middle">
            Scale →
          </text>
          <text
            x="10"
            y="120"
            fontSize="11"
            fill="#7A6F65"
            textAnchor="middle"
            transform="rotate(-90 10 120)"
          >
            Velocity →
          </text>

          {/* Brand dots */}
          {brandPositions.map((brand) => {
            const cx = (brand.x / 100) * 600;
            const cy = 240 - (brand.y / 100) * 240;
            const isMainBrand = brand.name === mainBrand;
            return (
              <g key={brand.name}>
                <circle cx={cx} cy={cy} r={isMainBrand ? 14 : 11} fill={brand.color} opacity={0.9} />
                <text
                  x={cx + 20}
                  y={cy + 4}
                  fontSize="11"
                  fill={isMainBrand ? brand.color : "var(--text-primary)"}
                  fontWeight={isMainBrand ? 700 : 400}
                  fontFamily="var(--font-body)"
                >
                  {brand.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function CompetitiveRankingTable() {
  const tableData = [
    {
      brand: "Glossier",
      color: "#DAC58C",
      sos: 84,
      momentum: 71,
      social: { value: 82, isHighest: true },
      llm: 79,
      isRhode: false,
    },
    {
      brand: "Rhode",
      color: "#B86A54",
      sos: 81,
      momentum: 79,
      social: { value: 76, isHighest: false },
      llm: { value: 83, isHighest: true },
      isRhode: true,
    },
    {
      brand: "Clinique",
      color: "#ACBDA7",
      sos: 79,
      momentum: 68,
      social: { value: 71, isHighest: false },
      llm: 81,
      isRhode: false,
    },
    {
      brand: "Laneige",
      color: "#6B241E",
      sos: 74,
      momentum: { value: 82, isHighest: true },
      social: { value: 79, isHighest: false },
      llm: 77,
      isRhode: false,
    },
    {
      brand: "Summer Fri.",
      color: "#374762",
      sos: 72,
      momentum: 75,
      social: { value: 80, isHighest: false },
      llm: 69,
      isRhode: false,
    },
  ];

  const renderCell = (value: number | { value: number; isHighest: boolean }) => {
    if (typeof value === "number") {
      return value;
    }
    return (
      <span
        style={{
          color: value.isHighest ? "#B86A54" : "inherit",
          fontWeight: value.isHighest ? 700 : 400,
        }}
      >
        {value.value}
      </span>
    );
  };

  return (
    null
  );
}

function BrandComparisonTrend() {
  const lines = [
    {
      name: "Rhode",
      color: "#B86A54",
      width: 2.5,
      path: "M0,180 C80,175 160,165 240,150 C320,130 400,110 480,85 C520,70 560,55 600,40",
    },
    {
      name: "Summer Fridays",
      color: "#374762",
      width: 1.5,
      path: "M0,200 C80,195 160,190 240,180 C320,165 400,150 480,135 C520,125 560,115 600,105",
    },
    {
      name: "Glossier",
      color: "#DAC58C",
      width: 1.5,
      path: "M0,150 C80,148 160,145 240,140 C320,135 400,130 480,125 C520,122 560,118 600,115",
    },
    {
      name: "Clinique",
      color: "#ACBDA7",
      width: 1.5,
      path: "M0,210 C80,208 160,205 240,200 C320,195 400,188 480,180 C520,175 560,170 600,165",
    },
    {
      name: "Laneige",
      color: "#6B241E",
      width: 1.5,
      path: "M0,190 C80,188 160,185 240,178 C320,168 400,155 480,140 C520,132 560,122 600,110",
    },
  ];

  const { getAxisLabels } = useDateMode();
  const months = getAxisLabels();

  return (
    null
  );
}

function HistoricalView() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { selectedDate, dateMode } = useDateMode();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];

  type BrandSeries = { name: string; color: string; data: (number | null)[] };
  const [shareOfSearchData, setShareOfSearchData] = useState<BrandSeries[]>([]);
  const [totalFollowersData, setTotalFollowersData] = useState<BrandSeries[]>([]);
  const [interactionsData, setInteractionsData] = useState<BrandSeries[]>([]);
  const [llmRankData, setLlmRankData] = useState<BrandSeries[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  useEffect(() => {
    setShareOfSearchData([]);
    setTotalFollowersData([]);
    setInteractionsData([]);
    setLlmRankData([]);
    setChartLabels([]);

    async function load() {
      const toDate = new Date(selectedDate);
      // Last 7 periods: 7 days for Daily/Rolling 30, 7 months for Monthly
      const fromDate = computeAxisDates(dateMode, selectedDate)[0];

      const { data } = await supabase
        .from("c1_attention_metrics")
        .select("brand_name, date, c1_scale_share_of_search_pct, c1_scale_total_followers, c1_scale_interactions, c1_scale_llm_rank")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .gte("date", toISODateString(fromDate))
        .lte("date", toISODateString(toDate))
        .order("date", { ascending: true });

      // Always render the 7 axis labels even when there's no data
      const axisDatesEarly = computeAxisDates(dateMode, selectedDate);
      setChartLabels(axisDatesEarly.map(d =>
        dateMode === "Monthly"
          ? d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
          : d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      ));

      if (!data?.length) return;

      // Group rows by brand → date → row (keyed by exact DB date string)
      const byBrand: Record<string, Record<string, typeof data[0]>> = {};
      for (const row of data) {
        if (!byBrand[row.brand_name]) byBrand[row.brand_name] = {};
        byBrand[row.brand_name][row.date] = row;
      }

      // Always use the 7 fixed axis positions — labels shown even with no data
      const axisDates = computeAxisDates(dateMode, selectedDate);
      const axisKeys = axisDates.map(d => toISODateString(d));

      const colors: Record<string, string> = {};
      for (const b of categoryBrandList) colors[b.name] = b.color;

      const mkSeries = (metricKey: "c1_scale_share_of_search_pct" | "c1_scale_total_followers" | "c1_scale_interactions" | "c1_scale_llm_rank"): BrandSeries[] =>
        selectedBrands
          .map(b => ({
            name: b,
            color: colors[b] ?? "#B86A54",
            data: axisKeys.map(axisKey => {
              const brandData = byBrand[b] ?? {};
              if (dateMode === "Monthly") {
                // Match any DB date in the same YYYY-MM, take the latest available
                const month = axisKey.substring(0, 7);
                const matches = Object.keys(brandData).filter(d => d.startsWith(month)).sort();
                const hit = matches.length ? matches[matches.length - 1] : null;
                return hit ? (brandData[hit]?.[metricKey] ?? null) : null;
              }
              return brandData[axisKey]?.[metricKey] ?? null;
            }),
          }));

      setShareOfSearchData(mkSeries("c1_scale_share_of_search_pct"));
      setTotalFollowersData(mkSeries("c1_scale_total_followers"));
      setInteractionsData(mkSeries("c1_scale_interactions"));
      setLlmRankData(mkSeries("c1_scale_llm_rank"));

      // X-axis: always the 7 formatted axis labels
      setChartLabels(axisDates.map(d =>
        dateMode === "Monthly"
          ? d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
          : d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      ));
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate, dateMode]);

  const MetricChart = ({
    title,
    data,
    format,
  }: {
    title: string;
    data: Array<{ name: string; color: string; data: (number | null)[] }>;
    format: (val: number) => string;
  }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
    const labels = chartLabels;
    const numPoints = data[0]?.data.length ?? 0;

    // Find global min/max for consistent scaling
    const allValues = data.flatMap(brand => brand.data).filter((v): v is number => v !== null);
    const globalMax = allValues.length ? Math.max(...allValues) : 1;
    const globalMin = allValues.length ? Math.min(...allValues) : 0;
    const range = globalMax - globalMin || 1;

    return (
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 600,
            color: "#7A6F65",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: 12,
          }}
        >
          {title}
        </h4>

        {/* Multi-line chart */}
        <div
          style={{
            backgroundColor: "rgba(245,240,235,0.3)",
            borderRadius: 10,
            padding: 16,
            position: "relative",
          }}
        >
          <svg width="100%" height="140" viewBox="0 0 360 140" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 1, 2, 3].map((i) => {
              const y = (i / 3) * 120 + 10;
              return (
                <line
                  key={i}
                  x1="0"
                  y1={y}
                  x2="360"
                  y2={y}
                  stroke="#E8E2DC"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}

            {/* Brand trend lines + dots */}
            {data.map((brand) => {
              // Collect non-null points (for dots only)
              const points: { x: number; y: number; i: number }[] = [];
              for (let i = 0; i < brand.data.length; i++) {
                const value = brand.data[i];
                if (value === null) continue;
                const x = numPoints > 1 ? (i / (numPoints - 1)) * 360 : 180;
                const y = 130 - ((value - globalMin) / range) * 110;
                points.push({ x, y, i });
              }

              // Build continuous path: nulls draw at y=130 (physical bottom)
              const pathParts: string[] = [];
              for (let i = 0; i < brand.data.length; i++) {
                const value = brand.data[i];
                const x = numPoints > 1 ? (i / (numPoints - 1)) * 360 : 180;
                const y = value !== null ? (130 - ((value - globalMin) / range) * 110) : 130;
                pathParts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
              }
              const pathData = pathParts.join(" ");

              const r = brand.name === mainBrand ? 3.5 : 2.5;

              return (
                <g key={brand.name}>
                  {/* Line */}
                  {pathData && (
                    <path
                      d={pathData}
                      fill="none"
                      stroke={brand.color}
                      strokeWidth={brand.name === mainBrand ? "2.5" : "1.5"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {/* Dots at every non-null data point */}
                  {points.map(({ x, y, i: di }) => (
                    <circle
                      key={di}
                      cx={x}
                      cy={y}
                      r={hoveredIndex === di ? r + 1.5 : r}
                      fill={brand.color}
                      stroke="#fff"
                      strokeWidth={brand.name === mainBrand ? "1.5" : "1"}
                    />
                  ))}
                </g>
              );
            })}

            {/* Invisible hover zones for each label */}
            {labels.map((_, index) => {
              const x = labels.length > 1 ? (index / (labels.length - 1)) * 360 : 180;
              const zoneWidth = labels.length > 1 ? 360 / (labels.length - 1) : 360;
              
              return (
                <rect
                  key={index}
                  x={index === 0 ? 0 : x - zoneWidth / 2}
                  y="0"
                  width={index === 0 || index === labels.length - 1 ? zoneWidth / 2 : zoneWidth}
                  height="140"
                  fill="transparent"
                  style={{ cursor: "crosshair" }}
                  onMouseEnter={(e) => {
                    setHoveredIndex(index);
                    const svg = e.currentTarget.ownerSVGElement;
                    if (svg) {
                      const container = svg.parentElement;
                      if (container) {
                        const containerRect = container.getBoundingClientRect();
                        const svgRect = svg.getBoundingClientRect();
                        const svgX = (x / 360) * svgRect.width + (svgRect.left - containerRect.left);
                        setTooltipPosition({ x: svgX, y: 0 });
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    setTooltipPosition(null);
                  }}
                />
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredIndex !== null && tooltipPosition && (
            <div
              style={{
                position: "absolute",
                left: `clamp(80px, ${tooltipPosition.x}px, calc(100% - 80px))`,
                top: 0,
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                border: "1px solid #E8E2DC",
                borderRadius: 8,
                padding: "8px 12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                pointerEvents: "none",
                zIndex: 1000,
                minWidth: 140,
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
                {labels[hoveredIndex]}
              </div>
              {data.map((brand) => (
                <div
                  key={brand.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 4,
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
                    {(() => {
                      // Map hoveredIndex (label index) to closest data index
                      const dataIdx = numPoints > 1
                        ? Math.round(hoveredIndex! * (numPoints - 1) / Math.max(labels.length - 1, 1))
                        : 0;
                      const val = brand.data[dataIdx];
                      return val != null ? format(val) : "—";
                    })()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Date labels */}
          <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
            {labels.map((label, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 8,
                  color: "#B5ADA5",
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
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
      {/* Mobile: Stacked layout */}
      <div className="block md:hidden" style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          Historical View
        </h3>

        {/* Brand legend */}
        <div style={{ 
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          marginBottom: 8,
        }}>
          <div className="flex items-center gap-1.5" style={{ 
            backgroundColor: "#F5F0EB",
            borderRadius: "var(--radius-pill)",
            padding: "3px",
            minWidth: "max-content",
            display: "inline-flex",
          }}>
            {shareOfSearchData.map((brand) => (
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

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Brand performance trends across key metrics
        </p>
      </div>

      {/* Desktop: Title and legend on same row */}
      <div className="hidden md:block" style={{ marginBottom: 16 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Historical View
          </h3>

          {/* Brand legend - top right on desktop */}
          <div style={{ 
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}>
            <div className="flex items-center gap-1.5" style={{ 
              backgroundColor: "#F5F0EB",
              borderRadius: "var(--radius-pill)",
              padding: "3px",
              minWidth: "max-content",
              display: "inline-flex",
            }}>
              {shareOfSearchData.map((brand) => (
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

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Brand performance trends across key metrics
        </p>
      </div>

      {/* Four metric charts - one per row on mobile, 2x2 on desktop */}
      <div className="flex flex-col md:grid md:grid-cols-2" style={{ gap: 16 }}>
        <MetricChart title="Share of Search" data={shareOfSearchData} format={v => `${v.toFixed(1)}%`} />
        <MetricChart title="Total Followers" data={totalFollowersData} format={v => `${(v / 1_000_000).toFixed(2)}M`} />
        <MetricChart title="Interactions" data={interactionsData} format={v => `${(v / 1000).toFixed(0)}K`} />
        <MetricChart title="LLM Rank" data={llmRankData} format={v => `#${v}`} />
      </div>
    </div>
  );
}

function InsightCardC1() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        borderLeft: "3px solid #B86A54",
        border: "1px solid var(--border-subtle)",
        borderLeftWidth: 3,
        borderLeftColor: "#B86A54",
        padding: 20,
      }}
    >
      <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 15 }}>💡</span>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Insight
        </h3>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "#7A6F65",
          lineHeight: 1.6,
          marginBottom: 12,
        }}
      >
        Share of Search (p=0.017), Search Momentum (p=0.023), and Search Volume (p=0.034) all
        predict sales changes 2–4 months ahead. When these metrics move, market share follows within
        a quarter. Social Engagement (p=0.059) shows marginal significance at 3-month lead.
      </p>
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
          3 of 5 metrics are validated sales predictors
        </span>
      </div>
    </div>
  );
}