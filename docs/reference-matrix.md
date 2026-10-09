# Reference Matrix — Burning Sakura: The Digital Ronin

## Research Overview

Investigated 20+ premium design references to extract specific techniques adaptable to the samurai-era brutalist Japanese portfolio. Selected techniques are complementary, not overlapping, with implementation costs rated: **Low** (can be done in 1-2 days), **Medium** (2-5 days), **High** (5+ days or requires architecture changes).

---

## High-End Interactive 3D References

### Lusion
**URL**: https://lusion.co
**Techniques investigated**: High-end interactive 3D, spatial composition, camera movement, relationship between visual environments and interface elements.
**Adaptation**: Use Three.js/React Three Fiber to build the Burning Sakura world with spatial depth — distant mountains, architectural silhouettes, and the portrait all exist in the same 3D space. Camera moves through this space as the user scrolls.
**Implementation cost**: **High** — requires rebuilding the entire 3D scene with proper scene boundaries, field-of-view control, and camera choreography. The existing BurningSakuraWorld.tsx is a good foundation but needs explicit scene boundaries and scroll-scrubbed camera control.

### KPR (kprverse.com)
**Techniques investigated**: Persistent 3D objects connecting product imagery and interface content; spatial navigation between states.
**Adaptation**: Consider a recurring visual artifact (burning sakura petal, ember, or torch flame) that transitions between the hero and project case studies. When a project is "entered," the environment shifts subtly, carrying forward one visual element from the previous scene.
**Implementation cost**: **Medium** — can be done by reusing a small set of 3D objects across scenes with proper material/texture changes. The ember field and falling petals already exist; repurpose them as scene-transition artifacts.

### Prometheus Fuels
**URL**: https://prometheusfuels.com
**Techniques investigated**: Scroll-driven cinematic storytelling; full-screen narrative transitions; camera travel through environments.
**Adaptation**: Map exactly 8 scroll sections to 8 narrative scenes. Each scene transition is a cinematic "cut" or "travel" moment — the camera moves through the gate, advances through the landscape, forges ahead, battles through projects, halls of achievement, constellation of skills, journeys through milestones, and settles at the final ember.
**Implementation cost**: **High** — requires replacing the current scroll-progress-to-camera mapping with explicit GSAP ScrollTrigger scene definitions. Each scene has a start/end position, and the camera animates between them.

### Mammut (eiger-extreme.mammut.com)
**Techniques investigated**: Expressive visual systems; responsive grids; organic interactions; tactile motion.
**Adaptation**: Use the visual language (dark, industrial, tactile) for project thumbnails, navigation feedback, and interactive layouts. The "organicity" can inform how sakura petals and embers move — not random, but following plausible physics (wind zones, gravity).
**Implementation cost**: **Low** — primarily influences visual design decisions (color palette, texture quality, motion feel) rather than requiring structural changes.

### Wix Studio × Pantone
**Techniques investigated**: Responsive grids; organic interactions; tactile motion; color-of-the-year systems.
**Adaptation**: The responsive grid informs how the 8 scenes adapt from desktop to mobile. The "organic" motion of sakura petals following wind zones can be guided by a responsive grid layout that rearranges sections differently at different breakpoints.
**Implementation cost**: **Low** — grid system is already somewhat in place via the section layout; mainly needs mobile optimization.

### Chugi Yoo
**URL**: https://chungiyoo.com
**Techniques investigated**: Expressive typography; circular composition; unusual text pathways; visual experimentation.
**Adaptation**: Use circular or curved text compositions for section markers (the `num` kanji: 壱, 弐, 参, etc.). The unusual text pathways can inspire how the name treatment arcs around the portrait in the hero section. Section numbers could follow circular paths around depth layers.
**Implementation cost**: **Medium** — requires custom typography layout code, but the kanji section numbers already exist; could be enhanced with circular/path-based positioning.

### Pioneer (cornrevolution.resn.global)
**Techniques investigated**: Interactive scientific-style product visualization.
**Adaptation**: Apply relevant ideas to technical project inspection within the Forge and Projects scenes. When a project is selected, a scientific visualization appears: heatmaps, architecture diagrams, data flow graphs. These are lightweight WebGL/Canvas visualizations rather than full 3D.
**Implementation cost**: **Medium** — project case studies will include interactive diagrams; these can be Canvas-based rather than Three.js to preserve performance.

