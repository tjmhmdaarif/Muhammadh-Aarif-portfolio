import { motion } from 'framer-motion'
import { journey, interests } from '../data/portfolio'

const kindCrest: Record<string, string> = {
  education: '学',
  certification: '証',
  leadership: '率',
  achievement: '勲',
  project: '作',
  now: '今',
}

export default function JourneySection() {
  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <span className="kanji-watermark" aria-hidden="true">
        道程
      </span>
      <div className="section-inner">
        <motion.div
          className="scrim"
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-head">
            <span className="section-num">陸</span>
            <span className="section-jp" aria-hidden="true">
              道程
            </span>
            <span className="eyebrow">The path · the journey</span>
          </div>
          <h2 id="journey-title" className="section-title">
            The winding <em>road so far</em>
          </h2>

          <div className="path-line">
            {journey.map((step, i) => (
              <motion.article
                key={step.id}
                className="path-step"
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="path-date">
                  <span aria-hidden="true">{kindCrest[step.kind] || '道'} </span>
                  {step.date}
                </span>
                <h3 className="path-title">{step.title}</h3>
                <p className="path-desc">{step.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: '2.6rem' }}>
            <span className="section-jp" aria-hidden="true">
              隠
            </span>
            <span className="eyebrow">Off duty</span>
          </div>
          <div className="offduty-grid">
            {interests.map((it, i) => (
              <motion.div
                key={it.id}
                className="offduty-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ rotate: i % 2 === 0 ? -0.8 : 0.8 }}
              >
                <span className="offduty-kanji" aria-hidden="true">
                  {it.kanji}
                </span>
                <h4>{it.title}</h4>
                <p>{it.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
