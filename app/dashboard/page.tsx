import type { Metadata } from "next";
import { auth } from "@/lib/auth/auth";
import { getServiceStatuses, getNotifications, getRecentActivity } from "@/lib/dashboard/mockData";

export const metadata: Metadata = {
  title: "Dashboard — Doshi and Yengo Digital",
};

export default async function DashboardPage() {
  const session = await auth();
  const businessName = session?.user?.businessName ?? "";

  const services = getServiceStatuses();
  const notifications = getNotifications();
  const activity = getRecentActivity();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="db-welcome">
        <div>
          <h1>Welcome back, <span>{businessName}</span></h1>
          <p>Here&apos;s what&apos;s happening with your account today.</p>
        </div>
        <span className="db-date-pill">{today}</span>
      </div>

      <section className="db-section">
        <h2 className="db-section-title">Your services</h2>
        <div className="db-grid db-grid-4">
          {services.map((service) => (
            <article className="db-card db-service-card" key={service.name}>
              <div className="db-service-card-head">
                <h3>{service.name}</h3>
                <span className={`db-badge ${service.badgeClass}`}>{service.status}</span>
              </div>
              <p>{service.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="db-section db-grid-split">
        <div className="db-panel">
          <div className="db-panel-header">
            <h2>Notifications</h2>
            <a className="db-panel-link" href="/dashboard/messages">View all</a>
          </div>
          <div>
            {notifications.map((notification, i) => (
              <div className={`db-notification-item${notification.unread ? " is-unread" : ""}`} key={i}>
                <span className="db-notification-dot" aria-hidden="true"></span>
                <div className="db-notification-body">
                  <p className="db-notification-message">{notification.message}</p>
                  <p className="db-notification-time">{notification.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="db-panel">
          <div className="db-panel-header">
            <h2>Recent activity</h2>
          </div>
          <div>
            {activity.map((item, i) => (
              <div className="db-activity-item" key={i}>
                <span className="db-activity-dot" aria-hidden="true"></span>
                <div className="db-activity-body">
                  <p className="db-activity-description">{item.description}</p>
                  <p className="db-activity-time">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
