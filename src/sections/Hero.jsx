import { lazy, Suspense } from 'react'
import SceneBoundary from '../three/SceneBoundary'

const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

export default function Hero() {
  return (
    <section className="container hero" id="home" aria-labelledby="hero-title">
      <div className="hero-intro eyebrow">
        <span>Megana K / Creative developer</span>
        <span className="hero-edition">An independent perspective</span>
      </div>
      <h1 className="hero-title" id="hero-title">MEGANA</h1>
      <div className="hero-visual" aria-hidden="true">
        <SceneBoundary>
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </SceneBoundary>
      </div>
      <div className="hero-bottom">
        <a className="scroll-link eyebrow" href="#about">
          <span className="scroll-line" aria-hidden="true" />
          Scroll to explore
        </a>
        <div className="hero-statement">
          <p className="display">Making the digital<br /><span>feel something.</span></p>
          <p className="muted">Thoughtful code. Expressive experiences.</p>
        </div>
        <span className="hero-index eyebrow" aria-hidden="true">Portfolio / 01</span>
      </div>
    </section>
  )
}
