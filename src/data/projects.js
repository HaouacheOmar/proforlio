// Projects: one object per project, shown in this order. The position in this
// list is the project's frame address (#001, #002…), so append new projects
// at the end unless you mean to renumber.
//
//   title       card title and dialog heading (must be unique)
//   category    "intern" | "sidework" (shown as a label on the card)
//   classes     annotation classes used by the filter, see src/data/classes.js:
//               "vision" | "web_app" | "real_time" | "distributed"
//   image       real screenshot or frame in public/assets/img/, or "" for a drawn panel (never stock art)
//   boxes       optional annotations on the image: { x, y, w, h, label, class, below } in % of the card frame (16:10);
//               below: true puts the label under the box
//   flow        with no image: the architecture drawn in the panel, top to bottom
//   demo        live URL, or "" to show the Demo button as "coming soon"
//   github      repository URL, or "" to hide the GitHub button
//   description first paragraph of the dialog, also the card summary
//   features    dialog bullet points: { label, text } or a plain string
//   tags        technologies

export default [
  {
    title: "Who's This Animal",
    category: "sidework",
    classes: ["vision", "web_app"],
    image: "/assets/img/whos-this-animal.jpg",
    boxes: [{ x: 1.7, y: 27, w: 30.2, h: 26.6, label: "dog · golden_retriever · 83%", class: "vision", below: true }],
    demo: "",
    github: "https://github.com/HaouacheOmar/Who-s-this-animal",
    description:
      "Take a photo of a dog, cat or bird: the app identifies the breed or species and returns a care plan, feeding in grams per day, and the pet shops and vets nearby.",
    features: [
      { label: "Model", text: "EfficientNetV2-S fine-tuned with PyTorch and timm on 152 classes: 88.6% top-1, 98.3% top-5 on the test set." },
      { label: "Serving", text: "ONNX Runtime on CPU, 21 ms per photo, behind a gRPC service; OpenCV rejects blurry or dark photos." },
      { label: "Care plan", text: "a local LLM (Ollama) writes the notes; Leaflet and OpenStreetMap show shops and vets nearby." },
      { label: "Delivery", text: "Django REST API, React 19 + TypeScript front end, six services in Docker Compose." },
    ],
    tags: ["PyTorch", "ONNX Runtime", "OpenCV", "gRPC", "Django", "React", "TypeScript", "Docker"],
  },
  {
    title: "FRSYS Face Recognition",
    category: "sidework",
    classes: ["vision", "real_time", "distributed"],
    image: "",
    flow: ["IP camera · RTSP", "InsightFace · FastAPI", "Django · WebSockets", "React entrance posts"],
    demo: "",
    github: "https://github.com/HaouacheOmar/FRSYS",
    description:
      "Face-recognition access control across several PCs. Entrance posts show the live IP-camera stream; people coming back from an outing are recognised and their return is recorded, on time or late.",
    features: [
      { label: "Recognition", text: "InsightFace (buffalo_l) behind a dedicated FastAPI model server." },
      { label: "Backend", text: "Django API on PostgreSQL reads the RTSP camera and streams detections over WebSockets." },
      { label: "Clients", text: "React app for each post, French/English and Arabic (RTL), deployed with Docker and nginx." },
    ],
    tags: ["Python", "InsightFace", "FastAPI", "Django", "WebSockets", "PostgreSQL", "React", "Docker"],
  },
  {
    title: "Smart Parking",
    category: "intern",
    classes: ["vision", "real_time"],
    image: "/assets/img/smart-parking.jpg",
    boxes: [
      { x: 20.4, y: 21.8, w: 9.2, h: 23.7, label: "free · 193", class: "distributed" },
      { x: 64, y: 49.6, w: 7.4, h: 24.4, label: "occupied", class: "real_time" },
    ],
    demo: "",
    github: "https://github.com/RyanRouchiche/SMART_PARKING",
    description:
      "Master's internship at ICOSNET: a web platform that monitors a parking lot in real time. Camera feeds are analysed by a computer-vision model and shown on a dashboard, with a module for an LCD display.",
    features: [
      { label: "Computer vision", text: "image processing on camera feeds with TensorFlow/Keras and OpenCV." },
      { label: "Real time", text: "Django Channels, Daphne and Redis stream updates over WebSockets." },
      { label: "Backend", text: "REST API with JWT authentication on PostgreSQL, user accounts and a management dashboard." },
    ],
    tags: ["Python", "Django", "TensorFlow", "OpenCV", "Redis", "PostgreSQL"],
  },
  {
    title: "RESTO",
    category: "sidework",
    classes: ["web_app", "real_time", "distributed"],
    image: "/assets/img/Resto.png",
    demo: "https://resto-ruby-nine.vercel.app",
    github: "https://github.com/HaouacheOmar/RESTO",
    description: "A distributed restaurant management system: nine roles work on the same live state.",
    features: [
      "Client, reservation desk, parking attendant, waiter, cashier, chef, driver, stock keeper and manager each get their own space.",
      "A booking updates the parking, front desk, floor plan and till instantly over WebSockets authenticated with JWT.",
      "Business rules enforced in PostgreSQL with constraints and row locks; OpenAPI docs.",
      "GitHub Actions CI runs tests, schema validation and Docker builds.",
    ],
    tags: ["Django", "REST Framework", "Channels", "Redis", "PostgreSQL", "React", "TypeScript"],
  },
  {
    title: "E-Shop",
    category: "sidework",
    classes: ["web_app", "real_time"],
    image: "/assets/img/eshop.png",
    demo: "https://eshop-dz.vercel.app",
    github: "https://github.com/HaouacheOmar/ECOMM",
    description:
      "Full-stack e-commerce platform with live order tracking, a shared support-chat queue and a real-time admin dashboard.",
    features: [
      { label: "Real time", text: "Django Channels, Daphne and Redis push orders, chat and presence over WebSockets." },
      { label: "Jobs", text: "Celery sends emails, recomputes bestsellers and refreshes recommendations." },
      { label: "Quality", text: "pytest for REST and WebSocket tests, Playwright end-to-end, GitHub Actions CI." },
    ],
    tags: ["Django", "Celery", "Redis", "PostgreSQL", "React", "Redux Toolkit", "Playwright"],
  },
  {
    title: "Image Reshape",
    category: "sidework",
    classes: ["vision", "web_app"],
    image: "/assets/img/ImageReshape.png",
    demo: "https://image-reshape.vercel.app",
    github: "https://github.com/HaouacheOmar/ImageReshape",
    description: "Upload an image, then crop it, resize it or remove its background, all in the browser.",
    features: [
      { label: "Image processing", text: "OpenCV behind a Django REST API." },
      { label: "Frontend", text: "Next.js and TypeScript, animated with Motion." },
    ],
    tags: ["Python", "OpenCV", "Django", "Next.js", "TypeScript", "Docker"],
  },
  {
    title: "BFops HR Management",
    category: "sidework",
    classes: ["web_app"],
    image: "",
    flow: ["React · Material UI", "Django REST · JWT", "PostgreSQL"],
    demo: "",
    github: "https://github.com/HaouacheOmar/bf-ops",
    description:
      "A personnel and HR management system built around units, ranks and yearly quotas, from setting up the organisation to tracking every staff movement.",
    features: [
      { label: "Organisation", text: "companies, units, ranks, positions and yearly quotas." },
      { label: "Personnel", text: "staff records, assignments, transfers with history and suggestions, gain and loss records." },
      { label: "Statistics", text: "charts per job, unit and company, with spreadsheet (xlsx) support." },
      { label: "Delivery", text: "admin and viewer roles with JWT login, an Arabic user guide, one docker compose to run it all." },
    ],
    tags: ["Django", "REST Framework", "PostgreSQL", "React", "TypeScript", "Material UI", "Docker"],
  },
  {
    title: "Family Tree",
    category: "sidework",
    classes: ["web_app"],
    image: "/assets/img/family-tree.jpg",
    demo: "https://familytree-7d2.pages.dev",
    github: "https://github.com/HaouacheOmar/FamilyTree",
    description:
      "A family tree that speaks Arabic first (plus English and French): add relatives and watch the generations fill in, search by relation, and never miss a birthday.",
    features: [
      { label: "Tree", text: "generations drawn with D3 in 2D or three.js in 3D, with memorial marks and partner links." },
      { label: "Search", text: "by name or relation in Arabic, English or French: جدة finds the grandmother." },
      { label: "Data", text: "GEDCOM import and export, one-file backup and restore, duplicate detection and merge." },
      { label: "Delivery", text: "Django REST API with a React/Vite front end; Windows desktop app (Electron), Docker, or Cloudflare Pages + Render + Neon Postgres." },
    ],
    tags: ["Django", "REST Framework", "React", "D3", "Motion", "Electron", "Docker", "PostgreSQL"],
  },
  {
    title: "Agenda",
    category: "sidework",
    classes: ["web_app"],
    image: "",
    flow: ["Vue.js · TypeScript", "Django REST", "auth · categories · events"],
    demo: "https://agendaops.pages.dev",
    github: "https://github.com/HaouacheOmar/agenda",
    description: "A calendar and events manager. Users sign in, create events and organise them by category.",
    features: [
      { label: "Backend", text: "Django REST Framework API split into authentication, category and event modules." },
      { label: "Interface", text: "Vue.js and TypeScript client that talks to the API." },
    ],
    tags: ["Django", "REST Framework", "Vue.js", "TypeScript"],
  },
  {
    title: "Welfare Management Desktop App",
    category: "intern",
    classes: [],
    image: "",
    flow: ["UML · MERISE model", "desktop app", "welfare files"],
    demo: "",
    github: "",
    description:
      "Bachelor's internship at the Organisme des Œuvres Sociales: a desktop application for managing welfare files and their follow-up, modelled with UML and MERISE.",
    features: [],
    tags: [],
  },
];
