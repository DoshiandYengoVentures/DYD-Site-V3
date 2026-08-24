import type { Metadata } from "next";
import * as userService from "@/lib/users/service";
import * as contactService from "@/lib/contact/service";
import * as messageService from "@/lib/dashboard/messages/service";
import CustomerThreadsPanel from "./CustomerThreadsPanel";

export const metadata: Metadata = { title: "Messages — Owner Dashboard" };

function formatDateTime(date: Date): string {
  return date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export default async function OwnerMessagesPage() {
  const [submissions, customers, unreadCounts] = await Promise.all([
    contactService.listSubmissions(),
    userService.listCustomers(),
    messageService.getUnreadCountsByCustomer(),
  ]);

  const customerSummaries = customers.map((c) => ({
    email: c.email,
    businessName: c.businessName,
    contactName: c.contactName,
  }));

  return (
    <>
      <div className="ow-page-head">
        <h1>Messages</h1>
        <p>Contact form submissions and customer conversations, in one place.</p>
      </div>

      <div className="ow-messages-grid">
        <div className="ow-panel">
          <div className="ow-panel-title">Contact Form Submissions</div>
          {submissions.length === 0 ? (
            <div className="ow-empty">No submissions yet.</div>
          ) : (
            submissions.map((submission) => (
              <div className="ow-submission" key={submission.id}>
                <div className="ow-submission-top">
                  <span className="ow-submission-name">{submission.name}</span>
                  <span className="ow-submission-time">{formatDateTime(submission.submittedAt)}</span>
                </div>
                <div className="ow-submission-contact">
                  {submission.email}
                  {submission.phone ? ` · ${submission.phone}` : ""}
                </div>
                <div className="ow-submission-message">{submission.message}</div>
              </div>
            ))
          )}
        </div>

        <div className="ow-panel">
          <div className="ow-panel-title">Customer Message Threads</div>
          <CustomerThreadsPanel customers={customerSummaries} initialUnreadCounts={unreadCounts} />
        </div>
      </div>
    </>
  );
}
