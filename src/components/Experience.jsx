import { useRef } from "react";
import { motion, useScroll } from "motion/react";

// Where the fill tip sits in the viewport: the rail fills up to this line and
// each node lights as it crosses it, so the two stay in sync
const TIP = 65;

const TIMELINE = [
  {
    when: "2024 – 2025",
    what: "Software Engineering Intern",
    where: "ICOSNET",
    text: "Master's final project: Smart Parking, real-time parking occupancy from camera feeds (TensorFlow, OpenCV) streamed to a Django dashboard over WebSockets, with an IoT LCD module.",
    tag: "vision",
  },
  {
    when: "2025",
    what: "Master in IT, Software Engineering",
    where: "Université M'Hamed Bougara de Boumerdès (UMBB)",
    text: "Software architecture, distributed systems and AI integration.",
    tag: "",
  },
  {
    when: "2022 – 2023",
    what: "Developer Intern",
    where: "Organisme des Œuvres Sociales",
    text: "Bachelor's final project: a desktop application for managing welfare files, analysed and modelled with UML and MERISE.",
    tag: "web_app",
  },
  {
    when: "2023",
    what: "Licence in Information Systems & Software Engineering",
    where: "Université M'Hamed Bougara de Boumerdès (UMBB)",
    text: "",
    tag: "",
  },
];

// A ring on the rail that lights up when the fill reaches it
function Node() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${TIP + 2}%`, `start ${TIP - 2}%`] });

  return (
    <span className="timeline__node" ref={ref} aria-hidden="true">
      <motion.span className="timeline__node-lit" style={{ opacity: scrollYProgress }} />
      <motion.span className="timeline__node-dot" style={{ scale: scrollYProgress }} />
    </span>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress: progress } = useScroll({ target: listRef, offset: [`start ${TIP}%`, `end ${TIP}%`] });

  return (
    <section className="experience section container" id="experience">
      <div className="section__head">
        <h2 className="section__title">Experience &amp; education</h2>
        <p className="section__lede">
          Two internships that shipped working software, a Master in software engineering, and a certificate from
          NVIDIA's Deep Learning Institute.
        </p>
      </div>

      <div className="timeline" ref={listRef}>
        <div className="timeline__rail" aria-hidden="true">
          <motion.div className="timeline__fill" style={{ scaleY: progress }} />
        </div>

        <ol className="timeline__list">
          {TIMELINE.map(({ when, what, where, text, tag }) => (
            <li className="timeline__item" key={what}>
              <Node />
              <span className="timeline__when">{when}</span>
              <div className="timeline__body">
                <h3 className="timeline__what">{what}</h3>
                <p className="timeline__where">
                  {where}
                  {tag && <span className={`tag tag--${tag}`}>{tag}</span>}
                </p>
                {text && <p className="timeline__text">{text}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="experience__cert">
        <i className="bx bx-certification" aria-hidden="true"></i>
        <span><b>Fundamentals of Deep Learning</b>, NVIDIA Deep Learning Institute</span>
      </p>
    </section>
  );
}
