import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Doshi and Yengo Digital — Web Design, SEO, AI & Automation",
};

export default function HomePage() {
  return (
    <>
      <Header activePage="home" />

      <main>
        {/* FIG. 01 — HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <span className="eyebrow">DIGITAL AGENCY</span>
              <h1>They say quality doesn&apos;t come cheap. We prove otherwise.</h1>
              <p className="hero-sub">
                Doshi and Yengo Digital designs websites, builds SEO that actually ranks,
                automates the busywork eating your week, and ships practical AI tools —
                all under one roof, at a price small and local businesses can plan around.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary" href="/contact">Get a Free Quote</a>
                <a className="btn btn-outline" href="/portfolio">View Our Work</a>
              </div>
              <p className="trust-line">NO PRESSURE — NO LONG CONTRACTS — FREE CONSULTATION</p>
            </div>
          </div>
        </section>

        {/* MARQUEE — TARGET INDUSTRIES */}
        <div className="marquee-strip" aria-label="Industries we work with">
          <div className="marquee-track">
            <span>Contractors</span>
            <span>Restaurants</span>
            <span>Real Estate</span>
            <span>Medical Practices</span>
            <span>Salons</span>
            <span>Fitness</span>
            <span>Retail</span>
            <span>Professional Services</span>
            <span>Contractors</span>
            <span>Restaurants</span>
            <span>Real Estate</span>
            <span>Medical Practices</span>
            <span>Salons</span>
            <span>Fitness</span>
            <span>Retail</span>
            <span>Professional Services</span>
          </div>
        </div>

        {/* FIG. 02 — SERVICES */}
        <section className="section section-alt" id="services">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">SERVICES</span>
              <h2 className="section-title">What we build</h2>
              <p>Four disciplines, one team — pick one or combine them into a single build.</p>
            </div>

            <div className="grid grid-4">
              <article className="card card--service">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18" />
                  </svg>
                </span>
                <span className="card-index">01</span>
                <span className="card-tag">RESPONSIVE / SEO-READY</span>
                <h3>Website Design</h3>
                <p>Fast, mobile-first websites built to convert visitors into calls, bookings, and orders.</p>
                <a className="card-link" href="/services/website-design">View service →</a>
              </article>

              <article className="card card--service">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="12" cy="18" r="2.2" />
                    <path d="M8 7.4 11 16M16 7.4 13 16M8.2 6h7.6" />
                  </svg>
                </span>
                <span className="card-index">02</span>
                <span className="card-tag">WORKFLOWS / INTEGRATIONS</span>
                <h3>Business Automation</h3>
                <p>We connect your forms, inbox, scheduling, and invoicing so less falls through the cracks.</p>
                <a className="card-link" href="/services/business-automation">View service →</a>
              </article>

              <article className="card card--service">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
                  </svg>
                </span>
                <span className="card-index">03</span>
                <span className="card-tag">CHATBOTS / TOOLING</span>
                <h3>AI Solutions</h3>
                <p>Practical AI — booking assistants, review responders, and internal tools that save real hours.</p>
                <a className="card-link" href="/services/ai-solutions">View service →</a>
              </article>

              <article className="card card--service">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="10" r="6" /><path d="M14.5 14.5 20 20" /><path d="M7 11l2-2 2 2 3-4" />
                  </svg>
                </span>
                <span className="card-index">04</span>
                <span className="card-tag">LOCAL / TECHNICAL SEO</span>
                <h3>SEO</h3>
                <p>Rank for the searches that actually bring customers through your door.</p>
                <a className="card-link" href="/services/seo">View service →</a>
              </article>
            </div>
          </div>
        </section>

        {/* FIG. 03 — WHY CHOOSE US */}
        <section className="section section-dark" id="why-us">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">WHY CHOOSE US</span>
              <h2 className="section-title">Built for small business budgets</h2>
            </div>

            <div className="grid grid-3">
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5c0-1.4 1.1-2.2 2.5-2.2s2.5.8 2.5 2c0 1.6-1.6 2-2.5 2.4-1.2.5-2.5 1-2.5 2.6 0 1.2 1.1 2 2.5 2s2.5-.8 2.5-2.2" />
                  </svg>
                </span>
                <span className="spec-num">01</span>
                <h3>Affordable Pricing</h3>
                <p>Straightforward quotes with no hidden fees — priced for local businesses, not enterprise budgets.</p>
              </div>
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l2.2 1.3 2.6-.2 1 2.4 2.4 1-.2 2.6L21.3 12l-1.3 2.2.2 2.6-2.4 1-1 2.4-2.6-.2L12 21l-2.2-1.3-2.6.2-1-2.4-2.4-1 .2-2.6L2.7 12l1.3-2.2-.2-2.6 2.4-1 1-2.4 2.6.2z" /><path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <span className="spec-num">02</span>
                <h3>Professional Quality</h3>
                <p>Agency-grade design and code, without the agency-sized invoice.</p>
              </div>
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8" /><path d="M12 13V9" /><path d="M9 2h6" />
                  </svg>
                </span>
                <span className="spec-num">03</span>
                <h3>Fast Turnaround</h3>
                <p>Most website builds launch in weeks, not months.</p>
              </div>
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="10" r="6.5" /><path d="M15 15l5.5 5.5" />
                  </svg>
                </span>
                <span className="spec-num">04</span>
                <h3>SEO Focused</h3>
                <p>Every build is structured to rank, not just to look good.</p>
              </div>
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h10M4 12h16M4 18h7" /><circle cx="16" cy="6" r="2" /><circle cx="9" cy="18" r="2" />
                  </svg>
                </span>
                <span className="spec-num">05</span>
                <h3>Custom Solutions</h3>
                <p>No cookie-cutter templates — every site and system is built around how you actually work.</p>
              </div>
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="M5.5 5.5l3.3 3.3M18.5 5.5l-3.3 3.3M5.5 18.5l3.3-3.3M18.5 18.5l-3.3-3.3" />
                  </svg>
                </span>
                <span className="spec-num">06</span>
                <h3>Ongoing Support</h3>
                <p>We stay reachable after launch for edits, questions, and small fixes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FIG. 04 — PROCESS */}
        <section className="section section-alt" id="process">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">PROCESS</span>
              <h2 className="section-title">How a project runs</h2>
            </div>

            <div className="grid grid-3">
              <div className="process-step">
                <span className="step-frac">01 / 06</span>
                <h3>Free Consultation</h3>
                <p>We talk through your business, goals, and budget — no obligation.</p>
              </div>
              <div className="process-step">
                <span className="step-frac">02 / 06</span>
                <h3>Strategy</h3>
                <p>We map the scope, timeline, and the right mix of services for your goals.</p>
              </div>
              <div className="process-step">
                <span className="step-frac">03 / 06</span>
                <h3>Design &amp; Development</h3>
                <p>We build in the open, with regular check-ins as the work takes shape.</p>
              </div>
              <div className="process-step">
                <span className="step-frac">04 / 06</span>
                <h3>Review &amp; Revisions</h3>
                <p>You review the build and we refine it until it&apos;s right.</p>
              </div>
              <div className="process-step">
                <span className="step-frac">05 / 06</span>
                <h3>Launch</h3>
                <p>We handle the technical rollout so launch day is uneventful.</p>
              </div>
              <div className="process-step">
                <span className="step-frac">06 / 06</span>
                <h3>Continued Support</h3>
                <p>We stay on for edits, monitoring, and the next phase of growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FIG. 05 — SELECTED WORK */}
        <section className="section section-dark" id="work">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">SELECTED WORK</span>
              <h2 className="section-title">Recent projects</h2>
              <p>Example/placeholder projects shown for illustration — final portfolio pieces will replace these.</p>
            </div>

            <div className="grid grid-3">
              <article className="card">
                <span className="card-tag">WEBSITE DESIGN</span>
                <h3>Harbor &amp; Co. Contracting</h3>
                <p>A quote-request focused rebuild for a residential contracting company. Example project — placeholder content.</p>
                <span className="mono-label">Website Design, SEO</span>
              </article>

              <article className="card">
                <span className="card-tag">AUTOMATION</span>
                <h3>Riverstone Family Dental</h3>
                <p>Automated intake forms and appointment reminders for a multi-provider dental practice. Example project — placeholder content.</p>
                <span className="mono-label">Business Automation, Website Design</span>
              </article>

              <article className="card">
                <span className="card-tag">AI SOLUTIONS</span>
                <h3>Basin Street Kitchen</h3>
                <p>An AI reservation and FAQ assistant embedded in a restaurant&apos;s existing site. Example project — placeholder content.</p>
                <span className="mono-label">AI Solutions, Website Design</span>
              </article>
            </div>

            <div className="cta-row" style={{ marginTop: "36px" }}>
              <a className="btn btn-outline" href="/portfolio">View full portfolio →</a>
            </div>
          </div>
        </section>

        {/* FIG. 06 — TESTIMONIALS */}
        <section className="section section-alt" id="testimonials">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">TESTIMONIALS</span>
              <h2 className="section-title">What clients say</h2>
              <p>Placeholder testimonials — to be replaced with real client quotes.</p>
            </div>

            <div className="grid grid-3">
              <div className="testimonial">
                <blockquote>They actually explained what they were doing instead of just billing hours. Our new site paid for itself in the first month.</blockquote>
                <div className="testimonial-attr">[CLIENT NAME] — [BUSINESS NAME]</div>
              </div>
              <div className="testimonial">
                <blockquote>We were drowning in manual scheduling. The automation they set up gave us back hours every week.</blockquote>
                <div className="testimonial-attr">[CLIENT NAME] — [BUSINESS NAME]</div>
              </div>
              <div className="testimonial">
                <blockquote>Fast, honest, and priced fairly. We finally show up on the first page for the searches that matter.</blockquote>
                <div className="testimonial-attr">[CLIENT NAME] — [BUSINESS NAME]</div>
              </div>
            </div>
          </div>
        </section>

        {/* FIG. 07 — FAQ */}
        <section className="section section-dark" id="faq">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">FAQ</span>
              <h2 className="section-title">Common questions</h2>
            </div>

            <div className="accordion">
              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false" aria-controls="faq-1" id="faq-1-trigger">
                  <span>How much does a project cost?</span>
                  <span className="accordion-icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion-panel" id="faq-1" role="region" aria-labelledby="faq-1-trigger">
                  <p>It depends on scope — a simple site costs less than a site plus automation and AI tooling. We give you a fixed quote after a free consultation, so you know the full cost before any work begins. No hourly surprises.</p>
                </div>
              </div>

              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false" aria-controls="faq-2" id="faq-2-trigger">
                  <span>What&apos;s the typical timeline?</span>
                  <span className="accordion-icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion-panel" id="faq-2" role="region" aria-labelledby="faq-2-trigger">
                  <p>Most standard websites launch in 2-4 weeks from kickoff. Automation and AI projects vary more depending on how many systems they connect to, typically 2-6 weeks. We&apos;ll give you a specific timeline in your quote.</p>
                </div>
              </div>

              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false" aria-controls="faq-3" id="faq-3-trigger">
                  <span>What is SEO, really?</span>
                  <span className="accordion-icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion-panel" id="faq-3" role="region" aria-labelledby="faq-3-trigger">
                  <p>SEO (search engine optimization) is the practice of structuring your site&apos;s content, code, and reputation so search engines like Google understand it and rank it for the terms your customers actually search. That includes fast page speed, clear page titles, local business listings, and content that answers real questions — not keyword stuffing.</p>
                </div>
              </div>

              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false" aria-controls="faq-4" id="faq-4-trigger">
                  <span>Can automation actually save my business time?</span>
                  <span className="accordion-icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion-panel" id="faq-4" role="region" aria-labelledby="faq-4-trigger">
                  <p>Yes, for most of our clients it&apos;s the highest-ROI service we offer. Tasks like re-typing form submissions into a CRM, sending appointment reminders, or following up on quotes are repetitive and time-consuming — automating them typically saves several hours a week that can go back into serving customers.</p>
                </div>
              </div>

              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false" aria-controls="faq-5" id="faq-5-trigger">
                  <span>Do I own my website when it&apos;s done?</span>
                  <span className="accordion-icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion-panel" id="faq-5" role="region" aria-labelledby="faq-5-trigger">
                  <p>Yes. Once your project is paid in full, the website, its code, and its content belong to you outright. We don&apos;t lock clients into our own hosting or hold sites hostage — we&apos;re happy to hand off files or credentials if you ever want to move elsewhere.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FIG. 08 — FINAL CTA */}
        <section className="final-cta" id="cta">
          <div className="container">
            <span className="eyebrow">GET STARTED</span>
            <h2>Ready to build something better?</h2>
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
