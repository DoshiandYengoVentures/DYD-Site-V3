import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, DEMO_USERNAME, DEMO_BUSINESS_NAME } from "@/lib/auth/auth";
import * as userService from "@/lib/users/service";
import BusinessProfileCard from "./BusinessProfileCard";
import SecurityCard from "./SecurityCard";

export const metadata: Metadata = { title: "Account — Doshi and Yengo Digital" };

export default async function AccountPage() {
  const session = await auth();
  const email = session?.user?.username;
  if (!email) redirect("/login");

  const isDemo = email.toLowerCase() === DEMO_USERNAME.toLowerCase();

  const profileValues = isDemo
    ? { businessName: DEMO_BUSINESS_NAME, contactName: "Demo User", phone: "" }
    : await (async () => {
        const user = await userService.findByEmail(email);
        return {
          businessName: user?.businessName ?? "",
          contactName: user?.contactName ?? "",
          phone: user?.phone ?? "",
        };
      })();

  return (
    <>
      <div className="db-page-head">
        <h1>Account</h1>
        <p>Manage your business profile, login, and billing.</p>
      </div>

      <div className="db-stack">
        <BusinessProfileCard email={email} isDemo={isDemo} initialValues={profileValues} />
        <SecurityCard email={email} isDemo={isDemo} />

        <div className="db-panel">
          <div className="db-panel-header">
            <h2>Billing</h2>
          </div>
          <div className="db-empty-state">
            <div className="db-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
              </svg>
            </div>
            <h2>Manage your plan and payment details</h2>
            <p>Billing management is coming soon. In the meantime, you can view your active services below.</p>
            <span className="db-empty-note">Coming soon</span>
            <div style={{ marginTop: "20px" }}>
              <a className="db-btn db-btn-secondary" href="/dashboard/services">View Services</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
