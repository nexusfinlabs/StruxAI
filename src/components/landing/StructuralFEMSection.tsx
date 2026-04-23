"use client";

import { useEffect, useRef, useState } from "react";

type Status = "ok" | "pending" | "fail";
type ElementType = "pilar" | "viga" | "forjado";
type ElementStatus = "ok" | "warn" | "crit";

type StructElement = {
  id: string;
  type: ElementType;
  name: string;
  floor: number;
  stress: number; // 0..1 para color
  utilization: number;
  status: ElementStatus;
  dimensions: string;
  material: string;
  alerts: string[];
  norms: { code: string; label: string; status: Status }[];
};

const NUM_FLOORS = 10;
const FLOOR_HEIGHT = 1.5;
const BUILDING_W = 18;
const BUILDING_D = 10;
const COLS_X = 5;
const COLS_Z = 3;

// Escala stress (0=azul frio, 1=rojo caliente) - estilo SAP2000
function stressColor(s: number): number {
  // Jet colormap clasico: azul -> cyan -> verde -> amarillo -> rojo
  const t = Math.max(0, Math.min(1, s));
  let r = 0, g = 0, b = 0;
  if (t < 0.25) {
    r = 0; g = 4 * t; b = 1;
  } else if (t < 0.5) {
    r = 0; g = 1; b = 1 - 4 * (t - 0.25);
  } else if (t < 0.75) {
    r = 4 * (t - 0.5); g = 1; b = 0;
  } else {
    r = 1; g = 1 - 4 * (t - 0.75); b = 0;
  }
  return (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255);
}

function statusFromStress(s: number): ElementStatus {
  if (s > 0.82) return "crit";
  if (s > 0.6) return "warn";
  return "ok";
}

// Genera determinista stress segun posicion - da realismo
function computeStress(type: ElementType, floor: number, colX: number, colZ: number): number {
  const floorFactor = 1 - floor / (NUM_FLOORS - 1); // plantas bajas mas carga
  const edgeFactor = (colX === 0 || colX === COLS_X - 1) ? 0.15 : 0;
  const cornerFactor = ((colX === 0 || colX === COLS_X - 1) && (colZ === 0 || colZ === COLS_Z - 1)) ? 0.1 : 0;
  const baseByType = { pilar: 0.45, viga: 0.35, forjado: 0.28 }[type];
  // Asimetria direccion viento: zona NE (X alto, Z bajo) mas estrada
  const windNE = (colX / (COLS_X - 1)) * 0.15 + (1 - colZ / (COLS_Z - 1)) * 0.12;
  const raw = baseByType + floorFactor * 0.45 + edgeFactor + cornerFactor + windNE;
  // Plantas superiores con voladizo (P7+) penalizan extremos
  const cantilever = floor >= 7 && colX === COLS_X - 1 ? 0.25 : 0;
  return Math.max(0.08, Math.min(0.98, raw + cantilever));
}

