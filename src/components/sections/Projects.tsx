import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { projects } from '../../data/projects'
import './Projects.css'

type Project = (typeof projects)[number] & {
  tags?: string[]
  images?: string[]
  year?: string | number
}

export default function Projects() {
  const containerRef = useRef<HTMLElement | null>(null)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [previewImageIndex, setPreviewImageIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const selectedProject =
    selectedIndex !== null
      ? (projects[selectedIndex] as Project)
      : null

  const selectedImages =
    selectedProject?.images ?? []

  
  /*
   * =========================================
   * PREVIEW QUI SUIT LA SOURIS
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

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [mousePosition])

  /*
   * =========================================
   * MOUSE MOVE
   * =========================================
   */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const container = containerRef.current

    if (!container) {
      return
    }

    const rect = container.getBoundingClientRect()

    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  /*
   * =========================================
   * HOVER PROJECT
   * =========================================
   */

  const handleProjectEnter = (index: number) => {
    setHoveredIndex(index)
    setPreviewImageIndex(0)
  }

  const handleProjectLeave = () => {
    setHoveredIndex(null)
    setPreviewImageIndex(0)
  }

  /*
   * =========================================
   * OUVRIR LE MODAL
   * =========================================
   */

  const openProject = (index: number) => {
    const project = projects[index] as Project

    setSelectedIndex(index)
    setSelectedImageIndex(0)

    setHoveredIndex(index)

    document.body.style.overflow = 'hidden'

    /*
     * Si le projet n'a pas d'image,
     * le modal peut quand même afficher
     * ses informations.
     */
    if (!project.images?.length) {
      setSelectedImageIndex(0)
    }
  }

  /*
   * =========================================
   * FERMER LE MODAL
   * =========================================
   */

  const closeProject = () => {
    setSelectedIndex(null)
    setSelectedImageIndex(0)

    document.body.style.overflow = ''
  }

  /*
   * =========================================
   * ESC
   * =========================================
   */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProject()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)

      document.body.style.overflow = ''
    }
  }, [])

  /*
   * =========================================
   * SLIDESHOW AUTOMATIQUE
   * =========================================
   */

  useEffect(() => {
    if (
      selectedIndex === null ||
      selectedImages.length <= 1
    ) {
      return
    }

    const timer = window.setInterval(() => {
      setSelectedImageIndex((current) => {
        return (current + 1) % selectedImages.length
      })
    }, 2500)

    return () => {
      window.clearInterval(timer)
    }
  }, [
    selectedIndex,
    selectedImages.length,
  ])

  /*
   * =========================================
   * NAVIGATION IMAGES
   * =========================================
   */

  const nextImage = () => {
    if (selectedImages.length <= 1) {
      return
    }

    setSelectedImageIndex(
      (current) =>
        (current + 1) % selectedImages.length
    )
  }

  const previousImage = () => {
    if (selectedImages.length <= 1) {
      return
    }

    setSelectedImageIndex(
      (current) =>
        (current - 1 + selectedImages.length) %
        selectedImages.length
    )
  }

  /*
   * =========================================
   * TOUCH SWIPE
   * =========================================
   */

  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      event.touches[0].clientX
  }

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (touchStartX.current === null) {
      return
    }

    const touchEndX =
      event.changedTouches[0].clientX

    const difference =
      touchStartX.current - touchEndX

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextImage()
      } else {
        previousImage()
      }
    }

    touchStartX.current = null
  }

  /*
   * =========================================
   * PROJECT ACTIF POUR LA PREVIEW
   * =========================================
   */

  const previewProject =
    hoveredIndex !== null
      ? (projects[hoveredIndex] as Project)
      : null

  const previewImages =
    previewProject?.images ?? []

  /*
   * =========================================
   * SLIDESHOW PREVIEW AU SURVOL
   * =========================================
   */

  useEffect(() => {
    if (
      hoveredIndex === null ||
      previewImages.length <= 1
    ) {
      return
    }

    const timer = window.setInterval(() => {
      setPreviewImageIndex((current) => {
        return (current + 1) % previewImages.length
      })
    }, 2500)

    return () => {
      window.clearInterval(timer)
    }
  }, [hoveredIndex, previewImages.length])

  const previewImage =
    previewImages[previewImageIndex] ?? previewImages[0] ?? null

  /*
   * =========================================
   * RENDER
   * =========================================
   */

  return (
    <>
      <section
        ref={containerRef}
        id="projects"
        className="projects section"
        onMouseMove={handleMouseMove}
      >
        <div className="section-inner projects__inner">

          {/* HEADER */}

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

          {/* PREVIEW DESKTOP */}

          <div
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
          >
            <div className="projects__preview-frame">
              {previewImage && (
                <img
                  src={previewImage}
                  alt={previewProject?.title ?? ''}
                  className="projects__preview-image"
                />
              )}

              <div className="projects__preview-overlay" />

              {previewProject && (
                <div className="projects__preview-info">
                  <span>
                    {String(
                      (hoveredIndex ?? 0) + 1
                    ).padStart(2, '0')}
                  </span>

                  <span>
                    {previewProject.title}
                  </span>
                </div>
              )}

              <span className="projects__preview-icon">
                <ArrowUpRight />
              </span>
            </div>
          </div>

          {/* LISTE */}

          <div className="projects__list">
            {projects.map((project, index) => {
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
                  onClick={() =>
                    openProject(index)
                  }
                >
                  <div className="project-item__line" />

                  <div className="project-item__content">

                    <div className="project-item__number">
                      {String(index + 1).padStart(
                        2,
                        '0'
                      )}
                    </div>

                    <div className="project-item__main">
                      <div className="project-item__title-row">
                        <h3 className="project-item__title">
                          <span>
                            {project.title}
                          </span>
                        </h3>

                        <ArrowUpRight className="project-item__arrow" />
                      </div>

                      <p className="project-item__description">
                        {project.description}
                      </p>

                      {currentProject.tags &&
                        currentProject.tags.length >
                          0 && (
                          <div className="project-item__tags">
                            {currentProject.tags.map(
                              (tag) => (
                                <span key={tag}>
                                  {tag}
                                </span>
                              )
                            )}
                          </div>
                        )}
                    </div>

                    <div className="project-item__year">
                      {currentProject.year ?? '2026'}
                    </div>

                    <div className="project-item__action">
                      <ArrowUpRight />
                    </div>
                  </div>
                </article>
              )
            })}

            <div className="projects__bottom-line" />
          </div>

          <div className="projects__hint">
            <span className="projects__hint-dot" />
            Survolez puis cliquez sur un projet
          </div>
        </div>
      </section>

      {/* =========================================
          PROJECT MODAL
      ========================================= */}

      {selectedProject && (
        <div
          className="project-modal"
          onClick={closeProject}
        >
          <div
            className="project-modal__window"
            onClick={(event) =>
              event.stopPropagation()
            }
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            {/* CLOSE */}

            <button
              type="button"
              className="project-modal__close"
              onClick={closeProject}
              aria-label="Fermer le projet"
            >
              <X />
            </button>

            {/* LEFT : IMAGE */}

            <div className="project-modal__visual">

              <div className="project-modal__image-wrapper">

                {selectedImages.length > 0 ? (
                  selectedImages.map(
                    (image, index) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`${selectedProject.title} - capture ${index + 1}`}
                        className={`project-modal__image ${
                          index ===
                          selectedImageIndex
                            ? 'project-modal__image--active'
                            : ''
                        }`}
                      />
                    )
                  )
                ) : (
                  <div className="project-modal__empty">
                    <span>
                      Aucune capture disponible
                    </span>
                  </div>
                )}

                <div className="project-modal__image-overlay" />

                {/* COUNTER */}

                {selectedImages.length > 0 && (
                  <div className="project-modal__counter">
                    <span>
                      {String(
                        selectedImageIndex + 1
                      ).padStart(2, '0')}
                    </span>

                    <span className="project-modal__counter-line" />

                    <span>
                      {String(
                        selectedImages.length
                      ).padStart(2, '0')}
                    </span>
                  </div>
                )}

                {/* ARROWS */}

                {selectedImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="project-modal__nav project-modal__nav--prev"
                      onClick={previousImage}
                      aria-label="Image précédente"
                    >
                      <ArrowLeft />
                    </button>

                    <button
                      type="button"
                      className="project-modal__nav project-modal__nav--next"
                      onClick={nextImage}
                      aria-label="Image suivante"
                    >
                      <ArrowRight />
                    </button>
                  </>
                )}
              </div>

              {/* DOTS */}

              {selectedImages.length > 1 && (
                <div className="project-modal__dots">
                  {selectedImages.map(
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={
                          index ===
                          selectedImageIndex
                            ? 'is-active'
                            : ''
                        }
                        onClick={() =>
                          setSelectedImageIndex(
                            index
                          )
                        }
                        aria-label={`Afficher la capture ${index + 1}`}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            {/* RIGHT : INFORMATION */}

            <div className="project-modal__info">

              <div className="project-modal__eyebrow">
                <span>
                  {String(
                    (selectedIndex ?? 0) + 1
                  ).padStart(2, '0')}
                </span>

                <span>Projet</span>

                <span className="project-modal__year">
                  {selectedProject.year ??
                    '2026'}
                </span>
              </div>

              <h2 className="project-modal__title">
                {selectedProject.title}
              </h2>

              <div className="project-modal__separator" />

              <p className="project-modal__description">
                {selectedProject.description}
              </p>

              {/* TECHNOLOGIES */}

              {selectedProject.tags &&
                selectedProject.tags.length >
                  0 && (
                  <div className="project-modal__technologies">
                    <span className="project-modal__label">
                      Technologies
                    </span>

                    <div className="project-modal__tags">
                      {selectedProject.tags.map(
                        (tag) => (
                          <span key={tag}>
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* SLIDESHOW STATUS */}

              {selectedImages.length > 1 && (
                <div className="project-modal__slideshow">
                  <span className="project-modal__slideshow-dot" />

                  Les captures défilent
                  automatiquement
                </div>
              )}

              {/* LINK */}

              {selectedProject.link &&
                selectedProject.link !== '#' && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal__link"
                  >
                    Voir le projet
                    <ArrowUpRight />
                  </a>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}