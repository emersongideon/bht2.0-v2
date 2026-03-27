import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";

interface NewsItem {
  id: number;
  category: string;
  headline: string;
  source: string;
  time: string;
  url: string | null;
}

const tagColorMap: Record<string, string> = {
  Press:    "var(--accent-primary)",
  Industry: "#ACBDA7",
  Social:   "#DAC58C",
};

function formatRelativeTime(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60)  return diffMins <= 1 ? "Just now" : `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)   return `${diffDays} days ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function LiveFeedLatest() {
  const { mainBrand, selectedCategory } = useBrand();
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    setItems([]);
    async function load() {
      const { data } = await supabase
        .from("iconic_news_feed")
        .select("id, news_source_tag, news_headline, news_source_name, news_created_at, news_url")
        .eq("brand_name", mainBrand)
        .eq("category_name", selectedCategory)
        .order("news_created_at", { ascending: false })
        .limit(6);

      if (!data?.length) return;

      setItems(
        data.map((row) => ({
          id:       row.id,
          category: row.news_source_tag,
          headline: row.news_headline,
          source:   row.news_source_name,
          time:     formatRelativeTime(row.news_created_at),
          url:      row.news_url ?? null,
        }))
      );
    }
    load();
  }, [mainBrand, selectedCategory]);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
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
      {items.length === 0 ? (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
            paddingTop: 8,
          }}
        >
          No recent news.
        </div>
      ) : (
        <div>
          {items.map((item, index) => {
            const tagColor = tagColorMap[item.category] ?? "var(--text-muted)";
            return (
              <a
                key={item.id}
                href={item.url ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: index < items.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  cursor: item.url ? "pointer" : "default",
                  transition: "opacity 0.2s",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onMouseEnter={(e) => { if (item.url) e.currentTarget.style.opacity = "0.7"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                {/* Category tag */}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    padding: "4px 8px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: `color-mix(in srgb, ${tagColor} 10%, transparent)`,
                    color: "var(--text-primary)",
                    flexShrink: 0,
                    width: 80,
                    textAlign: "center",
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
                <ArrowRight size={14} color="var(--text-muted)" style={{ flexShrink: 0, opacity: item.url ? 1 : 0.3 }} />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
