# AGENTS.md — Burning Sakura: The Digital Ronin

## Project Identity

- **Name**: Burning Sakura: The Digital Ronin
- **Tagline**: A cinematic samurai-era journey through verified projects, forged in fire and sakura
- **Owner**: Muhammadh Aarif T J
- **Role**: Software & automation engineer building agentic AI, RAG pipelines and digital twins

## Design Principles

- Japanese samurai-era brutalism: obsidian, crimson, gold, ash
- Burning sakura = resilience, discipline, transformation, forward movement
- Cinematic scroll-driven storytelling, not generic gallery
- Real identity, real assets, no fabricated metrics
- Motion explains and enhances content, never merely decorates
- Accessibility first: reduced-motion, keyboard-navitable, screen-reader friendly
- Performance budget: 60 FPS, LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1

## Existing Architecture

- **Framework**: React 19 + TypeScript + Vite 7
- **3D**: Three.js + React Three Fiber + @react-three/drei
- **Animation**: Framer Motion 12
- **Scroll**: Custom scroll progress (window.scrollY-driven), GSAP added for potential ScrollTrigger
- **Styling**: Global CSS with CSS variables for design tokens
- **Data**: All profile data in src/data/portfolio.ts

## Key Components

| Component | Purpose | Notes |
|-----------|---------|-------|
| `App.tsx` | Root container | Sets up scroll progress refs, MotionConfig, WebGL fallback |
| `BurningSakuraWorld.tsx` | 3D scene | 8-scene cinematic world, camera rig, particles, depth layers |
| `GateSection.tsx` | Hero/introduction | Portrait, name treatment, CTA, kanji watermark |
| `ForgeSection.tsx` | Foundations | Education, currently shipping, open roles |
| `ProjectsSection.tsx` | Case studies | Editorial project cards with expandable dossiers |
| `HallSection.tsx` | Achievements | Awards, certifications, events timeline |
| `ConstellationSection.tsx` | Skills | Interactive skill constellation, keyboard-navitable |
| `JourneySection.tsx` | Timeline | Education → milestones → current work |
| `LanternSection.tsx` | Contact | Contact grid, verified links, CTA |
| `Chrome.tsx` | UI chrome | Progress rail, nav toggles, scene/motion/wind toggles |

## Known Defects (from audit)

1. **Portrait image**: `/portrait.png` is 1,563 bytes (insufficient). Fallback to GitHub avatar works. Real photograph must be supplied.
2. **Scroll feel**: Camera lag damping may feel too sluggish; consider shorter damping or direct ScrollTrigger mapping.

## Commands

### `/portfolio-audit`

Purpose: Inspect the website, diagnose broken portrait and scrolling behavior, audit the repository, and produce a prioritized repair plan.

**Output**: `docs/current-state-audit.md`, `docs/asset-inventory.md`, identified defects.

### `/portfolio-research`

Purpose: Investigate GitHub, accessible LinkedIn content, projects, photographs, event media, achievements, heatmaps, and technical visualizations. Produce a sourced asset and content inventory.

**Output**: `docs/asset-inventory.md`, verified project data, photograph sourcing status.

### `/portrait-fix`

Purpose: Trace the actual portrait-loading failure, fix its cause, verify image visibility and production loading, and test responsive behavior.

**Output**: Fixed portrait component, updated `profile.portrait` documentation, verified fallback.

### `/motion-audit`

Purpose: Inspect camera movement, animation ownership, scroll synchronization, reverse scrolling, cleanup, and reduced-motion behavior.

**Output**: Verified camera-scroll sync, reduced-motion gating, cleaned animation timelines.

### `/heatmap-lab`

Purpose: Discover existing heatmaps and technical visualizations, verify their provenance, and implement an accurate interactive visualization where appropriate.

**Output**: `docs/asset-inventory.md` updated, any new visualizations integrated.

### `/performance-audit`

Purpose: Measure rendering performance, asset loading, WebGL costs, layout shifts, and responsive behavior; then fix identified bottlenecks.

**Output**: Performance report (LCP, INP, CLS, FPS), optimized assets, reduced particle counts if needed.

### `/portfolio-qa`

Purpose: Run functional, responsive, accessibility, and browser-level checks; reproduce failures and verify fixes.

**Output**: QA report, listed defects, fixes applied.

### `/portfolio-release`

Purpose: Run the final build and regression checks, verify deployment configuration, and produce a truthful release report.

**Output**: Production build verified, deployment config checked, release notes produced.

## Skills (`.opencode/skills/`)

### `creative-frontend`

Expertise in editorial design, responsive layouts, visual hierarchy, typography, component architecture, and polished interface implementation.

**Workflow**: Audit design principles → analyze existing layout → implement visual system → integrate profile data → verify responsive behavior → accessibility check.

**Quality standards**: Consistent design tokens, readable typography hierarchy, accessible color contrast, no broken focus states, responsive down to 320px.

**Verification**: TypeScript compile, `npm run dev` visual check, Lighthouse Accessibility score.

### `scroll-world`

