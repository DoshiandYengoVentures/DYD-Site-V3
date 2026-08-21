export default function DashboardPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <>
      <div className="db-page-head">
        <h1>{title}</h1>
      </div>

      <div className="db-panel">
        <div className="db-empty-state">
          <div className="db-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M8 4v5" />
            </svg>
          </div>
          <h2>{title}</h2>
          <p>{description}</p>
          <span className="db-empty-note">Coming soon</span>
        </div>
      </div>
    </>
  );
}
