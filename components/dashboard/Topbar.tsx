"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/auth/actions";

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/website": "My Website",
  "/dashboard/services": "Services",
  "/dashboard/requests": "Requests",
  "/dashboard/messages": "Messages",
  "/dashboard/analytics": "Analytics",
  "/dashboard/account": "Account",
};

export default function Topbar({
  businessName,
  sidebarOpen,
  onToggleSidebar,
}: {
  businessName: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const pathname = usePathname();
  const sectionTitle = TITLES[pathname] ?? "Dashboard";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [menuOpen]);

  return (
    <header className="db-topbar">
      <button
        className="db-hamburger"
        type="button"
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
        aria-controls="dashboardSidebar"
        onClick={onToggleSidebar}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" />
        </svg>
      </button>

      <span className="db-topbar-title">{sectionTitle}</span>

      <div className="db-topbar-user" ref={menuRef}>
        <span className="db-topbar-business">{businessName}</span>
        <button
          type="button"
          className="db-avatar db-avatar-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-label="Account menu"
        >
          {businessName ? businessName.substring(0, 1) : "D"}
        </button>

        {menuOpen && (
          <div className="db-user-menu" role="menu">
            <div className="db-user-menu-name">{businessName}</div>
            <form action={logoutAction.bind(null, "/")}>
              <button type="submit" className="db-user-menu-item" role="menuitem">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
                </svg>
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
