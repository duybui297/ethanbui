import 'server-only';
import { Resend } from 'resend';

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendLeadNotification(input: {
  intent: string;
  name: string;
  email: string;
  company?: string | null;
  brief: string;
  locale: string;
}) {
  const resend = getResend();
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM ?? 'Ethan <onboarding@resend.dev>';
  if (!resend || !to) return { skipped: true };
  await resend.emails.send({
    from,
    to,
    subject: `[Lead] ${input.intent}: ${input.name}`,
    text: [
      `Intent:  ${input.intent}`,
      `Name:    ${input.name}`,
      `Email:   ${input.email}`,
      `Company: ${input.company ?? '-'}`,
      `Locale:  ${input.locale}`,
      '',
      input.brief
    ].join('\n')
  });
  return { ok: true };
}

export async function sendLeadAck(input: { to: string; locale: string }) {
  const resend = getResend();
  const from = process.env.RESEND_FROM ?? 'Ethan <onboarding@resend.dev>';
  if (!resend) return { skipped: true };
  const en = {
    subject: 'Got your message',
    body:
      "Thanks for reaching out. I read every message and will reply within 1 business day.\n\nEthan"
  };
  const vi = {
    subject: 'Đã nhận tin nhắn',
    body:
      'Cảm ơn bạn đã liên hệ. Tôi đọc mọi tin nhắn và sẽ trả lời trong 1 ngày làm việc.\n\nEthan'
  };
  const c = input.locale === 'vi' ? vi : en;
  await resend.emails.send({ from, to: input.to, subject: c.subject, text: c.body });
  return { ok: true };
}
