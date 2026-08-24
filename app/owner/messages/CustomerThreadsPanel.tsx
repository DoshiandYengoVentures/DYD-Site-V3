"use client";

import { useState } from "react";
import { openCustomerThreadAction, sendOwnerReplyAction } from "./actions";
import NotificationBadge from "@/components/NotificationBadge";
import { useUnreadCount } from "@/components/owner/UnreadCountContext";
import type { Message } from "@/lib/dashboard/messages/types";

type CustomerSummary = { email: string; businessName: string; contactName: string };

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function CustomerThreadsPanel({
  customers,
  initialUnreadCounts,
}: {
  customers: CustomerSummary[];
  initialUnreadCounts: Record<string, number>;
}) {
  const [search, setSearch] = useState("");
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);
  const [messagesByEmail, setMessagesByEmail] = useState<Record<string, Message[]>>({});
  const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
  const [draftByEmail, setDraftByEmail] = useState<Record<string, string>>({});
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [unreadByEmail, setUnreadByEmail] = useState<Record<string, number>>(initialUnreadCounts);
  const { decrementBy } = useUnreadCount();

  const query = search.trim().toLowerCase();
  const filtered = query
    ? customers.filter(
        (c) =>
          c.businessName.toLowerCase().includes(query) ||
          c.contactName.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query)
      )
    : customers;

  async function toggleExpand(email: string) {
    if (expandedEmail === email) {
      setExpandedEmail(null);
      return;
    }
    setExpandedEmail(email);
    if (!messagesByEmail[email]) {
      setLoadingEmail(email);
      const { messages, markedRead } = await openCustomerThreadAction(email);
      setMessagesByEmail((prev) => ({ ...prev, [email]: messages }));
      setLoadingEmail(null);
      if (markedRead > 0) {
        setUnreadByEmail((prev) => ({ ...prev, [email.toLowerCase()]: 0 }));
        decrementBy(markedRead);
      }
    }
  }

  async function handleReply(email: string) {
    const body = (draftByEmail[email] ?? "").trim();
    if (!body || sendingEmail === email) return;

    setSendingEmail(email);
    try {
      const message = await sendOwnerReplyAction(email, body);
      setMessagesByEmail((prev) => ({ ...prev, [email]: [...(prev[email] ?? []), message] }));
      setDraftByEmail((prev) => ({ ...prev, [email]: "" }));
    } finally {
      setSendingEmail(null);
    }
  }

  return (
    <div>
      <input
        type="search"
        className="ow-search"
        placeholder="Search by name, business, or email…"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search customers"
      />

      {filtered.length === 0 ? (
        <div className="ow-empty">No customers found.</div>
      ) : (
        filtered.map((customer) => {
          const isOpen = expandedEmail === customer.email;
          const messages = messagesByEmail[customer.email];
          const isLoading = loadingEmail === customer.email;
          const unreadCount = unreadByEmail[customer.email.toLowerCase()] ?? 0;

          return (
            <div className={isOpen ? "ow-customer-row is-open" : "ow-customer-row"} key={customer.email}>
              <button type="button" className="ow-customer-row-head" onClick={() => toggleExpand(customer.email)}>
                <div className="ow-customer-row-info">
                  <span className="ow-customer-row-name">{customer.businessName}</span>
                  <span className="ow-customer-row-email">{customer.contactName} · {customer.email}</span>
                </div>
                <div className="ow-customer-row-right">
                  <NotificationBadge count={unreadCount} />
                  <svg className="ow-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="ow-thread">
                  {isLoading ? (
                    <p className="ow-empty">Loading…</p>
                  ) : (
                    <>
                      <div className="ow-thread-list" role="log" aria-live="polite">
                        {messages && messages.length > 0 ? (
                          messages.map((message) => (
                            <div
                              key={message.id}
                              className={message.sender === "team" ? "ow-thread-message is-team" : "ow-thread-message is-client"}
                            >
                              <div className="ow-thread-bubble">{message.body}</div>
                              <div className="ow-thread-meta">
                                {message.sender === "team" ? "Doshi and Yengo Team" : customer.businessName} · {formatTimestamp(message.timestamp)}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="ow-empty">No messages with this customer yet.</p>
                        )}
                      </div>

                      <div className="ow-reply-form">
                        <label htmlFor={`reply-${customer.email}`} className="ow-visually-hidden">
                          Reply to {customer.businessName}
                        </label>
                        <textarea
                          id={`reply-${customer.email}`}
                          className="ow-reply-input"
                          rows={2}
                          placeholder="Write a reply…"
                          value={draftByEmail[customer.email] ?? ""}
                          onChange={(event) =>
                            setDraftByEmail((prev) => ({ ...prev, [customer.email]: event.target.value }))
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                              event.preventDefault();
                              handleReply(customer.email);
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="ow-btn"
                          disabled={sendingEmail === customer.email}
                          onClick={() => handleReply(customer.email)}
                        >
                          {sendingEmail === customer.email ? "Sending…" : "Reply"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
