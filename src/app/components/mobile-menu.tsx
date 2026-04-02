import { X, Grid3X3, Layers, Bell, ChevronDown } from "lucide-react";
import { useTheme, themes } from "./theme-context";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { DateModeSelector } from "./date-mode-selector";
import { useBrand } from "../contexts/brand-context";
import { useBasePath } from "../hooks/use-base-path";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const base = useBasePath();
  const [selectedCategory, setSelectedCategory] = useState("Beauty");
  const { selectedBrands, mainBrand, setMainBrand, toggleBrand } = useBrand();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  const categories = [
    { name: "Beauty", active: true },
    { name: "Fashion", comingSoon: true },
    { name: "Personal Care", comingSoon: true },
  ];

  const brands = [
    { name: "Rhode", score: 76 },
    { name: "Summer Fridays", score: 72 },
    { name: "Glossier", score: 81 },
    { name: "Clinique", score: 74 },
    { name: "Laneige", score: 78 },
  ];

  const navItems = [
    { icon: Grid3X3, label: "Dashboard", path: base },
    { icon: Layers, label: "Deep Dive", path: `${base}/deep-dive/I1` },
    { icon: Bell, label: "Alerts", path: `${base}/alerts` },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.label === "Dashboard") return location.pathname === base || location.pathname === `${base}/empty`;
    if (item.label === "Deep Dive") return location.pathname.startsWith(`${base}/deep-dive`);
    return location.pathname.startsWith(item.path);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 998,
          }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "80%",
          maxWidth: 320,
          backgroundColor: "var(--bg-primary)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: 16,
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "var(--accent-primary)",
              fontSize: 20,
            }}
          >
            QUILT.AI
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "var(--text-muted)",
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Navigation
          </div>
          <div className="flex flex-col" style={{ gap: 4 }}>
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center"
                  style={{
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: active
                      ? "color-mix(in srgb, var(--accent-primary) 12%, transparent)"
                      : "transparent",
                    color: active ? "var(--accent-primary)" : "var(--text-secondary)",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <item.icon size={20} strokeWidth={1.5} />
                  <span
                    style={{
                      fontSize: 15,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Filters
          </div>
          <div className="flex flex-col" style={{ gap: 12 }}>
            {/* Category Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setCategoryOpen(!categoryOpen);
                  setBrandsOpen(false);
                }}
                className="flex items-center justify-between w-full"
                style={{
                  padding: "12px 14px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--text-primary)",
                }}
              >
                <span style={{ fontWeight: 600 }}>Category</span>
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--text-secondary)" }}>{selectedCategory}</span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: "var(--text-muted)",
                      transform: categoryOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </div>
              </button>
              
              {/* Category Dropdown Menu */}
              {categoryOpen && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 999,
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={() => setCategoryOpen(false)}
                  />
                  
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
                    {categories.map((cat, i) => (
                      <button
                        key={cat.name}
                        onClick={() => {
                          if (!cat.comingSoon) {
                            setSelectedCategory(cat.name);
                            setCategoryOpen(false);
                          }
                        }}
                        disabled={cat.comingSoon}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          backgroundColor: selectedCategory === cat.name ? "var(--bg-surface)" : "transparent",
                          border: "none",
                          borderBottom: i < categories.length - 1 ? "1px solid var(--border-subtle)" : "none",
                          textAlign: "left",
                          cursor: cat.comingSoon ? "not-allowed" : "pointer",
                          opacity: cat.comingSoon ? 0.5 : 1,
                          fontFamily: "var(--font-body)",
                          fontSize: 14,
                          color: "var(--text-primary)",
                          fontStyle: cat.comingSoon ? "italic" : "normal",
                        }}
                      >
                        {cat.name}
                        {cat.comingSoon && (
                          <span style={{ marginLeft: 8, fontSize: 12, color: "var(--text-muted)" }}>
                            (coming soon)
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Brands Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setBrandsOpen(!brandsOpen);
                  setCategoryOpen(false);
                }}
                className="flex items-center justify-between w-full"
                style={{
                  padding: "12px 14px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--text-primary)",
                }}
              >
                <span style={{ fontWeight: 600 }}>Brands</span>
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--text-secondary)" }}>{mainBrand}</span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: "var(--text-muted)",
                      transform: brandsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </div>
              </button>
              
              {/* Brands Dropdown Menu */}
              {brandsOpen && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 999,
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={() => setBrandsOpen(false)}
                  />
                  
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
                      maxHeight: 280,
                      overflowY: "auto",
                    }}
                  >
                    <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-subtle)" }}>
                      <div style={{ fontSize: 10, fontFamily: "var(--font-body)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Select brands • Set main
                      </div>
                    </div>
                    {brands.map((brand, i) => {
                      const isSelected = selectedBrands.includes(brand.name);
                      const isMain = mainBrand === brand.name;
                      
                      return (
                        <div
                          key={brand.name}
                          style={{
                            borderBottom: i < brands.length - 1 ? "1px solid var(--border-subtle)" : "none",
                          }}
                        >
                          <label
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "10px 14px",
                              cursor: "pointer",
                              backgroundColor: isMain ? "var(--bg-surface)" : "transparent",
                              transition: "background-color 0.15s",
                            }}
                            onTouchStart={(e) => {
                              if (!isMain) {
                                e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                              }
                            }}
                            onTouchEnd={(e) => {
                              if (!isMain) {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            {/* Checkbox */}
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleBrand(brand.name)}
                              style={{
                                width: 18,
                                height: 18,
                                marginRight: 10,
                                cursor: "pointer",
                                accentColor: "var(--accent-primary)",
                              }}
                            />
                            
                            {/* Brand info */}
                            <div style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "space-between" }}>
                              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)" }}>
                                {brand.name}
                              </span>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
                                {brand.score}
                              </span>
                            </div>
                            
                            {/* Radio for main brand */}
                            <input
                              type="radio"
                              name="mainBrandMobile"
                              checked={isMain}
                              onChange={() => setMainBrand(brand.name)}
                              disabled={!isSelected}
                              style={{
                                width: 18,
                                height: 18,
                                marginLeft: 10,
                                cursor: isSelected ? "pointer" : "not-allowed",
                                accentColor: "var(--accent-primary)",
                                opacity: isSelected ? 1 : 0.3,
                              }}
                            />
                          </label>
                        </div>
                      );
                    })}
                    <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border-subtle)", fontSize: 10, fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>
                      ✓ Include • ⦿ Main
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Date Mode */}
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Date & Mode
          </div>
          <DateModeSelector />
        </div>

        {/* Theme Switcher */}
        <div style={{ padding: 16, marginTop: "auto" }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Theme
          </div>
          <div className="flex" style={{ gap: 12 }}>
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: "var(--radius-md)",
                  border: theme === t.name ? "2px solid var(--accent-primary)" : "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-card)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div className="flex" style={{ gap: 0, width: 32, height: 16, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: "50%", height: "100%", backgroundColor: t.bg }} />
                  <div style={{ width: "50%", height: "100%", backgroundColor: t.accent }} />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-body)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {t.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* User */}
        <div
          className="flex items-center"
          style={{
            gap: 12,
            padding: 16,
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "var(--accent-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            U
          </div>
          <span
            style={{
              fontSize: 14,
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            User
          </span>
        </div>
      </div>
    </>
  );
}