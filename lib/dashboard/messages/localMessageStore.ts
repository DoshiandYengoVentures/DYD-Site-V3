import type { Message, MessageStore } from "./types";

const STORAGE_KEY = "dyd_messages_v1";
const TEAM_SENDER_NAME = "Doshi and Yengo Team";

function seedMessages(): Message[] {
  const now = Date.now();
  return [
    {
      id: "seed-1",
      sender: "team",
      senderName: TEAM_SENDER_NAME,
      body: "Hi! This is where you can message our team directly about your account, requests, or anything else.",
      timestamp: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "seed-2",
      sender: "team",
      senderName: TEAM_SENDER_NAME,
      body: "Send a message below any time — we typically reply within one business day.",
      timestamp: new Date(now - 1000 * 60 * 60 * 23).toISOString(),
    },
  ];
}

function readAll(): Message[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = seedMessages();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw) as Message[];
  } catch {
    return [];
  }
}

function writeAll(messages: Message[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * localStorage-backed implementation of MessageStore, used since there's
 * no messaging backend yet. Every method is async to match the shape a
 * real fetch-based implementation would have.
 */
export const localMessageStore: MessageStore = {
  async getMessages() {
    return readAll();
  },

  async sendMessage(body: string) {
    const messages = readAll();
    const message: Message = {
      id: generateId(),
      sender: "client",
      senderName: "You",
      body,
      timestamp: new Date().toISOString(),
    };
    writeAll([...messages, message]);
    return message;
  },
};
