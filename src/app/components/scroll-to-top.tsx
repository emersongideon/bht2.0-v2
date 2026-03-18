import { useEffect, RefObject } from "react";
import { useLocation } from "react-router";

interface ScrollToTopProps {
  scrollContainerRef: RefObject<HTMLDivElement>;
}

export function ScrollToTop({ scrollContainerRef }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [pathname, scrollContainerRef]);

  return null;
}