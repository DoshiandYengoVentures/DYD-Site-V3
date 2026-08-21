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
          beforeInteractive: Next.js inlines these into the server-rendered
          HTML so they execute on the real browser parse timeline, the same
          way the original app's <script> tags did. Loading them any other
          way runs them after hydration, by which point DOMContentLoaded has
          already fired and main.js/dashboard.js's listeners never trigger.
          Both scripts no-op harmlessly on pages without their target elements.
        */}
        <Script src="/js/main.js" strategy="beforeInteractive" />
        <Script src="/js/dashboard.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
