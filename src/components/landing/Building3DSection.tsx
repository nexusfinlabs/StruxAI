"use client";

import { useEffect, useRef, useState } from "react";

type FloorStatus = "ok" | "warn" | "crit";
type Complexity = "simple" | "med" | "complex";

type FloorData = {
  id: number;
  name: string;
  use: string;
  w: number;
  d: number;
  h: number;
  ox: number;
  oz: number;
  utilization: number;
  status: FloorStatus;
  complexity: Complexity;
  alerts: string[];
  norms: { code: string; label: string; status: "ok" | "pending" | "fail" }[];
};

const FLOORS: FloorData[] = [
  {
    id: 0, name: "PB", use: "Podio comercial + acceso + parking",
    w: 26.0, d: 9.0, h: 1.8, ox: 0.8, oz: 0.5,
    utilization: 52, status: "warn", complexity: "med",
    alerts: ["Grandes luces requieren revision flechas"],
    norms: [
      { code: "CTE DB-SI 3", label: "Evacuacion podio comercial", status: "ok" },
      { code: "CTE DB-SUA 9", label: "Accesibilidad rampas", status: "ok" },
      { code: "CTE DB-SE-AE 3.1", label: "Sobrecarga uso comercial", status: "ok" },
      { code: "EHE-08 Art. 42", label: "ELS flechas grandes luces", status: "pending" },
      { code: "NCSR-02", label: "Accion sismica base rigida", status: "ok" },
    ],
  },
  {
    id: 1, name: "P1", use: "Oficinas open space",
    w: 24.5, d: 8.7, h: 1.3, ox: 0.6, oz: 0.35,
    utilization: 55, status: "ok", complexity: "simple", alerts: [],
    norms: [
      { code: "CTE DB-SE-AE 3.1", label: "Sobrecarga oficinas", status: "ok" },
      { code: "EHE-08 Art. 42", label: "ELS flechas forjado", status: "ok" },
      { code: "CTE DB-SI 4", label: "Instalaciones PCI", status: "ok" },
    ],
  },
  {
    id: 2, name: "P2", use: "Residencial tipo A",
    w: 23.0, d: 8.4, h: 1.3, ox: 0.4, oz: 0.2,
    utilization: 61, status: "ok", complexity: "simple", alerts: [],
    norms: [
      { code: "CTE DB-SE-AE", label: "Sobrecarga uso", status: "ok" },
      { code: "EHE-08", label: "ELS/ELU forjado", status: "ok" },
      { code: "CTE DB-HR", label: "Proteccion acustica", status: "ok" },
    ],
  },
  {
    id: 3, name: "P3", use: "Residencial + voladizo considerable",
    w: 17.0, d: 7.2, h: 1.3, ox: -0.2, oz: -0.3,
    utilization: 77, status: "warn", complexity: "complex",
    alerts: ["Salto abrupto de P2 genera voladizo 2.8m", "Revisar transferencia carga P2-P3", "Viento NE incrementa momento flector"],
    norms: [
      { code: "CTE DB-SE 4.3.3", label: "Deformaciones voladizo", status: "pending" },
      { code: "EHE-08 Art. 50", label: "ELU pilar transicion", status: "pending" },
      { code: "EHE-08 Art. 42", label: "ELS voladizo", status: "pending" },
      { code: "CTE DB-SE-AE 3.3", label: "Accion viento NE", status: "pending" },
      { code: "NCSR-02", label: "Sismica cambio rigidez", status: "pending" },
      { code: "CTE DB-SUA 1", label: "Barandilla voladizo", status: "ok" },
    ],
  },
  {
    id: 4, name: "P4", use: "Residencial premium + voladizo grande",
    w: 14.0, d: 6.6, h: 1.3, ox: -0.6, oz: -0.6,
    utilization: 85, status: "warn", complexity: "complex",
    alerts: ["Voladizo 3.6m", "Anclaje losa-pilar requiere revision", "Revisar pandeo pilares esquina"],
    norms: [
      { code: "CTE DB-SE 4.3.3", label: "Deformaciones voladizo maximo", status: "pending" },
      { code: "EHE-08 Art. 50", label: "ELU pilares esquina", status: "pending" },
      { code: "EHE-08 Art. 42", label: "ELS voladizo premium", status: "pending" },
      { code: "CTE DB-SE-AE 3.3", label: "Accion viento NE", status: "pending" },
      { code: "NCSR-02", label: "Accion sismica", status: "ok" },
      { code: "CTE DB-SUA 1", label: "Barandilla voladizo", status: "ok" },
    ],
  },
  {
    id: 5, name: "P5", use: "Residencial premium + voladizo maximo",
    w: 12.0, d: 6.0, h: 1.3, ox: -1.0, oz: -1.0,
    utilization: 86, status: "warn", complexity: "complex",
    alerts: ["Voladizo 4.5m asimetrico", "Pilar P12 utilizacion elevada"],
    norms: [
      { code: "CTE DB-SE 4.3.3", label: "Deformacion voladizo", status: "pending" },
      { code: "EHE-08 Art. 50", label: "ELU Pilar P12", status: "pending" },
      { code: "EHE-08 Art. 42", label: "ELS voladizo maximo", status: "pending" },
      { code: "CTE DB-SE-AE 3.3", label: "Viento NE", status: "pending" },
      { code: "NCSR-02", label: "Accion sismica", status: "ok" },
      { code: "CTE DB-SUA 1", label: "Barandilla voladizo", status: "ok" },
    ],
  },
  {
    id: 6, name: "P6", use: "Penthouse premium + voladizo severo",
    w: 9.0, d: 5.0, h: 1.3, ox: -2.5, oz: -1.5,
    utilization: 89, status: "warn", complexity: "complex",
    alerts: ["Voladizo severo 5.5m alineado al este", "Alineacion izquierda crea torsion global", "Pilares esquina requieren refuerzo"],
    norms: [
      { code: "CTE DB-SE 4.3.3", label: "Deformacion voladizo severo", status: "pending" },
      { code: "EHE-08 Art. 50", label: "ELU pilares penthouse", status: "pending" },
      { code: "NCSR-02", label: "Torsion por asimetria global", status: "pending" },
      { code: "EHE-08 Art. 42", label: "ELS voladizo penthouse", status: "pending" },
      { code: "CTE DB-SE-AE 3.3", label: "Viento NE penthouse", status: "pending" },
      { code: "CTE DB-SUA 1", label: "Barandilla", status: "ok" },
    ],
  },
  {
    id: 7, name: "Atico", use: "Atico exclusivo + piscina + solarium panoramico",
    w: 6.0, d: 4.0, h: 1.6, ox: -4.0, oz: -2.0,
    utilization: 94, status: "crit", complexity: "complex",
    alerts: [
      "Voladizo maximo 7.0m - deformacion critica",
      "Carga piscina sobre voladizo extremo",
      "Pilar P12 utilizacion 94%",
      "NCSR-02 torsion critica por alineacion izquierda",
    ],
    norms: [
      { code: "NCSR-02", label: "Torsion critica alineacion", status: "fail" },
      { code: "CTE DB-SE 4.3.3", label: "Deformacion voladizo atico", status: "fail" },
      { code: "EHE-08 Art. 50", label: "ELU Pilar P12 piscina", status: "pending" },
      { code: "EHE-08 Art. 42", label: "ELS voladizo + piscina", status: "pending" },
      { code: "CTE DB-SE-AE", label: "Sobrecarga piscina + solarium", status: "pending" },
      { code: "CTE DB-HS 1", label: "Impermeabilizacion piscina", status: "pending" },
      { code: "CTE DB-SUA 1", label: "Barandilla voladizo atico", status: "ok" },
      { code: "CTE DB-HE", label: "Eficiencia cubierta", status: "ok" },
    ],
  },
];

