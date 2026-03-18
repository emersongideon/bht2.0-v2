import { useState } from "react";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { useDateMode } from "../../contexts/date-mode-context";
import { MobileHeader } from "../mobile-header";
import { useOutletContext } from "react-router";
import { useBrand } from "../../contexts/brand-context";
import { useAppData } from "../../data/app-data-context";
import { getBrandSubScore } from "../../utils/brand-utils";
import { useDimension, useSubmetrics } from "../../data/use-dimensions";

export function DeepDiveC1Page() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const { submetrics } = useSubmetrics("C1");

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
        <DimensionHeader />

        {/* Row 4 — Sub-metric cards (3 source cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 12, flexShrink: 0 }}>
          <ScoreCard title={submetrics[0]?.submetric_name ?? "Search"} badge="Search" score="78" delta="▲ 2.4" />
          <ScoreCard title={submetrics[1]?.submetric_name ?? "Social"} badge="Social" score="76" delta="▲ 1.4" />
          <ScoreCard title={submetrics[2]?.submetric_name ?? "LLM"} badge="LLM" score="83" delta="▲ 5.1" />
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

function DimensionHeader() {
  const { dimension: dim } = useDimension("C1");
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
            82
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
            ▲ 3.1
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
              82
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
              ▲ 3.1
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
          {dim?.page_description ?? "The cultural energy and momentum the brand carries right now."}
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
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();

  const allCategoryBrands = brandsByCategory[selectedCategory] ?? [];

  const allSearchData = [...allCategoryBrands]
    .map(b => ({ brand: b.name, score: getBrandSubScore(b.name, "c1_search"), color: b.color }))
    .sort((a, b) => b.score - a.score);

  const allSocialData = [...allCategoryBrands]
    .map(b => ({ brand: b.name, score: getBrandSubScore(b.name, "c1_social"), color: b.color }))
    .sort((a, b) => b.score - a.score);

  const allLlmData = [...allCategoryBrands]
    .map(b => ({ brand: b.name, score: getBrandSubScore(b.name, "c1_llm"), color: b.color }))
    .sort((a, b) => b.score - a.score);

  // Filter to only show selected brands
  const searchData = allSearchData.filter(item => selectedBrands.includes(item.brand));
  const socialData = allSocialData.filter(item => selectedBrands.includes(item.brand));
  const llmData = allLlmData.filter(item => selectedBrands.includes(item.brand));

  const maxScore = 100;

  const renderColumn = (title: string, data: typeof searchData) => (
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
        >Search, Social & LLM performance across brands</p>
      </div>

      {/* Three-column layout - stacks on mobile */}
      <div className="flex flex-col md:flex-row" style={{ gap: 24 }}>
        {renderColumn("SEARCH", searchData)}
        {renderColumn("SOCIAL", socialData)}
        {renderColumn("LLM", llmData)}
      </div>
    </div>
  );
}

function ScaleVelocityPanel() {
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
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(245,240,235,0.6)",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div className="flex items-baseline justify-between" style={{ marginBottom: 12 }}>
            <div><span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#7A6F65",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >SCALE</span><span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "#B5ADA5",
                  marginLeft: 8,
                }}
              >Where you stand right now</span></div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                78
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "#B5ADA5",
                }}
              >
                /100
              </span>
            </div>
          </div>
          <div className="flex" style={{ gap: 10 }}>
            <MetricTile label="SHARE OF SEARCH" value="18.2%" rank="Rank #2" />
            <MetricTile label="TOTAL FOLLOWERS" value="2.4M" rank="Rank #3" />
            <MetricTile label="INTERACTIONS" value="842K" rank="Rank #2" />
            <MetricTile label="LLM RANK" value="#2" rank="of 5" />
          </div>
        </div>

        {/* Velocity Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(74,102,68,0.04)",
            borderRadius: 14,
            padding: 16,
          }}
        >
          <div className="flex items-baseline justify-between" style={{ marginBottom: 12 }}>
            <div><span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#4A6644",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >VELOCITY</span><span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "#B5ADA5",
                  marginLeft: 8,
                }}
              >Where you're headed</span></div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#4A6644",
                }}
              >
                87
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "#B5ADA5",
                }}
              >
                /100
              </span>
            </div>
          </div>
          <div className="flex" style={{ gap: 10 }}>
            <VelocityTile label="SEARCH MOMENTUM" value="+12%" arrows="▲▲▲" />
            <VelocityTile label="FOLLOWER GROWTH" value="+8.3%" arrows="▲▲" />
            <VelocityTile label="INTERACTIONS Δ" value="+1.2pp" arrows="▲" />
            <VelocityTile label="LLM RANK CHANGE" value="+3.1pp" arrows="▲▲▲" />
          </div>
        </div>
      </div>

      {/* 2x2 Scatter Chart */}
      <BrandPositioningScatter />
    </div>
  );
}

