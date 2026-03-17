export interface SubMetricData {
  name: string;
  score: number;
  delta: number;
  source: "LLM" | "Search" | "Social";
  flex?: boolean;
}

export function SubMetricCard({
  name = "LLM Consistency",
  score = 82,
  delta = 3.4,
  source = "LLM",
  flex = false,
}: Partial<SubMetricData>) {
  const isPositive = delta > 0;
  const isNeutral = delta === 0;

  const sparkPath = "M0,18 C8,14 16,16 24,12 C32,8 40,14 48,10 C56,6 64,12 72,8 C80,4 88,10 96,6";

  return (
    <div
      className="relative"
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: `blur(var(--blur-glass))`,
        WebkitBackdropFilter: `blur(var(--blur-glass))`,
        borderRadius: "var(--radius-sm)",
        padding: 16,
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minWidth: flex ? 0 : 180,
        flex: flex ? 1 : undefined,
      }}
    >
      {/* Name */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        {name}
      </span>

      {/* Score + delta row */}
      <div className="flex items-center gap-3">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {score}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            padding: "2px 8px",
            borderRadius: "var(--radius-pill)",
            backgroundColor: isNeutral
              ? "rgba(218,197,140,0.10)"
              : isPositive
              ? "rgba(74, 102, 68, 0.10)"
              : "rgba(184, 106, 84, 0.10)",
            color: isNeutral
              ? "var(--color-neutral)"
              : isPositive
              ? "var(--color-positive)"
              : "var(--color-negative)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {isNeutral ? "—" : isPositive ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}
        </span>
      </div>

      {/* Sparkline */}
      <svg width="100%" height="24" viewBox="0 0 96 24" preserveAspectRatio="none">
        <path d={sparkPath} fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Source badge — subtle light bg, muted text */}
      <span
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "2px 10px",
          borderRadius: "var(--radius-pill)",
          backgroundColor: "var(--bg-surface)",
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--text-secondary)",
        }}
      >
        {source}
      </span>
    </div>
  );
}