import type { Metadata } from "next";
import { getOverviewStats, getTrafficSources, getTopPages } from "@/lib/dashboard/analytics";

export const metadata: Metadata = { title: "Analytics — Doshi and Yengo Digital" };

const CHANGE_ARROW: Record<string, string> = { up: "▲", down: "▼", flat: "•" };

export default function AnalyticsPage() {
  const stats = getOverviewStats();
  const sources = getTrafficSources();
  const pages = getTopPages();

  return (
    <>
      <div className="db-page-head">
        <div className="db-page-head-title">
          <h1>Analytics</h1>
          <span className="db-demo-data-badge">Demo Data</span>
        </div>
        <p>Traffic, leads, and conversion data for your website.</p>
      </div>

      <div className="db-grid db-grid-4">
        {stats.map((stat) => (
          <article className="db-card db-stat-card" key={stat.label}>
            <span className="db-stat-label">{stat.label}</span>
            <span className="db-stat-value">{stat.value}</span>
            <span className={`db-stat-change db-stat-change-${stat.direction}`}>
              {CHANGE_ARROW[stat.direction]} {stat.change}
            </span>
          </article>
        ))}
      </div>

      <section className="db-section db-grid-split">
        <div className="db-panel">
          <div className="db-panel-header">
            <h2>Traffic sources</h2>
          </div>
          <div className="db-table-wrap">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Sessions</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((source) => (
                  <tr key={source.source}>
                    <td>{source.source}</td>
                    <td>{source.sessions.toLocaleString("en-US")}</td>
                    <td style={{ minWidth: "120px" }}>
                      {source.percentage}%
                      <div className="db-table-bar-track">
                        <div className="db-table-bar-fill" style={{ width: `${source.percentage}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="db-panel">
          <div className="db-panel-header">
            <h2>Top pages</h2>
          </div>
          <div className="db-table-wrap">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Views</th>
                  <th>Avg. time</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.path}>
                    <td>{page.path}</td>
                    <td>{page.views.toLocaleString("en-US")}</td>
                    <td>{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
