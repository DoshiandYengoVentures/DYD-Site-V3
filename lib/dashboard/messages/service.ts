import * as repository from "./repository";
import type { Message, MessageSender } from "./types";

export async function getMessagesForUser(userEmail: string): Promise<Message[]> {
  return repository.findByUserEmail(userEmail);
}

export async function sendMessage(
  userEmail: string,
  sender: MessageSender,
  senderName: string,
  body: string
): Promise<Message> {
  return repository.insertMessage({ userEmail, sender, senderName, body });
}

/** Unread count for one customer's messages, as seen by the owner. */
export async function getUnreadCountForCustomer(userEmail: string): Promise<number> {
  return repository.countUnreadClientMessages(userEmail);
}

/** Total unread count across all customers, as seen by the owner. */
export async function getTotalUnreadCount(): Promise<number> {
  return repository.countTotalUnreadClientMessages();
}

/** Unread counts for every customer with unread messages, keyed by lowercased email. */
export async function getUnreadCountsByCustomer(): Promise<Record<string, number>> {
  return repository.countUnreadClientMessagesByCustomer();
}

/** Unread count for one customer's own conversation, as seen by that customer. */
export async function getUnreadCountForUser(userEmail: string): Promise<number> {
  return repository.countUnreadTeamMessages(userEmail);
}

/** Call when the owner opens a specific customer's thread. */
export async function markThreadReadByOwner(userEmail: string): Promise<void> {
  return repository.markClientMessagesRead(userEmail);
}

/** Call when the customer opens their own Messages page. */
export async function markThreadReadByCustomer(userEmail: string): Promise<void> {
  return repository.markTeamMessagesRead(userEmail);
}
