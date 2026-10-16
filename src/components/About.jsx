const BOXES = [
  { icon: "bx-award", title: "Experience", subtitle: "Junior Developer" },
  { icon: "bx-briefcase-alt", title: "Completed", subtitle: "Master's Degree in Computer Science" },
  { icon: "bx-support", title: "Support", subtitle: "Online 24/7" },
];

export default function About() {
  return (
    <section className="about section" id="about">
      <span className="section__subtitle">My Bio</span>
      <h2 className="section__title">About Me</h2>

      <div className="about__container container grid">
        <img src="/assets/img/me.jpeg" alt="Portrait of Omar" className="about__img" width="660" height="660" loading="lazy" decoding="async" />

        <div className="about__data">
          <div className="about__info">
            {BOXES.map(({ icon, title, subtitle }) => (
              <div className="about__box" key={title}>
                <i className={`bx ${icon} about__icon`}></i>
                <h3 className="about__title">{title}</h3>
                <span className="about__subtitle">{subtitle}</span>
              </div>
            ))}
          </div>

          <p className="about__description">
            I'm a software engineer specializing in Back-End development and IT systems architecture.
            I have a strong foundation in computer science and a passion for creating efficient and scalable solutions.
          </p>

          <a href="#contact" className="button about__button-contact">Contact Me</a>
        </div>
      </div>
    </section>
  );
}
