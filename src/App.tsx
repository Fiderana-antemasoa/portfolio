import { useState, useCallback } from 'react'
import Intro from './components/Intro'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
//import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import { useScrollReveal } from './hooks/useScrollReveal'
import './App.css'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  useScrollReveal()

  return (
    <>
      {!introComplete && <Intro onComplete={handleIntroComplete} />}

      <div
        className={`app ${introComplete ? 'app--visible' : ''}`}
        aria-hidden={!introComplete}
      >
        <Navbar />
        <main>
          <Hero />
         
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}