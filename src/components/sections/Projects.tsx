import { projects } from '../../data/projects'
import './Projects.css'

export default function Projects() {
  
  return (
    <section id="projects" className="projects section">
      <div className="section-inner projects__inner">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="section-eyebrow">✦ Projets</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Ce que j'ai <span className="gradient-text">créé</span>
          </h2>
        </div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="project-card reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="project-card__img">
                <span className="project-card__placeholder">
                  {['🌸', '💜', '✦'][i % 3]}
                </span>
                <div className="project-card__overlay" />
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map((tag:string) => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link ?? '#'} className="project-card__link">
                  Voir le projet →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}