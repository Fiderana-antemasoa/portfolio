import { skills } from '../../data/skills'
import './Skills.css'

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend',  icon: '🎀' },
  { key: 'backend',  label: 'Backend',   icon: '🌿' },
  { key: 'design',   label: 'Design',    icon: '✦'  },
  { key: 'other',    label: 'Outils',    icon: '🛠'  },
]

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="section-inner skills__inner">

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="section-eyebrow">✦ Compétences</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Mon <span className="gradient-text">arsenal</span>
          </h2>
        </div>

        <div className="skills__categories">
          {CATEGORIES.map(({ key, label, icon }, catIndex) => {
            const filtered = skills.filter(s => s.category === key)
            if (filtered.length === 0) return null
            return (
              <div
                key={key}
                className="skills__category reveal"
                style={{ transitionDelay: `${catIndex * 0.12}s` }}
              >
                <div className="skills__category-header">
                  <span className="skills__category-icon">{icon}</span>
                  <span className="skills__category-label">{label}</span>
                  <div className="skills__category-line" />
                </div>

                <div className="skills__pills">
                  {filtered.map((skill, i) => (
                    <div
                      key={skill.name}
                      className="skill-pill"
                      style={{
                        '--accent': skill.color,
                        animationDelay: `${catIndex * 0.12 + i * 0.06}s`,
                      } as React.CSSProperties}
                    >
                      <span className="skill-pill__emoji">{skill.emoji}</span>
                      <span className="skill-pill__name">{skill.name}</span>
                      <div className="skill-pill__glow" />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Floating decorative elements */}
        <div className="skills__deco skills__deco--1">🌸</div>
        <div className="skills__deco skills__deco--2">✦</div>
        <div className="skills__deco skills__deco--3">◇</div>

      </div>
    </section>
  )
}