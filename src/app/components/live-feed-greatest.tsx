import { Instagram } from "lucide-react";

const socialPosts = [
  {
    platform: "Instagram",
    handle: "@rhode",
    caption: "The peptide lip treatment that broke the internet — now in 3 new shades 💋",
    engagementRate: "8.4%",
    bgTone: "#F8F6F3",
  },
  {
    platform: "TikTok",
    handle: "@rhode",
    caption: "POV: your morning skincare routine with Rhode glazing milk ✨",
    engagementRate: "12.1%",
    bgTone: "#F5F3F0",
  },
  {
    platform: "Instagram",
    handle: "@rhode",
    caption: "Behind the scenes at our NYC pop-up — thank you to everyone who came 🤍",
    engagementRate: "6.7%",
    bgTone: "#FAF8F5",
  },
  {
    platform: "TikTok",
    handle: "@skincarebyhyram",
    caption: "Ranking every Rhode product from good to OBSESSED",
    engagementRate: "9.3%",
    bgTone: "#F6F4F1",
  },
  {
    platform: "Instagram",
    handle: "@rhode",
    caption: "Rhode x Krispy Kreme strawberry glaze drop — link in bio",
    engagementRate: "11.2%",
    bgTone: "#F9F7F4",
  },
];

export function LiveFeedGreatest() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
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

      {/* Social posts - scrollable */}
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
        {socialPosts.map((post, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 12,
              backgroundColor: "color-mix(in srgb, var(--bg-surface) 40%, transparent)",
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
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
                backgroundColor: post.bgTone,
              }}
            >
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

            {/* Caption */}
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
                }}
              >
                {post.platform} · {post.handle}
              </div>
            </div>

            {/* Engagement */}
            <div style={{ textAlign: "right", flexShrink: 0, width: 70 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {post.engagementRate}
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
    </div>
  );
}