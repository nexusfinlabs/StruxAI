"use client";

import { useTranslation } from "react-i18next";

const nums = ["01", "02", "03", "04", "05"] as const;

export function ProcessTimeline() {
  const { t } = useTranslation("landing");
  const steps = t("process.steps", { returnObjects: true }) as {
    title: string;
    desc: string;
  }[];

  return (
    <section
      id="como-funciona"
      className="border-t border-slate-200/80 py-20 dark:border-white/5 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
          {t("process.eyebrow")}
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("process.title")}
        </h2>
        <div className="mt-16">
          <div className="relative hidden lg:block">
            <div className="absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/15" />
            <div className="grid grid-cols-5 gap-4">
              {steps.map((s, i) => (
                <div key={nums[i]} className="relative text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-violet-300/80 bg-white text-sm font-mono font-semibold text-violet-800 shadow-sm dark:border-violet-500/40 dark:bg-slate-950 dark:text-violet-200 dark:shadow-[0_0_24px_-8px_rgba(139,92,246,0.8)]">
                    {nums[i]}
                  </div>
                  <h3 className="mt-5 text-sm font-semibold text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-500">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 lg:hidden">
            {steps.map((s, i) => (
              <div key={nums[i]} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-300/80 bg-white text-xs font-mono font-semibold text-violet-800 dark:border-violet-500/40 dark:bg-slate-950 dark:text-violet-200">
                    {nums[i]}
                  </div>
                  {i < steps.length - 1 ? (
                    <div className="mt-1 w-px flex-1 bg-gradient-to-b from-violet-400/50 to-transparent dark:from-violet-500/40" />
                  ) : null}
                </div>
                <div className="pb-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-500">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
