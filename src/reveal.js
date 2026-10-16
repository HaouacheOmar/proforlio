import ScrollReveal from "scrollreveal";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: reduceMotion ? 0 : 2500,
  delay: reduceMotion ? 0 : 400,
  reset: true,
});

const fromBottom = { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" };

// Only static elements: ScrollReveal loses track of nodes React remounts,
// so .work__card animates with a CSS keyframe instead (see styles.css).
export function revealSections() {
  // reset: false because the menu is position: fixed and ScrollReveal measures it
  // as if it scrolled with the page, so it would hide it once you scroll down
  sr.reveal(".nav__menu", { delay: 100, scale: 0.1, origin: "bottom", distance: "300px", reset: false });
  sr.reveal(".home__data");
  sr.reveal(".home__handle", { delay: 100 });
  sr.reveal(".home__social, .home__scroll", { delay: 100, origin: "bottom" });
  sr.reveal(".about__img", { delay: 100, origin: "left", scale: 0.9, distance: "30px" });
  sr.reveal(".about__data, .about__description, .about__button-contact", { delay: 100, scale: 0.9, origin: "right", distance: "30px" });
  sr.reveal(".skills__content", fromBottom);
  sr.reveal(".services__title", { delay: 100, scale: 0.9, origin: "top", distance: "30px" });
  sr.reveal(".contact__info, .contact__title-info", { delay: 100, scale: 0.9, origin: "left", distance: "30px" });
  sr.reveal(".contact__form, .contact__title-form", { delay: 100, scale: 0.9, origin: "right", distance: "30px" });
  sr.reveal(".footer", fromBottom);
}
