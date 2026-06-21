import 'server-only';
import { Resend } from 'resend';

/**
 * Adds a person to the Resend "audience" (Contacts) — used to auto-subscribe
 * anyone who registers through a product auth gate.
 *
 * IMPORTANT: the Resend Contacts/Audiences API requires a FULL-ACCESS API key.
 * The default RESEND_API_KEY used for sending transactional email may be
 * "sending access" only. Set RESEND_CONTACTS_API_KEY to a full-access key to
 * enable this (falls back to RESEND_API_KEY otherwise). Optionally set
 * RESEND_AUDIENCE_ID to skip the lookup; otherwise the first audience is used.
 *
 * Best-effort by design: every failure is swallowed so it can never block the
 * sign-in flow.
 */
function getContactsClient(): Resend | null {
  const key = process.env.RESEND_CONTACTS_API_KEY || process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Cache the resolved audience id for the lifetime of the server instance.
let cachedAudienceId: string | null | undefined;

async function resolveAudienceId(resend: Resend): Promise<string | null> {
  if (process.env.RESEND_AUDIENCE_ID) return process.env.RESEND_AUDIENCE_ID;
  if (cachedAudienceId !== undefined) return cachedAudienceId;
  try {
    const res = await resend.audiences.list();
    cachedAudienceId = res.data?.data?.[0]?.id ?? null;
  } catch {
    cachedAudienceId = null;
  }
  return cachedAudienceId;
}

export async function addResendContact(input: {
  email: string;
  firstName?: string;
  lastName?: string;
}): Promise<{ ok: boolean; skipped?: boolean }> {
  const resend = getContactsClient();
  if (!resend) return { ok: false, skipped: true };

  const audienceId = await resolveAudienceId(resend);
  if (!audienceId) return { ok: false, skipped: true };

  try {
    await resend.contacts.create({
      audienceId,
      email: input.email.trim().toLowerCase(),
      unsubscribed: false,
      firstName: input.firstName,
      lastName: input.lastName
    });
    return { ok: true };
  } catch (e) {
    // Already-exists (409) and permission errors land here — never block auth.
    console.error('[resend] addResendContact failed', e);
    return { ok: false };
  }
}
