# StruxAI

Plataforma de **cálculo estructural con IA** que conecta **Revit + BIM + FEM**: extracción BIM, modelo analítico, validación, cálculo FEM, diseño normativo, resultados en Revit, reporting y QA con trazabilidad.

> La IA es **copiloto**, no sustituto del criterio de ingeniería. Núcleo del producto: **BIM → modelo analítico → FEM → resultados → Revit**.

## Sitio marketing (este repositorio)

La raíz del repo es una app **Next.js 15** + **Tailwind** (landing oscura/clara, textos **EN/ES** con **i18next**).

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Producción: `npm run build` y `npm run start`.

Dominio previsto: [struxai.nexusfinlabs.com](https://struxai.nexusfinlabs.com).

## Stack orientativo (producto)

- **BIM:** Revit, Revit API, Dynamo, APS  
- **FEM:** Robot, ETABS / SAP2000, OpenSees / OpenSeesPy  
- **Backend:** .NET, Python/FastAPI, mensajería, Redis, PostgreSQL  
- **Frontend:** React, Next.js, APS Viewer, Three.js / Plotly  

La especificación detallada del proyecto (roadmap, fases, arquitectura) puede mantenerse en documentos aparte en el mismo repo o en la wiki del equipo.

## Licencia y contacto

© NexusFinLabs — [nexusfinlabs.com](https://nexusfinlabs.com)
