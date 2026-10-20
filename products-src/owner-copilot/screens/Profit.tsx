import React, { useState } from 'react';
import { paperVsCash, profit, receivables } from '../lib/data';
import { money } from '../lib/format';
import { PaperCash, Waterfall } from '../components/charts';
import { Icon, SectionTitle } from '../components/ui';

export default function Profit() {
  const [picked, setPicked] = useState<number | null>(0);
  const d = picked != null ? profit.drivers[picked] : null;
  const first = paperVsCash[0];
  const last = paperVsCash[paperVsCash.length - 1];
  const stuck = last.paper - last.cash;
  const overdue = receivables.filter((r) => r.daysOverdue > 0).reduce((a, r) => a + r.amount, 0);

  return (
    <div className="screen">
      <SectionTitle kicker="Profit" title="Why is profit down this month?" />

      <div className="card pad profit-head">
        <div>
          <div className="big-num">{money(profit.curr)}</div>
          <div className="muted">Projected October profit · revenue {money(profit.revenueCurr)}</div>
        </div>
        <div className="delta bad"><Icon name="trend" size={16} /> {money(profit.curr - profit.prev, { sign: true })} vs September</div>
      </div>

      <div className="grid-2">
        <div className="card pad">
          <div className="card-t">From {money(profit.prev)} to {money(profit.curr)} — cause by cause</div>
          <Waterfall start={profit.prev} end={profit.curr} startLabel={profit.prevLabel} endLabel="October"
            drivers={profit.drivers} picked={picked} onPick={setPicked} />
        </div>
        <div className="card pad explain">
          {d && (
            <div key={picked} className="fade-in">
              <div className={`pill ${d.value < 0 ? 'bad' : 'good'}`}>{money(d.value, { sign: true })} / month</div>
              <h3>{d.label}</h3>
              <p>{d.detail}</p>
              {picked === 0 && (
                <div className="suggest">
                  <Icon name="spark" size={16} />
                  <div><b>Suggestion:</b> raise cement prices 4% on new orders from Nov 1 — recovers about <b>$24K/month</b>. Competitors in the area already raised prices 5% on Oct 10.</div>
                </div>
              )}
              {picked === 1 && (
                <div className="suggest">
                  <Icon name="spark" size={16} />
                  <div><b>Suggestion:</b> call Westfield Developments and ask when Riverbend restarts. If it stays paused beyond 60 days, line up 2 replacement contractors in that area.</div>
                </div>
              )}
            </div>
          )}
          <p className="muted small">Pick any row in the chart to see its explanation.</p>
        </div>
      </div>

      <SectionTitle kicker="Real cash vs paper profit" title="Profitable, so why short on cash?" />
      <div className="grid-2">
        <div className="card pad">
          <div className="legend"><span><i className="lg paper" />Profit on paper</span><span><i className="lg good" />Cash collected</span></div>
          <PaperCash data={paperVsCash} />
        </div>
        <div className="card pad stack-insight">
          <div className="si-row"><span>October profit</span><b>{money(last.paper)}</b></div>
          <div className="si-bar"><i style={{ width: `${(last.cash / last.paper) * 100}%` }} /></div>
          <div className="si-row"><span className="good-t">● Cash in the bank</span><b>{money(last.cash)}</b></div>
          <div className="si-row"><span className="bad-t">● Still with customers & in stock</span><b>{money(stuck)}</b></div>
          <div className="callout bad">
            <b>The gap has widened 5 months in a row</b> — from {money(first.paper - first.cash)} (May) to {money(stuck)} (October). Customers are paying slower and slower; total overdue is {money(overdue)}.
          </div>
        </div>
      </div>
    </div>
  );
}
