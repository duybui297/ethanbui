import { cash, payables, receivables, profit, TODAY } from './data';

export type Scenario = {
  priceUpPct: number; // % price increase
  customerLossPct: number; // % of customers lost because of the price increase
  opexCutPct: number; // % cut in fixed costs
  loan: number; // thousand USD, disbursed on day 3
  collectOverduePct: number; // % of hard overdue debt collected within 14 days
  negotiate: boolean; // extend Redstone Tile + pay Lumen Paints 50%
};

export const baseScenario: Scenario = {
  priceUpPct: 0,
  customerLossPct: 0,
  opexCutPct: 0,
  loan: 0,
  collectOverduePct: 0,
  negotiate: false,
};

export type CashEvent = { amt: number; label: string };
export type ForecastPoint = { day: number; date: Date; cash: number; events: CashEvent[] };

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

export function monthlyProfit(s: Scenario) {
  const R = profit.revenueCurr;
  const vol = 1 - s.customerLossPct / 100;
  const revenue = R * (1 + s.priceUpPct / 100) * vol;
  const cogs = R * (1 - profit.grossMargin) * vol;
  const opex = profit.opex * (1 - s.opexCutPct / 100);
  const interest = (s.loan * 0.09) / 12;
  return { revenue, profit: revenue - cogs - opex - interest };
}

/** 90-day cash forecast — simple deterministic model */
export function forecast(s: Scenario, days = 90): ForecastPoint[] {
  const pts: ForecastPoint[] = [];
  let c = cash.now;
  const baseProfit = monthlyProfit(baseScenario).profit;
  const profitDeltaDaily = (monthlyProfit(s).profit - baseProfit) / 30;
  const opexSaveDaily = (cash.dailyFixedCost * s.opexCutPct) / 100;

  const ev = new Map<number, CashEvent[]>();
  const push = (d: number, amt: number, label: string) => {
    if (!ev.has(d)) ev.set(d, []);
    ev.get(d)!.push({ amt, label });
  };

  // Payables
  for (const p of payables) {
    if (s.negotiate && p.id === 'p3') { push(p.dueIn + 15, -p.amount, `Pay ${p.supplier} (extended)`); continue; }
    if (s.negotiate && p.id === 'p4') {
      push(p.dueIn, -p.amount / 2, `Pay 50% to ${p.supplier}`);
      push(p.dueIn + 16, -p.amount / 2, `Pay remaining 50% to ${p.supplier}`);
      continue;
    }
    push(p.dueIn, -p.amount, `Pay ${p.supplier}`);
  }
  // Recurring fixed costs: warehouse rent on the 1st, payroll on the 5th
  for (let d = 0; d <= days; d++) {
    const dt = addDays(TODAY, d);
    if (dt.getDate() === 1) push(d, -45, 'Warehouse rent');
    if (dt.getDate() === 5) push(d, -180, 'Payroll');
    // regular customers pay at month end
    if (dt.getDate() === 25 && d > 10) push(d, 380, 'Regular customer payments');
  }
  // Receivables: good customers pay on time; hard overdue only counts in a scenario
  for (const r of receivables) {
    if (r.daysOverdue < 0) push(-r.daysOverdue, r.amount, `${r.customer} pays`);
    else if (r.daysOverdue <= 10) push(7, r.amount, `${r.customer} pays`);
  }
  const hardOverdue = receivables.filter((r) => r.daysOverdue > 10);
  if (s.collectOverduePct > 0) {
    const total = hardOverdue.reduce((a, r) => a + r.amount, 0);
    push(14, (total * s.collectOverduePct) / 100, `Overdue collected (${s.collectOverduePct}%)`);
  }
  if (s.loan > 0) push(3, s.loan, `Bank loan disbursed`);

  for (let d = 0; d <= days; d++) {
    const dt = addDays(TODAY, d);
    if (d > 0) {
      const dow = dt.getDay();
      // Daily sales net of daily operating costs
      const wave = Math.sin(d * 1.7) * 2.2 + Math.cos(d * 0.6) * 1.4;
      const daily = (dow === 0 ? -cash.dailyFixedCost : 1.6 + wave) + profitDeltaDaily + opexSaveDaily;
      c += daily;
      if (s.loan > 0) c -= (s.loan * 0.09) / 365;
    }
    const events = ev.get(d) ?? [];
    for (const e of events) c += e.amt;
    pts.push({ day: d, date: dt, cash: c, events });
  }
  return pts;
}

export function forecastStats(pts: ForecastPoint[]) {
  let min = pts[0];
  for (const p of pts) if (p.cash < min.cash) min = p;
  const firstNeg = pts.find((p) => p.cash < 0) ?? null;
  const negDays = pts.filter((p) => p.cash < 0).length;
  return { min, firstNeg, negDays, end: pts[pts.length - 1] };
}

export function runwayDays(s: Scenario) {
  const extra = s.loan + (receivables.filter((r) => r.daysOverdue > 10).reduce((a, r) => a + r.amount, 0) * s.collectOverduePct) / 100;
  return Math.round((cash.now + extra) / (cash.dailyFixedCost * (1 - s.opexCutPct / 100)));
}

/** Health score 0–100 */
export function healthScore() {
  const st = forecastStats(forecast(baseScenario));
  const runway = runwayDays(baseScenario);
  let score = 100;
  if (st.min.cash < 0) score -= 18;
  score -= Math.max(0, (60 - runway) * 0.5);
  const overdue = receivables.filter((r) => r.daysOverdue > 30).reduce((a, r) => a + r.amount, 0);
  score -= overdue / 20;
  score -= ((profit.prev - profit.curr) / profit.prev) * 40;
  return Math.round(Math.max(0, Math.min(100, score)));
}

export const overdueTotal = () => receivables.filter((r) => r.daysOverdue > 0).reduce((a, r) => a + r.amount, 0);
