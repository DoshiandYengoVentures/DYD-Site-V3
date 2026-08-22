import { randomUUID } from "crypto";
import * as repository from "./repository";
import { hashPassword } from "@/lib/auth/password";
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
