import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLanding from "@/locales/en/landing.json";
import esLanding from "@/locales/es/landing.json";

export const defaultLocale = "es" as const;
export const supportedLocales = ["en", "es"] as const;
export type AppLocale = (typeof supportedLocales)[number];

const STORAGE_KEY = "struxai-locale";

const resources = {
  en: { landing: enLanding },
  es: { landing: esLanding },
} as const;

let initialized = false;

export function initI18nClient() {
  if (initialized) {
    return i18n;
  }
  const fromStorage =
    typeof window !== "undefined"
      ? window.localStorage.getItem(STORAGE_KEY)
      : null;
  const lng: AppLocale =
    fromStorage === "en" || fromStorage === "es" ? fromStorage : defaultLocale;

  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "en",
    supportedLngs: [...supportedLocales],
    ns: ["landing"],
    defaultNS: "landing",
    interpolation: { escapeValue: false },
  });

  initialized = true;
  return i18n;
}

export function persistLocale(lng: AppLocale) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, lng);
}

export { STORAGE_KEY as LOCALE_STORAGE_KEY };
