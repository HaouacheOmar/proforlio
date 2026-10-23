// Text button with a trailing icon, as used on project cards.
// Renders a link when given `href` (opens in a new tab), a button when given
// `onClick`, and a dimmed "coming soon" label when given neither.
export default function CardButton({ label, icon, href, onClick, ariaLabel }) {
  const content = (
    <>
      {label} <i className={`bx ${icon}`} aria-hidden="true"></i>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="card__button" aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" className="card__button" onClick={onClick} aria-label={ariaLabel}>
        {content}
      </button>
    );
  }
  return (
    <span className="card__button card__button--soon" title="Demo coming soon">
      {content}
    </span>
  );
}
