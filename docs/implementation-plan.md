# Implementation Plan — Burning Sakura: The Digital Ronin

## Overall Architecture

The rebuild preserves the existing React + Three.js + React Three Fiber + Framer Motion stack. The key change is replacing the current gentle spring-garden interpretation with a **fierce, brutalist Japanese samurai-era world** where the burning sakura is the signature motif representing resilience, discipline, transformation, and forward movement.

The implementation follows a **hybrid approach** (Approach C from the master prompt):
- **Cinematic scroll-driven sequence** for the main visual journey (Scenes 1-8)
- **Real-time 3D** for selected interactions, particles, technical artifacts, and project visualizations within scenes

## Scene Structure (8 Scenes)

Each scene has explicit start/end scroll boundaries and drives specific content:

### Scene 1 — The Ashen Gate
- **Enter**: Visitor enters dark Japanese-inspired landscape
- **Content**: My portrait and identity emerge; crimson sakura and embers move through atmosphere
- **Camera**: Entering through the gate, establishing depth layers (bg/mid/fg)
- **Transition**: Camera advances forward through the gate

### Scene 2 — The Awakening
- **Content**: My introduction and professional direction appear; environment transitions toward technical imagery
- **Camera**: Forward movement through the gate into the main world
- **Visual**: Portrait becomes anchored; sakura petals begin flowing

### Scene 3 — The Forge
- **Content**: Engineering foundations, learning, and technical capabilities presented through visual artifacts and diagrams
- **Focus**: WindSense AI, Voice-RAG, AgentOps, NeuroVix, InfraGuard, embedded projects
- **Visual**: Forge environment with technical diagrams floating

### Scene 4 — The Project Battlefield
- **Content**: Camera travels through selected project environments
- **Each project**: Unique composition, real screenshots, appropriate technical visuals, verified links
- **Interaction**: Scroll into project → transition environment → reveal main visual → animate architecture/data flow

### Scene 5 — The Hall of Achievements
- **Content**: Verified awards, certifications, events, and leadership in dramatic timeline/spatial gallery
- **Evidence**: Hackathons (TECHgium Finalist, Ecotronics Runner-Up), Student leadership (Yi Yuva), Certifications (QNX, Prompt Engineering, Azure, Google GenAI)

### Scene 6 — The Technical Constellation
- **Content**: Skills and technologies form connected groups
- **Interaction**: Selecting a node reveals relevant projects and evidence
- **Groups**: Languages, AI/ML, Data & Apps, Automation & Embedded, Cloud & Tools

### Scene 7 — The Journey
- **Content**: Education, learning, projects, events, and professional milestones connected
- **Timeline**: From engineering beginnings through current work

### Scene 8 — The Final Ember
- **Visual world settles** into quieter, memorable composition
- **Prominent**: GitHub, LinkedIn, and verified contact details
- **Closing**: Memorable parting image before exit

---

## Foundational Changes

### 1. Portrait Integration (Critical Fix)
- Replace `/portrait.png` with verified high-resolution portrait
- Position in midground depth layer with parallax relative to scroll/pointer
- Ensure independent loading from 3D scene (CSS/img element, not inside Canvas)
- Add accessible alt text preserving facial identity
- Test visibility with and without WebGL

### 2. Scroll-World Engine Rewrite
- Map scroll progress explicitly to 8 scene boundaries
- Use GSAP ScrollTrigger for precise scene control (instead of the current useScrollStore camera-following approach)
- Support reverse scrolling, rapid scrolling, direct navigation to sections
- Avoid abrupt camera jumps; maintain consistent scroll sync
- Provide reduced-motion experience (freeze or static scroll-reveal)

### 3. Depth Layer System (3 intentional layers)
- **Background**: Atmospheric sky, distant mountains, architectural silhouettes, sun/moon motif
- **Midground**: Portrait, main environmental forms, project-related visual objects
- **Foreground**: Sakura petals, restrained embers, decorative elements
- Pointer movement subtly influences layer parallax — NOT aggressive wobble

### 4. Color Palette & Tokens
- Obsidian: `#0D0D0D`
- Deep crimson: `#C41E3A`
- Blood red: `#8C101B`
- Parchment: `#E8E3D5`
- Ember orange: `#FF6A2A`
- Metallic gold: `#BFA36A`
- Ash grey: `#77716F`

Establish design tokens in CSS for consistent application.

### 5. Typography & Editorial Design
- **Display**: Shippori Mincho (Japanese serif) for headings — bold, expressive
- **Body**: Inter for readability
- **Monospace**: Coding/technical metadata in a restrained face
- **Editorial hierarchy**: Oversized headings, restrained body, vertical Japanese typography only where meaningful
- **Typography animation**: Use GSAP SplitText for section headings as single considered compositions, NOT paragraph-level splitting

