import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig, DEMO_USERNAME, DEMO_BUSINESS_NAME } from "./auth.config";
import * as userService from "@/lib/users/service";
import { verifyPassword } from "./password";

export const DEMO_PASSWORD = "Demo1234!";
export { DEMO_USERNAME, DEMO_BUSINESS_NAME };

export class UnconfirmedAccountError extends CredentialsSignin {
  code = "unconfirmed";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { username: {}, password: {} },
      async authorize(credentials) {
        const username = (credentials?.username as string | undefined)?.trim().toLowerCase();
        const password = credentials?.password as string | undefined;
        if (!username || !password) return null;

        if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
          return { id: DEMO_USERNAME, email: DEMO_USERNAME, name: DEMO_BUSINESS_NAME };
        }

        const user = await userService.findByEmail(username);
        if (!user) return null;

        const validPassword = await verifyPassword(password, user.passwordHash);
        if (!validPassword) return null;

        if (!user.emailConfirmed) {
          throw new UnconfirmedAccountError();
        }

        return { id: user.id, email: user.email, name: user.businessName };
      },
    }),
  ],
});
