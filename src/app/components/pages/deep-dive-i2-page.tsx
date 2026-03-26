import { SortableBarChart } from "../sortable-bar-chart";
import { DimensionTabs } from "../dimension-tabs";
import { useState } from "react";
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
import { useI2AttributeScores } from "../../hooks/use-i2-attribute-scores";

export function DeepDiveI2Page() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const subScores = useSubmetricScores("I2");

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
        {/* Row 2 — Dimension Tabs (Desktop only) */}
        <div className="hidden md:block" style={{ flexShrink: 0 }}>
          <DimensionTabs activeKey="I2" />
        </div>

        {/* Row 3 — Dimension Header */}
        <DimensionHeader pageKey="I2" />

        {/* Row 4 — Social Performance (single full-width card) */}
        <SocialPerformanceCard liveScore={subScores["Social Performance"]?.score ?? null} liveDelta={subScores["Social Performance"]?.delta ?? null} trendValues={subScores["Social Performance"]?.trendValues} />

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
          {dim?.page_description ?? "How deeply the brand is rooted in people's everyday lives."}
        </p>
      </div>
    </div>
  );
}

function SocialPerformanceCard({ liveScore, liveDelta, trendValues }: { liveScore?: number | null; liveDelta?: number | null; trendValues?: (number | null)[] }) {
  const isPositive = !liveDelta || liveDelta >= 0;
  const { getAxisLabels } = useDateMode();
  const axisLabels = getAxisLabels();

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const W = 300; const H = 36;
  const n = trendValues?.length ?? 0;
  const toX = (i: number) => n > 1 ? (i / (n - 1)) * W : W / 2;
  const toY = (v: number) => H - 1 - (v / 100) * (H - 2); // fixed 0-100 scale
  const yBottom = H - 1;
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
          {hoverIndex !== null && (
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
                {trendValues?.[hoverIndex] != null ? Number(trendValues?.[hoverIndex]).toFixed(1) : "—"}
              </span>
            </div>
          )}
          <svg width="100%" height="36" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
            {!hasData && (
              <path d="M0,22 C50,20 100,21 150,19 C200,17 250,15 300,13" fill="none" stroke="#6B241E" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            )}
            {hasData && sparkPath && (
              <path d={sparkPath} fill="none" stroke="#6B241E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
            {hoverIndex !== null && (() => { const x = (hoverIndex / Math.max(n - 1, 1)) * W; return <line x1={x} y1={0} x2={x} y2={H} stroke="#6B241E" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />; })()}
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
  const allScores = useAllBrandsSubmetricScores("I2");
  const data = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Social Performance"] ?? null, color: b.color }));

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
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>
          Brand Comparison
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#B5ADA5" }}>
          Social Performance across brands
        </p>
      </div>
      <SortableBarChart title="SOCIAL PERFORMANCE" data={data} mainBrand={mainBrand} />
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
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();
  const attributes = useI2AttributeScores();

  const categoryBrands = brandsByCategory[selectedCategory] ?? [];
  // Ordered brand columns matching category order, filtered to selected
  const brandColumns = categoryBrands
    .filter((b) => selectedBrands.includes(b.name))
    .map((b) => b.name);
  const brandColorMap: Record<string, string> = Object.fromEntries(
    categoryBrands.map((b) => [b.name, b.color])
  );
  const brandColors = brandColumns.map((b) => brandColorMap[b] ?? "#B5ADA5");

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

          {/* Loading state */}
          {attributes.length === 0 && (
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", paddingTop: 8 }}>
              Loading…
            </div>
          )}

          {/* Attribute rows */}
          {attributes.map((attr, attrIndex) => {
            const visibleScores = brandColumns
              .map((b) => attr.scores[b])
              .filter((s): s is number => s !== undefined);
            const maxScore = visibleScores.length ? Math.max(...visibleScores) : 0;
            const minScore = visibleScores.length ? Math.min(...visibleScores) : 0;

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
                    const score = attr.scores[brand];
                    const isMax = score !== undefined && score === maxScore;
                    const isMin = score !== undefined && score === minScore;
                    const isMainBrand = brand === mainBrand;
                    const displayScore = score !== undefined ? score.toFixed(1) : null;

                    return (
                      <div
                        key={brand}
                        style={{
                          flex: 1,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: score !== undefined
                            ? isMainBrand
                              ? `${brandColorMap[brand]}${Math.round(getOpacity(score) * 255).toString(16).padStart(2, '0')}`
                              : `rgba(213,206,199,${getOpacity(score)})`
                            : "transparent",
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
                          {displayScore ?? "—"}
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
                        backgroundColor: (territoryConfig[attr.territory as keyof typeof territoryConfig] ?? territoryConfig.Open).bg,
                        color: (territoryConfig[attr.territory as keyof typeof territoryConfig] ?? territoryConfig.Open).color,
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