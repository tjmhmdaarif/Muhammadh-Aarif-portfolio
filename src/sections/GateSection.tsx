import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function GateSection() {
  return (
    <section id="gate" className="section gate" aria-label="Introduction">
      <span className="kanji-watermark" aria-hidden="true">
        鳥居
      </span>
      <div className="section-inner gate-grid">
        <div>
          <motion.p className="gate-kicker" custom={0} variants={fadeUp} initial="hidden" animate="show">
            {profile.kicker}
          </motion.p>
          <motion.h1 className="gate-name" custom={1} variants={fadeUp} initial="hidden" animate="show">
            <span>{profile.name}</span>
            <span className="line2">
              builds with <em className="fire">code &amp; AI</em>
            </span>
          </motion.h1>
          <motion.p className="gate-tagline" custom={2} variants={fadeUp} initial="hidden" animate="show">
            {profile.tagline}
          </motion.p>
          <motion.p className="gate-positioning" custom={3} variants={fadeUp} initial="hidden" animate="show">
            {profile.positioning}
          </motion.p>
          <motion.div className="gate-ctas" custom={4} variants={fadeUp} initial="hidden" animate="show">
            <a className="btn btn-primary" href="#projects">
              Enter the Forge
            </a>
            <a className="btn btn-ghost" href="#lantern">
              Light a Lantern
            </a>
          </motion.div>
          <motion.p className="gate-status" custom={5} variants={fadeUp} initial="hidden" animate="show">
            <span className="pulse-dot" aria-hidden="true" />
            {profile.statusLabel} · {profile.location}
          </motion.p>
        </div>

        <motion.div
          className="portrait-frame"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            width={420}
            height={500}
            loading="eager"
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget
              if (!img.dataset.fallback) {
                img.dataset.fallback = '1'
                img.src = profile.portraitFallback
              } else {
                img.style.display = 'none'
              }
            }}
            style={{ objectFit: 'cover' }}
          />
          <span className="portrait-kanji" aria-hidden="true">
            面
          </span>
        </motion.div>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        Scroll
      </div>
    </section>
  )
}
