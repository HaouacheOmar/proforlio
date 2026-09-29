/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader, { passive: true });

/*=============== MODALS (services + project details) ===============*/
// A button with data-modal="<id>" opens the .services__modal with that id
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll("[data-modal]"),
  modalClose = document.querySelectorAll(".services__modal-close");

let lastModalBtn = null;

function openModal(btn) {
  const modal = document.getElementById(btn.dataset.modal);
  lastModalBtn = btn;
  modal.classList.add("active-modal");
  modal.querySelector(".services__modal-close").focus();
}

function closeModal() {
  modalViews.forEach((mv) => mv.classList.remove("active-modal"));
  if (lastModalBtn) lastModalBtn.focus();
  lastModalBtn = null;
}

modalBtns.forEach((mb) => mb.addEventListener("click", () => openModal(mb)));
modalClose.forEach((mc) => mc.addEventListener("click", closeModal));
// Click on the dark backdrop (outside the content) closes
modalViews.forEach((mv) =>
  mv.addEventListener("click", (e) => {
    if (e.target === mv) closeModal();
  })
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lastModalBtn) closeModal();
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive, { passive: true });

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.parentElement.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== CONTACT FORM ===============*/
const CONTACT_EMAIL = "omarabderahmane325@gmail.com";
const contactForm = document.getElementById("contact-form"),
  contactStatus = document.getElementById("contact-status");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector("button");
  const data = new FormData(contactForm);
  btn.disabled = true;
  contactStatus.textContent = "Sending...";
  try {
    // FormSubmit relays the message to CONTACT_EMAIL (first use needs a one-time activation email)
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    const json = await res.json();
    if (!res.ok || String(json.success) !== "true") throw new Error(json.message);
    contactForm.reset();
    contactStatus.textContent = "Message sent, thank you!";
  } catch {
    // Relay down or not activated yet: fall back to the visitor's mail app
    const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} <${data.get("email")}>`);
    contactStatus.textContent = "Could not send directly, opening your email app instead...";
    location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  } finally {
    btn.disabled = false;
  }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: reduceMotion ? 0 : 2500,
  delay: reduceMotion ? 0 : 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, {
  delay: 100,
});

sr.reveal(`.home__social, .home__scroll`, {
  delay: 100,
  origin: "bottom",
});

sr.reveal(`.about__img`, {
  delay: 100,
  origin: "left",
  scale: 0.9,
  distance: "30px",
});

sr.reveal(`.about__data, .about__description, .about__button-contact`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.skills__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.services__title`, {
  delay: 100,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});

sr.reveal(`.work__card`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 100,
  scale: 0.9,
  origin: "left",
  distance: "30px",
});

sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.footer`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});
