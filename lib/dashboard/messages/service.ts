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
