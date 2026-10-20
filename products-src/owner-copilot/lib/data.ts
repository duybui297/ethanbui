// Sample data — building-materials distributor (unit: thousand USD, so 412 = $412K)
// Replace this file with real API data when integrating.

export const TODAY = new Date(2026, 9, 19); // Oct 19, 2026

export const company = {
  name: 'Summit',
  full: 'Summit Building Supply',
  owner: 'Mark',
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
  importance: 'Critical' | 'Important' | 'Flexible';
  term: string; // notable term
  advice: string;
  action: 'pay-now' | 'pay-early' | 'pay-on-time' | 'negotiate';
  saving?: number;
};

export const payables: Payable[] = [
  {
    id: 'p5', supplier: 'Bayline Trucking', amount: 42, dueIn: 4, importance: 'Critical',
    term: 'Late payment → deliveries stop', action: 'pay-now',
    advice: 'Pay on Friday. If the trucks stop, deliveries stop for all 14 job sites.',
  },
  {
    id: 'p2', supplier: 'Northgate Steel', amount: 240, dueIn: 27, importance: 'Important',
    term: '2% discount if paid before Oct 25', action: 'pay-early', saving: 4.8,
    advice: 'Pay early only if Tanner Construction pays before Oct 24. Saves $4.8K — about 36% annualized.',
  },
  {
    id: 'p1', supplier: 'Coastal Cement Co.', amount: 186, dueIn: 12, importance: 'Critical',
    term: '0.05%/day penalty + stock hold', action: 'pay-on-time',
    advice: 'Main supplier, and building season is peaking. Pay on Oct 31 — do not delay.',
  },
  {
    id: 'p3', supplier: 'Redstone Tile & Brick', amount: 95, dueIn: 27, importance: 'Flexible',
    term: 'No late penalty', action: 'negotiate',
    advice: 'Ask for a 15-day extension. 6-year partner, never late with them — very likely to agree.',
  },
  {
    id: 'p4', supplier: 'Lumen Paints', amount: 58, dueIn: 27, importance: 'Flexible',
    term: 'No penalty, slow-moving stock', action: 'negotiate',
    advice: 'Offer 50% now and 50% at the end of November. Paint stock is sitting at 71 days.',
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
  { id: 'r1', customer: 'Tanner Construction', contact: 'Dave', amount: 150, daysOverdue: 38, invoices: 4, history: 'Usually 10–15 days late — this time unusually long', payProbability: 0.55 },
  { id: 'r5', customer: 'Crestview Dealers', contact: 'Lisa', amount: 48, daysOverdue: 52, invoices: 3, history: 'Promised to pay twice, has not paid', payProbability: 0.3 },
  { id: 'r2', customer: 'Fulton Contractors', contact: 'Ray', amount: 86, daysOverdue: 21, invoices: 2, history: 'Waiting on the project owner to release funds', payProbability: 0.6 },
  { id: 'r3', customer: 'Hughes Supply', contact: 'Ben', amount: 64, daysOverdue: 9, invoices: 2, history: 'Good customer, often forgets', payProbability: 0.9 },
  { id: 'r7', customer: 'Southpoint Builders', contact: 'Nina', amount: 33, daysOverdue: 4, invoices: 1, history: 'Good customer', payProbability: 0.95 },
  { id: 'r4', customer: 'Ankers Homes', contact: 'Kyle', amount: 120, daysOverdue: -10, invoices: 3, history: 'Always pays on time', payProbability: 0.95 },
  { id: 'r6', customer: 'Haven Interiors', contact: 'Grace', amount: 75, daysOverdue: -20, invoices: 2, history: 'Always pays on time', payProbability: 0.95 },
];

// October vs September profit — broken down by cause
export const profit = {
  prevLabel: 'September',
  currLabel: 'October (projected)',
  prev: 312,
  curr: 268,
  revenuePrev: 2480,
  revenueCurr: 2610,
  grossMargin: 0.22,
  opex: 306,
  drivers: [
    { label: 'Cement purchase price up 6%', value: -31, detail: 'Selling prices were not adjusted. 82% of cement orders still go out at the old price.' },
    { label: 'Westfield Developments bought 30% less', value: -22, detail: 'Second-largest customer. The Riverbend Residences project has been paused since Oct 5.' },
    { label: 'Discounts above policy', value: -9, detail: 'Concentrated in one sales rep. See Money Leaks.' },
    { label: 'Higher delivery costs', value: -7, detail: 'Fuel prices up, plus many small drops under 2 tons.' },
    { label: 'More premium tile sold', value: 18, detail: 'New product line with a 31% margin.' },
    { label: 'Steel price increase from Oct 10', value: 7, detail: 'Raised 2.5% — no pushback from customers.' },
  ],
};

// Profit on paper vs cash actually collected — last 6 months
export const paperVsCash = [
  { m: 'May', paper: 241, cash: 198 },
  { m: 'Jun', paper: 258, cash: 201 },
  { m: 'Jul', paper: 290, cash: 176 },
  { m: 'Aug', paper: 276, cash: 150 },
  { m: 'Sep', paper: 312, cash: 150 },
  { m: 'Oct', paper: 268, cash: 96 },
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
    id: 'l1', title: '3 products are selling below cost', perMonth: 11.4, severity: 'high',
    evidence: 'After discounts and delivery fees, every order of these 3 products loses money.',
    fix: 'Set a price floor in the sales system — block orders below cost + 3%.',
    items: [
      { name: 'Porcelain tile 24×24 Grade A', value: '−4.2%', bad: true },
      { name: 'Exterior paint, 5 gal', value: '−1.8%', bad: true },
      { name: 'PVC pipe 3"', value: '−0.6%', bad: true },
    ],
  },
  {
    id: 'l2', title: "Chris Turner's discounts are 3× the team average", perMonth: 9.1, severity: 'high',
    evidence: 'Average discount 18% (team: 6%). 64% of his orders go to the same 2 customers.',
    fix: 'Require owner approval for discounts above 8%. Review the 2 customers involved.',
    items: [
      { name: 'Chris Turner', value: '18.0%', bad: true },
      { name: 'Hannah Lee', value: '6.4%' },
      { name: 'Tom Nguyen', value: '5.9%' },
      { name: 'Brian Park', value: '5.1%' },
    ],
  },
  {
    id: 'l3', title: 'Delivery costs up 34%, volume up only 6%', perMonth: 7.2, severity: 'medium',
    evidence: '41% of deliveries are under 2 tons (July: 22%). Trucks are running half empty.',
    fix: 'Batch orders by route and add a delivery fee for orders under 2 tons.',
  },
  {
    id: 'l4', title: 'Crestview Dealers: the more we sell, the more we lose', perMonth: 3.5, severity: 'medium',
    evidence: '$210K revenue per quarter, but a 12% discount + small drops + 52 days overdue → negative real margin.',
    fix: 'Move them to prepayment or cut their discount to 5%.',
  },
  {
    id: 'l5', title: 'W6 steel I-beams sitting in stock for 96 days', perMonth: 2.8, severity: 'medium',
    evidence: 'Ties up $138K of capital. Cost of capital + storage ≈ $2.8K/month.',
    fix: 'Clear it at cost to the 2 contractors who have asked — frees $138K in cash.',
  },
];

export const weekSales = { value: 612, changePct: 4 };
