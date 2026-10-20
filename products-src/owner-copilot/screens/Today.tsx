import React, { useMemo, useState } from 'react';
import { cash, company, leaks, paperVsCash, profit, receivables, TODAY, weekSales } from '../lib/data';
import { baseScenario, forecast, forecastStats, healthScore, runwayDays } from '../lib/finance';
import { md, money, pct, useCountUp, wdMd } from '../lib/format';
import { Icon, Ring, useToast } from '../components/ui';
import { Spark } from '../components/charts';
import { ReminderModal } from './Debts';
import type { Tab } from '../App';

export default function Today({ go }: { go: (t: Tab) => void }) {
  const toast = useToast();
  const pts = useMemo(() => forecast(baseScenario), []);
  const st = forecastStats(pts);
  const runway = runwayDays(baseScenario);
  const score = healthScore();
  const runwayAnim = useCountUp(runway);
  const cashAnim = useCountUp(cash.now);
  const [done, setDone] = useState<string[]>([]);
  const [remind, setRemind] = useState(false);
  const tanner = receivables.find((r) => r.id === 'r1')!;
  const leakTotal = leaks.reduce((a, l) => a + l.perMonth, 0);
  const stuckPct = Math.round((1 - paperVsCash[5].cash / profit.curr) * 100);

  const actions = [
    {
      id: 'a1', tone: 'bad', icon: 'phone', when: 'Today',
      title: `Call ${tanner.customer} — owes ${money(tanner.amount)}, ${tanner.daysOverdue} days overdue`,
      why: `Collecting this removes the risk of negative cash on ${st.firstNeg ? md(st.firstNeg.date) : ''}.`,
      cta: 'Draft reminder', run: () => setRemind(true),
    },
    {
      id: 'a2', tone: 'warn', icon: 'calendar', when: 'Friday, Oct 23',
      title: 'Pay Bayline Trucking $42K',
      why: 'If this is late, deliveries stop for all 14 job sites.',
      cta: 'Schedule payment', run: () => { setDone((d) => [...d, 'a2']); toast('Payment scheduled for Oct 23'); },
    },
    {
      id: 'a3', tone: 'warn', icon: 'drop', when: 'This week',
      title: "Chris Turner's discounts are 3× the team average",
      why: 'Costing about $9.1K a month. 64% of his orders go to the same 2 customers.',
      cta: 'See details', run: () => go('leaks'),
    },
  ];

  return (
    <div className="screen">
      <header className="hello">
        <div>
          <div className="kicker">{wdMd(TODAY)} · {company.full}</div>
          <h1>Good morning, {company.owner} <span className="wave-hand">👋</span></h1>
          <p className="lead">You have <b>1 urgent task</b> and <b>2 recommended ones</b> today. About 15 minutes.</p>
        </div>
      </header>

      {/* HERO */}
      <section className="hero card glow">
        <div className="hero-ring">
          <Ring value={score} label={`${score}`} sub="Health" />
          <div className="hero-ring-t">
            <div className="pill warn"><Icon name="alert" size={14} /> Needs attention</div>
            <p>Profit is still fine, but <b>cash is getting thin</b> and 3 supplier bills land in mid-November.</p>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <span>Cash on hand</span>
            <b>{money(cashAnim)}</b>
            <em className="muted">Bank + petty cash</em>
          </div>
          <div className="hstat">
            <span>Cash runway</span>
            <b className="warn-t">{Math.round(runwayAnim)} days</b>
            <em className="bad-t">↓ from {cash.runwayLastMonth} days last month</em>
          </div>
          <div className="hstat clickable" onClick={() => go('cash')}>
            <span>Lowest point, next 90 days</span>
            <b className="bad-t">{money(st.min.cash)}</b>
            <em>{wdMd(st.min.date)} · see forecast <Icon name="arrowR" size={13} /></em>
          </div>
        </div>
      </section>

      {/* BRIEF */}
      <section className="brief">
        <button className="card brief-i" onClick={() => go('profit')}>
          <div className="brief-top"><span className="dot-s good" />Sales last week</div>
          <div className="brief-v">{money(weekSales.value)} <small className="good-t">{pct(weekSales.changePct)}</small></div>
          <Spark values={[520, 548, 571, 560, 588, 612]} tone="good" />
          <p>Normal — in line with building season.</p>
        </button>
        <button className="card brief-i" onClick={() => go('profit')}>
          <div className="brief-top"><span className="dot-s warn" />October profit</div>
          <div className="brief-v">{money(profit.curr)} <small className="bad-t">{money(profit.curr - profit.prev, { sign: true })}</small></div>
          <Spark values={paperVsCash.map((p) => p.paper)} tone="brand" />
          <p>Down mainly because <b>cement costs went up</b>.</p>
        </button>
        <button className="card brief-i" onClick={() => go('profit')}>
          <div className="brief-top"><span className="dot-s bad" />Cash collected in October</div>
          <div className="brief-v">{money(paperVsCash[5].cash)} <small className="muted">/ {money(profit.curr)} profit</small></div>
          <Spark values={paperVsCash.map((p) => p.cash)} tone="bad" />
          <p><b>{stuckPct}% of profit</b> is still sitting with customers.</p>
        </button>
        <button className="card brief-i" onClick={() => go('leaks')}>
          <div className="brief-top"><span className="dot-s bad" />Money leaks found</div>
          <div className="brief-v">{money(leakTotal, { decimals: 1 })}<small className="muted">/month</small></div>
          <div className="leak-dots">{leaks.map((l) => <i key={l.id} className={l.severity === 'high' ? 'bad' : 'warn'} />)}</div>
          <p>{leaks.length} places quietly eating into profit.</p>
        </button>
      </section>

      {/* ACTIONS */}
      <section>
        <div className="sec-title"><div><div className="kicker">To do</div><h2>3 things I recommend you do</h2></div></div>
        <div className="actions">
          {actions.map((a, i) => (
            <div key={a.id} className={`card action ${a.tone} ${done.includes(a.id) ? 'done' : ''}`} style={{ animationDelay: `${i * 90}ms` }}>
              <div className="action-ic"><Icon name={done.includes(a.id) ? 'check' : a.icon} size={20} /></div>
              <div className="action-b">
                <div className="action-when">{a.when}</div>
                <h4>{a.title}</h4>
                <p>{a.why}</p>
              </div>
              <button className="btn" onClick={a.run} disabled={done.includes(a.id)}>{done.includes(a.id) ? 'Done' : a.cta}</button>
            </div>
          ))}
        </div>
      </section>

      <ReminderModal
        open={remind}
        targets={[tanner]}
        onClose={() => setRemind(false)}
        onSent={() => { setDone((d) => [...d, 'a1']); setRemind(false); }}
      />
    </div>
  );
}