// Genera todos los elementos estructurales
function generateElements(): StructElement[] {
  const elements: StructElement[] = [];

  for (let f = 0; f < NUM_FLOORS; f++) {
    // PILARES (columnas verticales) - uno en cada interseccion de la rejilla
    for (let cx = 0; cx < COLS_X; cx++) {
      for (let cz = 0; cz < COLS_Z; cz++) {
        const stress = computeStress("pilar", f, cx, cz);
        const util = Math.round(stress * 100);
        const status = statusFromStress(stress);
        const pid = `P${cx}${cz}`;
        elements.push({
          id: `pil-${f}-${cx}-${cz}`,
          type: "pilar",
          name: `Pilar ${pid} - Planta ${f === 0 ? "PB" : "P" + f}`,
          floor: f,
          stress,
          utilization: util,
          status,
          dimensions: f < 3 ? "40 x 40 cm" : f < 7 ? "35 x 35 cm" : "30 x 30 cm",
          material: f < 5 ? "HA-30 / B500S" : "HA-25 / B500S",
          alerts: status === "crit" ? [
            `Pilar ${pid} excede utilizacion admisible`,
            "Revisar armado longitudinal y cercos",
            f >= 7 ? "Pandeo por esbeltez voladizo" : "Concentracion tension en base",
          ] : status === "warn" ? [
            `Utilizacion elevada (${util}%) requiere revision`,
          ] : [],
          norms: [
            { code: "EHE-08 Art. 42", label: "ELS deformaciones pilar", status: status === "crit" ? "fail" : status === "warn" ? "pending" : "ok" },
            { code: "EHE-08 Art. 50", label: "ELU compresion compuesta", status: status === "crit" ? "fail" : status === "warn" ? "pending" : "ok" },
            { code: "EHE-08 Art. 49", label: "ELU pandeo", status: status === "crit" ? "pending" : "ok" },
            { code: "NCSR-02", label: "Accion sismica zona B", status: f >= 7 && status !== "ok" ? "pending" : "ok" },
            { code: "CTE DB-SE-AE 3.3", label: "Accion viento", status: (cx === COLS_X - 1 && status !== "ok") ? "pending" : "ok" },
          ],
        });
      }
    }

    // VIGAS horizontales (en direccion X - las mas largas, entre pilares consecutivos en X)
    for (let cx = 0; cx < COLS_X - 1; cx++) {
      for (let cz = 0; cz < COLS_Z; cz++) {
        const stress = computeStress("viga", f, cx, cz);
        const util = Math.round(stress * 100);
        const status = statusFromStress(stress);
        elements.push({
          id: `vgx-${f}-${cx}-${cz}`,
          type: "viga",
          name: `Viga V-X${cx}${cz} - Planta ${f === 0 ? "PB" : "P" + f}`,
          floor: f,
          stress,
          utilization: util,
          status,
          dimensions: "30 x 60 cm",
          material: "HA-30 / B500S",
          alerts: status === "crit" ? [
            "Flexion positiva en vano supera resistencia",
            "Cortante en apoyo requiere armado transversal",
            "Revisar flecha a largo plazo",
          ] : status === "warn" ? [
            `Flecha ${(util / 100 * 1.4).toFixed(2)} cm cerca del limite L/400`,
          ] : [],
          norms: [
            { code: "EHE-08 Art. 42", label: "ELS flecha activa (L/400)", status: status === "crit" ? "fail" : status === "warn" ? "pending" : "ok" },
            { code: "EHE-08 Art. 44", label: "ELU flexion simple", status: status === "crit" ? "fail" : "ok" },
            { code: "EHE-08 Art. 44.2", label: "ELU cortante", status: status === "crit" ? "pending" : "ok" },
            { code: "EHE-08 Art. 49", label: "Fisuracion", status: status !== "ok" ? "pending" : "ok" },
            { code: "CTE DB-SI 6", label: "Resistencia al fuego R90", status: "ok" },
          ],
        });
      }
    }

    // VIGAS en direccion Z (perpendiculares)
    for (let cx = 0; cx < COLS_X; cx++) {
      for (let cz = 0; cz < COLS_Z - 1; cz++) {
        const stress = computeStress("viga", f, cx, cz) * 0.88;
        const util = Math.round(stress * 100);
        const status = statusFromStress(stress);
        elements.push({
          id: `vgz-${f}-${cx}-${cz}`,
          type: "viga",
          name: `Viga V-Z${cx}${cz} - Planta ${f === 0 ? "PB" : "P" + f}`,
          floor: f,
          stress,
          utilization: util,
          status,
          dimensions: "30 x 55 cm",
          material: "HA-30 / B500S",
          alerts: status === "crit" ? [
            "Flexion supera resistencia caracteristica",
            "Revisar armado superior en apoyos",
          ] : status === "warn" ? [
            "Flecha en servicio cerca del limite",
          ] : [],
          norms: [
            { code: "EHE-08 Art. 42", label: "ELS flecha activa", status: status === "crit" ? "fail" : status === "warn" ? "pending" : "ok" },
            { code: "EHE-08 Art. 44", label: "ELU flexion", status: status === "crit" ? "fail" : "ok" },
            { code: "EHE-08 Art. 44.2", label: "ELU cortante", status: status !== "ok" ? "pending" : "ok" },
            { code: "CTE DB-SI 6", label: "Resistencia al fuego R90", status: "ok" },
          ],
        });
      }
    }

    // FORJADOS (losas/placas entre vigas) - uno por cada vano rectangular
    for (let cx = 0; cx < COLS_X - 1; cx++) {
      for (let cz = 0; cz < COLS_Z - 1; cz++) {
        const stress = computeStress("forjado", f, cx, cz);
        const util = Math.round(stress * 100);
        const status = statusFromStress(stress);
        elements.push({
          id: `fjd-${f}-${cx}-${cz}`,
          type: "forjado",
          name: `Forjado F${cx}${cz} - Planta ${f === 0 ? "PB" : "P" + f}`,
          floor: f,
          stress,
          utilization: util,
          status,
          dimensions: "Losa maciza e=25 cm",
          material: "HA-30 / mallazo 15x15 D12",
          alerts: status === "crit" ? [
            "Punzonamiento en encuentro pilar excede capacidad",
            "Armadura transversal insuficiente",
            "Revisar deflexion a largo plazo",
          ] : status === "warn" ? [
            `Utilizacion ${util}% - revisar armado superior`,
          ] : [],
          norms: [
            { code: "EHE-08 Art. 42", label: "ELS deformacion losa", status: status === "crit" ? "fail" : status === "warn" ? "pending" : "ok" },
            { code: "EHE-08 Art. 46", label: "ELU punzonamiento", status: status === "crit" ? "fail" : status === "warn" ? "pending" : "ok" },
            { code: "EHE-08 Art. 44", label: "ELU flexion losa", status: status !== "ok" ? "pending" : "ok" },
            { code: "EHE-08 Art. 49", label: "Control fisuracion", status: status === "crit" ? "pending" : "ok" },
            { code: "CTE DB-HR", label: "Proteccion acustica", status: "ok" },
            { code: "CTE DB-SI 6", label: "R90 resistencia fuego", status: "ok" },
          ],
        });
      }
    }
  }
  return elements;
}

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector('script[src="' + src + '"]')) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("fail " + src));
    document.head.appendChild(s);
  });

