import { Grid3X3, Layers, Bell, Settings } from "lucide-react";
import { useTheme, themes } from "./theme-context";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { icon: Grid3X3, label: "Dashboard", path: "/" },
    { icon: Layers, label: "Deep Dive", path: "/deep-dive/I1" },
    { icon: Bell, label: "Alerts", path: "/alerts" },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.label === "Dashboard") return location.pathname === "/" || location.pathname === "/empty";
    if (item.label === "Deep Dive") return location.pathname.startsWith("/deep-dive");
    return location.pathname.startsWith(item.path);
  };

  return (
    <div
      className="flex flex-col shrink-0 transition-all duration-300"
      style={{
        width: isExpanded ? 200 : 60,
        height: "100%",
        minHeight: 900,
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div
        style={{
          paddingTop: 16,
          paddingLeft: isExpanded ? 16 : 0,
          paddingBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: isExpanded ? "flex-start" : "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: "var(--accent-primary)",
          fontSize: isExpanded ? 18 : 22,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {isExpanded ? "QUILT.AI" : "Q"}
      </div>

      {/* Nav items */}
      <div
        className="flex flex-col"
        style={{
          gap: isExpanded ? 4 : 8,
          flex: 1,
          alignItems: isExpanded ? "stretch" : "center",
          padding: isExpanded ? "0 10px" : "0",
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center transition-colors"
              style={{
                gap: 10,
                height: 40,
                padding: isExpanded ? "8px 14px" : "8px 0",
                width: isExpanded ? "100%" : 40,
                borderRadius: "var(--radius-md)",
                backgroundColor: active
                  ? "color-mix(in srgb, var(--accent-primary) 12%, transparent)"
                  : "transparent",
                color: active ? "var(--accent-primary)" : "var(--text-muted)",
                border: "none",
                cursor: "pointer",
                justifyContent: isExpanded ? "flex-start" : "center",
                flexShrink: 0,
              }}
              onMouseOver={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "var(--card-hover)";
              }}
              onMouseOut={(e) => {
                if (!active) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <item.icon size={20} strokeWidth={1.5} style={{ flexShrink: 0 }} />
              {isExpanded && (
                <span
                  style={{
                    fontSize: 14,
                    fontFamily: "var(--font-body)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom section */}
      <div
        className="flex flex-col"
        style={{
          gap: isExpanded ? 10 : 12,
          alignItems: isExpanded ? "stretch" : "center",
          paddingBottom: 16,
        }}
      >
        {/* Theme switcher */}
        {isExpanded ? (
          <div
            className="flex items-center"
            style={{ gap: 10, paddingLeft: 14 }}
          >
            <div className="flex" style={{ gap: 6 }}>
              {themes.map((t) => (
                <ThemeCircle
                  key={t.name}
                  t={t}
                  active={theme === t.name}
                  onClick={() => setTheme(t.name)}
                />
              ))}
            </div>
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-body)",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              Theme
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center" style={{ gap: 4 }}>
            <span
              style={{
                fontSize: 9,
                fontFamily: "var(--font-body)",
                color: "var(--text-muted)",
              }}
            >
              Theme
            </span>
            <div className="flex" style={{ gap: 6 }}>
              {themes.map((t) => (
                <ThemeCircle
                  key={t.name}
                  t={t}
                  active={theme === t.name}
                  onClick={() => setTheme(t.name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        <button
          className="flex items-center"
          onClick={() => {}}
          style={{
            gap: 10,
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: isExpanded ? "4px 14px" : "4px 0",
            justifyContent: isExpanded ? "flex-start" : "center",
            width: "100%",
          }}
        >
          <Settings size={18} strokeWidth={1.5} style={{ flexShrink: 0 }} />
          {isExpanded && (
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-body)",
                whiteSpace: "nowrap",
              }}
            >
              Settings
            </span>
          )}
        </button>

        {/* Avatar */}
        <div
          className="flex items-center"
          style={{
            gap: 10,
            paddingLeft: isExpanded ? 14 : 0,
            justifyContent: isExpanded ? "flex-start" : "center",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              backgroundColor: "var(--accent-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            U
          </div>
          {isExpanded && (
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-body)",
                color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              User
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ThemeCircle({
  t,
  active,
  onClick,
}: {
  t: { name: string; bg: string; accent: string };
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        overflow: "hidden",
        border: active ? "1.5px solid var(--accent-primary)" : "1.5px solid transparent",
        padding: 0,
        cursor: "pointer",
        background: "none",
        flexShrink: 0,
        display: "flex",
      }}
    >
      <div style={{ width: "50%", height: "100%", backgroundColor: t.bg }} />
      <div style={{ width: "50%", height: "100%", backgroundColor: t.accent }} />
    </button>
  );
}
