/* Tiện ích dùng chung */
(function () {
  'use strict';

  const R = window.RADICALS;

  /* ---- chuẩn hoá phiên âm Hán-Việt để so đáp án ----
     stripTone = true: chỉ bỏ 5 DẤU THANH (huyền sắc hỏi ngã nặng).
     Cố ý GIỮ lại â ă ê ô ơ ư — đó là chữ cái riêng, không phải dấu thanh,
     nếu bỏ luôn thì Tâm/Tam, Cân/Can, Thủ/Thử sẽ bị lẫn vào nhau. */
  const TONES = /[̣̀́̃̉]/g;
  function norm(s, stripTone) {
    s = (s || '').toString().trim().toLowerCase().replace(/\s+/g, ' ');
    if (stripTone) s = s.normalize('NFD').replace(TONES, '');
    return s.normalize('NFC');
  }

  /* Tất cả cách viết được chấp nhận cho 1 bộ thủ */
  function readings(r) {
    return [r.hv].concat(r.alt || []);
  }

  /* Bộ thủ nào cũng có thể là đáp án đúng cho 1 phiên âm nào đó */
  function radicalsByReading(reading, stripTone) {
    const target = norm(reading, stripTone);
    return R.filter(r => readings(r).some(x => norm(x, stripTone) === target));
  }

  /* Ngược lại: 1 chữ Hán thuộc những bộ nào (thường là 1) */
  const charIndex = (function () {
    const m = new Map();
    R.forEach(r => r.f.forEach(c => {
      if (!m.has(c)) m.set(c, []);
      m.get(c).push(r);
    }));
    return m;
  })();
  function radicalsByChar(ch) { return charIndex.get(ch) || []; }

  function byNo(n) { return R.find(r => r.n === n); }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function el(tag, attrs, kids) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(c => c && n.appendChild(c));
    return n;
  }

  function esc(s) {
    return (s || '').replace(/[&<>"]/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  /* Tô đậm chữ Hán nằm trong phần "Hàm ý" cho dễ đọc */
  function markHan(s) {
    return esc(s).replace(/([⺀-⻿⼀-⿟㐀-䶿一-鿿]+)/g,
      '<b class="han">$1</b>');
  }

  /* ---- lưu tiến độ (an toàn khi trình duyệt chặn storage) ---- */
  const KEY = 'bothu.v1';
  let store = { seen: {}, best: {}, prefs: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) store = Object.assign(store, JSON.parse(raw));
  } catch (e) { /* bỏ qua */ }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {}
  }

  window.APP = {
    R, norm, readings, radicalsByReading, radicalsByChar, byNo,
    shuffle, el, esc, markHan, store, save,
    L: window.LESSONS || {},
    P: window.PICTOGRAPHS || {}
  };
})();
