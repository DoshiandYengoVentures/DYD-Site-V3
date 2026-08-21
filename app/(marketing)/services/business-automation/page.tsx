import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Business Automation — Doshi and Yengo Digital",
  description: "We connect your forms, inbox, scheduling, and invoicing so less work falls on you.",
};

export default function BusinessAutomationPage() {
  return (
    <ServicePage
      activePage="business-automation"
      breadcrumbLabel="Business Automation"
      eyebrow="BUSINESS AUTOMATION"
      h1="Automate the busywork eating your week"
      intro="We connect the tools you already use — forms, email, scheduling, invoicing — so information moves on its own instead of being re-typed by hand."
      includedHeading="What we can automate"
      included={[
        { title: "Lead & Form Routing", description: "New form submissions land directly in your inbox, CRM, or team chat — instantly." },
        { title: "Appointment Reminders", description: "Automatic text or email reminders that cut down on no-shows." },
        { title: "CRM / Inbox Integration", description: "Your existing tools talk to each other instead of requiring manual copy-paste." },
        { title: "Invoice & Follow-Up Automation", description: "Invoices and payment follow-ups go out on schedule, without you tracking dates." },
        { title: "Review Request Automation", description: "Happy customers get a review request automatically after a job or visit is complete." },
        { title: "Custom Workflow Builds", description: "If it's repetitive and rule-based, we can most likely build a workflow for it." },
      ]}
      processHeading="How an automation build runs"
      process={[
        { title: "Map Your Current Workflow", description: "We walk through exactly how work moves through your business today." },
        { title: "Identify Time-Wasting Tasks", description: "We flag the repetitive steps that are the best candidates for automation." },
        { title: "Build & Connect Automations", description: "We build the workflows and connect them to your existing tools." },
        { title: "Test With Real Scenarios", description: "We run real examples through the system before it touches live customers." },
        { title: "Launch & Monitor", description: "We turn it on and monitor closely for the first few weeks." },
      ]}
      finalCtaHeading="Ready to automate the busywork?"
    />
  );
}
