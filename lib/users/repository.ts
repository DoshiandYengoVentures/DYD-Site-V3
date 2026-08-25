import { sql } from "@vercel/postgres";
import type { User, UserRole } from "./types";

type UserRow = {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  password_hash: string;
  role: UserRole;
  email_confirmed: boolean;
  confirmation_token: string;
  confirmation_token_expires_at: string;
  created_at: string;
};

function toUser(row: UserRow): User {
  return {
    id: row.id,
    businessName: row.business_name,
    contactName: row.contact_name,
    email: row.email,
    phone: row.phone,
    passwordHash: row.password_hash,
    role: row.role,
    emailConfirmed: row.email_confirmed,
    confirmationToken: row.confirmation_token,
    confirmationTokenExpiresAt: new Date(row.confirmation_token_expires_at),
    createdAt: new Date(row.created_at),
  };
}

export async function insertUser(data: {
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  passwordHash: string;
}): Promise<User> {
  const result = await sql<UserRow>`
    INSERT INTO users (business_name, contact_name, email, phone, password_hash)
    VALUES (${data.businessName}, ${data.contactName}, ${data.email}, ${data.phone}, ${data.passwordHash})
    RETURNING id, business_name, contact_name, email, phone, password_hash, role, email_confirmed,
      confirmation_token, confirmation_token_expires_at, created_at
  `;
  return toUser(result.rows[0]);
}

export async function findByEmail(email: string): Promise<User | null> {
  const result = await sql<UserRow>`
    SELECT id, business_name, contact_name, email, phone, password_hash, role, email_confirmed,
      confirmation_token, confirmation_token_expires_at, created_at
    FROM users
    WHERE lower(email) = lower(${email})
  `;
  return result.rows[0] ? toUser(result.rows[0]) : null;
}

export async function findByPhone(phone: string): Promise<User | null> {
  const normalized = phone.replace(/[^0-9]/g, "");
  if (!normalized) return null;

  const result = await sql<UserRow>`
    SELECT id, business_name, contact_name, email, phone, password_hash, role, email_confirmed,
      confirmation_token, confirmation_token_expires_at, created_at
    FROM users
    WHERE phone IS NOT NULL AND regexp_replace(phone, '[^0-9]', '', 'g') = ${normalized}
  `;
  return result.rows[0] ? toUser(result.rows[0]) : null;
}

export async function findByConfirmationToken(token: string): Promise<User | null> {
  const result = await sql<UserRow>`
    SELECT id, business_name, contact_name, email, phone, password_hash, role, email_confirmed,
      confirmation_token, confirmation_token_expires_at, created_at
    FROM users
    WHERE confirmation_token = ${token}
  `;
  return result.rows[0] ? toUser(result.rows[0]) : null;
}

export async function markConfirmed(id: string): Promise<void> {
  await sql`UPDATE users SET email_confirmed = true WHERE id = ${id}`;
}

export async function updateConfirmationToken(id: string, token: string, expiresAt: Date): Promise<void> {
  await sql`
    UPDATE users
    SET confirmation_token = ${token}, confirmation_token_expires_at = ${expiresAt.toISOString()}
    WHERE id = ${id}
  `;
}

export async function updateProfile(
  id: string,
  data: { businessName: string; contactName: string; phone: string | null }
): Promise<User> {
  const result = await sql<UserRow>`
    UPDATE users
    SET business_name = ${data.businessName}, contact_name = ${data.contactName}, phone = ${data.phone}
    WHERE id = ${id}
    RETURNING id, business_name, contact_name, email, phone, password_hash, role, email_confirmed,
      confirmation_token, confirmation_token_expires_at, created_at
  `;
  return toUser(result.rows[0]);
}

export async function updatePasswordHash(id: string, passwordHash: string): Promise<void> {
  await sql`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${id}`;
}

export async function findAllCustomers(): Promise<User[]> {
  const result = await sql<UserRow>`
    SELECT id, business_name, contact_name, email, phone, password_hash, role, email_confirmed,
      confirmation_token, confirmation_token_expires_at, created_at
    FROM users
    WHERE role = 'CUSTOMER'
    ORDER BY created_at DESC
  `;
  return result.rows.map(toUser);
}

export async function countCustomers(): Promise<number> {
  const result = await sql<{ count: string }>`SELECT COUNT(*) FROM users WHERE role = 'CUSTOMER'`;
  return Number(result.rows[0].count);
}
