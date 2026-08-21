import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Website Design — Doshi and Yengo Digital",
  description: "Custom, mobile-first website design built to load fast, rank well, and convert visitors into customers.",
};

export default function WebsiteDesignPage() {
  return (
    <ServicePage
      activePage="website-design"
      breadcrumbLabel="Website Design"
      eyebrow="WEBSITE DESIGN"
      h1="Websites built to load fast and convert"
      intro="Custom, mobile-first design — no drag-and-drop templates, no bloated page builders. Every site is hand-built around your business and structured to rank in search from day one."
      includedHeading="Every website build includes"
      included={[
        { title: "Custom Responsive Design", description: "A layout designed around your brand and content — not a reused template." },
        { title: "Mobile-First Layout", description: "Built and tested for phones first, since most of your visitors will arrive on one." },
        { title: "On-Page SEO Foundations", description: "Proper headings, meta tags, and page structure so search engines can read your site." },
        { title: "Contact & Lead Forms", description: "Forms that route directly to your inbox or CRM, ready to capture leads on day one." },
        { title: "Fast Load Times", description: "Optimized images and clean code so pages load quickly on any connection." },
        { title: "Basic Analytics Setup", description: "Traffic tracking configured at launch, so you can see what's working from day one." },
      ]}
      processHeading="How a website build runs"
      process={[
        { title: "Discovery & Content Gathering", description: "We collect your existing content, branding, and goals for the site." },
        { title: "Wireframe & Sitemap", description: "We map out every page and how visitors move through the site." },
        { title: "Visual Design", description: "We design the look and feel, matched to your brand." },
        { title: "Development & Testing", description: "We build the live site and test it across devices and browsers." },
        { title: "Launch & Handoff", description: "We publish the site and walk you through how to manage it going forward." },
      ]}
      finalCtaHeading="Ready to start your website?"
    />
  );
}
