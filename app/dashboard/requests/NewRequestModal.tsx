"use client";

import { useActionState } from "react";
import { createRequestAction } from "./actions";
import { initialCreateRequestState } from "./state";
import { REQUEST_CATEGORIES, REQUEST_PRIORITIES } from "@/lib/requests/types";

export default function NewRequestModal() {
  const [state, formAction] = useActionState(createRequestAction, initialCreateRequestState);
  const hasErrors = Object.keys(state.errors).length > 0;

  return (
    <div
      className={hasErrors ? "db-modal-overlay is-open" : "db-modal-overlay"}
      data-request-modal-overlay
    >
      <div className="db-modal" role="dialog" aria-modal="true" aria-labelledby="newRequestTitle">
        <div className="db-modal-header">
          <h2 id="newRequestTitle">New Request</h2>
          <button type="button" className="db-modal-close" data-close-request-modal aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form action={formAction} key={state.submitCount} noValidate>
          <div className={state.errors.title ? "db-field has-error" : "db-field"}>
            <label htmlFor="requestTitle">Title</label>
            <input type="text" id="requestTitle" name="title" maxLength={140} defaultValue={state.values.title} required />
            {state.errors.title && <span className="db-field-error">{state.errors.title}</span>}
          </div>

          <div className={state.errors.description ? "db-field has-error" : "db-field"}>
            <label htmlFor="requestDescription">Description</label>
            <textarea id="requestDescription" name="description" rows={4} defaultValue={state.values.description} required />
            {state.errors.description && <span className="db-field-error">{state.errors.description}</span>}
          </div>

          <div className="db-field-row">
            <div className={state.errors.category ? "db-field has-error" : "db-field"}>
              <label htmlFor="requestCategory">Category</label>
              <select id="requestCategory" name="category" defaultValue={state.values.category} required>
                <option value="">Select a category</option>
                {REQUEST_CATEGORIES.map((c) => (
                  <option value={c.value} key={c.value}>{c.label}</option>
                ))}
              </select>
              {state.errors.category && <span className="db-field-error">{state.errors.category}</span>}
            </div>

            <div className={state.errors.priority ? "db-field has-error" : "db-field"}>
              <label htmlFor="requestPriority">Priority</label>
              <select id="requestPriority" name="priority" defaultValue={state.values.priority} required>
                <option value="">Select a priority</option>
                {REQUEST_PRIORITIES.map((p) => (
                  <option value={p.value} key={p.value}>{p.label}</option>
                ))}
              </select>
              {state.errors.priority && <span className="db-field-error">{state.errors.priority}</span>}
            </div>
          </div>

          <div className="db-modal-actions">
            <button type="button" className="db-btn db-btn-secondary" data-close-request-modal>Cancel</button>
            <button type="submit" className="db-btn db-btn-primary">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
