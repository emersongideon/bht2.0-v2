import { Outlet } from "react-router";
import { Sidebar } from "../sidebar";
import { ThemeProvider } from "../theme-context";
import { MobileMenu } from "../mobile-menu";
import { ScrollToTop } from "../scroll-to-top";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { useState, useRef } from "react";

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider>
      <ScrollToTop scrollContainerRef={scrollContainerRef} />
      <div
        className="flex w-full h-screen"
        style={{
          backgroundColor: "var(--bg-primary)",
          overflow: "hidden",
        }}
      >
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        {/* Main Content Area */}
        <div className="md:ml-[60px]" style={{ flex: 1, minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
          {/* Desktop Sticky Top Bar — hidden on mobile */}
          <div
            className="hidden md:flex items-center justify-between"
            style={{
              flexShrink: 0,
              padding: "10px 16px",
              backgroundColor: "var(--bg-primary)",
              borderBottom: "1px solid var(--border-subtle)",
              zIndex: 60,
            }}
          >
            <CategoryBrandSelector />
            <DateModeSelector />
          </div>

          {/* Scrollable page content */}
          <div
            ref={scrollContainerRef}
            style={{
              flex: 1,
              minHeight: 0,
              overflow: "auto",
            }}
          >
            <Outlet context={{ openMobileMenu: () => setMobileMenuOpen(true), scrollContainerRef }} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}