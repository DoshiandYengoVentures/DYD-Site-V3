"use client";

import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/auth/actions";

function cls(active: boolean) {
  return active ? "ow-nav-link is-active" : "ow-nav-link";
}

export default function OwnerNav() {
  const pathname = usePathname();
  const is = (href: string) => (href === "/owner" ? pathname === "/owner" : pathname.startsWith(href));

  return (
    <header className="ow-topnav">
      <div className="ow-brand">
        <span className="ow-brand-mark" aria-hidden="true"></span>
        <span>Doshi and Yengo Digital</span>
        <span className="ow-badge-owner">Owner</span>
      </div>

      <nav className="ow-nav" aria-label="Owner dashboard navigation">
        <a className={cls(is("/owner"))} href="/owner">
          <span>Customers</span>
        </a>
        <a className={cls(pathname.startsWith("/owner/messages"))} href="/owner/messages">
          <span>Messages</span>
        </a>
      </nav>

      <form action={logoutAction.bind(null, "/")}>
        <button type="submit" className="ow-topnav-signout">Sign Out</button>
      </form>
    </header>
  );
}
