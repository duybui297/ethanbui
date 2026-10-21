import { cash, company, leaks, payables, paperVsCash, profit, receivables, weekSales } from './data';
import { baseScenario, forecast, forecastStats, runwayDays } from './finance';
import { md, money } from './format';

// Server-side Gemini proxy on the main site (keeps the API key out of the bundle).
const ASK_ENDPOINT = '/api/owner-copilot/ask';

function context() {
  const st = forecastStats(forecast(baseScenario));
  return JSON.stringify({
    company: company.full,
    today: '19/10/2026',
    unit: 'triệu đồng',
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

/** Rule-based answers — work without an API key. Matches with and without diacritics. */
export function localAnswer(q: string): string {
  const s = q.toLowerCase();
  const st = forecastStats(forecast(baseScenario));
  const negDate = st.firstNeg ? md(st.firstNeg.date) : '15/11';
  if (/(khách.*nợ|khach.*no|nợ lâu|no lau|quá hạn|qua han|ai nợ|ai no|thu nợ|thu no|phải thu|phai thu)/.test(s)) {
    const od = receivables.filter((r) => r.daysOverdue > 0).sort((a, b) => b.daysOverdue - a.daysOverdue);
    return `${od.length} khách đang quá hạn, tổng cộng ${money(od.reduce((a, r) => a + r.amount, 0))}:\n` +
      od.slice(0, 3).map((r) => `• ${r.customer}: ${money(r.amount)}, quá hạn ${r.daysOverdue} ngày`).join('\n') +
      `\n\nGọi Xây dựng Tân Tiến trước: riêng khoản 150 tr này đã đủ xoá nguy cơ âm tiền ngày ${negDate}.`;
  }
  if (/(lợi nhuận|loi nhuan|lãi|lai|lời|loi).*(giảm|giam|sụt|sut|thấp|thap|vì sao|vi sao|tại sao|tai sao)|(vì sao|vi sao|tại sao|tai sao|giảm|giam).*(lợi nhuận|loi nhuan|lãi|lời)/.test(s)) {
    const neg = profit.drivers.filter((d) => d.value < 0);
    return `Lợi nhuận tháng 10 dự kiến ${money(profit.curr)}, giảm ${money(profit.prev - profit.curr)} so với tháng 9. Nguyên nhân chính:\n` +
      neg.map((d) => `• ${d.label}: ${money(d.value)}`).join('\n') +
      `\n\nViệc nên làm: điều chỉnh giá bán xi măng ngay, đây là khoản lớn nhất (−31 tr).`;
  }
  if (/(sản phẩm|san pham|mặt hàng|mat hang|lời nhất|loi nhat|lãi nhất|lai nhat|bán chạy|ban chay)/.test(s)) {
    return `Gạch cao cấp là điểm sáng tháng này: biên lợi nhuận 31%, mang về thêm 18 tr lợi nhuận.\n\nNgược lại, 3 sản phẩm đang bán dưới giá vốn sau chiết khấu (gạch porcelain 60×60 loại A, sơn ngoại thất thùng 18L, ống PVC phi 90), làm mất khoảng 11,4 tr/tháng. Nên đặt giá sàn trên phần mềm bán hàng.`;
  }
  if (/(đủ tiền|du tien|tiền mặt|tien mat|dòng tiền|dong tien|âm tiền|am tien|thiếu tiền|thieu tien|trả nợ|tra no|nhà cung cấp|nha cung cap)/.test(s)) {
    return `Anh đang có ${money(cash.now)} tiền mặt. Nhưng ngày ${negDate} có 3 khoản trả nhà cung cấp (393 tr) đến hạn cùng lúc, nên tiền mặt dự kiến xuống thấp nhất ${money(st.min.cash)} vào ngày ${md(st.min.date)}.\n\nCó 2 cách xử lý:\n• Thu được 60% nợ quá hạn trong 14 ngày → tiền mặt không bao giờ âm.\n• Xin Gạch ngói Hồng Sơn gia hạn 15 ngày + trả trước 50% cho Sơn Ánh Dương.`;
  }
  if (/(thất thoát|that thoat|rò rỉ|ro ri|lãng phí|lang phi|chiết khấu|chiet khau|mất tiền|mat tien)/.test(s)) {
    const t = leaks.reduce((a, l) => a + l.perMonth, 0);
    return `Tôi tìm thấy ${leaks.length} chỗ thất thoát, tổng khoảng ${money(t, { decimals: 1 })}/tháng. Lớn nhất là:\n` +
      leaks.slice(0, 3).map((l) => `• ${l.title}: ${money(l.perMonth, { decimals: 1 })}/tháng`).join('\n') +
      `\n\nLàm ngay: bắt buộc anh duyệt mọi chiết khấu trên 8%.`;
  }
  return `Tóm tắt nhanh:\n• Tiền mặt ${money(cash.now)}, đủ trả chi phí cố định trong ${runwayDays(baseScenario)} ngày.\n• Lợi nhuận tháng 10 dự kiến ${money(profit.curr)} (giảm ${money(profit.prev - profit.curr)}).\n• Rủi ro: tiền mặt có thể âm vào ngày ${negDate}.\n\nThử hỏi: "Khách nào nợ lâu nhất?" hoặc "Vì sao lợi nhuận giảm?"`;
}

export function reminderMessage(contact: string, amount: number, days: number, invoices: number) {
  const body = days > 30
    ? `Hiện bên mình còn ${invoices} hoá đơn, tổng ${amount} triệu đồng, đã quá hạn ${days} ngày. Bên em đang chốt sổ tháng 10, ${contact} sắp xếp thanh toán giúp em trước ngày 25/10 được không ạ?`
    : `Em nhắc nhẹ: ${invoices} hoá đơn tổng ${amount} triệu đồng đã quá hạn ${days} ngày. Khi nào tiện ${contact} kiểm tra giúp em nhé.`;
  return `Chào ${contact},\nEm là Minh bên ${company.full}. ${body}\nNếu cần bảng đối chiếu công nợ, ${contact} cứ báo em gửi ngay. Cảm ơn ${contact} đã luôn ủng hộ bên em! 🙏`;
}
