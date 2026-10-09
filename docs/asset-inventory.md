# Asset Inventory — Burning Sakura Portfolio

## Photographs and Portraits

| File | Size | Type | Status | Notes |
|------|------|------|--------|-------|
| `public/portrait.png` | 1,563 bytes | PNG portrait | **DEFECT** — too small for a real portrait; likely corrupted/placeholder | Loads in GateSection; onError falls back to GitHub avatar |
| `public/portrait-lc.png` | 2,589 bytes | PNG (likely low-res/crop) | **ACCESSIBLE** | Not currently used in component code |
| GitHub avatar fallback | — | SVG/HTML-generated | **ACTIVE** | `https://avatars.githubusercontent.com/u/193417283?v=4&s=800` used as portraitFallback in portfolio.ts |

**Action:** Replace `/portrait.png` with a verified high-resolution portrait photograph, or confirm the existing file is suitable and fix any loading issue.

---

## 3D Models, Geometries, and Textures (generated in code)

All Three.js geometries, materials, and instanced meshes are generated procedurally in `src/scene/BurningSakuraWorld.tsx`. No external `.glb`, `.obj`, or texture image files are imported from `public/`.

**Environment elements (procedural):**
- Sakura trees with bark and blossom materials
- Falling petals (instanced mesh)
- Ember field (points with colors)
- Volcanic forge with rock/lava materials
- Torii gate structures
- Project steles (stone + rune markers)
- Ceremonial hall with stone columns + gold torus
- Skill constellation (procedural point/line geometry)
- Path torches with animated lights
- Final lantern with animated light
- Ash ground plane

**Color palette (defined in BurningSakuraWorld.tsx:C and portfolio.ts):**
- Obsidian: `#090909`
- Bone: `#F1EBDD`
- Vermilion: `#E52B24`
- Crimson: `#8C101B`
- Ember: `#FF6A2A`
- Gold: `#BFA36A`
- Char: `#1a1210`

---

## Data Visualizations and Heatmaps

**None currently present** in the codebase or deployed site.

The portfolio data (`src/data/portfolio.ts`) contains project metrics, but these are textual/chip-based, not graphical heatmaps or charts. No heatmap assets, activity maps, sensor data charts, model evaluation graphs, or network diagrams are included.

**Potential projects with data that could be visualized:**
- WindSense AI: SCADA alarm data, model accuracy (94.8%), false alarm reduction (−60%)
- Voice-Enabled RAG Pipeline: Latency percentiles (P50–P100), chunking strategies (5)
- NeuroVix: 15 voice biomarkers, 4 progression stages
- InfraGuard 2.0: 3D procedural bridge twin, 6+ synthetic telemetry channels
- Python DSA 120: 120-day roadmap, 122+ LeetCode solves

If interactive data visualization is desired, these metrics could be transformed into:
- Scroll-revealed scientific heatmaps
- Spatial 3D data surfaces
- Animated color fields
- Interactive comparison views
- Layered technical visualizations with accessible labels

---

## Project Documentation and Links

All project data is stored in `src/data/portfolio.ts` and verified against public GitHub repositories. See the portfolio.ts file for complete project records including:
- Repository URLs
- Live demo URLs
- Evidence (screenshot/demos)
- Metrics and recognition
- Verification status

---

## Audio Assets

**None currently present.** No sound files, Howler.js assets, or Web Audio API configurations are in the repository.

---

## CSS, SVG, and Visual Assets

| File | Purpose |
|------|---------|
| `src/styles.css` | All global styles, animations, and responsive layouts |
| `public/` directory | Currently contains only portrait images (`portrait.png`, `portrait-lc.png`) |

No SVG icons, decorative images, or background assets beyond the portrait are present. The Three.js scene provides all 3D visual content.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | `^19.2.0` | UI framework |
| `react-dom` | `^19.2.0` | DOM rendering |
| `three` | `^0.182.0` | 3D rendering |
| `@react-three/fiber` | `^9.3.0` | React Three Fiber bridge |
| `@react-three/drei` | `^10.7.6` | Three.js helpers |
| `framer-motion` | `^12.23.12` | Animation/gestures |
| `typescript` | `^5.9.3` | Type safety |
| `vite` | `^7.1.12` | Build/dev server |

---

## Summary of Gaps

- **No verified portrait** — the current `/portrait.png` is likely inadequate; a real photograph is needed.
- **No data visualizations** — no heatmaps, charts, or technical diagrams are present, though project data exists that could be visualized.
- **No external 3D models** — all 3D is procedural; no `.glb`/`.obj` models imported.
- **No audio assets** — no sound implementation.
- **Scroll behavior needs tightening** — camera-scroll synchronization, scene boundaries, and reduced-motion handling need work.

---

## Next Step

Proceed to `docs/implementation-plan.md` to plan the full redesign and rebuild.