"use client";

import { useEffect, useRef, useState } from "react";
import { X, Activity, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";

type LogType = "info" | "processing" | "warn" | "ok" | "done";

const ANALYSIS_LOG: { t: string; msg: string; type: LogType }[] = [
  { t: "00:00:01", msg: "Cargando modelo IFC v2x3 - Torre_Oficinas_BCN.ifc", type: "info" },
  { t: "00:00:04", msg: "Parseo geometrico - 4.582 elementos detectados", type: "info" },
  { t: "00:00:12", msg: "Materiales auto-asignados - HA-30, S275JR, S450C", type: "info" },
  { t: "00:00:28", msg: "Generando malla FEM - 127.340 nodos", type: "info" },
  { t: "00:00:45", msg: "Cargas permanentes - G = 5,2 kN/m2 (forjado)", type: "info" },
  { t: "00:01:03", msg: "Cargas variables - Q = 3,0 kN/m2 (uso oficinas)", type: "info" },
  { t: "00:01:20", msg: "Generando 126 combinaciones ULS/SLS (CTE DB-SE)", type: "info" },
  { t: "00:01:45", msg: "Analisis sismico NCSE-02 - ag=0,08g - Zona baja", type: "info" },
  { t: "00:02:12", msg: "Iterando - calculo estatico lineal (Newton-Raphson)", type: "processing" },
  { t: "01:14:22", msg: "[!] Apoyo A-3 sin condicion de contorno definida", type: "warn" },
  { t: "01:45:08", msg: "[!] Viga B-15 - utilizacion 92% (EN 1993-1-1 6.2.5)", type: "warn" },
  { t: "02:05:17", msg: "[OK] Flecha maxima forjado 3 - L/632 (< L/500 CTE)", type: "ok" },
  { t: "02:18:34", msg: "[OK] ANALISIS COMPLETADO - 126/126 combinaciones OK", type: "done" },
];

const COMPLIANCE: { code: string; name: string; status: "ok" | "warn"; detail: string }[] = [
  { code: "CTE DB-SE", name: "Seguridad estructural - Bases de calculo", status: "ok", detail: "Combinaciones ULS/SLS verificadas" },
  { code: "CTE DB-SE-AE", name: "Acciones en la edificacion", status: "ok", detail: "Cargas gravitatorias, viento y nieve aplicadas" },
  { code: "EHE-08", name: "Instruccion hormigon estructural", status: "ok", detail: "Armado y durabilidad conforme" },
  { code: "EN 1993-1-1", name: "Eurocodigo 3 - Acero", status: "warn", detail: "2 perfiles al limite (92% utilizacion)" },
  { code: "EN 1992-1-1", name: "Eurocodigo 2 - Hormigon", status: "ok", detail: "gamma_c=1,5 - gamma_s=1,15" },
  { code: "NCSE-02", name: "Norma construccion sismorresistente", status: "ok", detail: "ag=0,08g - Ductilidad mu=2" },
  { code: "CTE DB-SI", name: "Seguridad en caso de incendio", status: "ok", detail: "R90 estructura principal" },
  { code: "CTE DB-SE-C", name: "Cimientos", status: "ok", detail: "Tension admisible 250 kPa" },
];

type ThreeRef = { building: any; frameId: number };

function Building3D({ tab }: { tab: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeRef = useRef<ThreeRef | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const loadScript = (src: string) =>
      new Promise<void>((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => res();
        s.onerror = () => rej(new Error("load fail"));
        document.head.appendChild(s);
      });

    let cleanup: (() => void) | null = null;
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js").then(() => {
      const THREE = (window as any).THREE;
      const canvas = canvasRef.current;
      if (!canvas || !THREE) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 1000);
      camera.position.set(16, 11, 16);
      camera.lookAt(0, 4, 0);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      scene.add(new THREE.AmbientLight(0x4a5c8f, 0.55));
      const key = new THREE.DirectionalLight(0x22d3ee, 0.9);
      key.position.set(10, 20, 10);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xa78bfa, 0.35);
      fill.position.set(-10, 5, -5);
      scene.add(fill);
      const grid = new THREE.GridHelper(20, 20, 0x22d3ee, 0x334155);
      grid.material.opacity = 0.35;
      grid.material.transparent = true;
      grid.position.y = -0.5;
      scene.add(grid);
      const building = new THREE.Group();
      const floors = 8;
      const fw = 5, fd = 5, fh = 1.2;
      const stressColors = [0x22d3ee, 0x38bdf8, 0x818cf8, 0xa78bfa, 0xc084fc, 0xe879f9, 0xf472b6, 0xfb7185];
      for (let i = 0; i < floors; i++) {
        const slabGeo = new THREE.BoxGeometry(fw, 0.15, fd);
        const slabMat = new THREE.MeshStandardMaterial({
          color: stressColors[i], emissive: stressColors[i],
          emissiveIntensity: 0.3, roughness: 0.3, metalness: 0.5,
        });
        const slab = new THREE.Mesh(slabGeo, slabMat);
        slab.position.y = i * fh;
        building.add(slab);
        const colGeo = new THREE.BoxGeometry(0.22, fh, 0.22);
        const colMat = new THREE.MeshStandardMaterial({
          color: 0x475569, emissive: 0x22d3ee,
          emissiveIntensity: 0.15, metalness: 0.8, roughness: 0.3,
        });
        const corners = [
          [fw/2 - 0.3, -fh/2, fd/2 - 0.3],
          [-fw/2 + 0.3, -fh/2, fd/2 - 0.3],
          [fw/2 - 0.3, -fh/2, -fd/2 + 0.3],
          [-fw/2 + 0.3, -fh/2, -fd/2 + 0.3],
        ];
        corners.forEach((p) => {
          const c = new THREE.Mesh(colGeo, colMat);
          c.position.set(p[0], i * fh + p[1], p[2]);
          building.add(c);
        });
        const edges = new THREE.EdgesGeometry(slabGeo);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, opacity: 0.5, transparent: true });
        const line = new THREE.LineSegments(edges, lineMat);
        line.position.copy(slab.position);
        building.add(line);
      }
      const roofGeo = new THREE.BoxGeometry(fw * 0.8, 0.3, fd * 0.8);
      const roofMat = new THREE.MeshStandardMaterial({
        color: 0x64748b, emissive: 0xa78bfa, emissiveIntensity: 0.2, metalness: 0.6,
      });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = floors * fh + 0.2;
      building.add(roof);
      scene.add(building);
      threeRef.current = { building, frameId: 0 };
      setReady(true);
      let rot = 0;
      const animate = () => {
        rot += 0.003;
        building.rotation.y = rot;
        renderer.render(scene, camera);
        if (threeRef.current) {
          threeRef.current.frameId = requestAnimationFrame(animate);
        }
      };
      animate();
      const resize = () => {
        if (!canvas) return;
        const W = canvas.clientWidth, H = canvas.clientHeight;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H, false);
      };
      window.addEventListener("resize", resize);
      cleanup = () => {
        window.removeEventListener("resize", resize);
        if (threeRef.current) cancelAnimationFrame(threeRef.current.frameId);
      };
    });
    return () => {
      if (cleanup) cleanup();
      if (threeRef.current) cancelAnimationFrame(threeRef.current.frameId);
    };
  }, []);

  useEffect(() => {
    if (!threeRef.current || !ready) return;
    const palettes: Record<string, number[]> = {
      vista: [0x22d3ee, 0x38bdf8, 0x818cf8, 0xa78bfa, 0xc084fc, 0xe879f9, 0xf472b6, 0xfb7185],
      esfuerzos: [0x10b981, 0x34d399, 0xa7f3d0, 0xfde68a, 0xfbbf24, 0xf59e0b, 0xf87171, 0xdc2626],
      deformada: [0x1e3a8a, 0x3b82f6, 0x60a5fa, 0x93c5fd, 0xbfdbfe, 0xdbeafe, 0xeff6ff, 0xfef3c7],
      utilizacion: [0x065f46, 0x047857, 0x059669, 0x10b981, 0xfbbf24, 0xf59e0b, 0xdc2626, 0x991b1b],
    };
    const colors = palettes[tab] || palettes.vista;
    let floorIdx = 0;
    const bld = threeRef.current.building;
    bld.children.forEach((child: any) => {
      if (child.geometry && child.geometry.type === "BoxGeometry" && child.geometry.parameters.height === 0.15) {
        child.material.color.setHex(colors[floorIdx] || 0x22d3ee);
        child.material.emissive.setHex(colors[floorIdx] || 0x22d3ee);
        floorIdx++;
      }
    });
  }, [tab, ready]);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}

