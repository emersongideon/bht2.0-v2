import { useLocation } from "react-router";

/**
 * Returns the route base ("/app" or "/demo") based on the current location.
 * Falls back to "/app" if neither matches.
 */
export function useBasePath(): string {
  const location = useLocation();
  if (location.pathname.startsWith("/demo")) return "/demo";
  return "/app";
}
