import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "maplibre-gl/dist/maplibre-gl.css";
import App from "./App.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
