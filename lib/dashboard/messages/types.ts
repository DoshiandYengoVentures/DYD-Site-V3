export type MessageSender = "client" | "team";

export type Message = {
  id: string;
  sender: MessageSender;
  senderName: string;
  body: string;
  timestamp: string;
};

/**
 * Any real messaging backend implements this same shape (e.g. an
 * apiMessageStore.ts calling fetch("/api/messages")) so it can be swapped
 * in via index.ts without touching the page component.
 */
export interface MessageStore {
  getMessages(): Promise<Message[]>;
  sendMessage(body: string): Promise<Message>;
}
