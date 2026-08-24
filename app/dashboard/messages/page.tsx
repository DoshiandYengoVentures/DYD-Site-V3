import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import * as messageService from "@/lib/dashboard/messages/service";
import MessagesClient from "./MessagesClient";

export const metadata: Metadata = { title: "Messages — Doshi and Yengo Digital" };

export default async function MessagesPage() {
  const session = await auth();
  const email = session?.user?.username;
  if (!email) redirect("/login");

  // Opening this page is "opening the thread" for the customer side - there's
  // only one conversation here, unlike the owner's multi-customer inbox.
  await messageService.markThreadReadByCustomer(email);
  const messages = await messageService.getMessagesForUser(email);

  return (
    <>
      <div className="db-page-head">
        <h1>Messages</h1>
        <p>Message our team directly about your account, requests, or anything else.</p>
      </div>

      <MessagesClient initialMessages={messages} />
    </>
  );
}
