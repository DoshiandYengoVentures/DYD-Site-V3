import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import OwnerNav from "@/components/owner/OwnerNav";

export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
  // Defense in depth: middleware already gates /owner/* by role, but this
  // page-level check means a misconfigured or bypassed middleware still
  // can't expose owner data to a non-owner session.
  const session = await auth();
  if (session?.user?.role !== "OWNER") {
    redirect("/login");
  }

  return (
    <>
      <link rel="stylesheet" href="/css/owner.css" />
      <div className="ow-root">
        <OwnerNav />
        <main className="ow-content">{children}</main>
      </div>
    </>
  );
}
