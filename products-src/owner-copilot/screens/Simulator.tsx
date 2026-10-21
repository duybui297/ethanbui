import React, { useMemo, useState } from 'react';
import { baseScenario, forecast, forecastStats, monthlyProfit, runwayDays, Scenario } from '../lib/finance';
import { money, useCountUp, wdMd } from '../lib/format';
import { ForecastChart } from '../components/charts';
import { Icon, SectionTitle } from '../components/ui';

type K = 'priceUpPct' | 'customerLossPct' | 'opexCutPct' | 'loan' | 'collectOverduePct';
const SLIDERS: { k: K; label: string; min: number; max: number; step: number; fmt: (v: number) => string; hint: string }[] = [
  { k: 'priceUpPct', label: 'Tăng giá bán', min: 0, max: 10, step: 0.5, fmt: (v) => `${String(v).replace('.', ',')}%`, hint: 'Áp dụng cho mọi sản phẩm' },
  { k: 'customerLossPct', label: 'Khách bỏ đi do tăng giá', min: 0, max: 30, step: 1, fmt: (v) => `${v}%`, hint: 'Sản lượng giảm tương ứng' },
  { k: 'opexCutPct', label: 'Cắt giảm chi phí cố định', min: 0, max: 25, step: 1, fmt: (v) => `${v}%`, hint: 'Kho bãi, xe tải, văn phòng, nhân sự' },
  { k: 'collectOverduePct', label: 'Thu nợ quá hạn trong 14 ngày', min: 0, max: 100, step: 5, fmt: (v) => `${v}%`, hint: 'Trên 284 tr nợ khó đòi' },
  { k: 'loan', label: 'Vay ngân hàng (9%/năm)', min: 0, max: 800, step: 50, fmt: (v) => `${v} tr`, hint: 'Giải ngân sau 3 ngày' },
];
const PRESETS: { label: string; s: Partial<Scenario> }[] = [
  { label: 'Tăng giá 5%, mất 10% khách', s: { priceUpPct: 5, customerLossPct: 10 } },
  { label: 'Vay 500 tr', s: { loan: 500 } },
  { label: 'Đòi nợ quyết liệt + cắt 10% chi phí', s: { collectOverduePct: 70, opexCutPct: 10 } },
];

function Out({ label, value, base, fmt, good }: { label: string; value: number; base: number; fmt: (n: number) => string; good: (d: number) => boolean }) {
  const v = useCountUp(value, 500);
  const d = value - base;
  return (
    <div className="out">
      <span>{label}</span>
      <b>{fmt(v)}</b>
      {Math.abs(d) > 0.5 ? <em className={good(d) ? 'good-t' : 'bad-t'}>{d > 0 ? '▲' : '▼'} {fmt(Math.abs(d))} so với hiện tại</em> : <em className="muted">như hiện tại</em>}
    </div>
  );
}

export default function Simulator() {
  const [s, setS] = useState<Scenario>(baseScenario);
  const pts = useMemo(() => forecast(s), [s]);
  const base = useMemo(() => forecast(baseScenario), []);
  const st = forecastStats(pts), bst = forecastStats(base);
  const mp = monthlyProfit(s).profit, bmp = monthlyProfit(baseScenario).profit;
  const rw = runwayDays(s), brw = runwayDays(baseScenario);
  const changed = JSON.stringify(s) !== JSON.stringify(baseScenario);

  const verdict = useMemo(() => {
    if (!changed) return 'Kéo các thanh trượt để xem quyết định của anh ảnh hưởng thế nào tới lợi nhuận và dòng tiền.';
    const parts: string[] = [];
    parts.push(mp >= bmp ? `Lợi nhuận tăng ${money(mp - bmp)}/tháng` : `Lợi nhuận giảm ${money(bmp - mp)}/tháng`);
    parts.push(st.min.cash >= 0 ? 'tiền mặt dương suốt 90 ngày' : `tiền mặt vẫn âm từ ${st.firstNeg ? wdMd(st.firstNeg.date) : ''}`);
    if (s.loan > 0) parts.push(`tiền lãi ${money((s.loan * 0.09) / 12, { decimals: 1 })}/tháng`);
    return parts.join(', ') + '.';
  }, [s, changed, mp, bmp, st]);

  return (
    <div className="screen">
      <SectionTitle kicker="Mô phỏng quyết định" title="Nếu như…?" right={changed ? <button className="btn ghost sm" onClick={() => setS(baseScenario)}>Đặt lại</button> : undefined} />

      <div className="chips">
        {PRESETS.map((p) => <button key={p.label} className="chip" onClick={() => setS({ ...baseScenario, ...p.s })}><Icon name="spark" size={14} />{p.label}</button>)}
      </div>

      <div className="sim">
        <div className="card pad sliders">
          {SLIDERS.map((sl) => (
            <div key={sl.k} className="sl">
              <div className="sl-h"><span>{sl.label}</span><b>{sl.fmt(s[sl.k])}</b></div>
              <input type="range" min={sl.min} max={sl.max} step={sl.step} value={s[sl.k]} aria-label={sl.label}
                style={{ ['--p' as string]: `${((s[sl.k] - sl.min) / (sl.max - sl.min)) * 100}%` }}
                onChange={(e) => setS((x) => ({ ...x, [sl.k]: Number(e.target.value) }))} />
              <div className="muted small">{sl.hint}</div>
            </div>
          ))}
          <label className="sl-toggle">
            <span className={`switch ${s.negotiate ? 'on' : ''}`}><i /></span>
            <input type="checkbox" hidden checked={s.negotiate} onChange={(e) => setS((x) => ({ ...x, negotiate: e.target.checked }))} />
            <span><b>Gia hạn 2 nhà cung cấp linh hoạt</b><em className="muted small">Gạch ngói Hồng Sơn, Sơn Ánh Dương</em></span>
          </label>
        </div>

        <div className="sim-r">
          <div className={`card pad verdict-s ${!changed ? '' : st.min.cash >= 0 ? 'ok' : 'risk'}`}>
            <Icon name="spark" size={18} /><p>{verdict}</p>
          </div>
          <div className="outs">
            <Out label="Lợi nhuận / tháng" value={mp} base={bmp} fmt={(n) => money(n)} good={(d) => d > 0} />
            <Out label="Số ngày tiền mặt trụ được" value={rw} base={brw} fmt={(n) => `${Math.round(n)} ngày`} good={(d) => d > 0} />
            <Out label="Tiền mặt thấp nhất" value={st.min.cash} base={bst.min.cash} fmt={(n) => money(n)} good={(d) => d > 0} />
          </div>
          <div className="card pad">
            <div className="legend"><span><i className="lg good" />Kịch bản của anh</span>{changed && <span><i className="lg ghost" />Hiện tại</span>}</div>
            <ForecastChart points={pts} ghost={changed ? base : undefined} height={240} />
          </div>
        </div>
      </div>
    </div>
  );
}
