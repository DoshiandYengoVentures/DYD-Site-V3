"use server";

import { redirect } from "next/navigation";
import * as userService from "./service";

export async function resendConfirmationAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  if (email) {
    await userService.resendConfirmation(email);
  }
  redirect("/login?resend=success");
}
