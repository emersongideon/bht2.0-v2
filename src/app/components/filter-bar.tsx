import { useState } from "react";
import { ChevronDown } from "lucide-react";

const filters = ["All", "Critical", "Positive", "Notable"];

export function FilterBar() {
  const [active, setActive] = useState("All");

  return (
    <div className="flex items-center gap-3">
      {/* Segmented control */}
      <div
        className="flex items-center"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderRadius: "var(--radius-pill)",
          padding: 3,
          border: "1px solid var(--border-subtle)",
        }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-pill)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: active === f ? 600 : 400,
              backgroundColor: active === f ? "var(--bg-card-hover)" : "transparent",
              color: active === f ? "var(--text-primary)" : "var(--text-muted)",
              transition: "all 0.2s ease",
              boxShadow: active === f ? "var(--shadow-card)" : "none",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Dimension dropdown pill */}
      <button
        className="flex items-center gap-2"
        style={{
          padding: "6px 14px",
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--border-color)",
          backgroundColor: "var(--bg-card)",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          color: "var(--text-secondary)",
        }}
      >
        All Dimensions
        <ChevronDown size={14} />
      </button>
    </div>
  );
}