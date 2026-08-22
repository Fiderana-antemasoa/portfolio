import { skills } from '../../data/skills'
import {
  SiNextdotjs,
  SiReact,
  SiHtml5,
  SiCss,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiAndroidstudio,
  SiInsomnia,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import './Skills.css'

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Base de données' },
  { key: 'other', label: 'Outils' },
]

const SKILL_ICONS: Record<string, React.ReactNode> = {
  'Next.js': <SiNextdotjs />,
  'React.js': <SiReact />,
  'HTML5': <SiHtml5 />,
  'CSS3': <SiCss />,
  'Express.js': <SiExpress />,
  'PHP': <SiPhp />,
  'Laravel': <SiLaravel />,
  'PostgreSQL': <SiPostgresql />,
  'MySQL': <SiMysql />,
  'Git': <SiGit />,
  'GitHub': <SiGithub />,
  'Android Studio': <SiAndroidstudio />,
  'Insomnia': <SiInsomnia />,
  'VS Code': <VscCode />,
}

const scrollSkills = [...skills, ...skills]

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="section-inner skills__inner">
        <div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p className="section-eyebrow">✦ Compétences</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Mon <span className="gradient-text">arsenal</span>
          </h2>
        </div>

        <div className="skills__scroll-wrapper reveal">
          <div className="skills__scroll-card">
            <div className="skills__scroll-list">
              {scrollSkills.map((skill, index) => {
                const category = CATEGORIES.find(
                  (item) => item.key === skill.category
                )

                return (
                  <div
                    key={`${skill.name}-${index}`}
                    className="skills__scroll-item"
                    style={
                      {
                        '--accent': skill.color,
                      } as React.CSSProperties
                    }
                  >
                    <div className="skills__scroll-icon">
                      {SKILL_ICONS[skill.name]}
                    </div>

                    <div className="skills__scroll-content">
                      <span className="skills__scroll-name">
                        {skill.name}
                      </span>

                      <span className="skills__scroll-category">
                        {category?.label}
                      </span>
                    </div>

                    <span className="skills__scroll-arrow">→</span>
                  </div>
                )
              })}
            </div>

            <div className="skills__scroll-fade skills__scroll-fade--top" />
            <div className="skills__scroll-fade skills__scroll-fade--bottom" />
          </div>
        </div>

        <div className="skills__deco skills__deco--1">✦</div>
        <div className="skills__deco skills__deco--2">✦</div>
        <div className="skills__deco skills__deco--3">◇</div>
      </div>
    </section>
  )
}