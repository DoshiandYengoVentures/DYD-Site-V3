import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Create Account — Doshi and Yengo Digital",
};

export default function SignupPage() {
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

            <h1>Create your account</h1>
            <p>Sign up to manage your website, services, and requests in one place.</p>

            <SignupForm />

            <p className="db-auth-switch">
              Already have an account? <a href="/login">Sign in</a>
            </p>

            <a className="db-auth-back" href="/">← Back to the main site</a>
          </div>
        </div>
      </div>
    </>
  );
}
