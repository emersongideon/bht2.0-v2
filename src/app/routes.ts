import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/pages/root-layout";
import { DemoLayout } from "./components/pages/demo-layout";
import { LandingPage } from "./components/pages/landing-page";
import { DashboardPage } from "./components/pages/dashboard-page";
import { DeepDivePage } from "./components/pages/deep-dive-page";
import { DeepDiveRedirect } from "./components/pages/deep-dive-redirect";
import { AlertsPage } from "./components/pages/alerts-page";
import { ReportsPage } from "./components/pages/reports-page";
import { EmptyStatePage } from "./components/pages/empty-state-page";
import { OverlaysPage } from "./components/pages/overlays-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/app",
    Component: RootLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "deep-dive", Component: DeepDiveRedirect },
      { path: "deep-dive/:dimensionKey", Component: DeepDivePage },
      { path: "alerts", Component: AlertsPage },
      { path: "reports", Component: ReportsPage },
      { path: "empty", Component: EmptyStatePage },
      { path: "overlays", Component: OverlaysPage },
    ],
  },
  {
    path: "/demo",
    Component: DemoLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "deep-dive", Component: DeepDiveRedirect },
      { path: "deep-dive/:dimensionKey", Component: DeepDivePage },
      { path: "reports", Component: ReportsPage },
    ],
  },
]);
