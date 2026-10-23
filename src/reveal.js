// Section titles get their annotation box drawn the first time they scroll
// into view. Content is never hidden: only the box (a pseudo-element) animates.
export function markSeen() {
  const titles = document.querySelectorAll(".section__title");
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-seen");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -15% 0px" }
  );
  titles.forEach((t) => io.observe(t));
  return () => io.disconnect();
}
