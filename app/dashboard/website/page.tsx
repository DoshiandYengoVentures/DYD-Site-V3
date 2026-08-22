import type { Metadata } from "next";
import { getWebsiteDetail } from "@/lib/dashboard/website";

export const metadata: Metadata = { title: "My Website — Doshi and Yengo Digital" };

export default function WebsitePage() {
  const site = getWebsiteDetail();

  return (
    <>
      <div className="db-page-head db-page-head-row">
        <div>
          <h1>My Website</h1>
          <p>The live status and details for your website.</p>
        </div>
        <a
          className="db-btn db-btn-primary"
          href="/dashboard/requests?open=1&category=WEBSITE_DESIGN"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
            <path d="M12 5v14" /><path d="M5 12h14" />
          </svg>
          <span>Request Change</span>
        </a>
      </div>

      <div className="db-panel">
        <div className="db-panel-header">
          <h2>Site details</h2>
        </div>

        <div className="db-detail-grid">
          <div className="db-detail-item">
            <div className="db-detail-label">Website URL</div>
            <a className="db-detail-value db-detail-link" href={site.url} target="_blank" rel="noopener noreferrer">
              {site.url}
            </a>
          </div>

          <div className="db-detail-item">
            <div className="db-detail-label">Domain</div>
            <div className="db-detail-value">{site.domain}</div>
          </div>

          <div className="db-detail-item">
            <div className="db-detail-label">Hosting Status</div>
            <span className={`db-badge ${site.hostingBadgeClass}`}>{site.hostingStatus}</span>
          </div>

          <div className="db-detail-item">
            <div className="db-detail-label">Project Status</div>
            <span className={`db-badge ${site.projectBadgeClass}`}>{site.projectStatus}</span>
          </div>

          <div className="db-detail-item">
            <div className="db-detail-label">Last Update</div>
            <div className="db-detail-value">{site.lastUpdate}</div>
          </div>
        </div>
      </div>
    </>
  );
}
