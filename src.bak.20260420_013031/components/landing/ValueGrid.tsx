"use client";

import {
  FileStack,
  GitBranch,
  Layers,
  LineChart,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Layers, Workflow, LineChart, Sparkles, GitBranch, FileStack] as const;

export function ValueGrid() {
  const { t } = useTranslation("landing");
  const features = t("value.features", {
    returnObjects: true,
  }) as { title: string; desc: string }[];

  return (
    <section id="producto" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
          {t("value.eyebrow")}
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("value.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-400">
          {t("value.subtitle")}
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className="group rounded-xl border border-slate-200/90 bg-white/80 p-5 shadow-sm transition hover:border-violet-300/60 hover:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] dark:hover:border-violet-500/25 dark:hover:bg-slate-900/70"
              >
                <div className="mb-4 inline-flex rounded-lg border border-violet-200/80 bg-violet-50 p-2 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
