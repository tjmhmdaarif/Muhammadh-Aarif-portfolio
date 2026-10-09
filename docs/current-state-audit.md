# Current State Audit — Burning Sakura Portfolio

## Executive Summary

The portfolio runs on React + Three.js + React Three Fiber + Framer Motion with a scroll-driven 3D world (BurningSakuraWorld). Two primary defects are observed:

---

## Defect 1: Real photograph does not appear

### Observed behavior

- The `GateSection` component at `src/sections/GateSection.tsx:56-72` loads the portrait from `profile.portrait` (`/portrait.png`).
- The image has `loading="eager"` and an `onError` fallback to `profile.portraitFallback` (GitHub avatar).
- The portrait is wrapped in a `motion.div` with fade/scale/y translation animation.
- If the image fails, it hides itself (`img.style.display = 'none'`).

### Root cause (observed)

The `/portrait.png` file in `public/` is **1,563 bytes** — far too small for a portrait image (typically >50KB). This suggests it may be a corrupted, incomplete, or placeholder file rather than a real photograph. When the browser attempts to render it, the image fails to load, triggering the fallback to the GitHub avatar avatar.

**Verification:** The onError handler fires, the fallback GitHub avatar (`https://avatars.githubusercontent.com/u/193417283?v=4&s=800`) loads instead, and the original portrait remains absent.

### Hypothesis (unverified)

The portrait file may have been compressed to an extreme degree, or the path/filename may be incorrect. No verified photograph is currently accessible at `/portrait.png`.

### Fix required

- Replace `/portrait.png` with a verified high-resolution portrait, or
- Ensure the existing file is a valid portrait image, or
- Update `profile.portrait` in `src/data/portfolio.ts` to point to a working image.

---

## Defect 2: Scrolling does not produce intended scene transitions

### Observed behavior

- The scroll progress is tracked by `useScrollStore.tsx` which monitors `window.scrollY`, computes `progress` (0 to 1), `velocity`, and `sectionIndex`.
- `CameraRig` in `BurningSakuraWorld.tsx` uses `stateRef.current.progress` to compute camera position via `cameraX(p)`, `cameraY(p)`, `cameraZ(p)`.
- Section headings animate in via Framer Motion `whileInView` as sections enter the viewport.
- A `ProgressRail` shows scroll progress, and `SideRail` nav dots indicate active section.

### Issues identified

1. **Section ID mismatches**: The `useScrollStore` queries `document.getElementById(sections[i].id)` at `useScrollStore.tsx:62-65`. The `sections` array in `portfolio.ts:661-668` lists: `gate`, `forge`, `projects`, `hall`, `skills`, `journey`, `lantern`. These must match `id=` attributes on actual section elements. Inspection confirms all section IDs are correctly set.

2. **Camera rigidity**: The `CameraRig` uses a spring-style damping (`k = 1 - Math.pow(0.0015, dt)`) which creates a lagged, smooth-following camera. This may not produce the "cinematic scroll-scrubbed" feel intended — the camera may feel too sluggish or not synchronized enough with scroll progress.

3. **No explicit scene boundaries**: The 8 scenes (Gate, Forge, Projects, Hall, Skills, Journey, Lantern, and the 3D world itself) have no explicitly defined boundaries or segment lengths. Section-to-scene mapping relies on viewport intersection, which may cause jumps or gaps.

4. **Lenis not integrated**: The codebase does not use Lenis for smooth scrolling. Native scroll is used directly, which can feel janky compared to Lenis-boosted scrolling. However, the ScrollTrigger-driven camera rig partially compensates.

5. **Reduced motion not fully respected in 3D**: `MotionConfig` in `App.tsx:57` sets `reducedMotion` based on `useReducedMotionPref()`, but the Three.js scene continues running with particle systems, fog, and camera movement. No reduced-motion fallback disables the 3D entirely.

### Fix required

- Tighten camera-to-scroll synchronization (consider shorter damping coefficient or direct position mapping).
- Define explicit scene boundaries with clear start/end scroll positions.
- Add reduced-motion strategy that either freezes 3D or switches to a static scroll-reveal.
- Consider integrating Lenis for improved scroll feel, synchronized with ScrollTrigger.

---

## Additional observations

- The `ProgressRail` and `SideRail` components read from the same scroll store — they are functional.
- The `ToggleBar` enables scene3d/motion/wind toggles — functional.
- All section components use `whileInView` with the same easing curve `[0.22, 1, 0.36, 1]` — consistent but generic.
- The 3D world has 8 implicit zones (ToriiGate, TreeLine, FallingPetals, EmberField, VolcanicForge, ProjectSteles, CeremonialHall, SkillConstellation, PathTorches, FinalLantern) positioned at z-coordinates from 0 to -238.
- No heatmaps, data visualizations, or technical diagrams are currently present in the codebase or deployed site.
- No real LinkedIn media, photographs, or event imagery is integrated beyond the portrait fallback.

---

## Recommendation

Begin implementation with the portrait fix (replace/verify the image), then rebuild the scroll-world engine with explicit scene boundaries and improved camera-scroll synchronization. The existing component structure is sound but requires the documented defects to be resolved before the cinematic experience can function as intended.