import 'server-only';

export type SubscribeInput = {
  email: string;
  locale?: 'en' | 'vi';
  source?: string;
};

export async function subscribeToBeehiiv(input: SubscribeInput) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) {
    console.warn('[beehiiv] missing API key or publication id; skipping');
    return { ok: true, skipped: true } as const;
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        email: input.email,
        reactivate_existing: true,
        // Double opt-in is enabled on the Beehiiv publication. Beehiiv sends the
        // confirmation email, holds the subscriber as "pending", then fires the
        // welcome preset after they confirm. Keep this false so we don't trigger
        // a second, duplicate welcome from the API side.
        send_welcome_email: false,
        utm_source: input.source ?? 'site',
        custom_fields: input.locale ? [{ name: 'locale', value: input.locale }] : undefined
      })
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`beehiiv subscribe failed: ${res.status} ${text}`);
  }

  const json = (await res.json()) as { data?: { id?: string } };
  return { ok: true, id: json.data?.id } as const;
}
