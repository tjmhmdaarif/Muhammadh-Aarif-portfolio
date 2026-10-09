import { motion } from 'framer-motion'
import { contacts, profile, verificationNote } from '../data/portfolio'

const contactGlyph: Record<string, string> = {
  email: '封',
  github: '庫',
  linkedin: '経',
  instagram: '影',
  leetcode: '剣',
}

export default function LanternSection() {
  return (
    <section id="lantern" className="section lantern-section" aria-labelledby="lantern-title">
      <span className="kanji-watermark" aria-hidden="true">
        灯籠
      </span>
      <div className="section-inner">
        <motion.div
          className="scrim"
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-head">
            <span className="section-num">漆</span>
            <span className="section-jp" aria-hidden="true">
              灯籠
            </span>
            <span className="eyebrow">The lantern · contact</span>
          </div>
          <h2 id="lantern-title" className="section-title">
            One light in the <em>dark forest</em>
          </h2>
          <p className="section-sub">
            The path ends at a single lantern. If the fire is useful to you — a role, a collaboration, a conversation —
            take one of these lights and write.
          </p>

          <div className="contact-grid">
            {contacts.map((c, i) => (
              <motion.a
                key={c.id}
                className="contact-card"
                href={c.url}
                target={c.kind === 'email' ? undefined : '_blank'}
                rel="noreferrer noopener"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="contact-label">
                  <span aria-hidden="true">{contactGlyph[c.kind] || '灯'} </span>
                  {c.label}
                </span>
                <span className="contact-handle">{c.handle}</span>
                <span className="contact-arrow" aria-hidden="true">
                  →
                </span>
              </motion.a>
            ))}
          </div>

          <div className="lantern-cta">
            <motion.a
              className="btn btn-primary"
              href="mailto:muhammadhaarif2000@gmail.com?subject=Let%27s%20build%20something"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Write to {profile.shortName}
            </motion.a>
            <a className="btn btn-ghost" href="#gate">
              Return to the gate ↑
            </a>
          </div>

          <p className="footer-note">{verificationNote}</p>
        </motion.div>
      </div>
    </section>
  )
}
