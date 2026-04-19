"use client";

import { useTranslation } from "react-i18next";

export function DashboardCta() {
  const { t } = useTranslation("landing");
  const sidebar = t("dashboardCta.sidebar", {
    returnObjects: true,
  }) as string[];
  const mailDemo = `mailto:contacto@nexusfinlabs.com?subject=${encodeURIComponent(t("mailto.demoSubject"))}`;
  const mailContact = `mailto:contacto@nexusfinlabs.com?subject=${encodeURIComponent(t("mailto.contactSubject"))}`;

  return (
    <section className="border-t border-slate-200/80 py-20 dark:border-white/5 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/80 shadow-lg dark:border-white/10 dark:bg-slate-900/50 dark:shadow-xl lg:order-1">
          <div className="flex h-[320px]">
            <div className="flex w-44 flex-col gap-1 border-r border-slate-200/90 bg-slate-50/95 p-3 dark:border-white/10 dark:bg-slate-950/80">
              {sidebar.map((x, i) => (
                <div
                  key={x}
                  className={`rounded-md px-2 py-1.5 text-xs ${
                    i === 1
                      ? "bg-violet-600/10 text-violet-900 dark:bg-white/10 dark:text-white"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-white/5"
                  }`}
                >
                  {x}
                </div>
              ))}
            </div>
            <div className="relative flex-1 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.15),transparent_50%)]" />
              <svg
                className="absolute inset-0 m-auto h-[90%] w-[85%] text-slate-400 dark:text-slate-600"
                viewBox="0 0 360 320"
                fill="none"
                aria-hidden
              >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <rect
                    key={i}
                    x={40 + i * 5}
                    y={36 + i * 40}
                    width={280 - i * 10}
                    height={28}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    fill="rgba(139,92,246,0.12)"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
            {t("dashboardCta.eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("dashboardCta.title")}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            {t("dashboardCta.body")}
          </p>
          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            id="demo"
          >
            <a
              href={mailDemo}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-medium text-white shadow-[0_0_28px_-6px_rgba(139,92,246,0.45)] transition hover:from-violet-500 hover:to-blue-500 dark:shadow-[0_0_28px_-6px_rgba(139,92,246,0.65)]"
            >
              {t("dashboardCta.demo")}
            </a>
            <a
              href={mailContact}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300/90 bg-white/80 px-6 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 dark:border-white/20 dark:bg-slate-950/50 dark:text-slate-100 dark:hover:border-white/35"
            >
              {t("dashboardCta.specialist")}
            </a>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
            {t("dashboardCta.response")}
          </p>
        </div>
      </div>
    </section>
  );
}
