import { RouterProvider } from "react-router";
import { router } from "./routes";
import { DateModeProvider } from "./contexts/date-mode-context";
import { AppDataProvider } from "./data/app-data-context";
import { BrandProvider } from "./contexts/brand-context";

export default function App() {
  return (
    <AppDataProvider>
      <DateModeProvider>
        <BrandProvider>
          <RouterProvider router={router} />
        </BrandProvider>
      </DateModeProvider>
    </AppDataProvider>
  );
}