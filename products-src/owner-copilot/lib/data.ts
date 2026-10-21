// Sample data — building-materials distributor (unit: million VND, so 412 = 412 triệu đồng)
// Replace this file with real API data when integrating.

export const TODAY = new Date(2026, 9, 19); // 19/10/2026

export const company = {
  name: 'Đại Phát',
  full: 'Công ty VLXD Đại Phát',
  owner: 'anh Minh',
  short: 'ĐP',
};

export const cash = {
  now: 412, // cash on hand + bank
  dailyFixedCost: 9.8, // average fixed cost per day (payroll, warehouse, trucks, utilities…)
  runwayLastMonth: 65,
};

export type Payable = {
  id: string;
  supplier: string;
  amount: number;
  dueIn: number; // days until due
  importance: 'Sống còn' | 'Quan trọng' | 'Linh hoạt';
  term: string; // notable term
  advice: string;
  action: 'pay-now' | 'pay-early' | 'pay-on-time' | 'negotiate';
  saving?: number;
};

export const payables: Payable[] = [
  {
    id: 'p5', supplier: 'Vận tải Bình Minh', amount: 42, dueIn: 4, importance: 'Sống còn',
    term: 'Trả trễ → ngừng chở hàng', action: 'pay-now',
    advice: 'Trả trong thứ Sáu. Nếu xe ngừng chạy, cả 14 công trình đều bị dừng giao hàng.',
  },
  {
    id: 'p2', supplier: 'Thép Bắc Nam', amount: 240, dueIn: 27, importance: 'Quan trọng',
    term: 'Chiết khấu 2% nếu trả trước 25/10', action: 'pay-early', saving: 4.8,
    advice: 'Chỉ trả sớm nếu Xây dựng Tân Tiến trả tiền trước 24/10. Tiết kiệm 4,8 tr, tương đương lãi khoảng 36%/năm.',
  },
  {
    id: 'p1', supplier: 'Xi măng Duyên Hải', amount: 186, dueIn: 12, importance: 'Sống còn',
    term: 'Phạt 0,05%/ngày + giữ hàng', action: 'pay-on-time',
    advice: 'Nhà cung cấp chính, lại đang cao điểm mùa xây dựng. Trả đúng ngày 31/10, đừng để trễ.',
  },
  {
    id: 'p3', supplier: 'Gạch ngói Hồng Sơn', amount: 95, dueIn: 27, importance: 'Linh hoạt',
    term: 'Không phạt trả trễ', action: 'negotiate',
    advice: 'Xin gia hạn 15 ngày. Đối tác 6 năm, mình chưa từng trả trễ, khả năng cao họ đồng ý.',
  },
  {
    id: 'p4', supplier: 'Sơn Ánh Dương', amount: 58, dueIn: 27, importance: 'Linh hoạt',
    term: 'Không phạt, hàng bán chậm', action: 'negotiate',
    advice: 'Đề nghị trả 50% bây giờ, 50% còn lại cuối tháng 11. Hàng sơn đang tồn 71 ngày.',
  },
];

export type Receivable = {
  id: string;
  customer: string;
  contact: string;
  amount: number;
  daysOverdue: number; // negative = not yet due
  invoices: number;
  history: string;
  payProbability: number;
};

export const receivables: Receivable[] = [
  { id: 'r1', customer: 'Xây dựng Tân Tiến', contact: 'anh Dũng', amount: 150, daysOverdue: 38, invoices: 4, history: 'Thường trễ 10–15 ngày, lần này trễ lâu bất thường', payProbability: 0.55 },
  { id: 'r5', customer: 'Đại lý Phước Lộc', contact: 'chị Lan', amount: 48, daysOverdue: 52, invoices: 3, history: 'Đã hứa trả 2 lần nhưng chưa trả', payProbability: 0.3 },
  { id: 'r2', customer: 'Nhà thầu Phú Thành', contact: 'anh Hùng', amount: 86, daysOverdue: 21, invoices: 2, history: 'Đang chờ chủ đầu tư giải ngân', payProbability: 0.6 },
  { id: 'r3', customer: 'VLXD Hưng Thịnh', contact: 'anh Bảo', amount: 64, daysOverdue: 9, invoices: 2, history: 'Khách tốt, hay quên', payProbability: 0.9 },
  { id: 'r7', customer: 'Xây dựng Nam Phong', contact: 'chị Ngân', amount: 33, daysOverdue: 4, invoices: 1, history: 'Khách tốt', payProbability: 0.95 },
  { id: 'r4', customer: 'Nhà đẹp An Khang', contact: 'anh Khải', amount: 120, daysOverdue: -10, invoices: 3, history: 'Luôn trả đúng hạn', payProbability: 0.95 },
  { id: 'r6', customer: 'Nội thất Hải Vân', contact: 'chị Giang', amount: 75, daysOverdue: -20, invoices: 2, history: 'Luôn trả đúng hạn', payProbability: 0.95 },
];

