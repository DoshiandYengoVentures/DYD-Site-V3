import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Doshi and Yengo Digital",
  description: "Get a free, no-pressure quote from Doshi and Yengo Digital.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>;
}) {
  const { submitted } = await searchParams;

  return (
    <>
      <Header activePage="contact" />

      <main>
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb"><a href="/">Home</a> / Contact</p>
            <span className="eyebrow">CONTACT</span>
            <h1>Get a free quote</h1>
            <p>Tell us a bit about your business and what you need — we&apos;ll reply with next steps, no pressure and no long contracts.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {submitted === "true" && (
              <div className="alert-success" role="status">
                Thanks — your message has been sent. We&apos;ll be in touch shortly.
              </div>
            )}

            <div className="contact-layout">
              <div>
                <span className="eyebrow">PROJECT INQUIRY</span>
                <h2 className="section-title" style={{ marginBottom: "24px" }}>Tell us about your project</h2>
                <ContactForm />
              </div>

              <div>
                <span className="eyebrow eyebrow--soft">CONTACT INFO</span>

                <div className="contact-info-item">
                  <div className="mono-label">Email</div>
                  <a href="mailto:doshiandyengoventures@gmail.com">doshiandyengoventures@gmail.com</a>
                </div>
                <div className="contact-info-item">
                  <div className="mono-label">Phone</div>
                  <a href="tel:+14254770391">(425) 477-0391</a>
                </div>
                <div className="contact-info-item">
                  <div className="mono-label">Location</div>
                  <span>Sammamish, Washington</span>
                </div>
                <div className="contact-info-item">
                  <div className="mono-label">Response Time</div>
                  <span>Within 1 business day</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
