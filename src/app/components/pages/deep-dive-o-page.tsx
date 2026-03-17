import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { useState } from "react";
import { useDimension, useSubmetrics } from "../../data/use-dimensions";

const brands = [
  { name: "Rhode", color: "#B86A54" },
  { name: "Summer Fridays", color: "#374762" },
  { name: "Glossier", color: "#DAC58C" },
  { name: "Clinique", color: "#ACBDA7" },
  { name: "Laneige", color: "#6B241E" },
];

export function DeepDiveOPage() {
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const { submetrics } = useSubmetrics("O");

  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        minHeight: "100%",
        width: "100%",
        gap: 12,
      }}
    >
      {/* Row 1 — Top bar */}
      <div className="flex items-center justify-between" style={{ flexShrink: 0 }}>
        <CategoryBrandSelector />
        <DateModeSelector />
      </div>

      {/* Row 2 — Dimension Tabs */}
      <div style={{ flexShrink: 0 }}>
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

      {/* Row 6 — Sentiment Over Time + Sentiment Breakdown */}
      <div className="flex" style={{ gap: 12, alignItems: "stretch" }}>
        <div style={{ flex: 2, display: "flex" }}>
          <SentimentTrend selectedMonth={selectedMonth} onMonthSelect={setSelectedMonth} />
        </div>
        <div style={{ flex: 1, display: "flex" }}>
          <SentimentSplit month={selectedMonth} />
        </div>
      </div>

      {/* Row 7 — Passion Score + Recommendation List */}
      <div className="flex" style={{ gap: 12 }}>
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
          {["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((month) => (
            <span
              key={month}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 8,
                color: "#B5ADA5",
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

function BrandComparison() {
  const favourabilityData = [
    { brand: "Glossier", score: 85, color: "#DAC58C" },
    { brand: "Rhode", score: 82, color: "#B86A54", isRhode: true },
    { brand: "Clinique", score: 79, color: "#ACBDA7" },
    { brand: "Summer Fridays", score: 76, color: "#374762" },
    { brand: "Laneige", score: 72, color: "#6B241E" },
  ];

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
                  fontWeight: item.isRhode ? 700 : 400,
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
                    opacity: item.isRhode ? 1 : 0.5,
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
                  fontWeight: item.isRhode ? 700 : 400,
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

function SentimentTrend({
  selectedMonth,
  onMonthSelect,
}: {
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
}) {
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

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
        >
          Across earned consumer content over time · Click a month to see breakdown →
        </p>
      </div>

      {/* Chart */}
      <div style={{ position: "relative", flex: 1, minHeight: 180, marginBottom: 12 }}>
        <svg width="100%" height="100%" viewBox="0 0 700 180" preserveAspectRatio="none">
          {/* Y-axis gridlines */}
          <line x1="0" y1="135" x2="700" y2="135" stroke="#F0EBE6" strokeWidth="1" />
          <line x1="0" y1="90" x2="700" y2="90" stroke="#F0EBE6" strokeWidth="1" />
          <line x1="0" y1="45" x2="700" y2="45" stroke="#F0EBE6" strokeWidth="1" />

          {/* Glossier - leads */}
          <path
            d="M50,70 L150,68 L250,62 L350,58 L450,54 L550,48 L650,42"
            fill="none"
            stroke="#DAC58C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Rhode - second */}
          <path
            d="M50,90 L150,88 L250,84 L350,80 L450,75 L550,68 L650,62"
            fill="none"
            stroke="#B86A54"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Laneige */}
          <path
            d="M50,105 L150,103 L250,100 L350,96 L450,92 L550,88 L650,84"
            fill="none"
            stroke="#6B241E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Summer Fridays */}
          <path
            d="M50,115 L150,114 L250,112 L350,108 L450,105 L550,102 L650,98"
            fill="none"
            stroke="#374762"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Clinique */}
          <path
            d="M50,130 L150,128 L250,126 L350,123 L450,120 L550,118 L650,115"
            fill="none"
            stroke="#ACBDA7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Selected month crosshair */}
          {(() => {
            const idx = months.indexOf(selectedMonth);
            if (idx === -1) return null;
            const x = idx * 100 + 50;
            return (
              <line
                x1={x}
                y1="0"
                x2={x}
                y2="180"
                stroke="#B86A54"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            );
          })()}

          {/* Clickable month zones — transparent hit areas */}
          {months.map((month, i) => (
            <rect
              key={month}
              x={i * 100}
              y={0}
              width={100}
              height={180}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onClick={() => onMonthSelect(month)}
            />
          ))}
        </svg>

        {/* Y-axis labels */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#B5ADA5" }}>
            80%
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#B5ADA5" }}>
            60%
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#B5ADA5" }}>
            40%
          </span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex items-center" style={{ marginBottom: 12, paddingLeft: 0, paddingRight: 0 }}>
        {months.map((month) => (
          <span
            key={month}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: selectedMonth === month ? "#B86A54" : "#B5ADA5",
              fontWeight: selectedMonth === month ? 700 : 400,
              width: 100,
              textAlign: "center",
            }}
          >
            {month}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {brands.map((brand) => (
          <div key={brand.name} className="flex items-center gap-1.5">
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
                fontSize: 11,
                color: "var(--text-primary)",
                fontWeight: brand.name === "Rhode" ? 700 : 400,
              }}
            >
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SentimentSplit({ month }: { month: string }) {
  const monthFullNames: Record<string, string> = {
    Sep: "September 2025", Oct: "October 2025", Nov: "November 2025",
    Dec: "December 2025", Jan: "January 2026", Feb: "February 2026", Mar: "March 2026",
  };

  const monthlyData: Record<string, { brand: string; color: string; positive: number; neutral: number; negative: number; isRhode?: boolean }[]> = {
    Sep: [
      { brand: "Rhode", color: "#B86A54", positive: 62, neutral: 24, negative: 14, isRhode: true },
      { brand: "Summer Fridays", color: "#374762", positive: 58, neutral: 26, negative: 16 },
      { brand: "Glossier", color: "#DAC58C", positive: 70, neutral: 18, negative: 12 },
      { brand: "Clinique", color: "#ACBDA7", positive: 52, neutral: 30, negative: 18 },
      { brand: "Laneige", color: "#6B241E", positive: 60, neutral: 24, negative: 16 },
    ],
    Oct: [
      { brand: "Rhode", color: "#B86A54", positive: 64, neutral: 23, negative: 13, isRhode: true },
      { brand: "Summer Fridays", color: "#374762", positive: 59, neutral: 25, negative: 16 },
      { brand: "Glossier", color: "#DAC58C", positive: 71, neutral: 18, negative: 11 },
      { brand: "Clinique", color: "#ACBDA7", positive: 53, neutral: 30, negative: 17 },
      { brand: "Laneige", color: "#6B241E", positive: 61, neutral: 23, negative: 16 },
    ],
    Nov: [
      { brand: "Rhode", color: "#B86A54", positive: 66, neutral: 21, negative: 13, isRhode: true },
      { brand: "Summer Fridays", color: "#374762", positive: 60, neutral: 25, negative: 15 },
      { brand: "Glossier", color: "#DAC58C", positive: 73, neutral: 17, negative: 10 },
      { brand: "Clinique", color: "#ACBDA7", positive: 54, neutral: 29, negative: 17 },
      { brand: "Laneige", color: "#6B241E", positive: 63, neutral: 22, negative: 15 },
    ],
    Dec: [
      { brand: "Rhode", color: "#B86A54", positive: 67, neutral: 20, negative: 13, isRhode: true },
      { brand: "Summer Fridays", color: "#374762", positive: 61, neutral: 24, negative: 15 },
      { brand: "Glossier", color: "#DAC58C", positive: 74, neutral: 16, negative: 10 },
      { brand: "Clinique", color: "#ACBDA7", positive: 55, neutral: 29, negative: 16 },
      { brand: "Laneige", color: "#6B241E", positive: 64, neutral: 22, negative: 14 },
    ],
    Jan: [
      { brand: "Rhode", color: "#B86A54", positive: 69, neutral: 19, negative: 12, isRhode: true },
      { brand: "Summer Fridays", color: "#374762", positive: 62, neutral: 24, negative: 14 },
      { brand: "Glossier", color: "#DAC58C", positive: 76, neutral: 15, negative: 9 },
      { brand: "Clinique", color: "#ACBDA7", positive: 56, neutral: 29, negative: 15 },
      { brand: "Laneige", color: "#6B241E", positive: 66, neutral: 21, negative: 13 },
    ],
    Feb: [
      { brand: "Rhode", color: "#B86A54", positive: 70, neutral: 19, negative: 11, isRhode: true },
      { brand: "Summer Fridays", color: "#374762", positive: 63, neutral: 23, negative: 14 },
      { brand: "Glossier", color: "#DAC58C", positive: 77, neutral: 15, negative: 8 },
      { brand: "Clinique", color: "#ACBDA7", positive: 57, neutral: 28, negative: 15 },
      { brand: "Laneige", color: "#6B241E", positive: 67, neutral: 21, negative: 12 },
    ],
    Mar: [
      { brand: "Rhode", color: "#B86A54", positive: 72, neutral: 18, negative: 10, isRhode: true },
      { brand: "Summer Fridays", color: "#374762", positive: 65, neutral: 22, negative: 13 },
      { brand: "Glossier", color: "#DAC58C", positive: 78, neutral: 14, negative: 8 },
      { brand: "Clinique", color: "#ACBDA7", positive: 58, neutral: 28, negative: 14 },
      { brand: "Laneige", color: "#6B241E", positive: 68, neutral: 20, negative: 12 },
    ],
  };

  const data = monthlyData[month] || monthlyData["Mar"];

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
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          {monthFullNames[month] || "March 2026"}
        </p>
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
                  fontWeight: item.isRhode ? 700 : 400,
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
                opacity: item.isRhode ? 1 : 0.4,
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
  const donutData = [
    { brand: "Rhode", percentage: 28, color: "#B86A54", isRhode: true },
    { brand: "Glossier", percentage: 24, color: "#DAC58C" },
    { brand: "Laneige", percentage: 19, color: "#6B241E" },
    { brand: "Summer Fridays", percentage: 16, color: "#374762" },
    { brand: "Clinique", percentage: 13, color: "#ACBDA7" },
  ];

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
        >
          Passion Score
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Share of recommendation in earned content
        </p>
      </div>

      {/* Donut chart */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <div style={{ position: "relative", width: 180, height: 180 }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            {segments.map((segment, index) => (
              <path
                key={segment.brand}
                d={getArc(segment.startAngle, segment.endAngle, 85, 55)}
                fill={segment.color}
                opacity={segment.isRhode ? 1 : 0.6}
              />
            ))}
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
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              28%
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 9,
                color: "#B5ADA5",
              }}
            >
              Rhode's share
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
                  fontWeight: item.isRhode ? 700 : 400,
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
                fontWeight: item.isRhode ? 700 : 400,
              }}
            >
              {item.percentage}%
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
          >
            LLM RECOMMENDATION
          </h4>
        </div>
        <div className="flex items-baseline gap-2" style={{ marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 18,
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            79
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              padding: "2px 6px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(74,102,68,0.1)",
              color: "#4A6644",
              fontWeight: 600,
            }}
          >
            ▲ 1.5
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            color: "#B5ADA5",
          }}
        >
          Rank #2 of 5 across GPT, Claude, Gemini
        </p>
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
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            color: "#B5ADA5",
          }}
        >
          8 featured
        </span>
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
                  >
                    {rec.platform} · {rec.author} ·{" "}
                    <span style={{ fontFamily: "var(--font-mono)" }}>{rec.engagement}</span>
                  </p>
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