import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Doshi and Yengo Digital",
  description:
    "Doshi and Yengo Digital builds websites, SEO, business automation, and AI solutions for contractors, restaurants, medical practices, and local service businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/*
          beforeInteractive: Next.js inlines this into the server-rendered
          HTML so it executes on the real browser parse timeline, the same
          way the original app's <script> tag did. Loading it any other way
          runs it after hydration, by which point DOMContentLoaded has
          already fired and main.js's listeners never trigger. It no-ops
          harmlessly on pages without its target elements.

          dashboard.js used to load here too, but its sidebar-toggle and
          request-modal logic only ran once per hard page load, so it never
          initialized after a client-side route transition (e.g. the
          post-login redirect straight into /dashboard). That logic now
          lives in React state (DashboardShell, RequestModalProvider),
          which re-initializes correctly on every mount regardless of how
          the user arrived at the page.
        */}
        <Script src="/js/main.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
