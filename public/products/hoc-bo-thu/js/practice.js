/* Hai dạng luyện tập */
(function () {
  'use strict';
  const A = window.APP, R = A.R, el = A.el;

  const COUNTS = [5, 10, 20, 30, 50, 100, 150, 170, 185];
  const STROKES = [...new Set(R.map(r => r.s))].sort((a, b) => a - b);

  /* ---------- kho câu hỏi ---------- */

  /* Dạng 1: mỗi DẠNG CHỮ là một câu riêng.
     => 火 và 灬 nằm ở hai vị trí khác nhau trong đề. */
  function poolType1() {
    const out = [];
    R.forEach(r => r.f.forEach(c => out.push({ ch: c, no: r.n, s: [r.s] })));
    return out;
  }

  /* Dạng 2: mỗi PHIÊN ÂM là một câu.
     Gộp theo phiên âm VIẾT ĐÚNG DẤU — chỉ những bộ đọc y hệt nhau
     (Nhân 人 / 儿, Cân 巾 / 斤…) mới chung một câu và chấp nhận mọi đáp án hợp lệ.
     Nhất 一 và Nhật 日 khác dấu nên vẫn là hai câu riêng. */
  function poolType2() {
    const map = new Map();
    R.forEach(r => {
      const k = A.norm(r.hv, false);
      if (!map.has(k)) map.set(k, { hv: r.hv, group: [] });
      map.get(k).group.push(r);
    });
    // Câu gộp nhiều bộ khác số nét (Cân 巾 3 nét / 斤 4 nét) sẽ thuộc CẢ HAI nhóm nét.
    return [...map.values()].map(q =>
      Object.assign(q, { s: [...new Set(q.group.map(r => r.s))] }));
  }

  /* Lọc theo các nhóm số nét đã chọn. Mảng rỗng = lấy tất cả. */
  function byStrokes(pool, picked) {
    if (!picked.length) return pool;
    const want = new Set(picked);
    return pool.filter(q => q.s.some(x => want.has(x)));
  }

  /* ---------- chấm điểm ---------- */
  function gradeT1(q, input, loose) {
    const got = A.norm(input, loose);
    if (!got) return false;
    return A.radicalsByChar(q.ch).some(r =>
      A.readings(r).some(x => A.norm(x, loose) === got));
  }

  function gradeT2(q, boxes) {
    const got = boxes.map(s => (s || '').trim()).filter(Boolean);
    if (!got.length) return false;
    // đúng khi tập ký tự nhập vào trùng khớp hoàn toàn với tập dạng chữ của MỘT bộ trong nhóm
    return q.group.some(r => {
      if (r.f.length !== got.length) return false;
      const need = r.f.slice();
      return got.every(g => {
        const i = need.indexOf(g);
        if (i < 0) return false;
        need.splice(i, 1);
        return true;
      });
    });
  }

  function answersT2(q) {
    return q.group.map(r => r.f.join(' ')).join('  hoặc  ');
  }

  /* Mốc số câu hợp lệ cho một kho đề: chỉ những mốc NHỎ HƠN kho, cộng "tất cả".
     Kho 7 câu  -> 5, tất cả(7)
     Kho 25 câu -> 5, 10, 20, tất cả(25) */
  function countsFor(size) {
    return COUNTS.filter(c => c < size).concat(['all']);
  }

  /* ---------- màn hình ---------- */
  function render(view, type) {
    view.innerHTML = '';
    const P = A.store.prefs;
    if (P.count == null) P.count = 20;
    if (P.loose == null) P.loose = true;
    if (P.hint == null) P.hint = false;
    if (!Array.isArray(P.strokes)) P.strokes = [];   // [] = tất cả số nét

    const full = type === 1 ? poolType1() : poolType2();

    view.appendChild(el('h1', {
      text: type === 1 ? 'Dạng 1 — Nhìn bộ thủ, đoán phiên âm'
                       : 'Dạng 2 — Nhìn phiên âm, viết bộ thủ'
    }));
    view.appendChild(el('p', {
      class: 'sub',
      text: type === 1
        ? 'Mỗi dạng chữ là một câu riêng — bộ có cả phồn thể và giản thể sẽ xuất hiện ở hai vị trí khác nhau.'
        : 'Mỗi câu có 2 ô. Bộ có 2 dạng chữ thì phải điền đủ cả 2 và đúng cả 2 mới được tính điểm.'
    }));

    const cfg = el('div', { class: 'card cfg' });

    /* --- bước 1: số nét --- */
    cfg.appendChild(el('p', { class: 'lbl', text: '① Số nét bộ thủ' }));
    const sChips = el('div', { class: 'chips' });
    cfg.appendChild(sChips);

    /* --- bước 2: số câu --- */
    const lbl2 = el('p', { class: 'lbl', style: 'margin-top:20px', text: '② Số câu mỗi lần luyện tập' });
    cfg.appendChild(lbl2);
    const cChips = el('div', { class: 'chips' });
    cfg.appendChild(cChips);

    const opts = el('div', { class: 'row', style: 'margin-top:16px' });
    opts.appendChild(toggle('Chấp nhận thiếu dấu thanh', P.loose, v => { P.loose = v; A.save(); }));
    if (type === 2) opts.appendChild(toggle('Hiện nghĩa để gợi ý', P.hint, v => {
      P.hint = v; A.save(); render(view, type);
    }));
    cfg.appendChild(opts);

    const startBtn = el('button', { class: 'btn btn-pri', text: 'Bắt đầu đề mới', onclick: () => start(null, true) });
    cfg.appendChild(el('div', { class: 'row', style: 'margin-top:18px' }, [startBtn]));
    view.appendChild(cfg);

    const stale = el('div', { class: 'note', hidden: true, style: 'margin-top:14px',
      text: 'Cấu hình đã đổi nhưng đề bên dưới bạn đang làm dở — bấm "Bắt đầu đề mới" để áp dụng.' });
    cfg.appendChild(stale);

    const area = el('div');
    view.appendChild(area);

    let exam = null;

    /* Đổi cấu hình: sinh lại đề luôn nếu chưa gõ gì,
       còn nếu đang làm dở thì giữ đề cũ và báo cho biết. */
    function applyChange() {
      paintChips();
      if (!exam || (!exam.done() && !exam.dirty())) { stale.hidden = true; start(null, false); }
      else stale.hidden = false;
    }

    /* vẽ lại hai hàng chip mỗi khi lựa chọn đổi */
    function paintChips() {
      const pool = byStrokes(full, P.strokes);

      /* hàng số nét */
      sChips.innerHTML = '';
      sChips.appendChild(el('button', {
        class: 'chip' + (P.strokes.length ? '' : ' on'),
        text: `Tất cả (${full.length})`,
        onclick: () => { P.strokes = []; A.save(); applyChange(); }
      }));
      STROKES.forEach(s => {
        const n = byStrokes(full, [s]).length;
        if (!n) return;
        const on = P.strokes.includes(s);
        sChips.appendChild(el('button', {
          class: 'chip' + (on ? ' on' : ''),
          text: `${s} nét (${n})`,
          onclick: () => {
            P.strokes = on ? P.strokes.filter(x => x !== s) : P.strokes.concat(s).sort((a, b) => a - b);
            A.save(); applyChange();
          }
        }));
      });

      /* hàng số câu — sinh theo kho đề hiện tại */
      const valid = countsFor(pool.length);
      const eff = valid.includes(P.count) ? P.count : 'all';
      cChips.innerHTML = '';
      valid.forEach(c => {
        cChips.appendChild(el('button', {
          class: 'chip' + (eff === c ? ' on' : ''),
          text: c === 'all' ? `Tất cả (${pool.length})` : String(c),
          onclick: () => { P.count = c; A.save(); applyChange(); }
        }));
      });

      lbl2.textContent = `② Số câu mỗi lần luyện tập — kho đề hiện tại ${pool.length} câu`;
      startBtn.disabled = pool.length === 0;
    }

    function start(questions, scroll) {
      const pool = byStrokes(full, P.strokes);
      if (!pool.length) return;
      const valid = countsFor(pool.length);
      const eff = valid.includes(P.count) ? P.count : 'all';
      const n = eff === 'all' ? pool.length : Math.min(eff, pool.length);
      const qs = Array.isArray(questions) ? questions : A.shuffle(pool).slice(0, n);
      stale.hidden = true;
      exam = renderExam(area, type, qs, P, start);
      if (scroll !== false) area.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    paintChips();
    start(null, false);
  }

  function toggle(label, val, cb) {
    const box = el('input', { type: 'checkbox', onchange: e => cb(e.target.checked) });
    box.checked = !!val;
    return el('label', { class: 'switch' }, [box, el('span', { text: label })]);
  }

  /* ---------- đề thi ---------- */
  function renderExam(area, type, qs, P, restart) {
    area.innerHTML = '';
    const inputs = [];

    const list = el('div', { class: 'qlist' });
    qs.forEach((q, i) => {
      const idx = el('div', { class: 'idx', text: i + 1 });
      const body = el('div', { class: 'qbody' });
      let fields;

      if (type === 1) {
        body.appendChild(el('div', { class: 'prompt-k han', text: q.ch }));
        const inp = el('input', { type: 'text', placeholder: 'phiên âm Hán-Việt…',
          autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' });
        body.appendChild(inp);
        fields = [inp];
      } else {
        body.appendChild(el('div', { class: 'prompt-hv', text: q.hv }));
        if (P.hint) body.appendChild(el('div', { class: 'vi muted',
          style: 'font-size:12.5px;margin-top:-4px',
          text: q.group.map(r => r.mean).join(' / ') }));
        const a = el('input', { type: 'text', maxlength: 2, autocomplete: 'off', spellcheck: 'false' });
        const b = el('input', { type: 'text', maxlength: 2, autocomplete: 'off', spellcheck: 'false' });
        body.appendChild(el('div', { class: 'two' }, [a, b]));
        fields = [a, b];
      }

      const card = el('div', { class: 'q' }, [idx, body]);
      inputs.push({ q, fields, card, body });
      list.appendChild(card);
    });
    area.appendChild(list);

    /* enter = câu tiếp theo */
    const flat = inputs.flatMap(x => x.fields);
    flat.forEach((f, i) => f.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); (flat[i + 1] || submitBtn).focus(); }
    }));

    const scoreBox = el('div', { class: 'score' });
    const submitBtn = el('button', { class: 'btn btn-pri', text: 'Nộp bài', onclick: submit });
    const bar = el('div', { class: 'bar' }, [el('i', { style: 'width:0%' })]);
    const bottom = el('div', { class: 'sticky' }, [submitBtn, bar, scoreBox]);
    area.appendChild(bottom);

    let done = false;

    function submit() {
      if (done) return;
      done = true;
      let right = 0;
      const wrong = [];
      inputs.forEach(x => {
        const vals = x.fields.map(f => f.value);
        const ok = type === 1
          ? gradeT1(x.q, vals[0], P.loose)
          : gradeT2(x.q, vals);
        x.fields.forEach(f => f.readOnly = true);
        x.card.classList.add(ok ? 'ok' : 'no');
        if (ok) { right++; x.body.appendChild(el('div', { class: 'yes', text: '✓ Chính xác' })); }
        else {
          wrong.push(x.q);
          const ans = type === 1
            ? A.radicalsByChar(x.q.ch).map(r => A.readings(r).join(' / ')).join(' hoặc ')
            : answersT2(x.q);
          x.body.appendChild(el('div', { class: 'fix',
            html: '✕ Đáp án: ' + (type === 2 ? '<span class="han">' + A.esc(ans) + '</span>' : A.esc(ans)) }));
        }
      });

      const pct = Math.round(right / inputs.length * 100);
      bar.firstChild.style.width = pct + '%';
      scoreBox.innerHTML = '';
      scoreBox.appendChild(el('span', {
        class: 'big ' + (pct >= 80 ? 'good' : pct < 50 ? 'bad' : ''),
        text: right + '/' + inputs.length
      }));
      scoreBox.appendChild(el('span', { class: 'muted', text: pct + '%' }));

      const key = 'type' + type + '.' + inputs.length;
      if (!A.store.best[key] || pct > A.store.best[key]) { A.store.best[key] = pct; A.save(); }

      bottom.innerHTML = '';
      bottom.appendChild(el('button', { class: 'btn btn-pri', text: 'Đề mới', onclick: () => restart() }));
      if (wrong.length) bottom.appendChild(el('button', {
        class: 'btn', text: `Làm lại ${wrong.length} câu sai`, onclick: () => restart(A.shuffle(wrong))
      }));
      bottom.appendChild(bar);
      bottom.appendChild(scoreBox);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    flat[0] && flat[0].focus();

    return {
      done: () => done,
      dirty: () => flat.some(f => f.value.trim() !== '')
    };
  }

  window.PRACTICE = { render, _pools: { poolType1, poolType2, byStrokes, countsFor } };
})();
