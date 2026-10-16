import { useState } from "react";
import services from "../data/services.js";
import Modal from "./Modal.jsx";
import CardButton from "./CardButton.jsx";

function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="services__card">
      <h3 className="services__title">{service.title}</h3>

      <CardButton block="services" label="See More" icon="bx-right-arrow" onClick={() => setOpen(true)} />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={service.modalTitle}
        description={service.description}
        items={service.items}
      />
    </div>
  );
}

export default function Services() {
  return (
    <section className="services section">
      <span className="section__subtitle">My Services</span>
      <h2 className="section__title">What I Offer</h2>

      <div className="services__container container grid">
        {services.map((service) => <ServiceCard key={service.title} service={service} />)}
      </div>
    </section>
  );
}