export function ProyectoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [visibleLogs, setVisibleLogs] = useState<typeof ANALYSIS_LOG>([]);
  const [tab, setTab] = useState<string>("vista");
  const [isComplete, setIsComplete] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setVisibleLogs([]);
      setIsComplete(false);
      setTab("vista");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i < ANALYSIS_LOG.length) {
        setVisibleLogs((prev) => [...prev, ANALYSIS_LOG[i]]);
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 1600);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [visibleLogs]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const tabColors: Record<string, string> = {
    vista: "from-violet-600 to-cyan-600",
    esfuerzos: "from-amber-500 to-rose-600",
    deformada: "from-blue-600 to-indigo-600",
    utilizacion: "from-emerald-600 to-rose-600",
  };
  const tabList = ["vista", "esfuerzos", "deformada", "utilizacion"];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-slate-950/85 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 my-auto"
      >
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-5 sm:px-8">
          <div>
            <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
              PROYECTO - ANALISIS ESTRUCTURAL
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Torre Oficinas{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                  BCN-V12
                </span>
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={"hidden sm:flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider " + (isComplete ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-300" : "border-amber-400/40 bg-amber-500/10 text-amber-300")}>
              <span className={"h-1.5 w-1.5 rounded-full " + (isComplete ? "bg-emerald-400" : "bg-amber-400 animate-pulse")} />
              {isComplete ? "COMPLETADO" : "CALCULANDO"}
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 border-b border-white/10 px-6 py-5 sm:grid-cols-4 sm:gap-6 sm:px-8 sm:py-6">
          {[
            { label: "ELEMENTOS", value: "4.582", color: "text-white" },
            { label: "COMBINACIONES", value: "126", color: "text-white" },
            { label: "TIEMPO CALCULO", value: "02:18:34", color: "text-cyan-300" },
            { label: "UTILIZACION MAX", value: "92%", color: "text-amber-300" },
          ].map((k, i) => (
            <div key={i}>
              <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{k.label}</div>
              <div className={"text-2xl font-bold sm:text-3xl " + k.color}>{k.value}</div>
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative h-[440px] border-b border-white/10 lg:h-[520px] lg:border-b-0 lg:border-r">
            <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-1 rounded-lg border border-white/10 bg-slate-950/70 p-1 backdrop-blur-md">
              {tabList.map((tname) => (
                <button
                  key={tname}
                  onClick={() => setTab(tname)}
                  className={"rounded-md px-3 py-1.5 text-xs font-semibold capitalize " + (tab === tname ? "bg-gradient-to-r " + tabColors[tname] + " text-white" : "text-slate-400 hover:text-white")}
                >
                  {tname}
                </button>
              ))}
            </div>
            <Building3D tab={tab} />
            <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/75 p-3 backdrop-blur-md">
              <div className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">sigma (MPa)</div>
              <div className="flex h-14 items-end gap-0.5">
                {[0x22d3ee, 0x818cf8, 0xa78bfa, 0xe879f9, 0xf472b6].map((c, i) => (
                  <div key={i} className="w-3" style={{ height: (i+1)*18+15 + "%", background: "#" + c.toString(16).padStart(6, "0") }} />
                ))}
              </div>
              <div className="mt-1 flex justify-between font-mono text-[9px] text-slate-500">
                <span>0</span><span>42.5</span>
              </div>
            </div>
          </div>

          <div className="relative bg-slate-950/40 p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
                <Cpu className="h-4 w-4 text-slate-950" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">STRUXAI Copilot</div>
                <div className="font-mono text-[10px] text-slate-500">agente-estructural - v12.4</div>
              </div>
            </div>
            <div className="h-[360px] overflow-y-auto font-mono text-[11px] leading-relaxed lg:h-[400px]">
              {visibleLogs.filter((l: any) => l && l.type).map((log, i) => {
                const colorMap: Record<LogType, string> = {
                  info: "text-slate-400", processing: "text-cyan-300",
                  warn: "text-amber-300", ok: "text-emerald-300", done: "text-emerald-400 font-semibold",
                };
                return (
                  <div key={i} className={"mb-1.5 animate-fade-in-up " + (colorMap[log.type] || "text-slate-400")}>
                    <span className="mr-2 text-slate-600">{log.t}</span>
                    <span>{log.msg}</span>
                  </div>
                );
              })}
              {!isComplete && (
                <div className="mt-2 text-cyan-400">
                  <span className="animate-blink">{"\u258A"}</span>
                </div>
              )}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 px-6 py-6 sm:px-8 sm:py-8">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400">
            COMPLIANCE - NORMATIVA APLICABLE
          </div>
          <div className="mb-5 text-xl font-semibold text-white sm:text-2xl">
            Verificacion conforme a{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Codigo Tecnico de la Edificacion
            </span>{" "}
            y Eurocodigos
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {COMPLIANCE.map((c, i) => {
              const ok = c.status === "ok";
              const Icon = ok ? CheckCircle2 : AlertTriangle;
              return (
                <div key={i} className={"flex items-start gap-3 rounded-lg border border-l-2 bg-white/5 p-3 " + (ok ? "border-white/10 border-l-emerald-400" : "border-white/10 border-l-amber-400")}>
                  <div className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-md " + (ok ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300")}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center justify-between gap-2">
                      <span className={"font-mono text-xs font-bold " + (ok ? "text-emerald-300" : "text-amber-300")}>{c.code}</span>
                      <span className={"font-mono text-[9px] font-semibold uppercase tracking-[0.15em] " + (ok ? "text-emerald-400" : "text-amber-400")}>
                        {ok ? "CUMPLE" : "REVISAR"}
                      </span>
                    </div>
                    <div className="text-sm text-slate-200">{c.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{c.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/5 px-6 py-5 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Activity className="h-4 w-4 text-violet-400" />
              <span>Demo interactiva - datos simulados para presentacion</span>
            </div>
            
            <a
              href="mailto:palacio.laura@gmail.com?subject=Interesado%20en%20STRUXAI"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:from-violet-500 hover:to-blue-500"
            >
              Pedir demo con mi proyecto real
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
