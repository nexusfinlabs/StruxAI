"use client";

import { useTranslation } from "react-i18next";

export function ProductShowcase() {
  const { t } = useTranslation("landing");
  const nav = t("showcase.nav", { returnObjects: true }) as string[];

  return (
    <section className="border-t border-slate-200/80 py-20 dark:border-white/5 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("showcase.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600 dark:text-slate-400">
          {t("showcase.subtitle")}
        </p>
        <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/80 shadow-xl dark:border-white/10 dark:bg-slate-900/50 dark:shadow-2xl">
          <div className="flex min-h-[380px] flex-col lg:flex-row">
            <aside className="flex w-full flex-row gap-2 border-b border-slate-200/90 p-3 dark:border-white/10 lg:w-52 lg:flex-col lg:border-b-0 lg:border-r lg:p-4">
              {nav.map((item, i) => (
                <button
                  key={item}
                  type="button"
                  className={`rounded-lg px-3 py-2 text-left text-xs transition lg:text-sm ${
                    i === 2
                      ? "bg-violet-600/15 text-violet-900 dark:bg-violet-600/20 dark:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-slate-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </aside>
            <div className="relative flex flex-1 flex-col">
              <div className="relative flex flex-1 items-stretch">
                <div className="hidden w-12 flex-col justify-center border-r border-slate-200/90 bg-slate-50/90 py-6 text-[9px] text-slate-500 dark:border-white/10 dark:bg-slate-950/60 sm:flex">
                  <span className="mb-2 rotate-180 text-center [writing-mode:vertical-rl]">
                    MPa
                  </span>
                  <div className="mx-auto flex h-40 w-2 flex-col-reverse justify-between rounded-full bg-gradient-to-t from-blue-600 via-violet-500 to-rose-400 p-px">
                    <div className="flex-1 rounded-full bg-slate-200 dark:bg-slate-900" />
                  </div>
                </div>
                <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                  <div className="pointer-events-none absolute inset-0 grid-tech opacity-50 dark:opacity-40" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.12),transparent_45%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.2),transparent_45%)]" />
                  <svg
                    className="absolute inset-0 m-auto h-[85%] w-[80%] text-slate-400 dark:text-slate-600"
                    viewBox="0 0 400 360"
                    fill="none"
                    aria-hidden
                  >
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <rect
                        key={i}
                        x={50 + i * 5}
                        y={40 + i * 44}
                        width={300 - i * 10}
                        height={32}
                        stroke="currentColor"
                        strokeWidth="0.6"
                        fill="url(#heat)"
                        opacity={0.2 + i * 0.1}
                      />
                    ))}
                    <defs>
                      <linearGradient id="heat" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#fb7185" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute bottom-4 left-4 rounded-md border border-slate-200/90 bg-white/90 px-2 py-1 text-[10px] text-slate-600 backdrop-blur dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-400">
                    {t("showcase.overlay")}
                  </div>
                </div>
                <div className="w-full border-t border-slate-200/90 bg-slate-50/95 p-4 dark:border-white/10 dark:bg-slate-950/70 lg:w-72 lg:border-l lg:border-t-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-300">
                    {t("showcase.summary")}
                  </p>
                  <dl className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-500">
                    <div className="flex justify-between gap-2">
                      <dt>{t("showcase.elements")}</dt>
                      <dd className="font-mono text-slate-800 dark:text-slate-300">
                        4.582
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>{t("showcase.combinations")}</dt>
                      <dd className="font-mono text-slate-800 dark:text-slate-300">
                        42
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>{t("showcase.duration")}</dt>
                      <dd className="font-mono text-slate-800 dark:text-slate-300">
                        02:18:34
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>{t("showcase.status")}</dt>
                      <dd className="text-emerald-700 dark:text-emerald-400">
                        {t("showcase.done")}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-5 text-xs font-semibold text-slate-800 dark:text-slate-300">
                    {t("showcase.topAlerts")}
                  </p>
                  <ul className="mt-2 space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400" />
                      {t("showcase.alert1")}
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500 dark:bg-rose-400" />
                      {t("showcase.alert2")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
