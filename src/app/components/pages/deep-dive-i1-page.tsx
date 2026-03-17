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

export function DeepDiveI1Page() {
  const { submetrics } = useSubmetrics("I1");
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
        <DimensionTabs activeKey="I1" />
      </div>

      {/* Row 3 — Dimension Header */}
      <DimensionHeader />

      {/* Row 4 — Sub-metric cards */}
      <div className="flex" style={{ gap: 12, flexShrink: 0 }}>
        <ScoreCard
          title={submetrics[0]?.submetric_name ?? "LLM Consistency"}
          badge="LLM"
          score="85"
          delta="▲ 3.1"
        />
        <ScoreCard
          title={submetrics[1]?.submetric_name ?? "LLM Distinctiveness"}
          badge="LLM"
          score="64"
          delta="▼ 1.2"
        />
      </div>

      {/* Row 5 — Brand Comparison */}
      <BrandComparison />

      {/* Row 6 — Value Associations */}
      <ValueAssociations />

      {/* Row 7 — Domain Sources */}
      <DomainSources />

      {/* Row 8 — Audience Perception */}
      <AudiencePerception />

      {/* Row 9 — Insight Card */}
      <InsightCardI1 />
    </div>
  );
}

function DimensionHeader() {
  const { dimension: dim } = useDimension("I1");
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
              backgroundColor: "#374762",
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
            {dim ? `${dim.page_letter} — ${dim.page_name}` : "I — Imprinted in AI"}
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
            ▲ 2.8
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
        {dim?.page_description ?? "How deeply and distinctly the brand is encoded in the minds of machines."}
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

function BrandComparison() {
  const consistencyData = [
    { brand: "Rhode", score: 85, color: "#B86A54", isRhode: true },
    { brand: "Glossier", score: 82, color: "#DAC58C" },
    { brand: "Clinique", score: 78, color: "#ACBDA7" },
    { brand: "Summer Fridays", score: 71, color: "#374762" },
    { brand: "Laneige", score: 68, color: "#6B241E" },
  ];

  const distinctivenessData = [
    { brand: "Glossier", score: 72, color: "#DAC58C" },
    { brand: "Summer Fridays", score: 68, color: "#374762" },
    { brand: "Rhode", score: 64, color: "#B86A54", isRhode: true },
    { brand: "Clinique", score: 59, color: "#ACBDA7" },
    { brand: "Laneige", score: 55, color: "#6B241E" },
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
          Consistency & Distinctiveness across brands
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex" style={{ gap: 32 }}>
        {/* Left column: Consistency */}
        <div style={{ flex: 1 }}>
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
            CONSISTENCY
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {consistencyData.map((item) => (
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

        {/* Right column: Distinctiveness */}
        <div style={{ flex: 1 }}>
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
            DISTINCTIVENESS
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {distinctivenessData.map((item) => (
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
    </div>
  );
}

function ValueAssociations() {
  const brandValues = [
    {
      brand: "Rhode",
      color: "#B86A54",
      isRhode: true,
      values: ["Clean Beauty", "Minimalist", "Luxury Accessible", "Gen Z", "Skincare-First"],
    },
    {
      brand: "Summer Fridays",
      color: "#374762",
      values: ["Clean Beauty", "Self-Care", "Instagram-Native", "Gentle", "Vegan"],
    },
    {
      brand: "Glossier",
      color: "#DAC58C",
      values: ["Millennial", "Minimalist", "Community-Driven", "Everyday Beauty", "Direct-to-Consumer"],
    },
    {
      brand: "Clinique",
      color: "#ACBDA7",
      values: ["Dermatologist-Tested", "Sensitive Skin", "Science-Backed", "Classic", "Department Store"],
    },
    {
      brand: "Laneige",
      color: "#6B241E",
      values: ["K-Beauty", "Hydration", "Lip Care", "Overnight", "Affordable Luxury"],
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
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Value Associations
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Top values AI associates with each brand
        </p>
      </div>

      {/* Brand rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {brandValues.map((item, index) => (
          <div key={item.brand}>
            {index > 0 && (
              <div
                style={{
                  height: 1,
                  backgroundColor: "#F0EBE6",
                  marginBottom: 12,
                }}
              />
            )}
            <div className="flex items-center" style={{ gap: 12 }}>
              <div
                className="flex items-center gap-2"
                style={{ width: 120, flexShrink: 0 }}
              >
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
                    fontSize: 12,
                    color: "var(--text-primary)",
                    fontWeight: item.isRhode ? 700 : 400,
                  }}
                >
                  {item.brand}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {item.values.map((value) => (
                  <span
                    key={value}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      padding: "4px 12px",
                      borderRadius: "var(--radius-pill)",
                      backgroundColor: item.isRhode
                        ? "rgba(184,106,84,0.1)"
                        : "#F5F0EB",
                      color: item.isRhode ? "#B86A54" : "#7A6F65",
                    }}
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          color: "#B5ADA5",
          fontStyle: "italic",
          marginTop: 12,
        }}
      >
        Values extracted from 12,000+ LLM queries across GPT, Claude, and Gemini
      </p>
    </div>
  );
}

function DomainSources() {
  const rhodeDomains = [
    { domain: "sephora.com", percentage: 18 },
    { domain: "vogue.com", percentage: 14 },
    { domain: "reddit.com", percentage: 12 },
    { domain: "allure.com", percentage: 11 },
    { domain: "instagram.com", percentage: 9 },
    { domain: "byrdie.com", percentage: 8 },
    { domain: "youtube.com", percentage: 7 },
    { domain: "tiktok.com", percentage: 6 },
    { domain: "glamour.com", percentage: 5 },
    { domain: "rhode.com", percentage: 4 },
  ];

  const brandTopDomains = [
    { brand: "Rhode", color: "#B86A54", domains: ["sephora.com", "vogue.com", "reddit.com"], isRhode: true },
    { brand: "Summer Fridays", color: "#374762", domains: ["sephora.com", "byrdie.com", "youtube.com"] },
    { brand: "Glossier", color: "#DAC58C", domains: ["glossier.com", "reddit.com", "instagram.com"] },
    { brand: "Clinique", color: "#ACBDA7", domains: ["sephora.com", "webmd.com", "nordstrom.com"] },
    { brand: "Laneige", color: "#6B241E", domains: ["sephora.com", "reddit.com", "allure.com"] },
  ];

  const maxPercentage = Math.max(...rhodeDomains.map((d) => d.percentage));

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
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Domain Sources
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Most referenced sources when LLMs discuss the brand
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex" style={{ gap: 20, minWidth: 0 }}>
        {/* Left column: Rhode domain bar chart */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {rhodeDomains.map((item) => (
              <div key={item.domain} className="flex items-center gap-2" style={{ minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--text-secondary)",
                    width: 110,
                    textAlign: "left",
                    flexShrink: 0,
                  }}
                >
                  {item.domain}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 10,
                    backgroundColor: "#B86A54",
                    borderRadius: 5,
                    opacity: item.percentage / maxPercentage,
                    width: `${(item.percentage / maxPercentage) * 100}%`,
                    minWidth: 20,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-secondary)",
                    width: 30,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Brand comparison */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {brandTopDomains.map((item) => (
              <div key={item.brand} className="flex items-start gap-2" style={{ minWidth: 0 }}>
                <div className="flex items-center gap-1.5" style={{ width: 110, flexShrink: 0 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      flexShrink: 0,
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
                <div className="flex items-center gap-1.5 flex-wrap" style={{ flex: 1, minWidth: 0 }}>
                  {item.domains.map((domain) => (
                    <span
                      key={domain}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        padding: "3px 8px",
                        borderRadius: "var(--radius-pill)",
                        backgroundColor: "#F5F0EB",
                        color: "#7A6F65",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          color: "#B5ADA5",
          fontStyle: "italic",
          marginTop: 12,
        }}
      >
        Based on retrieval-augmented generation source analysis
      </p>
    </div>
  );
}

function AudiencePerception() {
  const rhodeAgeData = [
    { age: "16–24", percentage: 35 },
    { age: "25–34", percentage: 42, isPrimary: true },
    { age: "35–44", percentage: 15 },
    { age: "45–54", percentage: 6 },
    { age: "55+", percentage: 2 },
  ];

  const brandAudienceData = [
    { brand: "Rhode", color: "#B86A54", primaryAudience: "25–34", confidence: 42, isRhode: true },
    { brand: "Summer Fridays", color: "#374762", primaryAudience: "25–34", confidence: 38 },
    { brand: "Glossier", color: "#DAC58C", primaryAudience: "18–27", confidence: 45 },
    { brand: "Clinique", color: "#ACBDA7", primaryAudience: "35–49", confidence: 51 },
    { brand: "Laneige", color: "#6B241E", primaryAudience: "22–32", confidence: 40 },
  ];

  const maxPercentage = Math.max(...rhodeAgeData.map((d) => d.percentage));

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
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Audience Perception
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          Age groups AI associates with the brand
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex" style={{ gap: 24, minWidth: 0 }}>
        {/* Left column: Rhode age distribution */}
        <div style={{ flex: "0 0 45%", minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rhodeAgeData.map((item) => (
              <div key={item.age} className="flex items-center" style={{ gap: 8, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--text-secondary)",
                    width: 45,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {item.age}
                </span>
                <div style={{ flex: 1, minWidth: 0, position: "relative", height: 20 }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 20,
                      backgroundColor: "#B86A54",
                      borderRadius: 4,
                      width: `${(item.percentage / maxPercentage) * 100}%`,
                      opacity: item.isPrimary ? 1 : item.percentage / maxPercentage,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-primary)",
                    fontWeight: item.isPrimary ? 700 : 400,
                    width: 35,
                    textAlign: "left",
                    flexShrink: 0,
                  }}
                >
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Brand comparison table */}
        <div style={{ flex: "1 1 55%", minWidth: 0 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#B5ADA5",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "left",
                      padding: "4px 8px",
                      borderBottom: "1px solid #F0EBE6",
                      whiteSpace: "nowrap",
                    }}
                  >
                    BRAND
                  </th>
                  <th
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#B5ADA5",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "left",
                      padding: "4px 8px",
                      borderBottom: "1px solid #F0EBE6",
                      whiteSpace: "nowrap",
                    }}
                  >
                    PRIMARY AUDIENCE
                  </th>
                  <th
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#B5ADA5",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      textAlign: "left",
                      padding: "4px 8px",
                      borderBottom: "1px solid #F0EBE6",
                      whiteSpace: "nowrap",
                    }}
                  >
                    CONF.
                  </th>
                </tr>
              </thead>
              <tbody>
                {brandAudienceData.map((row) => (
                  <tr
                    key={row.brand}
                    style={{
                      backgroundColor: row.isRhode ? "rgba(184,106,84,0.06)" : "transparent",
                    }}
                  >
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #F0EBE6",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: row.color,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 11,
                            color: "var(--text-primary)",
                            fontWeight: row.isRhode ? 700 : 400,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.brand}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        padding: "8px",
                        borderBottom: "1px solid #F0EBE6",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.primaryAudience}
                    </td>
                    <td
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        padding: "8px",
                        borderBottom: "1px solid #F0EBE6",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.confidence}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Insight below table */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#7A6F65",
              fontStyle: "italic",
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            Clinique has the most distinct audience positioning — LLMs associate it most strongly
            with a specific age group (51% confidence).
          </p>
        </div>
      </div>
    </div>
  );
}

function InsightCardI1() {
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
        LLM Consistency is the #1 predictor of sales performance (p=0.0002, 6-month lead). Rhode's
        score of 85 (Rank #1) is a strong commercial signal. However, Distinctiveness at 64 (Rank
        #3) suggests the brand doesn't yet occupy a fully unique position in AI's understanding — an
        area for strategic focus.
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
          1 of 2 core metrics is a validated sales predictor
        </span>
      </div>
    </div>
  );
}