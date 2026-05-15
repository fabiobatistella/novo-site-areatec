import React, { createContext, useContext, useState, useCallback } from "react";

export type Language = "pt" | "en" | "es";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dynamic import of translations
import translations from "@/i18n/translations";

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLang?: Language;
}

export function LanguageProvider({ children, defaultLang = "pt" }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("areatec-lang");
    if (stored && ["pt", "en", "es"].includes(stored)) return stored as Language;
    // Detect browser language
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (browserLang === "es") return "es";
    if (browserLang === "en") return "en";
    return defaultLang;
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("areatec-lang", newLang);
    document.documentElement.lang = newLang === "pt" ? "pt-BR" : newLang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const langTranslations = translations[lang];
      if (!langTranslations) return key;
      return (langTranslations as Record<string, string>)[key] ?? key;
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
