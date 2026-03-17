import { useState } from "react";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { useDimension, useSubmetrics } from "../../data/use-dimensions";

const brands = [
  { name: "Rhode", color: "#B86A54" },
  { name: "Summer Fridays", color: "#374762" },
  { name: "Glossier", color: "#DAC58C" },
  { name: "Clinique", color: "#ACBDA7" },
  { name: "Laneige", color: "#6B241E" },
];

export function DeepDiveNPage() {
  const { submetrics } = useSubmetrics("N");
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
        <DimensionTabs activeKey="N" />
      </div>

      {/* Row 3 — Dimension Header */}
      <DimensionHeader />

      {/* Row 4 — Rhode's Score Cards */}
      <div className="flex" style={{ gap: 12, flexShrink: 0 }}>
        <ScoreCard
          title={submetrics[0]?.submetric_name ?? "Consistency"}
          badge="Social"
          score="68"
          delta="▲ 1.2"
        />
        <ScoreCard title={submetrics[1]?.submetric_name ?? "Coherence"} badge="Social" score="72" delta="▲ 0.4" />
        <AlignmentScoreCard title={submetrics[2]?.submetric_name ?? "Alignment"} />
      </div>

      {/* Row 5 — Brand Comparison */}
      <BrandComparison />

      {/* Row 6 — Sender/Receiver Alignment */}
      <SenderReceiverAlignment />

      {/* Row 6b — Alignment Gap Strip */}
      <AlignmentGapStrip />

      {/* Row 7 — Sender vs Receiver Values */}
      <div className="flex" style={{ gap: 12, flexShrink: 0 }}>
        <SenderValues />
        <ReceiverValues />
      </div>

      {/* Row 8 — Top Aligned Posts */}
      <TopAlignedPosts />

      {/* Row 9 — Communication Guidelines */}
      <CommunicationGuidelines />
    </div>
  );
}

function DimensionHeader() {
  const { dimension: dim } = useDimension("N");
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
              backgroundColor: "#ACBDA7",
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
            {dim ? `${dim.page_letter} — ${dim.page_name}` : "N — Never Lost in Translation"}
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
            71
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
            ▲ 0.9
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
        {dim?.page_description ?? "How clearly the brand tells its story — and whether the world receives it as intended."}
      </p>
    </div>
  );
}

function BrandComparison() {
  const consistencyData = [
    { brand: "Clinique", score: 85, color: "#ACBDA7" },
    { brand: "Rhode", score: 82, color: "#B86A54", isRhode: true },
    { brand: "Glossier", score: 78, color: "#DAC58C" },
    { brand: "Summer Fridays", score: 74, color: "#374762" },
    { brand: "Laneige", score: 70, color: "#6B241E" },
  ];

  const coherenceData = [
    { brand: "Glossier", score: 80, color: "#DAC58C" },
    { brand: "Rhode", score: 76, color: "#B86A54", isRhode: true },
    { brand: "Clinique", score: 72, color: "#ACBDA7" },
    { brand: "Laneige", score: 69, color: "#6B241E" },
    { brand: "Summer Fridays", score: 65, color: "#374762" },
  ];

  const alignmentData = [
    { brand: "Clinique", score: 79, color: "#ACBDA7" },
    { brand: "Rhode", score: 74, color: "#B86A54", isRhode: true },
    { brand: "Laneige", score: 71, color: "#6B241E" },
    { brand: "Glossier", score: 68, color: "#DAC58C" },
    { brand: "Summer Fridays", score: 62, color: "#374762" },
  ];

  const maxScore = 100;

  const renderColumn = (title: string, data: typeof consistencyData) => (
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
          Consistency, Coherence & Alignment across brands
        </p>
      </div>

      {/* Three-column layout */}
      <div className="flex" style={{ gap: 32 }}>
        {renderColumn("CONSISTENCY", consistencyData)}
        {renderColumn("COHERENCE", coherenceData)}
        {renderColumn("ALIGNMENT", alignmentData)}
      </div>
    </div>
  );
}

