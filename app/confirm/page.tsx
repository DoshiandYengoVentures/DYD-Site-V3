import type { Metadata } from "next";
import { redirect } from "next/navigation";
import * as userService from "@/lib/users/service";
import { resendConfirmationAction } from "@/lib/users/actions";

export const metadata: Metadata = {
  title: "Confirm Your Account — Doshi and Yengo Digital",
};

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const result = token ? await userService.confirmToken(token) : { status: "invalid" as const };

  if (result.status === "confirmed") {
    redirect("/login?confirmed=success");
  }

  const email = result.status === "expired" ? result.email : "";

  return (
    <>
      <link rel="stylesheet" href="/css/dashboard.css" />

      <div className="db-root">
        <div className="db-auth-shell">
          <div className="db-auth-card">
            <div className="db-auth-logo">
              <span className="db-logo-mark" aria-hidden="true" style={{ background: "var(--db-blue)" }}></span>
              <span>Doshi and Yengo Digital</span>
            </div>

            {result.status === "expired" ? (
              <>
                <h1>This link has expired</h1>
                <p>Confirmation links are only valid for 15 minutes. Enter your email below and we&apos;ll send you a new one.</p>
              </>
            ) : (
              <>
                <h1>Invalid confirmation link</h1>
                <p>This confirmation link isn&apos;t valid. Enter your email below and we&apos;ll send a new one if your account still needs confirming.</p>
              </>
            )}

            <form action={resendConfirmationAction}>
              <div className="db-field">
                <label htmlFor="resendEmail">Email</label>
                <input type="email" id="resendEmail" name="email" defaultValue={email} required autoFocus />
              </div>
              <button type="submit" className="db-btn db-btn-primary db-btn-block">Resend Confirmation Email</button>
            </form>

            <a className="db-auth-back" href="/login">← Back to sign in</a>
          </div>
        </div>
      </div>
    </>
  );
}
