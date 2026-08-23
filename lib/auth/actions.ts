"use server";

import { AuthError, CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth/auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      redirect(`/login?error=${error.code}`);
    }
    if (error instanceof AuthError) {
      redirect("/login?error=true");
    }
    throw error;
  }
}

export async function logoutAction(redirectTo: string) {
  await signOut({ redirectTo });
}
