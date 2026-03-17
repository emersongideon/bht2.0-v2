import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/pages/root-layout";
import { DashboardPage } from "./components/pages/dashboard-page";
import { DeepDivePage } from "./components/pages/deep-dive-page";
import { DeepDiveRedirect } from "./components/pages/deep-dive-redirect";
import { AlertsPage } from "./components/pages/alerts-page";
import { EmptyStatePage } from "./components/pages/empty-state-page";
import { OverlaysPage } from "./components/pages/overlays-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "deep-dive", Component: DeepDiveRedirect },
      { path: "deep-dive/:dimensionKey", Component: DeepDivePage },
      { path: "alerts", Component: AlertsPage },
      { path: "empty", Component: EmptyStatePage },
      { path: "overlays", Component: OverlaysPage },
    ],
  },
]);
