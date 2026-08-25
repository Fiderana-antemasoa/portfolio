import { useEffect, useRef, useState } from 'react'
import { projects } from '../../data/projects'
import './Projects.css'

type Project = (typeof projects)[number] & {
  tags?: string[]
  images?: string[]
}

type Direction = 'next' | 'previous' | null

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const visualRef = useRef<HTMLDivElement | null>(null)
  const lockedRef = useRef(false)
  const unlockTimerRef = useRef<number | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [direction, setDirection] = useState<Direction>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const activeProject = projects[activeIndex] as Project
  const images = activeProject?.images ?? []

  /*
   * =========================================
   * Vérifie si la section est suffisamment
   * visible pour intercepter le scroll.
   * =========================================
   */

  const isSectionActive = () => {
    const section = sectionRef.current

    if (!section) {
      return false
    }

    const rect = section.getBoundingClientRect()

    return (
      rect.top <= 10 &&
      rect.bottom >= window.innerHeight - 10
    )
  }

  /*
   * =========================================
   * Déverrouillage
   * =========================================
   */

  const unlockScroll = (delay = 700) => {
    if (unlockTimerRef.current) {
      window.clearTimeout(unlockTimerRef.current)
    }

    unlockTimerRef.current = window.setTimeout(() => {
      lockedRef.current = false
    }, delay)
  }

  /*
   * =========================================
   * ESC LIGHTBOX
   * =========================================
   */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)

      if (unlockTimerRef.current) {
        window.clearTimeout(unlockTimerRef.current)
      }
    }
  }, [])

  /*
   * =========================================
   * SCROLL UNIQUEMENT DANS LA ZONE PHOTO
   * =========================================
   */

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      /*
       * Si la lightbox est ouverte,
       * le scroll de la page est ignoré.
       */
      if (previewOpen) {
        event.preventDefault()
        return
      }

      /*
       * La section doit être actuellement
       * au premier plan.
       */
      if (!isSectionActive()) {
        return
      }

      const visual = visualRef.current

      if (!visual) {
        return
      }

      /*
       * IMPORTANT :
       * On regarde où se trouve réellement
       * le curseur.
       */
      const rect = visual.getBoundingClientRect()

      const cursorInsideVisual =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      /*
       * CURSEUR À GAUCHE
       *
       * On ne fait absolument rien.
       *
       * Le navigateur garde donc son scroll
       * naturel.
       */
      if (!cursorInsideVisual) {
        return
      }

      /*
       * Pas d'images => scroll normal.
       */
      if (!activeProject || images.length === 0) {
        return
      }

      /*
       * Évite plusieurs changements causés
       * par la même molette.
       */
      if (lockedRef.current) {
        event.preventDefault()
        return
      }

      const goingDown = event.deltaY > 0
      const goingUp = event.deltaY < 0

      const isFirstImage = imageIndex === 0
      const isLastImage =
        imageIndex === images.length - 1

      const isFirstProject = activeIndex === 0
      const isLastProject =
        activeIndex === projects.length - 1

      /*
       * =========================================
       * DESCENTE
       * =========================================
       */

      if (goingDown) {
        /*
         * Encore une photo dans le projet.
         */
        if (!isLastImage) {
          event.preventDefault()

          lockedRef.current = true

          setDirection('next')
          setImageIndex((current) => current + 1)

          unlockScroll(700)

          return
        }

        /*
         * Dernière photo :
         * passer au projet suivant.
         */
        if (!isLastProject) {
          event.preventDefault()

          lockedRef.current = true

          setDirection('next')

          setActiveIndex(
            (current) => current + 1
          )

          setImageIndex(0)

          unlockScroll(800)

          return
        }

        /*
         * Dernière photo du dernier projet.
         *
         * IMPORTANT :
         * on ne bloque PAS.
         *
         * Le scroll descend normalement
         * vers la section suivante.
         */
        return
      }

      /*
       * =========================================
       * REMONTEE
       * =========================================
       */

      if (goingUp) {
        /*
         * Encore une photo précédente.
         */
        if (!isFirstImage) {
          event.preventDefault()

          lockedRef.current = true

          setDirection('previous')
          setImageIndex((current) => current - 1)

          unlockScroll(700)

          return
        }

        /*
         * Première photo :
         * retourner au projet précédent.
         */
        if (!isFirstProject) {
          event.preventDefault()

          lockedRef.current = true

          const previousProjectIndex =
            activeIndex - 1

          const previousProject =
            projects[
              previousProjectIndex
            ] as Project

          const previousImages =
            previousProject?.images ?? []

          setDirection('previous')

          setActiveIndex(
            previousProjectIndex
          )

          setImageIndex(
            Math.max(
              previousImages.length - 1,
              0
            )
          )

          unlockScroll(800)

          return
        }

        /*
         * Première photo du premier projet :
         * scroll normal vers la section précédente.
         */
        return
      }
    }

    window.addEventListener(
      'wheel',
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel
      )
    }
  }, [
    activeIndex,
    imageIndex,
    images.length,
    activeProject,
    previewOpen,
  ])

  /*
   * =========================================
   * CHANGER DE PROJET PAR CLIC
   * =========================================
   */

  const handleProjectClick = (
    index: number
  ) => {
    if (index === activeIndex) {
      return
    }

    setDirection(
      index > activeIndex
        ? 'next'
        : 'previous'
    )

    setActiveIndex(index)
    setImageIndex(0)
  }

  /*
   * =========================================
   * RÉCUPÉRER UNE IMAGE
   * =========================================
   */

  const getImage = (offset: number) => {
    if (images.length === 0) {
      return null
    }

    const index =
      (imageIndex +
        offset +
        images.length) %
      images.length

    return images[index]
  }

  const previousImage = getImage(-1)
  const currentImage = getImage(0)
  const nextImage = getImage(1)

  /*
   * =========================================
   * CLASSE ANIMATION
   * =========================================
   */

  const galleryClass =
    direction === 'next'
      ? 'project-gallery--next'
      : direction === 'previous'
        ? 'project-gallery--previous'
        : ''

  if (!activeProject) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects section"
    >
      <div className="projects__sticky">

        <div className="section-inner projects__inner">

          {/* =================================
              HEADER
          ================================= */}

          <div className="projects__header">
            <p className="section-eyebrow">
              ✦ Projets
            </p>

            <h2 className="section-title">
              Ce que j'ai{' '}
              <span className="gradient-text">
                créé
              </span>
            </h2>
          </div>

          {/* =================================
              SHOWCASE
          ================================= */}

          <div className="projects__showcase">

            {/* =================================
                LISTE
            ================================= */}

            <div className="projects__navigation">

              {projects.map(
                (project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`project-nav ${
                      activeIndex === index
                        ? 'project-nav--active'
                        : ''
                    }`}
                    onClick={() =>
                      handleProjectClick(
                        index
                      )
                    }
                  >
                    <span className="project-nav__number">
                      {String(
                        index + 1
                      ).padStart(2, '0')}
                    </span>

                    <span className="project-nav__title">
                      {project.title}
                    </span>

                    <span className="project-nav__arrow">
                      →
                    </span>
                  </button>
                )
              )}

            </div>

            {/* =================================
                ZONE PHOTO
            ================================= */}

            <div
              ref={visualRef}
              className="projects__visual"
            >

              <div
                className={`project-gallery ${galleryClass}`}
              >

                {/* IMAGE PRÉCÉDENTE */}

                {previousImage && (
                  <div
                    className="
                      project-gallery__card
                      project-gallery__card--left
                    "
                  >
                    <img
                      src={previousImage}
                      alt=""
                    />
                  </div>
                )}

                {/* IMAGE PRINCIPALE */}

                {currentImage && (
                  <div
                    className="
                      project-gallery__card
                      project-gallery__card--main
                      project-gallery__card--clickable
                    "
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      setPreviewOpen(true)
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                          'Enter' ||
                        event.key === ' '
                      ) {
                        setPreviewOpen(true)
                      }
                    }}
                  >

                    <img
                      src={currentImage}
                      alt={`${activeProject.title} capture`}
                    />

                    <div className="project-gallery__overlay" />

                    {/* Décorations */}

                    <span
                      className="
                        project-gallery__flower
                        project-gallery__flower--1
                      "
                    >
                      ✿
                    </span>

                    <span
                      className="
                        project-gallery__flower
                        project-gallery__flower--2
                      "
                    >
                      ❀
                    </span>

                    <span
                      className="
                        project-gallery__star
                        project-gallery__star--1
                      "
                    >
                      ✦
                    </span>

                    <span
                      className="
                        project-gallery__star
                        project-gallery__star--2
                      "
                    >
                      ✧
                    </span>

                    {/* =================================
                        INFORMATIONS
                    ================================= */}

                    <div className="project-gallery__content">

                      <span className="project-gallery__badge">
                        {String(
                          activeIndex + 1
                        ).padStart(2, '0')}
                        {' · '}
                        {activeProject.title}
                      </span>

                      <h3>
                        {activeProject.title}
                      </h3>

                      <p>
                        {activeProject.description}
                      </p>

                      <div className="project-gallery__technologies">

                        {(
                          activeProject.tags ??
                          []
                        ).map(
                          (tag: string) => (
                            <span
                              key={tag}
                              className="
                                project-gallery__technology
                              "
                            >
                              {tag}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                    {/* ZOOM */}

                    <span className="project-gallery__zoom">
                      +
                    </span>

                  </div>
                )}

                {/* IMAGE SUIVANTE */}

                {nextImage && (
                  <div
                    className="
                      project-gallery__card
                      project-gallery__card--right
                    "
                  >
                    <img
                      src={nextImage}
                      alt=""
                    />
                  </div>
                )}

              </div>

              {/* COMPTEUR */}

              <div className="project-gallery__counter">

                <span>
                  {String(
                    imageIndex + 1
                  ).padStart(2, '0')}
                </span>

                <span className="project-gallery__counter-line" />

                <span>
                  {String(
                    Math.max(
                      images.length,
                      1
                    )
                  ).padStart(2, '0')}
                </span>

              </div>

              <p className="project-gallery__hint">
                Faites défiler pour découvrir
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          LIGHTBOX
      ========================================= */}

      {previewOpen &&
        currentImage && (
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
                src={currentImage}
                alt={`${activeProject.title} capture en grand`}
                className="project-lightbox__image"
              />

              <div className="project-lightbox__caption">

                <span>
                  {activeProject.title}
                </span>

                <small>
                  Capture{' '}
                  {imageIndex + 1}
                  {' / '}
                  {images.length}
                </small>

              </div>

            </div>

          </div>
        )}

    </section>
  )
}