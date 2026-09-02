import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LanguageProvider, langFromPath } from "./i18n/LanguageContext.jsx";

const initialLang = langFromPath(window.location.pathname);
document.documentElement.lang = initialLang;

const root = document.getElementById("root");
const tree = (
  <StrictMode>
    <LanguageProvider initialLang={initialLang}>
      <App />
    </LanguageProvider>
  </StrictMode>
);

// Productie-HTML is geprerenderd (zie scripts/prerender.mjs) en wordt
// gehydrateerd; de dev-server serveert een lege shell en rendert vanaf nul.
if (root.hasChildNodes()) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}
