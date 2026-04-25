"use client";

import { useState } from "react";
import { Building3DSection } from "@/components/landing/Building3DSection";
import { TimberBuildingSection } from "@/components/landing/TimberBuildingSection";

type CaseId = "hormigon" | "madera" | "hospital" | "puente" | "industrial" | "patrimonio";

type CaseDef = {
  id: CaseId;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  status: "active" | "soon";
  accent: "violet" | "emerald" | "cyan" | "amber" | "rose" | "blue";
};

const CASES: CaseDef[] = [
  {
    id: "hormigon",
    title: "Edificio residencial",
    subtitle: "Hormigon armado piramidal con voladizos asimetricos. 8 plantas, atico con piscina.",
    tag: "Hormigon armado",
    badge: "EHE-08 + NCSR-02",
    status: "active",
    accent: "violet",
  },
  {
    id: "madera",
    title: "Construccion CLT",
    subtitle: "Edificio de madera contralaminada Passivhaus con biomasa, fotovoltaica y jardin vertical.",
    tag: "Madera CLT",
    badge: "DB-SE-M + Eurocodigo 5",
    status: "active",
    accent: "emerald",
  },
  {
    id: "hospital",
    title: "Hospital antisismico",
    subtitle: "Aislacion basal de NCh 2745 con disipadores de energia. Continuidad de servicio post-sismo.",
    tag: "Aislacion sismica",
    badge: "AIS 701-24 + NCh 2745",
    status: "soon",
    accent: "cyan",
  },
  {
    id: "puente",
    title: "Puente atirantado",
    subtitle: "Estructura mixta acero-hormigon con verificacion dinamica de viento y oscilaciones.",
    tag: "Mixta acero-hormigon",
    badge: "EN 1994 + ASCE 7",
    status: "soon",
    accent: "amber",
  },
  {
    id: "industrial",
    title: "Nave industrial",
    subtitle: "Porticos de acero con cargas de grua puente. Diseno sismico industrial chileno.",
    tag: "Acero industrial",
    badge: "AISC 360 + NCh 2369",
    status: "soon",
    accent: "rose",
  },
  {
    id: "patrimonio",
    title: "Rehabilitacion patrimonial",
    subtitle: "Refuerzo de muros adobe y tapia. Verificacion vulnerabilidad mamposteria historica.",
    tag: "Patrimonio",
    badge: "AIS 610-EP + AIS 410",
    status: "soon",
    accent: "blue",
  },
];

const ACCENT_CLASSES: Record<CaseDef["accent"], { ring: string; text: string; bg: string; dot: string }> = {
  violet: { ring: "border-violet-500/40", text: "text-violet-300", bg: "bg-violet-500/10", dot: "bg-violet-400" },
  emerald: { ring: "border-emerald-500/40", text: "text-emerald-300", bg: "bg-emerald-500/10", dot: "bg-emerald-400" },
  cyan: { ring: "border-cyan-500/40", text: "text-cyan-300", bg: "bg-cyan-500/10", dot: "bg-cyan-400" },
  amber: { ring: "border-amber-500/40", text: "text-amber-300", bg: "bg-amber-500/10", dot: "bg-amber-400" },
  rose: { ring: "border-rose-500/40", text: "text-rose-300", bg: "bg-rose-500/10", dot: "bg-rose-400" },
  blue: { ring: "border-blue-500/40", text: "text-blue-300", bg: "bg-blue-500/10", dot: "bg-blue-400" },
};