function MetricTile({ label, value, rank }: { label: string; value: string; rank: string }) {
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

function VelocityTile({ label, value, arrows }: { label: string; value: string; arrows: string }) {
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

function BrandPositioningScatter() {
  const { selectedBrands, mainBrand } = useBrand();
  
  const allBrandPositions = [
    { name: "Rhode", x: 75, y: 78, size: 14, color: "#B86A54" },
    { name: "Glossier", x: 70, y: 52, size: 11, color: "#DAC58C" },
    { name: "Summer Fridays", x: 35, y: 75, size: 11, color: "#374762" },
    { name: "Clinique", x: 72, y: 28, size: 11, color: "#ACBDA7" },
    { name: "Laneige", x: 52, y: 72, size: 11, color: "#6B241E" },
  ];

  // Filter to only show selected brands
  const brandPositions = allBrandPositions.filter(brand => selectedBrands.includes(brand.name));

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
          <text x="150" y="30" fontSize="11" fill="#B5ADA5" textAnchor="middle">
            Rising Star
          </text>
          <text x="450" y="30" fontSize="11" fill="#B5ADA5" textAnchor="middle">
            Dominant
          </text>
          <text x="150" y="220" fontSize="11" fill="#B5ADA5" textAnchor="middle">
            Stalling
          </text>
          <text x="450" y="220" fontSize="11" fill="#B5ADA5" textAnchor="middle">
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
                <circle cx={cx} cy={cy} r={brand.size} fill={brand.color} opacity={0.9} />
                {isMainBrand && (
                  <rect
                    x={cx + 20}
                    y={cy - 10}
                    width={50}
                    height={20}
                    rx="10"
                    fill="rgba(184,106,84,0.15)"
                  />
                )}
                <text
                  x={cx + (isMainBrand ? 45 : 20)}
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
  const { getAxisLabels } = useDateMode();
  const { selectedBrands, mainBrand } = useBrand();
  const months = getAxisLabels();
  
  // Share of Search historical data for each brand
  const allShareOfSearchData = [
    { name: "Rhode", color: "#B86A54", data: [16.1, 16.5, 17.0, 17.4, 17.8, 18.0, 18.2] },
    { name: "Glossier", color: "#DAC58C", data: [19.2, 19.0, 18.5, 18.1, 17.8, 17.5, 17.2] },
    { name: "Summer Fridays", color: "#374762", data: [14.2, 14.5, 14.8, 15.1, 15.4, 15.6, 15.8] },
    { name: "Clinique", color: "#ACBDA7", data: [15.8, 15.7, 15.5, 15.3, 15.1, 14.9, 14.7] },
    { name: "Laneige", color: "#6B241E", data: [12.5, 12.8, 13.1, 13.4, 13.7, 14.0, 14.3] },
  ];
  const shareOfSearchData = allShareOfSearchData.filter(brand => selectedBrands.includes(brand.name));

  // Total Followers historical data for each brand (in millions)
  const allTotalFollowersData = [
    { name: "Rhode", color: "#B86A54", data: [2.0, 2.1, 2.15, 2.2, 2.28, 2.35, 2.4] },
    { name: "Glossier", color: "#DAC58C", data: [3.2, 3.18, 3.15, 3.1, 3.05, 3.0, 2.95] },
    { name: "Summer Fridays", color: "#374762", data: [1.8, 1.85, 1.9, 1.95, 2.0, 2.05, 2.1] },
    { name: "Clinique", color: "#ACBDA7", data: [2.5, 2.48, 2.45, 2.42, 2.4, 2.38, 2.35] },
    { name: "Laneige", color: "#6B241E", data: [1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9] },
  ];
  const totalFollowersData = allTotalFollowersData.filter(brand => selectedBrands.includes(brand.name));

  // Interactions historical data for each brand (in thousands)
  const allInteractionsData = [
    { name: "Rhode", color: "#B86A54", data: [720, 750, 780, 800, 820, 835, 842] },
    { name: "Glossier", color: "#DAC58C", data: [890, 880, 865, 850, 835, 820, 805] },
    { name: "Summer Fridays", color: "#374762", data: [650, 670, 690, 710, 730, 745, 760] },
    { name: "Clinique", color: "#ACBDA7", data: [780, 775, 765, 755, 745, 735, 725] },
    { name: "Laneige", color: "#6B241E", data: [600, 620, 640, 660, 680, 695, 710] },
  ];
  const interactionsData = allInteractionsData.filter(brand => selectedBrands.includes(brand.name));

  // LLM Rank historical data for each brand (score out of 100)
  const allLlmRankData = [
    { name: "Rhode", color: "#B86A54", data: [75, 76, 78, 79, 81, 82, 83] },
    { name: "Glossier", color: "#DAC58C", data: [82, 82, 81, 81, 80, 80, 80] },
    { name: "Summer Fridays", color: "#374762", data: [68, 69, 69, 70, 71, 71, 72] },
    { name: "Clinique", color: "#ACBDA7", data: [79, 79, 80, 80, 81, 81, 81] },
    { name: "Laneige", color: "#6B241E", data: [72, 73, 74, 75, 76, 77, 77] },
  ];
  const llmRankData = allLlmRankData.filter(brand => selectedBrands.includes(brand.name));

  const MetricChart = ({ 
    title, 
    data, 
    unit 
  }: { 
    title: string; 
    data: Array<{ name: string; color: string; data: number[] }>; 
    unit: string;
  }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);

    // Find global min/max for consistent scaling
    const allValues = data.flatMap(brand => brand.data);
    const globalMax = Math.max(...allValues);
    const globalMin = Math.min(...allValues);
    const range = globalMax - globalMin;

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

            {/* Brand trend lines */}
            {data.map((brand) => {
              // Generate SVG path for this brand
              const points = brand.data.map((value, index) => {
                const x = (index / (brand.data.length - 1)) * 360;
                const y = 130 - ((value - globalMin) / range) * 110;
                return `${x},${y}`;
              });
              const pathData = `M ${points.join(" L ")}`;

              return (
                <g key={brand.name}>
                  {/* Line */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={brand.color}
                    strokeWidth={brand.name === mainBrand ? "2.5" : "1.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })}

            {/* Invisible hover zones for each month */}
            {months.map((month, index) => {
              const x = (index / (months.length - 1)) * 360;
              const zoneWidth = 360 / (months.length - 1);
              
              return (
                <rect
                  key={index}
                  x={index === 0 ? 0 : x - zoneWidth / 2}
                  y="0"
                  width={index === 0 || index === months.length - 1 ? zoneWidth / 2 : zoneWidth}
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
                left: tooltipPosition.x,
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
                {months[hoveredIndex]}
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
                    {brand.data[hoveredIndex]}{unit}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Month labels */}
          <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
            {months.map((month, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 8,
                  color: "#B5ADA5",
                  fontWeight: 500,
                }}
              >
                {month}
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
                    backgroundColor: brand.name === "Rhode" ? "#FFFFFF" : "transparent",
                    color: brand.name === "Rhode" ? "var(--text-primary)" : "#7A6F65",
                    fontWeight: brand.name === "Rhode" ? 600 : 400,
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
        <MetricChart title="Share of Search" data={shareOfSearchData} unit="%" />
        <MetricChart title="Total Followers" data={totalFollowersData} unit="M" />
        <MetricChart title="Interactions" data={interactionsData} unit="K" />
        <MetricChart title="LLM Rank" data={llmRankData} unit="" />
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