"use client";

import { initI18nClient } from "@/i18n/client";
import i18n from "i18next";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";

initI18nClient();

function DocumentLang() {
  useEffect(() => {
    const handler = (lng: string) => {
      document.documentElement.lang = lng.startsWith("en") ? "en" : "es";
    };
    handler(i18n.language);
    i18n.on("languageChanged", handler);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);
  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="struxai-theme"
    >
      <I18nextProvider i18n={i18n}>
        <DocumentLang />
        {children}
      </I18nextProvider>
    </ThemeProvider>
  );
}
