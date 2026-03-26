import { SortableBarChart } from "../sortable-bar-chart";
import { DimensionTabs } from "../dimension-tabs";
import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { useDateMode } from "../../contexts/date-mode-context";
import { MobileHeader } from "../mobile-header";
import { useOutletContext } from "react-router";
import { useBrand } from "../../contexts/brand-context";
import { useDimension } from "../../data/use-dimensions";
import { useDimensionScore } from "../../hooks/use-dimension-score";
import { useAppData } from "../../data/app-data-context";
import { getBrandSubScore } from "../../utils/brand-utils";
import { getBrandLineColor } from "../../utils/chart-colors";
import { useSubmetricScores } from "../../hooks/use-submetric-scores";
import { useAllBrandsSubmetricScores } from "../../hooks/use-all-brands-submetric-scores";
import { useNAlignmentLatest } from "../../hooks/use-n-alignment";

export function DeepDiveNPage() {
  const { openMobileMenu } = useOutletContext<{ openMobileMenu: () => void }>();
  const subScores = useSubmetricScores("N");

  return (
    <>
      <MobileHeader title="Deep Dive • N" dimensionKey="N" onMenuClick={openMobileMenu} />
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
          <DimensionTabs activeKey="N" />
        </div>

        {/* Row 3 — Dimension Header */}
        <DimensionHeader pageKey="N" />

        {/* Row 4 — Rhode's Score Cards - stacks on mobile */}
        <div className="flex flex-col md:flex-row" style={{ gap: 12, flexShrink: 0 }}>
          <ScoreCard
            title="Consistency"
            badge="Social"
            liveScore={subScores["Consistency"]?.score ?? null}
            liveDelta={subScores["Consistency"]?.delta ?? null}
            trendValues={subScores["Consistency"]?.trendValues}
          />
          <ScoreCard title="Coherence" badge="Social" liveScore={subScores["Coherence"]?.score ?? null} liveDelta={subScores["Coherence"]?.delta ?? null} trendValues={subScores["Coherence"]?.trendValues} />
          <AlignmentScoreCard liveScore={subScores["Alignment"]?.score ?? null} liveDelta={subScores["Alignment"]?.delta ?? null} trendValues={subScores["Alignment"]?.trendValues} />
        </div>

        {/* Row 5 — Brand Comparison */}
        <BrandComparison />

        {/* Row 6 — Sender/Receiver Alignment */}
        <SenderReceiverAlignment />

        {/* Row 6b — Alignment Gap Strip */}
        <AlignmentGapStrip />

        {/* Row 7 — Sender vs Receiver Values - stacks on mobile */}
        <div className="flex flex-col md:flex-row" style={{ gap: 12, flexShrink: 0 }}>
          <SenderValues />
          <ReceiverValues />
        </div>

        {/* Row 8 — Top Aligned Posts */}
        <TopAlignedPosts />

        {/* Row 9 — Communication Guidelines */}
        <CommunicationGuidelines />
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
              backgroundColor: "#ACBDA7",
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
            {dim ? `${dim.page_letter} — ${dim.page_name}` : "N — Never Lost in Translation"}
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
          {dim?.page_description ?? "What the brand stands for and how aligned its messages are."}
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
          {dim?.page_description ?? "What the brand stands for and how aligned its messages are."}
        </p>
      </div>
    </div>
  );
}

function BrandComparison() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();
  const categoryBrands = (brandsByCategory[selectedCategory] ?? []).filter(b => selectedBrands.includes(b.name));
  const allScores = useAllBrandsSubmetricScores("N");
  const consistencyData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Consistency"] ?? null, color: b.color }));
  const coherenceData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Coherence"] ?? null, color: b.color }));
  const alignmentData = categoryBrands.map(b => ({ brand: b.name, score: allScores[b.name]?.["Alignment"] ?? null, color: b.color }));

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
          Consistency, Coherence & Alignment across brands
        </p>
      </div>
      <div className="flex flex-col md:flex-row" style={{ gap: 32 }}>
        <SortableBarChart title="CONSISTENCY" data={consistencyData} mainBrand={mainBrand} />
        <SortableBarChart title="COHERENCE" data={coherenceData} mainBrand={mainBrand} />
        <SortableBarChart title="ALIGNMENT" data={alignmentData} mainBrand={mainBrand} />
      </div>
    </div>
  );
}

