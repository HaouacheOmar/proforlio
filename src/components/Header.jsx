import { useEffect, useState } from "react";

const NAV = [
  { id: "home", icon: "bx-home", label: "Home" },
  { id: "about", icon: "bx-user", label: "About" },
  { id: "skills", icon: "bx-book", label: "Skills" },
  { id: "work", icon: "bx-briefcase-alt-2", label: "Work" },
  { id: "contact", icon: "bx-message-square-dots", label: "Contact" },
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

  // Header background + highlight the nav icon of the section in view
  useEffect(() => {
    const sections = [...document.querySelectorAll("section[id]")];
    const onScroll = () => {
      setScrolled(scrollY >= 50);
      const current = sections.find((s) => {
        const top = s.offsetTop - 58;
        return scrollY > top && scrollY <= top + s.offsetHeight;
      });
      setActive(current?.id ?? null);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scroll-header" : ""}`} id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">Omar</a>

        <div className="nav__menu">
          <ul className="nav__list">
            {NAV.map(({ id, icon, label }) => (
              <li className="nav__item" key={id}>
                <a href={`#${id}`} className={`nav__link${active === id ? " active-link" : ""}`} aria-label={label}>
                  <i className={`bx ${icon}`}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className="change-theme" aria-label="Toggle light/dark theme" onClick={() => setLight((l) => !l)}>
          <i className={`bx ${light ? "bx-sun" : "bx-moon"}`}></i>
        </button>
      </nav>
    </header>
  );
}
