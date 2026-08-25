"use server";

import { redirect } from "next/navigation";
import * as userService from "@/lib/users/service";
import type { SignupState } from "./state";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function signupAction(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const values = {
    businessName: String(formData.get("businessName") ?? "").trim(),
    contactName: String(formData.get("contactName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
  };
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const errors: SignupState["errors"] = {};

  if (!values.businessName) {
    errors.businessName = "Please enter your business name.";
  }

  if (!values.contactName) {
    errors.contactName = "Please enter your name.";
  }

  if (!values.email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Please choose a password.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!errors.password && confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!errors.email) {
    const existing = await userService.findByEmail(values.email);
    if (existing) {
      errors.email = "An account with this email already exists.";
    }
  }

  if (values.phone) {
    const existingPhone = await userService.findByPhone(values.phone);
    if (existingPhone) {
      errors.phone = "An account with this phone number already exists.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { submitCount: prevState.submitCount + 1, errors, values };
  }

  await userService.createUser({
    businessName: values.businessName,
    contactName: values.contactName,
    email: values.email,
    phone: values.phone || null,
    password,
  });

  redirect("/login?signup=success");
}
