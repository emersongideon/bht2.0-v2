import { ChevronDown, Folder, X, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useBrands } from "../data/use-brands";

export function CategoryBrandSelector() {
  const { categories, brandsByCategory, loading, error } = useBrands();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Set initial category once data loads
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // All brands for the selected category
  const categoryBrands = brandsByCategory[selectedCategory] ?? [];
  // First brand is the primary brand; rest are competitors
  const primaryBrand = categoryBrands[0];
  const competitors = categoryBrands.slice(1);

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div style={{
          height: 36,
          width: 130,
          borderRadius: "var(--radius-pill)",
          backgroundColor: "var(--bg-surface)",
          opacity: 0.5,
        }} />
        <div style={{
          height: 36,
          width: 90,
          borderRadius: "var(--radius-pill)",
          backgroundColor: "var(--bg-surface)",
          opacity: 0.5,
        }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
        Could not load brands: {error}
      </div>
    );
  }

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

        {/* Dropdown menu */}
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

      {/* Primary brand pill — solid accent, white text */}
      {primaryBrand && (
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
        >
          <span>{primaryBrand.name}</span>
          <ChevronDown size={14} />
        </button>
      )}

      {/* Competitor pills — white bg, subtle border */}
      {competitors.map((c) => (
        <button
          key={c.name}
          className="flex items-center gap-2"
          style={{
            backgroundColor: "var(--bg-card)",
            backdropFilter: "blur(var(--blur-glass))",
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-pill)",
            padding: "8px 14px",
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: c.color,
              flexShrink: 0,
            }}
          />
          <span>{c.name}</span>
          <X size={12} style={{ color: "var(--text-muted)" }} />
        </button>
      ))}

      {/* Add button */}
      <button
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2px dashed var(--border-color)",
          backgroundColor: "transparent",
          color: "var(--text-muted)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
