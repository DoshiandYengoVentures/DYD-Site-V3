"use client";

import { useActionState } from "react";
import { submitContact } from "./actions";
import { initialContactFormState } from "./state";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactFormState);

  return (
    <form action={formAction} key={state.submitCount} noValidate>
      <div className="form-grid">
        <div className={state.errors.name ? "form-field has-error" : "form-field"}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" autoComplete="name" defaultValue={state.values.name} required />
          {state.errors.name && <span className="field-error">{state.errors.name}</span>}
        </div>

        <div className={state.errors.email ? "form-field has-error" : "form-field"}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" autoComplete="email" defaultValue={state.values.email} required />
          {state.errors.email && <span className="field-error">{state.errors.email}</span>}
        </div>

        <div className={state.errors.phone ? "form-field form-field--full has-error" : "form-field form-field--full"}>
          <label htmlFor="phone">Phone <span className="mono-label">(optional)</span></label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" defaultValue={state.values.phone} />
        </div>

        <div className={state.errors.message ? "form-field form-field--full has-error" : "form-field form-field--full"}>
          <label htmlFor="message">What do you need help with?</label>
          <textarea id="message" name="message" defaultValue={state.values.message} required />
          {state.errors.message && <span className="field-error">{state.errors.message}</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "24px" }}>
        Send Message
      </button>
    </form>
  );
}
