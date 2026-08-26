import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import './Projects.css'

type Project = (typeof projects)[number] & {
  tags?: string[]
  images?: string[]
}

export default function Projects() {
  const containerRef = useRef<HTMLElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [previewImageIndex, setPreviewImageIndex] = useState(0)

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  const [smoothPosition, setSmoothPosition] = useState({
    x: 0,
    y: 0,
  })

  const [previewOpen, setPreviewOpen] = useState(false)

  const activeProject =
    hoveredIndex !== null
      ? (projects[hoveredIndex] as Project)
      : null

  const activeImages =
    activeProject?.images ?? []

  const activeImage =
    activeImages[previewImageIndex] ??
    activeImages[0] ??
    null

  /*
   * =========================================
   * POSITION FLUIDE DE LA PREVIEW
   * =========================================
   */

  useEffect(() => {
    let animationFrame: number

    const animate = () => {
      setSmoothPosition((previous) => ({
        x:
          previous.x +
          (mousePosition.x - previous.x) * 0.12,
        y:
          previous.y +
          (mousePosition.y - previous.y) * 0.12,
      }))

      animationFrame =
        requestAnimationFrame(animate)
    }

    animationFrame =
      requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [mousePosition])

  /*
   * =========================================
   * MOUVEMENT SOURIS
   * =========================================
   */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const container =
      containerRef.current

    if (!container) {
      return
    }

    const rect =
      container.getBoundingClientRect()

    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  /*
   * =========================================
   * ENTRÉE SUR UN PROJET
   * =========================================
   */

  const handleProjectEnter = (
    index: number
  ) => {
    setHoveredIndex(index)
    setPreviewImageIndex(0)
  }

  /*
   * =========================================
   * SORTIE
   * =========================================
   */

  const handleProjectLeave = () => {
    setHoveredIndex(null)
  }

  /*
   * =========================================
   * CHANGEMENT AUTOMATIQUE DES PHOTOS
   * =========================================
   */

  useEffect(() => {
    if (
      hoveredIndex === null ||
      activeImages.length <= 1
    ) {
      return
    }

    const timer = window.setInterval(() => {
      setPreviewImageIndex(
        (current) =>
          (current + 1) %
          activeImages.length
      )
    }, 1800)

    return () => {
      window.clearInterval(timer)
    }
  }, [
    hoveredIndex,
    activeImages.length,
  ])

  /*
   * =========================================
   * ESC LIGHTBOX
   * =========================================
   */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        setPreviewOpen(false)
      }
    }

    window.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [])

  /*
   * =========================================
   * OUVRIR LIGHTBOX
   * =========================================
   */

  const openPreview = () => {
    if (!activeImage) {
      return
    }

    setPreviewOpen(true)
  }

  /*
   * =========================================
   * PROJET INEXISTANT
   * =========================================
   */

  if (!projects.length) {
    return null
  }

  return (
    <>
      <section
        ref={containerRef}
        id="projects"
        className="projects section"
        onMouseMove={handleMouseMove}
      >
        <div className="section-inner projects__inner">

          {/* =================================
              HEADER
          ================================= */}

          <div className="projects__header reveal">
            <p className="section-eyebrow">
              ✦ Projets
            </p>

            <h2 className="section-title">
              Ce que j'ai{' '}
              <span className="gradient-text">
                créé
              </span>
            </h2>

            <p className="projects__intro">
              Une sélection de projets réalisés
              au fil de mes expériences.
            </p>
          </div>

          {/* =================================
              FLOATING PREVIEW
          ================================= */}

          <div
            ref={previewRef}
            className={`projects__preview ${
              hoveredIndex !== null
                ? 'projects__preview--visible'
                : ''
            }`}
            style={{
              transform: `translate3d(
                ${smoothPosition.x + 40}px,
                ${smoothPosition.y - 150}px,
                0
              )`,
            }}
            onClick={openPreview}
          >
            <div className="projects__preview-frame">

              {activeImages.map(
                (image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={
                      activeProject
                        ? activeProject.title
                        : ''
                    }
                    className="projects__preview-image"
                    style={{
                      opacity:
                        index ===
                        previewImageIndex
                          ? 1
                          : 0,
                      transform:
                        index ===
                        previewImageIndex
                          ? 'scale(1)'
                          : 'scale(1.08)',
                    }}
                  />
                )
              )}

              <div className="projects__preview-overlay" />

              {activeProject && (
                <div className="projects__preview-info">
                  <span>
                    {String(
                      (hoveredIndex ?? 0) + 1
                    ).padStart(2, '0')}
                  </span>

                  <span>
                    {activeProject.title}
                  </span>
                </div>
              )}

              {activeImages.length > 1 && (
                <div className="projects__preview-progress">
                  {activeImages.map(
                    (_, index) => (
                      <span
                        key={index}
                        className={
                          index ===
                          previewImageIndex
                            ? 'is-active'
                            : ''
                        }
                      />
                    )
                  )}
                </div>
              )}

              <span className="projects__preview-zoom">
                +
              </span>
            </div>
          </div>

          {/* =================================
              LISTE DES PROJETS
          ================================= */}

          <div className="projects__list">

            {projects.map(
              (project, index) => {
                const currentProject =
                  project as Project

                const isActive =
                  hoveredIndex === index

                return (
                  <article
                    key={project.id}
                    className={`project-item ${
                      isActive
                        ? 'project-item--active'
                        : ''
                    }`}
                    onMouseEnter={() =>
                      handleProjectEnter(index)
                    }
                    onMouseLeave={
                      handleProjectLeave
                    }
                    onClick={() => {
                      if (
                        currentProject.images
                          ?.length
                      ) {
                        setHoveredIndex(index)
                        setPreviewImageIndex(0)
                        setPreviewOpen(true)
                      }
                    }}
                  >
                    <div className="project-item__line" />

                    <div className="project-item__content">

                      {/* NUMÉRO */}

                      <div className="project-item__number">
                        {String(index + 1).padStart(
                          2,
                          '0'
                        )}
                      </div>

                      {/* INFORMATIONS */}

                      <div className="project-item__main">

                        <div className="project-item__title-row">

                          <h3 className="project-item__title">
                            <span>
                              {project.title}
                            </span>
                          </h3>

                          <ArrowUpRight
                            className="project-item__arrow"
                          />
                        </div>

                        <p className="project-item__description">
                          {project.description}
                        </p>

                        {currentProject.tags &&
                          currentProject.tags
                            .length > 0 && (
                            <div className="project-item__tags">
                              {currentProject.tags.map(
                                (tag) => (
                                  <span
                                    key={tag}
                                  >
                                    {tag}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                      </div>

                      {/* ANNÉE */}

                      <div className="project-item__year">
                        {currentProject.year ??
                          '2026'}
                      </div>

                      {/* FLÈCHE */}

                      <div className="project-item__action">
                        <ArrowUpRight />
                      </div>
                    </div>
                  </article>
                )
              }
            )}

            <div className="projects__bottom-line" />
          </div>

          {/* =================================
              INDICATION
          ================================= */}

          <div className="projects__hint">
            <span className="projects__hint-dot" />
            Survolez un projet pour découvrir
            les captures
          </div>
        </div>
      </section>

      {/* =================================
          LIGHTBOX
      ================================= */}

      {previewOpen &&
        activeImage && (
          <div
            className="project-lightbox"
            onClick={() =>
              setPreviewOpen(false)
            }
          >
            <div
              className="project-lightbox__content"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                className="project-lightbox__close"
                onClick={() =>
                  setPreviewOpen(false)
                }
                aria-label="Fermer"
              >
                ×
              </button>

              <img
                src={activeImage}
                alt={
                  activeProject?.title ??
                  'Projet'
                }
                className="project-lightbox__image"
              />

              <div className="project-lightbox__caption">
                <span>
                  {activeProject?.title}
                </span>

                <small>
                  Capture{' '}
                  {previewImageIndex + 1}
                  {' / '}
                  {activeImages.length}
                </small>
              </div>
            </div>
          </div>
        )}
    </>
  )
}