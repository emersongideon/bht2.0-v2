import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { IconicScoreRing } from "../iconic-score-ring";
import { DimensionScoreCard, dimensionVariants } from "../dimension-score-card";
import { AlertsPanel } from "../alerts-panel";
import { LiveFeedLatest } from "../live-feed-latest";
import { LiveFeedGreatest } from "../live-feed-greatest";

const CARD_HEIGHT = 175;
const GAP = 12;
const RING_HEIGHT = CARD_HEIGHT * 2 + GAP;

export function DashboardPage() {
  const [I1, C1, O, N, I2, C2] = dimensionVariants;
  const [selectedDim, setSelectedDim] = useState("I1");

  const topRow = [I1, C1, O];
  const bottomRow = [N, I2, C2];
  const selectedData = dimensionVariants.find((d) => d.dimKey === selectedDim) || I1;

  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        minHeight: "100%",
        width: "100%",
        gap: GAP,
      }}
    >
      {/* Row 1 — Top bar */}
      <div className="flex items-center justify-between" style={{ flexShrink: 0 }}>
        <CategoryBrandSelector />
        <DateModeSelector />
      </div>

      {/* Rows 2-3: ICONIC Ring + 6 Dimension Cards */}
      <div className="flex" style={{ gap: GAP, flexShrink: 0 }}>
        {/* ICONIC Ring — spans both rows */}
        <div style={{ width: 180, flexShrink: 0, height: RING_HEIGHT }}>
          <IconicScoreRing height={RING_HEIGHT} />
        </div>

        {/* Dimension cards grid */}
        <div className="flex flex-col" style={{ flex: 1, minWidth: 0, gap: GAP }}>
          {/* Top row */}
          <div className="flex" style={{ gap: GAP, height: CARD_HEIGHT }}>
            {topRow.map((dim) => (
              <DimensionScoreCard
                key={dim.dimKey}
                {...dim}
                selected={selectedDim === dim.dimKey}
                flex
                fixedHeight={CARD_HEIGHT}
                showConnector={selectedDim === dim.dimKey}
                onClick={() => setSelectedDim(dim.dimKey)}
              />
            ))}
          </div>
          {/* Bottom row */}
          <div className="flex" style={{ gap: GAP, height: CARD_HEIGHT }}>
            {bottomRow.map((dim) => (
              <DimensionScoreCard
                key={dim.dimKey}
                {...dim}
                selected={selectedDim === dim.dimKey}
                flex
                fixedHeight={CARD_HEIGHT}
                showConnector={selectedDim === dim.dimKey}
                onClick={() => setSelectedDim(dim.dimKey)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Row 4 — Trend chart + Alerts */}
      <div className="flex" style={{ gap: GAP, height: 340 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <TrendChartFull selectedDim={selectedData} />
        </div>
        <div style={{ width: 280, flexShrink: 0 }}>
          <AlertsPanel />
        </div>
      </div>

      {/* Row 5 — Live Feed Section */}
      <div className="flex" style={{ gap: GAP, height: 380 }}>
        <div style={{ flex: 1.1, minWidth: 0 }}>
          <LiveFeedLatest />
        </div>
        <div style={{ flex: 0.9, minWidth: 0 }}>
          <LiveFeedGreatest />
        </div>
      </div>
    </div>
  );
}

/** Full-height trend chart that updates based on selected dimension */
function TrendChartFull({ selectedDim }: { selectedDim: { name: string; color: string; dimKey: string } }) {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  
  const lines = [
    { name: "Rhode", color: "#B86A54", width: 2.5, path: "M0,160 C40,140 80,120 120,130 C160,140 200,100 240,90 C280,80 320,70 360,60 C400,65 440,50 480,55 C520,45 560,40 600,35" },
    { name: "Summer Fridays", color: "#374762", width: 1.5, path: "M0,140 C40,135 80,145 120,140 C160,130 200,125 240,120 C280,115 320,110 360,115 C400,108 440,100 480,95 C520,90 560,85 600,80" },
    { name: "Glossier", color: "#DAC58C", width: 1.5, path: "M0,100 C40,105 80,98 120,95 C160,100 200,90 240,85 C280,90 320,80 360,75 C400,80 440,70 480,68 C520,65 560,60 600,55" },
    { name: "Clinique", color: "#ACBDA7", width: 1.5, path: "M0,170 C40,165 80,160 120,158 C160,155 200,150 240,148 C280,145 320,140 360,142 C400,138 440,135 480,130 C520,128 560,125 600,120" },
    { name: "Laneige", color: "#6B241E", width: 1.5, path: "M0,130 C40,128 80,125 120,120 C160,118 200,115 240,110 C280,108 320,105 360,100 C400,98 440,95 480,90 C520,88 560,85 600,82" },
  ];

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: 20,
        border: "1px solid var(--border-subtle)",
        height: "100%",
      }}
    >
      {/* Caption: "Showing: DimensionName" */}
      <div
        className="flex items-center gap-2"
        style={{
          marginBottom: 4,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          Showing:
        </span>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: selectedDim.color,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "var(--text-secondary)",
            fontWeight: 600,
          }}
        >
          {selectedDim.name}
        </span>
      </div>

      {/* Header: brand legend */}
      <div className="flex items-center justify-between" style={{ marginBottom: 12, flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          {lines.map((line, i) => (
            <div key={line.name} className="flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: i === 0 ? selectedDim.color : line.color }} />
              <span style={{ fontWeight: line.name === "Rhode" ? 700 : 400 }}>{line.name}</span>
            </div>
          ))}
        </div>
        
        {/* Navigation icon to deep dive */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => navigate(`/deep-dive/${selectedDim.dimKey}`)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <ArrowRight size={16} color="var(--text-secondary)" />
          </button>
          
          {/* Tooltip */}
          {showTooltip && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: 4,
                backgroundColor: "var(--text-primary)",
                color: "#FFFFFF",
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 12,
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
                zIndex: 1000,
                boxShadow: "var(--shadow-lg)",
              }}
            >
              Go to "{selectedDim.name}" deep dive
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet">
          {[0, 50, 100, 150, 200].map((y) => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" />
          ))}
          {lines.map((line, i) => (
            <path
              key={i}
              d={line.path}
              fill="none"
              stroke={i === 0 ? selectedDim.color : line.color}
              strokeWidth={i === 0 ? 2.5 : line.width}
              strokeLinecap="round"
              opacity={i === 0 ? 1 : 0.8}
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap" style={{ marginTop: 12, flexShrink: 0 }}>
        {lines.map((line, i) => (
          <div key={line.name} className="flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: i === 0 ? selectedDim.color : line.color }} />
            <span style={{ fontWeight: line.name === "Rhode" ? 700 : 400 }}>{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}