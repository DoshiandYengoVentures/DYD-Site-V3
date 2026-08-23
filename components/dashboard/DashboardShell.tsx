"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardShell({
  businessName,
  children,
}: {
  businessName: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route changes (e.g. after tapping a nav link).
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Match the previous behavior: if the viewport grows past the mobile
  // breakpoint while the drawer is open, close it.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 900) setSidebarOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") setSidebarOpen(false);
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [sidebarOpen]);

  return (
    <div className={sidebarOpen ? "db-shell db-sidebar-open" : "db-shell"}>
      <Sidebar businessName={businessName} onClose={() => setSidebarOpen(false)} />

      <div className="db-main">
        <Topbar
          businessName={businessName}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />
        <main className="db-content">{children}</main>
      </div>
    </div>
  );
}
