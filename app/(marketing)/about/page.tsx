import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Doshi and Yengo Digital",
};

export default function AboutPage() {
  return (
    <>
      <Header activePage="about" />

      <main>
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb"><a href="/">Home</a> / About</p>
            <span className="eyebrow">ABOUT</span>
            <h1>Two people, one goal: honest work that pays off</h1>
            <p>Placeholder company story below — to be replaced with the real founding story and team bios.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="notice">PLACEHOLDER COPY — REPLACE WITH REAL COMPANY STORY BEFORE LAUNCH</div>

            <div className="grid grid-2">
              <div>
                <span className="eyebrow eyebrow--soft">OUR STORY</span>
                <h2 className="section-title">How we got started</h2>
                <p style={{ marginTop: "16px", color: "var(--color-ink-soft)", fontSize: "1.02rem" }}>
                  Doshi and Yengo Digital started from a simple frustration: small businesses were being
                  quoted enterprise prices for websites and marketing that should have been straightforward.
                  Rishaan Doshi and Jackson Yengo teamed up to build an agency that does professional-grade
                  work — design, SEO, automation, and AI — without the markup or the jargon. [Placeholder
                  paragraph — replace with real founding story.]
                </p>
              </div>
              <div>
                <span className="eyebrow eyebrow--soft">OUR MISSION</span>
                <h2 className="section-title">What we&apos;re trying to do</h2>
                <p style={{ marginTop: "16px", color: "var(--color-ink-soft)", fontSize: "1.02rem" }}>
                  We want every contractor, restaurant owner, and local practice we work with to have the
                  same digital tools as a much larger competitor — at a price that makes sense for their
                  business. That means fair pricing, clear communication, and work that&apos;s built to actually
                  perform, not just look good in a proposal. [Placeholder paragraph — replace with real
                  mission statement.]
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">HOW WE WORK</span>
              <h2 className="section-title">What you can expect from us</h2>
            </div>

            <div className="grid grid-3">
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h16v11H8l-4 4V5z" />
                  </svg>
                </span>
                <span className="spec-num">01</span>
                <h3>Direct Communication</h3>
                <p>You talk to the people actually doing the work — no account manager relay.</p>
              </div>
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v10M9.5 9.5c0-1.4 1.1-2.2 2.5-2.2s2.5.8 2.5 2c0 1.6-1.6 2-2.5 2.4-1.2.5-2.5 1-2.5 2.6 0 1.2 1.1 2 2.5 2s2.5-.8 2.5-2.2" />
                  </svg>
                </span>
                <span className="spec-num">02</span>
                <h3>Fixed, Fair Pricing</h3>
                <p>You know the cost before work begins. No surprise invoices.</p>
              </div>
              <div className="value-card">
                <span className="card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
                  </svg>
                </span>
                <span className="spec-num">03</span>
                <h3>Built to Last</h3>
                <p>We build systems you can keep running long after launch, not one-off gimmicks.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container">
            <h2>Want to work with us?</h2>
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
