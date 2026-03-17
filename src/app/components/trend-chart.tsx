export function TrendChart() {
  const lines = [
    { name: "Rhode", color: "var(--accent-primary)", width: 3, path: "M0,160 C40,140 80,120 120,130 C160,140 200,100 240,90 C280,80 320,70 360,60 C400,65 440,50 480,55 C520,45 560,40 600,35" },
    { name: "Summer Fridays", color: "#9CA6D8", width: 1.5, path: "M0,140 C40,135 80,145 120,140 C160,130 200,125 240,120 C280,115 320,110 360,115 C400,108 440,100 480,95 C520,90 560,85 600,80" },
    { name: "Glossier", color: "#DAC58C", width: 1.5, path: "M0,100 C40,105 80,98 120,95 C160,100 200,90 240,85 C280,90 320,80 360,75 C400,80 440,70 480,68 C520,65 560,60 600,55" },
    { name: "Clinique", color: "#ACBDA7", width: 1.5, path: "M0,170 C40,165 80,160 120,158 C160,155 200,150 240,148 C280,145 320,140 360,142 C400,138 440,135 480,130 C520,128 560,125 600,120" },
    { name: "Laneige", color: "#C66F80", width: 1.5, path: "M0,130 C40,128 80,125 120,120 C160,118 200,115 240,110 C280,108 320,105 360,100 C400,98 440,95 480,90 C520,88 560,85 600,82" },
  ];

  return (
    <div
      className="relative"
      style={{
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: 20,
        border: "1px solid var(--border-subtle)",
        width: "100%",
        maxWidth: 700,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div className="flex items-center gap-2">
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "var(--dim-I1)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Imprinted in AI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 12 L6 4 L10 8 L14 2" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="6" width="3" height="8" rx="1" fill="var(--text-muted)" />
            <rect x="7" y="3" width="3" height="11" rx="1" fill="var(--text-muted)" />
            <rect x="12" y="1" width="3" height="13" rx="1" fill="var(--text-muted)" />
          </svg>
        </div>
      </div>

      {/* Chart area */}
      <div
        style={{
          backgroundColor: "var(--bg-surface)",
          borderRadius: "var(--radius-sm)",
          padding: 12,
          border: "1px solid var(--border-subtle)",
        }}
      >
        <svg
          width="100%"
          height="220"
          viewBox="0 0 600 200"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          {/* Grid lines */}
          {[0, 50, 100, 150, 200].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="600"
              y2={y}
              stroke="var(--border-subtle)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}
          {/* Lines */}
          {lines.map((line, i) => (
            <path
              key={i}
              d={line.path}
              fill="none"
              stroke={line.color}
              strokeWidth={line.width}
              strokeLinecap="round"
              opacity={i === 0 ? 1 : 0.7}
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap" style={{ marginTop: 16 }}>
        {lines.map((line) => (
          <div
            key={line.name}
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-secondary)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: line.color,
              }}
            />
            <span style={{ fontWeight: line.name === "Rhode" ? 700 : 400 }}>
              {line.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}