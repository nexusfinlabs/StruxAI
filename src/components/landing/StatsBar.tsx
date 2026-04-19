"use client";

import { useTranslation } from "react-i18next";

const statKeys = ["s1", "s2", "s3"] as const;
const statVals = ["−70%", "+95%", "100%"] as const;

export function StatsBar() {
  const { t } = useTranslation("landing");
  return (
    <section className="border-y border-slate-200/80 bg-slate-100/80 py-14 dark:border-white/5 dark:bg-slate-900/35">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {statKeys.map((key, i) => (
          <div key={key} className="text-center lg:text-left">
            <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {statVals[i]}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {t(`stats.${key}`)}
            </p>
          </div>
        ))}
        <div className="text-center lg:text-left">
          <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("stats.s4k")}
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {t("stats.s4")}
          </p>
        </div>
      </div>
    </section>
  );
}
