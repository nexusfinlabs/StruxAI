"use client";

import { useTranslation } from "react-i18next";

export function UseCasesSection() {
  const { t } = useTranslation("landing");
  const cases = t("cases.items", { returnObjects: true }) as {
    title: string;
    desc: string;
  }[];

  return (
    <section id="casos" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("cases.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-400">
          {t("cases.subtitle")}
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.title}
              className="rounded-xl border border-slate-200/90 bg-white/80 p-5 transition hover:border-cyan-400/40 dark:border-white/10 dark:bg-slate-900/40 dark:hover:border-cyan-500/20"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {c.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
