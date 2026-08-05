"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "@/data/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "id",
  setLang: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kv-lang") as Lang | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "id" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("kv-lang", l); } catch {}
  };

  const toggle = () => setLang(lang === "id" ? "en" : "id");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
