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