### Noomo (xr.noomoagency.com)
**Techniques investigated**: Playful interactions; small moments of delight; Easter eggs; responsive cursor behavior.
**Adaptation**: Restrained Easter eggs — e.g., when hovering over a skill node, a tiny sakura petal flutters; or cursor leaves a subtle ember trail. These must be optional and respect reduced-motion preferences.
**Implementation cost**: **Low** — small CSS/JS enhancements; must be gated behind `prefers-reduced-motion` and touch detection.

### MotionSites References

#### Orange Horse
**Techniques investigated**: Bold visual energy; strong editorial statements; high-impact first impression.
**Adaptation**: The hero section must immediately establish visual identity — the portrait, the name treatment, the burning sakura environment all combine in a bold cinematic opener. No gradual "build-up"; the identity is front-and-center.
**Implementation cost**: **Medium** — hero redesign is a centerpiece of this project; requires portrait integration, name treatment, and cinematic composition.

#### Motion Frame
**Techniques investigated**: Cinematic framing; visual sequencing; shot composition rules.
**Adaptation**: Each of the 8 scenes should be "framed" like a movie scene — the camera has a designated field of view, the composition follows visual rules (rule of thirds, leading headroom, depth). The scroll progress determines which "shot" is currently visible.
**Implementation cost**: **High** — requires authoring each scene with deliberate camera positions, target points, and field-of-view settings.

#### Undr Drift
**Techniques investigated**: Continuous movement; environmental drift; subtle background motion.
**Adaptation**: The atmospheric sky, distant mountains, and architectural silhouettes in the background layer should have subtle continuous drift — very slow parallax movement that gives the world a living feel without distracting from foreground content.
**Implementation cost**: **Low** — can be added as a slow sinusoidal update to background objects in the useFrame loop.

#### Scroll Landing
**Techniques investigated**: Scroll-driven storytelling; narrative progression through scrolling.
**Adaptation**: This is the core technique — every major section of the site is revealed through scroll, with narrative content appearing/disappearing in sync. The 8 scenes are the direct adaptation of this pattern.
**Implementation cost**: **High** — this is the primary scrolling mechanism; needs to be rebuilt with GSAP ScrollTrigger.

#### Avelon Drive
**Techniques investigated**: Cinematic presentation; transitions; visual pacing.
**Adaptation**: Transitions between scenes should have deliberate pacing — ease-in/out, dwell time at scene boundaries, "breathing" room before the next scene starts. No abrupt cuts.
**Implementation cost**: **Medium** — GSAP ScrollTrigger can animate scene transitions with proper easing; the current whileInView approaches need replacement with scroll-position-based animation.

#### Ancient Oath
**Techniques investigated**: Ceremonial, dark, mythic visual direction; weighty, authoritative feel.
**Adaptation**: The samurai-era brutalist world needs weight and authority — not generic cyberpunk. The color palette (obsidian, crimson, gold, ash), the architectural forms (torii gates, forges, ceremonial halls), and the sakura as a symbol of resilience all contribute. Every element should feel intentional and weighty.
**Implementation cost**: **Low/Medium** — influences design decisions (palette, forms, hierarchy) rather than requiring code changes.

#### Cosmic Mapping
**Techniques investigated**: Spatial relationships; connected visual systems; mapping between data and space.
**Adaptation**: The skills constellation maps technologies as connected nodes — spatial proximity indicates relatedness. This same pattern can project onto the technical diagrams within the Forge scene, where related technologies are positioned in 3D space near each other.
**Implementation cost**: **Medium** — the skills constellation is already being rebuilt; the spatial mapping pattern is the same.

### Draftly Presets
**Techniques investigated**: Portrait composition; project presentation; image hierarchy; dramatic editorial layouts.
**Adaptation**: The gate section's portrait composition (large portrait, name treatment, tagline, CTA buttons) follows draftly patterns. Can be enhanced with the cinematic sakura environment framing the portrait rather than a generic hero background.
**Implementation cost**: **Low** — the GateSection already has portrait composition; needs sakura environment integration.

