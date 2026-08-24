export type MessageSender = "client" | "team";

export type Message = {
  id: string;
  sender: MessageSender;
  senderName: string;
  body: string;
  timestamp: string;
};
