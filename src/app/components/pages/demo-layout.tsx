import { Outlet, Link } from "react-router";
import { Sidebar } from "../sidebar";
import { ThemeProvider } from "../theme-context";
import { MobileMenu } from "../mobile-menu";
import { ScrollToTop } from "../scroll-to-top";
import { CategoryBrandSelector } from "../category-brand-selector";
import { DateModeSelector } from "../date-mode-selector";
import { useState, useRef } from "react";
import { DemoContext } from "../../contexts/demo-context";

export function DemoLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <DemoContext.Provider value={true}>
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
            {/* Demo Banner */}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#B86A54",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                flexShrink: 0,
                zIndex: 70,
              }}
            >
              <span>You're viewing a demo with 4 brands. Subscribe for full access</span>
              <span style={{ fontWeight: 700 }}>→</span>
            </Link>

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
    </DemoContext.Provider>
  );
}
