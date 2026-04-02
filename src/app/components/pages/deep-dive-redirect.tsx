import { Navigate, useLocation } from "react-router";

export function DeepDiveRedirect() {
  const location = useLocation();
  const base = location.pathname.startsWith("/demo") ? "/demo" : "/app";
  return <Navigate to={`${base}/deep-dive/I1`} replace />;
}
