import { useEffect, useState } from "react";
import { GITHUB, LINKEDIN } from "../data/links.js";

const NAV = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
];

function readTheme() {
  try {
    return localStorage.getItem("theme") === "light";
  } catch {
    return false;
  }
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [light, setLight] = useState(readTheme);

  useEffect(() => {
    document.body.classList.toggle("light-theme", light);
    try {
      localStorage.setItem("theme", light ? "light" : "dark");
    } catch {}
  }, [light]);

  // Header border + highlight the nav link of the section in view
  useEffect(() => {
    const sections = [...document.querySelectorAll("section[id]")];
    const onScroll = () => {
      setScrolled(scrollY >= 20);
      const current = sections.find((s) => {
        const top = s.offsetTop - 120;
        return scrollY > top && scrollY <= top + s.offsetHeight;
      });
      setActive(current?.id ?? null);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <nav className="nav container" aria-label="Main">
        <a href="#home" className="nav__logo">Omar Haouache</a>

        <ul className="nav__list">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={`nav__link${active === id ? " nav__link--active" : ""}`}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav__end">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="nav__social" aria-label="GitHub (opens in new tab)">
            <i className="bx bxl-github" aria-hidden="true"></i><span>GitHub</span>
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="nav__social" aria-label="LinkedIn (opens in new tab)">
            <i className="bx bxl-linkedin-square" aria-hidden="true"></i><span>LinkedIn</span>
          </a>
          <button type="button" className="nav__theme" aria-label={light ? "Switch to dark theme" : "Switch to light theme"} onClick={() => setLight((l) => !l)}>
            <i className={`bx ${light ? "bx-moon" : "bx-sun"}`} aria-hidden="true"></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
