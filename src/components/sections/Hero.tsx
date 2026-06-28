import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg-orb hero__bg-orb--1" />
      <div className="hero__bg-orb hero__bg-orb--2" />
      <div className="hero__bg-orb hero__bg-orb--3" />

      <div className="hero__content">
        <p className="hero__eyebrow">✦ Développeuse Fullstack</p>

       <h1 className="hero__title">
  <span className="hero__name">RAKOTONJANAHARY<br />Antemasoa Fiderana</span>
  <span className="gradient-text">expériences digitales</span><br />
  qui prennent vie
</h1>

       <p className="hero__desc">
  Je conçois et développe des applications web complètes,
  du backend robuste à l'interface soignée — pour transformer
  vos idées en produits qui fonctionnent vraiment.
</p>

        <div className="hero__actions">
          <a href="#projects" className="hero__btn hero__btn--primary">
            Voir mes projets
          </a>
          <a href="#contact" className="hero__btn hero__btn--ghost">
            Me contacter ✦
          </a>
          <button
            className="hero__btn hero__btn--cv"
            disabled
            title="CV bientôt disponible"
          >
            📄 Télécharger mon CV
          </button>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__avatar-wrap">
          <div className="hero__avatar-ring hero__avatar-ring--outer" />
          <div className="hero__avatar-ring hero__avatar-ring--inner" />
          <div className="hero__avatar">
            <span className="hero__avatar-initials">AF</span>
          </div>
          <div className="hero__orbit hero__orbit--1"><span>✿</span></div>
          <div className="hero__orbit hero__orbit--2"><span>⋆</span></div>
          <div className="hero__orbit hero__orbit--3"><span>◇</span></div>
          <div className="hero__orbit hero__orbit--4"><span>🌸</span></div>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <div className="hero__scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  )
}