import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, profile } from '../data/portfolio'

const sigilKanji: Record<string, string> = {
  wind: '風',
  voice: '声',
  agent: '役',
  mind: '脳',
  bridge: '橋',
  chip: '回',
}

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.article
      className="project-card"
      id={`project-${p.id}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-top">
        <div>
          <span className="project-sigil" aria-hidden="true">
            {sigilKanji[p.sigil] || '刃'}
          </span>
          <h3 className="project-name">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={`${p.id}-detail`}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                font: 'inherit',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {p.name}
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  marginLeft: '0.6rem',
                  color: 'var(--ember)',
                  transform: open ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                ❯
              </span>
            </button>
          </h3>
          <p className="project-tagline">{p.tagline}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {p.status === 'live-demo' && <span className="badge badge-live">● Live</span>}
          <span className="badge badge-verified">✦ Verified repo</span>
          {p.recognition && <span className="badge badge-ember">{p.recognition.split(' - ')[0]}</span>}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${p.id}-detail`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="project-body">
              <div>
                <p className="project-solution">{p.solution}</p>
                {p.team && (
                  <p className="project-attribution" style={{ fontStyle: 'italic', opacity: 0.85 }}>
                    {p.team}
                  </p>
                )}
                <div className="tech-row">
                  {p.technologies.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
                {p.recognition && <p className="recognition">{p.recognition}</p>}
                <div className="project-links">
                  {p.evidence.map((ev) => (
                    <a
                      key={ev.url}
                      className="btn btn-ghost"
                      href={ev.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.72rem' }}
                    >
                      {ev.label} ↗
                    </a>
                  ))}
                </div>
              </div>
              <div className="metric-grid">
                {p.metrics.map((m) => (
                  <div className="metric" key={m.label}>
                    <div className="metric-value">{m.value}</div>
                    <div className="metric-label">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured)
  const coursework = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <span className="kanji-watermark" aria-hidden="true">
        作品
      </span>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-head">
            <span className="section-num">参</span>
            <span className="section-jp" aria-hidden="true">
              作品
            </span>
            <span className="eyebrow">Creations · forged works</span>
          </div>
          <h2 id="projects-title" className="section-title">
            Blades forged in <em>the fire</em>
          </h2>
          <p className="section-sub">
            Five verified builds — click any title to open its dossier. Every repository and live demo is linked and
            checked against the public GitHub profile.
          </p>
        </motion.div>

        <div className="project-stack">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>
        <motion.div
          className="coursework-strip"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3>脇 · Side blades — embedded & practice</h3>
          <div className="coursework-list">
            {coursework.map((p) => (
              <div className="coursework-item" key={p.id}>
                <strong>{p.name}</strong>
                {p.tagline}
                {p.repoUrl && (
                  <>
                    {' · '}
                    <a href={p.repoUrl} target="_blank" rel="noreferrer noopener">
                      repo ↗
                    </a>
                  </>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}