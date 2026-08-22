import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#hero", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#experience", label: "Expérience" },
  { href: "#contact", label: "Contact" },
];

type NavbarProps = {
  isDark: boolean;
  onThemeToggle: () => void;
};

export default function Navbar({ isDark, onThemeToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [spotlightX, setSpotlightX] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length) {
          const index = NAV_LINKS.findIndex(
            (item) => item.href === `#${visibleSections[0].target.id}`
          );

          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateSpotlight = () => {
      const nav = navRef.current;
      const link = linkRefs.current[activeIndex];

      if (!nav || !link) return;

      const spotlightWidth = 96;

      const x =
        link.offsetLeft +
        link.offsetWidth / 2 -
        spotlightWidth / 2;

      setSpotlightX(x);
    };

    updateSpotlight();

    window.addEventListener("resize", updateSpotlight);

    return () => {
      window.removeEventListener("resize", updateSpotlight);
    };
  }, [activeIndex, scrolled]);

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

        <nav ref={navRef} className="navbar__nav">
          <div
            className="navbar__spotlight"
            style={{
              transform: `translateX(${spotlightX}px)`,
            }}
          >
            <span className="navbar__spotlight-line" />
          </div>

          {NAV_LINKS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              ref={(element) => {
                linkRefs.current[index] = element;
              }}
              className={`navbar__link ${
                activeIndex === index ? "navbar__link--active" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar__right">
          <button
            type="button"
            className={`navbar__toggle ${
              isDark ? "navbar__toggle--dark" : ""
            }`}
            onClick={onThemeToggle}
            aria-label={
              isDark
                ? "Activer le mode clair"
                : "Activer le mode sombre"
            }
            aria-pressed={isDark}
          >
            <div className="navbar__toggle-dot" />
          </button>

          <span className="navbar__right-star">✦</span>
        </div>
      </header>
    </>
  );
}