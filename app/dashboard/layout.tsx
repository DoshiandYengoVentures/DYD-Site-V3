import { auth } from "@/lib/auth/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const businessName = session?.user?.businessName ?? "";

  return (
    <>
      <link rel="stylesheet" href="/css/dashboard.css" />

      <div className="db-root">
        <div className="db-shell">
          <Sidebar businessName={businessName} />

          <div className="db-main">
            <Topbar businessName={businessName} />
            <main className="db-content">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
