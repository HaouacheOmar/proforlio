import { MotionConfig, motion } from "motion/react";
import skillGroups from "../data/skills.js";

// Each group unfolds like a leaflet opening from its top fold, the first time
// the row scrolls into view: the title, then its class tag, then the items one by one
const group = {
  folded: {},
  open: { transition: { staggerChildren: 0.1 } },
};
const list = {
  folded: {},
  open: { transition: { staggerChildren: 0.04 } },
};
const item = {
  folded: { opacity: 0, transform: "perspective(400px) rotateX(-80deg)" },
  open: {
    opacity: 1,
    transform: "perspective(400px) rotateX(0deg)",
    transition: { type: "spring", visualDuration: 0.45, bounce: 0.15 },
  },
};
// The title unfolds like an item and then hands on to its class tag
const heading = {
  folded: item.folded,
  open: { ...item.open, transition: { ...item.open.transition, staggerChildren: 0.1 } },
};

export default function Skills() {
  return (
    <section className="skills section container" id="skills">
      <div className="section__head">
        <h2 className="section__title">Stack</h2>
        <p className="section__lede">The tools behind the projects above, grouped by the class they serve.</p>
      </div>

      <MotionConfig reducedMotion="user">
        <div className="skills__list">
          {skillGroups.map(({ title, class: cls, skills }) => (
            <motion.div
              className={`skills__group${cls ? ` skills__group--${cls}` : ""}`}
              key={title}
              variants={group}
              initial="folded"
              whileInView="open"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.h3 className="skills__title" variants={heading}>
                {title}
                {cls && <motion.span className={`tag tag--${cls}`} variants={item}>{cls}</motion.span>}
              </motion.h3>
              <motion.ul className="skills__items" variants={list}>
                {skills.map((name) => (
                  <motion.li key={name} variants={item}>{name}</motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>
      </MotionConfig>
    </section>
  );
}
