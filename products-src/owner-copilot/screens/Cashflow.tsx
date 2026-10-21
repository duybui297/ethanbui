import React, { useMemo, useState } from 'react';
import { baseScenario, forecast, forecastStats, Scenario } from '../lib/finance';
import { md, money, wdMd, weekday } from '../lib/format';
import { ForecastChart } from '../components/charts';
import { Icon, SectionTitle } from '../components/ui';
import type { Tab } from '../App';

const FIXES: { key: string; label: string; desc: string; patch: Partial<Scenario> }[] = [
  { key: 'collect', label: 'Thu 60% nợ quá hạn', desc: 'Tân Tiến, Phú Thành, Phước Lộc, trong 14 ngày', patch: { collectOverduePct: 60 } },
  { key: 'negotiate', label: 'Gia hạn 2 nhà cung cấp linh hoạt', desc: 'Hồng Sơn +15 ngày, Ánh Dương trả trước 50%', patch: { negotiate: true } },
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
      <SectionTitle kicker="Dự báo dòng tiền 90 ngày" title="Tôi có đủ tiền trả nợ không?" />

      <div className={`verdict card ${safe ? 'ok' : 'risk'}`}>
        <div className="verdict-ic"><Icon name={safe ? 'shield' : 'alert'} size={26} /></div>
        <div>
          {safe ? (
            <>
              <h3>An toàn: tiền mặt không lúc nào bị âm</h3>
              <p>Điểm thấp nhất là <b>{money(st.min.cash)}</b> vào {wdMd(st.min.date)}. So với không làm gì: tốt hơn <b className="good-t">{money(st.min.cash - bst.min.cash, { sign: true })}</b>.</p>
            </>
          ) : (
            <>
              <h3>Từ {st.firstNeg && wdMd(st.firstNeg.date)}, tiền mặt có thể xuống {money(st.min.cash)}</h3>
              <p>Lý do: 3 khoản trả nhà cung cấp (393 tr) cùng đến hạn ngày 15/11, trong khi 3 khách quá hạn đang giữ 284 tr. Tiền mặt bị âm khoảng <b>{st.negDays} ngày</b>.</p>
            </>
          )}
        </div>
      </div>

      <div className="card pad">
        <div className="chart-head">
          <div className="legend">
            <span><i className="lg good" />Tiền mặt dự kiến</span>
            {on.length > 0 && <span><i className="lg ghost" />Nếu không làm gì</span>}
          </div>
          <span className="muted small">Rê chuột hoặc chạm để xem từng ngày</span>
        </div>
        <ForecastChart points={pts} ghost={on.length ? base : undefined} />
      </div>

      <SectionTitle kicker="Thử xem" title="Nếu anh làm thế này thì sao…" />
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
          <span className="fix-t"><b>Mô phỏng chi tiết hơn</b><em>Vay vốn, tăng giá, cắt giảm chi phí…</em></span>
          <Icon name="arrowR" />
        </button>
      </div>

      <SectionTitle kicker="35 ngày tới" title="Các khoản thu chi lớn" />
      <div className="card list">
        {upcoming.map(({ p, e }, i) => (
          <div key={i} className="li">
            <div className="li-date"><b>{md(p.date)}</b><span>{weekday(p.date)}</span></div>
            <div className="li-main">{e.label}</div>
            <div className={`li-amt ${e.amt < 0 ? 'bad-t' : 'good-t'}`}>{money(e.amt, { sign: true })}</div>
            <div className={`li-bal ${p.cash < 0 ? 'bad-t' : 'muted'}`}>số dư {money(p.cash)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