const STATUS_COLOR = { ok: 0x06b6d4, warn: 0xf59e0b, crit: 0xef4444 };

function stressColor(s: number): number {
  const t = Math.max(0, Math.min(1, s));
  let r = 0, g = 0, b = 0;
  if (t < 0.25) { r = 0; g = 4 * t; b = 1; }
  else if (t < 0.5) { r = 0; g = 1; b = 1 - 4 * (t - 0.25); }
  else if (t < 0.75) { r = 4 * (t - 0.5); g = 1; b = 0; }
  else { r = 1; g = 1 - 4 * (t - 0.75); b = 0; }
  return (Math.round(r * 255) << 16) | (Math.round(g * 255) << 8) | Math.round(b * 255);
}

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

const roundedRect = (THREE: any, w: number, d: number, r: number) => {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hd = d / 2;
  shape.moveTo(-hw + r, -hd);
  shape.lineTo(hw - r, -hd);
  shape.quadraticCurveTo(hw, -hd, hw, -hd + r);
  shape.lineTo(hw, hd - r);
  shape.quadraticCurveTo(hw, hd, hw - r, hd);
  shape.lineTo(-hw + r, hd);
  shape.quadraticCurveTo(-hw, hd, -hw, hd - r);
  shape.lineTo(-hw, -hd + r);
  shape.quadraticCurveTo(-hw, -hd, -hw + r, -hd);
  return shape;
};

