import React, { useMemo, useState } from 'react';
import { baseScenario, forecast, forecastStats, Scenario } from '../lib/finance';
import { md, money, wdMd, weekday } from '../lib/format';
import { ForecastChart } from '../components/charts';
import { Icon, SectionTitle } from '../components/ui';
import type { Tab } from '../App';

const FIXES: { key: string; label: string; desc: string; patch: Partial<Scenario> }[] = [
  { key: 'collect', label: 'Collect 60% of overdue debt', desc: 'Tanner, Fulton, Crestview — within 14 days', patch: { collectOverduePct: 60 } },
  { key: 'negotiate', label: 'Extend 2 flexible suppliers', desc: 'Redstone Tile +15 days, Lumen Paints 50% now', patch: { negotiate: true } },
];

export default function Cashflow({ go }: { go: (t: Tab) => void }) {
  const [on, setOn] = useState<string[]>([]);
  const scenario = useMemo(() => FIXES.filter((f) => on.includes(f.key)).reduce((s, f) => ({ ...s, ...f.patch }), baseScenario), [on]);
  const base = useMemo(() => forecast(baseScenario), []);
  const pts = useMemo(() => forecast(scenario), [scenario]);
  const st = forecastStats(pts);
  const bst = forecastStats(base);
  const safe = st.min.cash >= 0;
  const upcoming = pts.filter((p) => p.day <= 35 && p.events.length).flatMap((p) => p.events.map((e) => ({ p, e })));

  return (
    <div className="screen">
      <SectionTitle kicker="90-day cash forecast" title="Can I pay my bills?" />

      <div className={`verdict card ${safe ? 'ok' : 'risk'}`}>
        <div className="verdict-ic"><Icon name={safe ? 'shield' : 'alert'} size={26} /></div>
        <div>
          {safe ? (
            <>
              <h3>Safe — cash never drops below zero</h3>
              <p>Lowest point is <b>{money(st.min.cash)}</b> on {wdMd(st.min.date)}. Compared with doing nothing: <b className="good-t">{money(st.min.cash - bst.min.cash, { sign: true })}</b> better.</p>
            </>
          ) : (
            <>
              <h3>From {st.firstNeg && wdMd(st.firstNeg.date)}, cash could drop to {money(st.min.cash)}</h3>
              <p>Why: 3 supplier bills ($393K) are all due on Nov 15, while 3 overdue customers are holding $284K. Cash stays negative for about <b>{st.negDays} days</b>.</p>
            </>
          )}
        </div>
      </div>

      <div className="card pad">
        <div className="chart-head">
          <div className="legend">
            <span><i className="lg good" />Projected cash</span>
            {on.length > 0 && <span><i className="lg ghost" />If you do nothing</span>}
          </div>
          <span className="muted small">Hover or tap to see each day</span>
        </div>
        <ForecastChart points={pts} ghost={on.length ? base : undefined} />
      </div>

      <SectionTitle kicker="Try it" title="What if you did this…" />
      <div className="fixes">
        {FIXES.map((f) => {
          const active = on.includes(f.key);
          return (
            <button key={f.key} className={`card fix ${active ? 'on' : ''}`} onClick={() => setOn((o) => (active ? o.filter((k) => k !== f.key) : [...o, f.key]))}>
              <span className={`switch ${active ? 'on' : ''}`}><i /></span>
              <span className="fix-t"><b>{f.label}</b><em>{f.desc}</em></span>
            </button>
          );
        })}
        <button className="card fix ghostbtn" onClick={() => go('sim')}>
          <Icon name="sliders" />
          <span className="fix-t"><b>More detailed simulation</b><em>Borrow, raise prices, cut costs…</em></span>
          <Icon name="arrowR" />
        </button>
      </div>

      <SectionTitle kicker="Next 35 days" title="Large cash in and out" />
      <div className="card list">
        {upcoming.map(({ p, e }, i) => (
          <div key={i} className="li">
            <div className="li-date"><b>{md(p.date)}</b><span>{weekday(p.date)}</span></div>
            <div className="li-main">{e.label}</div>
            <div className={`li-amt ${e.amt < 0 ? 'bad-t' : 'good-t'}`}>{money(e.amt, { sign: true })}</div>
            <div className={`li-bal ${p.cash < 0 ? 'bad-t' : 'muted'}`}>balance {money(p.cash)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
