import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Portfolio — Doshi and Yengo Digital",
};

const PROJECTS = [
  { tag: "WEBSITE DESIGN", name: "Harbor & Co. Contracting", desc: "A quote-request focused rebuild for a residential contracting company, with a fast mobile-first layout.", services: "Website Design, SEO" },
  { tag: "AUTOMATION", name: "Riverstone Family Dental", desc: "Automated intake forms and appointment reminders for a multi-provider dental practice.", services: "Business Automation, Website Design" },
  { tag: "AI SOLUTIONS", name: "Basin Street Kitchen", desc: "An AI reservation and FAQ assistant embedded directly in the restaurant's existing site.", services: "AI Solutions, Website Design" },
  { tag: "SEO", name: "Coastline Realty Group", desc: "A technical SEO overhaul and local listings cleanup for a multi-agent real estate office.", services: "SEO, Website Design" },
  { tag: "WEBSITE DESIGN", name: "Northside Fitness Studio", desc: "A class-schedule-forward site redesign built to drive trial membership sign-ups.", services: "Website Design" },
  { tag: "AUTOMATION", name: "Evergreen Salon Collective", desc: "Automated booking confirmations and review requests across three salon locations.", services: "Business Automation, AI Solutions" },
];

export default function PortfolioPage() {
  return (
    <>
      <Header activePage="portfolio" />

      <main>
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb"><a href="/">Home</a> / Portfolio</p>
            <span className="eyebrow">PORTFOLIO</span>
            <h1>Selected &amp; example work</h1>
            <p>A mix of client work and representative example projects across our four core services.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="notice">EXAMPLE / DEMO CONTENT — SHOWN FOR ILLUSTRATION, NOT LIVE CLIENT LINKS</div>

            <div className="grid grid-3">
              {PROJECTS.map((project) => (
                <article className="card" key={project.name}>
                  <span className="card-tag">{project.tag}</span>
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                  <span className="mono-label">{project.services}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta section-dark">
          <div className="container">
            <h2>Have a project in mind?</h2>
            <div className="cta-row">
              <a className="btn btn-accent" href="/contact">Get a Free Quote</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
