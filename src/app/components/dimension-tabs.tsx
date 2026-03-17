import { useNavigate } from "react-router";
import { useDimensions } from "../data/use-dimensions";

export function DimensionTabs({ activeKey }: { activeKey: string }) {
  const navigate = useNavigate();
  const { dimensions, loading } = useDimensions();

  // Skeleton while loading
  if (loading) {
    return (
      <div
        className="flex items-center gap-0"
        style={{ borderBottom: "1px solid var(--border-subtle)" }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              width: 140,
              height: 38,
              margin: "0 2px",
              borderRadius: 4,
              backgroundColor: "var(--bg-surface)",
              opacity: 0.4,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-0"
      style={{
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {dimensions.map((dim) => {
        const isActive = activeKey === dim.page_key;
        return (
          <button
            key={dim.page_key}
            onClick={() => navigate(`/deep-dive/${dim.page_key}`)}
            className="flex items-center gap-2 relative"
            style={{
              padding: "10px 16px",
              border: "none",
              borderBottom: isActive
                ? `2px solid ${dim.colorVar}`
                : "2px solid transparent",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: isActive ? "var(--text-primary)" : "var(--text-muted)",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: dim.colorVar,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                color: isActive ? dim.colorVar : "var(--text-muted)",
              }}
            >
              {dim.page_letter}
            </span>
            <span>{dim.page_name}</span>
          </button>
        );
      })}
    </div>
  );
}
