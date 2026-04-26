"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useTranslation } from "react-i18next";
import { Download, FileText, ExternalLink } from "lucide-react";

interface Section {
  id: string;
  title: string;
  jurisdiction: "es" | "usa" | "au" | "cl" | "co" | "intl" | "general";
}

const SECTIONS_ES: Section[] = [
  { id: "tabla-de-contenidos", title: "Tabla de contenidos", jurisdiction: "general" },
  { id: "espana-marco-legal-base", title: "Espana - Marco legal base", jurisdiction: "es" },
  { id: "espana-codigo-tecnico-cte", title: "Espana - CTE", jurisdiction: "es" },
  { id: "espana-hormigon-ehe-08", title: "Espana - Hormigon EHE-08", jurisdiction: "es" },
  { id: "espana-madera-y-clt", title: "Espana - Madera y CLT", jurisdiction: "es" },
  { id: "espana-sismica-ncsr-02", title: "Espana - Sismica NCSR-02", jurisdiction: "es" },
  { id: "espana-eurocodigos", title: "Espana - Eurocodigos", jurisdiction: "es" },
  { id: "espana-instalaciones-termicas-y-renovables", title: "Espana - Termicas y renovables", jurisdiction: "es" },
  { id: "espana-sostenibilidad", title: "Espana - Sostenibilidad", jurisdiction: "es" },
  { id: "internacional-resumen-comparativo", title: "Resumen internacional", jurisdiction: "intl" },
  { id: "usa-ibc-asce-7-aci-318", title: "USA - IBC + ASCE 7 + ACI 318", jurisdiction: "usa" },
  { id: "australia-ncc-asnzs", title: "Australia - NCC + AS/NZS", jurisdiction: "au" },
  { id: "chile-oguc-nch-ds-60-61", title: "Chile - OGUC + NCh + DS", jurisdiction: "cl" },
  { id: "colombia-nsr-10-ley-400-ais", title: "Colombia - NSR-10 + AIS", jurisdiction: "co" },
  { id: "mapeo-cruzado-por-familia-normativa", title: "Mapeo cruzado", jurisdiction: "intl" },
  { id: "glosario", title: "Glosario", jurisdiction: "general" },
  { id: "como-lo-verifica-struxai", title: "Como lo verifica STRUXAI", jurisdiction: "general" },
];

const SECTIONS_EN: Section[] = [
  { id: "table-of-contents", title: "Table of contents", jurisdiction: "general" },
  { id: "spain-base-legal-framework", title: "Spain - Base legal framework", jurisdiction: "es" },
  { id: "spain-technical-building-code-cte", title: "Spain - CTE", jurisdiction: "es" },
  { id: "spain-concrete-ehe-08", title: "Spain - Concrete EHE-08", jurisdiction: "es" },
  { id: "spain-timber-and-clt", title: "Spain - Timber and CLT", jurisdiction: "es" },
  { id: "spain-seismic-ncsr-02", title: "Spain - Seismic NCSR-02", jurisdiction: "es" },
  { id: "spain-eurocodes", title: "Spain - Eurocodes", jurisdiction: "es" },
  { id: "spain-thermal-installations-and-renewables", title: "Spain - Thermal and renewables", jurisdiction: "es" },
  { id: "spain-sustainability", title: "Spain - Sustainability", jurisdiction: "es" },
  { id: "international-comparative-summary", title: "International summary", jurisdiction: "intl" },
  { id: "usa-ibc-asce-7-aci-318", title: "USA - IBC + ASCE 7 + ACI 318", jurisdiction: "usa" },
  { id: "australia-ncc-asnzs", title: "Australia - NCC + AS/NZS", jurisdiction: "au" },
  { id: "chile-oguc-nch-ds-60-61", title: "Chile - OGUC + NCh + DS", jurisdiction: "cl" },
  { id: "colombia-nsr-10-law-400-ais", title: "Colombia - NSR-10 + AIS", jurisdiction: "co" },
  { id: "cross-mapping-by-regulatory-family", title: "Cross-mapping", jurisdiction: "intl" },
  { id: "glossary", title: "Glossary", jurisdiction: "general" },
  { id: "how-does-struxai-verify-it", title: "How STRUXAI verifies", jurisdiction: "general" },
];

const JURISDICTIONS_ES = [
  { id: "all", label: "Todas" },
  { id: "es", label: "Espana", flag: "ES" },
  { id: "usa", label: "USA", flag: "US" },
  { id: "au", label: "Australia", flag: "AU" },
  { id: "cl", label: "Chile", flag: "CL" },
  { id: "co", label: "Colombia", flag: "CO" },
];
const JURISDICTIONS_EN = [
  { id: "all", label: "All" },
  { id: "es", label: "Spain", flag: "ES" },
  { id: "usa", label: "USA", flag: "US" },
  { id: "au", label: "Australia", flag: "AU" },
  { id: "cl", label: "Chile", flag: "CL" },
  { id: "co", label: "Colombia", flag: "CO" },
];

