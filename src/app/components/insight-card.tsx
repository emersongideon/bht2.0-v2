export interface InsightData {
  body: string;
  layer: "Predictive" | "Cultural Pulse";
}

export function InsightCard({
  body = "Rhode's AI imprint score rose 2.8 pts this month, driven by consistent LLM recommendations in skincare routines. This positions the brand ahead of competitors in AI-mediated discovery.",
  layer = "Predictive",
  fillHeight = false,
}: Partial<InsightData> & { fillHeight?: boolean }) {
  const dotColor = layer === "Predictive" ? "var(--color-positive)" : "#9F7AEA";

  return (
    <div
      className="relative"
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-sm)",
        borderLeft: "3px solid var(--accent-primary)",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: fillHeight ? undefined : 400,
        height: fillHeight ? "100%" : undefined,
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Header */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        Insight
      </span>

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {body}
      </p>

      {/* Layer */}
      <div className="flex items-center gap-2">
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: dotColor,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--text-muted)",
          }}
        >
          Layer: {layer}
        </span>
      </div>
    </div>
  );
}