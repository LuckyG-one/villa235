import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { LanguageProvider } from "./i18n/LanguageContext.jsx";

// Build-time prerender (scripts/prerender.mjs): rendert de complete pagina
// per taal naar statische HTML, zodat crawlers zonder JavaScript alle tekst
// zien. De client hydrateert dit daarna (src/main.jsx).
export function render(lang) {
  return renderToString(
    <StrictMode>
      <LanguageProvider initialLang={lang}>
        <App />
      </LanguageProvider>
    </StrictMode>
  );
}
