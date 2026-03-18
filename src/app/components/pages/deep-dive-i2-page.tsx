import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { useState } from "react";
import { useDateMode } from "../../contexts/date-mode-context";
import { useBrand } from "../../contexts/brand-context";
import { useAppData } from "../../data/app-data-context";
import { getBrandSubScore } from "../../utils/brand-utils";
import { useDimension } from "../../data/use-dimensions";
import { MobileHeader } from "../mobile-header";
import { useOutletContext } from "react-router";

export function DeepDiveI2Page() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();

  return (
    <>
      <MobileHeader title="Deep Dive • I2" dimensionKey="I2" onMenuClick={openMobileMenu} />
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
          <DimensionTabs activeKey="I2" />
        </div>

        {/* Row 3 — Dimension Header */}
        <DimensionHeader />

        {/* Row 4 — Social Performance (single full-width card) */}
        <SocialPerformanceCard />

        {/* Row 5 — Brand Comparison */}
        <BrandComparison />

        {/* Row 6 — Value Associations */}
        <ValueAssociations />

        {/* Row 7 — Attribute Comparison (Heatmap Matrix) */}
        <AttributeComparison />

        {/* Row 8 — Insight Card */}
        <InsightCard />
      </div>
    </>
  );
}

function DimensionHeader() {
  const { dimension: dim } = useDimension("I2");
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
              backgroundColor: "#6B241E",
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
            {dim ? `${dim.page_letter} — ${dim.page_name}` : "I — Ingrained in Culture"}
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
            78
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
            ▲ 2.3
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
          {dim?.page_description ?? "How deeply the brand is rooted in people's everyday lives."}
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
                backgroundColor: "#6B241E",
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
              {dim ? `${dim.page_letter} — ${dim.page_name}` : "I — Ingrained in Culture"}
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
              78
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
              ▲ 2.3
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
          {dim?.page_description ?? "How deeply the brand is rooted in people's everyday lives."}
        </p>
      </div>
    </div>
  );
}

function SocialPerformanceCard() {
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
          Social Performance
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
          81
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
          ▲ 3.0
        </span>
      </div>

      {/* Sparkline */}
      <div>
        <svg width="100%" height="36" viewBox="0 0 300 36" preserveAspectRatio="none">
          <path
            d="M0,22 C50,20 100,21 150,19 C200,17 250,15 300,13"
            fill="none"
            stroke="#6B241E"
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

  const allData = [...allCategoryBrands]
    .map(b => ({ brand: b.name, score: getBrandSubScore(b.name, "i2_social"), color: b.color }))
    .sort((a, b) => b.score - a.score);

  // Filter to only show selected brands
  const data = allData.filter(item => selectedBrands.includes(item.brand));

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
            fontSize: 16,
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
          Social Performance across brands
        </p>
      </div>

      {/* Bars */}
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
      isRhode: false,
      values: ["Self-Care", "Clean Beauty", "Instagram-Native", "Gentle", "Vegan"],
    },
    {
      brand: "Glossier",
      color: "#DAC58C",
      isRhode: false,
      values: ["Millennial", "Community-Driven", "Minimalist", "Everyday Beauty", "DTC"],
    },
    {
      brand: "Clinique",
      color: "#ACBDA7",
      isRhode: false,
      values: ["Dermatologist-Tested", "Sensitive Skin", "Science-Backed", "Classic", "Department Store"],
    },
    {
      brand: "Laneige",
      color: "#6B241E",
      isRhode: false,
      values: ["K-Beauty", "Hydration", "Lip Care", "Overnight", "Affordable Luxury"],
    },
  ];

  return (
    null
  );
}

