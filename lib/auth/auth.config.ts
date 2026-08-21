import type { NextAuthConfig } from "next-auth";

export const DEMO_USERNAME = "demo@doshiyengo.digital";
export const DEMO_BUSINESS_NAME = "Harbor & Co. Contracting";

/**
 * Edge-safe base config — no providers. Middleware runs on the Edge Runtime
 * and can't bundle the Credentials provider (or anything else Node-specific),
 * so it imports only this file. The full config with providers lives in
 * auth.ts and is used everywhere else (route handlers, Server Actions,
 * Server Components), which all run on the Node.js runtime.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.businessName = user.name ?? DEMO_BUSINESS_NAME;
        token.username = user.email ?? DEMO_USERNAME;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.businessName = token.businessName as string;
      session.user.username = token.username as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
