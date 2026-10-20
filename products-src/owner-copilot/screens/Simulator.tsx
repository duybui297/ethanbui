import React, { useMemo, useState } from 'react';
import { baseScenario, forecast, forecastStats, monthlyProfit, runwayDays, Scenario } from '../lib/finance';
import { money, useCountUp, wdMd } from '../lib/format';
import { ForecastChart } from '../components/charts';
import { Icon, SectionTitle } from '../components/ui';

type K = 'priceUpPct' | 'customerLossPct' | 'opexCutPct' | 'loan' | 'collectOverduePct';
const SLIDERS: { k: K; label: string; min: number; max: number; step: number; fmt: (v: number) => string; hint: string }[] = [
  { k: 'priceUpPct', label: 'Raise prices', min: 0, max: 10, step: 0.5, fmt: (v) => `${v}%`, hint: 'Across all products' },
  { k: 'customerLossPct', label: 'Customers lost from price rise', min: 0, max: 30, step: 1, fmt: (v) => `${v}%`, hint: 'Volume drops by the same amount' },
  { k: 'opexCutPct', label: 'Cut fixed costs', min: 0, max: 25, step: 1, fmt: (v) => `${v}%`, hint: 'Warehouse, trucks, office, staff' },
  { k: 'collectOverduePct', label: 'Collect overdue within 14 days', min: 0, max: 100, step: 5, fmt: (v) => `${v}%`, hint: 'Of the $284K hard-to-collect debt' },
  { k: 'loan', label: 'Bank loan (9%/year)', min: 0, max: 800, step: 50, fmt: (v) => `$${v}K`, hint: 'Disbursed in 3 days' },
];
const PRESETS: { label: string; s: Partial<Scenario> }[] = [
  { label: 'Raise prices 5%, lose 10% of customers', s: { priceUpPct: 5, customerLossPct: 10 } },
  { label: 'Borrow $500K', s: { loan: 500 } },
  { label: 'Chase debts hard + cut costs 10%', s: { collectOverduePct: 70, opexCutPct: 10 } },
];

function Out({ label, value, base, fmt, good }: { label: string; value: number; base: number; fmt: (n: number) => string; good: (d: number) => boolean }) {
  const v = useCountUp(value, 500);
  const d = value - base;
  return (
    <div className="out">
      <span>{label}</span>
      <b>{fmt(v)}</b>
      {Math.abs(d) > 0.5 ? <em className={good(d) ? 'good-t' : 'bad-t'}>{d > 0 ? '▲' : '▼'} {fmt(Math.abs(d))} vs today</em> : <em className="muted">same as today</em>}
    </div>
  );
}

export default function Simulator() {
  const [s, setS] = useState<Scenario>(baseScenario);
  const pts = useMemo(() => forecast(s), [s]);
  const base = useMemo(() => forecast(baseScenario), []);
  const st = forecastStats(pts), bst = forecastStats(base);
  const mp = monthlyProfit(s).profit, bmp = monthlyProfit(baseScenario).profit;
  const rw = runwayDays(s), brw = runwayDays(baseScenario);
  const changed = JSON.stringify(s) !== JSON.stringify(baseScenario);

  const verdict = useMemo(() => {
    if (!changed) return 'Drag the sliders to see how your decisions affect profit and cash flow.';
    const parts: string[] = [];
    parts.push(mp >= bmp ? `Profit up ${money(mp - bmp)}/month` : `Profit down ${money(bmp - mp)}/month`);
    parts.push(st.min.cash >= 0 ? 'cash stays positive for all 90 days' : `cash still goes negative from ${st.firstNeg ? wdMd(st.firstNeg.date) : ''}`);
    if (s.loan > 0) parts.push(`interest costs ${money((s.loan * 0.09) / 12, { decimals: 1 })}/month`);
    return parts.join(', ') + '.';
  }, [s, changed, mp, bmp, st]);

  return (
    <div className="screen">
      <SectionTitle kicker="Decision simulator" title="What if…?" right={changed ? <button className="btn ghost sm" onClick={() => setS(baseScenario)}>Reset</button> : undefined} />

      <div className="chips">
        {PRESETS.map((p) => <button key={p.label} className="chip" onClick={() => setS({ ...baseScenario, ...p.s })}><Icon name="spark" size={14} />{p.label}</button>)}
      </div>

      <div className="sim">
        <div className="card pad sliders">
          {SLIDERS.map((sl) => (
            <div key={sl.k} className="sl">
              <div className="sl-h"><span>{sl.label}</span><b>{sl.fmt(s[sl.k])}</b></div>
              <input type="range" min={sl.min} max={sl.max} step={sl.step} value={s[sl.k]} aria-label={sl.label}
                style={{ ['--p' as string]: `${((s[sl.k] - sl.min) / (sl.max - sl.min)) * 100}%` }}
                onChange={(e) => setS((x) => ({ ...x, [sl.k]: Number(e.target.value) }))} />
              <div className="muted small">{sl.hint}</div>
            </div>
          ))}
          <label className="sl-toggle">
            <span className={`switch ${s.negotiate ? 'on' : ''}`}><i /></span>
            <input type="checkbox" hidden checked={s.negotiate} onChange={(e) => setS((x) => ({ ...x, negotiate: e.target.checked }))} />
            <span><b>Extend 2 flexible suppliers</b><em className="muted small">Redstone Tile, Lumen Paints</em></span>
          </label>
        </div>

        <div className="sim-r">
          <div className={`card pad verdict-s ${!changed ? '' : st.min.cash >= 0 ? 'ok' : 'risk'}`}>
            <Icon name="spark" size={18} /><p>{verdict}</p>
          </div>
          <div className="outs">
            <Out label="Profit / month" value={mp} base={bmp} fmt={(n) => money(n)} good={(d) => d > 0} />
            <Out label="Cash runway" value={rw} base={brw} fmt={(n) => `${Math.round(n)} days`} good={(d) => d > 0} />
            <Out label="Lowest cash" value={st.min.cash} base={bst.min.cash} fmt={(n) => money(n)} good={(d) => d > 0} />
          </div>
          <div className="card pad">
            <div className="legend"><span><i className="lg good" />Your scenario</span>{changed && <span><i className="lg ghost" />Today</span>}</div>
            <ForecastChart points={pts} ghost={changed ? base : undefined} height={240} />
          </div>
        </div>
      </div>
    </div>
  );
}
