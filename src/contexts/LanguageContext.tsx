import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { translations, Language, TranslationKey } from "@/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T = any>(key: TranslationKey) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get nested value safely
const getNestedValue = (obj: any, keys: string[]): any => {
  let value = obj;
  
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  
  return value;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    const savedLang = saved as Language;
    
    // Validate that saved language exists in translations
    if (savedLang && savedLang in translations) {
      return savedLang;
    }
    
    return "vi";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // ✅ t() GENERIC với fallback
  const t = <T = any,>(key: TranslationKey): T => {
    const keys = key.split(".");
    
    // Try to get value from current language
    let value = getNestedValue(translations[language], keys);
    
    // If not found in current language, try Vietnamese as fallback
    if (value === undefined && language !== "vi") {
      value = getNestedValue(translations["vi"], keys);
    }
    
    // If still not found, return the key itself as fallback
    if (value === undefined) {
      return key as unknown as T;
    }

    return value as T;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};