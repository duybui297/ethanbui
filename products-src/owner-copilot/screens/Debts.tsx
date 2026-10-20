import React, { useEffect, useState } from 'react';
import { payables, Receivable, receivables, TODAY } from '../lib/data';
import { md, money } from '../lib/format';
import { reminderMessage } from '../lib/ai';
import { Icon, Modal, SectionTitle, useToast } from '../components/ui';

const ACTION_LABEL: Record<string, { t: string; c: string }> = {
  'pay-now': { t: 'Pay now', c: 'bad' },
  'pay-on-time': { t: 'Pay on time', c: 'warn' },
  'pay-early': { t: 'Consider paying early', c: 'brand' },
  negotiate: { t: 'Ask to extend', c: 'good' },
};
const dueDate = (n: number) => { const d = new Date(TODAY); d.setDate(d.getDate() + n); return d; };

export default function Debts() {
  const [tab, setTab] = useState<'pay' | 'recv'>('pay');
  const payTotal = payables.reduce((a, p) => a + p.amount, 0);
  const recvOver = receivables.filter((r) => r.daysOverdue > 0);
  const recvTotal = receivables.reduce((a, r) => a + r.amount, 0);

  return (
    <div className="screen">
      <SectionTitle kicker="Payables & receivables" title="Who to pay first, who to chase first?" />
      <div className="seg">
        <button className={tab === 'pay' ? 'on' : ''} onClick={() => setTab('pay')}>Payables <b>{money(payTotal)}</b></button>
        <button className={tab === 'recv' ? 'on' : ''} onClick={() => setTab('recv')}>Receivables <b>{money(recvTotal)}</b>{recvOver.length > 0 && <i className="badge">{recvOver.length}</i>}</button>
      </div>
      {tab === 'pay' ? <Payables /> : <Receivables />}
    </div>
  );
}

