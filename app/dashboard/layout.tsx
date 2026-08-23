import { auth } from "@/lib/auth/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const businessName = session?.user?.businessName ?? "";

  return (
    <>
      <link rel="stylesheet" href="/css/dashboard.css" />

      <div className="db-root">
        <DashboardShell businessName={businessName}>{children}</DashboardShell>
      </div>
    </>
  );
}
