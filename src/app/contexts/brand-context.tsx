import { createContext, useContext, useState, ReactNode } from "react";
import { useAppData } from "../data/app-data-context";

interface BrandContextType {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrands: string[];
  mainBrand: string;
  setSelectedBrands: (brands: string[]) => void;
  setMainBrand: (brand: string) => void;
  toggleBrand: (brand: string) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const { categories, brandsByCategory } = useAppData();

  const defaultCategory = categories[0] ?? "Beauty";
  const MAX_BRANDS = 10;
  const defaultBrandNames = (brandsByCategory[defaultCategory]?.map(b => b.name) ?? []).slice(0, MAX_BRANDS);

  const [selectedCategory, setSelectedCategoryRaw] = useState(defaultCategory);
  const [selectedBrands, setSelectedBrands] = useState(defaultBrandNames);
  const [mainBrand, setMainBrand] = useState(defaultBrandNames[0] ?? "");

  const setSelectedCategory = (category: string) => {
    setSelectedCategoryRaw(category);
    const newBrandNames = (brandsByCategory[category]?.map(b => b.name) ?? []).slice(0, MAX_BRANDS);
    setSelectedBrands(newBrandNames);
    setMainBrand(newBrandNames[0] ?? "");
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        if (prev.length === 1) return prev;
        if (brand === mainBrand) {
          const newBrands = prev.filter(b => b !== brand);
          setMainBrand(newBrands[0]);
          return newBrands;
        }
        return prev.filter(b => b !== brand);
      } else {
        if (prev.length >= MAX_BRANDS) return prev; // block adding an 11th brand
        return [...prev, brand];
      }
    });
  };

  return (
    <BrandContext.Provider value={{ selectedCategory, setSelectedCategory, selectedBrands, mainBrand, setSelectedBrands, setMainBrand, toggleBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
}
