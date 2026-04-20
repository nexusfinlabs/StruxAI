"use client";

import { useTranslation } from "react-i18next";

export function CapabilitiesSection() {
  const { t } = useTranslation("landing");
  const blocks = t("capabilities.blocks", {
    returnObjects: true,
  }) as { title: string; items: string[] }[];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("capabilities.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-400">
          {t("capabilities.subtitle")}
        </p>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-slate-200/90 bg-white/80 p-6 dark:border-white/10 dark:bg-slate-900/35"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                {b.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {b.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-600 dark:bg-cyan-400/80" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
