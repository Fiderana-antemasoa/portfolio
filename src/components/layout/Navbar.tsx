import { useEffect, useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#hero", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#experience", label: "Expérience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <span className="navbar__deco-flower-top">🌸</span>
      <span className="navbar__deco-star-bottom">✦</span>

      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <span className="navbar__left-flower">🌸</span>

        <a href="#hero" className="navbar__logo">
          <span className="navbar__flower">🌸</span>
          <span className="navbar__logo-name">Fiderana</span>
          <span className="navbar__star">✦</span>
        </a>

        <nav className="navbar__nav">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} className="navbar__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar__right">
          <div className="navbar__toggle">
            <div className="navbar__toggle-dot" />
          </div>
          <span className="navbar__right-star">✦</span>
        </div>
      </header>
    </>
  );
}