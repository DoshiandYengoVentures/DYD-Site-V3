import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const DEMO_USERNAME = "demo@doshiyengo.digital";
export const DEMO_PASSWORD = "Demo1234!";
export const DEMO_BUSINESS_NAME = "Harbor & Co. Contracting";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { username: {}, password: {} },
      authorize(credentials) {
        const username = (credentials?.username as string | undefined)?.trim().toLowerCase();
        const password = credentials?.password as string | undefined;

        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
          return { id: DEMO_USERNAME, email: DEMO_USERNAME, name: DEMO_BUSINESS_NAME };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  trustHost: true,
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
});
