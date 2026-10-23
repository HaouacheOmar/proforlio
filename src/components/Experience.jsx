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

export default function Experience() {
  return (
    <section className="experience section container" id="experience">
      <div className="section__head">
        <h2 className="section__title">Experience &amp; education</h2>
        <p className="section__lede">
          Two internships that shipped working software, a Master in software engineering, and a certificate from
          NVIDIA's Deep Learning Institute.
        </p>
      </div>

      <ol className="timeline">
        {TIMELINE.map(({ when, what, where, text, tag }) => (
          <li className="timeline__item" key={what}>
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

      <p className="experience__cert">
        <i className="bx bx-certification" aria-hidden="true"></i>
        <span><b>Fundamentals of Deep Learning</b>, NVIDIA Deep Learning Institute</span>
      </p>
    </section>
  );
}
