export default function Home() {
  return (
    <section className="home section" id="home">
      <div className="home__container container grid">
        <div className="home__data">
          <span className="home__greeting">Hello, I'm</span>
          <h1 className="home__name">Omar</h1>
          <h3 className="home__education">Software Engineer & AI Integration</h3>

          <div className="home__button">
            <a download href="/assets/pdf/HAOUACHE_OMAR_ABDERRAHMANE.pdf" className="button button--ghost">
              Download CV
            </a>
            <a href="#about" className="button">About</a>
          </div>
        </div>

        <div className="home__handle">
          <img src="/assets/img/skills.jpeg" alt="Omar" className="home__img" width="800" height="496" decoding="async" />
        </div>

        <div className="home__social">
          <a href="#" target="_blank" rel="noopener noreferrer" className="home__social-link" aria-label="LinkedIn">
            <i className="bx bxl-linkedin"></i>
          </a>
          <a href="https://github.com/HaouacheOmar" target="_blank" rel="noopener noreferrer" className="home__social-link" aria-label="GitHub">
            <i className="bx bxl-github"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="home__social-link" aria-label="Dribbble">
            <i className="bx bxl-dribbble"></i>
          </a>
        </div>

        <a href="#about" className="home__scroll">
          <i className="bx bx-mouse home__scroll-icon"></i>
          <span className="home__scroll-name">Scroll Down</span>
        </a>
      </div>
    </section>
  );
}
