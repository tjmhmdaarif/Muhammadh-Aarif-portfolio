import { Suspense, lazy, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { ProgressRail, SideRail, ToggleBar, type Toggles } from './components/Chrome'
import GateSection from './sections/GateSection'
import ForgeSection from './sections/ForgeSection'
import ProjectsSection from './sections/ProjectsSection'
import HallSection from './sections/HallSection'
import ConstellationSection from './sections/ConstellationSection'
import JourneySection from './sections/JourneySection'
import LanternSection from './sections/LanternSection'
import './styles.css'

const BurningSakuraWorld = lazy(() => import('./scene/BurningSakuraWorld'))

function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function Experience() {
  // Reduced-motion preference (inlined from useScrollStore hook)
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const systemReduced = prefersReducedMotion

  const [hasWebGL] = useState(detectWebGL)
  const [scene3d, setScene3d] = useState(true)
  const [motionOn, setMotionOn] = useState(true)
  const [wind, setWind] = useState(true)
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.motion = motionOn && !systemReduced ? 'on' : 'off'
  }, [motionOn, systemReduced])

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 700)
    return () => clearTimeout(t)
  }, [])

  const effectiveMotion = motionOn && !systemReduced
  const showScene = scene3d && hasWebGL

  // Scroll progress state — shared between UI and 3D
  const progressRef = { current: 0 }
  const velocityRef = { current: 0 }
  const directionRef = { current: 1 }

  useEffect(() => {
    if (systemReduced) {
      // In reduced-motion mode, the 3D scene is frozen;
      // just show the static sections.
      return
    }

    // Scroll progress (0 = top, 1 = bottom), computed from scroll position.
    // This avoids GSAP ScrollTrigger type complications while providing
    // the same progress value for camera driving and UI updates.
    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / max))
      velocityRef.current = Math.abs(window.scrollY - (progressRef.current * (document.documentElement.scrollHeight - window.innerHeight))) / 1000 || 0
      directionRef.current = window.scrollY > 0 ? 1 : -1
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [systemReduced])

  const toggles: Toggles = {
    scene3d: showScene,
    motion: effectiveMotion,
    wind,
    set: (key, value) => {
      if (key === 'scene3d') setScene3d(value)
      if (key === 'motion') setMotionOn(value)
      if (key === 'wind') setWind(value)
    },
  }

  return (
    <MotionConfig reducedMotion={effectiveMotion ? 'never' : 'always'}>
      <div className={`loading-veil${booted ? ' gone' : ''}`} aria-hidden={booted}>
        <div className="loading-inner">
          <div className="flame">炎</div>
          <p>Igniting the sakura</p>
        </div>
      </div>

      <ProgressRail />
      <ToggleBar toggles={toggles} />
      <SideRail />

      <div className="scene-layer" aria-hidden="true">
        {showScene ? (
          <Suspense fallback={<div className="scene-fallback-bg" />}>
            <BurningSakuraWorld
              enabled={wind}
              progressRef={progressRef}
              velocityRef={velocityRef}
              directionRef={directionRef}
            />
          </Suspense>
        ) : (
          <div className="scene-fallback-bg" />
        )}
      </div>

      {!hasWebGL && (
        <p className="no-webgl-note" role="status">
          3D unavailable — showing full HTML experience
        </p>
      )}

      <main className="page">
        <GateSection />
        <ForgeSection />
        <ProjectsSection />
        <HallSection />
        <ConstellationSection />
        <JourneySection />
        <LanternSection />
      </main>
    </MotionConfig>
  )
}

export default function App() {
  return (
    <Experience />
  )
}