import { useState } from "react";
import { EMAIL, GITHUB, LINKEDIN, PHONE } from "../data/links.js";

const CHANNELS = [
  { icon: "bx-envelope", label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: "bxl-linkedin-square", label: "LinkedIn", value: "omar-haouache", href: LINKEDIN, external: true },
  { icon: "bxl-github", label: "GitHub", value: "HaouacheOmar", href: GITHUB, external: true },
  { icon: "bxl-whatsapp", label: "WhatsApp", value: PHONE, href: "https://wa.me/213553367537?text=Hello%20Omar", external: true },
];

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
    <section className="contact section container" id="contact">
      <div className="contact__intro">
        <h2 className="section__title">Let's talk</h2>
        <p className="section__lede">
          Hiring for a software engineer or a computer vision engineer? Send a message, or reach me directly.
        </p>

        <ul className="contact__channels">
          {CHANNELS.map(({ icon, label, value, href, external }) => (
            <li key={label}>
              <a href={href} className="contact__channel" {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                <i className={`bx ${icon}`} aria-hidden="true"></i>
                <span className="contact__label">{label}</span>
                <span className="contact__value">{value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <form className="contact__form" onSubmit={handleSubmit}>
        <input type="hidden" name="_subject" defaultValue="New message from your portfolio" />
        <input type="hidden" name="_captcha" defaultValue="false" />
        <input type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ display: "none" }} />

        <div className="field">
          <label htmlFor="contact-name">Name</label>
          <input type="text" id="contact-name" name="name" autoComplete="name" required placeholder="Your name" />
        </div>

        <div className="field">
          <label htmlFor="contact-email">Email</label>
          <input type="email" id="contact-email" name="email" autoComplete="email" required placeholder="you@company.com" />
        </div>

        <div className="field">
          <label htmlFor="contact-message">Message</label>
          <textarea name="message" id="contact-message" required rows="6" placeholder="The role, the team, and how to reach you"></textarea>
        </div>

        <button className="button button--primary" disabled={sending}>
          {sending ? "Sending..." : "Send message"}
        </button>

        <p className="contact__status" role="status" aria-live="polite">{status}</p>
      </form>
    </section>
  );
}
