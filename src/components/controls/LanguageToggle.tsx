"use client";

import type { AppLocale } from "@/i18n/client";
import { persistLocale } from "@/i18n/client";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { t } = useTranslation("landing");
  const lng = (i18n.resolvedLanguage || i18n.language || "es").startsWith("en")
    ? "en"
    : "es";

  const setLang = (next: AppLocale) => {
    void i18n.changeLanguage(next);
    persistLocale(next);
  };

  return (
    <div
      className="flex items-center rounded-lg border border-slate-200/90 bg-white/90 p-0.5 text-xs font-medium dark:border-white/10 dark:bg-slate-900/60"
      role="group"
      aria-label={t("controls.language")}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-md px-2.5 py-1 transition ${
          lng === "en"
            ? "bg-violet-600 text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`rounded-md px-2.5 py-1 transition ${
          lng === "es"
            ? "bg-violet-600 text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        ES
      </button>
    </div>
  );
}
