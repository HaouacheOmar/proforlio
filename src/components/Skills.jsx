import skillCards from "../data/skills.js";

function SkillGroup({ skills }) {
  return (
    <div className="skills__group">
      {skills.map(({ name, level }) => (
        <div className="skills__data" key={name}>
          <i className="bx bxs-badge-check"></i>
          <div>
            <h3 className="skills__name">{name}</h3>
            <span className="skills__level">{level}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <span className="section__subtitle">My Abilities</span>
      <h2 className="section__title">My Experience</h2>

      <div className="skills__container container grid">
        {skillCards.map(({ title, skills }) => {
          const half = Math.ceil(skills.length / 2);
          return (
            <div className="skills__content" key={title}>
              <h3 className="skills__title">{title}</h3>
              <div className="skills__box">
                <SkillGroup skills={skills.slice(0, half)} />
                <SkillGroup skills={skills.slice(half)} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
