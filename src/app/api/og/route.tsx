/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Ethan (Duy) Bui';
  const eyebrow = searchParams.get('eyebrow') ?? 'AI in software delivery';
  // `variant=thumb` centers the content so the image still reads when it's
  // cropped to a small card thumbnail (the article list crops to ~4:3).
  const variant = searchParams.get('variant');

  if (variant === 'thumb') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 72,
            background: '#0A0A0B',
            color: '#F5F5F7',
            fontFamily: 'system-ui'
          }}
        >
          <div style={{ fontSize: 26, color: '#7C7CFF', marginBottom: 24 }}>
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.12,
              fontWeight: 700,
              letterSpacing: -1.4,
              maxWidth: 980
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 40,
              fontSize: 22,
              color: '#8E8E93'
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                background: '#F5F5F7',
                color: '#0A0A0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 18
              }}
            >
              E
            </div>
            Ethan (Duy) Bui
          </div>
        </div>
      ),
      { width: 1200, height: 900 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: '#0A0A0B',
          color: '#F5F5F7',
          fontFamily: 'system-ui'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#F5F5F7',
              color: '#0A0A0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700
            }}
          >
            E
          </div>
          <div style={{ fontSize: 22, color: '#8E8E93' }}>Ethan (Duy) Bui</div>
        </div>
        <div>
          <div style={{ fontSize: 20, color: '#7C7CFF', marginBottom: 16 }}>
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 60,
              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: -1.2,
              maxWidth: 1000
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 32, height: 4, background: '#7C7CFF' }} />
          <div style={{ fontSize: 16, color: '#8E8E93' }}>SOPs · Playbooks · Field notes</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
