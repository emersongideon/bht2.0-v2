import { SortableBarChart } from "../sortable-bar-chart";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { DimensionTabs } from "../dimension-tabs";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { toISODateString } from "../../utils/date-utils";
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

export function DeepDiveI1Page() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const subScores = useSubmetricScores("I1");

  return (
    <>
      <MobileHeader title="Deep Dive • I1" dimensionKey="I1" onMenuClick={openMobileMenu} />
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
          <DimensionTabs activeKey="I1" />
        </div>

        {/* Row 3 — Dimension Header */}
        <DimensionHeader pageKey="I1" />

        {/* Row 4 — Sub-metric cards (stacks on mobile) */}
        <div className="flex flex-col md:flex-row" style={{ gap: 32 }}>
          <ScoreCard
            title="LLM Consistency"
            badge="LLM"
            liveScore={subScores["LLM Consistency"]?.score ?? null}
            liveDelta={subScores["LLM Consistency"]?.delta ?? null}
            trendValues={subScores["LLM Consistency"]?.trendValues}
          />
          <ScoreCard
            title="LLM Distinctiveness"
            badge="LLM"
            liveScore={subScores["LLM Distinctiveness"]?.score ?? null}
            liveDelta={subScores["LLM Distinctiveness"]?.delta ?? null}
            trendValues={subScores["LLM Distinctiveness"]?.trendValues}
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
              backgroundColor: "#374762",
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
            {dim ? `${dim.page_letter} — ${dim.page_name}` : "I — Imprinted in AI"}
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
          {dim?.page_description ?? "How deeply and distinctly the brand is encoded in the minds of machines."}
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
          {dim?.page_description ?? "How deeply and distinctly the brand is encoded in the minds of machines."}
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
  const allScores = useAllBrandsSubmetricScores("I1");
  const categoryBrands = (brandsByCategory[selectedCategory] ?? []).filter(b => selectedBrands.includes(b.name));
  const consistencyData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["LLM Consistency"] ?? null, color: b.color }));
  const distinctivenessData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["LLM Distinctiveness"] ?? null, color: b.color }));

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
          Consistency & Distinctiveness across brands
        </p>
      </div>
      <div className="flex flex-col md:flex-row" style={{ gap: 32 }}>
        <SortableBarChart title="CONSISTENCY" data={consistencyData} mainBrand={mainBrand} />
        <SortableBarChart title="DISTINCTIVENESS" data={distinctivenessData} mainBrand={mainBrand} />
      </div>
    </div>
  );
}

