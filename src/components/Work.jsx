import { useState } from "react";
import projects from "../data/projects.js";
import WorkCard from "./WorkCard.jsx";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "intern", label: "Internship" },
  { value: "sidework", label: "Side Work" },
];

export default function Work() {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="work section" id="work">
      <span className="section__subtitle">My Portfolio</span>
      <h2 className="section__title">Recent Works</h2>

      <div className="work__filters">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`work__item${filter === value ? " active-work" : ""}`}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="work__container container grid">
        {shown.map((project) => <WorkCard key={project.title} project={project} />)}
      </div>
    </section>
  );
}
