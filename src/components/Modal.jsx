import { useEffect, useEffectEvent, useId, useRef } from "react";
import { createPortal } from "react-dom";

// Project dialog. Always mounted so the CSS fade runs; portaled to <body>
// because the card's motion transform would otherwise trap position: fixed inside it.
export default function Modal({ open, onClose, title, description, items = [], children }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const close = useEffectEvent(onClose);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement;
    closeRef.current.focus();
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  return createPortal(
    <div
      className={`modal${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__content">
        <button ref={closeRef} type="button" className="modal__close" aria-label="Close" onClick={onClose}>
          <i className="bx bx-x" aria-hidden="true"></i>
        </button>

        <h3 className="modal__title" id={titleId}>{title}</h3>
        {description && <p className="modal__description">{description}</p>}

        {items.length > 0 && (
          <ul className="modal__list">
            {items.map((item) => {
              const { label, text } = typeof item === "string" ? { text: item } : item;
              return (
                <li className="modal__item" key={text}>
                  <i className="bx bx-check-square" aria-hidden="true"></i>
                  <p className="modal__info">
                    {label && <b>{label}:</b>} {text}
                  </p>
                </li>
              );
            })}
          </ul>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
}
