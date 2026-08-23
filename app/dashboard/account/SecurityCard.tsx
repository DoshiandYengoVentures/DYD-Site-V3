"use client";

import { useActionState } from "react";
import { changePasswordAction } from "./actions";
import { initialPasswordState } from "./state";

export default function SecurityCard({ email, isDemo }: { email: string; isDemo: boolean }) {
  const [state, formAction] = useActionState(changePasswordAction, initialPasswordState);

  return (
    <div className="db-panel">
      <div className="db-panel-header">
        <h2>Login &amp; Security</h2>
      </div>

      <div className="db-field">
        <label htmlFor="securityEmail">Email</label>
        <input type="email" id="securityEmail" value={email} disabled readOnly />
      </div>

      {isDemo ? (
        <div className="db-alert db-alert-info" role="status">
          Password changes aren&apos;t available on the demo account.
        </div>
      ) : (
        <>
          {state.success && (
            <div className="db-alert db-alert-info" role="status">
              Your password has been updated.
            </div>
          )}

          <form action={formAction} key={state.submitCount} noValidate>
            <div className={state.errors.currentPassword ? "db-field has-error" : "db-field"}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                autoComplete="current-password"
                required
              />
              {state.errors.currentPassword && (
                <span className="db-field-error">{state.errors.currentPassword}</span>
              )}
            </div>

            <div className="db-field-row">
              <div className={state.errors.newPassword ? "db-field has-error" : "db-field"}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  autoComplete="new-password"
                  required
                />
                {state.errors.newPassword && <span className="db-field-error">{state.errors.newPassword}</span>}
              </div>

              <div className={state.errors.confirmPassword ? "db-field has-error" : "db-field"}>
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                />
                {state.errors.confirmPassword && (
                  <span className="db-field-error">{state.errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <button type="submit" className="db-btn db-btn-primary">
              Change Password
            </button>
          </form>
        </>
      )}
    </div>
  );
}
