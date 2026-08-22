import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
  entry.target.classList.add('visible')
} else {
  entry.target.classList.remove('visible')
}
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}