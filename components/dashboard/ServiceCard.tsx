import type { DashboardServiceDetail } from "@/lib/dashboard/services";

export default function ServiceCard({ name, status, badgeClass, description, startDate, price }: DashboardServiceDetail) {
  return (
    <article className="db-card db-service-card">
      <div className="db-service-card-head">
        <h3>{name}</h3>
        <span className={`db-badge ${badgeClass}`}>{status}</span>
      </div>
      <p>{description}</p>
      <div className="db-request-card-meta">
        <span className="db-request-meta-item">Started {startDate}</span>
        <span className="db-request-meta-date">{price}</span>
      </div>
    </article>
  );
}
