"use client";

import { useTranslation } from "react-i18next";
import { Building2, Hammer, GitCompare, Layers3, Briefcase, Users } from "lucide-react";

const ACCENTS = [
  { color: "cyan", icon: Building2 },
  { color: "amber", icon: Hammer },
  { color: "violet", icon: GitCompare },
  { color: "emerald", icon: Layers3 },
  { color: "rose", icon: Briefcase },
  { color: "blue", icon: Users },
] as const;

const ACCENT_CLASSES: Record<string, { bg: string; iconBg: string; iconText: string; border: string; hoverBorder: string; glow: string; text: string }> = {
  cyan:    { bg: "from-cyan-500/5",    iconBg: "bg-cyan-500/10",    iconText: "text-cyan-400",    border: "border-cyan-500/15",    hoverBorder: "hover:border-cyan-400/50",    glow: "hover:shadow-[0_0_40px_-8px_rgba(6,182,212,0.45)]",    text: "text-cyan-300" },
  amber:   { bg: "from-amber-500/5",   iconBg: "bg-amber-500/10",   iconText: "text-amber-400",   border: "border-amber-500/15",   hoverBorder: "hover:border-amber-400/50",   glow: "hover:shadow-[0_0_40px_-8px_rgba(245,158,11,0.45)]",   text: "text-amber-300" },
  violet:  { bg: "from-violet-500/5",  iconBg: "bg-violet-500/10",  iconText: "text-violet-400",  border: "border-violet-500/15",  hoverBorder: "hover:border-violet-400/50",  glow: "hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.45)]",  text: "text-violet-300" },
  emerald: { bg: "from-emerald-500/5", iconBg: "bg-emerald-500/10", iconText: "text-emerald-400", border: "border-emerald-500/15", hoverBorder: "hover:border-emerald-400/50", glow: "hover:shadow-[0_0_40px_-8px_rgba(16,185,129,0.45)]", text: "text-emerald-300" },
  rose:    { bg: "from-rose-500/5",    iconBg: "bg-rose-500/10",    iconText: "text-rose-400",    border: "border-rose-500/15",    hoverBorder: "hover:border-rose-400/50",    glow: "hover:shadow-[0_0_40px_-8px_rgba(244,63,94,0.45)]",    text: "text-rose-300" },
  blue:    { bg: "from-blue-500/5",    iconBg: "bg-blue-500/10",    iconText: "text-blue-400",    border: "border-blue-500/15",    hoverBorder: "hover:border-blue-400/50",    glow: "hover:shadow-[0_0_40px_-8px_rgba(59,130,246,0.45)]",    text: "text-blue-300" },
};

export function UseCasesSection() {
  const { t } = useTranslation("landing");
  const cases = t("cases.items", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="casos" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Pensado para edificacion y{" "}
          <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            estructuras no estandar
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          {t("cases.subtitle")}
        </p>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            const cls = ACCENT_CLASSES[accent.color];
            const Icon = accent.icon;
            return (
              <article
                key={c.title}
                className={
                  "group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-slate-950/40 p-5 transition-all duration-300 " +
                  cls.bg + " " + cls.border + " " + cls.hoverBorder + " " + cls.glow +
                  " hover:-translate-y-1"
                }
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                     style={{ background: 'currentColor' }} />
                <div className={"relative mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border " + cls.border + " " + cls.iconBg + " " + cls.iconText}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative text-base font-semibold text-white transition group-hover:translate-x-0.5">
                  {c.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-400">
                  {c.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
