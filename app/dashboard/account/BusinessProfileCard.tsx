"use client";

import { useActionState, useEffect, useState } from "react";
import { updateProfileAction } from "./actions";
import type { ProfileState } from "./state";

export default function BusinessProfileCard({
  email,
  isDemo,
  initialValues,
}: {
  email: string;
  isDemo: boolean;
  initialValues: { businessName: string; contactName: string; phone: string };
}) {
  const initialState: ProfileState = {
    submitCount: 0,
    errors: {},
    values: initialValues,
    success: false,
  };
  const [state, formAction] = useActionState(updateProfileAction, initialState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (state.success) setIsEditing(false);
  }, [state.submitCount, state.success]);

  return (
    <div className="db-panel">
      <div className="db-panel-header">
        <h2>Business Profile</h2>
        {!isEditing && !isDemo && (
          <button type="button" className="db-panel-link" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>

      {isDemo && (
        <div className="db-alert db-alert-info" role="status">
          Profile editing isn&apos;t available on the demo account.
        </div>
      )}
      {!isDemo && state.success && !isEditing && (
        <div className="db-alert db-alert-info" role="status">
          Changes saved.
        </div>
      )}

      {isEditing ? (
        <form action={formAction} key={state.submitCount} noValidate>
          <div className={state.errors.businessName ? "db-field has-error" : "db-field"}>
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              defaultValue={state.values.businessName}
              required
            />
            {state.errors.businessName && <span className="db-field-error">{state.errors.businessName}</span>}
          </div>

          <div className={state.errors.contactName ? "db-field has-error" : "db-field"}>
            <label htmlFor="contactName">Contact Name</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              defaultValue={state.values.contactName}
              required
            />
            {state.errors.contactName && <span className="db-field-error">{state.errors.contactName}</span>}
          </div>

          <div className="db-field">
            <label htmlFor="profileEmail">Email</label>
            <input type="email" id="profileEmail" value={email} disabled readOnly />
          </div>

          <div className={state.errors.phone ? "db-field has-error" : "db-field"}>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(000) 000-0000"
              defaultValue={state.values.phone}
            />
            {state.errors.phone && <span className="db-field-error">{state.errors.phone}</span>}
          </div>

          <div className="db-modal-actions">
            <button type="button" className="db-btn db-btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button type="submit" className="db-btn db-btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="db-detail-grid">
          <div className="db-detail-item">
            <div className="db-detail-label">Business Name</div>
            <div className="db-detail-value">{state.values.businessName}</div>
          </div>
          <div className="db-detail-item">
            <div className="db-detail-label">Contact Name</div>
            <div className="db-detail-value">{state.values.contactName}</div>
          </div>
          <div className="db-detail-item">
            <div className="db-detail-label">Email</div>
            <div className="db-detail-value">{email}</div>
          </div>
          <div className="db-detail-item">
            <div className="db-detail-label">Phone</div>
            <div className="db-detail-value">{state.values.phone || "—"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
