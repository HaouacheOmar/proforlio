import classes from "../data/classes.js";
import { CV, GITHUB, LINKEDIN } from "../data/links.js";
import Scene3D from "./Scene3D.jsx";

export default function Home() {
  return (
    <section className="hero container" id="home">
      <div className="hero__intro">
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

        <p className="hero__name">Haouache Omar</p>
        <p className="hero__lede">
          Software engineer building full-stack web applications, SaaS platforms and distributed systems,
          with computer vision built in: from training models to running them on live camera feeds.
        </p>
      </div>

      {/* Same grid row as the intro above, so the scene matches its height */}
      <figure className="hero__frame">
        <Scene3D />
        <figcaption className="hero__caption">frame #000 · 3 cameras · live</figcaption>
      </figure>

      <div className="hero__more">

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
    </section>
  );
}
