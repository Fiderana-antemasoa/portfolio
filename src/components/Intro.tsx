import { useEffect, useState, useRef } from 'react'
import './Intro.css'

interface Petal {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  emoji: string
}

const PETALS_EMOJIS = ['🌸', '✦', '◇', '❋', '✿', '⋆']

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 0.8 + Math.random() * 1.4,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    emoji: PETALS_EMOJIS[Math.floor(Math.random() * PETALS_EMOJIS.length)],
  }))
}

interface IntroProps {
  onComplete: () => void
}

export default function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<'entering' | 'holding' | 'leaving'>('entering')
  const [petals] = useState(() => generatePetals(22))
  const [letters, setLetters] = useState<boolean[]>([false, false, false, false, false, false, false])
  const name = 'Bienvenue'
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Reveal letters one by one
    name.split('').forEach((_, i) => {
      setTimeout(() => {
        setLetters((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 400 + i * 120)
    })

    // Transition to leaving
    timerRef.current = setTimeout(() => setPhase('leaving'), 3200)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (phase === 'leaving') {
      const t = setTimeout(onComplete, 900)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  return (
    <div className={`intro ${phase}`}>
      {/* Ambient orbs */}
      <div className="intro-orb intro-orb--1" />
      <div className="intro-orb intro-orb--2" />

      {/* Falling petals */}
      <div className="intro-petals" aria-hidden="true">
        {petals.map((p) => (
          <span
            key={p.id}
            className="petal"
            style={{
              left: `${p.x}%`,
              fontSize: `${p.size}rem`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      {/* Center content */}
      <div className="intro-center">
        <div className="intro-ring" aria-hidden="true">
          <span className="intro-ring__dot" />
        </div>

        <h1 className="intro-title" aria-label={name}>
          {name.split('').map((char, i) => (
            <span
              key={i}
              className={`intro-letter ${letters[i] ? 'intro-letter--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.04}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="intro-sub">dans mon univers ✦</p>

        <div className="intro-loader" aria-label="Chargement">
          <div className="intro-loader__bar" />
        </div>
      </div>
    </div>
  )
}