### 6. Motion System
- Scroll-scrubbed camera travel via GSAP ScrollTrigger
- Controlled parallax across 3 depth layers
- Mask-based text reveals
- Layered image reveals
- Subtle perspective and depth (no full-page wobble)
- Hover-responsive project imagery
- Restrained circular text paths for section markers
- Scroll-reactive environmental particles (bounded density)
- Directional ember movement (tied to wind/flow)
- A small number of playful micro-interactions (Easter eggs optional)

### 7. Project Case Studies (Editorial System)
Replace generic cards with immersive case studies:

**Per-project visual direction:**
- **WindSense AI**: Technical environment for industrial monitoring; heatmap/anomaly view using authentic data; interactive architecture diagram; visual explanation of detection pipeline
- **Voice-Enabled RAG Pipeline**: Interactive pipeline from voice input → retrieval → response; selectable stages with technical explanations
- **NeuroVix**: Signal-processing inspection panel; animated waveform/feature visualization based on real project data; clearly labelled prototype demonstration
- **Embedded/IoT**: Layered component diagrams; interactive system schematics; 3D component view when useful; animated signal/data flow

**All interactions must work without requiring a powerful graphics card.**

### 8. Achievements, Events, LinkedIn Media
- Editorial timeline with dates, titles, roles, organizers, relevant images, supporting evidence, concise significance explanations
- Distinguish: participant, finalist, coordinator, runner-up, winner
- Animation reveals real evidence — does not replace evidence with decorative claims
- Use actual photographs, certificate images, public event media where available

### 9. Skills Constellation
- Visual representation of verified technical skills only
- Groups: Programming, AI/ML, Generative AI/RAG, Automation, Embedded systems, Data & databases, Cloud & integrations, Engineering foundations, Development tools
- Connect technologies when real project or documented relationship supports connection
- Selecting a node reveals: skill name, category, relevant projects, evidence of use, related technologies
- **No arbitrary proficiency percentages** or meaningless floating labels
- Readable list for keyboard and screen-reader users

### 10. Motion Restraint
- Not every element should animate
- Prioritize motion that explains relationships, guides attention, creates meaningful transition
- Avoid endless effects that make the site feel chaotic

---

## Component Roadmap

| Component | Status | Changes Required |
|-----------|--------|------------------|
| `GateSection` | Exists | Fix portrait loading; add gate architectural silhouette; improve CTA transitions |
| `ForgeSection` | Exists | Expand forge visualization; integrate technical diagrams; add environment border |
| `ProjectsSection` | Exists | Replace cards with editorial case studies; project-specific visuals; interactive transitions |
| `HallSection` | Exists | Enhance achievement gallery; add certification showcase; improve visual hierarchy |
| `ConstellationSection` | Exists | Rewrite as interactive skills constellation; node-click reveals projects; keyboard-navitable |
| `JourneySection` | Exists | Enhance path visualization; add interest cards; improve kanji crests |
| `LanternSection` | Exists | Contact grid; add verified links; improve CTA design |
| `BurningSakuraWorld` | Exists | Rewrite as 8-scene cinematic sequence; depth layers; camera-scroll sync; reduce particle count for performance |
| `useScrollStore` | Exists | Replace with GSAP ScrollTrigger-driven progress, or adapt existing store for scene boundaries |
| `Chrome.tsx` | Exists | Update toggles; add reduced-motion option; improve accessibility |

---

## Performance Targets

- **60 FPS** on suitable desktop during representative interactions
- **Largest Contentful Paint** ≤ 2.5s under defined conditions
- **Interaction to Next Paint** ≤ 200ms under defined conditions
- **Cumulative Layout Shift** ≤ 0.1
- **No unbounded particle growth** — petal count responsive to viewport
- **No unnecessary off-screen animation** — all animations have defined start/end
- **Reduced-motion preference** respected — 3D either freezes or switches to static scroll-reveal

---

## Accessibility Requirements

- Semantic HTML throughout
- Keyboard-accessible navigation (Tab order, focus states)
- Visible focus states on all interactive elements
- Readable contrast against obsidian/charcoal backgrounds
- Accessible image descriptions on portrait and all data visualizations
- No hover-only information (skills constellation must be keyboard navigable)
- No essential content trapped in the 3D scene (always accessible via HTML fallback)
- No unexpected sound
- No forced scrolling
- No horizontal overflow
- No mandatory orientation changes

---

## Definition of Done

- [ ] Real portrait integrated and visible (independent of 3D)
- [ ] 8-scene cinematic scroll-world drives narrative
- [ ] Scroll progress → camera/sequence mapping works forward and reverse
- [ ] Project case studies are interactive editorial views
- [ ] Achievements/events are evidence-backed and animated reveal
- [ ] Skills constellation is interactive and keyboard-navitable
- [ ] Reduced-motion behavior works correctly
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- [ ] No console errors on initial load
- [ ] Production build passes TypeScript and lint
- [ ] Deployed site verified on Chrome, Firefox, Safari, Edge
- [ ] All deliverables produced (AGENTS.md, commands, skills, reference matrix, audit files)