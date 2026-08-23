import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import * as service from "@/lib/requests/service";
import {
  REQUEST_STATUSES,
  categoryLabel,
  priorityMeta,
  statusMeta,
  formatSubmittedAt,
  type RequestStatus,
} from "@/lib/requests/types";
import NewRequestModal from "./NewRequestModal";
import NewRequestButton from "./NewRequestButton";
import { RequestModalProvider } from "./RequestModalProvider";

export const metadata: Metadata = {
  title: "Requests — Doshi and Yengo Digital",
};

function parseStatus(raw: string | undefined): RequestStatus | undefined {
  if (!raw || raw === "ALL") return undefined;
  return REQUEST_STATUSES.some((s) => s.value === raw) ? (raw as RequestStatus) : undefined;
}

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const session = await auth();
  const username = session?.user?.username;
  if (!username) {
    redirect("/login");
  }

  const filter = parseStatus(status);
  const activeStatus = filter ?? "ALL";
  const requests = await service.getRequestsForUser(username, filter);

  return (
    <RequestModalProvider>
      <div className="db-page-head db-page-head-row">
        <div>
          <h1>Requests</h1>
          <p>Submit a new request and track progress on everything you&apos;ve sent our way.</p>
        </div>
        <NewRequestButton />
      </div>

      <div className="db-filter-tabs" role="tablist" aria-label="Filter requests by status">
        <a className={activeStatus === "ALL" ? "db-filter-tab is-active" : "db-filter-tab"} href="/dashboard/requests">All</a>
        {REQUEST_STATUSES.map((s) => (
          <a
            key={s.value}
            className={activeStatus === s.value ? "db-filter-tab is-active" : "db-filter-tab"}
            href={`/dashboard/requests?status=${s.value}`}
          >
            {s.label}
          </a>
        ))}
      </div>

      {requests.length > 0 ? (
        <div className="db-request-list">
          {requests.map((request) => {
            const priority = priorityMeta(request.priority);
            const statusInfo = statusMeta(request.status);
            return (
              <article className="db-card db-request-card" key={request.id}>
                <div className="db-request-card-top">
                  <div className="db-request-card-heading">
                    <h3>{request.title}</h3>
                    <p className="db-request-card-desc">{request.description}</p>
                  </div>
                  <span className={`db-badge ${priority.badgeClass}`}>{priority.label}</span>
                </div>
                <div className="db-request-card-meta">
                  <span className="db-request-meta-item">{categoryLabel(request.category)}</span>
                  <span className={`db-badge ${statusInfo.badgeClass}`}>{statusInfo.label}</span>
                  <span className="db-request-meta-date">Submitted {formatSubmittedAt(request.submittedAt)}</span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="db-panel">
          <div className="db-empty-state">
            <div className="db-empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M8 4v5" />
              </svg>
            </div>
            <h2>{activeStatus === "ALL" ? "No requests yet" : "Nothing in this status"}</h2>
            {activeStatus === "ALL" ? (
              <p>Submit your first request and our team will get started on it.</p>
            ) : (
              <p>Nothing here right now — try a different filter, or submit a new request.</p>
            )}
          </div>
        </div>
      )}

      <NewRequestModal />
    </RequestModalProvider>
  );
}
