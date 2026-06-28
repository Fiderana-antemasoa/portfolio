export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__logo">✦ Mon Portfolio</p>
        <p className="footer__copy">
          Fait avec 💜 & beaucoup de thé — {new Date().getFullYear()}
        </p>
        <p className="footer__back">
          <a href="#hero">Retour en haut ↑</a>
        </p>
      </div>
    </footer>
  )
}