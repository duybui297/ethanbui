import React, { useEffect, useState } from 'react';
import { Icon, ToastProvider } from './components/ui';
import { company } from './lib/data';
import Today from './screens/Today';
import Cashflow from './screens/Cashflow';
import Profit from './screens/Profit';
import Leaks from './screens/Leaks';
import Debts from './screens/Debts';
import Simulator from './screens/Simulator';
import Ask from './screens/Ask';

export type Tab = 'today' | 'cash' | 'profit' | 'leaks' | 'debts' | 'sim' | 'ask';

const NAV: { id: Tab; label: string; short: string; icon: string; badge?: string }[] = [
  { id: 'today', label: 'Hôm nay', short: 'Hôm nay', icon: 'sun', badge: '3' },
  { id: 'cash', label: 'Dòng tiền', short: 'Dòng tiền', icon: 'wave', badge: '!' },
  { id: 'profit', label: 'Lợi nhuận', short: 'Lợi nhuận', icon: 'pie' },
  { id: 'debts', label: 'Công nợ', short: 'Công nợ', icon: 'scale' },
  { id: 'leaks', label: 'Thất thoát', short: 'Thất thoát', icon: 'drop', badge: '5' },
  { id: 'sim', label: 'Mô phỏng', short: 'Mô phỏng', icon: 'sliders' },
  { id: 'ask', label: 'Hỏi trợ lý', short: 'Hỏi', icon: 'spark' },
];
const MOBILE_NAV: Tab[] = ['today', 'cash', 'debts', 'leaks', 'ask'];

export default function App() {
  const [tab, setTab] = useState<Tab>(() => {
    const h = window.location.hash.slice(1) as Tab;
    return NAV.some((n) => n.id === h) ? h : 'today';
  });
  useEffect(() => {
    try { history.replaceState(null, '', `#${tab}`); } catch { /* sandboxed iframe */ }
    window.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <ToastProvider>
      <div className="app">
        <aside className="side">
          <div className="brandbox">
            <div className="logo">{company.short}</div>
            <div><b>Owner Copilot</b><span>{company.full}</span></div>
          </div>
          <nav>
            {NAV.map((n) => (
              <button key={n.id} className={`nav ${tab === n.id ? 'on' : ''}`} title={n.label} onClick={() => setTab(n.id)}>
                <Icon name={n.icon} />
                <span>{n.label}</span>
                {n.badge && <i className={`nb ${n.id === 'cash' ? 'bad' : ''}`}>{n.badge}</i>}
              </button>
            ))}
          </nav>
          <div className="side-foot">
            <div className="sync"><span className="live-dot" />Cập nhật 7:00 sáng nay</div>
            <div className="muted small">Dữ liệu mẫu · Bản thử nghiệm</div>
          </div>
        </aside>

        <main className="main" key={tab}>
          {tab === 'today' && <Today go={setTab} />}
          {tab === 'cash' && <Cashflow go={setTab} />}
          {tab === 'profit' && <Profit />}
          {tab === 'leaks' && <Leaks />}
          {tab === 'debts' && <Debts />}
          {tab === 'sim' && <Simulator />}
          {tab === 'ask' && <Ask />}
        </main>

        <nav className="bottom">
          {MOBILE_NAV.map((id) => {
            const n = NAV.find((x) => x.id === id)!;
            return (
              <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
                <Icon name={n.icon} size={20} />
                <span>{n.short}</span>
                {n.badge && <i className={`nb ${id === 'cash' ? 'bad' : ''}`}>{n.badge}</i>}
              </button>
            );
          })}
        </nav>
        {/* On phones: the 2 secondary screens live in a quick bar at the top */}
        <div className="quick">
          {(['profit', 'sim'] as Tab[]).map((id) => {
            const n = NAV.find((x) => x.id === id)!;
            return <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}><Icon name={n.icon} size={15} />{n.label}</button>;
          })}
        </div>
      </div>
    </ToastProvider>
  );
}
