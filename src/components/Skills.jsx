import skillGroups from "../data/skills.js";

export default function Skills() {
  return (
    <section className="skills section container" id="skills">
      <div className="section__head">
        <h2 className="section__title">Stack</h2>
        <p className="section__lede">The tools behind the projects above, grouped by the class they serve.</p>
      </div>

      <div className="skills__list">
        {skillGroups.map(({ title, class: cls, skills }) => (
          <div className={`skills__group${cls ? ` skills__group--${cls}` : ""}`} key={title}>
            <h3 className="skills__title">
              {title}
              {cls && <span className={`tag tag--${cls}`}>{cls}</span>}
            </h3>
            <ul className="skills__items">
              {skills.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
