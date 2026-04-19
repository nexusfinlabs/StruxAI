"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { t } = useTranslation("landing");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 shrink-0 rounded-lg border border-slate-200/90 bg-white/90 dark:border-white/10 dark:bg-slate-900/60"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 bg-white/90 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800/80"
      aria-pressed={isDark}
      aria-label={isDark ? t("controls.themeLight") : t("controls.themeDark")}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-300" aria-hidden />
      ) : (
        <Moon className="h-4 w-4 text-violet-600" aria-hidden />
      )}
    </button>
  );
}
