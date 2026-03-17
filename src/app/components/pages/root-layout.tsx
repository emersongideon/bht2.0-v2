import { Outlet } from "react-router";
import { Sidebar } from "../sidebar";
import { ThemeProvider } from "../theme-context";

export function RootLayout() {
  return (
    <ThemeProvider>
      <div
        className="flex"
        style={{
          width: 1440,
          height: 900,
          backgroundColor: "var(--bg-primary)",
          overflow: "hidden",
          margin: "0 auto",
        }}
      >
        <Sidebar />
        <div style={{ flex: 1, minWidth: 0, overflow: "auto" }}>
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}