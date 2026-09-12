/* Router + khởi động */
(function () {
  'use strict';
  const A = window.APP, el = A.el;
  const view = document.getElementById('view');

  /* ---- theme ---- */
  const btn = document.getElementById('themeBtn');
  try {
    const t = localStorage.getItem('bothu.theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const dark = matchMedia('(prefers-color-scheme: dark)').matches;
    const next = cur ? (cur === 'dark' ? 'light' : 'dark') : (dark ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('bothu.theme', next); } catch (e) {}
  });

  /* ---- home ---- */
  function home() {
    view.innerHTML = '';
    const nL = Object.keys(A.L).length;
    view.appendChild(el('h1', { text: 'Học bộ thủ chữ Hán' }));
    view.appendChild(el('p', { class: 'sub',
      text: 'Hiểu bộ thủ trước, rồi kanji sẽ tự ráp lại thành nghĩa. Bắt đầu từ bài học, sau đó luyện hai chiều.' }));

    const hero = el('div', { class: 'hero' });
    [
      ['部', 'Bài học', `${A.R.length} bộ thủ · ${nL} bộ đã có bài phân tích 10 ví dụ chữ Hán`, '#/lessons'],
      ['火', 'Dạng 1 — đọc phiên âm', 'Nhìn bộ thủ dạng Hán tự, viết ra âm Hán-Việt', '#/practice/1'],
      ['Hoả', 'Dạng 2 — viết Hán tự', 'Nhìn phiên âm, viết lại bộ thủ. Bộ có 2 dạng phải đúng cả 2', '#/practice/2']
    ].forEach(([k, t, p, h]) => {
      hero.appendChild(el('a', { class: 'card tile', href: h }, [
        el('div', { class: 'k' + (k.length > 2 ? '' : ' han'), text: k }),
        el('h3', { text: t }),
        el('p', { text: p })
      ]));
    });
    view.appendChild(hero);

    const seen = Object.keys(A.store.seen).length;
    const best = A.store.best;
    const stats = el('div', { class: 'card', style: 'padding:20px;margin-top:16px' });
    stats.appendChild(el('h2', { text: 'Tiến độ của bạn' }));
    stats.appendChild(el('p', { class: 'muted', style: 'margin:0',
      text: `Đã mở ${seen}/${A.R.length} bài học.` }));
    const bk = Object.keys(best);
    if (bk.length) {
      const row = el('div', { class: 'row', style: 'margin-top:10px' });
      bk.sort().forEach(k => {
        const [t, n] = k.split('.');
        row.appendChild(el('span', { class: 'badge',
          text: `${t === 'type1' ? 'Dạng 1' : 'Dạng 2'} · ${n} câu: ${best[k]}%` }));
      });
      stats.appendChild(row);
    }
    view.appendChild(stats);
  }

  /* ---- router ---- */
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    document.querySelectorAll('.tabs a').forEach(a => a.classList.remove('on'));
    const mark = sel => { const a = document.querySelector(`.tabs a[data-tab="${sel}"]`); if (a) a.classList.add('on'); };

    if (parts[0] === 'lessons') { mark('lessons'); window.LESSONVIEW.renderList(view); }
    else if (parts[0] === 'lesson') { mark('lessons'); window.LESSONVIEW.renderDetail(view, +parts[1]); }
    else if (parts[0] === 'practice') {
      const t = parts[1] === '2' ? 2 : 1;
      mark('p' + t);
      window.PRACTICE.render(view, t);
    } else home();

    window.scrollTo(0, 0);
  }

  addEventListener('hashchange', route);

  /* ---- footer ---- */
  const forms = A.R.reduce((n, r) => n + r.f.length, 0);
  document.getElementById('footStats').textContent =
    `${A.R.length} bộ thủ · ${forms} dạng chữ · ${Object.keys(A.L).length} bài phân tích chi tiết`;

  route();
})();