export function StructuralFEMSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>({});
  const [selected, setSelected] = useState<StructElement | null>(null);
  const [ready, setReady] = useState(false);
  const [showDeformed, setShowDeformed] = useState(false);
  const elementsRef = useRef<StructElement[]>([]);

  useEffect(() => {
    elementsRef.current = generateElements();
  }, []);

  useEffect(() => {
    let frameId = 0;
    let mounted = true;

    (async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js");
      await loadScript("https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js");
      if (!mounted) return;

      const THREE = (window as any).THREE;
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!THREE || !canvas || !wrap) return;

      const W = wrap.clientWidth;
      const H = wrap.clientHeight;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x050814, 55, 140);

      const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 250);
      camera.position.set(26, 14, 30);

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 7, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 18;
      controls.maxDistance = 80;
      controls.maxPolarAngle = Math.PI / 2.1;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const key = new THREE.DirectionalLight(0xffffff, 0.7);
      key.position.set(20, 30, 15);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.4);
      fill.position.set(-20, 15, -10);
      scene.add(fill);

      const hitboxes: any[] = [];
      const meshByElementId: Record<string, any> = {};
      const originalPositions: Record<string, { pos: any; deform: { x: number; y: number; z: number } }> = {};

      const elements = elementsRef.current;

      const gridX = (cx: number) => -BUILDING_W / 2 + (cx / (COLS_X - 1)) * BUILDING_W;
      const gridZ = (cz: number) => -BUILDING_D / 2 + (cz / (COLS_Z - 1)) * BUILDING_D;

      // Deformacion fake (para modo "deformed shape")
      const deformFor = (floor: number, cx: number, cz: number) => {
        const f = floor / (NUM_FLOORS - 1);
        const lateralSway = f * f * 1.1; // desplazamiento lateral creciente
        const verticalSag = Math.sin((cx / (COLS_X - 1)) * Math.PI) * 0.12 * f;
        return {
          x: lateralSway + (cx === COLS_X - 1 ? f * 0.35 : 0),
          y: -verticalSag,
          z: -f * 0.2,
        };
      };

      // === PILARES ===
      elements.filter(e => e.type === "pilar").forEach(el => {
        const [, fs, cxs, czs] = el.id.split("-");
        const f = parseInt(fs), cx = parseInt(cxs), cz = parseInt(czs);
        const x = gridX(cx);
        const z = gridZ(cz);
        const y = f * FLOOR_HEIGHT + FLOOR_HEIGHT / 2;

        const size = f < 3 ? 0.5 : f < 7 ? 0.42 : 0.36;
        const geo = new THREE.BoxGeometry(size, FLOOR_HEIGHT, size);
        const mat = new THREE.MeshStandardMaterial({
          color: stressColor(el.stress),
          roughness: 0.6,
          metalness: 0.1,
          emissive: stressColor(el.stress),
          emissiveIntensity: 0.15,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        mesh.userData.elementId = el.id;
        scene.add(mesh);
        hitboxes.push(mesh);
        meshByElementId[el.id] = mesh;
        originalPositions[el.id] = { pos: { x, y, z }, deform: deformFor(f, cx, cz) };
      });

      // === VIGAS X ===
      elements.filter(e => e.type === "viga" && e.id.startsWith("vgx")).forEach(el => {
        const [, fs, cxs, czs] = el.id.split("-");
        const f = parseInt(fs), cx = parseInt(cxs), cz = parseInt(czs);
        const x1 = gridX(cx), x2 = gridX(cx + 1);
        const z = gridZ(cz);
        const y = (f + 1) * FLOOR_HEIGHT;

        const len = x2 - x1;
        const geo = new THREE.BoxGeometry(len - 0.1, 0.35, 0.3);
        const mat = new THREE.MeshStandardMaterial({
          color: stressColor(el.stress),
          roughness: 0.55,
          metalness: 0.1,
          emissive: stressColor(el.stress),
          emissiveIntensity: 0.12,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((x1 + x2) / 2, y - 0.175, z);
        mesh.userData.elementId = el.id;
        scene.add(mesh);
        hitboxes.push(mesh);
        meshByElementId[el.id] = mesh;
        const cxAvg = cx + 0.5;
        originalPositions[el.id] = { pos: { x: (x1 + x2) / 2, y: y - 0.175, z }, deform: deformFor(f + 1, cxAvg, cz) };
      });

      // === VIGAS Z ===
      elements.filter(e => e.type === "viga" && e.id.startsWith("vgz")).forEach(el => {
        const [, fs, cxs, czs] = el.id.split("-");
        const f = parseInt(fs), cx = parseInt(cxs), cz = parseInt(czs);
        const x = gridX(cx);
        const z1 = gridZ(cz), z2 = gridZ(cz + 1);
        const y = (f + 1) * FLOOR_HEIGHT;

        const len = z2 - z1;
        const geo = new THREE.BoxGeometry(0.3, 0.35, len - 0.1);
        const mat = new THREE.MeshStandardMaterial({
          color: stressColor(el.stress),
          roughness: 0.55,
          metalness: 0.1,
          emissive: stressColor(el.stress),
          emissiveIntensity: 0.12,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y - 0.175, (z1 + z2) / 2);
        mesh.userData.elementId = el.id;
        scene.add(mesh);
        hitboxes.push(mesh);
        meshByElementId[el.id] = mesh;
        originalPositions[el.id] = { pos: { x, y: y - 0.175, z: (z1 + z2) / 2 }, deform: deformFor(f + 1, cx, cz + 0.5) };
      });

      // === FORJADOS ===
      elements.filter(e => e.type === "forjado").forEach(el => {
        const [, fs, cxs, czs] = el.id.split("-");
        const f = parseInt(fs), cx = parseInt(cxs), cz = parseInt(czs);
        const x1 = gridX(cx), x2 = gridX(cx + 1);
        const z1 = gridZ(cz), z2 = gridZ(cz + 1);
        const y = (f + 1) * FLOOR_HEIGHT;

        const geo = new THREE.BoxGeometry(x2 - x1 - 0.32, 0.12, z2 - z1 - 0.32);
        const mat = new THREE.MeshStandardMaterial({
          color: stressColor(el.stress),
          roughness: 0.75,
          metalness: 0.05,
          emissive: stressColor(el.stress),
          emissiveIntensity: 0.1,
          transparent: true,
          opacity: 0.78,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((x1 + x2) / 2, y - 0.41, (z1 + z2) / 2);
        mesh.userData.elementId = el.id;
        scene.add(mesh);
        hitboxes.push(mesh);
        meshByElementId[el.id] = mesh;
        originalPositions[el.id] = { pos: { x: (x1 + x2) / 2, y: y - 0.41, z: (z1 + z2) / 2 }, deform: deformFor(f + 1, cx + 0.5, cz + 0.5) };
      });

      // Wireframe overlay (estilo FEM) en una sola planta baja para dar feeling
      const baseGeo = new THREE.BoxGeometry(BUILDING_W + 1, 0.4, BUILDING_D + 1);
      const baseEdges = new THREE.EdgesGeometry(baseGeo);
      const baseWire = new THREE.LineSegments(baseEdges, new THREE.LineBasicMaterial({ color: 0x4a8fdc, transparent: true, opacity: 0.6 }));
      baseWire.position.set(0, -0.3, 0);
      scene.add(baseWire);

      // Suelo
      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(45, 64),
        new THREE.MeshStandardMaterial({ color: 0x0a0d18, metalness: 0.15, roughness: 0.95 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.52;
      scene.add(ground);

      const grid = new THREE.GridHelper(90, 45, 0x8b5cf6, 0x1e293b);
      grid.position.y = -0.5;
      (grid.material as any).opacity = 0.18;
      (grid.material as any).transparent = true;
      scene.add(grid);

      // Raycasting
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      let highlightedMesh: any = null;
      const originalEmissive: Record<string, number> = {};

      const onPointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hitboxes);
        if (hits.length > 0) {
          canvas.style.cursor = "pointer";
          const target = hits[0].object;
          if (highlightedMesh && highlightedMesh !== target) {
            highlightedMesh.material.emissiveIntensity = originalEmissive[highlightedMesh.userData.elementId] ?? 0.12;
          }
          if (!originalEmissive[target.userData.elementId]) {
            originalEmissive[target.userData.elementId] = target.material.emissiveIntensity;
          }
          target.material.emissiveIntensity = 0.6;
          highlightedMesh = target;
        } else {
          canvas.style.cursor = "grab";
          if (highlightedMesh) {
            highlightedMesh.material.emissiveIntensity = originalEmissive[highlightedMesh.userData.elementId] ?? 0.12;
            highlightedMesh = null;
          }
        }
      };

      const onClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hitboxes);
        if (hits.length > 0) {
          const id = hits[0].object.userData.elementId;
          const el = elements.find(e => e.id === id) || null;
          setSelected(el);
          controls.autoRotate = false;
        }
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("click", onClick);

      sceneRef.current = { scene, camera, renderer, controls, meshByElementId, originalPositions };

      const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();
      setReady(true);

      const onResize = () => {
        const nw = wrap.clientWidth;
        const nh = wrap.clientHeight;
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      sceneRef.current.cleanup = () => {
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("click", onClick);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    })();

    return () => {
      mounted = false;
      if (frameId) cancelAnimationFrame(frameId);
      if (sceneRef.current?.cleanup) sceneRef.current.cleanup();
    };
  }, []);

  // Toggle deformed shape
  useEffect(() => {
    const { meshByElementId, originalPositions } = sceneRef.current || {};
    if (!meshByElementId || !originalPositions) return;
    Object.keys(meshByElementId).forEach(id => {
      const mesh = meshByElementId[id];
      const orig = originalPositions[id];
      if (!orig) return;
      if (showDeformed) {
        mesh.position.set(orig.pos.x + orig.deform.x, orig.pos.y + orig.deform.y, orig.pos.z + orig.deform.z);
      } else {
        mesh.position.set(orig.pos.x, orig.pos.y, orig.pos.z);
      }
    });
  }, [showDeformed]);

  return (
    <section className="relative border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300">
            Modelo FEM - Analisis estructural
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Cada elemento,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
              su propio informe
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Modelo de calculo estilo SAP2000. Haz click en cualquier <b className="text-white">pilar</b>, <b className="text-white">viga</b> o <b className="text-white">forjado</b> para ver su tension, utilizacion y cumplimiento normativo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div
            ref={wrapRef}
            className="relative col-span-1 h-[680px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_0_80px_-20px_rgba(6,182,212,0.35)] lg:col-span-8"
          >
            <canvas ref={canvasRef} className="h-full w-full" style={{ cursor: "grab" }} />

            <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 font-mono text-[10px] text-slate-400 backdrop-blur">
              FEM solver v12.4 | {ready ? "Model: 10 floors - " + (NUM_FLOORS * (COLS_X * COLS_Z + (COLS_X - 1) * COLS_Z + COLS_X * (COLS_Z - 1) + (COLS_X - 1) * (COLS_Z - 1))) + " elementos" : "cargando..."}
            </div>

            {/* Leyenda tension SAP2000 */}
            <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-white/10 bg-slate-950/85 p-3 backdrop-blur">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-slate-400">Utilizacion / Tension</div>
              <div className="flex items-center gap-2">
                <div
                  className="h-36 w-3 rounded"
                  style={{
                    background: "linear-gradient(to top, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)",
                  }}
                />
                <div className="flex h-36 flex-col justify-between font-mono text-[9px] text-slate-300">
                  <span>&gt;82%</span>
                  <span>66%</span>
                  <span>50%</span>
                  <span>33%</span>
                  <span>&lt;15%</span>
                </div>
              </div>
            </div>

            {/* Toggle deformada */}
            <button
              onClick={() => setShowDeformed(s => !s)}
              className={
                "absolute bottom-4 right-4 rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur transition " +
                (showDeformed
                  ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                  : "border-white/10 bg-slate-950/80 text-slate-400 hover:text-white")
              }
            >
              {showDeformed ? "OK Deformada x1500" : "Ver deformada"}
            </button>
          </div>

          <div className="col-span-1 flex h-[680px] flex-col rounded-2xl border border-white/10 bg-slate-950/60 lg:col-span-4">
            {selected ? (
              <ElementPanel element={selected} onClose={() => setSelected(null)} />
            ) : (
              <FEMEmptyPanel />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FEMEmptyPanel() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3z" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      </div>
      <p className="text-sm font-medium text-white">Selecciona un elemento estructural</p>
      <p className="mt-2 text-xs text-slate-400">
        Click en cualquier pilar (columnas), viga (elementos horizontales) o forjado (losas) para ver su informe de tension, utilizacion y cumplimiento normativo.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-2 text-[10px]">
        <div className="rounded border border-white/10 p-2 text-center">
          <div className="font-semibold text-cyan-300">Pilares</div>
          <div className="text-slate-500">verticales</div>
        </div>
        <div className="rounded border border-white/10 p-2 text-center">
          <div className="font-semibold text-cyan-300">Vigas</div>
          <div className="text-slate-500">horizontales</div>
        </div>
        <div className="rounded border border-white/10 p-2 text-center">
          <div className="font-semibold text-cyan-300">Forjados</div>
          <div className="text-slate-500">losas</div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-1 text-[11px] text-slate-500">
        <span>Arrastrar = rotar modelo</span>
        <span>Rueda del raton = zoom</span>
      </div>
    </div>
  );
}

function ElementPanel({ element, onClose }: { element: StructElement; onClose: () => void }) {
  const cfg = {
    ok: { label: "CUMPLE", color: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", bar: "bg-emerald-400" },
    warn: { label: "REVISAR", color: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/30", bar: "bg-amber-400" },
    crit: { label: "CRITICO", color: "text-red-300", bg: "bg-red-500/10", border: "border-red-500/30", bar: "bg-red-400" },
  }[element.status];

  const typeLabel = { pilar: "Pilar", viga: "Viga", forjado: "Forjado" }[element.type];
  const typeIcon = { pilar: "I", viga: "-", forjado: "=" }[element.type];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between border-b border-white/10 p-5">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
            <span className="mr-1.5 text-cyan-400">{typeIcon}</span>
            {typeLabel}
          </div>
          <div className="mt-1 truncate text-lg font-semibold text-white">{element.name}</div>
          <div className="mt-1 flex gap-3 font-mono text-[10px] text-slate-500">
            <span>{element.dimensions}</span>
            <span>-</span>
            <span>{element.material}</span>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className={"mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-widest " + cfg.bg + " " + cfg.border + " " + cfg.color}>
          <span className={"h-1.5 w-1.5 rounded-full " + cfg.bar}></span>
          {cfg.label}
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Utilizacion / Tension</span>
            <span className={"font-mono text-lg font-semibold " + cfg.color}>{element.utilization}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div className={"h-full rounded-full transition-all " + cfg.bar} style={{ width: element.utilization + "%" }} />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Dimensiones</div>
            <div className="mt-1 font-mono text-xs text-white">{element.dimensions}</div>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Material</div>
            <div className="mt-1 font-mono text-xs text-white">{element.material}</div>
          </div>
        </div>

        {element.alerts.length > 0 && (
          <div className="mb-5">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Alertas ({element.alerts.length})</div>
            <div className="space-y-2">
              {element.alerts.map((a, i) => (
                <div key={i} className="flex gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span>
                  <span className="text-xs text-slate-300">{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Normativa aplicable ({element.norms.length})</div>
          <div className="space-y-1.5">
            {element.norms.map((n, i) => {
              const map = {
                ok: { label: "CUMPLE", cls: "text-emerald-300" },
                pending: { label: "PTE", cls: "text-amber-300" },
                fail: { label: "FALLO", cls: "text-red-300" },
              }[n.status];
              return (
                <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-slate-400">{n.code}</div>
                    <div className="truncate text-xs text-white">{n.label}</div>
                  </div>
                  <span className={"shrink-0 font-mono text-[10px] font-semibold " + map.cls}>{map.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <a
          href={"mailto:palacio.laura@gmail.com?subject=STRUXAI%20-%20Revisar%20" + encodeURIComponent(element.name)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:from-cyan-500 hover:to-blue-500"
        >
          Pedir revision de este elemento
        </a>
      </div>
    </div>
  );
}
