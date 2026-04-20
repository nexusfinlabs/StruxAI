"use client";

import { useTranslation } from "react-i18next";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export function Footer() {
  const { t } = useTranslation("landing");
  const columns = t("footer.columns", {
    returnObjects: true,
  }) as FooterColumn[];
  const brands = t("footer.brands", { returnObjects: true }) as string[];

  return (
    <footer className="border-t border-slate-200/90 bg-slate-50 pb-12 pt-16 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 dark:text-white">
              StruxAI
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-500">
              {t("footer.tagline")}
            </p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">
                {c.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {c.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition hover:text-slate-900 dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 border-t border-slate-200/80 pt-10 dark:border-white/5">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-500">
            {t("footer.trust")}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-slate-500 dark:text-slate-500">
            {brands.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
        <div
          id="precios"
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-xs text-slate-500 dark:border-white/5 dark:text-slate-600 sm:flex-row"
        >
          <p>
            © {new Date().getFullYear()} NexusFinLabs. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span id="login" className="text-slate-500 dark:text-slate-500">
              {t("footer.loginNote")}
            </span>
            <a
              href="mailto:contacto@nexusfinlabs.com"
              className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              contacto@nexusfinlabs.com
            </a>
            <a
              href="https://nexusfinlabs.com"
              className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              NexusFinLabs
            </a>
          </div>
        </div>
        <p id="recursos" className="sr-only">
          {t("footer.resourcesNote")}
        </p>
      </div>
    </footer>
  );
}
