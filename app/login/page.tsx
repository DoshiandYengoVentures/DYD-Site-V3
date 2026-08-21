import type { Metadata } from "next";
import { loginAction } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Sign In — Doshi and Yengo Digital",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; logout?: string }>;
}) {
  const { error, logout } = await searchParams;

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

            {error && (
              <div className="db-alert db-alert-error" role="alert">
                Incorrect email or password. Please try again.
              </div>
            )}
            {logout && (
              <div className="db-alert db-alert-info" role="status">
                You&apos;ve been signed out.
              </div>
            )}

            <form action={loginAction}>
              <div className="db-field">
                <label htmlFor="username">Email</label>
                <input type="email" id="username" name="username" autoComplete="username" required autoFocus />
              </div>
              <div className="db-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" autoComplete="current-password" required />
              </div>
              <button type="submit" className="db-btn db-btn-primary db-btn-block">Sign In</button>
            </form>

            <div className="db-demo-hint">
              <strong>Demo login</strong><br />
              Email: demo@doshiyengo.digital<br />
              Password: Demo1234!
            </div>

            <a className="db-auth-back" href="/">← Back to the main site</a>
          </div>
        </div>
      </div>
    </>
  );
}
