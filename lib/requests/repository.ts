import { sql } from "@vercel/postgres";
import type { ClientRequest, RequestCategory, RequestPriority, RequestStatus } from "./types";

type RequestRow = {
  id: string;
  username: string;
  title: string;
  description: string;
  category: RequestCategory;
  priority: RequestPriority;
  status: RequestStatus;
  submitted_at: string;
};

function toClientRequest(row: RequestRow): ClientRequest {
  return {
    id: row.id,
    username: row.username,
    title: row.title,
    description: row.description,
    category: row.category,
    priority: row.priority,
    status: row.status,
    submittedAt: new Date(row.submitted_at),
  };
}

export async function insertRequest(data: {
  username: string;
  title: string;
  description: string;
  category: RequestCategory;
  priority: RequestPriority;
}): Promise<ClientRequest> {
  const result = await sql<RequestRow>`
    INSERT INTO requests (username, title, description, category, priority, status)
    VALUES (${data.username}, ${data.title}, ${data.description}, ${data.category}, ${data.priority}, 'SUBMITTED')
    RETURNING id, username, title, description, category, priority, status, submitted_at
  `;
  return toClientRequest(result.rows[0]);
}

export async function findByUsername(username: string): Promise<ClientRequest[]> {
  const result = await sql<RequestRow>`
    SELECT id, username, title, description, category, priority, status, submitted_at
    FROM requests
    WHERE username = ${username}
    ORDER BY submitted_at DESC
  `;
  return result.rows.map(toClientRequest);
}

export async function updateStatusById(id: string, username: string, status: RequestStatus): Promise<void> {
  await sql`
    UPDATE requests SET status = ${status}
    WHERE id = ${id} AND username = ${username}
  `;
}
