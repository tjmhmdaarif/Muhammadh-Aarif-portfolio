import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import * as React from 'react'
import { sections } from '../data/portfolio'

function useScrollProgress(): [number, number] {
  const [progress, setProgress] = useState(0)
  const [sectionIndex, setSectionIndex] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (systemReduced) return

    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const p = Math.min(1, Math.max(0, window.scrollY / max))
      setProgress(p)

      // Determine section index based on scroll position and section positions
      const vh = window.innerHeight
      let si = 0
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id)
        if (el && el.getBoundingClientRect().top <= vh * 0.45) si = i
      }
      setSectionIndex(si)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return [progress, sectionIndex]
}

export function ProgressRail() {
  const [progress] = useScrollProgress()
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress }}
      aria-hidden="true"
    />
  )
}

export function SideRail() {
  const [progress, sectionIndex] = useScrollProgress()
  return (
    <nav className="side-rail" aria-label="Sections">
      {sections.map((s, i) => (
        <a
          key={s.id}
          className="rail-dot"
          href={`#${s.id}`}
          aria-current={sectionIndex === i ? 'true' : undefined}
          aria-label={s.label}
        >
          <span aria-hidden="true">{s.num}</span>
          <span className="rail-label">{s.label}</span>
        </a>
      ))}
    </nav>
  )
}

export type Toggles = {
  scene3d: boolean
  motion: boolean
  wind: boolean
  set: (key: 'scene3d' | 'motion' | 'wind', value: boolean) => void
}

export function ToggleBar({ toggles }: { toggles: Toggles }) {
  return (
    <header className="top-chrome">
      <a className="brand" href="#gate">
        <span className="brand-mark" aria-hidden="true" />
        <span>燃桜 · BURNING SAKURA</span>
      </a>
      <div className="toggles" role="group" aria-label="Experience toggles">
        <button
          type="button"
          className="toggle-btn"
          aria-pressed={toggles.scene3d}
          onClick={() => toggles.set('scene3d', !toggles.scene3d)}
          title="Toggle the 3D world"
        >
          <span className="toggle-dot" aria-hidden="true" />
          3D
        </button>
        <button
          type="button"
          className="toggle-btn"
          aria-pressed={toggles.motion}
          onClick={() => toggles.set('motion', !toggles.motion)}
          title="Toggle animations"
        >
          <span className="toggle-dot" aria-hidden="true" />
          Motion
        </button>
        <button
          type="button"
          className="toggle-btn"
          aria-pressed={toggles.wind}
          onClick={() => toggles.set('wind', !toggles.wind)}
          title="Toggle petal wind & embers"
        >
          <span className="toggle-dot" aria-hidden="true" />
          Wind
        </button>
      </div>
    </header>
  )
}