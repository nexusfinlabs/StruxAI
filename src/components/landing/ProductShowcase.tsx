"use client";

import { useEffect, useState } from "react";

type RevStatus = "current" | "approved" | "older";
type FindingSeverity = "critical" | "major" | "minor" | "fixed";
type SolverStatus = "done" | "running" | "queued" | "failed";

type Revision = {
  id: string;
  date: string;
  author: string;
  comment: string;
  status: RevStatus;
  totalElements: number;
  criticalCount: number;
  majorCount: number;
  minorCount: number;
};

type Finding = {
  element: string;
  type: string;
  metric: string;
  before: string;
  after: string;
  delta: string;
  severity: FindingSeverity;
  article: string;
};

type Solver = {
  name: string;
  status: SolverStatus;
  detail: string;
};

const REVISIONS: Revision[] = [
  { id: "V12", date: "2026-04-25 09:14", author: "L. Palacio", comment: "Refuerzo P12-N3 + ajuste voladizo Atico", status: "current", totalElements: 4582, criticalCount: 0, majorCount: 5, minorCount: 7 },
  { id: "V11", date: "2026-04-22 17:42", author: "L. Palacio", comment: "Recalculo NCSR-02 zona D", status: "approved", totalElements: 4582, criticalCount: 3, majorCount: 8, minorCount: 12 },
  { id: "V10", date: "2026-04-19 11:28", author: "A. Lobo", comment: "Modelo analitico inicial desde Revit", status: "older", totalElements: 4521, criticalCount: 7, majorCount: 14, minorCount: 18 },
  { id: "V09", date: "2026-04-15 16:05", author: "L. Palacio", comment: "Pre-revision arquitectura", status: "older", totalElements: 4498, criticalCount: 12, majorCount: 22, minorCount: 24 },
];

const FINDINGS: Finding[] = [
  { element: "Pilar P12-N3", type: "ELU compresion", metric: "utilizacion", before: "94%", after: "89%", delta: "-5", severity: "fixed", article: "EHE-08 Art. 50" },
  { element: "Forjado F3-Atico", type: "ELS flecha", metric: "L/250", before: "L/210", after: "L/268", delta: "OK", severity: "fixed", article: "EHE-08 Art. 42" },
  { element: "Voladizo P5-Este", type: "ELU flexion", metric: "Md/MRd", before: "1.04", after: "0.96", delta: "OK", severity: "fixed", article: "EHE-08 Art. 44" },
  { element: "Pilar P08-N1", type: "ELU pandeo", metric: "utilizacion", before: "82%", after: "84%", delta: "+2", severity: "major", article: "EHE-08 Art. 49" },
  { element: "Losa Atico", type: "Punzonamiento", metric: "Vd/Vu", before: "0.78", after: "0.81", delta: "+3", severity: "major", article: "EHE-08 Art. 46" },
  { element: "Nudo L4-E", type: "Rigidez", metric: "kN/mm", before: "anomala", after: "revisar", delta: "-", severity: "minor", article: "DB-SE 4.3.3" },
  { element: "Forjado F2-cocina", type: "Sobrecarga uso", metric: "kN/m2", before: "duplicada", after: "ajustada", delta: "OK", severity: "fixed", article: "DB-SE-AE 3.1" },
];

const SOLVERS: Solver[] = [
  { name: "SAP2000", status: "done", detail: "v25.3 - 02:18:34 - Iter 8 OK" },
  { name: "ETABS", status: "done", detail: "v22.1 - 01:54:12 - cross-check OK" },
  { name: "CYPECAD", status: "running", detail: "v2026 - en proceso..." },
  { name: "OpenSees", status: "queued", detail: "verificacion sismica" },
];

const SEVERITY_CFG: Record<FindingSeverity, { label: string; cls: string; dot: string }> = {
  critical: { label: "CRITICO", cls: "text-red-300", dot: "bg-red-500" },
  major: { label: "REVISAR", cls: "text-amber-300", dot: "bg-amber-400" },
  minor: { label: "MENOR", cls: "text-slate-400", dot: "bg-slate-500" },
  fixed: { label: "RESUELTO", cls: "text-emerald-300", dot: "bg-emerald-400" },
};

