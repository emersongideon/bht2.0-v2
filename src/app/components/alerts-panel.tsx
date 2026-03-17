const alerts = [
  {
    severity: "var(--color-negative)",
    dotColor: "var(--dim-C1)",
    dimension: "Capturing Attention",
    text: "Share of Search ▼ 8%",
    time: "2 hours ago",
  },
  {
    severity: "var(--color-positive)",
    dotColor: "var(--dim-I1)",
    dimension: "Imprinted in AI",
    text: "LLM Consistency ▲ 5 pts",
    time: "Yesterday",
  },
  {
    severity: "var(--color-neutral)",
    dotColor: "var(--dim-O)",
    dimension: "Openly Adored",
    text: "Sentiment shifted +6%",
    time: "Today",
  },
  {
    severity: "var(--color-negative)",
    dotColor: "var(--dim-C2)",
    dimension: "Chosen for a Reason",
    text: "Value share ▼ 5%",
    time: "3 hours ago",
  },
  {
    severity: "var(--color-positive)",
    dotColor: "var(--dim-N)",
    dimension: "Never Lost",
    text: "Alignment improved ▲ 4 pts",
    time: "2 days ago",
  },
];

export function AlertsPanel() {
  return (
    <div
      className="relative"
      style={{
        width: 280,
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Alerts
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--accent-primary)",
            cursor: "pointer",
          }}
        >
          See all →
        </span>
      </div>

      {/* Alert items */}
      {alerts.map((alert, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 relative"
          style={{
            padding: "10px 16px 10px 13px",
            borderLeft: `3px solid ${alert.severity}`,
            minHeight: 60,
            justifyContent: "center",
            borderBottom: i < alerts.length - 1 ? "1px solid var(--border-subtle)" : "none",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: alert.dotColor,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {alert.dimension}
            </span>
          </div>
          <div className="flex items-center justify-between" style={{ paddingLeft: 14 }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--text-secondary)",
              }}
            >
              {alert.text}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {alert.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}