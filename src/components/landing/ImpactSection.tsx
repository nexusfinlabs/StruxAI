"use client";

import { useTranslation } from "react-i18next";

export function ImpactSection() {
  const { t } = useTranslation("landing");
  return (
    <section className="border-t border-slate-200/80 py-16 dark:border-white/5 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t("impact.title")}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          {t("impact.body")}
        </p>
      </div>
    </section>
  );
}
