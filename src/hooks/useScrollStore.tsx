import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { sections } from '../data/portfolio'

export type ScrollState = {
  progress: number
  velocity: number
  direction: number
  sectionIndex: number
}

export type ScrollStore = {
  state: ScrollState
  stateRef: React.RefObject<ScrollState>
  burst: number
}

const ScrollStoreContext = createContext<ScrollStore | null>(null)

export function useScrollStore(): ScrollStore {
  const ctx = useContext(ScrollStoreContext)
  if (!ctx) throw new Error('useScrollStore must be used within ScrollStoreProvider')
  return ctx
}

export function ScrollStoreProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<ScrollState>({
    progress: 0,
    velocity: 0,
    direction: 1,
    sectionIndex: 0,
  })
  const [state, setState] = useState<ScrollState>(stateRef.current)
  const [burst, setBurst] = useState(0)

  useEffect(() => {
    let raf = 0
    let lastY = window.scrollY
    let lastT = performance.now()
    let smoothV = 0
    let lastSection = 0

    const tick = () => {
      const now = performance.now()
      const y = window.scrollY
      const dt = Math.max(1, now - lastT)
      const rawV = ((y - lastY) / dt) * 1000
      smoothV += (rawV - smoothV) * 0.12
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, y / maxScroll))
      const direction = rawV === 0 ? stateRef.current.direction : rawV > 0 ? 1 : -1

      const vh = window.innerHeight
      let sectionIndex = 0
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id)
        if (el && el.getBoundingClientRect().top <= vh * 0.45) sectionIndex = i
      }

      stateRef.current = {
        progress,
        velocity: smoothV,
        direction,
        sectionIndex,
      }

      if (sectionIndex !== lastSection || Math.abs(smoothV) > 40) {
        lastSection = sectionIndex
        setState({ ...stateRef.current })
      }

      const speed = Math.abs(smoothV)
      if (speed > 1400) {
        setBurst((b) => (Date.now() - b > 700 ? Date.now() : b))
      }

      lastY = y
      lastT = now
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const value = useMemo<ScrollStore>(
    () => ({ state, stateRef, burst }),
    [state, burst],
  )

  return <ScrollStoreContext.Provider value={value}>{children}</ScrollStoreContext.Provider>
}

export function useReducedMotionPref(): boolean {
  const [pref, setPref] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setPref(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return pref
}
