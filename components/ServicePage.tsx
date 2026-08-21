import Header from "@/components/Header";
import Footer from "@/components/Footer";

export type ServiceItem = { title: string; description: string };

export default function ServicePage({
  activePage,
  breadcrumbLabel,
  eyebrow,
  h1,
  intro,
  includedHeading,
  included,
  processHeading,
  process,
  finalCtaHeading,
}: {
  activePage: string;
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  intro: string;
  includedHeading: string;
  included: ServiceItem[];
  processHeading: string;
  process: ServiceItem[];
  finalCtaHeading: string;
}) {
  return (
    <>
      <Header activePage={activePage} />

      <main>
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb">
              <a href="/">Home</a> / <a href="/#services">Services</a> / {breadcrumbLabel}
            </p>
            <span className="eyebrow">{eyebrow}</span>
            <h1>{h1}</h1>
            <p>{intro}</p>
            <div className="cta-row" style={{ marginTop: "28px" }}>
              <a className="btn btn-primary" href="/contact">Get a Free Quote</a>
            </div>
          </div>
        </section>

        <section className="section" id="included">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">WHAT&apos;S INCLUDED</span>
              <h2 className="section-title">{includedHeading}</h2>
            </div>

            <div className="included-grid">
              {included.map((item, i) => (
                <div className="included-item" key={item.title}>
                  <span className="spec-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="process">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">PROCESS</span>
              <h2 className="section-title">{processHeading}</h2>
            </div>

            <div className="spec-list">
              {process.map((item, i) => (
                <div className="spec-item" key={item.title}>
                  <span className="spec-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container">
            <h2>{finalCtaHeading}</h2>
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
