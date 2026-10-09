import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillGroups, projects, leetcodeStats } from '../data/portfolio'

const projectNames = new Map(projects.map((p) => [p.id, p.name]))

function skillAriaLabel(s: { name: string; usedIn: string[] }, active: string | null) {
  if (s.usedIn.length > 0) {
    const projectsList = s.usedIn
      .map((id) => projectNames.get(id) || id)
      .join(', ')
    return `${active === s.name ? 'currently selected - ' : ''}Used in: ${projectsList}`
  }
  return active === s.name ? 'currently selected' : 'Studied / certified'
}

export default function ConstellationSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <span className="kanji-watermark" aria-hidden="true">
        技能
      </span>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-head">
            <span className="section-num">伍</span>
            <span className="section-jp" aria-hidden="true">
              技能
            </span>
            <span className="eyebrow">Constellation · mapped skills</span>
          </div>
          <h2 id="skills-title" className="section-title">
            A sky of <em>connected craft</em>
          </h2>
          <p className="section-sub">
            Select a skill to see where it has been used.
          </p>
        </motion.div>

        <div className="skill-constellation">
          {skillGroups.map((g, gi) => (
            <motion.div
              key={g.id}
              className="skill-cluster"
              data-kanji={g.kanji}
              role="group"
              aria-label={g.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3>{g.kanji} {g.label}</h3>
              <div className="skill-tags">
                {g.skills.map((s) => {
                  const isActive = active === s.name
                  return (
                    <button
                      key={s.name}
                      type="button"
                      className={isActive ? 'skill-tag lit' : 'skill-tag'}
                      aria-pressed={isActive}
                      tabIndex={isActive ? -1 : 0}
                      onFocus={() => setActive(s.name)}
                      onBlur={() => setActive(null)}
                      onMouseEnter={() => setActive(s.name)}
                      onMouseLeave={() => setActive(null)}
                      onClick={() => setActive((curr) => (curr === s.name ? null : s.name))}
                    >
                      {s.name}
                      {s.usedIn.length > 0 && (
                        <span aria-hidden="true" style={{ marginLeft: 4 }}>
                          ✦
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="metal-row" style={{ marginTop: '1.6rem' }} aria-label="LeetCode statistics">
          <span className="metal-chip">LeetCode · {leetcodeStats.badge}</span>
          <span className="metal-chip">
            {leetcodeStats.python3} solved · Python3
          </span>
          <span className="metal-chip">
            {leetcodeStats.java} solved · Java
          </span>
          {leetcodeStats.strongest.slice(0, 4).map((t) => (
            <span key={t.tag} className="metal-chip">
              {t.tag} ×{t.count}
            </span>
          ))}
          <a
            className="metal-chip"
            href="https://leetcode.com/u/mhmdaarif/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Profile ↗
          </a>
        </div>
      </div>
    </section>
  )
}