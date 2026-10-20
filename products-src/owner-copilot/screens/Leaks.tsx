import React, { useState } from 'react';
import { leaks, profit } from '../lib/data';
import { money } from '../lib/format';
import { Icon, SectionTitle, useToast } from '../components/ui';

export default function Leaks() {
  const toast = useToast();
  const [open, setOpen] = useState<string | null>('l1');
  const [fixed, setFixed] = useState<string[]>([]);
  const total = leaks.reduce((a, l) => a + l.perMonth, 0);
  const saved = leaks.filter((l) => fixed.includes(l.id)).reduce((a, l) => a + l.perMonth, 0);

  return (
    <div className="screen">
      <SectionTitle kicker="Money leaks" title="Where is money slipping away?" />

      <div className="card pad leak-hero">
        <div>
          <div className="big-num bad-t">{money(total, { decimals: 1 })}<small>/month</small></div>
          <div className="muted">≈ {money(total * 12)} a year · {Math.round((total / profit.curr) * 100)}% of monthly profit</div>
        </div>
        <div className="leak-progress">
          <div className="lp-t"><span>Fixed so far</span><b className="good-t">{money(saved, { decimals: 1 })}</b></div>
          <div className="lp-bar"><i style={{ width: `${(saved / total) * 100}%` }} /></div>
        </div>
      </div>

      <div className="leaks">
        {leaks.map((l, i) => {
          const isOpen = open === l.id;
          const isFixed = fixed.includes(l.id);
          return (
            <div key={l.id} className={`card leak ${isOpen ? 'open' : ''} ${isFixed ? 'fixed' : ''}`} style={{ animationDelay: `${i * 70}ms` }}>
              <button className="leak-h" onClick={() => setOpen(isOpen ? null : l.id)}>
                <span className={`sev ${l.severity === 'high' ? 'bad' : 'warn'}`}>{isFixed ? <Icon name="check" size={14} /> : i + 1}</span>
                <span className="leak-t">{l.title}</span>
                <span className="leak-v">{money(l.perMonth, { decimals: 1 })}<em>/month</em></span>
              </button>
              {isOpen && (
                <div className="leak-b fade-in">
                  <p>{l.evidence}</p>
                  {l.items && (
                    <div className="mini-table">
                      {l.items.map((it) => (
                        <div key={it.name} className="mt-row"><span>{it.name}</span><b className={it.bad ? 'bad-t' : ''}>{it.value}</b></div>
                      ))}
                    </div>
                  )}
                  <div className="suggest"><Icon name="spark" size={16} /><div><b>How to fix:</b> {l.fix}</div></div>
                  <div className="row-btns">
                    <button className="btn" disabled={isFixed} onClick={() => { setFixed((f) => [...f, l.id]); toast(`Task assigned: ${l.title.slice(0, 36)}…`); }}>
                      {isFixed ? 'Task assigned' : 'Assign a fix'}
                    </button>
                    <button className="btn ghost" onClick={() => toast('Reminder set to review in 7 days', 'info')}>Remind me later</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
