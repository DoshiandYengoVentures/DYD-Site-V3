import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      businessName: string;
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    businessName?: string;
    username?: string;
  }
}
