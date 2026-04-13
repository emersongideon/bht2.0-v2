import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useBrand } from "../contexts/brand-context";

interface SocialPost {
  id: number;
  brand: string;
  platform: string;
  handle: string;
  caption: string;
  engagementRate: number;
  postUrl: string | null;
  imageUrl: string | null;
}

function getPlatform(post: { social_platform: string; social_post_url: string | null }): string {
  const url = post.social_post_url ?? "";
  if (url.includes("tiktok.com")) return "TikTok";
  if (url.includes("instagram.com")) return "Instagram";
  return post.social_platform;
}

function isVideo(url: string | null): boolean {
  if (!url) return false;
  return url.includes(".mp4") || url.includes(".webm") || url.includes(".mov");
}

export function LiveFeedGreatest() {
  const { selectedBrands } = useBrand();
  const [posts, setPosts] = useState<SocialPost[]>([]);

  useEffect(() => {
    setPosts([]);
    if (!selectedBrands.length) return;
    async function load() {
      const { data } = await supabase
        .from("iconic_social_feed")
        .select("id, brand_name, social_platform, social_handle, social_caption, social_engagement_rate, social_post_url, social_image_url")
        .in("brand_name", selectedBrands)
        .order("social_engagement_rate", { ascending: false })
        .limit(8);

      if (!data?.length) return;

      setPosts(
        data.map((row) => ({
          id:             row.id,
          brand:          row.brand_name,
          platform:       getPlatform(row),
          handle:         row.social_handle,
          caption:        row.social_caption,
          engagementRate: row.social_engagement_rate,
          postUrl:        row.social_post_url,
          imageUrl:       row.social_image_url ?? null,
        }))
      );
    }
    load();
  }, [selectedBrands]);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: 20,
        border: "1px solid var(--border-subtle)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16, flexShrink: 0 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            color: "var(--text-primary)",
            marginBottom: 4,
          }}
        >
          The Greatest
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          Top performing social posts this period
        </p>
      </div>

      {/* Social posts */}
      {posts.length === 0 ? (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
            paddingTop: 8,
          }}
        >
          No social posts found.
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            paddingRight: 4,
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => post.postUrl && window.open(post.postUrl, "_blank")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 12,
                backgroundColor: "color-mix(in srgb, var(--bg-surface) 40%, transparent)",
                borderRadius: "var(--radius-md)",
                cursor: post.postUrl ? "pointer" : "default",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Thumbnail with platform icon */}
              <div
                style={{
                  position: "relative",
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-surface)",
                  overflow: "hidden",
                }}
              >
                {post.imageUrl && (
                  isVideo(post.imageUrl) ? (
                    <video
                      src={post.imageUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <img
                      src={post.imageUrl}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )
                )}
                {/* Platform icon overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 4,
                    right: 4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: post.platform === "Instagram" ? "#E4405F" : "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                >
                  {post.platform === "Instagram" ? (
                    <Instagram size={12} color="#FFFFFF" />
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Caption + brand */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                    marginBottom: 4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.caption}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 10,
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span>{post.platform} · {post.handle}</span>
                  {selectedBrands.length > 1 && (
                    <span
                      style={{
                        padding: "1px 6px",
                        borderRadius: "var(--radius-pill)",
                        backgroundColor: "color-mix(in srgb, var(--accent-primary) 12%, transparent)",
                        color: "var(--accent-primary)",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {post.brand}
                    </span>
                  )}
                </div>
              </div>

              {/* Engagement rate */}
              <div style={{ textAlign: "right", flexShrink: 0, width: 70 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  {post.engagementRate.toFixed(1)}%
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 9,
                    color: "var(--text-muted)",
                  }}
                >
                  Eng. Rate
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
