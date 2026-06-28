import { skills } from '../../data/skills'
import './Skills.css'

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

        <div className="skills__grid">
       {skills.map((skill: { name: string; level: number; category: string }, i) => (
            <div
              key={skill.name}
              className="skill-card reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="skill-card__header">
                <span className="skill-card__name">{skill.name}</span>
                <span className="skill-card__level">{skill.level}%</span>
              </div>
              <div className="skill-card__bar-bg">
                <div
                  className="skill-card__bar-fill"
                  style={{ '--fill': `${skill.level}%` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="skills__tags reveal" style={{ transitionDelay: '0.5s' }}>
          {['React', 'TypeScript', 'Next.js', 'Figma', 'CSS', 'Node.js', 'Git', 'Tailwind', 'Framer Motion'].map((tag) => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  )
}