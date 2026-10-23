import { CV, GITHUB, LINKEDIN } from "../data/links.js";

const LINKS = [
  { href: GITHUB, label: "GitHub", external: true },
  { href: LINKEDIN, label: "LinkedIn", external: true },
  { href: CV, label: "CV (PDF)", download: true },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <p className="footer__name">Omar Haouache</p>
        <ul className="footer__links">
          {LINKS.map(({ href, label, external, download }) => (
            <li key={label}>
              <a
                href={href}
                className="footer__link"
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                {...(download && { download: true })}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer__note">Software engineer · computer vision &amp; full-stack · Algiers</p>
      </div>
    </footer>
  );
}
