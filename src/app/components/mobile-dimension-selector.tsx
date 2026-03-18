import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const dimensions = [
  { key: "I1", letter: "I", name: "Imprinted in AI", colorVar: "var(--dim-I1)" },
  { key: "C1", letter: "C", name: "Capturing Attention", colorVar: "var(--dim-C1)" },
  { key: "O", letter: "O", name: "Openly Adored", colorVar: "var(--dim-O)" },
  { key: "N", letter: "N", name: "Never Lost", colorVar: "var(--dim-N)" },
  { key: "I2", letter: "I", name: "Ingrained in Culture", colorVar: "var(--dim-I2)" },
  { key: "C2", letter: "C", name: "Chosen for a Reason", colorVar: "var(--dim-C2)" },
];

export function MobileDimensionSelector({ activeKey }: { activeKey: string }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const activeDimension = dimensions.find(d => d.key === activeKey) || dimensions[0];

  return (
    <div className="md:hidden" style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full"
        style={{
          padding: "12px 16px",
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--text-primary)",
          boxShadow: "var(--shadow-card)",
          backdropFilter: "blur(var(--blur-glass))",
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
                  navigate(`/deep-dive/${dim.key}`);
                  setIsOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: activeKey === dim.key ? "var(--bg-surface)" : "transparent",
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
  );
}