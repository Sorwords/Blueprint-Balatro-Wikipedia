import { createContext, useContext, useState, type ReactNode } from 'react';
import { es, en, type Lang } from './translations';
import type { TranslationKey } from './translations';

export type { Lang, TranslationKey };

const allKeys: Record<string, string | undefined> = es;
const translations: Record<Lang, Record<string, string>> = { es, en };

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'es',
  setLang: () => {},
  t: (key) => allKeys[key] || key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('blueprint-lang');
    if (saved === 'en' || saved === 'es') return saved;
    return 'es';
  });

  const t = (key: string, vars?: Record<string, string | number>): string => {
    let text = translations[lang][key] || translations['es'][key] || key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  };

  const handleSetLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('blueprint-lang', l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
