import type { Metadata } from "next";
import DashboardPlaceholder from "@/components/dashboard/DashboardPlaceholder";

export const metadata: Metadata = { title: "Account — Doshi and Yengo Digital" };

export default function AccountPlaceholderPage() {
  return (
    <DashboardPlaceholder
      title="Account"
      description="This is where you'll manage your business profile, billing, and login details."
    />
  );
}