// October vs September profit — broken down by cause
export const profit = {
  prevLabel: 'Tháng 9',
  currLabel: 'Tháng 10 (dự kiến)',
  prev: 312,
  curr: 268,
  revenuePrev: 2480,
  revenueCurr: 2610,
  grossMargin: 0.22,
  opex: 306,
  drivers: [
    { label: 'Giá nhập xi măng tăng 6%', value: -31, detail: 'Giá bán chưa điều chỉnh. 82% đơn xi măng vẫn đang xuất theo giá cũ.' },
    { label: 'Địa ốc Tây Đô mua ít hơn 30%', value: -22, detail: 'Khách lớn thứ hai. Dự án Khu dân cư Ven Sông tạm dừng từ 5/10.' },
    { label: 'Chiết khấu vượt chính sách', value: -9, detail: 'Tập trung ở một nhân viên kinh doanh. Xem mục Thất thoát.' },
    { label: 'Chi phí giao hàng tăng', value: -7, detail: 'Giá xăng dầu tăng, thêm nhiều chuyến nhỏ dưới 2 tấn.' },
    { label: 'Bán được nhiều gạch cao cấp', value: 18, detail: 'Dòng sản phẩm mới, biên lợi nhuận 31%.' },
    { label: 'Tăng giá thép từ 10/10', value: 7, detail: 'Tăng 2,5%, khách hàng không phản ứng.' },
  ],
};

// Profit on paper vs cash actually collected — last 6 months
export const paperVsCash = [
  { m: 'T5', paper: 241, cash: 198 },
  { m: 'T6', paper: 258, cash: 201 },
  { m: 'T7', paper: 290, cash: 176 },
  { m: 'T8', paper: 276, cash: 150 },
  { m: 'T9', paper: 312, cash: 150 },
  { m: 'T10', paper: 268, cash: 96 },
];

export type Leak = {
  id: string;
  title: string;
  perMonth: number;
  severity: 'high' | 'medium';
  evidence: string;
  fix: string;
  items?: { name: string; value: string; bad?: boolean }[];
};

export const leaks: Leak[] = [
  {
    id: 'l1', title: '3 sản phẩm đang bán dưới giá vốn', perMonth: 11.4, severity: 'high',
    evidence: 'Sau chiết khấu và phí giao hàng, mỗi đơn của 3 sản phẩm này đều lỗ.',
    fix: 'Đặt giá sàn trên phần mềm bán hàng, chặn đơn thấp hơn giá vốn + 3%.',
    items: [
      { name: 'Gạch porcelain 60×60 loại A', value: '−4,2%', bad: true },
      { name: 'Sơn ngoại thất thùng 18L', value: '−1,8%', bad: true },
      { name: 'Ống PVC phi 90', value: '−0,6%', bad: true },
    ],
  },
  {
    id: 'l2', title: 'Chiết khấu của Trần Quốc Cường cao gấp 3 lần trung bình', perMonth: 9.1, severity: 'high',
    evidence: 'Chiết khấu trung bình 18% (cả nhóm: 6%). 64% đơn của Cường rơi vào cùng 2 khách hàng.',
    fix: 'Bắt buộc chủ duyệt mọi chiết khấu trên 8%. Rà soát lại 2 khách hàng liên quan.',
    items: [
      { name: 'Trần Quốc Cường', value: '18,0%', bad: true },
      { name: 'Lê Thu Hà', value: '6,4%' },
      { name: 'Nguyễn Văn Tâm', value: '5,9%' },
      { name: 'Phạm Bảo', value: '5,1%' },
    ],
  },
  {
    id: 'l3', title: 'Chi phí giao hàng tăng 34%, sản lượng chỉ tăng 6%', perMonth: 7.2, severity: 'medium',
    evidence: '41% chuyến giao dưới 2 tấn (tháng 7: 22%). Xe đang chạy nửa tải.',
    fix: 'Gom đơn theo tuyến và thu phí giao hàng với đơn dưới 2 tấn.',
  },
  {
    id: 'l4', title: 'Đại lý Phước Lộc: bán càng nhiều càng lỗ', perMonth: 3.5, severity: 'medium',
    evidence: 'Doanh thu 210 tr/quý, nhưng chiết khấu 12% + chuyến giao nhỏ + nợ quá hạn 52 ngày → biên thực tế âm.',
    fix: 'Chuyển sang thanh toán trước hoặc giảm chiết khấu xuống 5%.',
  },
  {
    id: 'l5', title: 'Thép hình I150 tồn kho 96 ngày', perMonth: 2.8, severity: 'medium',
    evidence: 'Chôn 138 tr vốn. Chi phí vốn + lưu kho ≈ 2,8 tr/tháng.',
    fix: 'Xả hàng bằng giá vốn cho 2 nhà thầu đã hỏi mua, thu về 138 tr tiền mặt.',
  },
];

export const weekSales = { value: 612, changePct: 4 };
