"use client";

import { useEffect, useRef, useState } from "react";

type Status = "ok" | "pending" | "fail";

type SustainElement = {
  id: string;
  category: string;
  name: string;
  status: "ok" | "warn" | "crit";
  description: string;
  metrics: { label: string; value: string }[];
  norms: { code: string; label: string; status: Status }[];
};

const ELEMENTS: SustainElement[] = [
  {
    id: "clt",
    category: "Estructura CLT",
    name: "Paneles Cross Laminated Timber",
    status: "ok",
    description: "Estructura portante de madera contralaminada de 5 capas. Sustituye al hormigon armado reduciendo 58% las emisiones de CO2 incorporado.",
    metrics: [
      { label: "Espesor paneles", value: "140 mm" },
      { label: "Clase resistencia", value: "GL24h" },
      { label: "Resistencia fuego", value: "R90 (carbonizacion controlada)" },
      { label: "CO2 incorporado", value: "-58% vs hormigon" },
    ],
    norms: [
      { code: "CTE DB-SE-M", label: "Calculo estructural madera (obligatorio ES)", status: "ok" },
      { code: "Eurocodigo 5", label: "Diseño estructural avanzado CLT", status: "ok" },
      { code: "UNE-EN 16351", label: "Marcado CE paneles CLT", status: "ok" },
      { code: "UNE-EN 14081", label: "Marcado CE madera estructural", status: "ok" },
      { code: "CTE DB-SI 6", label: "Resistencia al fuego R90", status: "ok" },
      { code: "LOE Seguro Decenal", label: "Proyecto + licencia + seguro 10 anos", status: "pending" },
    ],
  },
  {
    id: "aislamiento",
    category: "Envolvente termica",
    name: "Aislamiento + ventanas triple vidrio",
    status: "ok",
    description: "Envolvente Passivhaus con fibra de madera 300 mm + carpinteria madera triple vidrio Ug=0.5 W/m2K. Garantiza demanda energetica < 15 kWh/m2 ano.",
    metrics: [
      { label: "Transmitancia muro U", value: "0.12 W/m2K" },
      { label: "Transmitancia ventana Uw", value: "0.75 W/m2K" },
      { label: "Demanda calefaccion", value: "12 kWh/m2 ano" },
      { label: "Hermeticidad n50", value: "0.4 h-1 (Passivhaus)" },
    ],
    norms: [
      { code: "CTE DB-HE 1", label: "Limite demanda energetica", status: "ok" },
      { code: "CTE DB-HE 0", label: "Limitacion consumo primario", status: "ok" },
      { code: "Passivhaus Standard", label: "Certificacion voluntaria PHI", status: "ok" },
      { code: "CTE DB-HS 3", label: "Calidad aire interior (con MVHR)", status: "ok" },
      { code: "CTE DB-HR", label: "Proteccion acustica", status: "ok" },
    ],
  },
  {
    id: "biomasa",
    category: "Instalacion termica",
    name: "Caldera biomasa pellet",
    status: "warn",
    description: "Caldera de biomasa alimentada por pellet madera certificado ENplus A1. Cubre calefaccion + ACS. Balance CO2 neutro. Requiere revision emisiones particulas segun normativa autonomica.",
    metrics: [
      { label: "Potencia nominal", value: "25 kW" },
      { label: "Rendimiento", value: "92%" },
      { label: "Combustible", value: "Pellet ENplus A1" },
      { label: "Emisiones CO", value: "< 200 mg/Nm3 (UNE-EN 303-5 A+)" },
    ],
    norms: [
      { code: "RITE (RD 1027/2007)", label: "Reglamento Instalaciones Termicas", status: "ok" },
      { code: "UNE-EN 303-5 Clase 5", label: "Caldera biomasa clase alta eficiencia", status: "ok" },
      { code: "RD 413/2014", label: "Produccion energia renovables", status: "ok" },
      { code: "ENplus A1", label: "Certificacion pellet calidad", status: "ok" },
      { code: "Normativa autonomica emisiones", label: "Particulas PM10 (varia CCAA)", status: "pending" },
    ],
  },
  {
    id: "solar",
    category: "Autoconsumo electrico",
    name: "Paneles fotovoltaicos cubierta",
    status: "ok",
    description: "Instalacion solar fotovoltaica de autoconsumo. 24 paneles monocristalinos de alta eficiencia. Cobertura 85% del consumo electrico anual del edificio.",
    metrics: [
      { label: "Potencia instalada", value: "9.6 kWp" },
      { label: "Produccion anual", value: "14.400 kWh/ano" },
      { label: "Autosuficiencia", value: "85%" },
      { label: "Payback estimado", value: "7.2 anos" },
    ],
    norms: [
      { code: "CTE DB-HE 5", label: "Contribucion fotovoltaica minima", status: "ok" },
      { code: "RD 244/2019", label: "Autoconsumo compartido permitido", status: "ok" },
      { code: "UNE-EN 61215", label: "Paneles cristalinos certificados", status: "ok" },
      { code: "IEC 62446-1", label: "Inspeccion y puesta en marcha", status: "ok" },
      { code: "RD 900/2015", label: "Actividad autoconsumo registrada", status: "ok" },
    ],
  },
  {
    id: "vegetal",
    category: "Fachada vegetal + FSC",
    name: "Jardin vertical + trazabilidad madera",
    status: "ok",
    description: "Fachada vegetal que mitiga isla de calor urbana y absorbe CO2. Toda la madera estructural y revestimiento proviene de bosques con certificacion FSC con trazabilidad completa desde tala hasta instalacion.",
    metrics: [
      { label: "Superficie vegetal", value: "220 m2" },
      { label: "Absorcion CO2 anual", value: "4.8 t CO2/ano" },
      { label: "Madera certificada", value: "100% FSC Mix Credit" },
      { label: "Kilometros transporte", value: "< 300 km (proximidad)" },
    ],
    norms: [
      { code: "FSC Chain of Custody", label: "Trazabilidad bosque-obra", status: "ok" },
      { code: "PEFC (alternativa)", label: "Certificacion gestion forestal", status: "ok" },
      { code: "EU Timber Regulation", label: "Madera legal (no tala ilegal)", status: "ok" },
      { code: "CTE DB-HS 1", label: "Humedad fachada vegetal", status: "ok" },
      { code: "Analisis ciclo vida (ACV)", label: "EPD producto declarada", status: "ok" },
    ],
  },
];

