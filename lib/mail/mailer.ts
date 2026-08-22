import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
    throw new Error("MAIL_USERNAME and MAIL_PASSWORD must be set to send email.");
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendMail(to: string, subject: string, html: string): Promise<void> {
  const from = process.env.MAIL_USERNAME;
  await getTransporter().sendMail({
    from: `"Doshi and Yengo Digital" <${from}>`,
    to,
    subject,
    html,
  });
}
