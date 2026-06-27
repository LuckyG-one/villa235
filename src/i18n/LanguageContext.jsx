import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { t as dictionary, LANGS } from "./translations.js";

const LanguageContext = createContext(null);

function detectInitial() {
  if (typeof navigator === "undefined") return "nl";
  const stored = typeof localStorage !== "undefined" && localStorage.getItem("villa235.lang");
  if (stored && dictionary[stored]) return stored;
  const nav = (navigator.language || "nl").slice(0, 2).toLowerCase();
  return dictionary[nav] ? nav : "nl";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial);

  const setLang = useCallback((next) => {
    if (!dictionary[next]) return;
    setLangState(next);
    if (typeof localStorage !== "undefined") localStorage.setItem("villa235.lang", next);
    if (typeof document !== "undefined") document.documentElement.lang = next;
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
