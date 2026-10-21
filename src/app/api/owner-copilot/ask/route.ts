import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const MODEL = 'gemini-flash-latest';

const SYSTEM = `Bạn là trợ lý tài chính của chủ một công ty phân phối vật liệu xây dựng.
Trả lời bằng tiếng Việt, xưng "tôi" và gọi chủ doanh nghiệp là "anh". Ngắn gọn: tối đa 5 câu hoặc 4 gạch đầu dòng.
Luôn dùng số liệu cụ thể từ DATA (đơn vị là triệu đồng; viết dạng 150 tr, từ 1.000 trở lên viết dạng 2,61 tỷ).
Kết thúc bằng một việc cụ thể nên làm ngay.
Không bịa số liệu không có trong DATA; nếu thiếu thông tin thì nói rõ.`;

const Schema = z.object({
  question: z.string().min(1).max(500).trim(),
  // Sample-data snapshot built by the Owner Copilot client (lib/ai.ts).
  context: z.string().max(20000)
});

/**
 * Gemini proxy for the Owner Copilot product (public/products/owner-copilot).
 * Keeps GEMINI_API_KEY server-side. Only signed-in product users may call it,
 * so the key can't be used as a free public endpoint. Any non-200 makes the
 * client fall back to its built-in rule-based answers.
 */
export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'AI not configured' }, { status: 503 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { question, context } = parsed.data;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [
            { role: 'user', parts: [{ text: `DATA:\n${context}\n\nOWNER'S QUESTION: ${question}` }] }
          ]
        })
      }
    );
    if (!res.ok) {
      console.error('gemini error', res.status, await res.text());
      return NextResponse.json({ error: 'AI error' }, { status: 502 });
    }
    const data = await res.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') ?? '';
    return NextResponse.json({ text: text.trim() });
  } catch (e) {
    console.error('gemini error', e);
    return NextResponse.json({ error: 'AI error' }, { status: 502 });
  }
}
