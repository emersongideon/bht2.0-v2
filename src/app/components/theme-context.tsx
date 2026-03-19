import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeName = "dusk" | "linen" | "blush";

const ThemeContext = createContext<{
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}>({ theme: "dusk", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("dusk");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div data-theme={theme === "dusk" ? undefined : theme} className="size-full">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export const themes: { name: ThemeName; label: string; bg: string; accent: string }[] = [
  { name: "dusk", label: "Dusk", bg: "#FAF7F4", accent: "#B86A54" },
  { name: "linen", label: "Linen", bg: "#FDFBF9", accent: "#DD9F86" },
  // { name: "blush", label: "Blush", bg: "#13151A", accent: "#E07A4A" }, // Disabled for now
];