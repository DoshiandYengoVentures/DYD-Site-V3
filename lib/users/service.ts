import { randomUUID } from "crypto";
import * as repository from "./repository";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { DEMO_USERNAME } from "@/lib/auth/auth.config";
import { sendConfirmationEmail } from "@/lib/mail/confirmationEmail";
import type { User } from "./types";

const CONFIRMATION_TOKEN_TTL_MS = 15 * 60 * 1000;

export async function createUser(data: {
  businessName: string;
  contactName: string;
  email: string;
  password: string;
}): Promise<User> {
  const passwordHash = await hashPassword(data.password);
  const user = await repository.insertUser({
    businessName: data.businessName,
    contactName: data.contactName,
    email: data.email.trim().toLowerCase(),
    passwordHash,
  });

  try {
    await sendConfirmationEmail(user.email, user.contactName, user.confirmationToken);
  } catch (error) {
    console.error(`Failed to send confirmation email to ${user.email}:`, error);
  }

  return user;
}

export async function findByEmail(email: string): Promise<User | null> {
  return repository.findByEmail(email);
}

function isDemoAccount(email: string): boolean {
  return email.toLowerCase() === DEMO_USERNAME.toLowerCase();
}

export type UpdateProfileResult = { ok: true; user: User } | { ok: false; error: string };

export async function updateProfile(
  email: string,
  data: { businessName: string; contactName: string; phone: string }
): Promise<UpdateProfileResult> {
  if (isDemoAccount(email)) {
    return { ok: false, error: "Profile changes aren't available on the demo account." };
  }

  const user = await repository.findByEmail(email);
  if (!user) return { ok: false, error: "Account not found." };

  const updated = await repository.updateProfile(user.id, {
    businessName: data.businessName,
    contactName: data.contactName,
    phone: data.phone || null,
  });
  return { ok: true, user: updated };
}

export type ChangePasswordResult = { ok: true } | { ok: false; error: string };

export async function changePassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordResult> {
  if (isDemoAccount(email)) {
    return { ok: false, error: "Password changes aren't available on the demo account." };
  }

  const user = await repository.findByEmail(email);
  if (!user) return { ok: false, error: "Account not found." };

  const validPassword = await verifyPassword(currentPassword, user.passwordHash);
  if (!validPassword) return { ok: false, error: "Current password is incorrect." };

  const passwordHash = await hashPassword(newPassword);
  await repository.updatePasswordHash(user.id, passwordHash);
  return { ok: true };
}

export type ConfirmResult =
  | { status: "confirmed" }
  | { status: "expired"; email: string }
  | { status: "invalid" };

export async function confirmToken(token: string): Promise<ConfirmResult> {
  const user = await repository.findByConfirmationToken(token);
  if (!user) return { status: "invalid" };
  if (user.emailConfirmed) return { status: "confirmed" };

  if (user.confirmationTokenExpiresAt.getTime() < Date.now()) {
    return { status: "expired", email: user.email };
  }

  await repository.markConfirmed(user.id);
  return { status: "confirmed" };
}

/**
 * Always resolves without indicating whether the email exists or is already
 * confirmed, so this can't be used to enumerate accounts.
 */
export async function resendConfirmation(email: string): Promise<void> {
  const user = await repository.findByEmail(email);
  if (!user || user.emailConfirmed) return;

  const token = randomUUID();
  const expiresAt = new Date(Date.now() + CONFIRMATION_TOKEN_TTL_MS);
  await repository.updateConfirmationToken(user.id, token, expiresAt);

  try {
    await sendConfirmationEmail(user.email, user.contactName, token);
  } catch (error) {
    console.error(`Failed to resend confirmation email to ${user.email}:`, error);
  }
}
