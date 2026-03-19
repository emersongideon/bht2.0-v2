import { Check } from "lucide-react";

const categories = [
  { name: "Beauty", count: "5 brands", active: true, comingSoon: false },
  { name: "Fashion", count: "", active: false, comingSoon: true },
  { name: "Personal Care", count: "", active: false, comingSoon: true },
];

export function CategoryDropdown() {
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
      {categories.map((c, i) => (
        <div
          key={c.name}
          className="flex items-center justify-between relative"
          style={{
            padding: "12px 16px",
            opacity: c.comingSoon ? 0.4 : 1,
            cursor: c.comingSoon ? "default" : "pointer",
            transition: "all 0.2s ease",
            borderBottom: i < categories.length - 1 ? "1px solid var(--border-subtle)" : "none",
          }}
          onMouseEnter={(e) => {
            if (!c.comingSoon) {
              e.currentTarget.style.backgroundColor = "var(--bg-surface)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--text-primary)",
                fontStyle: c.comingSoon ? "italic" : "normal",
              }}
            >
              {c.name}
              {c.count && (
                <span style={{ color: "var(--text-muted)", marginLeft: 6 }}>({c.count})</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {c.comingSoon && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                }}
              >
                coming soon
              </span>
            )}
            {c.active && <Check size={14} style={{ color: "var(--accent-primary)" }} />}
          </div>
        </div>
      ))}
    </div>
  );
}