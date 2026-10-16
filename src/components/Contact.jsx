import { useState } from "react";

const EMAIL = "omarabderahmane325@gmail.com";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setStatus("Sending...");
    try {
      // FormSubmit relays the message to EMAIL (first use needs a one-time activation email)
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message);
      form.reset();
      setStatus("Message sent, thank you!");
    } catch {
      // Relay down or not activated yet: fall back to the visitor's mail app
      const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} <${data.get("email")}>`);
      setStatus("Could not send directly, opening your email app instead...");
      location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="contact section" id="contact">
      <span className="section__subtitle">Get in touch</span>
      <h2 className="section__title">Contact Me</h2>

      <div className="contact__container container grid">
        <div className="contact__content">
          <h3 className="contact__title contact__title-info">Talk to me</h3>

          <div className="contact__info">
            <div className="contact__card">
              <i className="bx bx-mail-send contact__card-icon"></i>
              <h3 className="contact__card-title">Email</h3>
              <span className="contact__card-data">{EMAIL}</span>
              <a href={`mailto:${EMAIL}`} className="contact__button">
                Write Me <i className="bx bx-right-arrow contact__button-icon"></i>
              </a>
            </div>

            <div className="contact__card">
              <i className="bx bxl-whatsapp contact__card-icon"></i>
              <h3 className="contact__card-title">WhatsApp</h3>
              <span className="contact__card-data">+213 553 36 75 37</span>
              <a href="https://wa.me/213553367537?text=Hey%20Omar!" target="_blank" rel="noopener noreferrer" className="contact__button">
                Write Me <i className="bx bx-right-arrow contact__button-icon"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contact__content">
          <h3 className="contact__title contact__title-form">Write Me your Message</h3>

          <form className="contact__form" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" defaultValue="New message from your portfolio" />
            <input type="hidden" name="_captcha" defaultValue="false" />
            <input type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

            <div className="contact__form-div">
              <label htmlFor="contact-name" className="contact__form-tag">Name</label>
              <input type="text" id="contact-name" name="name" autoComplete="name" required placeholder="Enter name" className="contact__form-input" />
            </div>

            <div className="contact__form-div">
              <label htmlFor="contact-email" className="contact__form-tag">Mail</label>
              <input type="email" id="contact-email" name="email" autoComplete="email" required placeholder="Enter email" className="contact__form-input" />
            </div>

            <div className="contact__form-div contact__form-area">
              <label htmlFor="contact-message" className="contact__form-tag">Message</label>
              <textarea name="message" id="contact-message" required cols="30" rows="10" placeholder="Write your Message" className="contact__form-input"></textarea>
            </div>

            <button className="button" disabled={sending}>Send Message</button>

            <p className="contact__form-status" role="status" aria-live="polite">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
