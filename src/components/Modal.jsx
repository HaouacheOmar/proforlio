import { useEffect, useEffectEvent, useId, useRef } from "react";
import { createPortal } from "react-dom";

// Dialog shared by service cards and project cards. Always mounted so the CSS
// fade runs; portaled to <body> because ScrollReveal's transform on a card
// would otherwise trap position: fixed inside it.
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
      className={`services__modal${open ? " active-modal" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="services__modal-content">
        <button ref={closeRef} type="button" className="services__modal-close" aria-label="Close" onClick={onClose}>
          <i className="bx bx-x"></i>
        </button>

        <h3 className="services__modal-title" id={titleId}>{title}</h3>
        {description && <p className="services__modal-description">{description}</p>}

        {items.length > 0 && (
          <ul className="services__modal-list">
            {items.map((item) => {
              const { label, text } = typeof item === "string" ? { text: item } : item;
              return (
                <li className="services__modal-item" key={text}>
                  <i className="bx bx-check-circle"></i>
                  <p className="services__modal-info">
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
