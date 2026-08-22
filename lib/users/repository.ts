import { sql } from "@vercel/postgres";
import type { User } from "./types";

type UserRow = {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  password_hash: string;
  email_confirmed: boolean;
  confirmation_token: string;
  created_at: string;
};

function toUser(row: UserRow): User {
  return {
    id: row.id,
    businessName: row.business_name,
    contactName: row.contact_name,
    email: row.email,
    passwordHash: row.password_hash,
    emailConfirmed: row.email_confirmed,
    confirmationToken: row.confirmation_token,
    createdAt: new Date(row.created_at),
  };
}

export async function insertUser(data: {
  businessName: string;
  contactName: string;
  email: string;
  passwordHash: string;
}): Promise<User> {
  const result = await sql<UserRow>`
    INSERT INTO users (business_name, contact_name, email, password_hash)
    VALUES (${data.businessName}, ${data.contactName}, ${data.email}, ${data.passwordHash})
    RETURNING id, business_name, contact_name, email, password_hash, email_confirmed, confirmation_token, created_at
  `;
  return toUser(result.rows[0]);
}

export async function findByEmail(email: string): Promise<User | null> {
  const result = await sql<UserRow>`
    SELECT id, business_name, contact_name, email, password_hash, email_confirmed, confirmation_token, created_at
    FROM users
    WHERE lower(email) = lower(${email})
  `;
  return result.rows[0] ? toUser(result.rows[0]) : null;
}
