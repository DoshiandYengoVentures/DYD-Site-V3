import type { Metadata } from "next";
import DashboardPlaceholder from "@/components/dashboard/DashboardPlaceholder";

export const metadata: Metadata = { title: "Services — Doshi and Yengo Digital" };

export default function ServicesPlaceholderPage() {
  return (
    <DashboardPlaceholder
      title="Services"
      description="This is where you'll view and manage the services active on your account."
    />
  );
}
