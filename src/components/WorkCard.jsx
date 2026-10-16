import { useState } from "react";
import Modal from "./Modal.jsx";
import CardButton from "./CardButton.jsx";

export default function WorkCard({ project }) {
  const [open, setOpen] = useState(false);
  const { title, image, demo, github, description, features, tags } = project;

  return (
    <div className="work__card">
      <img src={image} alt={`${title} screenshot`} className="work__img" loading="lazy" decoding="async" />

      <h3 className="work__title">{title}</h3>

      <div className="work__actions">
        <CardButton label="Details" icon="bx-right-arrow" onClick={() => setOpen(true)} ariaLabel={`Details of ${title}`} />
        <CardButton label="Demo" icon="bx-link-external" href={demo} ariaLabel={`Live demo of ${title} (opens in new tab)`} />
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={title} description={description} items={features}>
        {tags.length > 0 && (
          <ul className="project__tags">
            {tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="button project__link">
            View on GitHub <i className="bx bxl-github"></i>
          </a>
        )}
      </Modal>
    </div>
  );
}
