import { Search, Check } from "lucide-react";

const brands = [
  { name: "Rhode", score: 76, selected: true },
  { name: "Summer Fridays", score: 72, selected: false },
  { name: "Glossier", score: 81, selected: false },
  { name: "Clinique", score: 74, selected: false },
  { name: "Laneige", score: 78, selected: false },
];

export function BrandPickerDropdown() {
  return (
    <div
      className="relative"
      style={{
        width: "100%",
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08), var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* Search */}
      <div
        className="flex items-center gap-2"
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <Search size={16} style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Search brands..."
          style={{
            background: "none",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            width: "100%",
          }}
        />
      </div>

      {/* Brand rows */}
      {brands.map((b, i) => (
        <div
          key={b.name}
          className="flex items-center justify-between relative"
          style={{
            padding: "10px 16px",
            opacity: b.selected ? 0.5 : 1,
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderBottom: i < brands.length - 1 ? "1px solid var(--border-subtle)" : "none",
          }}
          onMouseEnter={(e) => {
            if (!b.selected) {
              e.currentTarget.style.backgroundColor = "var(--bg-surface)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--text-primary)",
            }}
          >
            {b.name}
          </span>
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              {b.score}
            </span>
            {b.selected && <Check size={14} style={{ color: "var(--accent-primary)" }} />}
          </div>
        </div>
      ))}
    </div>
  );
}