const REV_CFG: Record<RevStatus, { label: string; cls: string }> = {
  current: { label: "EN REVISION", cls: "text-cyan-300" },
  approved: { label: "APROBADA", cls: "text-emerald-300" },
  older: { label: "ARCHIVO", cls: "text-slate-500" },
};

const SOLVER_CFG: Record<SolverStatus, { label: string; cls: string; dot: string }> = {
  done: { label: "DONE", cls: "text-emerald-300", dot: "bg-emerald-400" },
  running: { label: "RUNNING", cls: "text-cyan-300", dot: "bg-cyan-400 animate-pulse" },
  queued: { label: "QUEUED", cls: "text-slate-400", dot: "bg-slate-500" },
  failed: { label: "FAILED", cls: "text-red-300", dot: "bg-red-500" },
};

export function ProductShowcase() {
  const [activeRev, setActiveRev] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1500);
    return () => clearInterval(t);
  }, []);

  const cur = REVISIONS[activeRev];
  const showFindings = activeRev === 0 ? FINDINGS : FINDINGS.slice(0, 4 + (activeRev % 3));

  return (
    <section className="border-t border-white/5 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"></span>
            QA Cockpit
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un cockpit tecnico para cada{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              revision
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Compara versiones del proyecto, audita hallazgos por elemento estructural y vigila el estado de los motores de calculo en tiempo real. Trazabilidad completa entre BIM y FEM.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_0_80px_-30px_rgba(6,182,212,0.4)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/80 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                struxai - proyecto residencial Eixample / 8 plantas
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Sincronizado con Revit
              </span>
              <span className="hidden sm:inline">v12 - hace {tick % 60}s</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <aside className="border-b border-white/10 lg:col-span-3 lg:border-b-0 lg:border-r">
              <div className="border-b border-white/5 px-4 py-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Revisiones del proyecto</div>
                <div className="mt-1 font-mono text-[11px] text-slate-300">{REVISIONS.length} versiones</div>
              </div>
              <div className="max-h-[480px] overflow-y-auto">
                {REVISIONS.map((rev, i) => {
                  const cfg = REV_CFG[rev.status];
                  const isActive = i === activeRev;
                  return (
                    <button
                      key={rev.id}
                      onClick={() => setActiveRev(i)}
                      className={
                        "flex w-full flex-col items-start border-b border-white/5 px-4 py-3 text-left transition " +
                        (isActive
                          ? "bg-cyan-500/10 border-l-2 border-l-cyan-400"
                          : "hover:bg-white/[0.03] border-l-2 border-l-transparent")
                      }
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className={"font-mono text-sm font-bold " + (isActive ? "text-white" : "text-slate-300")}>
                          {rev.id}
                        </span>
                        <span className={"font-mono text-[9px] uppercase tracking-widest " + cfg.cls}>
                          {cfg.label}
                        </span>
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-slate-500">
                        {rev.date}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-slate-400">
                        {rev.author}
                      </div>
                      <div className="mt-1.5 line-clamp-2 text-[11px] text-slate-400">
                        {rev.comment}
                      </div>
                      <div className="mt-2 flex gap-2 font-mono text-[9px]">
                        {rev.criticalCount > 0 && (
                          <span className="text-red-300">{rev.criticalCount} crit</span>
                        )}
                        {rev.majorCount > 0 && (
                          <span className="text-amber-300">{rev.majorCount} maj</span>
                        )}
                        <span className="text-slate-500">{rev.minorCount} min</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="lg:col-span-6 lg:border-r lg:border-white/10">
              <div className="border-b border-white/5 px-5 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Hallazgos por elemento</div>
                    <div className="mt-0.5 font-mono text-sm text-white">
                      {cur.id} - {cur.totalElements.toLocaleString("es-ES")} elementos analizados
                    </div>
                  </div>
                  <div className="flex gap-2 font-mono text-[10px]">
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
                      {showFindings.filter((f) => f.severity === "fixed").length} resueltos
                    </span>
                    <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-amber-300">
                      {showFindings.filter((f) => f.severity === "major").length} revisar
                    </span>
                  </div>
                </div>
              </div>

              <div className="max-h-[480px] divide-y divide-white/5 overflow-y-auto">
                {showFindings.map((f, i) => {
                  const sev = SEVERITY_CFG[f.severity];
                  return (
                    <div key={i} className="px-5 py-3 transition hover:bg-white/[0.02]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={"h-1.5 w-1.5 shrink-0 rounded-full " + sev.dot} />
                            <span className="font-mono text-sm font-semibold text-white">{f.element}</span>
                            <span className={"font-mono text-[9px] uppercase tracking-widest " + sev.cls}>
                              {sev.label}
                            </span>
                          </div>
                          <div className="mt-1 font-mono text-[10px] text-slate-500">
                            {f.type} - {f.metric}
                          </div>
                          <div className="mt-2 flex items-center gap-3 font-mono text-[11px]">
                            <span className="text-slate-500">v{REVISIONS[Math.min(activeRev + 1, REVISIONS.length - 1)].id.slice(1)}:</span>
                            <span className="text-slate-400">{f.before}</span>
                            <span className="text-slate-600">-&gt;</span>
                            <span className="text-slate-500">{cur.id}:</span>
                            <span className={f.severity === "fixed" ? "text-emerald-300" : "text-white"}>{f.after}</span>
                            {f.delta !== "-" && (
                              <span className={
                                "ml-auto rounded px-1.5 py-0.5 font-mono text-[9px] " +
                                (f.delta === "OK"
                                  ? "bg-emerald-500/15 text-emerald-300"
                                  : f.delta.startsWith("-")
                                  ? "bg-emerald-500/10 text-emerald-300"
                                  : "bg-amber-500/10 text-amber-300")
                              }>
                                {f.delta === "OK" ? "OK" : f.delta + "%"}
                              </span>
                            )}
                          </div>
                          <div className="mt-1.5 font-mono text-[10px] text-cyan-400">
                            {f.article}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="border-t border-white/10 lg:col-span-3 lg:border-t-0">
              <div className="border-b border-white/5 px-4 py-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">KPIs de la revision</div>
              </div>

              <div className="space-y-3 border-b border-white/5 px-4 py-4">
                <KPI label="Elementos" value={cur.totalElements.toLocaleString("es-ES")} accent="cyan" />
                <KPI label="Criticos" value={String(cur.criticalCount)} accent={cur.criticalCount === 0 ? "emerald" : "red"} />
                <KPI label="A revisar" value={String(cur.majorCount)} accent="amber" />
                <KPI label="Trazabilidad" value="100%" accent="emerald" />
              </div>

              <div className="border-b border-white/5 px-4 py-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Motores de calculo</div>
              </div>
              <div className="space-y-2 px-4 py-3">
                {SOLVERS.map((s) => {
                  const cfg = SOLVER_CFG[s.status];
                  return (
                    <div key={s.name} className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-white">{s.name}</span>
                        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest">
                          <span className={"h-1.5 w-1.5 rounded-full " + cfg.dot} />
                          <span className={cfg.cls}>{cfg.label}</span>
                        </span>
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-slate-500">{s.detail}</div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-white/10 bg-slate-950/60 px-4 py-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Entregables</div>
                <div className="mt-2 flex flex-col gap-1.5 font-mono text-[10px]">
                  <span className="flex items-center gap-2 text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Memoria_Tecnica_v12.pdf
                  </span>
                  <span className="flex items-center gap-2 text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    Planos_Estructura_v12.dxf
                  </span>
                  <span className="flex items-center gap-2 text-cyan-300">
                    <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
                    IFC_Resultados_v12.ifc
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function KPI({ label, value, accent }: { label: string; value: string; accent: "cyan" | "amber" | "emerald" | "red" }) {
  const cls = {
    cyan: "text-cyan-300",
    amber: "text-amber-300",
    emerald: "text-emerald-300",
    red: "text-red-300",
  }[accent];
  return (
    <div className="flex items-baseline justify-between">
      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{label}</span>
      <span className={"font-mono text-base font-bold " + cls}>{value}</span>
    </div>
  );
}