function ScoreCard({ title, badge, score, delta }: { title: string; badge: string; score: string; delta: string }) {
  const isPositive = delta.includes("▲");
  
  return (
    <div
      style={{
        flex: 1,
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

function AlignmentScoreCard({ title }: { title: string }) {
  return (
    <div
      style={{
        flex: 1,
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
          74
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
          ▲ 1.1
        </span>
      </div>

      {/* Sparkline */}
      <div>
        <svg width="100%" height="36" viewBox="0 0 300 36" preserveAspectRatio="none">
          <path
            d="M0,24 C50,22 100,23 150,21 C200,19 250,17 300,15"
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

function SenderReceiverAlignment() {
  const [activeBrand, setActiveBrand] = useState("Rhode");

  const axes = ["Clean / Ingredients", "Aesthetic / Visual", "Premium / Luxury", "Skin Health", "Simplicity"];
  const senderData = [92, 87, 81, 78, 71];
  const receiverData = [88, 85, 74, 52, 68];

  const cx = 180;
  const cy = 140;
  const r = 100;
  const count = axes.length;

  function getPoint(angle: number, radius: number) {
    const a = (angle - 90) * (Math.PI / 180);
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
  }

  const axisAngles = axes.map((_, i) => (360 / count) * i);
  const rings = [0.25, 0.5, 0.75, 1.0];

  const senderPoints = senderData.map((v, i) => getPoint(axisAngles[i], r * (v / 100)));
  const receiverPoints = receiverData.map((v, i) => getPoint(axisAngles[i], r * (v / 100)));

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
      {/* Header with brand selector */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Sender / Receiver Alignment
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#B5ADA5",
            }}
          >
            What the brand says vs what consumers hear
          </p>
        </div>
        <div className="flex items-center gap-2">
          {brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => setActiveBrand(brand.name)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                padding: "4px 12px",
                borderRadius: "var(--radius-pill)",
                backgroundColor:
                  brand.name === activeBrand ? brand.color : "transparent",
                color: brand.name === activeBrand ? "#FFFFFF" : "#7A6F65",
                border: brand.name === activeBrand ? "none" : "1px solid #E8E2DC",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex" style={{ gap: 20 }}>
        {/* Left: Spider chart */}
        <div style={{ flex: 1.2 }}>
          <svg width="360" height="280" viewBox="0 0 360 280">
            {/* Grid polygons */}
            {rings.map((s) => {
              const pts = axisAngles.map((a) => getPoint(a, r * s));
              return (
                <polygon
                  key={s}
                  points={pts.map((p) => p.join(",")).join(" ")}
                  fill="none"
                  stroke="#E8E2DC"
                  strokeWidth="1"
                />
              );
            })}

            {/* Axis lines */}
            {axisAngles.map((a, i) => {
              const [x, y] = getPoint(a, r);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#E8E2DC"
                  strokeWidth="1"
                />
              );
            })}

            {/* Axis labels */}
            {axisAngles.map((a, i) => {
              const [x, y] = getPoint(a, r + 24);
              return (
                <text
                  key={i}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#7A6F65"
                  fontFamily="var(--font-body)"
                  fontSize="10"
                >
                  {axes[i]}
                </text>
              );
            })}

            {/* Receiver polygon (dashed) */}
            <polygon
              points={receiverPoints.map((p) => p.join(",")).join(" ")}
              fill="#ACBDA7"
              fillOpacity={0.1}
              stroke="#ACBDA7"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {receiverPoints.map((p, i) => (
              <circle key={`r${i}`} cx={p[0]} cy={p[1]} r="3" fill="#ACBDA7" />
            ))}

            {/* Sender polygon (solid) */}
            <polygon
              points={senderPoints.map((p) => p.join(",")).join(" ")}
              fill="#B86A54"
              fillOpacity={0.1}
              stroke="#B86A54"
              strokeWidth="2"
            />
            {senderPoints.map((p, i) => (
              <circle key={`s${i}`} cx={p[0]} cy={p[1]} r="3" fill="#B86A54" />
            ))}
          </svg>

          {/* Legend */}
          <div className="flex items-center gap-4" style={{ marginTop: 8 }}>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 16,
                  height: 2,
                  backgroundColor: "#B86A54",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "var(--text-secondary)",
                }}
              >
                Sender (brand)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 16,
                  height: 2,
                  backgroundColor: "#ACBDA7",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, #ACBDA7 0, #ACBDA7 4px, transparent 4px, transparent 8px)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "var(--text-secondary)",
                }}
              >
                Receiver (consumer)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Summary cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Card 1: Overall Alignment Score */}
          <div
            style={{
              backgroundColor: "rgba(245,240,235,0.6)",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#B5ADA5",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              OVERALL ALIGNMENT SCORE
            </div>
            <div className="flex items-baseline gap-2" style={{ marginBottom: 2 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                74
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
                ▲ 1.1
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#B5ADA5",
              }}
            >
              Rank #2 of 5
            </div>
          </div>

          {/* Card 2: Sender-Receiver Gap */}
          <div
            style={{
              backgroundColor: "rgba(74,102,68,0.04)",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#4A6644",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              SENDER-RECEIVER GAP
            </div>
            <div className="flex items-baseline gap-2" style={{ marginBottom: 2 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#4A6644",
                }}
              >
                -8 pts
              </span>
              
            </div>
            
          </div>

          {/* Card 3: Biggest Gap */}
          <div
            style={{
              backgroundColor: "rgba(245,240,235,0.6)",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#B5ADA5",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              BIGGEST GAP
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: 2,
              }}
            >
              Skin Health
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#B5ADA5",
              }}
            >
              Sender: 78 → Receiver: 52 (−26 pts)
            </div>
          </div>

          {/* Card 4: Best Alignment */}
          <div
            style={{
              backgroundColor: "rgba(245,240,235,0.6)",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#B5ADA5",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              BEST ALIGNMENT
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: 2,
              }}
            >
              Clean / Ingredients
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                color: "#B5ADA5",
              }}
            >
              Sender: 92 → Receiver: 88 (−4 pts)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlignmentGapStrip() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        padding: 16,
      }}
    >
      <div className="flex items-center" style={{ gap: 24 }}>
        {/* Group 1: Aligned */}
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B5ADA5",
              textTransform: "uppercase",
              marginRight: 4,
            }}
          >
            ALIGNED
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(74,102,68,0.08)",
              color: "#4A6644",
            }}
          >
            ✓ Clean
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(74,102,68,0.08)",
              color: "#4A6644",
            }}
          >
            ✓ Aesthetic
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(74,102,68,0.08)",
              color: "#4A6644",
            }}
          >
            ✓ Premium
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 24, backgroundColor: "#E8E2DC" }} />

        {/* Group 2: Gap Sender Only */}
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B5ADA5",
              textTransform: "uppercase",
              marginRight: 4,
            }}
          >
            GAP: SENDER ONLY
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(184,106,84,0.08)",
              color: "#B86A54",
            }}
          >
            → Skin Health
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(184,106,84,0.08)",
              color: "#B86A54",
            }}
          >
            → Effortless
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 24, backgroundColor: "#E8E2DC" }} />

        {/* Group 3: Gap Receiver Only */}
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B5ADA5",
              textTransform: "uppercase",
              marginRight: 4,
            }}
          >
            GAP: RECEIVER ONLY
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(55,71,98,0.08)",
              color: "#374762",
            }}
          >
            ← Celebrity-Backed
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(55,71,98,0.08)",
              color: "#374762",
            }}
          >
            ← Hydration
          </span>
        </div>
      </div>
    </div>
  );
}

