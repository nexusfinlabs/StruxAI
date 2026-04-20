"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

export function ProductShowcase() {
  const { t } = useTranslation("landing");
  const nav = t("showcase.nav", { returnObjects: true }) as string[];

  // Animación: avanza un paso cada 1.6s, marca completados, reinicia al final
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const totalSteps = nav.length;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = prev + 1;
        if (next >= totalSteps) {
          // Reiniciar ciclo: pequeña pausa con todo verde, luego reset
          setCompleted(Array.from({ length: totalSteps }, (_, i) => i));
          setTimeout(() => {
            setCompleted([]);
            setActiveStep(0);
          }, 1600);
          return prev; // mantén el último activo durante la pausa
        }
        setCompleted((c) => [...new Set([...c, prev])]);
        return next;
      });
    }, 1600);
    return () => clearInterval(interval);
  }, [nav.length]);

  // Mapeo: cada item del sidebar → una barra (módulo nº de barras)
  const NUM_BARS = nav.length;

  const getBarState = (i: number): "completed" | "active" | "pending" => {
    if (completed.includes(i)) return "completed";
    if (i === activeStep) return "active";
    return "pending";
  };

  const getBarFill = (state: string) => {
    if (state === "completed") return "url(#barGreen)";
    if (state === "active") return "url(#barActive)";
    return "url(#barPending)";
  };

  const getBarOpacity = (state: string) => {
    if (state === "completed") return 1;
    if (state === "active") return 0.95;
    return 0.25;
  };

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
            {/* SIDEBAR ANIMADO */}
            <aside className="flex w-full flex-row gap-2 overflow-x-auto border-b border-slate-200/90 p-3 dark:border-white/10 lg:w-52 lg:flex-col lg:overflow-x-visible lg:border-b-0 lg:border-r lg:p-4">
              {nav.map((item, i) => {
                const state = getBarState(i);
                return (
                  <button
                    key={item}
                    type="button"
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-all duration-500 lg:text-sm ${
                      state === "active"
                        ? "bg-violet-600/15 text-violet-900 ring-1 ring-violet-400/40 dark:bg-violet-600/25 dark:text-white dark:ring-violet-400/30"
                        : state === "completed"
                        ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "text-slate-500 dark:text-slate-500"
                    }`}
                  >
                    {state === "completed" && (
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                    )}
                    {state === "active" && (
                      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-violet-500 animate-pulse" />
                    )}
                    <span className="truncate">{item}</span>
                  </button>
                );
              })}
            </aside>

            {/* VISTA 3D CON BARRAS ANIMADAS */}
            <div className="relative flex flex-1 flex-col">
              <div className="relative flex flex-1 items-stretch">
                {/* Eje MPa */}
                <div className="hidden w-12 flex-col justify-center border-r border-slate-200/90 bg-slate-50/90 py-6 text-[9px] text-slate-500 dark:border-white/10 dark:bg-slate-950/60 sm:flex">
                  <span className="mb-2 rotate-180 text-center [writing-mode:vertical-rl]">
                    MPa
                  </span>
                  <div className="mx-auto flex h-40 w-2 flex-col-reverse justify-between rounded-full bg-gradient-to-t from-blue-600 via-violet-500 to-rose-400 p-px">
                    <div className="flex-1 rounded-full bg-slate-200 dark:bg-slate-900" />
                  </div>
                </div>

                {/* Canvas con barras */}
                <div className="relative flex-1 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                  <div className="pointer-events-none absolute inset-0 grid-tech opacity-50 dark:opacity-40" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.12),transparent_45%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.2),transparent_45%)]" />
                  <svg
                    className="absolute inset-0 m-auto h-[85%] w-[80%] text-slate-400 dark:text-slate-600"
                    viewBox="0 0 400 360"
                    fill="none"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="barPending" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#fb7185" />
                      </linearGradient>
                      <linearGradient id="barActive" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#d946ef" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                      <linearGradient id="barGreen" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#6ee7b7" />
                      </linearGradient>
                    </defs>
                    {Array.from({ length: NUM_BARS }).map((_, i) => {
                      const state = getBarState(i);
                      const barHeight = 28;
                      const gap = 8;
                      const totalHeight = NUM_BARS * (barHeight + gap);
                      const yStart = (360 - totalHeight) / 2;
                      const baseWidth = 280;
                      const widthDecrement = 12;
                      const fullWidth = baseWidth - i * widthDecrement;
                      // Si pendiente: barra más corta. Si activa: animándose. Si completa: full.
                      const currentWidth =
                        state === "pending"
                          ? fullWidth * 0.4
                          : state === "active"
                          ? fullWidth * 0.85
                          : fullWidth;
                      return (
                        <rect
                          key={i}
                          x={50 + i * (widthDecrement / 2)}
                          y={yStart + i * (barHeight + gap)}
                          width={currentWidth}
                          height={barHeight}
                          stroke="currentColor"
                          strokeWidth="0.6"
                          fill={getBarFill(state)}
                          opacity={getBarOpacity(state)}
                          style={{
                            transition:
                              "width 1.2s ease-out, fill 0.6s ease-in-out, opacity 0.6s ease-in-out",
                          }}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute bottom-4 left-4 rounded-md border border-slate-200/90 bg-white/90 px-2 py-1 text-[10px] text-slate-600 backdrop-blur dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-400">
                    {t("showcase.overlay")}
                  </div>
                  {/* Indicador de paso actual */}
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-md border border-violet-300/40 bg-white/90 px-2.5 py-1 text-[10px] font-medium text-violet-700 backdrop-blur dark:border-violet-400/30 dark:bg-slate-950/80 dark:text-violet-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
                    {nav[activeStep] ?? nav[0]}
                  </div>
                </div>

                {/* Panel derecho de resumen */}
                <div className="w-full border-t border-slate-200/90 bg-slate-50/95 p-4 dark:border-white/10 dark:bg-slate-950/70 lg:w-72 lg:border-l lg:border-t-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-300">
                    {t("showcase.summary")}
                  </p>
                  <dl className="mt-3 space-y-2 text-[11px]">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <dt>{t("showcase.elements")}</dt>
                      <dd className="font-mono text-slate-900 dark:text-slate-200">4.582</dd>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <dt>{t("showcase.combinations")}</dt>
                      <dd className="font-mono text-slate-900 dark:text-slate-200">42</dd>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <dt>{t("showcase.duration")}</dt>
                      <dd className="font-mono text-slate-900 dark:text-slate-200">02:18:34</dd>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <dt>{t("showcase.state")}</dt>
                      <dd
                        className={`font-medium ${
                          completed.length === nav.length
                            ? "text-emerald-500"
                            : "text-violet-500"
                        }`}
                      >
                        {completed.length === nav.length
                          ? t("showcase.completed")
                          : `${completed.length}/${nav.length}`}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-4 border-t border-slate-200/80 pt-3 dark:border-white/10">
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {t("showcase.topAlerts")}
                    </p>
                    <ul className="mt-2 space-y-1 text-[10px] text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                        {t("showcase.alert1")}
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-400" />
                        {t("showcase.alert2")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
