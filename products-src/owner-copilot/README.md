# Owner Copilot (Prototype)

A financial copilot for business owners. Instead of just showing numbers, it answers three questions: **Am I OK? Why? What should I do?**

Sample data: Summit Building Supply (a building-materials distributor). Amounts are in thousands of USD; "today" is Oct 19, 2026.

## 7 screens

| Screen | What it does |
|---|---|
| **Today** | Health score, cash runway, 4-card morning brief, 3 recommended actions with one-tap buttons |
| **Cash Flow** | 90-day forecast (red area when negative), hover for each day, toggle fixes and watch the curve change |
| **Profit** | Waterfall explaining why profit dropped; profit on paper vs cash actually collected |
| **Payables & Receivables** | Recommended payment order (penalties, discounts, how critical the supplier is), receivables aging, drafted payment reminders |
| **Money Leaks** | 5 places money is slipping away: below-cost sales, unusual discounts, delivery costs, unprofitable customer, slow stock |
| **What-if** | Sliders for price rise, customer loss, cost cuts, debt collection and loans → profit, runway and cash curve |
| **Ask Assistant** | Plain-English chat with voice input, powered by Gemini (falls back to built-in answers without a key) |

## Run on Google AI Studio (aistudio.google.com/apps)

**Option 1 — Import from GitHub (most reliable)**
1. Create a new GitHub repo and push this folder (no `node_modules` or `dist`).
2. Go to https://aistudio.google.com/apps → Build → **Import from GitHub** → pick the repo.
3. AI Studio converts it and opens the preview.

**Option 2 — Upload the zip**
1. In Build, create a new app with any prompt, then stop the agent.
2. Upload the zip in the file explorer (or drag in the files, keeping the folder structure).
3. If the preview still shows the default app, ask the agent: *"Delete the default files, keep only the code I uploaded, don't change its contents."*

**Option 3 — Empty app, paste the files**
Create these files at these paths and paste in the contents:

```
index.html  index.tsx  index.css  App.tsx  metadata.json
lib/        data.ts  finance.ts  format.ts  ai.ts
components/ ui.tsx  charts.tsx
screens/    Today.tsx  Cashflow.tsx  Profit.tsx  Debts.tsx  Leaks.tsx  Simulator.tsx  Ask.tsx
```

> **Gemini API key:** AI Studio provides the key. If the browser can't read it, Ask Assistant still works with built-in answers (labeled "Quick answer"). In that case you can ask the AI Studio agent: *"Move the Gemini call in lib/ai.ts to the server side."*

## Run locally

```bash
npm install
# optional: put GEMINI_API_KEY in .env.local
npm run dev
```

## Plugging in real data

All figures live in `lib/data.ts`. Forecast and simulation logic is in `lib/finance.ts`. Currency and date formatting are in `lib/format.ts` (change `money()` to switch currency, e.g. back to VND).
