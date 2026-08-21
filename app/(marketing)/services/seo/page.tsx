import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "SEO — Doshi and Yengo Digital",
  description: "Local and technical SEO that helps you rank for the searches that actually bring customers.",
};

export default function SeoPage() {
  return (
    <ServicePage
      activePage="seo"
      breadcrumbLabel="SEO"
      eyebrow="SEO"
      h1="Rank for the searches that bring customers in"
      intro="SEO isn't a trick — it's making sure search engines and customers can actually find, trust, and understand your business. We focus on the fundamentals that move rankings and revenue."
      includedHeading="What our SEO work covers"
      included={[
        { title: "Keyword & Competitor Research", description: "We find out exactly what your customers search for and how competitors currently rank." },
        { title: "On-Page Optimization", description: "Titles, headings, and content structured around the terms that matter." },
        { title: "Local Listings & Google Business Profile", description: "Accurate, optimized listings so you show up in local map results." },
        { title: "Technical SEO Audit", description: "We fix the behind-the-scenes issues — speed, indexing, broken links — that hold rankings back." },
        { title: "Content Strategy", description: "A plan for the pages and posts that will earn long-term organic traffic." },
        { title: "Monthly Reporting", description: "Plain-language reports on rankings, traffic, and what we're doing next." },
      ]}
      processHeading="How an SEO engagement runs"
      process={[
        { title: "Technical & Competitive Audit", description: "We assess your current site and where competitors are beating you." },
        { title: "Keyword Strategy", description: "We prioritize the search terms with the best mix of volume and winnability." },
        { title: "On-Page & Technical Fixes", description: "We implement the structural and content changes identified in the audit." },
        { title: "Content & Local SEO Build-Out", description: "We publish targeted content and strengthen your local listings." },
        { title: "Monitor & Report", description: "We track rankings and traffic monthly and adjust the strategy as needed." },
      ]}
      finalCtaHeading="Ready to start ranking?"
    />
  );
}
