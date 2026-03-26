import { useState, useMemo, useCallback } from "react";

type BarItem = { brand: string; score: number | null; color: string };
type SortOrder = "default" | "desc" | "asc";

interface SortableBarChartProps {
  title: string;
  data: BarItem[];
  mainBrand: string;
}

export function SortableBarChart({ title, data, mainBrand }: SortableBarChartProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [visible, setVisible] = useState(true);

  const FADE_OUT_MS = 150;

  const sortedData = useMemo(() => {
    if (sortOrder === "default") return data;
    return [...data].sort((a, b) => {
      if (a.score === null && b.score === null) return 0;
      if (a.score === null) return 1;
      if (b.score === null) return -1;
      return sortOrder === "desc" ? b.score - a.score : a.score - b.score;
    });
  }, [data, sortOrder]);

  const handleSortToggle = useCallback(() => {
    const next: SortOrder =
      sortOrder === "default" ? "desc" :
      sortOrder === "desc" ? "asc" : "default";
    setVisible(false);
    setTimeout(() => {
      setSortOrder(next);
      setVisible(true);
    }, FADE_OUT_MS);
  }, [sortOrder]);

  const sortIcon = sortOrder === "desc" ? "↓" : sortOrder === "asc" ? "↑" : "↕";
  const isActive = sortOrder !== "default";

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Column header with sort toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h4
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 600,
            color: "#7A6F65",
            textTransform: "uppercase",
            letterSpacing: "1px",
            margin: 0,
          }}
        >
          {title}
        </h4>
        <button
          onClick={handleSortToggle}
          title={sortOrder === "default" ? "Sort descending" : sortOrder === "desc" ? "Sort ascending" : "Clear sort"}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: isActive ? "var(--accent-primary)" : "var(--text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0 2px",
            lineHeight: 1,
            userSelect: "none",
            transition: "color 0.15s ease",
          }}
        >
          {sortIcon}
        </button>
      </div>

      {/* Rows with fade animation on reorder */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          opacity: visible ? 1 : 0,
          transition: `opacity ${visible ? "0.2s" : "0.15s"} ease`,
        }}
      >
        {sortedData.map((item) => {
          const isMain = item.brand === mainBrand;
          const barColor = isMain ? "#4A7CC7" : "#C8C2BB";
          return (
          <div key={item.brand} className="flex items-center gap-2">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: barColor,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: isMain ? "#4A7CC7" : "var(--text-primary)",
                width: 100,
                flexShrink: 0,
                fontWeight: isMain ? 700 : 400,
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
                  width: `${((item.score ?? 0) / 100) * 100}%`,
                  backgroundColor: barColor,
                  borderRadius: 7,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: isMain ? "#4A7CC7" : "var(--text-secondary)",
                width: 28,
                textAlign: "right",
                flexShrink: 0,
                fontWeight: isMain ? 700 : 400,
              }}
            >
              {item.score !== null ? item.score : "—"}
            </span>
          </div>
          );
        })}
      </div>
    </div>
  );
}
