import type { Metadata } from "next";
import DashboardPlaceholder from "@/components/dashboard/DashboardPlaceholder";

export const metadata: Metadata = { title: "My Website — Doshi and Yengo Digital" };

export default function WebsitePlaceholderPage() {
  return (
    <DashboardPlaceholder
      title="My Website"
      description="This is where you'll manage your website content, pages, and site settings."
    />
  );
}
