"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import * as messageService from "@/lib/dashboard/messages/service";
import type { Message } from "@/lib/dashboard/messages/types";

export async function sendMessageAction(body: string): Promise<Message> {
  const session = await auth();
  const email = session?.user?.username;
  if (!email) redirect("/login");

  const trimmed = body.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty.");
  }

  const senderName = session.user.businessName || "Client";
  return messageService.sendMessage(email, "client", senderName, trimmed);
}

export async function getUnreadCountAction(): Promise<number> {
  const session = await auth();
  const email = session?.user?.username;
  if (!email) return 0;

  return messageService.getUnreadCountForUser(email);
}
