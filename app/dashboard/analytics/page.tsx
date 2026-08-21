import type { Metadata } from "next";
import DashboardPlaceholder from "@/components/dashboard/DashboardPlaceholder";

export const metadata: Metadata = { title: "Analytics — Doshi and Yengo Digital" };

export default function AnalyticsPlaceholderPage() {
  return (
    <DashboardPlaceholder
      title="Analytics"
      description="This is where you'll see traffic, ranking, and conversion analytics for your website."
    />
  );
}
