export default function Footer() {
  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__line">
          <p className="footer__back">
            <a href="#hero" onClick={scrollToTop} aria-label="Retour en haut">
              ↑
            </a>
          </p>
        </div>
        <p className="footer__logo">
          FIDERANA Antemasoa — FULLSTACK DEVELOPER — ANTANANARIVO
        </p>
        <p className="footer__copy">
          © {new Date().getFullYear()} Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
