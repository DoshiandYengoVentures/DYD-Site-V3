"use client";

import { useRequestModal } from "./RequestModalProvider";

export default function NewRequestButton() {
  const { open } = useRequestModal();

  return (
    <button type="button" className="db-btn db-btn-primary" onClick={open}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
        <path d="M12 5v14" /><path d="M5 12h14" />
      </svg>
      <span>New Request</span>
    </button>
  );
}
