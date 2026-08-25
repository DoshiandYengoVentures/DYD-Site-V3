import type { Metadata } from "next";
import { loginAction } from "@/lib/auth/actions";
import { resendConfirmationAction } from "@/lib/users/actions";

export const metadata: Metadata = {
  title: "Sign In — Doshi and Yengo Digital",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; logout?: string; signup?: string; confirmed?: string; resend?: string }>;
}) {
  const { error, logout, signup, confirmed, resend } = await searchParams;

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

            <h1>Sign in to your dashboard</h1>
            <p>Manage your website, services, and messages in one place.</p>

            {error === "unconfirmed" && (
              <>
                <div className="db-alert db-alert-error" role="alert">
                  Please confirm your email to activate your account.
                </div>
                <form action={resendConfirmationAction} className="db-resend-form">
                  <div className="db-field">
                    <label htmlFor="resendEmail">Resend confirmation email</label>
                    <input type="email" id="resendEmail" name="email" placeholder="you@example.com" required />
                  </div>
                  <button type="submit" className="db-btn db-btn-secondary db-btn-block">Resend Confirmation Email</button>
                </form>
              </>
            )}
            {error && error !== "unconfirmed" && (
              <div className="db-alert db-alert-error" role="alert">
                Incorrect email or password. Please try again.
              </div>
            )}
            {logout && (
              <div className="db-alert db-alert-info" role="status">
                You&apos;ve been signed out.
              </div>
            )}
            {signup === "success" && (
              <div className="db-alert db-alert-info" role="status">
                Account created! Please confirm your email to activate your account before signing in.
              </div>
            )}
            {confirmed === "success" && (
              <div className="db-alert db-alert-info" role="status">
                Your account is confirmed. You can sign in now.
              </div>
            )}
            {resend === "success" && (
              <div className="db-alert db-alert-info" role="status">
                If that email needs confirming, we&apos;ve sent a new confirmation link.
              </div>
            )}

            <form action={loginAction}>
              <div className="db-field">
                <label htmlFor="username">Email or Phone Number</label>
                <input type="text" id="username" name="username" autoComplete="username" required autoFocus />
              </div>
              <div className="db-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" autoComplete="current-password" required />
              </div>
              <button type="submit" className="db-btn db-btn-primary db-btn-block">Sign In</button>
            </form>

            <p className="db-auth-switch">
              Don&apos;t have an account? <a href="/signup">Sign up</a>
            </p>

            <a className="db-auth-back" href="/">← Back to the main site</a>
          </div>
        </div>
      </div>
    </>
  );
}