export default function CasosDeUsoPage() {
  const [active, setActive] = useState<CaseId>("hormigon");
  const activeCase = CASES.find((c) => c.id === active)!;

  const onSelectCase = (id: CaseId) => {
    setActive(id);
    setTimeout(() => {
      const el = document.getElementById("case-content");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="relative border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-violet-300">
            <span>STRUXAI</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Casos de uso</span>
            <span className="ml-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-amber-300">interno - test</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Distintas tipologias,{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              un solo agente
            </span>
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Hormigon, madera, mixto, acero, patrimonio. STRUXAI lee el modelo analitico de Revit, identifica la jurisdiccion y mapea cada elemento contra la normativa que aplica. Click en un caso para explorarlo.
          </p>
        </div>
      </header>

      <section className="border-b border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Galeria de casos</h2>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              {CASES.filter((c) => c.status === "active").length} activos / {CASES.filter((c) => c.status === "soon").length} proximos
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CASES.map((c) => {
              const cls = ACCENT_CLASSES[c.accent];
              const isActive = active === c.id;
              const isSoon = c.status === "soon";
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  disabled={isSoon}
                  className={
                    "group relative flex flex-col items-start rounded-2xl border bg-slate-950/60 p-5 text-left transition " +
                    (isSoon
                      ? "cursor-not-allowed border-white/5 opacity-50"
                      : "hover:border-white/20 hover:bg-slate-900/60") +
                    (isActive ? " " + cls.ring + " bg-slate-900/80 ring-2 ring-offset-2 ring-offset-slate-950 " + cls.ring.replace("border", "ring") : " border-white/10")
                  }
                >
                  <div className="mb-3 flex w-full items-center justify-between">
                    <span className={"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest " + cls.bg + " " + cls.text}>
                      <span className={"h-1.5 w-1.5 rounded-full " + cls.dot}></span>
                      {c.tag}
                    </span>
                    {isSoon && (
                      <span className="rounded-full border border-slate-600 bg-slate-800/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-400">
                        Proximamente
                      </span>
                    )}
                    {isActive && !isSoon && (
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-emerald-300">
                        Viendo
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-tight">{c.title}</h3>
                  <p className="mb-4 flex-1 text-xs text-slate-400">{c.subtitle}</p>
                  <div className="font-mono text-[10px] text-slate-500">{c.badge}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/85 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Caso activo:</span>
          <div className="flex flex-wrap gap-2">
            {CASES.filter((c) => c.status === "active").map((c) => {
              const cls = ACCENT_CLASSES[c.accent];
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className={
                    "rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition " +
                    (isActive
                      ? cls.bg + " " + cls.ring + " " + cls.text
                      : "border-white/10 text-slate-400 hover:border-white/20 hover:text-white")
                  }
                >
                  {c.title}
                </button>
              );
            })}
          </div>
          <div className="ml-auto hidden items-center gap-2 font-mono text-[10px] text-slate-500 md:flex">
            <span>{activeCase.badge}</span>
          </div>
        </div>
      </section>

      <main id="case-content">
        {active === "hormigon" && <Building3DSection />}
        {active === "madera" && <TimberBuildingSection />}
        {(active === "hospital" || active === "puente" || active === "industrial" || active === "patrimonio") && (
          <SoonPlaceholder caseDef={activeCase} />
        )}
      </main>

      <footer className="border-t border-white/5 bg-slate-950 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center font-mono text-[10px] uppercase tracking-widest text-slate-600">
          STRUXAI - Pagina interna de testing - No indexada
        </div>
      </footer>
    </div>
  );
}

function SoonPlaceholder({ caseDef }: { caseDef: CaseDef }) {
  const cls = ACCENT_CLASSES[caseDef.accent];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className={"mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border " + cls.ring + " " + cls.bg}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls.text}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <div className={"mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest " + cls.bg + " " + cls.text}>
          {caseDef.tag}
        </div>
        <h2 className="mb-3 text-3xl font-bold">{caseDef.title}</h2>
        <p className="mb-6 text-slate-400">{caseDef.subtitle}</p>
        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-5 text-left">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Normativa principal aplicable</div>
          <div className={"font-mono text-sm " + cls.text}>{caseDef.badge}</div>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">Estado del caso</div>
          <div className="mt-1 text-sm text-slate-300">
            Demo 3D en preparacion. El agente STRUXAI ya soporta este tipo de tipologia, pero la visualizacion interactiva esta en cola para proximas iteraciones.
          </div>
        </div>
      </div>
    </section>
  );
}