const loadScript = (src: string, expectGlobal?: string) =>
  new Promise<void>((resolve, reject) => {
    const existing = document.querySelector('script[src="' + src + '"]') as HTMLScriptElement | null;
    const onReady = () => {
      if (!expectGlobal) return resolve();
      let tries = 0;
      const check = () => {
        const w = window as any;
        if (w[expectGlobal] || (expectGlobal === "OrbitControls" && w.THREE && w.THREE.OrbitControls)) {
          resolve();
        } else if (tries++ < 50) {
          setTimeout(check, 40);
        } else {
          reject(new Error("timeout waiting for " + expectGlobal));
        }
      };
      check();
    };
    if (existing) {
      if ((existing as any)._loaded) return onReady();
      existing.addEventListener("load", onReady, { once: true });
      existing.addEventListener("error", () => reject(new Error("fail " + src)), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => { (s as any)._loaded = true; onReady(); };
    s.onerror = () => reject(new Error("fail " + src));
    document.head.appendChild(s);
  });

function thermalColor(t: number): number {
  const v = Math.max(0, Math.min(1, t));
  let r = 0, g = 0, b = 0;
  if (v < 0.25) { r = 0; g = 0; b = 0.5 + 2 * v; }
  else if (v < 0.5) { r = 0; g = 4 * (v - 0.25); b = 1; }
  else if (v < 0.75) { r = 4 * (v - 0.5); g = 1; b = 1 - 4 * (v - 0.5); }
  else { r = 1; g = 1 - 4 * (v - 0.75); b = 0; }
  return (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255);
}

type ViewMode = "arq" | "termica" | "energetica";

export function TimberBuildingSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>({});
  const [selected, setSelected] = useState<SustainElement | null>(null);
  const [ready, setReady] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("arq");

  useEffect(() => {
    let frameId = 0;
    let mounted = true;

    (async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "THREE");
      await loadScript("https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js", "OrbitControls");
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
      renderer.toneMappingExposure = 1.2;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0a0d18, 45, 110);

      const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 200);
      camera.position.set(20, 11, 22);

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 4.5, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 14;
      controls.maxDistance = 60;
      controls.maxPolarAngle = Math.PI / 2.1;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.28;

      scene.add(new THREE.AmbientLight(0xffffff, 0.45));
      const key = new THREE.DirectionalLight(0xfff5e6, 1.15);
      key.position.set(18, 22, 12);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x90c4a0, 0.35);
      fill.position.set(-15, 12, -6);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffffff, 0.4);
      rim.position.set(0, 6, 22);
      scene.add(rim);

      const woodArq = new THREE.MeshPhysicalMaterial({
        color: 0xb07d4a,
        roughness: 0.75,
        metalness: 0.03,
        clearcoat: 0.08,
        clearcoatRoughness: 0.7,
      });
      const woodThermal = new THREE.MeshStandardMaterial({
        color: thermalColor(0.2),
        roughness: 0.55,
        metalness: 0.1,
        emissive: thermalColor(0.2),
        emissiveIntensity: 0.15,
      });
      const woodEnergy = new THREE.MeshStandardMaterial({
        color: 0x6b4a2a,
        roughness: 0.6,
        metalness: 0.08,
        emissive: 0x2a5a2a,
        emissiveIntensity: 0.08,
      });

      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x2a1f16,
        metalness: 0.2,
        roughness: 0.7,
      });

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x7da5c0,
        metalness: 0.1,
        roughness: 0.08,
        transmission: 0.55,
        opacity: 0.55,
        transparent: true,
        ior: 1.52,
        thickness: 0.14,
      });

      const solarArq = new THREE.MeshStandardMaterial({
        color: 0x14203a,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x081020,
        emissiveIntensity: 0.25,
      });
      const solarEnergy = new THREE.MeshStandardMaterial({
        color: 0xfcd34d,
        metalness: 0.3,
        roughness: 0.4,
        emissive: 0xfcd34d,
        emissiveIntensity: 0.8,
      });

      const chimneyMat = new THREE.MeshStandardMaterial({
        color: 0x444444,
        metalness: 0.9,
        roughness: 0.3,
      });
      const chimneyBiomass = new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        metalness: 0.3,
        roughness: 0.4,
        emissive: 0xff6b35,
        emissiveIntensity: 0.9,
      });

      const vegetalMat = new THREE.MeshStandardMaterial({
        color: 0x2d7a3f,
        roughness: 0.85,
        metalness: 0,
      });

      const NFLOORS = 5;
      const FLOOR_H = 1.9;
      const BW = 10.5;
      const BD = 8;
      let yCursor = 0;

      const hitboxes: any[] = [];
      const swappableMeshes: { mesh: any; arq: any; thermal: any; energy: any; category: string }[] = [];

      for (let f = 0; f < NFLOORS; f++) {
        const slab = new THREE.Mesh(
          new THREE.BoxGeometry(BW, 0.22, BD),
          woodArq
        );
        slab.position.set(0, yCursor, 0);
        slab.userData.elementId = "clt";
        scene.add(slab);
        hitboxes.push(slab);
        swappableMeshes.push({ mesh: slab, arq: woodArq, thermal: woodThermal, energy: woodEnergy, category: "clt" });

        const wallH = FLOOR_H - 0.22;
        const wallT = 0.18;

        const wallN = new THREE.Mesh(
          new THREE.BoxGeometry(BW, wallH, wallT),
          woodArq
        );
        wallN.position.set(0, yCursor + wallH / 2 + 0.11, BD / 2 - wallT / 2);
        wallN.userData.elementId = "clt";
        scene.add(wallN);
        hitboxes.push(wallN);
        swappableMeshes.push({ mesh: wallN, arq: woodArq, thermal: woodThermal, energy: woodEnergy, category: "clt" });

        const wallS = new THREE.Mesh(
          new THREE.BoxGeometry(BW, wallH, wallT),
          woodArq
        );
        wallS.position.set(0, yCursor + wallH / 2 + 0.11, -BD / 2 + wallT / 2);
        wallS.userData.elementId = "clt";
        scene.add(wallS);
        hitboxes.push(wallS);
        swappableMeshes.push({ mesh: wallS, arq: woodArq, thermal: woodThermal, energy: woodEnergy, category: "clt" });

        const wallE = new THREE.Mesh(
          new THREE.BoxGeometry(wallT, wallH, BD - wallT * 2),
          woodArq
        );
        wallE.position.set(BW / 2 - wallT / 2, yCursor + wallH / 2 + 0.11, 0);
        wallE.userData.elementId = "clt";
        scene.add(wallE);
        hitboxes.push(wallE);
        swappableMeshes.push({ mesh: wallE, arq: woodArq, thermal: woodThermal, energy: woodEnergy, category: "clt" });

        const wallW = new THREE.Mesh(
          new THREE.BoxGeometry(wallT, wallH, BD - wallT * 2),
          woodArq
        );
        wallW.position.set(-BW / 2 + wallT / 2, yCursor + wallH / 2 + 0.11, 0);
        wallW.userData.elementId = "clt";
        scene.add(wallW);
        hitboxes.push(wallW);
        swappableMeshes.push({ mesh: wallW, arq: woodArq, thermal: woodThermal, energy: woodEnergy, category: "clt" });

        const winH = wallH * 0.55;
        const winW_single = 1.2;
        const winY = yCursor + wallH / 2 + 0.11;

        for (let i = 0; i < 3; i++) {
          const x = -BW / 2 + BW * (0.2 + i * 0.3);

          const winN = new THREE.Mesh(new THREE.PlaneGeometry(winW_single, winH), glassMat);
          winN.position.set(x, winY, BD / 2 + 0.01);
          winN.userData.elementId = "aislamiento";
          scene.add(winN);
          hitboxes.push(winN);

          const winS = new THREE.Mesh(new THREE.PlaneGeometry(winW_single, winH), glassMat);
          winS.position.set(x, winY, -BD / 2 - 0.01);
          winS.rotation.y = Math.PI;
          winS.userData.elementId = "aislamiento";
          scene.add(winS);
          hitboxes.push(winS);
        }

        yCursor += FLOOR_H;
      }

      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(35, 64),
        new THREE.MeshStandardMaterial({ color: 0x0a0d18, metalness: 0.1, roughness: 0.95 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.12;
      scene.add(ground);

      const grid = new THREE.GridHelper(70, 35, 0x4a8fdc, 0x1e293b);
      grid.position.y = -0.1;
      (grid.material as any).opacity = 0.18;
      (grid.material as any).transparent = true;
      scene.add(grid);

      const solarGroup = new THREE.Group();
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
          const panel = new THREE.Mesh(
            new THREE.BoxGeometry(0.9, 0.04, 1.4),
            solarArq
          );
          panel.position.set(
            -BW / 2 + 0.8 + c * 1.15,
            yCursor + 0.15,
            -BD / 2 + 1.2 + r * 2.2
          );
          panel.rotation.z = -0.18;
          panel.userData.elementId = "solar";
          solarGroup.add(panel);
          hitboxes.push(panel);
          swappableMeshes.push({ mesh: panel, arq: solarArq, thermal: solarArq, energy: solarEnergy, category: "solar" });
        }
      }
      scene.add(solarGroup);

      const chimneyBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 1.8, 0.9),
        chimneyMat
      );
      chimneyBase.position.set(BW / 2 + 0.7, 2.5, BD / 2 - 1);
      chimneyBase.userData.elementId = "biomasa";
      scene.add(chimneyBase);
      hitboxes.push(chimneyBase);
      swappableMeshes.push({ mesh: chimneyBase, arq: chimneyMat, thermal: chimneyMat, energy: chimneyBiomass, category: "biomasa" });

      const chimneyPipe = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 8, 16),
        chimneyMat
      );
      chimneyPipe.position.set(BW / 2 + 0.7, 6, BD / 2 - 1);
      chimneyPipe.userData.elementId = "biomasa";
      scene.add(chimneyPipe);
      hitboxes.push(chimneyPipe);
      swappableMeshes.push({ mesh: chimneyPipe, arq: chimneyMat, thermal: chimneyMat, energy: chimneyBiomass, category: "biomasa" });

      const smokeGroup = new THREE.Group();
      for (let i = 0; i < 3; i++) {
        const puff = new THREE.Mesh(
          new THREE.SphereGeometry(0.3 + i * 0.15, 12, 12),
          new THREE.MeshBasicMaterial({
            color: 0xcccccc,
            transparent: true,
            opacity: 0.35 - i * 0.08,
          })
        );
        puff.position.set(BW / 2 + 0.7, 10.5 + i * 0.6, BD / 2 - 1);
        smokeGroup.add(puff);
      }
      smokeGroup.visible = false;
      scene.add(smokeGroup);

      const vegetalGroup = new THREE.Group();
      const vegetalW = 3.5;
      const vegetalH = NFLOORS * FLOOR_H - 0.6;
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, vegetalH, vegetalW),
        vegetalMat
      );
      base.position.set(-BW / 2 - 0.12, vegetalH / 2 + 0.2, BD / 4);
      base.userData.elementId = "vegetal";
      vegetalGroup.add(base);
      hitboxes.push(base);

      for (let i = 0; i < 42; i++) {
        const leaf = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.15 + Math.random() * 0.12, 0),
          vegetalMat
        );
        leaf.position.set(
          -BW / 2 - 0.2 - Math.random() * 0.2,
          0.5 + Math.random() * (vegetalH - 0.3),
          BD / 4 - vegetalW / 2 + Math.random() * vegetalW
        );
        leaf.userData.elementId = "vegetal";
        vegetalGroup.add(leaf);
        hitboxes.push(leaf);
      }
      scene.add(vegetalGroup);

      const flowGroup = new THREE.Group();

      const sunArrow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 6, 8),
        new THREE.MeshBasicMaterial({ color: 0xfcd34d })
      );
      sunArrow.position.set(5, 13, -4);
      sunArrow.rotation.z = -Math.PI / 4;
      sunArrow.userData.isFlow = true;
      flowGroup.add(sunArrow);

      const heatArrow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.15, 1.2, 8),
        new THREE.MeshBasicMaterial({ color: 0xff6b35 })
      );
      heatArrow.position.set(BW / 2 + 0.7, 11.5, BD / 2 - 1);
      heatArrow.userData.isFlow = true;
      flowGroup.add(heatArrow);

      const co2Arrow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 2, 8),
        new THREE.MeshBasicMaterial({ color: 0x22c55e })
      );
      co2Arrow.position.set(-BW / 2 - 1.8, 3, BD / 4);
      co2Arrow.rotation.z = Math.PI / 2;
      co2Arrow.userData.isFlow = true;
      flowGroup.add(co2Arrow);

      flowGroup.visible = false;
      scene.add(flowGroup);

      const treeMat = new THREE.MeshStandardMaterial({ color: 0x1a4a2a, roughness: 0.9 });
      for (let t = 0; t < 16; t++) {
        const angle = (t / 16) * Math.PI * 2 + Math.random() * 0.3;
        const r = 14 + Math.random() * 6;
        const size = 0.5 + Math.random() * 0.4;
        const tree = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 0), treeMat);
        tree.position.set(Math.cos(angle) * r, size - 0.1, Math.sin(angle) * r);
        tree.rotation.y = Math.random() * Math.PI;
        scene.add(tree);
      }

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onPointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hitboxes);
        canvas.style.cursor = hits.length > 0 ? "pointer" : "grab";
      };

      const onClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hitboxes);
        if (hits.length > 0) {
          const id = hits[0].object.userData.elementId;
          const el = ELEMENTS.find(e => e.id === id) || null;
          setSelected(el);
          controls.autoRotate = false;
        }
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("click", onClick);

      sceneRef.current = { scene, camera, renderer, controls, swappableMeshes, smokeGroup, flowGroup };

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

  useEffect(() => {
    const { swappableMeshes, smokeGroup, flowGroup } = sceneRef.current || {};
    if (!swappableMeshes) return;

    swappableMeshes.forEach((entry: any) => {
      if (viewMode === "arq") entry.mesh.material = entry.arq;
      else if (viewMode === "termica") entry.mesh.material = entry.thermal;
      else entry.mesh.material = entry.energy;
    });

    if (smokeGroup) smokeGroup.visible = viewMode === "energetica";
    if (flowGroup) flowGroup.visible = viewMode === "energetica";
  }, [viewMode, ready]);

  const modeCopy = {
    arq: { subtitle: "Vista arquitectonica" },
    termica: { subtitle: "Camara termica - puentes termicos" },
    energetica: { subtitle: "Flujos energeticos del edificio" },
  }[viewMode];

  return (
    <section className="relative border-b border-white/5 bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-300">
            Construccion sostenible - CLT + Passivhaus
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            No solo hormigon.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              Tambien madera del futuro.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Estructuras CLT, Passivhaus, biomasa certificada, fotovoltaica y trazabilidad FSC. STRUXAI verifica CTE DB-SE-M, Eurocodigo 5, DB-HE, RITE y normativa de renovables para que el cumplimiento sostenible sea tan trazable como el estructural.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Demanda energia", value: "12 kWh/m2/ano", sub: "Passivhaus OK" },
            { label: "CO2 vs hormigon", value: "-58%", sub: "madera CLT + FSC" },
            { label: "Autosuficiencia", value: "85%", sub: "solar + biomasa" },
            { label: "Madera certificada", value: "100%", sub: "FSC Mix Credit" },
          ].map((kpi, i) => (
            <div key={i} className="rounded-xl border border-emerald-500/20 bg-slate-950/60 p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{kpi.label}</div>
              <div className="mt-1 text-2xl font-bold text-emerald-300">{kpi.value}</div>
              <div className="mt-0.5 text-[10px] text-slate-500">{kpi.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div
            ref={wrapRef}
            className="relative col-span-1 h-[640px] overflow-hidden rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950 shadow-[0_0_80px_-20px_rgba(16,185,129,0.35)] lg:col-span-8"
          >
            <canvas ref={canvasRef} className="h-full w-full" style={{ cursor: "grab" }} />

            <div className="absolute left-4 top-4 flex rounded-lg border border-white/10 bg-slate-950/85 p-0.5 backdrop-blur">
              {([
                { key: "arq", label: "Arquitectonica", activeCls: "bg-emerald-500/25 text-emerald-200" },
                { key: "termica", label: "Termica", activeCls: "bg-orange-500/25 text-orange-200" },
                { key: "energetica", label: "Energetica", activeCls: "bg-amber-500/25 text-amber-200" },
              ] as const).map(m => (
                <button
                  key={m.key}
                  onClick={() => setViewMode(m.key)}
                  className={
                    "rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition " +
                    (viewMode === m.key ? m.activeCls : "text-slate-400 hover:text-white")
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>

            {viewMode === "termica" && (
              <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-white/10 bg-slate-950/85 p-3 backdrop-blur">
                <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-slate-400">Temperatura superficial</div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-24 w-3 rounded"
                    style={{ background: "linear-gradient(to top, #003399, #0099ff, #00ff88, #ffdd00, #ff4400)" }}
                  />
                  <div className="flex h-24 flex-col justify-between font-mono text-[9px] text-slate-300">
                    <span>32 C</span>
                    <span>24 C</span>
                    <span>18 C</span>
                    <span>12 C</span>
                    <span>5 C</span>
                  </div>
                </div>
              </div>
            )}
            {viewMode === "energetica" && (
              <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-white/10 bg-slate-950/85 p-3 font-mono text-[10px] backdrop-blur">
                <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-slate-400">Flujos activos</div>
                <div className="flex items-center gap-2 py-1">
                  <span className="h-2 w-5 rounded" style={{ background: "#fcd34d" }}></span>
                  <span className="text-amber-200">Captacion solar</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <span className="h-2 w-5 rounded" style={{ background: "#ff6b35" }}></span>
                  <span className="text-orange-200">Biomasa + ACS</span>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <span className="h-2 w-5 rounded" style={{ background: "#22c55e" }}></span>
                  <span className="text-emerald-200">Absorcion CO2</span>
                </div>
              </div>
            )}
            {viewMode === "arq" && (
              <div className="pointer-events-none absolute top-4 right-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 text-[10px] backdrop-blur">
                <span className="text-emerald-300">Click elementos para ver normativa</span>
              </div>
            )}

            <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 font-mono text-[10px] text-slate-400 backdrop-blur">
              agente-sostenibilidad v1.2 | {ready ? modeCopy.subtitle : "cargando..."}
            </div>
          </div>

          <div className="col-span-1 flex h-[640px] flex-col rounded-2xl border border-white/10 bg-slate-950/60 lg:col-span-4">
            {selected ? (
              <SustainPanel element={selected} onClose={() => setSelected(null)} />
            ) : (
              <SustainEmptyPanel />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SustainEmptyPanel() {
  const items = [
    { label: "Estructura CLT", hint: "paneles madera" },
    { label: "Envolvente", hint: "aislamiento + ventanas" },
    { label: "Caldera biomasa", hint: "chimenea lateral" },
    { label: "Fotovoltaica", hint: "paneles cubierta" },
    { label: "Jardin vertical", hint: "fachada oeste" },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L4 8v12h16V8l-8-6z" />
          <path d="M9 22V12h6v10" />
        </svg>
      </div>
      <p className="text-sm font-medium text-white">Selecciona un elemento sostenible</p>
      <p className="mt-2 text-xs text-slate-400">
        Click en paneles CLT, ventanas, chimenea biomasa, solar o jardin vertical para ver su normativa.
      </p>
      <div className="mt-5 w-full space-y-1.5 text-left">
        {items.map((it, i) => (
          <div key={i} className="flex items-center justify-between rounded border border-emerald-500/10 bg-emerald-500/[0.03] px-2.5 py-1.5 text-[11px]">
            <span className="text-emerald-200">{it.label}</span>
            <span className="text-slate-500">{it.hint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SustainPanel({ element, onClose }: { element: SustainElement; onClose: () => void }) {
  const cfg = {
    ok: { label: "CUMPLE", color: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", bar: "bg-emerald-400" },
    warn: { label: "REVISAR", color: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/30", bar: "bg-amber-400" },
    crit: { label: "CRITICO", color: "text-red-300", bg: "bg-red-500/10", border: "border-red-500/30", bar: "bg-red-400" },
  }[element.status];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between border-b border-white/10 p-5">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">{element.category}</div>
          <div className="mt-1 text-lg font-semibold text-white">{element.name}</div>
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

        <p className="mb-5 text-xs text-slate-300">{element.description}</p>

        <div className="mb-5">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Metricas clave</div>
          <div className="grid grid-cols-2 gap-2">
            {element.metrics.map((m, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{m.label}</div>
                <div className="mt-1 font-mono text-xs font-semibold text-emerald-300">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

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
          href={"mailto:palacio.laura@gmail.com?subject=STRUXAI%20sostenibilidad%20-%20" + encodeURIComponent(element.name)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-amber-600 px-4 py-2.5 text-xs font-semibold text-white hover:from-emerald-500 hover:to-amber-500"
        >
          Consultar sobre este sistema
        </a>
      </div>
    </div>
  );
}
