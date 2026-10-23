import { useState } from "react";
import Modal from "./Modal.jsx";
import CardButton from "./CardButton.jsx";

export default function WorkCard({ project }) {
  const [open, setOpen] = useState(false);
  const { title, frame, category, classes, image, boxes = [], flow = [], demo, github, description, features, tags } = project;
  const lead = classes[0] ?? "none";

  return (
    <article className={`card card--${lead}`}>
      <div className="card__media">
        {image ? (
          <img src={image} alt={`${title} screenshot`} className="card__img" loading="lazy" decoding="async" />
        ) : (
          // No real screenshot yet: the architecture drawn instead of stock art
          <ol className="card__flow" aria-label={`${title} architecture`}>
            {flow.map((step) => <li key={step}>{step}</li>)}
          </ol>
        )}
        {boxes.map(({ x, y, w, h, label, class: cls, below }) => (
          <span
            key={label}
            className={`anno anno--${cls} card__box${below ? " card__box--below" : ""}`}
            style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
            aria-hidden="true"
          >
            <span className="anno__tag">{label}</span>
          </span>
        ))}
        <span className="card__frame" aria-hidden="true">{frame}{category === "intern" ? " · internship" : ""}</span>
      </div>

      <div className="card__body">
        <ul className="card__classes" aria-label="Classes">
          {classes.map((c) => <li key={c} className={`tag tag--${c}`}>{c}</li>)}
          {category === "intern" && <li className="tag">internship</li>}
        </ul>
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{description}</p>
        {tags.length > 0 && <p className="card__stack">{tags.slice(0, 5).join(" · ")}</p>}

        <div className="card__actions">
          {(features.length > 0 || tags.length > 0) && (
            <CardButton label="Details" icon="bx-right-arrow-alt" onClick={() => setOpen(true)} ariaLabel={`Details of ${title}`} />
          )}
          {github && <CardButton label="Code" icon="bxl-github" href={github} ariaLabel={`Source code of ${title} on GitHub (opens in new tab)`} />}
          <CardButton label="Demo" icon="bx-link-external" href={demo} ariaLabel={`Live demo of ${title} (opens in new tab)`} />
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={title} description={description} items={features}>
        {tags.length > 0 && (
          <ul className="modal__tags">
            {tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        <div className="modal__links">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="button button--primary">
              <i className="bx bxl-github" aria-hidden="true"></i> View code
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="button">
              <i className="bx bx-link-external" aria-hidden="true"></i> Live demo
            </a>
          )}
        </div>
      </Modal>
    </article>
  );
}
