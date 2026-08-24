"use server";

import { auth } from "@/lib/auth/auth";
import * as messageService from "@/lib/dashboard/messages/service";
import type { Message } from "@/lib/dashboard/messages/types";

/**
 * Every action here re-checks the OWNER role itself, on top of the
 * middleware/layout checks that already gate /owner/* — these are Server
 * Actions, reachable directly, not just page loads.
 */
async function requireOwner() {
  const session = await auth();
  if (session?.user?.role !== "OWNER") {
    throw new Error("Forbidden");
  }
}

/**
 * Opening a customer's thread is what marks their messages as read - not
 * just loading the Messages page. Returns how many were just marked read
 * so the caller can decrement the nav badge locally without a re-fetch.
 */
export async function openCustomerThreadAction(
  userEmail: string
): Promise<{ messages: Message[]; markedRead: number }> {
  await requireOwner();
  const markedRead = await messageService.getUnreadCountForCustomer(userEmail);
  await messageService.markThreadReadByOwner(userEmail);
  const messages = await messageService.getMessagesForUser(userEmail);
  return { messages, markedRead };
}

export async function sendOwnerReplyAction(userEmail: string, body: string): Promise<Message> {
  await requireOwner();
  const trimmed = body.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty.");
  }
  return messageService.sendMessage(userEmail, "team", "Doshi and Yengo Team", trimmed);
}

export async function getTotalUnreadCountAction(): Promise<number> {
  await requireOwner();
  return messageService.getTotalUnreadCount();
}
