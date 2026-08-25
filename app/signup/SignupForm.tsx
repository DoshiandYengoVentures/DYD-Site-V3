"use client";

import { useActionState } from "react";
import { signupAction } from "./actions";
import { initialSignupState } from "./state";

export default function SignupForm() {
  const [state, formAction] = useActionState(signupAction, initialSignupState);

  return (
    <form action={formAction} key={state.submitCount} noValidate>
      <div className={state.errors.businessName ? "db-field has-error" : "db-field"}>
        <label htmlFor="businessName">Business Name</label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          defaultValue={state.values.businessName}
          required
          autoFocus
        />
        {state.errors.businessName && <span className="db-field-error">{state.errors.businessName}</span>}
      </div>

      <div className={state.errors.contactName ? "db-field has-error" : "db-field"}>
        <label htmlFor="contactName">Your Name</label>
        <input type="text" id="contactName" name="contactName" defaultValue={state.values.contactName} required />
        {state.errors.contactName && <span className="db-field-error">{state.errors.contactName}</span>}
      </div>

      <div className={state.errors.email ? "db-field has-error" : "db-field"}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="username"
          defaultValue={state.values.email}
          required
        />
        {state.errors.email && <span className="db-field-error">{state.errors.email}</span>}
      </div>

      <div className={state.errors.phone ? "db-field has-error" : "db-field"}>
        <label htmlFor="phone">
          Phone Number <span className="db-field-optional">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          placeholder="(425) 555-0100"
          defaultValue={state.values.phone}
        />
        {state.errors.phone && <span className="db-field-error">{state.errors.phone}</span>}
      </div>

      <div className={state.errors.password ? "db-field has-error" : "db-field"}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" autoComplete="new-password" required />
        {state.errors.password && <span className="db-field-error">{state.errors.password}</span>}
      </div>

      <div className={state.errors.confirmPassword ? "db-field has-error" : "db-field"}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" autoComplete="new-password" required />
        {state.errors.confirmPassword && <span className="db-field-error">{state.errors.confirmPassword}</span>}
      </div>

      <div className="db-alert db-alert-info" role="status">
        After you create your account, we&apos;ll send a confirmation email to verify your address. You&apos;ll
        need to confirm it before you can sign in — a phone number just gives us another way to reach you.
      </div>

      <button type="submit" className="db-btn db-btn-primary db-btn-block">Create Account</button>
    </form>
  );
}
