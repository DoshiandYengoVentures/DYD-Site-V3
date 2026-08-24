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

export async function getCustomerMessagesAction(userEmail: string): Promise<Message[]> {
  await requireOwner();
  return messageService.getMessagesForUser(userEmail);
}

export async function sendOwnerReplyAction(userEmail: string, body: string): Promise<Message> {
  await requireOwner();
  const trimmed = body.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty.");
  }
  return messageService.sendMessage(userEmail, "team", "Doshi and Yengo Team", trimmed);
}
