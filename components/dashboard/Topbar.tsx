"use client";

import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/website": "My Website",
  "/dashboard/services": "Services",
  "/dashboard/requests": "Requests",
  "/dashboard/messages": "Messages",
  "/dashboard/analytics": "Analytics",
  "/dashboard/account": "Account",
};

export default function Topbar({ businessName }: { businessName: string }) {
  const pathname = usePathname();
  const sectionTitle = TITLES[pathname] ?? "Dashboard";

  return (
    <header className="db-topbar">
      <button className="db-hamburger" type="button" aria-label="Toggle sidebar" aria-expanded="false" aria-controls="dashboardSidebar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
        </svg>
      </button>

      <span className="db-topbar-title">{sectionTitle}</span>

      <div className="db-topbar-user">
        <span className="db-topbar-business">{businessName}</span>
        <span className="db-avatar">{businessName ? businessName.substring(0, 1) : "D"}</span>
      </div>
    </header>
  );
}
