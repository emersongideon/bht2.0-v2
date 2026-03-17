import { CategoryDropdown } from "../category-dropdown";
import { BrandPickerDropdown } from "../brand-picker-dropdown";

export function OverlaysPage() {
  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        minHeight: 900,
        width: "100%",
        gap: 32,
        overflow: "auto",
      }}
    >
      {/* Section title */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 700,
          color: "var(--text-primary)",
        }}
      >
        Overlays & Theme Previews
      </span>

      {/* Overlay frames */}
      <div className="flex flex-col gap-4">
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Dropdown Overlays
        </span>

        <div className="flex gap-6 flex-wrap">
          {/* Category Dropdown */}
          <div className="flex flex-col gap-2">
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--text-muted)",
              }}
            >
              Category Dropdown
            </span>
            <CategoryDropdown />
          </div>

          {/* Brand Picker Dropdown */}
          <div className="flex flex-col gap-2">
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "var(--text-muted)",
              }}
            >
              Brand Picker Dropdown
            </span>
            <BrandPickerDropdown />
          </div>
        </div>
      </div>

      {/* Theme Comparison */}
      <div className="flex flex-col gap-4">
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Theme Comparison
        </span>

        <div className="flex gap-4 flex-wrap">
          <ThemePreview
            name="Dusk"
            bg="#FAF7F4"
            card="#FFFFFF"
            accent="#B86A54"
            accentSecondary="#DAC58C"
            textPrimary="#2D2420"
            textMuted="#B5ADA5"
            border="rgba(63, 20, 17, 0.08)"
            borderSubtle="rgba(63, 20, 17, 0.08)"
            surface="#F5F0EB"
            positive="#4A6644"
          />
          <ThemePreview
            name="Linen"
            bg="#FDFBF9"
            card="#FFFFFF"
            accent="#DD9F86"
            accentSecondary="#A6C2DB"
            textPrimary="#463027"
            textMuted="#C4BBB5"
            border="rgba(70, 48, 39, 0.06)"
            borderSubtle="rgba(70, 48, 39, 0.06)"
            surface="#F7F3EF"
            positive="#4A6644"
          />
          <ThemePreview
            name="Blush"
            bg="#FBF8F6"
            card="#FFFFFF"
            accent="#CE6539"
            accentSecondary="#9CA6D8"
            textPrimary="#3A2E28"
            textMuted="#B8AFA7"
            border="rgba(206, 101, 57, 0.06)"
            borderSubtle="rgba(206, 101, 57, 0.06)"
            surface="#F5F1ED"
            positive="#86843B"
          />
        </div>
      </div>
    </div>
  );
}

function ThemePreview({
  name,
  bg,
  card,
  accent,
  accentSecondary,
  textPrimary,
  textMuted,
  border,
  borderSubtle,
  surface,
  positive,
}: {
  name: string;
  bg: string;
  card: string;
  accent: string;
  accentSecondary: string;
  textPrimary: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  surface: string;
  positive: string;
}) {
  const score = 76;
  const circumference = 2 * Math.PI * 34;
  const progress = (score / 100) * circumference;
  const gradientId = `grad-${name}`;

  const dimCards = [
    { letter: "I", name: "Imprinted in AI", score: 74, delta: 2.8, color: name === "Dusk" ? "#374762" : name === "Linen" ? "#A6C2DB" : "#9CA6D8" },
    { letter: "C", name: "Capturing Attention", score: 82, delta: 3.1, color: name === "Dusk" ? "#DAC58C" : name === "Linen" ? "#DD9F86" : "#CE6539" },
    { letter: "O", name: "Openly Adored", score: 85, delta: 1.6, color: name === "Dusk" ? "#B86A54" : name === "Linen" ? "#463027" : "#CF9691" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* Theme label */}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        {name}
      </span>

      {/* Frame */}
      <div
        style={{
          width: 480,
          height: 360,
          backgroundColor: bg,
          borderRadius: 14,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: `1px solid ${border}`,
          overflow: "hidden",
        }}
      >
        {/* Title */}
        <span
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 20,
            fontWeight: 700,
            color: accent,
          }}
        >
          ICONIC Brand Health
        </span>

        {/* Ring + Cards row */}
        <div className="flex gap-3" style={{ flex: 1, minHeight: 0 }}>
          {/* Mini ring */}
          <div
            className="flex flex-col items-center justify-center gap-1"
            style={{
              width: 120,
              flexShrink: 0,
              backgroundColor: card,
              borderRadius: 10,
              padding: 12,
              border: `1px solid ${borderSubtle}`,
            }}
          >
            <div className="relative" style={{ width: 76, height: 76 }}>
              <svg width="76" height="76" viewBox="0 0 76 76">
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={accent} />
                    <stop offset="100%" stopColor={accentSecondary} />
                  </linearGradient>
                </defs>
                <circle cx="38" cy="38" r="34" fill="none" stroke={border} strokeWidth="5" />
                <circle
                  cx="38"
                  cy="38"
                  r="34"
                  fill="none"
                  stroke={`url(#${gradientId})`}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${progress} ${circumference - progress}`}
                  strokeDashoffset={circumference * 0.25}
                  transform="rotate(-90 38 38)"
                />
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 28,
                  fontWeight: 700,
                  color: textPrimary,
                }}
              >
                {score}
              </div>
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                color: textMuted,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              ICONIC
            </span>
            <span
              style={{
                display: "inline-flex",
                padding: "2px 8px",
                borderRadius: 9999,
                backgroundColor: `${positive}1A`,
                color: positive,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              ▲ 2.1
            </span>
          </div>

          {/* 3 dimension cards */}
          <div className="flex flex-col gap-2" style={{ flex: 1, minWidth: 0 }}>
            {dimCards.map((d) => (
              <div
                key={d.letter + d.name}
                style={{
                  flex: 1,
                  backgroundColor: card,
                  borderRadius: 8,
                  padding: "8px 12px",
                  border: `1px solid ${borderSubtle}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: d.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: 13,
                      color: d.color,
                      fontWeight: 700,
                    }}
                  >
                    {d.letter}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      color: textMuted,
                    }}
                  >
                    {d.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 20,
                      fontWeight: 700,
                      color: textPrimary,
                    }}
                  >
                    {d.score}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 2,
                      padding: "1px 6px",
                      borderRadius: 9999,
                      backgroundColor: `${positive}1A`,
                      color: positive,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  >
                    ▲ {d.delta.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
