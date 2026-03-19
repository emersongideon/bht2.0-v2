import { Outlet } from "react-router";
import { Sidebar } from "../sidebar";
import { ThemeProvider } from "../theme-context";
import { MobileMenu } from "../mobile-menu";
import { ScrollToTop } from "../scroll-to-top";
import { useState, useRef } from "react";

export function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider>
      <ScrollToTop scrollContainerRef={scrollContainerRef} />
      <div
        className="flex w-full h-screen md:w-auto md:h-auto"
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

        {/* Main Content */}
        <div 
          ref={scrollContainerRef}
          className="md:ml-[60px]"
          style={{ 
            flex: 1, 
            minWidth: 0, 
            overflow: "auto",
            height: "100%",
          }}
        >
          <Outlet context={{ openMobileMenu: () => setMobileMenuOpen(true), scrollContainerRef }} />
        </div>
      </div>
    </ThemeProvider>
  );
}