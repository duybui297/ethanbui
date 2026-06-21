import 'server-only';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { getGatedProduct } from '@/lib/products';

type RecordArgs = {
  email: string;
  productId: string;
  provider: 'google' | 'facebook' | 'email';
  locale?: 'en' | 'vi';
};

/**
 * Record that a person passed a product auth gate, tagging them with the
 * product they came from. Reuses the existing `subscribers` table so the
 * admin Subscribers list shows everyone in one place.
 *
 * We do NOT push these into Beehiiv — they're product users, not newsletter
 * sign-ups. We also avoid clobbering an existing newsletter subscriber's
 * `source`: if the email already exists we only stamp the product fields.
 */
export async function recordProductAccess({
  email,
  productId,
  provider,
  locale = 'en'
}: RecordArgs): Promise<void> {
  const product = getGatedProduct(productId);
  if (!product) return; // unknown product id — ignore silently

  const normEmail = email.trim().toLowerCase();
  if (!normEmail) return;

  const supabase = createSupabaseAdminClient();

  const { data: existing } = await supabase
    .from('subscribers')
    .select('id, source_product')
    .eq('email', normEmail)
    .maybeSingle();

  if (existing) {
    // Only stamp the product on first product sign-up; keep any newsletter data.
    await supabase
      .from('subscribers')
      .update({
        source_product: existing.source_product ?? product.id,
        auth_provider: provider,
        product_first_seen_at: new Date().toISOString()
      })
      .eq('id', existing.id);
    return;
  }

  await supabase.from('subscribers').insert({
    email: normEmail,
    locale,
    source: 'product-auth',
    source_product: product.id,
    auth_provider: provider,
    product_first_seen_at: new Date().toISOString()
  });
}
