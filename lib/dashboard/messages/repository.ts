import { sql } from "@vercel/postgres";
import type { Message, MessageSender } from "./types";

type MessageRow = {
  id: string;
  user_email: string;
  sender: MessageSender;
  sender_name: string;
  body: string;
  created_at: string;
};

function toMessage(row: MessageRow): Message {
  return {
    id: row.id,
    sender: row.sender,
    senderName: row.sender_name,
    body: row.body,
    timestamp: row.created_at,
  };
}

export async function findByUserEmail(userEmail: string): Promise<Message[]> {
  const result = await sql<MessageRow>`
    SELECT id, user_email, sender, sender_name, body, created_at
    FROM messages
    WHERE lower(user_email) = lower(${userEmail})
    ORDER BY created_at ASC
  `;
  return result.rows.map(toMessage);
}

export async function insertMessage(data: {
  userEmail: string;
  sender: MessageSender;
  senderName: string;
  body: string;
}): Promise<Message> {
  const result = await sql<MessageRow>`
    INSERT INTO messages (user_email, sender, sender_name, body)
    VALUES (${data.userEmail}, ${data.sender}, ${data.senderName}, ${data.body})
    RETURNING id, user_email, sender, sender_name, body, created_at
  `;
  return toMessage(result.rows[0]);
}