function Payables() {
  const toast = useToast();
  const [state, setState] = useState<Record<string, string>>({});
  const saving = payables.reduce((a, p) => a + (p.saving ?? 0), 0);
  return (
    <>
      <div className="callout brand">
        <Icon name="spark" size={18} />
        <div>There isn't enough cash to pay all 5 bills in the next 27 days. I've ranked them by <b>late penalties, early-payment discounts and how critical each supplier is</b>. Following this plan saves <b className="good-t">{money(saving, { decimals: 1 })}</b> and keeps your 2 key suppliers happy.</div>
      </div>
      <div className="plist">
        {payables.map((p, i) => {
          const a = ACTION_LABEL[p.action];
          const st = state[p.id];
          return (
            <div key={p.id} className="card pay" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="pay-rank">{i + 1}</div>
              <div className="pay-main">
                <div className="pay-top">
                  <h4>{p.supplier}</h4>
                  <span className={`pill ${a.c}`}>{a.t}</span>
                </div>
                <div className="pay-meta">
                  <span><Icon name="calendar" size={14} /> Due {md(dueDate(p.dueIn))} · in {p.dueIn} days</span>
                  <span className={`imp ${p.importance === 'Critical' ? 'bad-t' : p.importance === 'Important' ? 'warn-t' : 'muted'}`}>● {p.importance}</span>
                  <span className="muted">{p.term}</span>
                </div>
                <p className="pay-adv">{p.advice}</p>
              </div>
              <div className="pay-r">
                <div className="pay-amt">{money(p.amount)}</div>
                {st ? <span className="pill good"><Icon name="check" size={13} /> {st}</span> : p.action === 'negotiate' ? (
                  <button className="btn sm" onClick={() => { setState((s) => ({ ...s, [p.id]: 'Request sent' })); toast(`Extension request sent to ${p.supplier}`); }}>Request extension</button>
                ) : (
                  <button className="btn sm" onClick={() => { setState((s) => ({ ...s, [p.id]: 'Scheduled' })); toast(`Payment to ${p.supplier} scheduled`); }}>Schedule payment</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Receivables() {
  const [sel, setSel] = useState<string[]>(['r1', 'r5', 'r2']);
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState<string[]>([]);
  const buckets = [
    { label: 'Not yet due', f: (r: Receivable) => r.daysOverdue <= 0, c: 'good' },
    { label: '1–30 days', f: (r: Receivable) => r.daysOverdue > 0 && r.daysOverdue <= 30, c: 'warn' },
    { label: '31–60 days', f: (r: Receivable) => r.daysOverdue > 30 && r.daysOverdue <= 60, c: 'bad' },
    { label: 'Over 60 days', f: (r: Receivable) => r.daysOverdue > 60, c: 'dark' },
  ].map((b) => ({ ...b, v: receivables.filter(b.f).reduce((a, r) => a + r.amount, 0) }));
  const tot = buckets.reduce((a, b) => a + b.v, 0);
  const sorted = [...receivables].sort((a, b) => b.daysOverdue - a.daysOverdue);

  return (
    <>
      <div className="card pad">
        <div className="card-t">Receivables aging</div>
        <div className="aging">
          {buckets.map((b) => b.v > 0 && <div key={b.label} className={`ag ${b.c}`} style={{ flex: b.v }} title={`${b.label}: ${money(b.v)}`} />)}
        </div>
        <div className="aging-l">
          {buckets.map((b) => (
            <div key={b.label}><i className={`lg ${b.c}`} /><span>{b.label}</span><b>{money(b.v)}</b><em>{Math.round((b.v / tot) * 100)}%</em></div>
          ))}
        </div>
      </div>

      <div className="recv-bar">
        <span>{sel.length ? `${sel.length} selected · ${money(receivables.filter((r) => sel.includes(r.id)).reduce((a, r) => a + r.amount, 0))}` : 'Select customers to send reminders'}</span>
        <button className="btn" disabled={!sel.length} onClick={() => setOpen(true)}><Icon name="send" size={16} /> Draft reminders ({sel.length})</button>
      </div>

      <div className="card list">
        {sorted.map((r) => {
          const over = r.daysOverdue > 0;
          const checked = sel.includes(r.id);
          return (
            <label key={r.id} className={`li recv ${checked ? 'sel' : ''}`}>
              <input type="checkbox" checked={checked} disabled={!over} onChange={() => setSel((s) => (checked ? s.filter((x) => x !== r.id) : [...s, r.id]))} />
              <div className="li-main">
                <b>{r.customer}</b>
                <span className="muted small">{r.history}</span>
              </div>
              <div className="li-prob" title="Likelihood of collecting">
                <div className="prob"><i style={{ width: `${r.payProbability * 100}%` }} className={r.payProbability < 0.5 ? 'bad' : r.payProbability < 0.8 ? 'warn' : 'good'} /></div>
                <span className="muted small">{Math.round(r.payProbability * 100)}% likely to pay</span>
              </div>
              <div className="li-amt">{money(r.amount)}</div>
              <div className={`li-od ${r.daysOverdue > 30 ? 'bad-t' : over ? 'warn-t' : 'good-t'}`}>
                {sent.includes(r.id) ? '✓ Reminded' : over ? `${r.daysOverdue} days overdue` : `Due in ${-r.daysOverdue} days`}
              </div>
            </label>
          );
        })}
      </div>

      <ReminderModal open={open} targets={receivables.filter((r) => sel.includes(r.id))} onClose={() => setOpen(false)}
        onSent={() => { setSent((s) => [...s, ...sel]); setSel([]); setOpen(false); }} />
    </>
  );
}

export function ReminderModal({ open, targets, onClose, onSent }: { open: boolean; targets: Receivable[]; onClose: () => void; onSent: () => void }) {
  const toast = useToast();
  const [i, setI] = useState(0);
  const [texts, setTexts] = useState<Record<string, string>>({});
  useEffect(() => {
    if (open) {
      setI(0);
      setTexts(Object.fromEntries(targets.map((t) => [t.id, reminderMessage(t.contact, t.amount, t.daysOverdue, t.invoices)])));
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const t = targets[i];
  if (!t) return null;
  return (
    <Modal open={open} onClose={onClose} title={`Payment reminder ${targets.length > 1 ? `(${i + 1}/${targets.length})` : ''}`}>
      {targets.length > 1 && (
        <div className="chips">
          {targets.map((x, k) => <button key={x.id} className={`chip ${k === i ? 'on' : ''}`} onClick={() => setI(k)}>{x.customer}</button>)}
        </div>
      )}
      <div className="msg-to"><div className="avatar">{t.customer[0]}</div><div><b>{t.customer}</b><span className="muted small">{t.contact} · {money(t.amount)} · {t.daysOverdue} days overdue</span></div></div>
      <div className="bubble-wrap">
        <textarea className="bubble" value={texts[t.id] ?? ''} onChange={(e) => setTexts((s) => ({ ...s, [t.id]: e.target.value }))} rows={7} />
      </div>
      <p className="muted small">The tone adapts to how overdue the invoice is. You can edit it directly.</p>
      <div className="row-btns end">
        <button className="btn ghost" onClick={() => { navigator.clipboard?.writeText(texts[t.id] ?? ''); toast('Message copied', 'info'); }}><Icon name="copy" size={16} /> Copy</button>
        <button className="btn" onClick={() => { toast(`Sent to ${targets.length} customer${targets.length > 1 ? 's' : ''} (simulated)`); onSent(); }}><Icon name="send" size={16} /> Send {targets.length > 1 ? `all ${targets.length}` : ''} by text</button>
      </div>
    </Modal>
  );
}
