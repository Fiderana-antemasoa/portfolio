import { useEffect, useState, useCallback } from 'react'
import Intro from './components/Intro'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
// import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { useScrollReveal } from './hooks/useScrollReveal'
import AnimatedBackground from './components/background/AnimatedBackground'
import './App.css'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')

    if (savedTheme) {
      return savedTheme === 'dark'
    }

    return true
  })

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light'

    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [isDark])

  useScrollReveal()

  return (
    <>
      {!introComplete && <Intro onComplete={handleIntroComplete} />}

      <div
        className={`app ${introComplete ? 'app--visible' : ''}`}
        aria-hidden={!introComplete}
      >
        <AnimatedBackground />

        <div className="app-content">
          <Navbar
            isDark={isDark}
            onThemeToggle={() => setIsDark((current) => !current)}
          />

          <main>
            <Hero />
            {/* <About /> */}
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}