Expertise in continuous camera travel, scroll-scrubbed sequences, GSAP ScrollTrigger, scene synchronization, and robust reverse-scroll behavior.

**Workflow**: Establish scroll progress source → map to scene boundaries → drive camera/particle systems → add reduced-motion fallback → test reverse/rapid navigation.

**Quality standards**: Consistent 60 FPS during scroll, no abrupt camera jumps, reverse scrolling works, direct navigation to sections works, rapid scrolling doesn't break state.

**Verification**: Manual scroll testing, reduced-motion toggle, Chrome/Firefox/Safari testing.

### `threejs-performance`

Expertise in Three.js, React Three Fiber where appropriate, instancing, shader optimization, GPU resource management, and adaptive quality.

**Workflow**: Audit scene geometry → optimize materials → apply instancing where appropriate → bake lighting if static → test mobile performance → adapt quality via pixel ratio.

**Quality standards**: Instanced meshes for particle systems, shared geometry/materials, no unbounded growth, adaptive dpr, graceful WebGL fallback.

**Verification**: Production build, FPS measurement, mobile viewport test, reduced-motion test.

### `portfolio-research`

Expertise in evidence-based profile research, repository inspection, asset discovery, source tracking, and truthful project storytelling.

**Workflow**: Inspect GitHub profile → verify repository READMEs → locate project screenshots/diagrams → trace photograph origins → cross-reference LinkedIn public content → document findings.

**Quality standards**: No fabricated metrics or credentials, all project data verified against repo, photograph provenance tracked, LinkedIn content used only as visual support.

**Verification**: `docs/current-state-audit.md`, `docs/asset-inventory.md` truthfulness check.

### `portfolio-visualization`

Expertise in interactive heatmaps, technical diagrams, spatial data visualization, animated architecture diagrams, and accessible data presentation.

**Workflow**: Determine visualization type → obtain or generate data → build Canvas/WebGL/Three.js viz → map interaction patterns → add accessible labels/descriptions → test reduced-motion.

**Quality standards**: Data accuracy preserved, axes/labels/scales respected, no arbitrary values, accessible alternative text, keyboard-navitable controls.

**Verification**: Data source audit, accessible labels present, reduced-motion gating.

### `motion-accessibility`

Expertise in reduced-motion design, keyboard-accessible interactions, scroll behavior, focus management, and alternatives to hover-dependent interactions.

**Workflow**: Identify all hover-dependent interactions → provide keyboard alternatives → implement `prefers-reduced-motion` gating → test with screen reader → verify focus states remain visible.

**Quality standards**: No essential content trapped in 3D scene, reduced-motion freezes or simplifies animation, focus visible on all interactive elements, no hover-only information.

**Verification**: Screen reader testing, keyboard-only navigation, reduced-motion preference check.

### `portfolio-qa`

Expertise in browser testing, responsive verification, console-error investigation, broken asset detection, and regression testing.

**Workflow**: Run production build → check for console errors → verify all links → test responsive breakpoints → test reduced-motion → run Lighthouse → check accessibility with axe.

**Quality standards**: Zero console errors on initial load, all internal/external links correct, mobile navigation works, Lighthouse scores meet budget, CLS ≤ 0.1.

**Verification**: Full QA report, listed defects, fixes applied.

## Performance Requirements

- **60 FPS** on suitable desktop during representative interactions
- **LCP** at or below 2.5 seconds under defined conditions
- **INP** at or below 200 milliseconds under defined conditions
- **CLS** at or below 0.1
- **No unbounded particle growth** — petal count responsive to viewport
- **No unnecessary off-screen animation** — all animations have defined start/end
- **Reduced-motion preference** respected — 3D freezes or switches to static scroll-reveal

## Accessibility Requirements

- Semantic HTML throughout
- Keyboard-accessible navigation (Tab order, focus states)
- Visible focus states on all interactive elements
- Readable contrast against obsidian/charcoal backgrounds
- Accessible image descriptions on portrait and all data visualizations
- No hover-only information (skills constellation keyboard-navitable)
- No essential content trapped in the 3D scene (always accessible via HTML fallback)
- No unexpected sound
- No forced scrolling
- No horizontal overflow
- No mandatory orientation changes

## Definition of Done

- [ ] Real portrait integrated and visible (independent of 3D, or clearly documented as pending)
- [ ] 8-scene cinematic scroll-world drives narrative forward
- [ ] Scroll progress → camera/sequence mapping works forward and reverse
- [ ] Project case studies are interactive editorial views
- [ ] Achievements/events are evidence-backed and animated reveal
- [ ] Skills constellation is interactive and keyboard-navitable
- [ ] Reduced-motion behavior works correctly (prefers-reduced-motion media query)
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (measured via Lighthouse)
- [ ] No console errors on initial load
- [ ] Production build passes `npx tsc --noEmit` and `vite build`
- [ ] Deployed site verified on Chrome, Firefox, Safari, Edge (latest versions)
- [ ] All deliverables produced (docs, agents, commands, skills, rebuilt portfolio)