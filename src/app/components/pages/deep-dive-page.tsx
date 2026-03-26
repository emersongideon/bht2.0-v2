import { useParams, Navigate } from "react-router";
import { DimensionTabs } from "../dimension-tabs";
import { SubMetricCard } from "../sub-metric-card";
import { InsightCard } from "../insight-card";
import { getDimensionConfig, type DimensionConfig } from "../deep-dive-data";
import { DeepDiveC1Page } from "./deep-dive-c1-page";
import { DeepDiveI1Page } from "./deep-dive-i1-page";
import { DeepDiveNPage } from "./deep-dive-n-page";
import { DeepDiveC2Page } from "./deep-dive-c2-page";
import { DeepDiveOPage } from "./deep-dive-o-page";
import { DeepDiveI2Page } from "./deep-dive-i2-page";

export function DeepDivePage() {
  const { dimensionKey } = useParams();
  const key = dimensionKey || "I1";
  const config = getDimensionConfig(key);

  if (!config) {
    return <Navigate to="/deep-dive/I1" replace />;
  }

  // Use special pages for specific dimensions
  if (key === "C1") {
    return <DeepDiveC1Page />;
  }
  
  if (key === "I1") {
    return <DeepDiveI1Page />;
  }
  
  if (key === "N") {
    return <DeepDiveNPage />;
  }
  
  if (key === "C2") {
    return <DeepDiveC2Page />;
  }
  
  if (key === "O") {
    return <DeepDiveOPage />;
  }
  
  if (key === "I2") {
    return <DeepDiveI2Page />;
  }

  return <DeepDiveContent key={key} config={config} />;
}

function DeepDiveContent({ config }: { config: DimensionConfig }) {
  const isPositive = config.delta >= 0;

  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        height: 900,
        width: "100%",
        gap: 12,
        overflow: "hidden",
      }}
    >
      {/* Row 2 — Dimension Tabs */}
      <div style={{ flexShrink: 0 }}>
        <DimensionTabs activeKey={config.key} />
      </div>

      {/* Row 3 — Dimension Header */}
      <div
        style={{
          flexShrink: 0,
          backgroundColor: "var(--bg-card)",
          backdropFilter: "blur(var(--blur-glass))",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-card)",
          border: "1px solid var(--border-subtle)",
          padding: "16px 20px",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: config.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              <span style={{ color: config.color }}>{config.letter}</span> — {config.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--text-muted)",
              }}
            >
              Score:
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 28,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {config.score}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                padding: "3px 10px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: isPositive
                  ? "rgba(74, 102, 68, 0.10)"
                  : "rgba(184, 106, 84, 0.10)",
                color: isPositive ? "var(--color-positive)" : "var(--color-negative)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {isPositive ? "▲" : "▼"} {Math.abs(config.delta).toFixed(1)}
            </span>
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontStyle: "italic",
            color: "var(--text-muted)",
            margin: "8px 0 0 23px",
          }}
        >
          {config.description}
        </p>
      </div>

      {/* Row 4 — Sub-metric cards */}
      <div className="flex gap-3" style={{ flexShrink: 0 }}>
        {config.subMetrics.map((m) => (
          <SubMetricCard
            key={m.name}
            name={m.name}
            score={m.score}
            delta={m.delta}
            source={m.source}
            flex
          />
        ))}
      </div>

      {/* Row 5 — Trend detail chart */}
      <div style={{ flexShrink: 0 }}>
        <DimensionTrendChart lines={config.trendLines} dimensionName={config.name} dimensionColor={config.color} />
      </div>

      {/* Row 6 — Bottom row: Radar + Insight */}
      <div className="flex gap-3" style={{ flex: 1, minHeight: 0 }}>
        <div style={{ flex: 3, minWidth: 0 }}>
          <CompetitorRadar
            axes={config.radarAxes}
            brands={config.radarBrands}
          />
        </div>
        <div style={{ flex: 2, minWidth: 0 }}>
          <InsightCard
            body={config.insight.body}
            layer={config.insight.layer}
            fillHeight
          />
        </div>
      </div>
    </div>
  );
}

function DimensionTrendChart({
  lines,
  dimensionName,
  dimensionColor,
}: {
  lines: { name: string; color: string; width: number; path: string }[];
  dimensionName: string;
  dimensionColor: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: "16px 20px",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Chart title */}
      <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: dimensionColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Brand Comparison — {dimensionName}
        </span>
      </div>
      
      <svg width="100%" height="140" viewBox="0 0 600 160" preserveAspectRatio="none">
        {[0, 40, 80, 120, 160].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="600"
            y2={y}
            stroke="var(--border-subtle)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
        {lines.map((line, i) => (
          <path
            key={i}
            d={line.path}
            fill="none"
            stroke={line.color}
            strokeWidth={line.width}
            strokeLinecap="round"
            opacity={i === 0 ? 1 : 0.8}
          />
        ))}
      </svg>
      <div className="flex items-center gap-5 flex-wrap" style={{ marginTop: 10 }}>
        {lines.map((l) => (
          <div
            key={l.name}
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-secondary)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: l.color,
              }}
            />
            <span style={{ fontWeight: l.name === "Rhode" ? 700 : 400 }}>{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetitorRadar({
  axes,
  brands,
}: {
  axes: string[];
  brands: { name: string; color: string; values: number[] }[];
}) {
  const cx = 160,
    cy = 130,
    r = 100;
  const count = axes.length;

  function getPoint(angle: number, radius: number) {
    const a = (angle - 90) * (Math.PI / 180);
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
  }

  const axisAngles = axes.map((_, i) => (360 / count) * i);
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: "16px 20px",
        border: "1px solid var(--border-subtle)",
        height: "100%",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: 8,
        }}
      >
        Competitor Comparison
      </span>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="320" height="260" viewBox="0 0 320 260">
          {/* Grid polygons */}
          {rings.map((s) => {
            const pts = axisAngles.map((a) => getPoint(a, r * s));
            return (
              <polygon
                key={s}
                points={pts.map((p) => p.join(",")).join(" ")}
                fill="none"
                stroke="var(--border-subtle)"
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
                stroke="var(--border-subtle)"
                strokeWidth="1"
              />
            );
          })}

          {/* Axis labels */}
          {axisAngles.map((a, i) => {
            const [x, y] = getPoint(a, r + 18);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--text-muted)"
                fontFamily="var(--font-body)"
                fontSize="10"
              >
                {axes[i]}
              </text>
            );
          })}

          {/* Brand polygons */}
          {brands.map((brand, bi) => {
            const pts = brand.values.map((v, i) =>
              getPoint(axisAngles[i], r * v)
            );
            return (
              <polygon
                key={bi}
                points={pts.map((p) => p.join(",")).join(" ")}
                fill={brand.color}
                fillOpacity={0.08}
                stroke={brand.color}
                strokeWidth={brand.name === "Rhode" ? 2 : 1}
                strokeOpacity={brand.name === "Rhode" ? 1 : 0.5}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div
        className="flex items-center gap-4 flex-wrap"
        style={{ flexShrink: 0, marginTop: 4 }}
      >
        {brands.map((b) => (
          <div
            key={b.name}
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-secondary)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: b.color,
              }}
            />
            <span style={{ fontWeight: b.name === "Rhode" ? 700 : 400 }}>
              {b.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}