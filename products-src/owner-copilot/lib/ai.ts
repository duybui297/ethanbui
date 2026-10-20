import { cash, company, leaks, payables, paperVsCash, profit, receivables, weekSales } from './data';
import { baseScenario, forecast, forecastStats, runwayDays } from './finance';
import { md, money } from './format';

// Server-side Gemini proxy on the main site (keeps the API key out of the bundle).
const ASK_ENDPOINT = '/api/owner-copilot/ask';

function context() {
  const st = forecastStats(forecast(baseScenario));
  return JSON.stringify({
    company: company.full,
    today: 'Oct 19, 2026',
    unit: 'thousand USD',
    cashOnHand: cash.now,
    runwayDays: runwayDays(baseScenario),
    cashForecast: { lowest: Math.round(st.min.cash), lowestDate: md(st.min.date), firstNegativeDate: st.firstNeg ? md(st.firstNeg.date) : null },
    salesLastWeek: weekSales,
    profit: { september: profit.prev, octoberProjected: profit.curr, drivers: profit.drivers },
    paperProfitVsCash: paperVsCash,
    payables: payables.map(({ supplier, amount, dueIn, importance, term }) => ({ supplier, amount, dueInDays: dueIn, importance, term })),
    receivables: receivables.map(({ customer, amount, daysOverdue, history }) => ({ customer, amount, daysOverdue, history })),
    moneyLeaks: leaks.map(({ title, perMonth, evidence }) => ({ title, perMonth, evidence })),
  });
}

export type AskResult = { text: string; source: 'gemini' | 'local' };

export async function ask(question: string): Promise<AskResult> {
  try {
    const res = await fetch(ASK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, context: context() }),
    });
    if (res.ok) {
      const { text } = (await res.json()) as { text?: string };
      if (text?.trim()) return { text: text.trim(), source: 'gemini' };
    }
  } catch (e) {
    console.warn('Gemini failed, using built-in answer:', e);
  }
  await new Promise((r) => setTimeout(r, 650));
  return { text: localAnswer(question), source: 'local' };
}

/** Rule-based answers — work without an API key */
export function localAnswer(q: string): string {
  const s = q.toLowerCase();
  const st = forecastStats(forecast(baseScenario));
  const negDate = st.firstNeg ? md(st.firstNeg.date) : 'Nov 15';
  if (/(owes|overdue|longest|collect|who owe|debtor)/.test(s)) {
    const od = receivables.filter((r) => r.daysOverdue > 0).sort((a, b) => b.daysOverdue - a.daysOverdue);
    return `${od.length} customers are overdue, ${money(od.reduce((a, r) => a + r.amount, 0))} in total:\n` +
      od.slice(0, 3).map((r) => `• ${r.customer}: ${money(r.amount)}, ${r.daysOverdue} days overdue`).join('\n') +
      `\n\nCall Tanner Construction first — that $150K alone removes the risk of negative cash on ${negDate}.`;
  }
  if (/(profit|margin|earn).*(drop|down|why|fall|lower)|(why|drop|down).*(profit|margin)/.test(s)) {
    const neg = profit.drivers.filter((d) => d.value < 0);
    return `October profit is projected at ${money(profit.curr)}, down ${money(profit.prev - profit.curr)} from September. Main causes:\n` +
      neg.map((d) => `• ${d.label}: ${money(d.value)}`).join('\n') +
      `\n\nNext step: adjust cement selling prices now — it is the biggest item (−$31K).`;
  }
  if (/(best|most profitable|top|product|item|selling)/.test(s)) {
    return `Premium tile is the bright spot this month: 31% margin, adding $18K of profit.\n\nOn the other side, 3 products are selling below cost after discounts (Grade A porcelain tile 24×24, 5-gal exterior paint, 3" PVC pipe) — costing ~$11.4K/month. Set a price floor in the sales system.`;
  }
  if (/(enough cash|cash flow|cashflow|cash|negative|pay (my )?(debts|bills|suppliers)|short)/.test(s)) {
    return `You have ${money(cash.now)} in cash. But on ${negDate} three supplier payments ($393K) fall due at once, so cash is projected to bottom out at ${money(st.min.cash)} on ${md(st.min.date)}.\n\nTwo ways out:\n• Collect 60% of overdue debt within 14 days → cash never goes negative.\n• Ask Redstone Tile for a 15-day extension + pay Lumen Paints 50% now.`;
  }
  if (/(leak|losing money|waste|discount)/.test(s)) {
    const t = leaks.reduce((a, l) => a + l.perMonth, 0);
    return `I found ${leaks.length} money leaks, about ${money(t, { decimals: 1 })}/month in total. The biggest:\n` +
      leaks.slice(0, 3).map((l) => `• ${l.title}: ${money(l.perMonth, { decimals: 1 })}/month`).join('\n') +
      `\n\nDo now: require your approval for any discount above 8%.`;
  }
  return `Quick summary:\n• Cash ${money(cash.now)} — covers fixed costs for ${runwayDays(baseScenario)} days.\n• October profit projected at ${money(profit.curr)} (down ${money(profit.prev - profit.curr)}).\n• Risk: cash may go negative on ${negDate}.\n\nTry asking: "Who owes us the longest?" or "Why did profit drop?"`;
}

export function reminderMessage(contact: string, amount: number, days: number, invoices: number) {
  const body = days > 30
    ? `We currently have ${invoices} invoices totaling ${money(amount)} that are ${days} days past due. We're closing our October books — could you arrange payment by Oct 25?`
    : `Just a friendly reminder: ${invoices === 1 ? '1 invoice' : `${invoices} invoices`} totaling ${money(amount)} ${invoices === 1 ? 'is' : 'are'} ${days} days past due. Could you take a look when you get a chance?`;
  return `Hi ${contact},\nThis is Mark from Summit Building Supply. ${body}\nIf you need a statement of account, just let me know and I'll send it right over. Thanks as always for your business! 🙏`;
}
