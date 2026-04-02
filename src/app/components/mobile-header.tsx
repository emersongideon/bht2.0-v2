import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useBasePath } from "../hooks/use-base-path";

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  dimensionKey?: string; // If provided, shows dimension dropdown instead of title
}

const dimensions = [
  { key: "I1", letter: "I", name: "Imprinted in AI", colorVar: "var(--dim-I1)" },
  { key: "C1", letter: "C", name: "Capturing Attention", colorVar: "var(--dim-C1)" },
  { key: "O", letter: "O", name: "Openly Adored", colorVar: "var(--dim-O)" },
  { key: "N", letter: "N", name: "Never Lost", colorVar: "var(--dim-N)" },
  { key: "I2", letter: "I", name: "Ingrained in Culture", colorVar: "var(--dim-I2)" },
  { key: "C2", letter: "C", name: "Chosen for a Reason", colorVar: "var(--dim-C2)" },
];

export function MobileHeader({ title, subtitle, onMenuClick, dimensionKey }: MobileHeaderProps) {
  const navigate = useNavigate();
  const base = useBasePath();
  const [isOpen, setIsOpen] = useState(false);
  
  const activeDimension = dimensionKey ? dimensions.find(d => d.key === dimensionKey) : null;

  return (
    <div
      className="flex md:hidden items-center justify-between"
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        minHeight: subtitle ? 72 : 56,
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "0 16px",
        zIndex: 100,
      }}
    >
      <button
        onClick={onMenuClick}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-sm)",
          cursor: "pointer",
          padding: 8,
          color: "var(--text-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: subtitle ? "flex-start" : "center",
          marginTop: subtitle ? 8 : 0,
        }}
      >
        <Menu size={24} strokeWidth={2} />
      </button>

      {/* Dimension Dropdown or Regular Title */}
      {activeDimension ? (
        <div style={{ position: "relative", flex: 1, margin: "0 12px" }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-full"
            style={{
              padding: "8px 12px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--text-primary)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: activeDimension.colorVar,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  color: activeDimension.colorVar,
                  fontWeight: 700,
                }}
              >
                {activeDimension.letter}
              </span>
              <span style={{ fontWeight: 600 }}>{activeDimension.name}</span>
            </div>
            <ChevronDown
              size={16}
              style={{
                color: "var(--text-muted)",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
                marginLeft: 8,
              }}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999,
                }}
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menu */}
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-card)",
                  zIndex: 1000,
                  overflow: "hidden",
                }}
              >
                {dimensions.map((dim, i) => (
                  <button
                    key={dim.key}
                    onClick={() => {
                      navigate(`${base}/deep-dive/${dim.key}`);
                      setIsOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: dimensionKey === dim.key ? "var(--bg-surface)" : "transparent",
                      border: "none",
                      borderBottom: i < dimensions.length - 1 ? "1px solid var(--border-subtle)" : "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "var(--text-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: dim.colorVar,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        color: dim.colorVar,
                        fontWeight: 700,
                      }}
                    >
                      {dim.letter}
                    </span>
                    <span>{dim.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            flex: 1,
            padding: subtitle ? "8px 0" : "0",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--text-muted)",
                margin: 0,
                textAlign: "center",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Spacer to center title */}
      <div style={{ width: 40 }} />
    </div>
  );
}