### Cinema Landing Page (Dribbble)
**Techniques investigated**: Dramatic editorial layouts; image/video hierarchy; typography as design element.
**Adaptation**: The overall visual hierarchy — outsized headings, restrained body, deliberate use of white/black space, the portrait as a central design element rather than an afterthought.
**Implementation cost**: **Low** — influences visual design, not structure.

### IMDB/Dune Media App (Dribbble)
**Techniques investigated**: 3D landing-page animation; interface design; media-focused visuals.
**Adaptation**: The 3D interface aesthetic — functional 3D that serves the content, not just decorative. The burning sakura world should feel like a functional environment, not a game. Every 3D element should have a purpose (portrait placement, scene transitions, project visualization).
**Implementation cost**: **Medium** — guides the 3D design philosophy; the existing codebase mostly follows this.

### 3D Landing-Page Animation (Dribbble)
**Techniques investigated**: Real-time 3D on landing pages; camera movement; particle effects.
**Adaptation**: Real-time 3D particles (falling petals, embers) are already in the codebase. The key is ensuring they don't degrade performance — instanced meshes, bounded counts, responsive reduction at mobile breakpoints.
**Implementation cost**: **Low/Medium** — particles already exist; needs performance optimization and reduced-motion gating.

### BATB Concept (Dribbble)
**Techniques investigated**: Editorial visual storytelling; image-text hierarchy; dramatic layouts.
**Adaptation**: The overall narrative flow — from gate → forge → projects → hall → skills → journey → lantern. Each section is a "page" in the story, and the scroll moves the visitor from one page to the next.
**Implementation cost**: **Low/Medium** — the 8-scene structure is the direct adaptation.

---

## Design System Derived from Research

### Color Tokens (from palette research)
```
--obsidian: #0D0D0D;
--crimson: #C41E3A;
--blood-red: #8C101B;
--parchment: #E8E3D5;
--ember-orange: #FF6A2A;
--metallic-gold: #BFA36A;
--ash-grey: #77716F;
```

### Typography System
- **Display headings**: Shippori Mincho, 800 weight, oversize scale, curated tracking
- **Body**: Inter, 400/500 weight, line-height 1.6, max-width 68ch
- **Monospace**: JetBrains Mono or similar, for technical metadata
- **Japanese kanji**: Used only for section markers (壱, 弐, 参, etc.) and portrait framing — never as body text

### Depth Layers (3 layers)
1. **Background** (z = -∞ to -142): Sky, sun/moon, distant mountains, architectural silhouettes, atmospheric fog
2. **Midground** (z = -142 to -232): Portrait, main environmental forms, project visualization planes
3. **Foreground** (z = -232 to infinity): Sakura petals, embers, decorative elements that interact with pointer

### Motion Philosophy
- Motion explains and enhances content, not merely decorates
- Every animated element has a reason: guide attention, show transition, reveal data
- No element animates without purpose
- Reduced-motion preference respected at every level

---

## Technique Selection Summary

| Technique | Source | Cost | Will Implement |
|-----------|--------|------|----------------|
| Scroll-triggered 8-scene camera travel | MotionSites (Scroll Landing, Avelon Drive) | High | YES — core mechanism |
| Cinematic scene transitions with easing | MotionSites (Avelon Drive, Motion Frame) | Medium | YES |
| 3D environment with spatial composition | Lusion, KPR | High | YES — rebuild BurningSakuraWorld |
| Depth layer parallax (3 layers) | Prometheus Fuels, Mammut | Low | YES |
| Expressive typography with Shippori Mincho | Chugi Yoo, cinema refs | Low | YES |
| Circular section markers (kanji) | Chugi Yoo | Medium | YES — enhance existing |
| Skills constellation spatial mapping | Cosmic Mapping | Medium | YES — rewrite ConstellationSection |
| Project case study transitions | Pioneer | Medium | YES — rewrite ProjectsSection |
| Restrained Easter eggs / cursor effects | Noomo | Low | YES — optional, reduced-motion gated |
| Organic particle wind behavior | Mammut, Undr Drift | Low | YES — refine existing |
| Bold hero visual identity | Orange Horse | Medium | YES — hero redesign |
| Responsive grid adaptation | Wix Studio × Pantone | Low | YES — mobile optimization |
| Reduced-motion throughout | All references | Critical | YES — gating required |