function ValueAssociations() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];

  // brand -> top attributes (sorted by strength desc, latest date)
  const [valuesByBrand, setValuesByBrand] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setValuesByBrand({});
    async function load() {
      const { data } = await supabase
        .from("i1_value_associations")
        .select("brand_name, date, i1_attribute_name, i1_strength")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: false });

      if (!data?.length) return;

      // For each brand, keep only the most recent date's rows
      const latestDateByBrand: Record<string, string> = {};
      for (const row of data) {
        if (!latestDateByBrand[row.brand_name]) {
          latestDateByBrand[row.brand_name] = row.date;
        }
      }

      const grouped: Record<string, { name: string; strength: number }[]> = {};
      for (const row of data) {
        if (row.date !== latestDateByBrand[row.brand_name]) continue;
        if (!grouped[row.brand_name]) grouped[row.brand_name] = [];
        grouped[row.brand_name].push({ name: row.i1_attribute_name, strength: row.i1_strength });
      }

      const result: Record<string, string[]> = {};
      for (const brand of Object.keys(grouped)) {
        grouped[brand].sort((a, b) => b.strength - a.strength);
        result[brand] = grouped[brand].slice(0, 5).map(a => a.name);
      }

      setValuesByBrand(result);
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate]);

  const filteredBrandValues = categoryBrandList
    .filter(b => selectedBrands.includes(b.name))
    .map(b => ({ brand: b.name, color: b.color, values: valuesByBrand[b.name] ?? [] }))
    .filter(b => b.values.length > 0);

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
        {filteredBrandValues.map((item, index) => (
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
                    fontWeight: item.brand === mainBrand ? 700 : 400,
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
                      backgroundColor: item.brand === mainBrand
                        ? "rgba(184,106,84,0.1)"
                        : "#F5F0EB",
                      color: item.brand === mainBrand ? "#B86A54" : "#7A6F65",
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
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];

  // brand -> domain rows (sorted by percentage desc)
  const [domainsByBrand, setDomainsByBrand] = useState<Record<string, { domain: string; percentage: number }[]>>({});

  // Default selected brand to mainBrand when it changes
  const activeBrand = selectedBrand ?? mainBrand;

  useEffect(() => {
    setDomainsByBrand({});
    async function load() {
      const { data } = await supabase
        .from("i1_domain_sources")
        .select("brand_name, date, i1_domain, i1_domain_percentage")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: false });

      if (!data?.length) return;

      // For each brand, keep only the rows from the most recent date
      const latestDateByBrand: Record<string, string> = {};
      for (const row of data) {
        if (!latestDateByBrand[row.brand_name]) {
          latestDateByBrand[row.brand_name] = row.date;
        }
      }

      const grouped: Record<string, { domain: string; percentage: number }[]> = {};
      for (const row of data) {
        if (row.date !== latestDateByBrand[row.brand_name]) continue;
        if (!grouped[row.brand_name]) grouped[row.brand_name] = [];
        grouped[row.brand_name].push({ domain: row.i1_domain, percentage: row.i1_domain_percentage });
      }
      for (const brand of Object.keys(grouped)) {
        grouped[brand].sort((a, b) => b.percentage - a.percentage);
      }

      setDomainsByBrand(grouped);
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate]);

  const selectedBrandData = domainsByBrand[activeBrand] ?? [];
  const selectedBrandColor = categoryBrandList.find(b => b.name === activeBrand)?.color ?? "#B86A54";
  const maxPercentage = selectedBrandData.length ? Math.max(...selectedBrandData.map((d) => d.percentage)) : 1;

  // Right panel: top 3 domains per selected brand
  const brandTopDomains = categoryBrandList
    .filter(b => selectedBrands.includes(b.name))
    .map(b => ({
      brand: b.name,
      color: b.color,
      domains: (domainsByBrand[b.name] ?? []).slice(0, 3).map(d => d.domain),
    }));

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
      <div style={{ marginBottom: 16 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ marginBottom: 8 }}>
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
          
          {/* Brand selector - scrollable on mobile */}
          <div style={{ 
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}>
            <div className="flex items-center gap-1.5" style={{ 
              backgroundColor: "#F5F0EB",
              borderRadius: "var(--radius-pill)",
              padding: "3px",
              minWidth: "max-content",
            }}>
              {categoryBrandList.filter(brand => selectedBrands.includes(brand.name)).map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand.name)}
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    padding: "4px 10px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: activeBrand === brand.name ? "#FFFFFF" : "transparent",
                    color: activeBrand === brand.name ? "var(--text-primary)" : "#7A6F65",
                    fontWeight: brand.name === mainBrand ? 700 : activeBrand === brand.name ? 600 : 400,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
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
                </button>
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
          Most referenced sources when LLMs discuss the brand
        </p>
      </div>

      {/* Two-column layout - stacks on mobile */}
      <div className="flex flex-col md:flex-row" style={{ gap: 20, minWidth: 0 }}>
        {/* Left column: Selected brand domain bar chart */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {selectedBrandData.map((item) => (
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
                    backgroundColor: selectedBrandColor,
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
                  {Math.round(item.percentage)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Brand comparison */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h4
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              fontWeight: 600,
              color: "#B5ADA5",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: 10,
            }}
          >
            Top 3 Domains per Brand
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {brandTopDomains.filter(item => selectedBrands.includes(item.brand)).map((item) => (
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
                      fontWeight: item.brand === mainBrand ? 700 : 400,
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
      
    </div>
  );
}

function AudiencePerception() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { selectedDate } = useDateMode();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];
  const [selectedBrand, setSelectedBrand] = useState(mainBrand);

  useEffect(() => { setSelectedBrand(mainBrand); }, [mainBrand]);

  type AgeRow = { age: string; percentage: number };
  const [ageDataByBrand, setAgeDataByBrand] = useState<Record<string, AgeRow[]>>({});

  useEffect(() => {
    setAgeDataByBrand({});
    async function load() {
      const { data } = await supabase
        .from("i1_audience_perception")
        .select("brand_name, date, i1_audience_age_group, i1_audience_percentage")
        .eq("category_name", selectedCategory)
        .in("brand_name", selectedBrands)
        .lte("date", toISODateString(selectedDate))
        .order("date", { ascending: false });

      if (!data?.length) return;

      const latestByBrand: Record<string, string> = {};
      for (const row of data) {
        if (!latestByBrand[row.brand_name]) latestByBrand[row.brand_name] = row.date;
      }

      const result: Record<string, AgeRow[]> = {};
      for (const row of data) {
        if (row.date !== latestByBrand[row.brand_name]) continue;
        if (!result[row.brand_name]) result[row.brand_name] = [];
        result[row.brand_name].push({ age: row.i1_audience_age_group, percentage: row.i1_audience_percentage });
      }

      setAgeDataByBrand(result);
    }
    load();
  }, [selectedBrands, selectedCategory, selectedDate]);

  const AGE_ORDER = ["16-24", "25-34", "35-44", "45-54", "55+"];
  const sortByAge = (a: { age: string }, b: { age: string }) =>
    AGE_ORDER.indexOf(a.age) - AGE_ORDER.indexOf(b.age);

  const selectedBrandAgeData = [...(ageDataByBrand[selectedBrand] ?? [])].sort(sortByAge);
  const selectedBrandColor = categoryBrandList.find(b => b.name === selectedBrand)?.color ?? "#B86A54";
  const maxPercentage = selectedBrandAgeData.length > 0 ? Math.max(...selectedBrandAgeData.map((d) => d.percentage)) : 1;

  const brandSummaryData = selectedBrands
    .filter(b => (ageDataByBrand[b]?.length ?? 0) > 0)
    .map(b => {
      const rows = ageDataByBrand[b];
      const top = rows.reduce((a, c) => c.percentage > a.percentage ? c : a, rows[0]);
      const color = categoryBrandList.find(br => br.name === b)?.color ?? "#B86A54";
      return { brand: b, color, primaryAudience: top.age, audienceSize: top.percentage };
    });

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
      <div style={{ marginBottom: 16 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ marginBottom: 8 }}>
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
          
          {/* Brand selector - scrollable on mobile */}
          <div style={{ 
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}>
            <div className="flex items-center gap-1.5" style={{ 
              backgroundColor: "#F5F0EB",
              borderRadius: "var(--radius-pill)",
              padding: "3px",
              minWidth: "max-content",
            }}>
              {categoryBrandList.filter(brand => selectedBrands.includes(brand.name)).map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand.name)}
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    padding: "4px 10px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: selectedBrand === brand.name ? "#FFFFFF" : "transparent",
                    color: selectedBrand === brand.name ? "var(--text-primary)" : "#7A6F65",
                    fontWeight: brand.name === mainBrand ? 700 : selectedBrand === brand.name ? 600 : 400,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
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
                </button>
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
          Age groups AI associates with the brand
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row" style={{ gap: 24, minWidth: 0 }}>
        {/* Left column: Selected brand age distribution */}
        <div style={{ flex: "0 0 45%", minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {selectedBrandAgeData.map((item) => {
              const isPrimary = item.percentage === maxPercentage;
              return (
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
                      backgroundColor: selectedBrandColor,
                      borderRadius: 4,
                      width: `${(item.percentage / maxPercentage) * 100}%`,
                      opacity: isPrimary ? 1 : item.percentage / maxPercentage,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-primary)",
                    fontWeight: isPrimary ? 700 : 400,
                    width: 35,
                    textAlign: "left",
                    flexShrink: 0,
                  }}
                >
                  {item.percentage}%
                </span>
              </div>
              );
            })}
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
                      fontSize: 8,
                      fontWeight: 600,
                      color: "#B5ADA5",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
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
                      fontSize: 8,
                      fontWeight: 600,
                      color: "#B5ADA5",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
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
                      fontSize: 8,
                      fontWeight: 600,
                      color: "#B5ADA5",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      textAlign: "left",
                      padding: "4px 8px",
                      borderBottom: "1px solid #F0EBE6",
                      whiteSpace: "nowrap",
                    }}
                  >AUDIENCE SIZE</th>
                </tr>
              </thead>
              <tbody>
                {brandSummaryData.map((row) => (
                  <tr
                    key={row.brand}
                    style={{
                      backgroundColor: selectedBrand === row.brand ? "rgba(184,106,84,0.06)" : "transparent",
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
                            fontWeight: row.brand === mainBrand ? 700 : 400,
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
                        color: "var(--text-primary)",
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
                        color: "var(--text-primary)",
                      }}
                    >
                      {row.audienceSize}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Insight below table */}
          
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