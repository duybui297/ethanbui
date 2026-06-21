/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

/**
 * On-brand cover/OG image generator.
 *
 * Every article gets its OWN visual concept (palette + bespoke geometric
 * artwork + layout) instead of the old single dark-text template, so the
 * article cards never look repetitive. The concept is resolved from the
 * `slug` (preferred), then a keyword match on the title, then a deterministic
 * hash so even brand-new articles render a distinct cover automatically.
 *
 * Usage:
 *   /api/og?slug=...&title=...&eyebrow=...&variant=thumb   (card thumbnail, 4:3)
 *   /api/og?slug=...&title=...&eyebrow=...                 (social card, 1.91:1)
 */

const BG = '#0A0A0B';
const PANEL = '#16161A';
const LINE = '#33333A';
const TEXT = '#F5F5F7';
const SUB = '#8E8E93';

type ConceptId =
  | 'radar'
  | 'nodes'
  | 'pipeline'
  | 'terrain'
  | 'weekly'
  | 'receipt'
  | 'rings'
  | 'grid'
  | 'bars'
  | 'cards'
  | 'constellation';

const ACCENT: Record<ConceptId, string> = {
  radar: '#2DD4BF',
  nodes: '#7C7CFF',
  pipeline: '#38BDF8',
  terrain: '#F59E0B',
  weekly: '#34D399',
  receipt: '#FB7185',
  rings: '#A78BFA',
  grid: '#22D3EE',
  bars: '#F472B6',
  cards: '#FBBF24',
  constellation: '#60A5FA'
};

const GENERIC: ConceptId[] = ['rings', 'grid', 'bars', 'cards', 'constellation'];

// Exact slug → concept.
const SLUG_MAP: Record<string, ConceptId> = {
  'forward-deployed-engineer-self-assessment': 'radar',
  'coding-agent-as-a-team': 'nodes',
  'agent-team-process': 'pipeline',
  'agent-team-in-the-field': 'terrain',
  'weekly-sop-ai-code-review': 'weekly',
  'ai-automation-hidden-costs': 'receipt'
};

