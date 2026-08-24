"use client";

import { useEffect, useRef, useState } from "react";
import { sendMessageAction } from "./actions";
import type { Message } from "@/lib/dashboard/messages/types";

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || sending) return;

    setSending(true);
    setError(null);
    try {
      const message = await sendMessageAction(body);
      setMessages((prev) => [...prev, message]);
      setDraft("");
    } catch {
      setError("Couldn't send that message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <div className="db-panel db-messages-panel">
      <div className="db-messages-list" ref={listRef} role="log" aria-live="polite" aria-label="Conversation">
        {messages.length === 0 ? (
          <p className="db-messages-empty">No messages yet — send one below to get started.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={message.sender === "client" ? "db-message db-message-client" : "db-message db-message-team"}
            >
              <div className="db-message-bubble">{message.body}</div>
              <div className="db-message-meta">
                <span>{message.sender === "client" ? "You" : message.senderName}</span>
                <span aria-hidden="true"> · </span>
                <span>{formatTimestamp(message.timestamp)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {error && (
        <div className="db-alert db-alert-error" role="alert" style={{ marginTop: "12px", marginBottom: 0 }}>
          {error}
        </div>
      )}

      <form className="db-message-form" onSubmit={handleSubmit}>
        <label htmlFor="messageInput" className="db-visually-hidden">Message</label>
        <textarea
          id="messageInput"
          className="db-message-input"
          placeholder="Write a message…"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          required
        />
        <button type="submit" className="db-btn db-btn-primary" disabled={sending}>
          {sending ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}
