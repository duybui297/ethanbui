/* Màn hình Bài học: danh sách + chi tiết */
(function () {
  'use strict';
  const A = window.APP, R = A.R, el = A.el;

  let filter = { q: '', stroke: '', only: '' };

  /* ---------------- danh sách ---------------- */
  function renderList(view) {
    view.innerHTML = '';
    const nLesson = Object.keys(A.L).length;

    view.appendChild(el('h1', { text: 'Bài học bộ thủ' }));
    view.appendChild(el('p', {
      class: 'sub',
      text: `${R.length} bộ thủ Khang Hy · ${nLesson} bộ đã có bài phân tích chi tiết (10 ví dụ chữ Hán mỗi bộ).`
    }));

    const q = el('input', {
      type: 'search', placeholder: 'Tìm theo chữ Hán, phiên âm hoặc nghĩa…',
      value: filter.q,
      oninput: e => { filter.q = e.target.value; paint(); }
    });
    const sel = el('select', {
      onchange: e => { filter.stroke = e.target.value; paint(); }
    });
    sel.appendChild(el('option', { value: '', text: 'Mọi số nét' }));
    [...new Set(R.map(r => r.s))].sort((a, b) => a - b)
      .forEach(s => sel.appendChild(el('option', { value: s, text: s + ' nét' })));
    sel.value = filter.stroke;

    const sel2 = el('select', {
      onchange: e => { filter.only = e.target.value; paint(); }
    });
    [['', 'Tất cả'], ['lesson', 'Có bài chi tiết'], ['multi', 'Có 2 dạng chữ'], ['todo', 'Chưa học']]
      .forEach(([v, t]) => sel2.appendChild(el('option', { value: v, text: t })));
    sel2.value = filter.only;

    view.appendChild(el('div', { class: 'toolbar' }, [q, sel, sel2]));

    const grid = el('div', { class: 'grid' });
    view.appendChild(grid);
    const count = el('p', { class: 'sub', style: 'margin-top:16px' });
    view.appendChild(count);

    function paint() {
      const kw = A.norm(filter.q, true);
      const list = R.filter(r => {
        if (filter.stroke && String(r.s) !== filter.stroke) return false;
        if (filter.only === 'lesson' && !A.L[r.n]) return false;
        if (filter.only === 'multi' && r.f.length < 2) return false;
        if (filter.only === 'todo' && A.store.seen[r.n]) return false;
        if (!kw) return true;
        if (r.f.some(c => c === filter.q.trim())) return true;
        return A.readings(r).some(x => A.norm(x, true).includes(kw))
            || A.norm(r.mean, true).includes(kw)
            || String(r.n) === kw;
      });
      grid.innerHTML = '';
      list.forEach(r => grid.appendChild(card(r)));
      count.textContent = list.length + ' bộ thủ';
      if (!list.length) grid.appendChild(el('div', { class: 'empty', text: 'Không tìm thấy bộ thủ nào.' }));
    }
    paint();
  }

  function card(r) {
    const g = el('div', { class: 'g han' });
    g.appendChild(el('span', { text: r.f[0] }));
    if (r.f[1]) g.appendChild(el('span', { class: 'v', text: r.f[1] }));
    const kids = [
      el('span', { class: 'no', text: r.n }),
      g,
      el('div', { class: 'hv', text: r.hv }),
      el('div', { class: 'mn', text: r.mean })
    ];
    if (A.L[r.n]) kids.push(el('span', { class: 'dot', title: 'Có bài phân tích chi tiết' }));
    return el('div', {
      class: 'rcard', onclick: () => { location.hash = '#/lesson/' + r.n; }
    }, kids);
  }

  /* ---------------- chi tiết ---------------- */
  function renderDetail(view, no) {
    const r = A.byNo(no);
    view.innerHTML = '';
    if (!r) { view.appendChild(el('div', { class: 'empty', text: 'Không có bộ thủ này.' })); return; }

    A.store.seen[r.n] = 1; A.save();
    const L = A.L[r.n];

    view.appendChild(el('a', { class: 'back', href: '#/lessons', html: '← Danh sách bộ thủ' }));

    const quad = el('div', { class: 'quad' });

    /* ô 1: chữ lớn + hình minh hoạ */
    const big = el('div', { class: 'bigchar han' });
    big.appendChild(el('span', { text: r.f[0] }));
    if (r.f[1]) big.appendChild(el('span', { class: 'v', text: r.f[1] }));

    const pic = el('div', { class: 'pict' });
    if (A.P[r.n]) pic.innerHTML = A.P[r.n];
    else pic.appendChild(el('span', { class: 'emo', text: (L && L.emoji) || '﹖' }));

    const meta = el('div', { class: 'meta' }, [
      el('div', { class: 'hvbig', text: r.hv }),
      el('div', { class: 'muted', text: r.mean }),
      el('div', { class: 'row', style: 'margin-top:6px' }, [
        el('span', { class: 'badge', text: 'Bộ ' + r.n }),
        el('span', { class: 'badge', text: r.s + ' nét' }),
        r.f.length > 1 ? el('span', { class: 'badge', text: 'Có ' + r.f.length + ' dạng chữ' }) : null,
        (r.alt && r.alt.length) ? el('span', { class: 'badge', text: 'cũng đọc: ' + r.alt.join(', ') }) : null
      ])
    ]);

    quad.appendChild(el('div', { class: 'card' }, [
      el('div', { class: 'qhead' }, [big, meta]),
      L && L.hinhDung
        ? el('div', { class: 'row', style: 'margin-top:18px;align-items:center;gap:14px' },
            [pic, el('div', { class: 'muted', style: 'font-size:13.5px', text: L.hinhDung })])
        : el('div', { class: 'row', style: 'margin-top:18px' }, [pic])
    ]));

    /* ô 2: cách nhớ + biến thể */
    const c2 = el('ul', { class: 'bul' });
    if (L) {
      c2.appendChild(el('li', { html: '<span><b>Cách nhớ:</b> ' + A.markHan(L.cachNho) + '</span>' }));
      if (L.bienThe) c2.appendChild(el('li', { html: '<span><b>Dạng chữ:</b> ' + A.markHan(L.bienThe) + '</span>' }));
    } else {
      c2.appendChild(el('li', { html: '<span><b>Phiên âm:</b> ' + A.esc(A.readings(r).join(' / ')) + '</span>' }));
      c2.appendChild(el('li', { html: '<span><b>Nghĩa:</b> ' + A.esc(r.mean) + '</span>' }));
      if (r.f.length > 1) c2.appendChild(el('li', {
        html: '<span><b>Dạng chữ:</b> <b class="han">' + A.esc(r.f[0]) +
              '</b> (phồn thể / dạng chính) và <b class="han">' + A.esc(r.f[1]) +
              '</b> (giản thể / dạng biến thể) — cùng một bộ.</span>'
      }));
    }
    quad.appendChild(el('div', { class: 'card' }, [c2]));

    /* ô 3: ý nghĩa */
    const c3 = el('ul', { class: 'bul' });
    if (L) {
      c3.appendChild(el('li', { html: '<span><b>Ý nghĩa:</b> ' + A.markHan(L.yNghia) + '</span>' }));
      c3.appendChild(el('li', { html: '<span>' + A.markHan(L.trongKanji) + '</span>' }));
    } else {
      c3.appendChild(el('li', { html: '<span><b>Ý nghĩa:</b> ' + A.esc(r.mean) + '</span>' }));
      c3.appendChild(el('li', { html: '<span class="muted">Bài phân tích chi tiết cho bộ này đang được biên soạn.</span>' }));
    }
    quad.appendChild(el('div', { class: 'card' }, [c3]));

    /* ô 4: tóm tắt ví dụ */
    const c4 = el('div', {});
    if (L) {
      c4.appendChild(el('h2', { text: 'Bộ này xuất hiện trong' }));
      const row = el('div', { class: 'row', style: 'gap:6px' });
      L.viDu.forEach(v => row.appendChild(
        el('span', { class: 'badge han', style: 'font-size:22px;padding:4px 10px', text: v.k })));
      c4.appendChild(row);
      c4.appendChild(el('p', { class: 'sub', style: 'margin:14px 0 0',
        text: L.viDu.length + ' chữ Hán được phân tích bên dưới.' }));
    } else {
      c4.appendChild(el('div', { class: 'note',
        html: 'Bộ <b class="han">' + A.esc(r.f[0]) + '</b> (' + A.esc(r.hv) +
              ') đã có đủ dữ liệu để luyện tập ở cả hai dạng bài. Phần 10 ví dụ chữ Hán sẽ được bổ sung ở batch tiếp theo.' }));
    }
    quad.appendChild(el('div', { class: 'card' }, [c4]));

    view.appendChild(quad);

    /* danh sách ví dụ đầy đủ */
    if (L) {
      const box = el('div', { class: 'card', style: 'padding:20px;margin-top:14px' });
      box.appendChild(el('h2', { text: 'Ví dụ trong chữ Hán' }));
      const list = el('div', { class: 'exlist' });
      L.viDu.forEach(v => {
        list.appendChild(el('div', { class: 'ex' }, [
          el('div', { class: 'k han', text: v.k }),
          el('div', { class: 'body' }, [
            el('div', { class: 'line1' }, [
              el('span', { class: 'hv', text: v.hv }),
              el('span', { class: 'on', text: v.on }),
              el('span', { class: 'vi', text: v.vi }),
              v.lv ? el('span', { class: 'lv', text: v.lv,
                title: 'Mức độ ước lượng — JLPT không công bố danh sách kanji chính thức từ 2010' }) : null
            ]),
            el('div', { class: 'ham', html: '<b style="color:var(--warm)">Hàm ý:</b> ' + A.markHan(v.ham) })
          ])
        ]));
      });
      box.appendChild(list);
      view.appendChild(box);
    }

    /* điều hướng trước / sau */
    const prev = A.byNo(r.n - 1), next = A.byNo(r.n + 1);
    view.appendChild(el('div', { class: 'navpair' }, [
      prev ? el('a', { class: 'btn', href: '#/lesson/' + prev.n,
        html: '← ' + A.esc(prev.hv) + ' <span class="han">' + A.esc(prev.f[0]) + '</span>' }) : el('span'),
      next ? el('a', { class: 'btn', href: '#/lesson/' + next.n,
        html: '<span class="han">' + A.esc(next.f[0]) + '</span> ' + A.esc(next.hv) + ' →' }) : el('span')
    ]));
  }

  window.LESSONVIEW = { renderList, renderDetail };
})();
