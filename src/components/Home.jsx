import classes from "../data/classes.js";
import { CV, GITHUB, LINKEDIN } from "../data/links.js";

// Face landmarks on me.jpeg, in % of the photo: eyes, nose, mouth corners
const LANDMARKS = [
  [40.2, 50], [62.1, 49.7], [51.5, 60.6], [43.2, 71.2], [59.8, 71.2],
];

export default function Home() {
  return (
    <section className="hero container" id="home">
      <div className="hero__copy">
        <h1 className="hero__title">
          <span className="anno anno--vision" style={{ "--i": 0 }}>
            <span className="anno__tag" aria-hidden="true">computer_vision</span>
            Software that sees,
          </span>{" "}
          <span className="anno anno--distributed" style={{ "--i": 1 }}>
            <span className="anno__tag" aria-hidden="true">web_app · saas · distributed</span>
            systems that scale.
          </span>
        </h1>

        <p className="hero__lede">
          I'm Omar Haouache, a software engineer. I train computer vision models and ship them inside
          web apps, SaaS platforms and distributed systems built with Django, React and WebSockets.
        </p>

        <ul className="legend" aria-label="What I work on">
          {classes.map(({ id, label }) => (
            <li key={id} className={`legend__item legend__item--${id}`}>{label}</li>
          ))}
        </ul>

        <div className="hero__actions">
          <a href="#work" className="button button--primary">View projects</a>
          <a href={CV} download className="button">
            <i className="bx bx-download" aria-hidden="true"></i> Download CV
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="button">
            <i className="bx bxl-github" aria-hidden="true"></i> GitHub
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="button">
            <i className="bx bxl-linkedin-square" aria-hidden="true"></i> LinkedIn
          </a>
        </div>

        <p className="hero__meta">Master in IT, Software Engineering · UMBB · Reghaïa, Algiers</p>
      </div>

      <figure className="hero__frame">
        <div className="hero__shot">
          <img src="/assets/img/me.jpeg" alt="Portrait of Omar Haouache" width="660" height="660" decoding="async" fetchPriority="high" />
          <div className="anno anno--vision hero__face" style={{ "--i": 2 }} aria-hidden="true">
            <span className="anno__tag">face · omar_haouache</span>
          </div>
          {LANDMARKS.map(([x, y], n) => (
            <span key={n} className="hero__point" style={{ left: `${x}%`, top: `${y}%`, "--i": n }} aria-hidden="true"></span>
          ))}
        </div>
        <figcaption className="hero__caption">frame #000 · 5 landmarks · labelled the way FRSYS sees a face</figcaption>
      </figure>
    </section>
  );
}