// Keyword → concept, used when no slug is supplied (e.g. an older stored
// og_image_url that only carries title + eyebrow).
const TITLE_RULES: Array<[RegExp, ConceptId]> = [
  [/real bill|whole workflow|hidden cost|invoice/i, 'receipt'],
  [/forward deployed|self-assessment|self assessment/i, 'radar'],
  [/as a team|like a team/i, 'nodes'],
  [/fooling itself|the process/i, 'pipeline'],
  [/in the field|botched/i, 'terrain'],
  [/code review|weekly sop/i, 'weekly']
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function pickConcept(slug: string, title: string): ConceptId {
  if (slug && SLUG_MAP[slug]) return SLUG_MAP[slug];
  for (const [re, id] of TITLE_RULES) if (re.test(title)) return id;
  return GENERIC[hash(slug + '|' + title) % GENERIC.length];
}

/* ------------------------------------------------------------------ */
/* Artwork — one bespoke SVG per concept. Kept to Satori-safe SVG      */
/* primitives (rect/circle/line/polyline/polygon/path, solid fills).   */
/* Canvas is 600 x 360.                                                */
/* ------------------------------------------------------------------ */

function Art({ concept, accent }: { concept: ConceptId; accent: string }) {
  const W = 600;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;

  switch (concept) {
    case 'radar': {
      const oct = (r: number) =>
        Array.from({ length: 8 }, (_, i) => {
          const a = (Math.PI / 4) * i - Math.PI / 2;
          return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
        }).join(' ');
      const prof = [140, 95, 130, 70, 120, 60, 110, 90]
        .map((r, i) => {
          const a = (Math.PI / 4) * i - Math.PI / 2;
          return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
        })
        .join(' ');
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {[150, 105, 60].map((r) => (
            <polygon key={r} points={oct(r)} fill="none" stroke={LINE} strokeWidth={2} />
          ))}
          {Array.from({ length: 8 }, (_, i) => {
            const a = (Math.PI / 4) * i - Math.PI / 2;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + 150 * Math.cos(a)}
                y2={cy + 150 * Math.sin(a)}
                stroke={LINE}
                strokeWidth={1.5}
              />
            );
          })}
          <polygon points={prof} fill={accent} fillOpacity={0.22} stroke={accent} strokeWidth={3} />
          {[140, 130, 120, 110].map((r, i) => {
            const a = (Math.PI / 4) * i - Math.PI / 2;
            return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={6} fill={accent} />;
          })}
        </svg>
      );
    }

    case 'nodes': {
      const outer = [
        [cx - 200, cy - 110],
        [cx + 200, cy - 110],
        [cx - 200, cy + 110],
        [cx + 200, cy + 110]
      ];
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {outer.map(([x, y], i) => (
            <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={LINE} strokeWidth={2.5} />
          ))}
          {outer.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={34} fill={PANEL} stroke={accent} strokeWidth={3} />
              <circle cx={x} cy={y} r={9} fill={accent} />
            </g>
          ))}
          <circle cx={cx} cy={cy} r={50} fill={accent} />
          <circle cx={cx} cy={cy} r={50} fill="none" stroke={BG} strokeWidth={6} />
          <circle cx={cx} cy={cy} r={14} fill={BG} />
        </svg>
      );
    }

    case 'pipeline': {
      const boxes = [80, 240, 400];
      const by = cy - 35;
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <path
            d={`M ${boxes[0] + 60} ${by - 30} C ${cx} ${by - 120}, ${cx} ${by - 120}, ${boxes[2] + 60} ${by - 30}`}
            fill="none"
            stroke={accent}
            strokeWidth={3}
            strokeDasharray="7 7"
          />
          {boxes.map((x, i) => (
            <g key={i}>
              <rect x={x} y={by} width={120} height={70} rx={14} fill={PANEL} stroke={accent} strokeWidth={3} />
              <circle cx={x + 24} cy={by + 35} r={9} fill={accent} />
              <line x1={x + 44} y1={by + 26} x2={x + 100} y2={by + 26} stroke={LINE} strokeWidth={5} />
              <line x1={x + 44} y1={by + 44} x2={x + 86} y2={by + 44} stroke={LINE} strokeWidth={5} />
              {i < 2 && (
                <polygon
                  points={`${x + 150},${by + 35} ${x + 130},${by + 25} ${x + 130},${by + 45}`}
                  fill={accent}
                />
              )}
            </g>
          ))}
        </svg>
      );
    }

    case 'terrain': {
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <path d={`M 0 300 L 120 250 L 240 285 L 360 210 L 480 250 L 600 180 L 600 360 L 0 360 Z`} fill={PANEL} />
          <polyline
            points="40,250 140,200 230,235 300,300 380,170 470,205 560,120"
            fill="none"
            stroke={accent}
            strokeWidth={5}
            strokeDasharray="3 10"
            strokeLinecap="round"
          />
          <circle cx={300} cy={300} r={11} fill={BG} stroke={accent} strokeWidth={4} />
          <line x1={560} y1={120} x2={560} y2={60} stroke={accent} strokeWidth={4} />
          <polygon points="560,60 560,92 600,76" fill={accent} />
        </svg>
      );
    }

    case 'weekly': {
      const cells = 7;
      const gap = 18;
      const size = 64;
      const totalW = cells * size + (cells - 1) * gap;
      const x0 = (W - totalW) / 2;
      const y0 = cy - size / 2;
      const checked = [true, true, false, true, true, true, false];
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {Array.from({ length: cells }, (_, i) => {
            const x = x0 + i * (size + gap);
            const on = checked[i];
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y0}
                  width={size}
                  height={size}
                  rx={14}
                  fill={on ? accent : PANEL}
                  stroke={on ? accent : LINE}
                  strokeWidth={3}
                />
                {on && (
                  <polyline
                    points={`${x + 16},${y0 + 34} ${x + 28},${y0 + 46} ${x + 50},${y0 + 18}`}
                    fill="none"
                    stroke={BG}
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </g>
            );
          })}
        </svg>
      );
    }

    case 'receipt': {
      const rx = cx - 110;
      const rw = 220;
      const ry = 50;
      const rh = 260;
      const rows = [90, 124, 158, 192];
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <rect x={rx} y={ry} width={rw} height={rh} rx={10} fill="#F5F5F7" />
          <polygon
            points={`${rx},${ry + rh} ${rx + 20},${ry + rh - 16} ${rx + 40},${ry + rh} ${rx + 60},${ry + rh - 16} ${rx + 80},${ry + rh} ${rx + 100},${ry + rh - 16} ${rx + 120},${ry + rh} ${rx + 140},${ry + rh - 16} ${rx + 160},${ry + rh} ${rx + 180},${ry + rh - 16} ${rx + 200},${ry + rh} ${rx + 220},${ry + rh - 16} ${rx + 220},${ry + rh + 24} ${rx},${ry + rh + 24}`}
            fill={BG}
          />
          {rows.map((ry2, i) => {
            const hidden = i >= 2;
            return (
              <g key={i}>
                <line
                  x1={rx + 22}
                  y1={ry2}
                  x2={rx + 130}
                  y2={ry2}
                  stroke={hidden ? '#C9CCD6' : '#3A3A40'}
                  strokeWidth={6}
                  strokeDasharray={hidden ? '8 7' : '0'}
                  strokeLinecap="round"
                />
                <line x1={rx + 150} y1={ry2} x2={rx + rw - 22} y2={ry2} stroke={accent} strokeWidth={6} strokeLinecap="round" />
              </g>
            );
          })}
          <rect x={rx + 16} y={ry + rh - 56} width={rw - 32} height={36} rx={8} fill={accent} />
        </svg>
      );
    }

    case 'rings': {
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {[150, 116, 82, 48].map((r, i) => (
            <circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={i % 2 ? accent : LINE}
              strokeWidth={i % 2 ? 5 : 2}
            />
          ))}
          <circle cx={cx} cy={cy} r={18} fill={accent} />
          <circle cx={cx + 150} cy={cy} r={10} fill={accent} />
          <circle cx={cx - 82} cy={cy} r={8} fill={accent} />
        </svg>
      );
    }

    case 'grid': {
      const cols = 7;
      const rows = 4;
      const gap = 46;
      const x0 = cx - ((cols - 1) * gap) / 2;
      const y0 = cy - ((rows - 1) * gap) / 2;
      const dots: Array<[number, number, boolean]> = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) dots.push([x0 + c * gap, y0 + r * gap, (r * cols + c) % 5 === 0]);
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {dots.map(([x, y, on], i) => (
            <circle key={i} cx={x} cy={y} r={on ? 12 : 6} fill={on ? accent : LINE} />
          ))}
        </svg>
      );
    }

    case 'bars': {
      const vals = [70, 130, 95, 175, 120, 210];
      const bw = 56;
      const gap = 24;
      const totalW = vals.length * bw + (vals.length - 1) * gap;
      const x0 = (W - totalW) / 2;
      const base = cy + 130;
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <line x1={x0 - 20} y1={base} x2={x0 + totalW + 20} y2={base} stroke={LINE} strokeWidth={3} />
          {vals.map((v, i) => (
            <rect
              key={i}
              x={x0 + i * (bw + gap)}
              y={base - v}
              width={bw}
              height={v}
              rx={8}
              fill={i === vals.length - 1 ? accent : PANEL}
              stroke={accent}
              strokeWidth={i === vals.length - 1 ? 0 : 3}
            />
          ))}
        </svg>
      );
    }

    case 'cards': {
      const offs = [-90, -45, 0, 45];
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {offs.map((o, i) => (
            <rect
              key={i}
              x={cx - 90 + o}
              y={cy - 110 + Math.abs(o) * 0.25}
              width={180}
              height={230}
              rx={18}
              fill={i === offs.length - 1 ? accent : PANEL}
              stroke={accent}
              strokeWidth={3}
              transform={`rotate(${o * 0.06} ${cx + o} ${cy})`}
            />
          ))}
        </svg>
      );
    }

    case 'constellation': {
      const pts: Array<[number, number]> = [
        [120, 110],
        [240, 180],
        [200, 280],
        [340, 120],
        [430, 230],
        [360, 300],
        [500, 160]
      ];
      const edges = [
        [0, 1],
        [1, 2],
        [1, 3],
        [3, 4],
        [4, 5],
        [3, 6],
        [4, 6]
      ];
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {edges.map(([a, b], i) => (
            <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={LINE} strokeWidth={2} />
          ))}
          {pts.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 13 : 8} fill={accent} />
          ))}
        </svg>
      );
    }
  }
}

