import { createContext, useContext, useState, ReactNode } from "react";

interface BrandContextType {
  selectedBrands: string[];
  mainBrand: string;
  setSelectedBrands: (brands: string[]) => void;
  setMainBrand: (brand: string) => void;
  toggleBrand: (brand: string) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [selectedBrands, setSelectedBrands] = useState(["Rhode", "Summer Fridays", "Glossier", "Clinique", "Laneige"]);
  const [mainBrand, setMainBrand] = useState("Rhode");

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        // Don't allow deselecting if it's the only brand
        if (prev.length === 1) return prev;
        
        // If deselecting the main brand, set a new main brand
        if (brand === mainBrand) {
          const newBrands = prev.filter(b => b !== brand);
          setMainBrand(newBrands[0]);
          return newBrands;
        }
        
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  return (
    <BrandContext.Provider value={{ selectedBrands, mainBrand, setSelectedBrands, setMainBrand, toggleBrand }}>
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