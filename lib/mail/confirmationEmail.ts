import { sendMail } from "./mailer";

function getAppUrl(): string {
  return process.env.APP_URL ?? "http://localhost:3000";
}

function confirmationHtml(contactName: string, confirmUrl: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; padding: 32px 16px;">
      <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 32px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 24px;">
          <span style="display: inline-block; width: 28px; height: 28px; background: #2563eb; border-radius: 8px;"></span>
          <span style="font-weight: 700; font-size: 15px; color: #0f172a;">Doshi and Yengo Digital</span>
        </div>

        <h1 style="font-size: 20px; color: #0f172a; margin: 0 0 12px;">Welcome, ${contactName}!</h1>
        <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 24px;">
          Thanks for creating an account. Confirm your email to activate your account and get access to your client dashboard.
        </p>

        <a href="${confirmUrl}"
           style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 10px;">
          Confirm My Account
        </a>

        <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 24px 0 0;">
          This link expires in 15 minutes. If it expires, you can request a new one from the sign-in page.
        </p>
        <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 8px 0 0;">
          If you didn&apos;t create this account, you can safely ignore this email.
        </p>
      </div>
    </div>
  `;
}

export async function sendConfirmationEmail(to: string, contactName: string, token: string): Promise<void> {
  const confirmUrl = `${getAppUrl()}/confirm?token=${token}`;
  await sendMail(to, "Confirm your Doshi and Yengo Digital account", confirmationHtml(contactName, confirmUrl));
}
