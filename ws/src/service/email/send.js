import nodemailer from 'nodemailer';
import { env } from '../../config';

export default async ({ to, subject, body }) => {
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USERNAME,
      pass: env.SMTP_PASSWORD,
    },
  });

  await transport.sendMail({
    from: `"${env.EMAIL_FROM_NAME}" <${env.EMAIL_FROM}>`,
    to,
    subject,
    html: body,
  });
};
