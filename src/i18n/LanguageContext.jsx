import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { t as dictionary, LANGS } from "./translations.js";

const LanguageContext = createContext(null);

// Elke taal heeft een eigen, geprerenderde URL: "/" = nl, "/fr/", "/en/".
// De URL is de enige bron van waarheid voor de taal, zodat server-render en
// client-hydration altijd hetzelfde opleveren (geen mismatch) en zoekmachines
// elke taal op een eigen adres kunnen indexeren (hreflang).
const PATHS = { nl: "/", fr: "/fr/", en: "/en/" };

export function langFromPath(pathname = "/") {
  const seg = pathname.split("/")[1];
  return seg && dictionary[seg] ? seg : "nl";
}

export function LanguageProvider({ initialLang = "nl", children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = useCallback((next) => {
    if (!dictionary[next]) return;
    setLangState(next);
    if (typeof document !== "undefined") document.documentElement.lang = next;
    if (typeof history !== "undefined" && typeof window !== "undefined") {
      history.replaceState(null, "", PATHS[next] + window.location.hash);
    }
  }, []);

  const t = useCallback(
    (key) => dictionary[lang]?.[key] ?? dictionary.nl[key] ?? key,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, langs: LANGS }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