function ScoreCard({ title, badge, liveScore, liveDelta, trendValues }: { title: string; badge: string; liveScore?: number | null; liveDelta?: number | null; trendValues?: (number | null)[] }) {
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
            {hoverIndex !== null && (() => { const pt = sparkDots.find(p => p.i === hoverIndex); return pt ? <line key={pt.i} x1={pt.x} y1={0} x2={pt.x} y2={H} stroke="#9A9089" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" /> : null; })()}
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

function AlignmentScoreCard({ liveScore, liveDelta, trendValues }: { liveScore?: number | null; liveDelta?: number | null; trendValues?: (number | null)[] }) {
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

  const sparkDots: { x: number; y: number; i: number }[] = trendValues
    ? trendValues.map((v, i) => v !== null ? { x: toX(i), y: toY(v), i } : null).filter((pt): pt is { x: number; y: number; i: number } => pt !== null)
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
          Alignment
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
            {!hasData && <path d="M0,24 C50,22 100,23 150,21 C200,19 250,17 300,15" fill="none" stroke="#B5ADA5" strokeWidth="2" strokeLinecap="round" opacity="0.4" />}
            {hasData && sparkPath && <path d={sparkPath} fill="none" stroke="#B5ADA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
            {hoverIndex !== null && (() => { const pt = sparkDots.find(p => p.i === hoverIndex); return pt ? <line key={pt.i} x1={pt.x} y1={0} x2={pt.x} y2={H} stroke="#9A9089" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" /> : null; })()}
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

function SenderReceiverAlignment() {
  const { selectedBrands, mainBrand, selectedCategory } = useBrand();
  const { brandsByCategory } = useAppData();
  const categoryBrandList = brandsByCategory[selectedCategory] ?? [];
  const subScores = useSubmetricScores("N");
  const nData = useNAlignmentLatest();

  const mainBrandRows = nData[mainBrand] ?? [];
  const axes = mainBrandRows.length > 0
    ? mainBrandRows.map(r => r.n_attribute_name)
    : ["Clean / Ingredients", "Aesthetic / Visual", "Premium / Luxury", "Skin Health", "Simplicity"];

  const senderData = mainBrandRows.length > 0
    ? mainBrandRows.map(r => r.n_sender_score ?? 0)
    : [92, 87, 81, 78, 71];
  const receiverData = mainBrandRows.length > 0
    ? mainBrandRows.map(r => r.n_receiver_score ?? 0)
    : [88, 85, 74, 52, 68];

  const mainBrandInfo = categoryBrandList.find(b => b.name === mainBrand);
  const senderColor = mainBrandInfo?.color ?? "#B86A54";

  // Summary card derived values
  const alignmentScore = subScores["Alignment"]?.score ?? null;
  const alignmentDelta = subScores["Alignment"]?.delta ?? null;
  const isAlignmentPositive = !alignmentDelta || alignmentDelta >= 0;

  const avgGap = mainBrandRows.length > 0
    ? mainBrandRows.reduce((sum, r) => sum + (r.n_alignment_gap ?? 0), 0) / mainBrandRows.length
    : null;

  const biggestGapRow = mainBrandRows.length > 0
    ? mainBrandRows.reduce((a, b) => (b.n_alignment_gap ?? 0) > (a.n_alignment_gap ?? 0) ? b : a)
    : null;
  const bestAlignmentRow = mainBrandRows.length > 0
    ? mainBrandRows.reduce((a, b) => (b.n_alignment_gap ?? Infinity) < (a.n_alignment_gap ?? Infinity) ? b : a)
    : null;

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3" style={{ marginBottom: 16 }}>
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
          >What the brand vs consumers say</p>
        </div>
        
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
            display: "inline-flex",
          }}>
            {selectedBrands.map((brandName) => {
              const brand = categoryBrandList.find(b => b.name === brandName);
              if (!brand) return null;
              
              return (
                <div
                  key={brand.name}
                  className="flex items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    padding: "4px 10px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: brand.name === mainBrand ? "#4A7CC7" : "transparent",
                    color: brand.name === mainBrand ? "#FFFFFF" : "#7A6F65",
                    fontWeight: brand.name === mainBrand ? 700 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: getBrandLineColor(brand.name, mainBrand),
                    }}
                  />
                  {brand.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vertical layout */}
      <div className="flex flex-col" style={{ gap: 20 }}>
        {/* Spider chart */}
        <div style={{ display: "flex", justifyContent: "center" }}>
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
              fill={senderColor}
              fillOpacity={0.1}
              stroke={senderColor}
              strokeWidth="2"
            />
            {senderPoints.map((p, i) => (
              <circle key={`s${i}`} cx={p[0]} cy={p[1]} r="3" fill={senderColor} />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4">
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

        {/* Summary cards - 2x2 grid */}
        <div className="grid grid-cols-2 gap-3">
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
                {alignmentScore ?? "—"}
              </span>
              {alignmentDelta !== null && alignmentDelta !== undefined && (
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: isAlignmentPositive ? "rgba(74,102,68,0.1)" : "rgba(184,106,84,0.1)",
                    color: isAlignmentPositive ? "#4A6644" : "#B86A54",
                    fontWeight: 600,
                  }}
                >
                  {isAlignmentPositive ? "▲" : "▼"} {Math.abs(alignmentDelta).toFixed(1)}
                </span>
              )}
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
                {avgGap !== null ? (avgGap >= 0 ? "+" : "") + avgGap.toFixed(1) : "—"}
              </span>
              {avgGap !== null && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#4A6644",
                  }}
                >
                  pts
                </span>
              )}
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
              {biggestGapRow?.n_attribute_name ?? "—"}
            </div>
            {biggestGapRow && (
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  color: "#B5ADA5",
                }}
              >
                Sender: {biggestGapRow.n_sender_score ?? "—"} → Receiver: {biggestGapRow.n_receiver_score ?? "—"} ({biggestGapRow.n_alignment_gap !== null ? `${biggestGapRow.n_alignment_gap > 0 ? "+" : ""}${biggestGapRow.n_alignment_gap.toFixed(0)} pts` : "—"})
              </div>
            )}
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
              {bestAlignmentRow?.n_attribute_name ?? "—"}
            </div>
            {bestAlignmentRow && (
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  color: "#B5ADA5",
                }}
              >
                Sender: {bestAlignmentRow.n_sender_score ?? "—"} → Receiver: {bestAlignmentRow.n_receiver_score ?? "—"} ({bestAlignmentRow.n_alignment_gap !== null ? `${bestAlignmentRow.n_alignment_gap > 0 ? "+" : ""}${bestAlignmentRow.n_alignment_gap.toFixed(0)} pts` : "—"})
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlignmentGapStrip() {
  const { mainBrand } = useBrand();
  const nData = useNAlignmentLatest();
  const mainBrandRows = nData[mainBrand] ?? [];

  const aligned = mainBrandRows.filter(
    r => r.n_sender_alignment_status === false && r.n_receiver_alignment_status === false
  );
  const senderOnly = mainBrandRows.filter(
    r => r.n_sender_alignment_status === true && r.n_receiver_alignment_status === false
  );
  const receiverOnly = mainBrandRows.filter(
    r => r.n_sender_alignment_status === false && r.n_receiver_alignment_status === true
  );

  const pillStyle = (bg: string, color: string) => ({
    fontFamily: "var(--font-body)" as const,
    fontSize: 10,
    padding: "4px 10px",
    borderRadius: "var(--radius-pill)" as const,
    backgroundColor: bg,
    color,
    whiteSpace: "nowrap" as const,
  });

  const labelStyle = {
    fontFamily: "var(--font-body)" as const,
    fontSize: 9,
    color: "#B5ADA5",
    textTransform: "uppercase" as const,
    marginRight: 4,
    flexShrink: 0,
  };

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
      <div className="flex flex-col" style={{ gap: 12 }}>
        {/* Group 1: Aligned */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
          <span style={labelStyle}>ALIGNED</span>
          {aligned.length === 0
            ? <span style={{ ...pillStyle("rgba(74,102,68,0.08)", "#4A6644"), opacity: 0.4 }}>—</span>
            : aligned.map(r => (
              <span key={r.n_attribute_name} style={pillStyle("rgba(74,102,68,0.08)", "#4A6644")}>
                ✓ {r.n_attribute_name}
              </span>
            ))
          }
        </div>

        <div style={{ height: 1, backgroundColor: "#E8E2DC" }} />

        {/* Group 2: Gap Sender Only */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
          <span style={labelStyle}>GAP: SENDER ONLY</span>
          {senderOnly.length === 0
            ? <span style={{ ...pillStyle("rgba(184,106,84,0.08)", "#B86A54"), opacity: 0.4 }}>—</span>
            : senderOnly.map(r => (
              <span key={r.n_attribute_name} style={pillStyle("rgba(184,106,84,0.08)", "#B86A54")}>
                → {r.n_attribute_name}
              </span>
            ))
          }
        </div>

        <div style={{ height: 1, backgroundColor: "#E8E2DC" }} />

        {/* Group 3: Gap Receiver Only */}
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
          <span style={labelStyle}>GAP: RECEIVER ONLY</span>
          {receiverOnly.length === 0
            ? <span style={{ ...pillStyle("rgba(55,71,98,0.08)", "#374762"), opacity: 0.4 }}>—</span>
            : receiverOnly.map(r => (
              <span key={r.n_attribute_name} style={pillStyle("rgba(55,71,98,0.08)", "#374762")}>
                ← {r.n_attribute_name}
              </span>
            ))
          }
        </div>
      </div>
    </div>
  );
}

function SenderValues() {
  const { mainBrand } = useBrand();
  const nData = useNAlignmentLatest();
  const mainBrandRows = nData[mainBrand] ?? [];

  const sorted = [...mainBrandRows]
    .sort((a, b) => (b.n_sender_score ?? 0) - (a.n_sender_score ?? 0))
    .slice(0, 5);

  const values = sorted.length > 0
    ? sorted.map((r, i) => ({ rank: i + 1, name: r.n_attribute_name, score: r.n_sender_score ?? 0 }))
    : [
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
  const { mainBrand } = useBrand();
  const nData = useNAlignmentLatest();
  const mainBrandRows = nData[mainBrand] ?? [];

  const sorted = [...mainBrandRows]
    .sort((a, b) => (b.n_receiver_score ?? 0) - (a.n_receiver_score ?? 0))
    .slice(0, 5);

  const values = sorted.length > 0
    ? sorted.map((r, i) => ({ rank: i + 1, name: r.n_attribute_name, score: r.n_receiver_score ?? 0 }))
    : [
        { rank: 1, name: "Clean Beauty", score: 88 },
        { rank: 2, name: "Aesthetic / Visual", score: 85 },
        { rank: 3, name: "Affordable Premium", score: 74 },
        { rank: 4, name: "Hydration / Glow", score: 72 },
        { rank: 5, name: "Celebrity-Backed", score: 68 },
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
  const { mainBrand, selectedCategory } = useBrand();
  const [posts, setPosts] = useState<{
    id: number;
    platform: string;
    handle: string;
    caption: string;
    alignment: number;
    engagement: number;
    postUrl: string | null;
    imageUrl: string | null;
  }[]>([]);

  useEffect(() => {
    setPosts([]);
    async function load() {
      const { data } = await supabase
        .from("iconic_social_feed")
        .select("id, social_platform, social_handle, social_caption, social_engagement_rate, social_post_url, social_image_url, n_alignment_score")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .order("n_alignment_score", { ascending: false })
        .limit(5);

      if (!data?.length) return;

      setPosts(data.map((row, i) => {
        const url = row.social_post_url ?? "";
        const platform = url.includes("tiktok.com") ? "TikTok"
          : url.includes("instagram.com") ? "Instagram"
          : row.social_platform;
        return {
          id: row.id ?? i,
          platform,
          handle: row.social_handle,
          caption: row.social_caption,
          alignment: row.n_alignment_score,
          engagement: row.social_engagement_rate,
          postUrl: row.social_post_url,
          imageUrl: row.social_image_url,
        };
      }));
    }
    load();
  }, [mainBrand, selectedCategory]);

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
      {posts.length === 0 && (
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#B5ADA5" }}>
          Loading…
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {posts.map((post, index) => (
          <div key={post.id}>
            {index > 0 && (
              <div
                style={{
                  height: 1,
                  backgroundColor: "#F0EBE6",
                  marginBottom: 12,
                }}
              />
            )}
            <div
              className="flex items-center gap-3"
              onClick={() => post.postUrl && window.open(post.postUrl, "_blank")}
              style={{ cursor: post.postUrl ? "pointer" : "default" }}
            >
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
                {index + 1}
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
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                {/* Platform icon */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 4,
                    right: 4,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: post.platform === "Instagram" ? "#E4405F" : "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  {post.platform === "Instagram" ? (
                    <Instagram size={10} color="#FFFFFF" />
                  ) : (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  )}
                </div>
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
                  {post.alignment != null ? `${Number(post.alignment).toFixed(0)}%` : "—"}
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
                  {post.engagement != null ? `${Number(post.engagement).toFixed(1)}%` : "—"}
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