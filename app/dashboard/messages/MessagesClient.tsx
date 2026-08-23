"use client";

import { useEffect, useRef, useState } from "react";
import { messageStore, type Message } from "@/lib/dashboard/messages";

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MessagesClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageStore.getMessages().then((loadedMessages) => {
      setMessages(loadedMessages);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const body = draft.trim();
    if (!body) return;
    const message = await messageStore.sendMessage(body);
    setMessages((prev) => [...prev, message]);
    setDraft("");
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
        {!loaded ? (
          <p className="db-messages-empty">Loading messages…</p>
        ) : messages.length === 0 ? (
          <p className="db-messages-empty">No messages yet — send one below to get started.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={message.sender === "client" ? "db-message db-message-client" : "db-message db-message-team"}
            >
              <div className="db-message-bubble">{message.body}</div>
              <div className="db-message-meta">
                <span>{message.senderName}</span>
                <span aria-hidden="true"> · </span>
                <span>{formatTimestamp(message.timestamp)}</span>
              </div>
            </div>
          ))
        )}
      </div>

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
        <button type="submit" className="db-btn db-btn-primary">Send</button>
      </form>
    </div>
  );
}