function SenderValues() {
  const values = [
    { rank: 1, name: "Clean Ingredients", score: 92 },
    { rank: 2, name: "Minimalist Aesthetic", score: 87 },
    { rank: 3, name: "Accessible Luxury", score: 81 },
    { rank: 4, name: "Skin Health", score: 78 },
    { rank: 5, name: "Effortless Beauty", score: 71 },
  ];

  const maxScore = 100;

  return (
    <div
      style={{
        flex: 1,
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
          }}
        >
          Sender Values
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          What the brand communicates through owned content
        </p>
      </div>

      {/* Values list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {values.map((value, index) => (
          <div key={value.rank}>
            {index > 0 && (
              <div
                style={{
                  height: 1,
                  backgroundColor: "#F0EBE6",
                  marginBottom: 12,
                }}
              />
            )}
            <div className="flex items-center gap-3">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#B86A54",
                  width: 16,
                }}
              >
                {value.rank}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--text-primary)",
                  flex: 1,
                }}
              >
                {value.name}
              </span>
              <div
                style={{
                  width: 80,
                  height: 8,
                  backgroundColor: "#F0EBE6",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(value.score / maxScore) * 100}%`,
                    backgroundColor: "#B86A54",
                    opacity: 0.6,
                    borderRadius: 4,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#7A6F65",
                  width: 24,
                  textAlign: "right",
                }}
              >
                {value.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReceiverValues() {
  const values = [
    { rank: 1, name: "Clean Beauty", score: 88, aligned: true },
    { rank: 2, name: "Aesthetic / Visual", score: 85, aligned: true },
    { rank: 3, name: "Affordable Premium", score: 74, aligned: true },
    { rank: 4, name: "Hydration / Glow", score: 72, aligned: false },
    { rank: 5, name: "Celebrity-Backed", score: 68, aligned: false },
  ];

  const maxScore = 100;

  return (
    <div
      style={{
        flex: 1,
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
          }}
        >
          Receiver Values
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          What consumers perceive from earned content
        </p>
      </div>

      {/* Values list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {values.map((value, index) => (
          <div key={value.rank}>
            {index > 0 && (
              <div
                style={{
                  height: 1,
                  backgroundColor: "#F0EBE6",
                  marginBottom: 12,
                }}
              />
            )}
            <div className="flex items-center gap-3">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#ACBDA7",
                  width: 16,
                }}
              >
                {value.rank}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--text-primary)",
                  flex: 1,
                }}
              >
                {value.name}
              </span>
              {value.aligned && (
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 9,
                    padding: "2px 6px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: "rgba(74,102,68,0.08)",
                    color: "#4A6644",
                  }}
                >
                  ↔ aligned
                </span>
              )}
              <div
                style={{
                  width: 80,
                  height: 8,
                  backgroundColor: "#F0EBE6",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(value.score / maxScore) * 100}%`,
                    backgroundColor: "#ACBDA7",
                    opacity: 0.6,
                    borderRadius: 4,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "#7A6F65",
                  width: 24,
                  textAlign: "right",
                }}
              >
                {value.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopAlignedPosts() {
  const posts = [
    {
      rank: 1,
      platform: "IG",
      caption: "Your skin barrier called — it wants the peptide glazing fluid ✨",
      handle: "@rhode",
      alignment: 94,
      engagement: 8.2,
    },
    {
      rank: 2,
      platform: "TT",
      caption: "3 ingredients. That's it. That's the whole formula.",
      handle: "@rhode",
      alignment: 91,
      engagement: 11.4,
    },
    {
      rank: 3,
      platform: "TT",
      caption: "POV: skincare that doesn't need 12 steps",
      handle: "@rhode",
      alignment: 88,
      engagement: 9.7,
    },
    {
      rank: 4,
      platform: "IG",
      caption: "The Rhode barrier restore cream — clinically tested, beautifully simple",
      handle: "@rhode",
      alignment: 85,
      engagement: 6.8,
    },
    {
      rank: 5,
      platform: "IG",
      caption: "Less is more. More glow, that is 💧",
      handle: "@rhode",
      alignment: 82,
      engagement: 7.3,
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
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Top Aligned Posts
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Brand posts that best resonate with receiver values
        </p>
      </div>

      {/* Posts list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {posts.map((post, index) => (
          <div key={post.rank}>
            {index > 0 && (
              <div
                style={{
                  height: 1,
                  backgroundColor: "#F0EBE6",
                  marginBottom: 12,
                }}
              />
            )}
            <div className="flex items-center gap-3">
              {/* Rank */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#B86A54",
                  width: 24,
                }}
              >
                {post.rank}
              </span>

              {/* Thumbnail */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  backgroundColor: "rgba(245,240,235,0.8)",
                  flexShrink: 0,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    fontFamily: "var(--font-body)",
                    fontSize: 8,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    padding: "2px 4px",
                    borderRadius: 3,
                  }}
                >
                  {post.platform}
                </span>
              </div>

              {/* Caption */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--text-primary)",
                    marginBottom: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {post.caption}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    color: "#B5ADA5",
                  }}
                >
                  {post.platform} · {post.handle}
                </div>
              </div>

              {/* Alignment */}
              <div style={{ textAlign: "right", width: 60 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#4A6644",
                  }}
                >
                  {post.alignment}%
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 8,
                    color: "#B5ADA5",
                    textTransform: "uppercase",
                  }}
                >
                  ALIGNMENT
                </div>
              </div>

              {/* Engagement */}
              <div style={{ textAlign: "right", width: 50 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {post.engagement}%
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 8,
                    color: "#B5ADA5",
                    textTransform: "uppercase",
                  }}
                >
                  ENG. RATE
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunicationGuidelines() {
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
          Communication Guidelines
        </h3>
      </div>

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "#7A6F65",
          lineHeight: 1.6,
          marginBottom: 12,
        }}
      >
        Based on sender/receiver alignment analysis, Rhode's messaging lands strongest when it
        emphasises clean, minimal aesthetics and accessible luxury positioning. The gap analysis
        reveals two opportunities:
      </p>

      {/* Three mini cards */}
      <div className="flex" style={{ gap: 12, marginBottom: 12 }}>
        {/* Card 1 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(245,240,235,0.6)",
            borderRadius: 10,
            padding: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B5ADA5",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            KEYWORDS TO LEAN INTO
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["clean", "simple", "glow", "barrier", "minimal"].map((keyword) => (
              <span
                key={keyword}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(74,102,68,0.08)",
                  color: "#4A6644",
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(245,240,235,0.6)",
            borderRadius: 10,
            padding: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B5ADA5",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            VISUAL TONE
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["neutral palette", "close-up texture", "minimal props", "natural light"].map(
              (tone) => (
                <span
                  key={tone}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: "rgba(74,102,68,0.08)",
                    color: "#4A6644",
                  }}
                >
                  {tone}
                </span>
              )
            )}
          </div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(245,240,235,0.6)",
            borderRadius: 10,
            padding: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B5ADA5",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            TONE OF VOICE
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["confident", "understated", "playful-not-loud", "science-lite"].map((voice) => (
              <span
                key={voice}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(74,102,68,0.08)",
                  color: "#4A6644",
                }}
              >
                {voice}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom body text */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "#7A6F65",
          lineHeight: 1.6,
          marginBottom: 12,
        }}
      >
        Bridge the gap: 'Skin Health' and 'Effortless Beauty' are strong sender values that aren't
        landing with consumers. Consider amplifying through creator partnerships and educational
        content. Conversely, consumers strongly perceive 'Celebrity-Backed' which the brand doesn't
        actively push — this is organic equity worth protecting.
      </p>

      {/* Footer */}
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
          Sender-Receiver Gap (p=0.003) is the fastest-acting predictor at 1-month lead
        </span>
      </div>
    </div>
  );
}