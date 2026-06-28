import { experiences } from '../../data/experience'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="section-inner experience__inner">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="section-eyebrow">✦ Expérience</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Mon <span className="gradient-text">parcours</span>
          </h2>
        </div>

        <div className="experience__timeline">
{experiences.map((exp: { id: number; company: string; role: string; period: string; description: string }, i) => (            <div
              key={exp.id}
              className="exp-item reveal"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="exp-item__line">
                <div className="exp-item__dot" />
                {i < experiences.length - 1 && <div className="exp-item__connector" />}
              </div>
              <div className="exp-item__card">
                <div className="exp-item__meta">
                  <span className="exp-item__period">{exp.period}</span>
                </div>
                <h3 className="exp-item__role">{exp.role}</h3>
                <p className="exp-item__company">@ {exp.company}</p>
                <p className="exp-item__desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}