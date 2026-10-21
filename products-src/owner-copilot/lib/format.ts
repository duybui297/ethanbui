import { useEffect, useRef, useState } from 'react';

/** Vietnamese decimal: 2.61 → "2,61" */
const vn = (n: number, d: number) => n.toFixed(d).replace('.', ',');

/** Money in millions of VND: 412 → "412 tr", 2610 → "2,61 tỷ", -145 → "−145 tr" */
export function money(m: number, opts: { sign?: boolean; decimals?: number } = {}) {
  const sign = m < 0 ? '−' : opts.sign && m > 0 ? '+' : '';
  const a = Math.abs(m);
  if (a >= 1000) return `${sign}${vn(a / 1000, 2)} tỷ`;
  const d = opts.decimals ?? (a < 10 && a % 1 !== 0 ? 1 : 0);
  return `${sign}${vn(a, d)} tr`;
}

export const pct = (v: number, d = 0) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${vn(Math.abs(v), d)}%`;

const WD = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const WD_LONG = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
/** "19/10" */
export const md = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}`;
/** "Thứ Hai, 19/10" */
export const wdMd = (d: Date) => `${WD_LONG[d.getDay()]}, ${md(d)}`;
export const weekday = (d: Date) => WD[d.getDay()];
export const monthName = (d: Date) => `Th${d.getMonth() + 1}`;

/** Animates a number from its previous value to the new one */
export function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const f0 = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      setV(f0 + (target - f0) * e);
      if (k < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); from.current = target; };
  }, [target, ms]);
  return v;
}
