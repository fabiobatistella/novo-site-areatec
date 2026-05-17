import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Language = "pt" | "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import translations from "@/i18n/translations";

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLang?: Language;
}

function detectInitialLang(defaultLang: Language): Language {
  // 1. Check URL ?lang= parameter (highest priority for SEO crawlers)
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");
    if (urlLang && ["pt", "en", "es"].includes(urlLang)) {
      return urlLang as Language;
    }
  }
  // 2. Check localStorage
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("areatec-lang");
    if (stored && ["pt", "en", "es"].includes(stored)) return stored as Language;
  }
  // 3. Detect browser language
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (browserLang === "es") return "es";
    if (browserLang === "en") return "en";
  }
  return defaultLang;
}

export function LanguageProvider({ children, defaultLang = "pt" }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(() => detectInitialLang(defaultLang));

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("areatec-lang", newLang);
  }, []);

  // Sync html lang attribute whenever lang changes
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
  }, [lang]);

  const t = useCallback(
    (key: string): string => {
      // Try current language first, fall back to pt if key missing
      const langTranslations = translations[lang];
      if (langTranslations && (langTranslations as Record<string, string>)[key]) {
        return (langTranslations as Record<string, string>)[key];
      }
      // Fallback to Portuguese
      const ptTranslations = translations["pt"];
      if (ptTranslations && (ptTranslations as Record<string, string>)[key]) {
        return (ptTranslations as Record<string, string>)[key];
      }
      return key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