export function Building3DSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>({});
  const [selected, setSelected] = useState<FloorData | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [viewMode, setViewMode] = useState<"arq" | "fem">("arq");

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
      renderer.toneMappingExposure = 1.15;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x050814, 45, 120);

      const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 200);
      camera.position.set(26, 10, 28);

      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 5.5, -0.5);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 22;
      controls.maxDistance = 90;
      controls.maxPolarAngle = Math.PI / 2.1;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.22;

      scene.add(new THREE.AmbientLight(0xffffff, 0.38));
      const key = new THREE.DirectionalLight(0xffffff, 1.2);
      key.position.set(20, 28, 14);
      scene.add(key);
      const fillV = new THREE.DirectionalLight(0x8b5cf6, 0.55);
      fillV.position.set(-22, 16, -8);
      scene.add(fillV);
      const fillC = new THREE.DirectionalLight(0x06b6d4, 0.4);
      fillC.position.set(0, 12, -22);
      scene.add(fillC);
      const rim = new THREE.DirectionalLight(0xffffff, 0.42);
      rim.position.set(0, 8, 32);
      scene.add(rim);

      const slabMatArq = new THREE.MeshPhysicalMaterial({
        color: 0xf2efe6,
        metalness: 0.06,
        roughness: 0.42,
        clearcoat: 0.38,
        clearcoatRoughness: 0.22,
      });
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x141418,
        metalness: 0.28,
        roughness: 0.55,
      });
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xc8dde8,
        metalness: 0,
        roughness: 0.04,
        transmission: 0.85,
        opacity: 0.35,
        transparent: true,
        ior: 1.45,
        thickness: 0.1,
      });
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0xe8e6de,
        metalness: 0.35,
        roughness: 0.28,
      });
      const windowBandMat = new THREE.MeshPhysicalMaterial({
        color: 0x1a2530,
        metalness: 0.55,
        roughness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        emissive: 0x0a1520,
        emissiveIntensity: 0.3,
      });

      const SLAB_H = 0.22;
      const hitboxes: any[] = [];
      const highlightMap: Record<number, any> = {};
      const slabsByFloor: Record<number, any[]> = {};
      const femBarsByFloor: Record<number, any> = {};
      let yCursor = 0;

      FLOORS.forEach((floor) => {
        const FLOOR_H = floor.h;
        const fgroup = new THREE.Group();
        const color = STATUS_COLOR[floor.status];
        const femC = stressColor(floor.utilization / 100);

        slabsByFloor[floor.id] = [];

        const slabShape = roundedRect(THREE, floor.w, floor.d, 0.5);
        const slabGeo = new THREE.ExtrudeGeometry(slabShape, {
          depth: SLAB_H,
          bevelEnabled: true,
          bevelThickness: 0.04,
          bevelSize: 0.04,
          bevelSegments: 3,
        });
        slabGeo.rotateX(-Math.PI / 2);

        const slabMatFem = new THREE.MeshPhysicalMaterial({
          color: femC,
          metalness: 0.1,
          roughness: 0.55,
          clearcoat: 0.2,
          emissive: femC,
          emissiveIntensity: 0.18,
        });

        const slab = new THREE.Mesh(slabGeo, slabMatArq);
        slab.position.set(floor.ox, yCursor, floor.oz);
        slab.userData.matArq = slabMatArq;
        slab.userData.matFem = slabMatFem;
        fgroup.add(slab);
        slabsByFloor[floor.id].push(slab);

        const insetBase = floor.id === 0 ? 1.4 : 0.8;
        const coreW = Math.max(floor.w - insetBase, 1.2);
        const coreD = Math.max(floor.d - insetBase, 1.0);
        const coreH = FLOOR_H - SLAB_H;
        const coreShape = roundedRect(THREE, coreW, coreD, 0.2);
        const coreGeo = new THREE.ExtrudeGeometry(coreShape, {
          depth: coreH,
          bevelEnabled: false,
        });
        coreGeo.rotateX(-Math.PI / 2);
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.set(floor.ox, yCursor + SLAB_H, floor.oz);
        fgroup.add(core);

        const bandH = coreH * 0.78;
        const bandY = yCursor + SLAB_H + coreH / 2;
        const bandW = coreW - 0.15;
        const bandD = coreD - 0.15;

        const bandFront = new THREE.Mesh(new THREE.PlaneGeometry(bandW, bandH), windowBandMat);
        bandFront.position.set(floor.ox, bandY, floor.oz + coreD / 2 + 0.008);
        fgroup.add(bandFront);

        const bandBack = new THREE.Mesh(new THREE.PlaneGeometry(bandW, bandH), windowBandMat);
        bandBack.position.set(floor.ox, bandY, floor.oz - coreD / 2 - 0.008);
        bandBack.rotation.y = Math.PI;
        fgroup.add(bandBack);

        const bandLeft = new THREE.Mesh(new THREE.PlaneGeometry(bandD, bandH), windowBandMat);
        bandLeft.position.set(floor.ox - coreW / 2 - 0.008, bandY, floor.oz);
        bandLeft.rotation.y = Math.PI / 2;
        fgroup.add(bandLeft);

        const bandRight = new THREE.Mesh(new THREE.PlaneGeometry(bandD, bandH), windowBandMat);
        bandRight.position.set(floor.ox + coreW / 2 + 0.008, bandY, floor.oz);
        bandRight.rotation.y = -Math.PI / 2;
        fgroup.add(bandRight);

        const accentSize = Math.min(bandH * 0.6, 0.55);
        const accentGeoA = new THREE.PlaneGeometry(accentSize * 1.4, accentSize);
        const accentMatArq = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: floor.status === "ok" ? 0.4 : 0.75,
        });
        const accentArq = new THREE.Mesh(accentGeoA, accentMatArq);
        accentArq.position.set(floor.ox + coreW * 0.28, bandY, floor.oz + coreD / 2 + 0.014);
        fgroup.add(accentArq);
        slabsByFloor[floor.id].push(accentArq);
        accentArq.userData.isAccentArq = true;

        const canvasBar = document.createElement("canvas");
        canvasBar.width = 128;
        canvasBar.height = 16;
        const ctx = canvasBar.getContext("2d")!;
        const grad = ctx.createLinearGradient(0, 0, 128, 0);
        const stops = 8;
        for (let i = 0; i <= stops; i++) {
          const t = (i / stops) * (floor.utilization / 100);
          const c = stressColor(t);
          const hex = "#" + c.toString(16).padStart(6, "0");
          grad.addColorStop(i / stops, hex);
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 16);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "right";
        ctx.fillText(floor.utilization + "%", 124, 12);

        const tex = new THREE.CanvasTexture(canvasBar);
        tex.needsUpdate = true;
        const femBarMat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.95,
        });
        const femBarW = Math.min(coreW * 0.85, 3.5);
        const femBarH = 0.32;
        const femBar = new THREE.Mesh(new THREE.PlaneGeometry(femBarW, femBarH), femBarMat);
        femBar.position.set(floor.ox, yCursor + SLAB_H + 0.03, floor.oz + coreD / 2 + 0.05);
        femBar.rotation.x = -Math.PI / 2;
        femBar.visible = false;
        fgroup.add(femBar);
        femBarsByFloor[floor.id] = femBar;

        if (floor.id > 0) {
          const railH = 0.55;
          const railT = 0.03;
          const railSides = [
            { len: floor.w, pos: [floor.ox, floor.oz + floor.d / 2] as [number, number], rot: 0 },
            { len: floor.d, pos: [floor.ox + floor.w / 2, floor.oz] as [number, number], rot: Math.PI / 2 },
            { len: floor.d, pos: [floor.ox - floor.w / 2, floor.oz] as [number, number], rot: -Math.PI / 2 },
          ];
          railSides.forEach((side) => {
            const g = new THREE.Mesh(new THREE.BoxGeometry(side.len - 0.3, railH, railT), glassMat);
            g.position.set(side.pos[0], yCursor + SLAB_H + railH / 2 + 0.02, side.pos[1]);
            g.rotation.y = side.rot;
            fgroup.add(g);
            const cap = new THREE.Mesh(new THREE.BoxGeometry(side.len - 0.3, 0.035, 0.07), frameMat);
            cap.position.set(side.pos[0], yCursor + SLAB_H + railH + 0.02, side.pos[1]);
            cap.rotation.y = side.rot;
            fgroup.add(cap);
          });
        }

        const ringShape = roundedRect(THREE, floor.w + 0.1, floor.d + 0.1, 0.55);
        const ringGeo = new THREE.ExtrudeGeometry(ringShape, { depth: SLAB_H + 0.02, bevelEnabled: false });
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: floor.status === "ok" ? 0.0 : 0.2,
          wireframe: true,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(floor.ox, yCursor - 0.01, floor.oz);
        ring.userData.baseOpacity = ringMat.opacity;
        fgroup.add(ring);
        highlightMap[floor.id] = ring;

        const hit = new THREE.Mesh(
          new THREE.BoxGeometry(floor.w + 0.25, FLOOR_H, floor.d + 0.25),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        hit.position.set(floor.ox, yCursor + FLOOR_H / 2, floor.oz);
        hit.userData.floorId = floor.id;
        fgroup.add(hit);
        hitboxes.push(hit);

        if (floor.complexity === "complex" && floor.id > 0) {
          const planterMat = new THREE.MeshStandardMaterial({ color: 0xe8e6de, roughness: 0.55, metalness: 0.15 });
          const leafMat = new THREE.MeshStandardMaterial({ color: 0x1e5a3a, roughness: 0.85, metalness: 0 });
          const px = floor.ox + floor.w * 0.15;
          const pz = floor.oz + floor.d / 2 - 0.25;
          const planter = new THREE.Mesh(new THREE.BoxGeometry(floor.w * 0.3, 0.16, 0.22), planterMat);
          planter.position.set(px, yCursor + SLAB_H + 0.09, pz);
          fgroup.add(planter);
          const nLeaves = 4;
          for (let lv = 0; lv < nLeaves; lv++) {
            const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.14 + Math.random() * 0.08, 0), leafMat);
            const t = (lv / (nLeaves - 1) - 0.5) * floor.w * 0.28;
            leaf.position.set(px + t, yCursor + SLAB_H + 0.28, pz);
            fgroup.add(leaf);
          }
        }
        scene.add(fgroup);
        yCursor += FLOOR_H;
      });

      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(55, 64),
        new THREE.MeshStandardMaterial({ color: 0x0a0d18, metalness: 0.15, roughness: 0.95 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.52;
      scene.add(ground);

      const grid = new THREE.GridHelper(110, 55, 0x8b5cf6, 0x1e293b);
      grid.position.y = -0.5;
      (grid.material as any).opacity = 0.22;
      (grid.material as any).transparent = true;
      scene.add(grid);

      const treeMat = new THREE.MeshStandardMaterial({ color: 0x1a3a2a, roughness: 0.9 });
      for (let t = 0; t < 26; t++) {
        const angle = (t / 26) * Math.PI * 2 + Math.random() * 0.3;
        const r = 18 + Math.random() * 8;
        const size = 0.5 + Math.random() * 0.5;
        const tree = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 0), treeMat);
        tree.position.set(Math.cos(angle) * r, size - 0.3, Math.sin(angle) * r);
        tree.rotation.y = Math.random() * Math.PI;
        scene.add(tree);
      }

      const topFloor = FLOORS[FLOORS.length - 1];
      const poolMat = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        metalness: 0,
        roughness: 0.1,
        transmission: 0.55,
        opacity: 0.88,
        transparent: true,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.22,
      });
      const pool = new THREE.Mesh(
        new THREE.BoxGeometry(topFloor.w * 0.4, 0.04, topFloor.d * 0.45),
        poolMat
      );
      pool.position.set(topFloor.ox + topFloor.w * 0.2, yCursor - 0.02, topFloor.oz);
      scene.add(pool);

      const antennaMat = new THREE.MeshStandardMaterial({ color: 0x444448, metalness: 0.8, roughness: 0.4 });
      for (let a = 0; a < 2; a++) {
        const ant = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 1.2 + Math.random() * 0.5, 8),
          antennaMat
        );
        ant.position.set(
          topFloor.ox - topFloor.w * 0.25 + (Math.random() - 0.5),
          yCursor + 0.6,
          topFloor.oz + (Math.random() - 0.5) * 1
        );
        scene.add(ant);
      }

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onPointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hitboxes);
        if (hits.length > 0) {
          canvas.style.cursor = "pointer";
          setHover(hits[0].object.userData.floorId);
        } else {
          canvas.style.cursor = "grab";
          setHover(null);
        }
      };

      const onClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(hitboxes);
        if (hits.length > 0) {
          const id = hits[0].object.userData.floorId;
          const floor = FLOORS.find((f) => f.id === id) || null;
          setSelected(floor);
          controls.autoRotate = false;
        }
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("click", onClick);

      sceneRef.current = { scene, camera, renderer, controls, highlightMap, slabsByFloor, femBarsByFloor };

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
    const map = sceneRef.current?.highlightMap;
    if (!map) return;
    Object.entries(map).forEach(([id, ring]: [string, any]) => {
      const fid = Number(id);
      const base = ring.userData.baseOpacity;
      if (selected?.id === fid) ring.material.opacity = 1;
      else if (hover === fid) ring.material.opacity = Math.min(base + 0.4, 1);
      else ring.material.opacity = base;
    });
  }, [selected, hover]);

  useEffect(() => {
    const { slabsByFloor, femBarsByFloor } = sceneRef.current || {};
    if (!slabsByFloor) return;

    Object.values(slabsByFloor).forEach((meshList: any) => {
      meshList.forEach((mesh: any) => {
        if (mesh.userData.matArq && mesh.userData.matFem) {
          mesh.material = viewMode === "fem" ? mesh.userData.matFem : mesh.userData.matArq;
        }
        if (mesh.userData.isAccentArq) {
          mesh.visible = viewMode === "arq";
        }
      });
    });

    if (femBarsByFloor) {
      Object.values(femBarsByFloor).forEach((bar: any) => {
        bar.visible = viewMode === "fem";
      });
    }
  }, [viewMode, ready]);

  return (
    <section className="relative border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-violet-300">
            Gemelo digital estructural
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Cada planta, un{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              informe vivo
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Desde el modelo analitico de Revit al informe de cumplimiento en un clic. Alterna entre la vista arquitectonica (plantas, terrazas, voladizos) y la vista FEM (utilizacion jet colormap). Click en cualquier planta abre su informe.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div
            ref={wrapRef}
            className="relative col-span-1 h-[640px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_0_80px_-20px_rgba(139,92,246,0.4)] lg:col-span-8"
          >
            <canvas ref={canvasRef} className="h-full w-full" style={{ cursor: "grab" }} />

            <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 font-mono text-[10px] text-slate-400 backdrop-blur">
              agente-estructural v12.4 | {ready ? "FEM ready - 8 plantas" : "cargando..."}
            </div>

            <div className="absolute left-4 top-4 flex rounded-lg border border-white/10 bg-slate-950/85 p-0.5 backdrop-blur">
              <button
                onClick={() => setViewMode("arq")}
                className={
                  "rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition " +
                  (viewMode === "arq"
                    ? "bg-violet-500/25 text-violet-200"
                    : "text-slate-400 hover:text-white")
                }
              >
                Arquitectonica
              </button>
              <button
                onClick={() => setViewMode("fem")}
                className={
                  "rounded px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition " +
                  (viewMode === "fem"
                    ? "bg-cyan-500/25 text-cyan-200"
                    : "text-slate-400 hover:text-white")
                }
              >
                FEM
              </button>
            </div>

            {viewMode === "fem" ? (
              <div className="pointer-events-none absolute right-4 top-4 rounded-lg border border-white/10 bg-slate-950/85 p-3 backdrop-blur">
                <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-slate-400">Utilizacion por planta</div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-28 w-3 rounded"
                    style={{ background: "linear-gradient(to top, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)" }}
                  />
                  <div className="flex h-28 flex-col justify-between font-mono text-[9px] text-slate-300">
                    <span>&gt;82%</span>
                    <span>66%</span>
                    <span>50%</span>
                    <span>33%</span>
                    <span>&lt;15%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pointer-events-none absolute top-4 right-4 flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-1.5 text-[10px] backdrop-blur">
                <span className="flex items-center gap-1 text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>CUMPLE
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="h-2 w-2 rounded-full bg-amber-400"></span>REVISAR
                </span>
                <span className="flex items-center gap-1 text-red-400">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>CRITICO
                </span>
              </div>
            )}
          </div>

          <div className="col-span-1 flex h-[640px] flex-col rounded-2xl border border-white/10 bg-slate-950/60 lg:col-span-4">
            {selected ? (
              <FloorPanel floor={selected} onClose={() => setSelected(null)} />
            ) : (
              <EmptyPanel />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyPanel() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <p className="text-sm font-medium text-white">Selecciona una planta</p>
      <p className="mt-2 text-xs text-slate-400">
        Haz click en cualquier nivel del edificio para ver su informe: utilizacion estructural, alertas y normativa aplicable.
      </p>
      <div className="mt-6 flex flex-col gap-1 text-[11px] text-slate-500">
        <span>Arrastrar = rotar</span>
        <span>Rueda del raton = zoom</span>
      </div>
    </div>
  );
}

function FloorPanel({ floor, onClose }: { floor: FloorData; onClose: () => void }) {
  const cfg = {
    ok: { label: "CUMPLE", color: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/30", bar: "bg-emerald-400" },
    warn: { label: "REVISAR", color: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/30", bar: "bg-amber-400" },
    crit: { label: "CRITICO", color: "text-red-300", bg: "bg-red-500/10", border: "border-red-500/30", bar: "bg-red-400" },
  }[floor.status];
  const cx = { simple: "Simple", med: "Media", complex: "Compleja" }[floor.complexity];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between border-b border-white/10 p-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Planta {floor.name}</div>
          <div className="mt-1 text-xl font-semibold text-white">{floor.use}</div>
          <div className="mt-1 font-mono text-[10px] text-slate-500">Geometria: {cx}</div>
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

        <div className="mb-5">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Utilizacion estructural</span>
            <span className={"font-mono text-lg font-semibold " + cfg.color}>{floor.utilization}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div className={"h-full rounded-full transition-all " + cfg.bar} style={{ width: floor.utilization + "%" }} />
          </div>
        </div>

        {floor.alerts.length > 0 && (
          <div className="mb-5">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Alertas ({floor.alerts.length})</div>
            <div className="space-y-2">
              {floor.alerts.map((a, i) => (
                <div key={i} className="flex gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span>
                  <span className="text-xs text-slate-300">{a}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Normativa aplicable ({floor.norms.length})</div>
          <div className="space-y-1.5">
            {floor.norms.map((n, i) => {
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
          href={"mailto:hola@nexusfinlabs.com?cc=palacio.laura@gmail.com&subject=STRUXAI%20-%20Revisar%20planta%20" + floor.name}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:from-violet-500 hover:to-blue-500"
        >
          Pedir revision de esta planta
        </a>
      </div>
    </div>
  );
}
