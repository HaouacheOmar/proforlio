import classes from "../data/classes.js";
import { CV, GITHUB, LINKEDIN } from "../data/links.js";

// Face mesh on me.jpeg, in % of the photo (the photo is square, so x and y share a scale)
const POINTS = {
  // contour: left temple, down the jaw, chin, up to the right temple, then the hairline
  contour: [[28.8, 42.4], [28, 50], [28.8, 60.6], [31, 68], [35.6, 75.8], [42.4, 81.8], [50, 84.8], [58.3, 81.8], [65.2, 75.8], [70.5, 68], [73.5, 60.6], [75, 50], [71.2, 42.4], [65, 30], [50, 27], [35, 30]],
  browL: [[32.6, 45.5], [39, 43.6], [45.5, 44.5]],
  browR: [[55.3, 44.2], [61.5, 43.3], [67.5, 45.2]],
  eyeL: [[36.4, 50.3], [40.2, 48.8], [44.7, 50.3], [40.2, 51.6]],
  eyeR: [[57.6, 50], [62.1, 48.6], [66.7, 50], [62.1, 51.4]],
  nose: [[51, 50], [51.5, 56], [51.5, 60.6]],
  nostrils: [[46.5, 62.5], [51.5, 60.6], [56.5, 62.5]],
  mouth: [[43.2, 71.2], [51.5, 69.5], [59.8, 71.2], [51.5, 74.5]],
};
// Open chains are drawn as polylines; these ones close into a loop
const CLOSED = ["contour", "eyeL", "eyeR", "mouth"];
// A few cross links so it reads as a mesh: [group, index] pairs
const LINKS = [
  [["browL", 2], ["nose", 0]], [["browR", 0], ["nose", 0]],
  [["eyeL", 2], ["nose", 1]], [["eyeR", 0], ["nose", 1]],
  [["nostrils", 0], ["mouth", 0]], [["nostrils", 2], ["mouth", 2]],
  [["mouth", 0], ["contour", 4]], [["mouth", 2], ["contour", 8]],
  [["mouth", 3], ["contour", 6]],
  [["browL", 0], ["contour", 0]], [["browR", 2], ["contour", 12]],
  [["eyeL", 0], ["contour", 2]], [["eyeR", 2], ["contour", 10]],
];
// Face box in % of the photo, kept in sync with .hero__face in styles.css
const FACE = { top: 23, height: 65 };
const at = ([group, i]) => POINTS[group][i];
// Each point is shared by the dots below: unique "x,y" keys
const DOTS = [...new Map(Object.values(POINTS).flat().map((p) => [p.join(","), p])).values()];

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
          web apps, SaaS platforms and distributed systems.
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
          <svg className="hero__mesh" viewBox="0 0 100 100" aria-hidden="true">
            {Object.entries(POINTS).map(([name, pts]) => {
              const Shape = CLOSED.includes(name) ? "polygon" : "polyline";
              return <Shape key={name} points={pts.map((p) => p.join(",")).join(" ")} pathLength="1" />;
            })}
            {LINKS.map(([a, b]) => {
              const [x1, y1] = at(a);
              const [x2, y2] = at(b);
              return <line key={`${a}-${b}`} x1={x1} y1={y1} x2={x2} y2={y2} pathLength="1" />;
            })}
            {DOTS.map(([x, y]) => (
              // --t: where the point sits inside the face box (0 top, 1 bottom), so it blips when the scan line passes
              <circle key={`${x},${y}`} cx={x} cy={y} r="0.55" style={{ "--t": (y - FACE.top) / FACE.height }} />
            ))}
          </svg>
        </div>
        <figcaption className="hero__caption">frame #000 · face mesh · labelled the way FRSYS sees a face</figcaption>
      </figure>
    </section>
  );
}
