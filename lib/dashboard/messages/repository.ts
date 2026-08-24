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

// A message's recipient is always the other party: 'client' messages are
// unread for the owner until the owner opens that customer's thread,
// 'team' messages are unread for the customer until they open Messages.

export async function markClientMessagesRead(userEmail: string): Promise<void> {
  await sql`
    UPDATE messages SET read_at = now()
    WHERE lower(user_email) = lower(${userEmail}) AND sender = 'client' AND read_at IS NULL
  `;
}

export async function markTeamMessagesRead(userEmail: string): Promise<void> {
  await sql`
    UPDATE messages SET read_at = now()
    WHERE lower(user_email) = lower(${userEmail}) AND sender = 'team' AND read_at IS NULL
  `;
}

export async function countUnreadClientMessages(userEmail: string): Promise<number> {
  const result = await sql<{ count: string }>`
    SELECT COUNT(*) FROM messages
    WHERE lower(user_email) = lower(${userEmail}) AND sender = 'client' AND read_at IS NULL
  `;
  return Number(result.rows[0].count);
}

export async function countTotalUnreadClientMessages(): Promise<number> {
  const result = await sql<{ count: string }>`
    SELECT COUNT(*) FROM messages WHERE sender = 'client' AND read_at IS NULL
  `;
  return Number(result.rows[0].count);
}

export async function countUnreadTeamMessages(userEmail: string): Promise<number> {
  const result = await sql<{ count: string }>`
    SELECT COUNT(*) FROM messages
    WHERE lower(user_email) = lower(${userEmail}) AND sender = 'team' AND read_at IS NULL
  `;
  return Number(result.rows[0].count);
}

export async function countUnreadClientMessagesByCustomer(): Promise<Record<string, number>> {
  const result = await sql<{ user_email: string; count: string }>`
    SELECT user_email, COUNT(*) as count FROM messages
    WHERE sender = 'client' AND read_at IS NULL
    GROUP BY user_email
  `;
  const counts: Record<string, number> = {};
  for (const row of result.rows) {
    counts[row.user_email.toLowerCase()] = Number(row.count);
  }
  return counts;
}