function AttributeComparison() {
  const { selectedBrands, mainBrand } = useBrand();
  
  const attributes = [
    {
      name: "Clean / Ingredients",
      scores: { Rhode: 88, "Summer Fridays": 82, Glossier: 76, Clinique: 71, Laneige: 68 },
      territory: "Owned",
    },
    {
      name: "Minimalist",
      scores: { Rhode: 85, "Summer Fridays": 64, Glossier: 83, Clinique: 48, Laneige: 52 },
      territory: "Owned",
    },
    {
      name: "Accessible Luxury",
      scores: { Rhode: 82, "Summer Fridays": 71, Glossier: 69, Clinique: 58, Laneige: 74 },
      territory: "Owned",
    },
    {
      name: "Gen Z / Youth",
      scores: { Rhode: 79, "Summer Fridays": 72, Glossier: 81, Clinique: 35, Laneige: 66 },
      territory: "Contested",
    },
    {
      name: "Skincare-First",
      scores: { Rhode: 76, "Summer Fridays": 78, Glossier: 62, Clinique: 84, Laneige: 72 },
      territory: "Contested",
    },
    {
      name: "Hydration",
      scores: { Rhode: 58, "Summer Fridays": 61, Glossier: 54, Clinique: 52, Laneige: 89 },
      territory: "Gap",
    },
    {
      name: "Self-Care Ritual",
      scores: { Rhode: 55, "Summer Fridays": 86, Glossier: 71, Clinique: 44, Laneige: 63 },
      territory: "Gap",
    },
    {
      name: "Science-Backed",
      scores: { Rhode: 42, "Summer Fridays": 38, Glossier: 34, Clinique: 91, Laneige: 45 },
      territory: "Open",
    },
  ];

  // Filter to only show selected brands
  const allBrandColumns = ["Rhode", "Summer Fridays", "Glossier", "Clinique", "Laneige"];
  const brandColumns = allBrandColumns.filter(brand => selectedBrands.includes(brand));
  
  const brandColorMap: Record<string, string> = {
    "Rhode": "#B86A54",
    "Summer Fridays": "#374762",
    "Glossier": "#DAC58C",
    "Clinique": "#ACBDA7",
    "Laneige": "#6B241E",
  };
  
  const brandColors = brandColumns.map(brand => brandColorMap[brand]);

  const territoryConfig = {
    Owned: { bg: "rgba(74,102,68,0.08)", color: "#4A6644" },
    Contested: { bg: "rgba(218,197,140,0.08)", color: "#7A6F65" },
    Gap: { bg: "rgba(184,106,84,0.06)", color: "#B86A54" },
    Open: { bg: "rgba(181,173,165,0.06)", color: "#B5ADA5" },
  };

  function getOpacity(score: number) {
    // Map score 40-90 to opacity 0.05-0.25
    const normalized = (score - 40) / 50;
    return Math.max(0.05, Math.min(0.25, normalized * 0.2 + 0.05));
  }

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
      {/* Mobile: Stacked layout with legend */}
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
          Attribute Comparison
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          How each brand performs on key cultural attributes — revealing owned, contested, and available territories
        </p>
      </div>

      {/* Desktop: Title and legend on same row */}
      <div className="hidden md:block" style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          Attribute Comparison
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#B5ADA5",
          }}
        >
          How each brand performs on key cultural attributes — revealing owned, contested, and available territories
        </p>
      </div>

      {/* Heatmap matrix */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ minWidth: 600 }}>
          {/* Table header */}
          <div className="flex" style={{ gap: 2, marginBottom: 8 }}>
            <div style={{ width: 140 }} /> {/* Attribute column spacer */}
            {brandColumns.map((brand, i) => (
              <div
                key={brand}
                style={{
                  flex: 1,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: brandColors[i],
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    color: "#7A6F65",
                    fontWeight: brand === mainBrand ? 700 : 400,
                  }}
                >
                  {brand}
                </span>
              </div>
            ))}
            <div style={{ width: 80, textAlign: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  color: "#7A6F65",
                }}
              >
                Territory
              </span>
            </div>
          </div>

          {/* Attribute rows */}
          {attributes.map((attr, attrIndex) => {
            const maxScore = Math.max(...Object.values(attr.scores));
            const minScore = Math.min(...Object.values(attr.scores));

            return (
              <div key={attr.name}>
                {attrIndex > 0 && (
                  <div
                    style={{
                      height: 1,
                      backgroundColor: "#F0EBE6",
                      marginBottom: 8,
                    }}
                  />
                )}
                <div className="flex" style={{ gap: 2, marginBottom: 8 }}>
                  {/* Attribute name */}
                  <div
                    style={{
                      width: 140,
                      fontFamily: "var(--font-body)",
                      fontSize: 11,
                      color: "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {attr.name}
                  </div>

                  {/* Score cells */}
                  {brandColumns.map((brand, i) => {
                    const score = attr.scores[brand as keyof typeof attr.scores];
                    const isMax = score === maxScore;
                    const isMin = score === minScore;
                    const isMainBrand = brand === mainBrand;

                    return (
                      <div
                        key={brand}
                        style={{
                          flex: 1,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isMainBrand
                            ? `${brandColorMap[brand]}${Math.round(getOpacity(score) * 255).toString(16).padStart(2, '0')}`
                            : `rgba(213,206,199,${getOpacity(score)})`,
                          borderRadius: 4,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            fontWeight: isMax ? 700 : 400,
                            color: isMin ? "#B5ADA5" : "var(--text-primary)",
                          }}
                        >
                          {score}
                        </span>
                      </div>
                    );
                  })}

                  {/* Territory badge */}
                  <div
                    style={{
                      width: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 10,
                        padding: "3px 8px",
                        borderRadius: "var(--radius-pill)",
                        backgroundColor: territoryConfig[attr.territory as keyof typeof territoryConfig].bg,
                        color: territoryConfig[attr.territory as keyof typeof territoryConfig].color,
                        fontWeight: 600,
                      }}
                    >
                      {attr.territory}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      
    </div>
  );
}

function InsightCard() {
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
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Cultural Territory Summary
        </h3>
      </div>

      {/* Body text */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "#7A6F65",
          lineHeight: 1.6,
          marginBottom: 16,
        }}
      >
        Rhode has clear cultural ownership of 'Clean Beauty', 'Minimalist', and 'Accessible Luxury' — three
        territories it leads in and should protect. 'Gen Z' and 'Skincare-First' are contested with Glossier and
        Clinique respectively. The biggest gaps are 'Hydration' (dominated by Laneige) and 'Self-Care Ritual' (owned
        by Summer Fridays). 'Science-Backed' is an open territory where Clinique leads by default but doesn't
        actively defend.
      </p>

      {/* Three mini cards */}
      <div className="flex" style={{ gap: 12, marginBottom: 16 }}>
        {/* Card 1: Owned Territories */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(74,102,68,0.06)",
            borderRadius: 10,
            padding: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#4A6644",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            OWNED TERRITORIES
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Clean Beauty", "Minimalist", "Accessible Luxury"].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(74,102,68,0.1)",
                  color: "#4A6644",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Card 2: Opportunities */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(218,197,140,0.08)",
            borderRadius: 10,
            padding: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#7A6F65",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            OPPORTUNITIES
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Sustainability (unclaimed)", "Science-Lite (repositionable)", "Wellness"].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(218,197,140,0.12)",
                  color: "#7A6F65",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Card 3: Watch */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(184,106,84,0.06)",
            borderRadius: 10,
            padding: 12,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 9,
              color: "#B86A54",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            WATCH
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Hydration (Laneige dominant)", "Gen Z fatigue risk", "Dupe association"].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "rgba(184,106,84,0.08)",
                  color: "#B86A54",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
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
          Social Imagery (p=0.037) and Attribute Performance (p=0.031) predict at 6-month lead
        </span>
      </div>
    </div>
  );
}