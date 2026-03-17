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

export function DeepDiveC2Page() {
  const { submetrics } = useSubmetrics("C2");
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
        <DimensionTabs activeKey="C2" />
      </div>

      {/* Row 3 — Dimension Header */}
      <DimensionHeader />

      {/* Row 4 — Sub-metric cards (2 cards) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, flexShrink: 0 }}>
        <ScoreCard title={submetrics[0]?.submetric_name ?? "Price Perception"} badge="Social" score="62" delta="▼ 2.1" />
        <ScoreCard title={submetrics[1]?.submetric_name ?? "Quality Perception"} badge="Social" score="74" delta="▲ 0.8" />
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
  );
}

function DimensionHeader() {
  const { dimension: dim } = useDimension("C2");
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
            66
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "rgba(184,106,84,0.1)",
              color: "#B86A54",
              fontWeight: 600,
            }}
          >
            ▼ 1.2
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
        {dim?.page_description ?? "The perceived worth, quality, and value the brand commands."}
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
  const pricePerceptionData = [
    { brand: "Clinique", score: 71, color: "#ACBDA7" },
    { brand: "Glossier", score: 68, color: "#DAC58C" },
    { brand: "Laneige", score: 65, color: "#6B241E" },
    { brand: "Rhode", score: 62, color: "#B86A54", isRhode: true },
    { brand: "Summer Fridays", score: 58, color: "#374762" },
  ];

  const qualityPerceptionData = [
    { brand: "Clinique", score: 82, color: "#ACBDA7" },
    { brand: "Rhode", score: 74, color: "#B86A54", isRhode: true },
    { brand: "Glossier", score: 72, color: "#DAC58C" },
    { brand: "Laneige", score: 70, color: "#6B241E" },
    { brand: "Summer Fridays", score: 69, color: "#374762" },
  ];

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
        <div>
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
            }}
          >
            Brand share of value-related discussions over time
          </p>
        </div>
        <div className="flex items-center gap-1.5">
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
            · p=0.034, 2-mo lead
          </span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: "relative", height: 200, marginBottom: 12 }}>
        <svg width="100%" height="200" viewBox="0 0 700 200" preserveAspectRatio="none">
          {/* Y-axis gridlines */}
          <line x1="0" y1="160" x2="700" y2="160" stroke="#F0EBE6" strokeWidth="1" />
          <line x1="0" y1="107" x2="700" y2="107" stroke="#F0EBE6" strokeWidth="1" />
          <line x1="0" y1="53" x2="700" y2="53" stroke="#F0EBE6" strokeWidth="1" />

          {/* Rhode - downward trend */}
          <path
            d="M0,40 L100,50 L200,70 L300,95 L400,120 L500,145 L600,165 L700,175"
            fill="none"
            stroke="#B86A54"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glossier - upward trend */}
          <path
            d="M0,140 L100,135 L200,125 L300,115 L400,105 L500,95 L600,85 L700,75"
            fill="none"
            stroke="#DAC58C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Laneige - upward trend */}
          <path
            d="M0,155 L100,150 L200,140 L300,135 L400,125 L500,115 L600,105 L700,95"
            fill="none"
            stroke="#6B241E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Clinique - flat */}
          <path
            d="M0,110 L100,112 L200,108 L300,110 L400,109 L500,111 L600,110 L700,109"
            fill="none"
            stroke="#ACBDA7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Summer Fridays - slightly up */}
          <path
            d="M0,165 L100,163 L200,160 L300,157 L400,155 L500,152 L600,150 L700,148"
            fill="none"
            stroke="#374762"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
            30%
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#B5ADA5" }}>
            20%
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#B5ADA5" }}>
            10%
          </span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
        {["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((month) => (
          <span
            key={month}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B5ADA5",
            }}
          >
            {month}
          </span>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap" style={{ marginBottom: 12 }}>
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

      {/* Warning callout */}
      <div
        style={{
          backgroundColor: "rgba(184,106,84,0.06)",
          borderRadius: 10,
          padding: 10,
          display: "flex",
          alignItems: "start",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14, flexShrink: 0 }}>⚠️</span>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B86A54",
            lineHeight: 1.5,
          }}
        >
          Rhode's share of value conversations has declined 4.2pp over 7 months while Laneige and
          Glossier gained. Monitor price sensitivity in earned content.
        </p>
      </div>
    </div>
  );
}

function ValueDrivers() {
  const drivers = [
    {
      rank: 1,
      name: "Ingredient transparency",
      sentiment: "positive",
      mentions: 2840,
      share: 24,
    },
    {
      rank: 2,
      name: "Price point vs competitors",
      sentiment: "mixed",
      mentions: 2210,
      share: 19,
    },
    { rank: 3, name: "Packaging quality", sentiment: "positive", mentions: 1870, share: 16 },
    {
      rank: 4,
      name: "Product size / quantity",
      sentiment: "negative",
      mentions: 1540,
      share: 13,
    },
    { rank: 5, name: "Celebrity association", sentiment: "positive", mentions: 1320, share: 11 },
    {
      rank: 6,
      name: "Longevity / how long it lasts",
      sentiment: "mixed",
      mentions: 1080,
      share: 9,
    },
    { rank: 7, name: "Dupes available", sentiment: "negative", mentions: 940, share: 8 },
  ];

  const maxMentions = Math.max(...drivers.map((d) => d.mentions));

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
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {drivers.map((driver, index) => {
          const style = getSentimentStyle(driver.sentiment);
          return (
            <div key={driver.rank}>
              {index > 0 && (
                <div style={{ height: 1, backgroundColor: "#F0EBE6", marginBottom: 12 }} />
              )}
              <div className="flex items-center gap-3">
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
                    flex: "0 0 180px",
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
                    flexShrink: 0,
                  }}
                >
                  {driver.sentiment}
                </span>

                {/* Strength bar */}
                <div
                  style={{
                    position: "relative",
                    width: 120,
                    height: 8,
                    backgroundColor: "#F0EBE6",
                    borderRadius: 4,
                    flexShrink: 0,
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
                      width: `${(driver.mentions / maxMentions) * 100}%`,
                    }}
                  />
                </div>

                {/* Mention count */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "#7A6F65",
                    flexShrink: 0,
                  }}
                >
                  {driver.mentions.toLocaleString()}
                </span>

                {/* Share % */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "#7A6F65",
                    width: 30,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {driver.share}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          color: "#B5ADA5",
          fontStyle: "italic",
          marginTop: 12,
        }}
      >
        Based on 11,800+ consumer mentions across social media and reviews
      </p>
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