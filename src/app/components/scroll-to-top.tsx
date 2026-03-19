import { useEffect, RefObject } from "react";
import { useLocation } from "react-router";

interface ScrollToTopProps {
  scrollContainerRef: RefObject<HTMLDivElement>;
}

export function ScrollToTop({ scrollContainerRef }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      // Mobile: scrolling is on the container div (outer div is h-screen)
      scrollContainerRef.current?.scrollTo(0, 0);
      // Desktop: outer div is h-auto so the window is the actual scroll container
      window.scrollTo(0, 0);
    };

    // Immediate reset
    scrollToTop();

    // Second reset after next paint — catches async re-renders that shift height
    const raf = requestAnimationFrame(scrollToTop);

    return () => cancelAnimationFrame(raf);
  }, [pathname, scrollContainerRef]);

  return null;
}