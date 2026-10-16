const LINKS = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://www.facebook.com/abderrahmane.haouache.247035/", icon: "bxl-facebook", label: "Facebook" },
  { href: "https://github.com/HaouacheOmar", icon: "bxl-github", label: "GitHub" },
  { href: "#", icon: "bxl-linkedin", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Omar</h1>

        <ul className="footer__list">
          {LINKS.map(({ href, label }) => (
            <li className="footer__item" key={label}>
              <a href={href} className="footer__link">{label}</a>
            </li>
          ))}
        </ul>

        <ul className="footer__social">
          {SOCIALS.map(({ href, icon, label }) => (
            <li className="footer__social-item" key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label={label}>
                <i className={`bx ${icon} footer__social-icon`}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
