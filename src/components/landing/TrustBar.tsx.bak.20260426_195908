"use client";

import { useTranslation } from "react-i18next";

const brands = [
  "Autodesk Revit API",
  "Autodesk Platform Services",
  "Robot Structural Analysis",
  "ETABS",
  "OpenSeesPy",
  "PostgreSQL",
  "Python",
];

export function TrustBar({ id = "integraciones-top" }: { id?: string }) {
  const { t } = useTranslation("landing");
  return (
    <section
      id={id}
      className="border-y border-slate-200/80 bg-slate-50/90 py-10 dark:border-white/5 dark:bg-slate-950/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-500">
          {t("trust.title")}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {brands.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
