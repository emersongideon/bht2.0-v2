import { ChevronDown, Folder, X, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useBrand } from "../contexts/brand-context";

const categories = ["Beauty", "Fashion", "Personal Care"];

const brands = [
  { name: "Rhode", score: 76, isPrimary: true },
  { name: "Summer Fridays", score: 68, isPrimary: false, dot: "#374762" },
  { name: "Glossier", score: 72, isPrimary: false, dot: "#DAC58C" },
  { name: "Clinique", score: 65, isPrimary: false, dot: "#ACBDA7" },
  { name: "Laneige", score: 70, isPrimary: false, dot: "#6B241E" },
];

export function CategoryBrandSelector() {
  const [selectedCategory, setSelectedCategory] = useState("Beauty");
  const { selectedBrands, mainBrand, setMainBrand, toggleBrand } = useBrand();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setShowBrandDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainBrandData = brands.find(b => b.name === mainBrand) || brands[0];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Category pill with dropdown */}
      <div style={{ position: "relative" }} ref={categoryRef}>
        <button
          className="flex items-center gap-2"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-pill)",
            padding: "8px 16px",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            cursor: "pointer",
          }}
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <Folder size={14} style={{ color: "var(--text-muted)" }} />
          <span>{selectedCategory}</span>
          <ChevronDown size={14} style={{ color: "var(--text-muted)" }} />
        </button>

        {/* Category Dropdown menu */}
        {showCategoryDropdown && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              backgroundColor: "var(--bg-card)",
              backdropFilter: "blur(var(--blur-glass))",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-card)",
              minWidth: 160,
              zIndex: 1000,
              overflow: "hidden",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategoryDropdown(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 16px",
                  backgroundColor: selectedCategory === category ? "var(--bg-surface)" : "var(--bg-card)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--text-primary)",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = "var(--bg-card)";
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brand selector - multi-select with main brand */}
      <div style={{ position: "relative" }} ref={brandRef}>
        <button
          className="flex items-center gap-2"
          style={{
            backgroundColor: "var(--accent-primary)",
            border: "none",
            borderRadius: "var(--radius-pill)",
            padding: "8px 16px",
            color: "#FFFFFF",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() => setShowBrandDropdown(!showBrandDropdown)}
        >
          <span>{mainBrandData.name}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 400 }}>{mainBrandData.score}</span>
          {selectedBrands.length > 1 && (
            <span 
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.2)", 
                borderRadius: "var(--radius-pill)", 
                padding: "2px 6px",
                fontSize: 12,
                fontFamily: "var(--font-mono)"
              }}
            >
              +{selectedBrands.length - 1}
            </span>
          )}
          <ChevronDown size={14} />
        </button>

        {/* Brand Dropdown menu */}
        {showBrandDropdown && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              backgroundColor: "var(--bg-primary)",
              backdropFilter: "blur(var(--blur-glass))",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-card)",
              minWidth: 240,
              zIndex: 1000,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Select brands to analyze
              </div>
            </div>
            {brands.map((brand, index) => {
              const isSelected = selectedBrands.includes(brand.name);
              const isMain = mainBrand === brand.name;
              
              return (
                <div
                  key={brand.name}
                  style={{
                    borderBottom: index < brands.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 16px",
                      cursor: "pointer",
                      backgroundColor: isMain ? "var(--bg-surface)" : "transparent",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isMain) {
                        e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                      }
                    }}
                    onMouseLeave={(e) => {
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
                        width: 16,
                        height: 16,
                        marginRight: 12,
                        cursor: "pointer",
                        accentColor: "var(--accent-primary)",
                      }}
                    />
                    
                    {/* Brand info */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                      {brand.dot && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: brand.dot,
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <span style={{ fontWeight: brand.isPrimary ? 700 : 400, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)", flex: 1 }}>
                        {brand.name}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)" }}>
                        {brand.score}
                      </span>
                    </div>
                    
                    {/* Radio for main brand */}
                    <input
                      type="radio"
                      name="mainBrand"
                      checked={isMain}
                      onChange={() => setMainBrand(brand.name)}
                      disabled={!isSelected}
                      title="Set as main brand"
                      style={{
                        width: 16,
                        height: 16,
                        marginLeft: 12,
                        cursor: isSelected ? "pointer" : "not-allowed",
                        accentColor: "var(--accent-primary)",
                        opacity: isSelected ? 1 : 0.3,
                      }}
                    />
                  </label>
                </div>
              );
            })}
            <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border-subtle)", fontSize: 11, fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>
              ✓ Include in analysis • ⦿ Main brand
            </div>
          </div>
        )}
      </div>
    </div>
  );
}