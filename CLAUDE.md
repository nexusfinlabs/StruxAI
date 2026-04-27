# CLAUDE.md — guía para Cowork tasks y agentes de Claude Code

Este archivo le dice a Claude (y a cualquier agente trabajando en este repo
desde un sandbox de Cowork o Claude Code) cómo entregar cambios a `main` sin
romper nada.

## Cómo se hacen los commits y los pushes

**No uses `git push` desde el sandbox.** El sandbox de Cowork no tiene acceso
a `~/.ssh/`, `~/.gitconfig`, Keychain ni `gh` CLI, así que cualquier intento
de push autenticado por git local va a fallar.

En su lugar, **usa la skill `github-mcp-push`** (vive en
`.claude/skills/github-mcp-push/SKILL.md` en el meta-repo de Alberto, fuera
del repo de la landing). El protocolo en una línea: lee este CLAUDE.md →
verifica el path real con `mcp__github__get_file_contents` → filtra
artefactos y secrets → push con `mcp__github__push_files` (multi-file) o
`mcp__github__create_or_update_file` (single) → verifica con
`get_file_contents` → reporta hash + URL.

Detalles ampliados (estrategia de rama por riesgo, manejo de errores 401/403/
422, anti-patrones) están en el SKILL.md de esa skill. Si la skill no está
cargada en la sesión, lee primero `SKILL.md` y luego sigue su protocolo.

## Rama de producción y deploy

- **Rama de producción:** `main`.
- **Deploy automático:** Vercel está enganchado a `main`. Cualquier merge o
  commit directo a `main` dispara un build y deploy a
  [`struxai.nexusfinlabs.com`](https://struxai.nexusfinlabs.com).
- **No fuerces history en `main`.** Sin force-push, sin rewrites. Si
  necesitas deshacer algo, hazlo con un commit nuevo (`revert` o fix
  explícito).

## Convenciones de commit (detectadas en `git log`)

Este repo usa **Conventional Commits en castellano**. Tipos vistos:

- `feat(scope):` — nueva funcionalidad
- `fix(scope):` — corrección de bug
- `chore(scope):` — mantenimiento, no funcional
- `docs(scope):` — solo documentación
- `refactor(scope):` — reestructuración interna sin cambio funcional

Scopes habituales: `landing`, `hero`, `navbar`, `timeline`, `3d`, `normativa`,
`FEM`, `trust`, `i18n`, `theme`, `cta`, `footer`, `seo`. Suma scopes nuevos
por sección/feature cuando lo necesites.

**Primera línea**: ≤72 caracteres, modo imperativo, sin punto final. **Cuerpo
opcional** explicando el porqué. **Idioma**: castellano (mantén la coherencia
con el log existente).

Ejemplos del propio repo:

```
feat(navbar): boton login y solicitar demo en turquesa + link a app.struxai
fix(3d): loadScript espera a window.THREE/OrbitControls antes de resolver
chore(landing): actualizar autoría del hero (super-equipo Madrid + LATAM)
```

## Estrategia de rama según riesgo

| Riesgo  | Cambios típicos                                | Estrategia                                       |
|---------|------------------------------------------------|--------------------------------------------------|
| Bajo    | Copy, i18n, typos, docs, ajustes cosméticos    | Commit directo a `main`                          |
| Medio   | Features, refactors, deps, schemas             | Rama `claude/<slug>` + PR (no draft)             |
| Alto    | Breaking changes, infra, secrets, auth         | Rama `claude/<slug>` + **draft PR** + review     |

Cuando dudes entre medio y alto, opta por **alto** (draft PR). El coste de un
PR de más es trivial; el de un merge precipitado puede ser un downtime.

## Qué NO commitear

Ya está cubierto en `.gitignore`, pero como recordatorio: nada de
`node_modules/`, `.next/`, `out/`, `coverage/`, `.env*`, `*.pem`, `*.key`,
`*.bak*`, `next-env.d.ts`, ni archivos `*.tsbuildinfo`. Verifica con
`git check-ignore -v <path>` si dudas sobre algún fichero.

## Estructura del repo

La raíz de este repo **es** la landing (Next.js 15 + Tailwind + i18next). No
hay subdirectorio `struxai-landing/` aquí — eso solo existe en el working
tree local de Alberto, donde conviven varios proyectos bajo
`/Users/alberto/Desktop/SW_AI/struxai/`. Cuando un agente push-ee a este
repo, los paths empiezan en la raíz (`src/...`, `public/...`, `package.json`,
etc.), no en `struxai-landing/...`.
