// Text button with a trailing icon, as used on work and service cards.
// Renders a link when given `href` (opens in a new tab), a button when given
// `onClick`, and a dimmed "coming soon" label when given neither.
// `block` picks the BEM classes: block__button / block__icon.
export default function CardButton({ label, icon, href, onClick, ariaLabel, block = "work" }) {
  const className = `${block}__button`;
  const content = (
    <>
      {label} <i className={`bx ${icon} ${block}__icon`}></i>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </button>
    );
  }
  return (
    <span className={`${className} ${block}__button--soon`} title="Coming soon">
      {content}
    </span>
  );
}
