import { useEffect, useRef, useState } from 'react';

/** Money in thousands of USD: 412 → "$412K", 2610 → "$2.61M", -145 → "−$145K" */
export function money(k: number, opts: { sign?: boolean; decimals?: number } = {}) {
  const sign = k < 0 ? '−' : opts.sign && k > 0 ? '+' : '';
  const a = Math.abs(k);
  if (a >= 1000) return `${sign}$${(a / 1000).toFixed(2)}M`;
  const d = opts.decimals ?? (a < 10 && a % 1 !== 0 ? 1 : 0);
  return `${sign}$${a.toFixed(d)}K`;
}

export const pct = (v: number, d = 0) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v).toFixed(d)}%`;

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "Oct 19" */
export const md = (d: Date) => `${MO[d.getMonth()]} ${d.getDate()}`;
/** "Mon, Oct 19" */
export const wdMd = (d: Date) => `${WD[d.getDay()]}, ${md(d)}`;
export const weekday = (d: Date) => WD[d.getDay()];
export const monthName = (d: Date) => MO[d.getMonth()];

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
