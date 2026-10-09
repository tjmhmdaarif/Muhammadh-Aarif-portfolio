import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'

export default function ForgeSection() {
  return (
    <section id="forge" className="section" aria-labelledby="forge-title">
      <span className="kanji-watermark" aria-hidden="true">
        鍛冶
      </span>
      <div className="section-inner">
        <motion.div
          className="scrim"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-head">
            <span className="section-num">弐</span>
            <span className="section-jp" aria-hidden="true">
              鍛冶
            </span>
            <span className="eyebrow">The forge · foundations</span>
          </div>
          <h2 id="forge-title" className="section-title">
            From circuits to <em>agents</em>
          </h2>
          <p className="section-sub">
            I&apos;m Aarif — a final-year Electronics &amp; Communication Engineering student at{' '}
            {profile.education.institution}, forging software at the seam of automation and agentic AI. The hardware
            years taught discipline; the AI years taught leverage.
          </p>

          <div className="forge-grid">
            <div className="forge-card">
              <h3>火 · The fire</h3>
              <p>
                Wind-turbine SCADA intelligence, voice-driven RAG systems, self-driving incident agents and honest
                digital twins — each project is another heat in the forge.
              </p>
            </div>
            <div className="forge-card">
              <h3>鋼 · The steel</h3>
              <p>
                {profile.education.degree} · {profile.education.period} · CGPA {profile.education.cgpa}. Embedded
                systems first, then ML, then agentic orchestration.
              </p>
            </div>
            <div className="forge-card">
              <h3>現在 · Now</h3>
              <ul>
                {profile.currently.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="metal-row" aria-label="Open to">
            <span className="metal-chip">{profile.openTo}</span>
            <span className="metal-chip">{profile.location}</span>
            <span className="metal-chip">Open to hybrid roles</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
