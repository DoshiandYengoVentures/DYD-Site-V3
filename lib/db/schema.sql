-- Run this once against the Vercel Postgres database (via its dashboard
-- query editor) before the Requests feature is used.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'SUBMITTED',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS requests_username_idx ON requests (username);

-- Customer accounts (self-service sign-up). Accounts start unconfirmed and
-- can't sign in until email_confirmed is set to true (see the confirmation
-- flow that gates login in lib/auth/auth.ts).

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  password_hash TEXT NOT NULL,
  email_confirmed BOOLEAN NOT NULL DEFAULT false,
  confirmation_token UUID NOT NULL DEFAULT gen_random_uuid(),
  confirmation_token_expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '15 minutes'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users (lower(email));

-- Added for Part 2 (email confirmation). Safe to re-run: adds the column
-- only if this table already existed from an earlier deployment.
ALTER TABLE users ADD COLUMN IF NOT EXISTS confirmation_token_expires_at
  TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '15 minutes');

-- Added for the Account page's Business Profile section. Safe to re-run.
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;

-- Added for the Owner (internal admin) dashboard. Every account defaults to
-- CUSTOMER; the single OWNER account is seeded separately (see
-- scripts/README or the setup notes — never via the public sign-up flow).
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'CUSTOMER';

-- Messages, shared by the customer dashboard's Messages page and the owner
-- dashboard's Messages page - the same rows, two read/write surfaces.
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  sender TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS messages_user_email_idx ON messages (lower(user_email));

-- Unread state for notification badges. NULL = unread. A message's
-- recipient is always the other party (sender='client' -> the owner;
-- sender='team' -> that row's customer), so one column is unambiguous.
ALTER TABLE messages ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ;

-- Public marketing-site contact form submissions. Not tied to a customer
-- account - anyone can submit one, including non-customers.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_submissions_submitted_at_idx ON contact_submissions (submitted_at DESC);
