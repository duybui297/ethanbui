import React, { useEffect, useRef, useState } from 'react';
import { ask } from '../lib/ai';
import { company } from '../lib/data';
import { Icon } from '../components/ui';

type Msg = { role: 'me' | 'ai'; text: string; source?: 'gemini' | 'local' };

const SUGGEST = [
  'Who owes us the longest?',
  'Why did profit drop this month?',
  'Do I have enough cash to pay November bills?',
  'Where are we leaking money?',
  'What was our most profitable product?',
];

function render(text: string) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) => (p.startsWith('**') ? <b key={j}>{p.slice(2, -2)}</b> : p));
    if (/^\s*[•\-*]\s/.test(line)) return <li key={i}>{parts.map((p) => (typeof p === 'string' ? p.replace(/^\s*[•\-*]\s/, '') : p))}</li>;
    return line.trim() ? <p key={i}>{parts}</p> : <br key={i} />;
  });
}

export default function Ask() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'ai', text: `Hi ${company.owner}! Ask me anything in plain words about sales, profit, payables, receivables or cash flow — I'll answer with your company's real numbers.` },
  ]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [msgs, busy]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setQ('');
    setMsgs((m) => [...m, { role: 'me', text: t }]);
    setBusy(true);
    const r = await ask(t);
    setMsgs((m) => [...m, { role: 'ai', text: r.text, source: r.source }]);
    setBusy(false);
  };

  const voice = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setQ("This browser doesn't support voice input yet"); return; }
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = true;
    setListening(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const txt = Array.from(e.results).map((r: any) => r[0].transcript).join('');
      setQ(txt);
      if (e.results[e.results.length - 1].isFinal) { setListening(false); send(txt); }
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start();
  };

  return (
    <div className="screen chat">
      <div className="chat-head">
        <div className="ai-orb"><Icon name="spark" size={20} /></div>
        <div><h2>Ask the assistant</h2><span className="muted small">Answers from {company.full}'s numbers · powered by Gemini</span></div>
      </div>

      <div className="msgs">
        {msgs.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.role === 'ai' && <div className="msg-av"><Icon name="spark" size={14} /></div>}
            <div className="msg-b">
              {render(m.text)}
              {m.source && <span className={`src ${m.source}`}>{m.source === 'gemini' ? 'Gemini' : 'Quick answer'}</span>}
            </div>
          </div>
        ))}
        {busy && <div className="msg ai"><div className="msg-av"><Icon name="spark" size={14} /></div><div className="msg-b typing"><i /><i /><i /></div></div>}
        <div ref={end} />
      </div>

      <div className="chips scroll">
        {SUGGEST.map((s) => <button key={s} className="chip" onClick={() => send(s)} disabled={busy}>{s}</button>)}
      </div>
      <form className="composer" onSubmit={(e) => { e.preventDefault(); send(q); }}>
        <button type="button" className={`icon-btn mic ${listening ? 'live' : ''}`} onClick={voice} aria-label="Speak"><Icon name="mic" /></button>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask anything, e.g. how much did we collect this week?" />
        <button className="btn" disabled={!q.trim() || busy} aria-label="Send"><Icon name="send" size={16} /></button>
      </form>
    </div>
  );
}
