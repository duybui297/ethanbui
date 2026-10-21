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
      id: 'a1', tone: 'bad', icon: 'phone', when: 'Hôm nay',
      title: `Gọi ${tanner.customer}: đang nợ ${money(tanner.amount)}, quá hạn ${tanner.daysOverdue} ngày`,
      why: `Thu được khoản này là hết nguy cơ âm tiền ngày ${st.firstNeg ? md(st.firstNeg.date) : ''}.`,
      cta: 'Soạn tin nhắc nợ', run: () => setRemind(true),
    },
    {
      id: 'a2', tone: 'warn', icon: 'calendar', when: 'Thứ Sáu, 23/10',
      title: 'Trả Vận tải Bình Minh 42 tr',
      why: 'Trả trễ là cả 14 công trình bị dừng giao hàng.',
      cta: 'Lên lịch thanh toán', run: () => { setDone((d) => [...d, 'a2']); toast('Đã lên lịch thanh toán ngày 23/10'); },
    },
    {
      id: 'a3', tone: 'warn', icon: 'drop', when: 'Trong tuần',
      title: 'Chiết khấu của Trần Quốc Cường cao gấp 3 lần trung bình',
      why: 'Mất khoảng 9,1 tr mỗi tháng. 64% đơn của Cường rơi vào cùng 2 khách hàng.',
      cta: 'Xem chi tiết', run: () => go('leaks'),
    },
  ];

  return (
    <div className="screen">
      <header className="hello">
        <div>
          <div className="kicker">{wdMd(TODAY)} · {company.full}</div>
          <h1>Chào buổi sáng, {company.owner} <span className="wave-hand">👋</span></h1>
          <p className="lead">Hôm nay anh có <b>1 việc gấp</b> và <b>2 việc nên làm</b>. Mất khoảng 15 phút.</p>
        </div>
      </header>

      {/* HERO */}
      <section className="hero card glow">
        <div className="hero-ring">
          <Ring value={score} label={`${score}`} sub="Sức khoẻ" />
          <div className="hero-ring-t">
            <div className="pill warn"><Icon name="alert" size={14} /> Cần chú ý</div>
            <p>Lợi nhuận vẫn ổn, nhưng <b>tiền mặt đang mỏng dần</b> và 3 khoản trả nhà cung cấp dồn vào giữa tháng 11.</p>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <span>Tiền mặt hiện có</span>
            <b>{money(cashAnim)}</b>
            <em className="muted">Ngân hàng + quỹ tiền mặt</em>
          </div>
          <div className="hstat">
            <span>Số ngày tiền mặt trụ được</span>
            <b className="warn-t">{Math.round(runwayAnim)} ngày</b>
            <em className="bad-t">↓ từ {cash.runwayLastMonth} ngày tháng trước</em>
          </div>
          <div className="hstat clickable" onClick={() => go('cash')}>
            <span>Điểm thấp nhất trong 90 ngày tới</span>
            <b className="bad-t">{money(st.min.cash)}</b>
            <em>{wdMd(st.min.date)} · xem dự báo <Icon name="arrowR" size={13} /></em>
          </div>
        </div>
      </section>

      {/* BRIEF */}
      <section className="brief">
        <button className="card brief-i" onClick={() => go('profit')}>
          <div className="brief-top"><span className="dot-s good" />Doanh số tuần trước</div>
          <div className="brief-v">{money(weekSales.value)} <small className="good-t">{pct(weekSales.changePct)}</small></div>
          <Spark values={[520, 548, 571, 560, 588, 612]} tone="good" />
          <p>Bình thường, đúng nhịp mùa xây dựng.</p>
        </button>
        <button className="card brief-i" onClick={() => go('profit')}>
          <div className="brief-top"><span className="dot-s warn" />Lợi nhuận tháng 10</div>
          <div className="brief-v">{money(profit.curr)} <small className="bad-t">{money(profit.curr - profit.prev, { sign: true })}</small></div>
          <Spark values={paperVsCash.map((p) => p.paper)} tone="brand" />
          <p>Giảm chủ yếu do <b>giá nhập xi măng tăng</b>.</p>
        </button>
        <button className="card brief-i" onClick={() => go('profit')}>
          <div className="brief-top"><span className="dot-s bad" />Tiền thực thu tháng 10</div>
          <div className="brief-v">{money(paperVsCash[5].cash)} <small className="muted">/ {money(profit.curr)} lợi nhuận</small></div>
          <Spark values={paperVsCash.map((p) => p.cash)} tone="bad" />
          <p><b>{stuckPct}% lợi nhuận</b> vẫn còn nằm ở phía khách hàng.</p>
        </button>
        <button className="card brief-i" onClick={() => go('leaks')}>
          <div className="brief-top"><span className="dot-s bad" />Chỗ thất thoát tìm thấy</div>
          <div className="brief-v">{money(leakTotal, { decimals: 1 })}<small className="muted">/tháng</small></div>
          <div className="leak-dots">{leaks.map((l) => <i key={l.id} className={l.severity === 'high' ? 'bad' : 'warn'} />)}</div>
          <p>{leaks.length} chỗ đang âm thầm ăn mòn lợi nhuận.</p>
        </button>
      </section>

      {/* ACTIONS */}
      <section>
        <div className="sec-title"><div><div className="kicker">Việc cần làm</div><h2>3 việc tôi đề xuất anh làm</h2></div></div>
        <div className="actions">
          {actions.map((a, i) => (
            <div key={a.id} className={`card action ${a.tone} ${done.includes(a.id) ? 'done' : ''}`} style={{ animationDelay: `${i * 90}ms` }}>
              <div className="action-ic"><Icon name={done.includes(a.id) ? 'check' : a.icon} size={20} /></div>
              <div className="action-b">
                <div className="action-when">{a.when}</div>
                <h4>{a.title}</h4>
                <p>{a.why}</p>
              </div>
              <button className="btn" onClick={a.run} disabled={done.includes(a.id)}>{done.includes(a.id) ? 'Xong' : a.cta}</button>
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
