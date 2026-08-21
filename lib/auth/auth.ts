import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig, DEMO_USERNAME, DEMO_BUSINESS_NAME } from "./auth.config";

export const DEMO_PASSWORD = "Demo1234!";
export { DEMO_USERNAME, DEMO_BUSINESS_NAME };

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
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
});
