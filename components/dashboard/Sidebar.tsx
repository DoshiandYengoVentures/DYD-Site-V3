"use client";

import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/auth/actions";
import MessagesNavBadge from "./MessagesNavBadge";

function cls(active: boolean) {
  return active ? "db-nav-link is-active" : "db-nav-link";
}

export default function Sidebar({
  businessName,
  onClose,
}: {
  businessName: string;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const is = (href: string) => (href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href));

  return (
    <>
      <aside className="db-sidebar" id="dashboardSidebar">
        <div className="db-sidebar-header">
          <div className="db-sidebar-logo">
            <span className="db-logo-mark" aria-hidden="true"></span>
            <span>Doshi and Yengo</span>
          </div>
          <div className="db-sidebar-business-label">Client Account</div>
          <div className="db-sidebar-business">{businessName}</div>
        </div>

        <nav className="db-nav" aria-label="Dashboard navigation">
          <a className={cls(is("/dashboard"))} href="/dashboard">
            <span className="db-nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </span>
            <span>Dashboard</span>
          </a>

          <a className={cls(is("/dashboard/website"))} href="/dashboard/website">
            <span className="db-nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M3 12h18" />
                <path d="M12 3c2.5 2.5 3.75 5.5 3.75 9s-1.25 6.5-3.75 9c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3z" />
              </svg>
            </span>
            <span>My Website</span>
          </a>

          <a className={cls(is("/dashboard/services"))} href="/dashboard/services">
            <span className="db-nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" />
              </svg>
            </span>
            <span>Services</span>
          </a>

          <a className={cls(is("/dashboard/requests"))} href="/dashboard/requests">
            <span className="db-nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
                <path d="M9 11h6" /><path d="M9 15h6" />
              </svg>
            </span>
            <span>Requests</span>
          </a>

          <a className={cls(is("/dashboard/messages"))} href="/dashboard/messages">
            <span className="db-nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </span>
            <span>Messages</span>
            <MessagesNavBadge />
          </a>

          <a className={cls(is("/dashboard/analytics"))} href="/dashboard/analytics">
            <span className="db-nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" /><rect x="6" y="13" width="3" height="5" rx="0.5" />
                <rect x="11" y="9" width="3" height="9" rx="0.5" /><rect x="16" y="5" width="3" height="13" rx="0.5" />
              </svg>
            </span>
            <span>Analytics</span>
          </a>

          <a className={cls(is("/dashboard/account"))} href="/dashboard/account">
            <span className="db-nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </span>
            <span>Account</span>
          </a>
        </nav>

        <form className="db-nav-signout-form" action={logoutAction.bind(null, "/login?logout=true")}>
          <button type="submit" className="db-nav-link">
            <span className="db-nav-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
              </svg>
            </span>
            <span>Sign Out</span>
          </button>
        </form>
      </aside>

      <div className="db-sidebar-backdrop" onClick={onClose}></div>
    </>
  );
}
