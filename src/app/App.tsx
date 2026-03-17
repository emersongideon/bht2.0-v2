import { RouterProvider } from "react-router";
import { router } from "./routes";
import { DateModeProvider } from "./contexts/date-mode-context";
import { AppDataProvider } from "./data/app-data-context";

export default function App() {
  return (
    <AppDataProvider>
      <DateModeProvider>
        <RouterProvider router={router} />
      </DateModeProvider>
    </AppDataProvider>
  );
}