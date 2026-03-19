import { useNavigate } from "react-router";

const tabs = [
  { key: "I1", letter: "I", name: "Imprinted in AI", colorVar: "var(--dim-I1)" },
  { key: "C1", letter: "C", name: "Capturing Attention", colorVar: "var(--dim-C1)" },
  { key: "O", letter: "O", name: "Openly Adored", colorVar: "var(--dim-O)" },
  { key: "N", letter: "N", name: "Never Lost", colorVar: "var(--dim-N)" },
  { key: "I2", letter: "I", name: "Ingrained in Culture", colorVar: "var(--dim-I2)" },
  { key: "C2", letter: "C", name: "Chosen for a Reason", colorVar: "var(--dim-C2)" },
];

export function DimensionTabs({ activeKey }: { activeKey: string }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-0"
      style={{
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeKey === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => navigate(`/deep-dive/${tab.key}`)}
            className="flex items-center gap-2 relative"
            style={{
              padding: "10px 16px",
              border: "none",
              borderBottom: isActive ? `2px solid ${tab.colorVar}` : "2px solid transparent",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: isActive ? "var(--text-primary)" : "var(--text-muted)",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: tab.colorVar,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                color: isActive ? tab.colorVar : "var(--text-muted)",
              }}
            >
              {tab.letter}
            </span>
            <span>{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
}
