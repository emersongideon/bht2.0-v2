export function IconicScoreRing({ height }: { height?: number }) {
  const score = 76;
  const circumference = 2 * Math.PI * 52; // radius 52
  const progress = (score / 100) * circumference;

  return (
    <div
      className="flex flex-col items-center justify-center relative"
      style={{
        width: 180,
        height: height ?? "auto",
        backgroundColor: "var(--bg-card)",
        backdropFilter: "blur(var(--blur-glass))",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: 20,
        border: "1px solid var(--border-subtle)",
        gap: 8,
      }}
    >
      {/* "HOW ICONIC IS YOUR BRAND?" label */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: 2,
          textAlign: "center",
        }}
      >
        HOW ICONIC IS YOUR BRAND?
      </span>

      {/* Ring */}
      <div className="relative" style={{ width: 120, height: 120, flexShrink: 0 }}>
        {/* Glow background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "var(--accent-primary)",
            filter: "blur(60px)",
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: "relative", zIndex: 1 }}>
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
          {/* Background track */}
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-color)" strokeWidth="8" />
          {/* Progress */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference - progress}`}
            strokeDashoffset={circumference * 0.25}
            transform="rotate(-90 60 60)"
          />
        </svg>
        {/* Center score */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 48,
            fontWeight: 700,
            color: "var(--text-primary)",
            zIndex: 2,
          }}
        >
          {score}
        </div>
      </div>

      {/* "out of 100" */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 10,
          color: "var(--text-muted)",
        }}
      >
        out of 100
      </span>

      {/* "ICONIC" label */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        ICONIC
      </span>

      {/* Delta pill */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "3px 10px",
          borderRadius: "var(--radius-pill)",
          backgroundColor: "rgba(74, 102, 68, 0.10)",
          color: "var(--color-positive)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        ▲ 2.1
      </span>
    </div>
  );
}