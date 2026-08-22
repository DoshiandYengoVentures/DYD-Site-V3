import * as repository from "./repository";
import { hashPassword } from "@/lib/auth/password";
import type { User } from "./types";

export async function createUser(data: {
  businessName: string;
  contactName: string;
  email: string;
  password: string;
}): Promise<User> {
  const passwordHash = await hashPassword(data.password);
  return repository.insertUser({
    businessName: data.businessName,
    contactName: data.contactName,
    email: data.email.trim().toLowerCase(),
    passwordHash,
  });
}

export async function findByEmail(email: string): Promise<User | null> {
  return repository.findByEmail(email);
}
