const SERVICE_PAGES = ["website-design", "business-automation", "ai-solutions", "seo"];

export default function Header({ activePage }: { activePage: string }) {
  const cls = (page: string) => (activePage === page ? "nav-link is-active" : "nav-link");

  return (
    <header className="site-header">
      <div className="container nav">
        <a className="logo" href="/" aria-label="Doshi and Yengo Digital — home">
          <span className="logo-mark" aria-hidden="true"></span>
          Doshi and Yengo Digital
        </a>

        <nav className="nav-links" aria-label="Primary">
          <a className={cls("home")} href="/">Home</a>

          <div className="nav-group">
            <a
              className={SERVICE_PAGES.includes(activePage) ? "nav-link is-active" : "nav-link"}
              href="/services/website-design"
              role="button"
              aria-haspopup="true"
            >
              Services
            </a>
            <div className="nav-submenu">
              <a href="/services/website-design">Website Design</a>
              <a href="/services/business-automation">Business Automation</a>
              <a href="/services/ai-solutions">AI Solutions</a>
              <a href="/services/seo">SEO</a>
            </div>
          </div>

          <a className={cls("portfolio")} href="/portfolio">Portfolio</a>
          <a className={cls("about")} href="/about">About</a>
          <a className={cls("contact")} href="/contact">Contact</a>
          <a className="nav-link" href="/login">Client Login</a>
        </nav>

        <div className="nav-right">
          <a className="btn btn-outline" href="/contact">Get a Free Quote</a>
          <button className="hamburger" type="button" aria-label="Toggle navigation menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
