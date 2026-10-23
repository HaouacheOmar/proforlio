import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import projects from "../data/projects.js";
import classes from "../data/classes.js";
import WorkCard from "./WorkCard.jsx";

// The frame address (#001…) comes from the full list, so it never changes under a filter
const framed = projects.map((project, n) => ({ ...project, frame: `#${String(n + 1).padStart(3, "0")}` }));

export default function Work() {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? framed : framed.filter((p) => p.classes.includes(filter));

  return (
    <section className="work section container" id="work">
      <div className="section__head">
        <h2 className="section__title">Selected work</h2>
        <p className="section__lede">
          Ten projects, each tagged with what it is. Pick a class to filter.
        </p>
      </div>

      <div className="filter" role="group" aria-label="Filter projects by class">
        <button
          type="button"
          className={`filter__chip filter__chip--all${filter === "all" ? " is-on" : ""}`}
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          all <span className="filter__count">{framed.length}</span>
        </button>
        {classes.map(({ id, label }) => {
          const count = framed.filter((p) => p.classes.includes(id)).length;
          const on = filter === "all" || filter === id;
          return (
            <button
              key={id}
              type="button"
              className={`filter__chip filter__chip--${id}${on ? " is-on" : ""}`}
              aria-pressed={filter === id}
              onClick={() => setFilter(filter === id ? "all" : id)}
            >
              {label} <span className="filter__count">{count}</span>
            </button>
          );
        })}
      </div>

      <MotionConfig reducedMotion="user">
        <motion.ul layout className="work__grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((project) => (
              <motion.li
                key={project.title}
                layout
                className="work__item"
                initial={{ opacity: 0, transform: "scale(0.96)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0.96)", transition: { duration: 0.15 } }}
                transition={{ type: "spring", visualDuration: 0.35, bounce: 0 }}
              >
                <WorkCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </MotionConfig>
    </section>
  );
}
