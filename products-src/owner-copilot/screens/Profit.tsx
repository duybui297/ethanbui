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
      <SectionTitle kicker="Lợi nhuận" title="Vì sao lợi nhuận tháng này giảm?" />

      <div className="card pad profit-head">
        <div>
          <div className="big-num">{money(profit.curr)}</div>
          <div className="muted">Lợi nhuận tháng 10 dự kiến · doanh thu {money(profit.revenueCurr)}</div>
        </div>
        <div className="delta bad"><Icon name="trend" size={16} /> {money(profit.curr - profit.prev, { sign: true })} so với tháng 9</div>
      </div>

      <div className="grid-2">
        <div className="card pad">
          <div className="card-t">Từ {money(profit.prev)} xuống {money(profit.curr)}: từng nguyên nhân</div>
          <Waterfall start={profit.prev} end={profit.curr} startLabel={profit.prevLabel} endLabel="Tháng 10"
            drivers={profit.drivers} picked={picked} onPick={setPicked} />
        </div>
        <div className="card pad explain">
          {d && (
            <div key={picked} className="fade-in">
              <div className={`pill ${d.value < 0 ? 'bad' : 'good'}`}>{money(d.value, { sign: true })} / tháng</div>
              <h3>{d.label}</h3>
              <p>{d.detail}</p>
              {picked === 0 && (
                <div className="suggest">
                  <Icon name="spark" size={16} />
                  <div><b>Đề xuất:</b> tăng giá xi măng 4% cho đơn mới từ 1/11, lấy lại khoảng <b>24 tr/tháng</b>. Đối thủ trong khu vực đã tăng giá 5% từ 10/10.</div>
                </div>
              )}
              {picked === 1 && (
                <div className="suggest">
                  <Icon name="spark" size={16} />
                  <div><b>Đề xuất:</b> gọi Địa ốc Tây Đô hỏi khi nào dự án Ven Sông chạy lại. Nếu dừng quá 60 ngày, tìm sẵn 2 nhà thầu thay thế trong khu vực đó.</div>
                </div>
              )}
            </div>
          )}
          <p className="muted small">Chọn một dòng bất kỳ trên biểu đồ để xem giải thích.</p>
        </div>
      </div>

      <SectionTitle kicker="Tiền thật so với lãi trên sổ" title="Có lãi, sao vẫn thiếu tiền?" />
      <div className="grid-2">
        <div className="card pad">
          <div className="legend"><span><i className="lg paper" />Lãi trên sổ sách</span><span><i className="lg good" />Tiền thực thu</span></div>
          <PaperCash data={paperVsCash} />
        </div>
        <div className="card pad stack-insight">
          <div className="si-row"><span>Lợi nhuận tháng 10</span><b>{money(last.paper)}</b></div>
          <div className="si-bar"><i style={{ width: `${(last.cash / last.paper) * 100}%` }} /></div>
          <div className="si-row"><span className="good-t">● Tiền đã về tài khoản</span><b>{money(last.cash)}</b></div>
          <div className="si-row"><span className="bad-t">● Còn nằm ở khách hàng và tồn kho</span><b>{money(stuck)}</b></div>
          <div className="callout bad">
            <b>Khoảng chênh đã nới rộng 5 tháng liên tiếp</b>, từ {money(first.paper - first.cash)} (tháng 5) lên {money(stuck)} (tháng 10). Khách trả tiền ngày càng chậm, tổng nợ quá hạn là {money(overdue)}.
          </div>
        </div>
      </div>
    </div>
  );
}