function Identity({ small }: { small?: boolean }) {
  const s = small ? 28 : 34;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: s,
          height: s,
          borderRadius: 8,
          background: TEXT,
          color: BG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: s * 0.55
        }}
      >
        E
      </div>
      <div style={{ fontSize: small ? 20 : 22, color: SUB }}>Ethan (Duy) Bui</div>
    </div>
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Ethan (Duy) Bui';
  const eyebrow = searchParams.get('eyebrow') ?? 'AI in software delivery';
  const slug = searchParams.get('slug') ?? '';
  const variant = searchParams.get('variant');

  const concept = pickConcept(slug, title);
  const accent = ACCENT[concept];
  const bg = `radial-gradient(900px circle at 78% 18%, ${accent}26, transparent 55%), radial-gradient(700px circle at 12% 92%, ${accent}1A, transparent 50%), ${BG}`;

  // --- Card thumbnail (4:3): artwork on top, title below. ---
  if (variant === 'thumb') {
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
            background: bg,
            color: TEXT,
            fontFamily: 'system-ui'
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 600, color: accent, letterSpacing: 0.5 }}>
            {eyebrow}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Art concept={concept} accent={accent} />
          </div>
          <div
            style={{
              fontSize: 52,
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: -1.2,
              maxWidth: 1040
            }}
          >
            {title}
          </div>
        </div>
      ),
      { width: 1200, height: 900 }
    );
  }

  // --- Social card (1.91:1): artwork right, text left. ---
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: bg,
          color: TEXT,
          fontFamily: 'system-ui'
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 64
          }}
        >
          <Identity />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 22, color: accent, marginBottom: 16, fontWeight: 600 }}>
              {eyebrow}
            </div>
            <div
              style={{
                fontSize: 56,
                lineHeight: 1.08,
                fontWeight: 700,
                letterSpacing: -1.4,
                maxWidth: 620
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 4, background: accent }} />
            <div style={{ fontSize: 16, color: SUB }}>SOPs · Playbooks · Field notes</div>
          </div>
        </div>
        <div
          style={{
            width: 520,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Art concept={concept} accent={accent} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