export function NormativaPage({ contentEs, contentEn }: { contentEs: string; contentEn: string }) {
  const { i18n } = useTranslation("landing");
  const isEn = i18n.language === "en";
  const content = isEn ? contentEn : contentEs;
  const sections = isEn ? SECTIONS_EN : SECTIONS_ES;
  const jurisdictions = isEn ? JURISDICTIONS_EN : JURISDICTIONS_ES;

  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const handler = () => {
      const headings = document.querySelectorAll("h2[id], h1[id]");
      let current = sections[0].id;
      for (const h of Array.from(headings)) {
        const top = h.getBoundingClientRect().top;
        if (top < 200) current = h.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [sections]);

  const visibleSections = filter === "all"
    ? sections
    : sections.filter((s) => s.jurisdiction === filter || s.jurisdiction === "general" || s.jurisdiction === "intl");

  const pdfUrl = isEn ? "/normativa/STRUXAI_regulations_EN.pdf" : "/normativa/STRUXAI_normativa_ES.pdf";
  const mdUrl = isEn ? "/normativa/STRUXAI_regulations_EN.md" : "/normativa/STRUXAI_normativa_ES.md";

  return (
    <main className="relative min-h-screen bg-slate-950 pt-24 pb-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.10),_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {isEn ? "Living document - April 2026" : "Documento vivo - Abril 2026"}
          </span>
          <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {isEn ? "Applicable" : "Normativas"}{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              {isEn ? "Regulations" : "aplicables"}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-slate-400">
            {isEn
              ? "Complete regulatory framework for the calculation, verification and sustainable construction of buildings. Covers Spain, USA, Australia, Chile and Colombia."
              : "Marco regulatorio completo del calculo, verificacion y construccion sostenible de edificios. Cubre Espana, Estados Unidos, Australia, Chile y Colombia."}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-4px_rgba(6,182,212,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_36px_-4px_rgba(20,184,166,0.7)]"
            >
              <Download className="h-4 w-4" />
              {isEn ? "Download PDF" : "Descargar PDF"}
            </a>
            <a
              href={mdUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-violet-500/10 px-5 py-2.5 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"
            >
              <FileText className="h-4 w-4" />
              {isEn ? "Download Markdown" : "Descargar Markdown"}
            </a>
            <a
              href="https://github.com/nexusfinlabs/struxai-docs"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/40 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800/60"
            >
              <ExternalLink className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </header>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {jurisdictions.map((j) => (
            <button
              key={j.id}
              type="button"
              onClick={() => setFilter(j.id)}
              className={
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition " +
                (filter === j.id
                  ? "border-cyan-400/60 bg-cyan-500/15 text-cyan-300"
                  : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white")
              }
            >
              {j.flag && <span className="opacity-70">{j.flag}</span>}
              {j.label}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                {isEn ? "On this page" : "En esta pagina"}
              </div>
              <nav className="space-y-1">
                {visibleSections.map((s) => {
                  const isActive = s.id === activeSection;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={
                        "block rounded-lg border-l-2 px-3 py-1.5 text-xs leading-snug transition " +
                        (isActive
                          ? "border-l-cyan-400 bg-cyan-500/10 font-medium text-cyan-200"
                          : "border-l-transparent text-slate-400 hover:border-l-slate-500 hover:bg-white/[0.03] hover:text-slate-200")
                      }
                    >
                      {s.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h2:mt-12 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 prose-h2:text-2xl prose-h2:font-bold prose-h2:text-white prose-h3:text-lg prose-h3:font-semibold prose-h3:text-cyan-200 prose-p:text-slate-300 prose-strong:text-white prose-li:text-slate-300 prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-white/10 prose-table:bg-slate-900/30 prose-th:border-b prose-th:border-white/10 prose-th:bg-slate-800/40 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-xs prose-th:font-semibold prose-th:uppercase prose-th:tracking-wider prose-th:text-slate-300 prose-td:border-b prose-td:border-white/5 prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:text-slate-300 prose-blockquote:border-l-cyan-400 prose-blockquote:bg-cyan-500/5 prose-blockquote:px-4 prose-blockquote:py-1 prose-blockquote:not-italic prose-code:rounded prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-cyan-300 prose-code:before:content-none prose-code:after:content-none prose-a:text-cyan-300 hover:prose-a:text-cyan-200">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
}
