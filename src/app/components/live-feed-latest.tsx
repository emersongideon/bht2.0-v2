import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    category: "Press",
    categoryBg: "var(--accent-primary)",
    headline: "Rhode Skin named in TIME's Most Influential Brands of 2026",
    source: "TIME",
    time: "2 hours ago",
  },
  {
    category: "Industry",
    categoryBg: "#ACBDA7",
    headline: "Clean beauty market projected to reach $22B by 2027",
    source: "Business of Fashion",
    time: "5 hours ago",
  },
  {
    category: "Social",
    categoryBg: "#DAC58C",
    headline: "Hailey Bieber shares new Rhode peptide lip tint on Instagram",
    source: "Instagram",
    time: "8 hours ago",
  },
  {
    category: "Press",
    categoryBg: "var(--accent-primary)",
    headline: "Rhode expands into Southeast Asian markets with Sephora partnership",
    source: "WWD",
    time: "1 day ago",
  },
];

export function LiveFeedLatest() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: 20,
        border: "1px solid var(--border-subtle)",
        height: "100%",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            color: "var(--text-primary)",
            marginBottom: 4,
          }}
        >
          The Latest
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          Recent news and mentions
        </p>
      </div>

      {/* News items */}
      <div>
        {newsItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 0",
              borderBottom: index < newsItems.length - 1 ? "1px solid var(--border-subtle)" : "none",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            {/* Category tag */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                padding: "4px 8px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: `color-mix(in srgb, ${item.categoryBg} 10%, transparent)`,
                color: "var(--text-primary)",
                flexShrink: 0,
              }}
            >
              {item.category}
            </span>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginBottom: 2,
                }}
              >
                {item.headline}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "var(--text-muted)",
                }}
              >
                {item.source} · {item.time}
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
