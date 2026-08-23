import type { Metadata } from "next";
import MessagesClient from "./MessagesClient";

export const metadata: Metadata = { title: "Messages — Doshi and Yengo Digital" };

export default function MessagesPage() {
  return (
    <>
      <div className="db-page-head">
        <h1>Messages</h1>
        <p>Message our team directly about your account, requests, or anything else.</p>
      </div>

      <MessagesClient />
    </>
  );
}
