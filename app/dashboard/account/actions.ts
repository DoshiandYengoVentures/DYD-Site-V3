"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import * as userService from "@/lib/users/service";
import type { ProfileState, PasswordState } from "./state";

export async function updateProfileAction(prevState: ProfileState, formData: FormData): Promise<ProfileState> {
  const session = await auth();
  const email = session?.user?.username;
  if (!email) redirect("/login");

  const values = {
    businessName: String(formData.get("businessName") ?? "").trim(),
    contactName: String(formData.get("contactName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
  };

  const errors: ProfileState["errors"] = {};
  if (!values.businessName) errors.businessName = "Please enter your business name.";
  if (!values.contactName) errors.contactName = "Please enter your name.";

  if (Object.keys(errors).length > 0) {
    return { submitCount: prevState.submitCount + 1, errors, values, success: false };
  }

  const result = await userService.updateProfile(email, values);
  if (!result.ok) {
    return { submitCount: prevState.submitCount + 1, errors: { businessName: result.error }, values, success: false };
  }

  return { submitCount: prevState.submitCount + 1, errors: {}, values, success: true };
}

export async function changePasswordAction(prevState: PasswordState, formData: FormData): Promise<PasswordState> {
  const session = await auth();
  const email = session?.user?.username;
  if (!email) redirect("/login");

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const errors: PasswordState["errors"] = {};
  if (!currentPassword) {
    errors.currentPassword = "Please enter your current password.";
  }
  if (!newPassword) {
    errors.newPassword = "Please enter a new password.";
  } else if (newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters.";
  }
  if (!errors.newPassword && confirmPassword !== newPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return { submitCount: prevState.submitCount + 1, errors, success: false };
  }

  const result = await userService.changePassword(email, currentPassword, newPassword);
  if (!result.ok) {
    return { submitCount: prevState.submitCount + 1, errors: { currentPassword: result.error }, success: false };
  }

  return { submitCount: prevState.submitCount + 1, errors: {}, success: true };
}
