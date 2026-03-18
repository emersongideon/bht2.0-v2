import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { useState } from "react";
import { useDateMode } from "../../contexts/date-mode-context";
import { useBrand } from "../../contexts/brand-context";
import { useDimension, useSubmetrics } from "../../data/use-dimensions";
import { MobileHeader } from "../mobile-header";
import { useOutletContext } from "react-router";

const brands = [
  { name: "Rhode", color: "#B86A54" },
  { name: "Summer Fridays", color: "#374762" },
  { name: "Glossier", color: "#DAC58C" },
  { name: "Clinique", color: "#ACBDA7" },
  { name: "Laneige", color: "#6B241E" },
];

export function DeepDiveOPage() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const { submetrics } = useSubmetrics("O");

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
        <DimensionHeader />

        {/* Row 4 — Sub-metric card (1 card) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, flexShrink: 0 }}>
          <ScoreCard title={submetrics[0]?.submetric_name ?? "Favourability"} badge="Social" score="82" delta="▲ 0.8" />
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

function DimensionHeader() {
  const { dimension: dim } = useDimension("O");
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
            85
          </span>
        </div>

        {/* Delta */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(74,102,68,0.1)",
              color: "#4A6644",
              fontWeight: 600,
            }}
          >
            ▲ 1.6
          </span>
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
              85
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "rgba(74,102,68,0.1)",
                color: "#4A6644",
                fontWeight: 600,
              }}
            >
              ▲ 1.6
            </span>
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
  score,
  delta,
}: {
  title: string;
  badge: string;
  score: string;
  delta: string;
}) {
  const isPositive = delta.includes("▲");
  const { getAxisLabels } = useDateMode();
  const axisLabels = getAxisLabels();
  
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
          {score}
        </span>
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
          {delta}
        </span>
      </div>

      {/* Sparkline */}
      <div>
        <svg width="100%" height="36" viewBox="0 0 300 36" preserveAspectRatio="none">
          <path
            d="M0,22 C50,24 100,20 150,18 C200,16 250,14 300,12"
            fill="none"
            stroke="#B5ADA5"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
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
  const { selectedBrands, mainBrand } = useBrand();
  
  const allFavourabilityData = [
    { brand: "Glossier", score: 85, color: "#DAC58C" },
    { brand: "Rhode", score: 82, color: "#B86A54" },
    { brand: "Clinique", score: 79, color: "#ACBDA7" },
    { brand: "Summer Fridays", score: 76, color: "#374762" },
    { brand: "Laneige", score: 72, color: "#6B241E" },
  ];

  // Filter to only show selected brands
  const favourabilityData = allFavourabilityData.filter(item => selectedBrands.includes(item.brand));

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
                    width: `${(item.score / maxScore) * 100}%`,
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
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SentimentTrend() {
  const { getAxisLabels } = useDateMode();
  const months = getAxisLabels();
  const { selectedBrands, mainBrand } = useBrand();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Chart dimensions in viewBox units
  const VB_W = 600;
  const VB_H = 200;
  const PAD_TOP = 20;
  const PAD_BOT = 20;
  const Y_MIN = 38; // lowest displayed %
  const Y_MAX = 84; // highest displayed %
  const plotH = VB_H - PAD_TOP - PAD_BOT;

  const valueToY = (val: number) =>
    PAD_TOP + ((Y_MAX - val) / (Y_MAX - Y_MIN)) * plotH;
  const indexToX = (i: number) => (i / (months.length - 1)) * VB_W;

  const allBrandLines = [
    { name: "Glossier", color: "#DAC58C",
      values: [68.9, 69.8, 72.4, 74.2, 76.0, 78.7, 81.3] },
    { name: "Rhode", color: "#B86A54",
      values: [60.0, 60.9, 62.7, 64.4, 66.7, 69.8, 72.4] },
    { name: "Laneige", color: "#6B241E",
      values: [53.3, 54.2, 55.6, 57.3, 59.1, 60.9, 62.7] },
    { name: "Summer Fridays", color: "#374762",
      values: [48.9, 49.3, 50.2, 52.0, 53.3, 54.7, 56.4] },
    { name: "Clinique", color: "#ACBDA7",
      values: [42.2, 43.1, 44.0, 45.3, 46.7, 47.6, 48.9] },
  ];

  // Filter to only show selected brands
  const brandLines = allBrandLines.filter(brand => selectedBrands.includes(brand.name));

  // Build SVG path strings from data
  const buildPath = (values: number[]) =>
    values
      .map((v, i) => `${i === 0 ? "M" : "L"}${indexToX(i).toFixed(1)},${valueToY(v).toFixed(1)}`)
      .join(" ");

  // Gridline Y positions
  const gridlines = [80, 60, 40];

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

      <div className="sentiment-chart-wrapper">
      {/* Chart area with Y-axis labels */}
      <div className="flex" style={{ flex: 1, marginBottom: 8, minWidth: 0 }}>
        {/* Y-axis labels */}
        <div
          style={{
            width: 28,
            flexShrink: 0,
            position: "relative",
            height: 120,
            paddingTop: PAD_TOP * 0.6,
            paddingBottom: PAD_BOT * 0.6,
            boxSizing: "border-box",
          }}
        >
          {gridlines.map((val) => {
            // Calculate position relative to the container that now has padding
            const yPos = ((Y_MAX - val) / (Y_MAX - Y_MIN)) * (120 - (PAD_TOP * 0.6) - (PAD_BOT * 0.6));
            return (
              <span
                key={val}
                style={{
                  position: "absolute",
                  right: 4,
                  top: yPos,
                  transform: "translateY(-50%)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "#B5ADA5",
                }}
              >
                {val}%
              </span>
            );
          })}
        </div>

        {/* SVG chart */}
        <div style={{ position: "relative", flex: 1, height: 120 }}>
          <svg
            width="100%"
            height="120"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            style={{ display: "block" }}
            onMouseMove={(e) => {
              const svg = e.currentTarget;
              const svgRect = svg.getBoundingClientRect();
              const container = svg.parentElement;
              if (!container) return;
              const containerRect = container.getBoundingClientRect();
              const mouseXRatio = (e.clientX - svgRect.left) / svgRect.width;
              const mouseXInVB = mouseXRatio * VB_W;
              // Snap to nearest month
              const idx = Math.round((mouseXInVB / VB_W) * (months.length - 1));
              const clampedIdx = Math.max(0, Math.min(months.length - 1, idx));
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

            {/* Clickable month zones */}
            {months.map((month, i) => {
              const zoneW = VB_W / months.length;
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

          {/* Tooltip */}
          {hoveredIndex !== null && tooltipPos && (
            <div
              style={{
                position: "absolute",
                left: tooltipPos.x,
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
                {months[hoveredIndex]}
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
                    {brand.values[hoveredIndex].toFixed(1)}%
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
        {months.map((month, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: mainBrand === "Rhode" ? "#B86A54" : "#B5ADA5",
              fontWeight: mainBrand === "Rhode" ? 700 : 400,
              textAlign: "center",
            }}
          >
            {month}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}

function SentimentSplit() {
  const { selectedBrands, mainBrand } = useBrand();
  
  const monthFullNames: Record<string, string> = {
    Sep: "September 2025", Oct: "October 2025", Nov: "November 2025",
    Dec: "December 2025", Jan: "January 2026", Feb: "February 2026", Mar: "March 2026",
  };

  const monthlyData: Record<string, { brand: string; color: string; positive: number; neutral: number; negative: number }[]> = {
    Sep: [
      { brand: "Rhode", color: "#B86A54", positive: 62, neutral: 24, negative: 14 },
      { brand: "Summer Fridays", color: "#374762", positive: 58, neutral: 26, negative: 16 },
      { brand: "Glossier", color: "#DAC58C", positive: 70, neutral: 18, negative: 12 },
      { brand: "Clinique", color: "#ACBDA7", positive: 52, neutral: 30, negative: 18 },
      { brand: "Laneige", color: "#6B241E", positive: 60, neutral: 24, negative: 16 },
    ],
    Oct: [
      { brand: "Rhode", color: "#B86A54", positive: 64, neutral: 23, negative: 13 },
      { brand: "Summer Fridays", color: "#374762", positive: 59, neutral: 25, negative: 16 },
      { brand: "Glossier", color: "#DAC58C", positive: 71, neutral: 18, negative: 11 },
      { brand: "Clinique", color: "#ACBDA7", positive: 53, neutral: 30, negative: 17 },
      { brand: "Laneige", color: "#6B241E", positive: 61, neutral: 23, negative: 16 },
    ],
    Nov: [
      { brand: "Rhode", color: "#B86A54", positive: 66, neutral: 21, negative: 13 },
      { brand: "Summer Fridays", color: "#374762", positive: 60, neutral: 25, negative: 15 },
      { brand: "Glossier", color: "#DAC58C", positive: 73, neutral: 17, negative: 10 },
      { brand: "Clinique", color: "#ACBDA7", positive: 54, neutral: 29, negative: 17 },
      { brand: "Laneige", color: "#6B241E", positive: 63, neutral: 22, negative: 15 },
    ],
    Dec: [
      { brand: "Rhode", color: "#B86A54", positive: 67, neutral: 20, negative: 13 },
      { brand: "Summer Fridays", color: "#374762", positive: 61, neutral: 24, negative: 15 },
      { brand: "Glossier", color: "#DAC58C", positive: 74, neutral: 16, negative: 10 },
      { brand: "Clinique", color: "#ACBDA7", positive: 55, neutral: 29, negative: 16 },
      { brand: "Laneige", color: "#6B241E", positive: 64, neutral: 22, negative: 14 },
    ],
    Jan: [
      { brand: "Rhode", color: "#B86A54", positive: 69, neutral: 19, negative: 12 },
      { brand: "Summer Fridays", color: "#374762", positive: 62, neutral: 24, negative: 14 },
      { brand: "Glossier", color: "#DAC58C", positive: 76, neutral: 15, negative: 9 },
      { brand: "Clinique", color: "#ACBDA7", positive: 56, neutral: 29, negative: 15 },
      { brand: "Laneige", color: "#6B241E", positive: 66, neutral: 21, negative: 13 },
    ],
    Feb: [
      { brand: "Rhode", color: "#B86A54", positive: 70, neutral: 19, negative: 11 },
      { brand: "Summer Fridays", color: "#374762", positive: 63, neutral: 23, negative: 14 },
      { brand: "Glossier", color: "#DAC58C", positive: 77, neutral: 15, negative: 8 },
      { brand: "Clinique", color: "#ACBDA7", positive: 57, neutral: 28, negative: 15 },
      { brand: "Laneige", color: "#6B241E", positive: 67, neutral: 21, negative: 12 },
    ],
    Mar: [
      { brand: "Rhode", color: "#B86A54", positive: 72, neutral: 18, negative: 10 },
      { brand: "Summer Fridays", color: "#374762", positive: 65, neutral: 22, negative: 13 },
      { brand: "Glossier", color: "#DAC58C", positive: 78, neutral: 14, negative: 8 },
      { brand: "Clinique", color: "#ACBDA7", positive: 58, neutral: 28, negative: 14 },
      { brand: "Laneige", color: "#6B241E", positive: 68, neutral: 20, negative: 12 },
    ],
  };

  // Filter to only show selected brands
  const data = monthlyData["Mar"].filter(item => selectedBrands.includes(item.brand));

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
  const { selectedBrands, mainBrand } = useBrand();
  
  const allDonutData = [
    { brand: "Rhode", percentage: 28, color: "#B86A54" },
    { brand: "Glossier", percentage: 24, color: "#DAC58C" },
    { brand: "Laneige", percentage: 19, color: "#6B241E" },
    { brand: "Summer Fridays", percentage: 16, color: "#374762" },
    { brand: "Clinique", percentage: 13, color: "#ACBDA7" },
  ];

  // Filter to only show selected brands
  const donutData = allDonutData.filter(item => selectedBrands.includes(item.brand));

  // Calculate donut segments
  let cumulativePercentage = 0;
  const segments = donutData.map((item) => {
    const startAngle = (cumulativePercentage / 100) * 360;
    cumulativePercentage += item.percentage;
    const endAngle = (cumulativePercentage / 100) * 360;
    return { ...item, startAngle, endAngle };
  });

  const getArc = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const start = polarToCartesian(90, 90, outerRadius, endAngle);
    const end = polarToCartesian(90, 90, outerRadius, startAngle);
    const innerStart = polarToCartesian(90, 90, innerRadius, endAngle);
    const innerEnd = polarToCartesian(90, 90, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      "M",
      start.x,
      start.y,
      "A",
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      innerEnd.x,
      innerEnd.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      "Z",
    ].join(" ");
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
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
              stroke="#B86A54"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${(28 / 100) * 2 * Math.PI * 70} ${2 * Math.PI * 70}`}
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
              28
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
          >79%</span>
        </div>
      </div>
    </div>
  );
}

function RecommendationList() {
  const recommendations = [
    {
      platform: "Reddit",
      platformAbbr: "R",
      platformColor: "rgba(255,87,34,0.08)",
      author: "u/skincarejunkie_",
      engagement: "2.4K upvotes",
      quote:
        "Rhode's peptide lip treatment is the only lip product that actually hydrates overnight. I've repurchased 4 times.",
    },
    {
      platform: "TikTok",
      platformAbbr: "TT",
      platformColor: "rgba(0,0,0,0.06)",
      author: "@glowwithme",
      engagement: "184K views",
      quote:
        "Tried the glazing milk and my skin has never looked this good. The glow is insane for a $29 product.",
    },
    {
      platform: "Instagram",
      platformAbbr: "IG",
      platformColor: "rgba(184,106,84,0.08)",
      author: "@thebeautyedit",
      engagement: "12.3K likes",
      quote:
        "If you want Drunk Elephant results without the price tag, Rhode barrier cream is it. Period.",
    },
    {
      platform: "YouTube",
      platformAbbr: "YT",
      platformColor: "rgba(255,0,0,0.06)",
      author: "@skinbysarah",
      engagement: "89K views",
      quote:
        "I recommend Rhode to literally everyone. The formulas are so clean and the results are visible in days.",
    },
    {
      platform: "TikTok",
      platformAbbr: "TT",
      platformColor: "rgba(0,0,0,0.06)",
      author: "@beautyboss22",
      engagement: "312K views",
      quote:
        "This brand doesn't miss. Every single product I've tried from Rhode has become a staple.",
    },
    {
      platform: "Instagram",
      platformAbbr: "IG",
      platformColor: "rgba(184,106,84,0.08)",
      author: "@minimalbeauty",
      engagement: "8.7K likes",
      quote: "Honestly the packaging alone makes it worth it but the product inside is even better.",
    },
    {
      platform: "Reddit",
      platformAbbr: "R",
      platformColor: "rgba(255,87,34,0.08)",
      author: "u/skincareobsessed",
      engagement: "1.8K upvotes",
      quote:
        "Rhode glazing fluid > every other serum I've tried this year. Not even close.",
    },
    {
      platform: "TikTok",
      platformAbbr: "TT",
      platformColor: "rgba(0,0,0,0.06)",
      author: "@realreviews_",
      engagement: "95K views",
      quote:
        "Bought this for my sister and she's now converted her whole friend group. It sells itself.",
    },
  ];

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
          {recommendations.map((rec, index) => (
            <div key={index}>
              {index > 0 && (
                <div style={{ height: 1, backgroundColor: "#F0EBE6", marginBottom: 12 }} />
              )}
              <div className="flex items-start gap-3">
                {/* Platform icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: rec.platformColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#7A6F65",
                    }}
                  >
                    {rec.platformAbbr}
                  </span>
                </div>

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
                    backgroundColor: "#4A6644",
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