import { motion } from 'framer-motion'
import { achievements, certifications } from '../data/portfolio'

export default function HallSection() {
  return (
    <section id="hall" className="section" aria-labelledby="hall-title">
      <span className="kanji-watermark" aria-hidden="true">
        殿堂
      </span>
      <div className="section-inner">
        <motion.div
          className="scrim"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-head">
            <span className="section-num">肆</span>
            <span className="section-jp" aria-hidden="true">
              殿堂
            </span>
            <span className="eyebrow">Hall of honour · verified milestones</span>
          </div>
          <h2 id="hall-title" className="section-title">
            Titles earned in <em>the open</em>
          </h2>
          <p className="section-sub">
            Competitions, leadership and training — each entry cross-checked against public records and repository
            evidence where available.
          </p>

          <div className="hall-grid">
            {achievements.map((a, i) => (
              <motion.article
                key={a.id}
                className="honour-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="honour-crest" aria-hidden="true">
                  {i % 3 === 0 ? '勲' : i % 3 === 1 ? '賞' : '位'}
                </div>
                <h3 className="honour-title">{a.title}</h3>
                <p className="honour-meta">
                  {a.issuer} · {a.date} · {a.result}
                </p>
                <p className="honour-context">{a.context}</p>
                {a.evidence.length > 0 && (
                  <p style={{ marginTop: '0.7rem' }}>
                    {a.evidence.map((ev) => (
                      <a
                        key={ev.url}
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{ fontSize: '0.78rem' }}
                      >
                        {ev.label} ↗{' '}
                      </a>
                    ))}
                  </p>
                )}
              </motion.article>
            ))}
          </div>

          <div className="cert-row" aria-label="Certifications">
            {certifications.map((c) => (
              <a
                key={c.id}
                className="cert-chip"
                href={c.url || undefined}
                target={c.url ? '_blank' : undefined}
                rel="noreferrer noopener"
                style={{ color: c.url ? undefined : 'rgba(241,235,221,0.75)' }}
              >
                {c.title} — {c.issuer}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
