import { sql } from "@vercel/postgres";
import type { ContactSubmission } from "./types";

type ContactSubmissionRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  submitted_at: string;
};

function toContactSubmission(row: ContactSubmissionRow): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    submittedAt: new Date(row.submitted_at),
  };
}

export async function insertSubmission(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<ContactSubmission> {
  const result = await sql<ContactSubmissionRow>`
    INSERT INTO contact_submissions (name, email, phone, message)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.message})
    RETURNING id, name, email, phone, message, submitted_at
  `;
  return toContactSubmission(result.rows[0]);
}

export async function findAll(): Promise<ContactSubmission[]> {
  const result = await sql<ContactSubmissionRow>`
    SELECT id, name, email, phone, message, submitted_at
    FROM contact_submissions
    ORDER BY submitted_at DESC
  `;
  return result.rows.map(toContactSubmission);
}
