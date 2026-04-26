"use client";

import {
  FileStack, GitBranch, Layers, LineChart, Sparkles, Workflow,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ACCENTS = [
  { color: "cyan", icon: Layers },
  { color: "violet", icon: Workflow },
  { color: "amber", icon: LineChart },
  { color: "emerald", icon: Sparkles },
  { color: "rose", icon: GitBranch },
  { color: "blue", icon: FileStack },
] as const;

const ACCENT_CLASSES: Record<string, { bg: string; iconBg: string; iconText: string; border: string; hoverBorder: string; glow: string }> = {
  cyan:    { bg: "from-cyan-500/5",    iconBg: "bg-cyan-500/10",    iconText: "text-cyan-400",    border: "border-cyan-500/15",    hoverBorder: "hover:border-cyan-400/50",    glow: "hover:shadow-[0_0_40px_-8px_rgba(6,182,212,0.45)]" },
  violet:  { bg: "from-violet-500/5",  iconBg: "bg-violet-500/10",  iconText: "text-violet-400",  border: "border-violet-500/15",  hoverBorder: "hover:border-violet-400/50",  glow: "hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.45)]" },
  amber:   { bg: "from-amber-500/5",   iconBg: "bg-amber-500/10",   iconText: "text-amber-400",   border: "border-amber-500/15",   hoverBorder: "hover:border-amber-400/50",   glow: "hover:shadow-[0_0_40px_-8px_rgba(245,158,11,0.45)]" },
  emerald: { bg: "from-emerald-500/5", iconBg: "bg-emerald-500/10", iconText: "text-emerald-400", border: "border-emerald-500/15", hoverBorder: "hover:border-emerald-400/50", glow: "hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.45)]" },
  rose:    { bg: "from-rose-500/5",    iconBg: "bg-rose-500/10",    iconText: "text-rose-400",    border: "border-rose-500/15",    hoverBorder: "hover:border-rose-400/50",    glow: "hover:shadow-[0_0_40px_-8px_rgba(244,63,94,0.45)]" },
  blue:    { bg: "from-blue-500/5",    iconBg: "bg-blue-500/10",    iconText: "text-blue-400",    border: "border-blue-500/15",    hoverBorder: "hover:border-blue-400/50",    glow: "hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.45)]" },
};

export function ValueGrid() {
  const { t } = useTranslation("landing");
  const features = t("value.features", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="producto" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
          {t("value.eyebrow")}
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Disenado para equipos que{" "}
          <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            calculan de verdad
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          {t("value.subtitle")}
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const cls = ACCENT_CLASSES[accent.color];
            const Icon = accent.icon;
            return (
              <div
                key={item.title}
                className={
                  "group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-slate-950/40 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 " +
                  cls.bg + " " + cls.border + " " + cls.hoverBorder + " " + cls.glow
                }
              >
                <div className={"mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border " + cls.border + " " + cls.iconBg + " " + cls.iconText}>
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
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
