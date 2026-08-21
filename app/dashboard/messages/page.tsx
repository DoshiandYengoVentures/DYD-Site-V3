import type { Metadata } from "next";
import DashboardPlaceholder from "@/components/dashboard/DashboardPlaceholder";

export const metadata: Metadata = { title: "Messages — Doshi and Yengo Digital" };

export default function MessagesPlaceholderPage() {
  return (
    <DashboardPlaceholder
      title="Messages"
      description="This is where you'll message your Doshi and Yengo Digital team directly."
    />
  );
}
