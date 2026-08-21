import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "AI Solutions — Doshi and Yengo Digital",
  description: "Practical AI tools — booking assistants, review responders, and internal tools that save real hours.",
};

export default function AiSolutionsPage() {
  return (
    <ServicePage
      activePage="ai-solutions"
      breadcrumbLabel="AI Solutions"
      eyebrow="AI SOLUTIONS"
      h1="Practical AI, not hype"
      intro="We build AI tools around a specific, measurable problem — answering common questions, drafting review responses, or speeding up internal work — not AI for its own sake."
      includedHeading="AI tools we build"
      included={[
        { title: "AI Chat / Booking Assistant", description: "A site assistant that answers common questions and helps visitors book or inquire." },
        { title: "Review Response Drafting", description: "AI-drafted replies to customer reviews, ready for a quick human check before posting." },
        { title: "FAQ & Support Automation", description: "Common customer questions get answered instantly, day or night." },
        { title: "Internal Knowledge Tools", description: "Give your team a fast way to search policies, pricing, and procedures." },
        { title: "Content Drafting Assistants", description: "Tools that speed up writing social posts, emails, or listings in your voice." },
        { title: "Custom AI Integrations", description: "If you have a specific repetitive task, we'll scope whether AI is a good fit for it." },
      ]}
      processHeading="How an AI build runs"
      process={[
        { title: "Identify High-Value Use Case", description: "We find the task where AI will save the most real time or money." },
        { title: "Select the Right Tooling", description: "We choose the simplest tool that reliably does the job — not the flashiest." },
        { title: "Build & Train on Your Content", description: "We configure the tool using your business's actual information and tone." },
        { title: "Test for Accuracy & Tone", description: "We stress-test with real questions before it faces customers." },
        { title: "Launch & Refine", description: "We monitor early results and refine based on what people actually ask." },
      ]}
      finalCtaHeading="Ready to put AI to work?"
    />
  );
}
