// Recent Works: one object per project, shown in this order.
//
//   title       card title and dialog heading (must be unique)
//   category    "intern" | "sidework" (see FILTERS in components/Work.jsx)
//   image       file in public/assets/img/
//   demo        live URL, or "" to show the Demo button as "coming soon"
//   github      repository URL, or "" to hide the GitHub button
//   description first paragraph of the dialog
//   features    dialog bullet points: { label, text } or a plain string
//   tags        technologies

export default [
  {
    title: "Smart Parking",
    category: "intern",
    image: "/assets/img/parking.jpeg",
    demo: "",
    github: "https://github.com/RyanRouchiche/SMART_PARKING",
    description:
      "A web platform that monitors a parking lot in real time. Camera feeds are analysed by a computer-vision model, and the results are shown on a web dashboard, with a module for an LCD display.",
    features: [
      { label: "Computer vision", text: "image processing on camera feeds with TensorFlow/Keras and OpenCV." },
      { label: "Real time", text: "Django Channels, Daphne and Redis stream updates over WebSockets." },
      { label: "Backend", text: "REST API with JWT authentication on PostgreSQL, user accounts and a management dashboard." },
    ],
    tags: ["Python", "Django", "TensorFlow", "OpenCV", "Redis", "PostgreSQL"],
  },
  {
    title: "Restaurant Management System",
    category: "sidework",
    image: "/assets/img/Resto.png",
    demo: "https://resto-ruby-nine.vercel.app",
    github: "https://github.com/HaouacheOmar/RESTO",
    description: "One shared, live platform runs a restaurant's whole evening.",
    features: [
      "Nine roles each get their own space: client, reservation desk, parking attendant, waiter, cashier, chef, driver, stock keeper and manager.",
      "When a client books a table, the parking attendant, front desk, floor plan and till update instantly over WebSockets.",
      "Waiters send orders straight to the till, cashiers print 80 mm receipts.",
      "Ingredient running out removes the dishes that use it from the menu, and the manager follows revenue and ratings on a live dashboard.",
    ],
    tags: ["Python", "Django", "React", "Redis", "PostgreSQL"],
  },
  {
    title: "Image Reshape",
    category: "sidework",
    image: "/assets/img/ImageReshape.png",
    demo: "https://image-reshape.vercel.app",
    github: "https://github.com/HaouacheOmar/ImageReshape",
    description: "A web application for reshaping and editing images with a modern UI and responsive design.",
    features: [
      { label: "Reshape image", text: "OpenCV for image processing." },
      { label: "Backend", text: "Django." },
      { label: "Frontend", text: "React." },
    ],
    tags: ["Python", "Django", "React", "OpenCV"],
  },
  {
    title: "E-commerce Platform",
    category: "sidework",
    image: "/assets/img/eshop.png",
    demo: "https://eshop-dz.vercel.app",
    github: "https://github.com/HaouacheOmar/ECOMM",
    description:
      "Full-stack e-commerce platform with live order tracking, a shared support-chat desk and a real-time admin dashboard.",
    features: [
      { label: "Support chat", text: "Django Channels, Daphne, Celery, Redux Toolkit and Redis stream updates over WebSockets." },
      { label: "Backend", text: "REST API with JWT authentication on PostgreSQL, user accounts and a management dashboard." },
    ],
    tags: ["Python", "Django", "React", "Redux Toolkit", "Redis", "PostgreSQL"],
  },
  {
    title: "Agenda",
    category: "sidework",
    image: "/assets/img/agenda.jpeg",
    demo: "",
    github: "https://github.com/HaouacheOmar/agenda",
    description: "A calendar and events manager. Users sign in, create events and organise them by category.",
    features: [
      { label: "Backend", text: "Django REST Framework API split into authentication, category and event modules." },
      { label: "Interface", text: "a separate UI project that talks to the API." },
    ],
    tags: ["Python", "Django", "REST Framework"],
  },
  {
    title: "Family Tree",
    category: "sidework",
    image: "/assets/img/familyTree.jpeg",
    demo: "",
    github: "https://github.com/HaouacheOmar/FamilyTree",
    description:
      "An app to manage and visualise family relationships: add family members and see how they connect in an interactive tree.",
    features: [
      { label: "Visualisation", text: "the tree is drawn interactively with D3 and react-d3-tree." },
      { label: "Family data", text: "relatives and their relationships, with photo uploads." },
      { label: "Birthdays", text: "a command lists today's birthdays, ready to plug into notifications." },
      { label: "Delivery", text: "Django REST API with a React/Vite front end, packaged as a Windows desktop app with Electron." },
    ],
    tags: ["Python", "Django", "REST Framework", "React", "D3", "Electron", "SQLite"],
  },
  {
    title: "HR Management BFOPS",
    category: "sidework",
    image: "/assets/img/hrpic.jpeg",
    demo: "",
    github: "https://github.com/HaouacheOmar/bf-ops",
    description:
      "A personnel and HR management system built around units, ranks and yearly quotas. It covers the administrator's daily work, from setting up the organisation to tracking every staff movement.",
    features: [
      { label: "Organisation", text: "companies, units, ranks, positions and yearly quotas." },
      { label: "Personnel", text: "staff records, assignments, transfers with history and suggestions, gain and loss records." },
      { label: "Statistics", text: "charts per job, unit and company, with spreadsheet (xlsx) support." },
      { label: "Delivery", text: "admin and viewer roles with JWT login, an Arabic user guide, and one docker compose to run it all." },
    ],
    tags: ["Django", "REST Framework", "PostgreSQL", "React", "TypeScript", "Material UI", "Docker"],
  },
  {
    title: "Desktop App Welfare Management",
    category: "intern",
    image: "/assets/img/walfare.jpeg",
    demo: "",
    github: "",
    description: "A desktop application for managing welfare files and their follow-up, built during an internship.",
    features: [],
    tags: [],
  },
  {
    title: "Web App Smart Access",
    category: "sidework",
    image: "/assets/img/access.jpeg",
    demo: "",
    github: "https://github.com/HaouacheOmar/FRSYS",
    description:
      "A face-recognition system for smart access and surveillance, deployed across several PCs. Surveillance posts show live camera feeds, while a central administration post hosts the API, the database and the recognition model.",
    features: [
      { label: "Recognition", text: "DeepFace behind a dedicated FastAPI model server." },
      { label: "Backend", text: "Django API on PostgreSQL, with live updates over WebSockets." },
      { label: "Clients", text: "React app for each surveillance post, one-click startup scripts, user manuals in English and Arabic." },
    ],
    tags: ["Python", "Django", "FastAPI", "DeepFace", "React", "PostgreSQL", "Docker"],
  },
];
