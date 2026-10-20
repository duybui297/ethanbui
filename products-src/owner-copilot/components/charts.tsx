import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ForecastPoint } from '../lib/finance';
import { money, monthName, wdMd } from '../lib/format';

/* Track an element's rendered width so SVG text stays at real pixel size */
function useWidth<T extends HTMLElement>(fallback: number) {
  const ref = useRef<T>(null);
  const [w, setW] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width) || fallback));
    ro.observe(el);
    return () => ro.disconnect();
  }, [fallback]);
  return [ref, w] as const;
}

/* =========================================================
   Cash forecast — green area above zero, red area below
   ========================================================= */
export function ForecastChart({ points, ghost, height = 280 }: { points: ForecastPoint[]; ghost?: ForecastPoint[]; height?: number }) {
  const [wrap, cw] = useWidth<HTMLDivElement>(760);
  const narrow = cw < 520;
  const W = Math.max(280, cw), H = narrow ? Math.round(height * 0.8) : height, L = narrow ? 44 : 52, R = 14, T = 18, B = 30;
  const [hover, setHover] = useState<number | null>(null);

  const all = [...points, ...(ghost ?? [])].map((p) => p.cash);
  const yMin = Math.min(-60, Math.floor(Math.min(...all) / 100) * 100);
  const yMax = Math.max(200, Math.ceil(Math.max(...all) / 100) * 100);
  const x = (d: number) => L + (d / (points.length - 1)) * (W - L - R);
  const y = (v: number) => T + ((yMax - v) / (yMax - yMin)) * (H - T - B);
  const zero = y(0);

  const line = (pts: ForecastPoint[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.day).toFixed(1)},${y(p.cash).toFixed(1)}`).join('');
  const d = line(points);
  const area = `${d}L${x(points.length - 1)},${zero}L${x(0)},${zero}Z`;

  const ticks = useMemo(() => {
    const step = (yMax - yMin) / (narrow ? 200 : 100) > 8 ? (narrow ? 400 : 200) : (narrow ? 200 : 100);
    const t: number[] = [];
    for (let v = Math.ceil(yMin / step) * step; v <= yMax; v += step) t.push(v);
    return t;
  }, [yMin, yMax, narrow]);
  const months = points.filter((p) => p.date.getDate() === 1);
  const markers = points.filter((p) => p.events.some((e) => Math.abs(e.amt) >= 40));

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const px = ((cx - r.left) / r.width) * W;
    const day = Math.round(((px - L) / (W - L - R)) * (points.length - 1));
    setHover(Math.max(0, Math.min(points.length - 1, day)));
  };
  const hp = hover != null ? points[hover] : null;

  return (
    <div className="chart" ref={wrap} onMouseMove={onMove} onTouchMove={onMove} onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img" aria-label="90-day cash forecast chart">
        <defs>
          <linearGradient id="gUp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--good)" stopOpacity=".35" /><stop offset="1" stopColor="var(--good)" stopOpacity="0" /></linearGradient>
          <linearGradient id="gDn" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="var(--bad)" stopOpacity=".5" /><stop offset="1" stopColor="var(--bad)" stopOpacity=".05" /></linearGradient>
          <clipPath id="cUp"><rect x="0" y="0" width={W} height={zero} /></clipPath>
          <clipPath id="cDn"><rect x="0" y={zero} width={W} height={H - zero} /></clipPath>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className={t === 0 ? 'axis-zero' : 'grid'} />
            <text x={L - 8} y={y(t) + 4} className="tick" textAnchor="end">{t === 0 ? '$0' : money(t)}</text>
          </g>
        ))}
        {months.map((p) => (
          <g key={p.day}>
            <line x1={x(p.day)} x2={x(p.day)} y1={T} y2={H - B} className="grid dashed" />
            <text x={x(p.day) + 4} y={H - 10} className="tick">{monthName(p.date)}</text>
          </g>
        ))}
        <text x={x(0)} y={H - 10} className="tick">Today</text>

        {ghost && <path d={line(ghost)} className="ghost" />}
        <path d={area} fill="url(#gUp)" clipPath="url(#cUp)" className="morph" />
        <path d={area} fill="url(#gDn)" clipPath="url(#cDn)" className="morph" />
        <path d={d} pathLength={1} className="fline up morph" clipPath="url(#cUp)" />
        <path d={d} pathLength={1} className="fline dn morph" clipPath="url(#cDn)" />

        {markers.map((p) => (
          <circle key={p.day} cx={x(p.day)} cy={y(p.cash)} r="3.5" className={p.cash < 0 ? 'mk bad' : 'mk'} />
        ))}
        {hp && (
          <g>
            <line x1={x(hp.day)} x2={x(hp.day)} y1={T} y2={H - B} className="cursor" />
            <circle cx={x(hp.day)} cy={y(hp.cash)} r="6" className={hp.cash < 0 ? 'dot bad' : 'dot'} />
          </g>
        )}
      </svg>
      {hp && (
        <div className="tip" style={{ left: `${(x(hp.day) / W) * 100}%`, transform: `translateX(${x(hp.day) > W / 2 ? '-105%' : '8%'})` }}>
          <div className="tip-d">{wdMd(hp.date)}</div>
          <div className={`tip-v ${hp.cash < 0 ? 'bad' : ''}`}>{money(hp.cash)}</div>
          {hp.events.map((e) => <div key={e.label} className="tip-e">{money(e.amt, { sign: true })} · {e.label}</div>)}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Waterfall — why profit changed
   ========================================================= */
export function Waterfall({ start, end, startLabel, endLabel, drivers, onPick, picked }: {
  start: number; end: number; startLabel: string; endLabel: string;
  drivers: { label: string; value: number }[]; onPick?: (i: number) => void; picked?: number | null;
}) {
  const lo = Math.floor((Math.min(start, end) - 70) / 50) * 50;
  const hi = Math.ceil((Math.max(start, end) + 30) / 50) * 50;
  const pos = (v: number) => ((v - lo) / (hi - lo)) * 100;
  let run = start;
  const rows = drivers.map((d) => { const a = run; run += d.value; return { ...d, a, b: run }; });

  return (
    <div className="wf">
      <div className="wf-row total">
        <div className="wf-l">{startLabel}</div>
        <div className="wf-track"><div className="wf-bar base" style={{ left: 0, width: `${pos(start)}%` }} /><span className="wf-v" style={{ left: `${pos(start)}%` }}>{money(start)}</span></div>
      </div>
      {rows.map((r, i) => {
        const l = pos(Math.min(r.a, r.b)), w = Math.abs(pos(r.b) - pos(r.a));
        return (
          <button key={r.label} className={`wf-row ${picked === i ? 'on' : ''}`} onClick={() => onPick?.(i)} style={{ animationDelay: `${i * 70}ms` }}>
            <div className="wf-l">{r.label}</div>
            <div className="wf-track">
              <div className="wf-conn" style={{ left: `${pos(r.a)}%` }} />
              <div className={`wf-bar ${r.value < 0 ? 'neg' : 'pos'}`} style={{ left: `${l}%`, width: `${Math.max(w, 0.8)}%` }} />
              <span className={`wf-v ${r.value < 0 ? 'bad' : 'good'}`} style={{ left: `${l + w}%` }}>{money(r.value, { sign: true })}</span>
            </div>
          </button>
        );
      })}
      <div className="wf-row total">
        <div className="wf-l">{endLabel}</div>
        <div className="wf-track"><div className="wf-bar base end" style={{ left: 0, width: `${pos(end)}%` }} /><span className="wf-v" style={{ left: `${pos(end)}%` }}>{money(end)}</span></div>
      </div>
      <div className="wf-axis"><span>{money(lo)}</span><span>zoomed in to show the gaps</span><span>{money(hi)}</span></div>
    </div>
  );
}

/* =========================================================
   Profit on paper vs cash collected
   ========================================================= */
export function PaperCash({ data }: { data: { m: string; paper: number; cash: number }[] }) {
  const [wrap, cw] = useWidth<HTMLDivElement>(520);
  const W = Math.max(260, cw), H = 220, L = 8, B = 26, T = 22;
  const max = Math.ceil(Math.max(...data.map((d) => d.paper)) / 50) * 50 + 20;
  const bw = (W - L * 2) / data.length;
  const y = (v: number) => T + (1 - v / max) * (H - T - B);
  return (
    <div ref={wrap} className="pc">
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img" aria-label="Profit on paper vs cash collected by month">
      {data.map((d, i) => {
        const cx = L + bw * i + bw / 2;
        const last = i === data.length - 1;
        return (
          <g key={d.m} className="pc-g" style={{ animationDelay: `${i * 80}ms` }}>
            <rect x={cx - 22} y={y(d.paper)} width="20" height={H - B - y(d.paper)} rx="4" className="pc-paper" />
            <rect x={cx + 2} y={y(d.cash)} width="20" height={H - B - y(d.cash)} rx="4" className={`pc-cash ${last ? 'last' : ''}`} />
            <text x={cx} y={H - 8} textAnchor="middle" className={`tick ${last ? 'strong' : ''}`}>{d.m}</text>
            {last && <text x={cx + 12} y={y(d.cash) - 6} textAnchor="middle" className="pc-lab">{d.cash}</text>}
            {last && <text x={cx - 12} y={y(d.paper) - 6} textAnchor="middle" className="pc-lab muted">{d.paper}</text>}
          </g>
        );
      })}
    </svg>
    </div>
  );
}

/* =========================================================
   Small sparkline
   ========================================================= */
export function Spark({ values, w = 120, h = 36, tone = 'good' }: { values: number[]; w?: number; h?: number; tone?: 'good' | 'bad' | 'brand' }) {
  const mn = Math.min(...values), mx = Math.max(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - 3 - ((v - mn) / (mx - mn || 1)) * (h - 6)}`);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={`spark ${tone}`} aria-hidden>
      <polyline points={pts.join(' ')} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={pts[pts.length - 1].split(',')[1]} r="2.5" />
    </svg>
  );
}
