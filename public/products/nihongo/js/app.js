// =============================================================================
// 日本語学習 — Main Application
// =============================================================================

import { VOCABULARY, GRAMMAR, CATEGORIES_VOCAB, CATEGORIES_GRAMMAR } from './data.js';
import { WritingCanvas } from './canvas.js';

// ── Globals ──
const appEl = document.getElementById('app');
const canvas = new WritingCanvas();

// ── State ──
let state = {
  screen: 'home',
  // Library state
  librarySource: 'prebuilt', // 'prebuilt' | 'custom'
  libraryType: 'vocabulary',  // 'vocabulary' | 'grammar'
  libraryFilter: 'Tất cả',
  // Practice state
  practiceSource: null,
  practiceType: null,
  practiceCategory: null,
  practiceItems: [],
  practiceIndex: 0,
  practiceCorrect: 0,
  practiceWrong: 0,
  practiceChecked: false,
  // Edit state
  editingId: null,
  // Grammar detail
  grammarId: null,
  // Vocab detail
  vocabId: null,
};

// ── Storage ──
const Storage = {
  KEY: 'nihongo_custom_words',
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    } catch {
      return [];
    }
  },
  save(words) {
    localStorage.setItem(this.KEY, JSON.stringify(words));
  },
  add(word) {
    const words = this.getAll();
    words.push({ ...word, id: 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6) });
    this.save(words);
  },
  update(id, data) {
    const words = this.getAll().map(w => w.id === id ? { ...w, ...data } : w);
    this.save(words);
  },
  delete(id) {
    this.save(this.getAll().filter(w => w.id !== id));
  }
};

// ── Helpers ──
function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function normalizeRomaji(str) {
  return str.toLowerCase().trim()
    .replace(/ō/g, 'ou').replace(/ū/g, 'uu')
    .replace(/ā/g, 'aa').replace(/ē/g, 'ee').replace(/ī/g, 'ii')
    .replace(/\s+/g, ' ');
}

function normalizeJapanese(str) {
  return str.trim().replace(/\s+/g, '');
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getCustomCategories(type) {
  const words = Storage.getAll().filter(w => w.type === type);
  return [...new Set(words.map(w => w.category).filter(Boolean))];
}

// ── Text-to-speech (đọc tiếng Nhật) ──
let _jaVoice = null;
function pickJaVoice() {
  if (!('speechSynthesis' in window)) return;
  const voices = speechSynthesis.getVoices();
  _jaVoice = voices.find(v => v.lang === 'ja-JP')
    || voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ja'))
    || null;
}
if ('speechSynthesis' in window) {
  pickJaVoice();
  speechSynthesis.onvoiceschanged = pickJaVoice;
}

function speak(text, btn) {
  if (!text) return;
  if (!('speechSynthesis' in window)) {
    alert('Trình duyệt này không hỗ trợ đọc tiếng Nhật.');
    return;
  }
  speechSynthesis.cancel();
  if (!_jaVoice) pickJaVoice();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP';
  u.rate = 0.85;
  if (_jaVoice) u.voice = _jaVoice;
  if (btn) {
    btn.classList.add('speaking');
    u.onend = u.onerror = () => btn.classList.remove('speaking');
  }
  speechSynthesis.speak(u);
}

// Markup for a small speaker button. `text` is the kana/japanese to read aloud.
function spk(text) {
  return `<button class="spk-btn" data-action="speak" data-text="${escHtml(text)}" aria-label="Đọc" title="Đọc">🔊</button>`;
}

function getDataBySource(source, type) {
  if (source === 'prebuilt') {
    return type === 'vocabulary' ? VOCABULARY : GRAMMAR;
  }
  return Storage.getAll().filter(w => w.type === type);
}

// ══════════════════════════════════════════════════════════════════════════
// ROUTING & RENDERING
// ══════════════════════════════════════════════════════════════════════════

function navigate(screen, params = {}) {
  Object.assign(state, params, { screen });
  render();
}

function render() {
  const screens = {
    home: renderHome,
    'library-prebuilt': renderLibrary,
    'library-custom': renderLibrary,
    'practice-select': renderPracticeSelect,
    practice: renderPractice,
    results: renderResults,
    'add-word': renderAddWord,
    'grammar-detail': renderGrammarDetail,
    'vocab-detail': renderVocabDetail,
  };

  const renderFn = screens[state.screen] || renderHome;
  appEl.innerHTML = renderFn();
  attachEvents();
}

function attachEvents() {
  // Delegated event handling
  appEl.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', handleAction);
  });

  // Focus first input if exists
  const firstInput = appEl.querySelector('input:not([type=hidden])');
  if (firstInput && state.screen === 'add-word') {
    firstInput.focus();
  }
}

function handleAction(e) {
  const el = e.currentTarget;
  const action = el.dataset.action;
  const data = el.dataset;

  switch (action) {
    // Navigation
    case 'goto-home': navigate('home'); break;
    case 'goto-library-prebuilt': navigate('library-prebuilt', { librarySource: 'prebuilt', libraryType: 'vocabulary', libraryFilter: 'Tất cả' }); break;
    case 'view-grammar': navigate('grammar-detail', { grammarId: data.id }); break;
    case 'back-to-grammar': navigate('library-prebuilt', { librarySource: 'prebuilt', libraryType: 'grammar' }); break;
    case 'view-vocab': navigate('vocab-detail', { vocabId: data.id }); break;
    case 'back-to-vocab': navigate('library-prebuilt', { librarySource: 'prebuilt', libraryType: 'vocabulary' }); break;
    case 'speak': e.stopPropagation(); speak(el.dataset.text, el); break;
    case 'goto-library-custom': navigate('library-custom', { librarySource: 'custom', libraryType: 'vocabulary', libraryFilter: 'Tất cả' }); break;
    case 'goto-practice-select': navigate('practice-select'); break;
    case 'goto-add-word': navigate('add-word', { editingId: null }); break;

    // Library filters
    case 'set-library-type':
      state.libraryType = data.type;
      state.libraryFilter = 'Tất cả';
      render();
      break;
    case 'set-library-filter':
      state.libraryFilter = data.filter;
      render();
      break;

    // Practice select
    case 'start-practice': startPractice(data.source, data.type, data.category || null); break;

    // Practice actions
    case 'check-answer': checkAnswer(); break;
    case 'next-question': nextQuestion(); break;
    case 'retry-question': retryQuestion(); break;
    case 'open-canvas': openCanvas(); break;
    case 'show-answer': showAnswer(); break;

    // Custom word actions
    case 'save-word': saveWord(); break;
    case 'edit-word':
      navigate('add-word', { editingId: data.id });
      break;
    case 'delete-word': deleteWord(data.id); break;

    default: break;
  }
}

// ══════════════════════════════════════════════════════════════════════════
// SCREEN: HOME
// ══════════════════════════════════════════════════════════════════════════

function renderHome() {
  return `
    <div class="home-screen animate-in">
      <div class="home-logo">
        <div class="logo-jp">日本語</div>
        <div class="logo-sub">Học Tiếng Nhật</div>
      </div>

      <nav class="home-menu">
        <div class="menu-card" data-action="goto-practice-select" role="button" tabindex="0">
          <div class="menu-card-icon">📝</div>
          <div class="menu-card-text">
            <h3>Luyện tập</h3>
            <p>Kiểm tra từ vựng & ngữ pháp</p>
          </div>
        </div>

        <div class="menu-card" data-action="goto-library-prebuilt" role="button" tabindex="0">
          <div class="menu-card-icon">📚</div>
          <div class="menu-card-text">
            <h3>Thư viện có sẵn</h3>
            <p>${VOCABULARY.length} từ vựng · ${GRAMMAR.length} ngữ pháp</p>
          </div>
        </div>

        <div class="menu-card" data-action="goto-library-custom" role="button" tabindex="0">
          <div class="menu-card-icon">📖</div>
          <div class="menu-card-text">
            <h3>Thư viện của tôi</h3>
            <p>${Storage.getAll().length} mục đã thêm</p>
          </div>
        </div>
      </nav>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════════════════
// SCREEN: LIBRARY
// ══════════════════════════════════════════════════════════════════════════

function renderLibrary() {
  const isCustom = state.librarySource === 'custom';
  const type = state.libraryType;
  const filter = state.libraryFilter;

  // Get categories
  let categories;
  if (isCustom) {
    categories = getCustomCategories(type);
  } else {
    categories = type === 'vocabulary' ? CATEGORIES_VOCAB : CATEGORIES_GRAMMAR;
  }

  // Get words
  let words = getDataBySource(state.librarySource, type);
  if (filter !== 'Tất cả') {
    words = words.filter(w => w.category === filter);
  }

  const title = isCustom ? 'Thư viện của tôi' : 'Thư viện có sẵn';

  return `
    <div class="animate-in">
      <div class="screen-header">
        <button class="back-btn" data-action="goto-home" aria-label="Quay lại">←</button>
        <h2>${title}</h2>
      </div>

      <!-- Type toggle -->
      <div class="type-toggle">
        <button class="type-toggle-btn ${type === 'vocabulary' ? 'active' : ''}" data-action="set-library-type" data-type="vocabulary">
          Từ vựng
        </button>
        <button class="type-toggle-btn ${type === 'grammar' ? 'active' : ''}" data-action="set-library-type" data-type="grammar">
          Ngữ pháp
        </button>
      </div>

      <!-- Filter chips -->
      ${categories.length > 0 ? `
        <div class="filter-bar">
          <button class="filter-chip ${filter === 'Tất cả' ? 'active' : ''}" data-action="set-library-filter" data-filter="Tất cả">Tất cả</button>
          ${categories.map(cat => `
            <button class="filter-chip ${filter === cat ? 'active' : ''}" data-action="set-library-filter" data-filter="${escHtml(cat)}">${escHtml(cat)}</button>
          `).join('')}
        </div>
      ` : ''}

      <!-- Word list -->
      <div class="word-list">
        ${words.length === 0 ? `
          <div class="empty-state">
            <div class="empty-icon">${isCustom ? '📝' : '📭'}</div>
            <p>${isCustom ? 'Chưa có mục nào. Thêm từ vựng hoặc ngữ pháp mới!' : 'Không tìm thấy kết quả.'}</p>
            ${isCustom ? `<button class="btn btn-primary" data-action="goto-add-word">+ Thêm mới</button>` : ''}
          </div>
        ` : words.map(w => renderWordCard(w, isCustom)).join('')}
      </div>

      ${isCustom ? `<button class="fab" data-action="goto-add-word" aria-label="Thêm mới">+</button>` : ''}
    </div>
  `;
}

function renderWordCard(w, showActions = false) {
  const head = w.kanji || w.japanese;
  const hasKana = w.kanji && w.japanese && w.kanji !== w.japanese;
  const hasLesson = w.type === 'grammar' && w.structure;
  const hasVocabDetail = !showActions && w.type === 'vocabulary' && Array.isArray(w.dialogue) && w.dialogue.length > 0;
  const clickAttr = hasLesson
    ? `data-action="view-grammar" data-id="${w.id}" role="button" tabindex="0"`
    : (hasVocabDetail ? `data-action="view-vocab" data-id="${w.id}" role="button" tabindex="0"` : '');
  return `
    <div class="word-card ${hasLesson || hasVocabDetail ? 'word-card-clickable' : ''}" ${clickAttr}>
      <div class="word-card-top">
        <span class="vn">${escHtml(w.vietnamese)}</span>
        <span class="jp">${escHtml(head)}</span>
      </div>
      ${hasKana ? `<div class="kana">${escHtml(w.japanese)}</div>` : ''}
      <div class="rmj">${escHtml(w.romaji)}</div>
      ${w.pattern ? `<div class="pattern">${escHtml(w.pattern)}</div>` : ''}
      ${hasLesson ? `<div class="lesson-hint">Xem bài giảng chi tiết →</div>` : ''}
      ${hasVocabDetail ? `<div class="lesson-hint">Xem ví dụ &amp; hội thoại →</div>` : ''}
      ${showActions ? `
        <div class="word-card-actions">
          <button data-action="edit-word" data-id="${w.id}">✏️ Sửa</button>
          <button class="delete-btn" data-action="delete-word" data-id="${w.id}">🗑 Xóa</button>
        </div>
      ` : ''}
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════════════════
// SCREEN: GRAMMAR DETAIL (bài giảng)
// ══════════════════════════════════════════════════════════════════════════

function renderGrammarDetail() {
  const g = GRAMMAR.find(x => x.id === state.grammarId);
  if (!g) return renderLibrary();

  const examples = Array.isArray(g.examples) ? g.examples : [];
  const notes = Array.isArray(g.notes) ? g.notes : [];

  const exampleCard = (kanji, kana, romaji, vn) => `
    <div class="ex-item" data-action="speak" data-text="${escHtml(kana || kanji)}" role="button" tabindex="0" title="Bấm để nghe">
      <div class="ex-jp">${escHtml(kanji)} ${spk(kana || kanji)}</div>
      ${kana && kana !== kanji ? `<div class="ex-kana">${escHtml(kana)}</div>` : ''}
      <div class="ex-rmj">${escHtml(romaji)}</div>
      <div class="ex-vn">${escHtml(vn)}</div>
    </div>
  `;

  return `
    <div class="animate-in grammar-detail">
      <div class="screen-header">
        <button class="back-btn" data-action="back-to-grammar" aria-label="Quay lại">←</button>
        <h2>Bài giảng ngữ pháp</h2>
      </div>

      <div class="gd-hero">
        <div class="gd-pattern">${escHtml(g.pattern || g.structure)}</div>
        <div class="gd-meaning">${escHtml(g.vietnamese)}</div>
      </div>

      <div class="gd-section">
        <div class="gd-label">📐 Cấu trúc câu</div>
        <div class="gd-structure">${escHtml(g.structure)}</div>
      </div>

      ${g.explanation ? `
        <div class="gd-section">
          <div class="gd-label">💡 Giải thích &amp; cách dùng</div>
          <p class="gd-text">${escHtml(g.explanation)}</p>
        </div>
      ` : ''}

      ${notes.length ? `
        <div class="gd-section gd-notes">
          <div class="gd-label">⚠️ Điểm cần lưu ý</div>
          <ul class="gd-note-list">
            ${notes.map(n => `<li>${escHtml(n)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div class="gd-section">
        <div class="gd-label">📝 Ví dụ mẫu</div>
        <div class="ex-list">
          ${exampleCard(g.kanji, g.japanese, g.romaji, g.vietnamese)}
          ${examples.map(e => exampleCard(e.kanji, e.japanese, e.romaji, e.vietnamese)).join('')}
        </div>
      </div>

      <button class="btn btn-primary btn-block btn-lg" data-action="back-to-grammar">← Quay lại danh sách</button>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════════════════
// SCREEN: VOCAB DETAIL (ví dụ & hội thoại)
// ══════════════════════════════════════════════════════════════════════════

function renderVocabDetail() {
  const w = VOCABULARY.find(x => x.id === state.vocabId);
  if (!w) return renderLibrary();

  const head = w.kanji || w.japanese;
  const hasKana = w.kanji && w.japanese && w.kanji !== w.japanese;
  const lines = Array.isArray(w.dialogue) ? w.dialogue : [];

  const bubble = (l) => {
    const isWord = l.jp.includes(head) || (w.japanese && l.jp.includes(w.japanese));
    return `
      <div class="bubble-row ${l.sp === 'B' ? 'bubble-right' : 'bubble-left'}">
        <div class="bubble-sp">${escHtml(l.sp)}</div>
        <div class="bubble ${isWord ? 'bubble-hl' : ''}" data-action="speak" data-text="${escHtml(l.kana)}" role="button" tabindex="0" title="Bấm để nghe">
          <div class="bubble-jp">${escHtml(l.jp)} ${spk(l.kana)}</div>
          <div class="bubble-kana">${escHtml(l.kana)}</div>
          <div class="bubble-rmj">${escHtml(l.romaji)}</div>
          <div class="bubble-vn">${escHtml(l.vn)}</div>
        </div>
      </div>
    `;
  };

  return `
    <div class="animate-in grammar-detail">
      <div class="screen-header">
        <button class="back-btn" data-action="back-to-vocab" aria-label="Quay lại">←</button>
        <h2>Chi tiết từ vựng</h2>
      </div>

      <div class="gd-hero">
        <div class="gd-pattern">${escHtml(head)} ${spk(w.japanese)}</div>
        ${hasKana ? `<div class="vd-kana">${escHtml(w.japanese)}</div>` : ''}
        <div class="vd-romaji">${escHtml(w.romaji)}</div>
        <div class="gd-meaning">${escHtml(w.vietnamese)}</div>
        <div class="vd-cat">${escHtml(w.category)}</div>
      </div>

      ${w.context ? `
        <div class="gd-section gd-notes">
          <div class="gd-label">🎬 Bối cảnh</div>
          <p class="gd-text">${escHtml(w.context)}</p>
        </div>
      ` : ''}

      <div class="gd-section">
        <div class="gd-label">💬 Đoạn hội thoại</div>
        <div class="dialogue-list">
          ${lines.map(bubble).join('')}
        </div>
      </div>

      <button class="btn btn-primary btn-block btn-lg" data-action="back-to-vocab">← Quay lại danh sách</button>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════════════════
// SCREEN: PRACTICE SELECT
// ══════════════════════════════════════════════════════════════════════════

function renderPracticeSelect() {
  const customVocab = Storage.getAll().filter(w => w.type === 'vocabulary');
  const customGrammar = Storage.getAll().filter(w => w.type === 'grammar');
  const hasCustom = customVocab.length > 0 || customGrammar.length > 0;

  // Build options for prebuilt
  const prebuiltOptions = [];

  // Prebuilt vocabulary by category
  CATEGORIES_VOCAB.forEach(cat => {
    const count = VOCABULARY.filter(w => w.category === cat).length;
    prebuiltOptions.push({ source: 'prebuilt', type: 'vocabulary', category: cat, label: cat, count, icon: '📝' });
  });

  return `
    <div class="animate-in">
      <div class="screen-header">
        <button class="back-btn" data-action="goto-home" aria-label="Quay lại">←</button>
        <h2>Chọn bài luyện tập</h2>
      </div>

      <!-- Prebuilt: All -->
      <div class="section-label">Thư viện có sẵn</div>

      <div class="practice-option" data-action="start-practice" data-source="prebuilt" data-type="vocabulary" role="button" tabindex="0">
        <h3>📝 Tất cả từ vựng</h3>
        <p>${VOCABULARY.length} từ</p>
      </div>

      <div class="practice-option" data-action="start-practice" data-source="prebuilt" data-type="grammar" role="button" tabindex="0">
        <h3>📐 Tất cả ngữ pháp</h3>
        <p>${GRAMMAR.length} câu</p>
      </div>

      <!-- Prebuilt by category -->
      <div class="section-label">Theo chủ đề</div>
      ${prebuiltOptions.map(opt => `
        <div class="practice-option" data-action="start-practice" data-source="${opt.source}" data-type="${opt.type}" data-category="${escHtml(opt.category)}" role="button" tabindex="0">
          <h3>${opt.icon} ${escHtml(opt.label)}</h3>
          <p>${opt.count} từ</p>
        </div>
      `).join('')}

      <!-- Grammar by category -->
      ${CATEGORIES_GRAMMAR.map(cat => {
        const count = GRAMMAR.filter(g => g.category === cat).length;
        return `
          <div class="practice-option" data-action="start-practice" data-source="prebuilt" data-type="grammar" data-category="${escHtml(cat)}" role="button" tabindex="0">
            <h3>📐 ${escHtml(cat)}</h3>
            <p>${count} câu</p>
          </div>
        `;
      }).join('')}

      <!-- Custom -->
      ${hasCustom ? `
        <div class="section-label">Thư viện của tôi</div>
        ${customVocab.length > 0 ? `
          <div class="practice-option" data-action="start-practice" data-source="custom" data-type="vocabulary" role="button" tabindex="0">
            <h3>📖 Từ vựng của tôi</h3>
            <p>${customVocab.length} từ</p>
          </div>
        ` : ''}
        ${customGrammar.length > 0 ? `
          <div class="practice-option" data-action="start-practice" data-source="custom" data-type="grammar" role="button" tabindex="0">
            <h3>📖 Ngữ pháp của tôi</h3>
            <p>${customGrammar.length} câu</p>
          </div>
        ` : ''}
      ` : ''}
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════════════════
// SCREEN: PRACTICE
// ══════════════════════════════════════════════════════════════════════════

function startPractice(source, type, category) {
  let items = getDataBySource(source, type);
  if (category) {
    items = items.filter(w => w.category === category);
  }

  if (items.length === 0) {
    alert('Không có mục nào để luyện tập!');
    return;
  }

  navigate('practice', {
    practiceSource: source,
    practiceType: type,
    practiceCategory: category,
    practiceItems: shuffleArray(items),
    practiceIndex: 0,
    practiceCorrect: 0,
    practiceWrong: 0,
    practiceChecked: false,
  });
}

function renderPractice() {
  const items = state.practiceItems;
  const idx = state.practiceIndex;
  const item = items[idx];
  const checked = state.practiceChecked;
  const total = items.length;

  const progressPct = ((idx + (checked ? 1 : 0)) / total) * 100;

  return `
    <div class="animate-in">
      <div class="screen-header">
        <button class="back-btn" data-action="goto-home" aria-label="Thoát">←</button>
        <h2>Luyện tập</h2>
      </div>

      <!-- Progress -->
      <div class="progress-bar-container">
        <div class="progress-info">
          <span>${idx + 1} / ${total}</span>
          <span>✅ ${state.practiceCorrect}  ❌ ${state.practiceWrong}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
        </div>
      </div>

      <!-- Question -->
      <div class="question-card">
        <div class="question-type-badge">${item.type === 'vocabulary' ? 'Từ vựng' : 'Ngữ pháp'}</div>
        <div class="question-label">Viết lại bằng tiếng Nhật</div>
        <div class="question-text">${escHtml(item.vietnamese)}</div>
      </div>

      <!-- Answer inputs -->
      <div class="answer-section">
        <div class="answer-input-group">
          <label for="answer-jp">Tiếng Nhật</label>
          <input
            type="text"
            id="answer-jp"
            class="answer-input jp-input"
            placeholder="Nhập bằng tiếng Nhật..."
            ${checked ? 'disabled' : ''}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </div>
        <div class="answer-input-group">
          <label for="answer-romaji">Romaji</label>
          <input
            type="text"
            id="answer-romaji"
            class="answer-input"
            placeholder="Nhập romaji..."
            ${checked ? 'disabled' : ''}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </div>
      </div>

      <!-- Result feedback -->
      <div id="result-area"></div>

      <!-- Actions -->
      <div class="practice-actions">
        ${!checked ? `
          <button class="btn btn-secondary flex-1" data-action="show-answer">Xem đáp án</button>
          <button class="btn btn-primary flex-1" data-action="check-answer">Kiểm tra</button>
        ` : `
          <button class="btn btn-ghost" data-action="open-canvas">✍ Luyện viết</button>
          <button class="btn btn-outline flex-1" data-action="retry-question">↻ Nhập lại</button>
          <button class="btn btn-primary flex-1" data-action="next-question">${idx < total - 1 ? 'Tiếp theo →' : 'Xem kết quả'}</button>
        `}
      </div>
    </div>
  `;
}

function checkAnswer() {
  const item = state.practiceItems[state.practiceIndex];
  const jpInput = document.getElementById('answer-jp');
  const romajiInput = document.getElementById('answer-romaji');

  const jpAnswer = normalizeJapanese(jpInput.value);
  const romajiAnswer = normalizeRomaji(romajiInput.value);

  const jpCorrect = jpAnswer === normalizeJapanese(item.japanese);
  const romajiCorrect = romajiAnswer === normalizeRomaji(item.romaji);
  const allCorrect = jpCorrect && romajiCorrect;

  // Style inputs
  jpInput.classList.add(jpCorrect ? 'correct' : 'wrong');
  romajiInput.classList.add(romajiCorrect ? 'correct' : 'wrong');
  jpInput.disabled = true;
  romajiInput.disabled = true;

  // Update score
  if (allCorrect) {
    state.practiceCorrect++;
  } else {
    state.practiceWrong++;
  }
  state.practiceChecked = true;

  // Show feedback
  const resultArea = document.getElementById('result-area');
  resultArea.innerHTML = `
    <div class="result-feedback ${allCorrect ? 'correct' : 'wrong'}">
      <div class="result-icon">${allCorrect ? '✅ Chính xác!' : '❌ Chưa đúng'}</div>
      ${!allCorrect ? `
        <div>
          <div class="correct-answer">Đáp án: ${escHtml(item.kanji || item.japanese)}</div>
          ${item.kanji && item.kanji !== item.japanese ? `<div class="correct-answer-kana">${escHtml(item.japanese)}</div>` : ''}
          <div class="correct-answer-romaji">${escHtml(item.romaji)}</div>
        </div>
      ` : ''}
    </div>
  `;

  // Update action buttons
  const actions = appEl.querySelector('.practice-actions');
  const total = state.practiceItems.length;
  const idx = state.practiceIndex;
  actions.innerHTML = `
    <button class="btn btn-ghost" data-action="open-canvas">✍ Luyện viết</button>
    <button class="btn btn-outline flex-1" data-action="retry-question">↻ Nhập lại</button>
    <button class="btn btn-primary flex-1" data-action="next-question">${idx < total - 1 ? 'Tiếp theo →' : 'Xem kết quả'}</button>
  `;

  // Update score display
  const scoreEl = appEl.querySelector('.progress-info span:last-child');
  if (scoreEl) scoreEl.textContent = `✅ ${state.practiceCorrect}  ❌ ${state.practiceWrong}`;

  // Update progress bar
  const fill = appEl.querySelector('.progress-bar-fill');
  if (fill) fill.style.width = `${((idx + 1) / total) * 100}%`;

  // Re-attach events
  actions.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', handleAction);
  });
}

function showAnswer() {
  const item = state.practiceItems[state.practiceIndex];
  const jpInput = document.getElementById('answer-jp');
  const romajiInput = document.getElementById('answer-romaji');

  jpInput.value = item.japanese;
  romajiInput.value = item.romaji;

  // Mark as wrong (they peeked)
  state.practiceWrong++;
  state.practiceChecked = true;

  jpInput.classList.add('correct');
  romajiInput.classList.add('correct');
  jpInput.disabled = true;
  romajiInput.disabled = true;

  const resultArea = document.getElementById('result-area');
  resultArea.innerHTML = `
    <div class="result-feedback wrong">
      <div class="result-icon">👀 Đáp án</div>
      <div>
        <div class="correct-answer">${escHtml(item.kanji || item.japanese)}</div>
        ${item.kanji && item.kanji !== item.japanese ? `<div class="correct-answer-kana">${escHtml(item.japanese)}</div>` : ''}
        <div class="correct-answer-romaji">${escHtml(item.romaji)}</div>
      </div>
    </div>
  `;

  const actions = appEl.querySelector('.practice-actions');
  const total = state.practiceItems.length;
  const idx = state.practiceIndex;
  actions.innerHTML = `
    <button class="btn btn-ghost" data-action="open-canvas">✍ Luyện viết</button>
    <button class="btn btn-outline flex-1" data-action="retry-question">↻ Nhập lại</button>
    <button class="btn btn-primary flex-1" data-action="next-question">${idx < total - 1 ? 'Tiếp theo →' : 'Xem kết quả'}</button>
  `;

  const scoreEl = appEl.querySelector('.progress-info span:last-child');
  if (scoreEl) scoreEl.textContent = `✅ ${state.practiceCorrect}  ❌ ${state.practiceWrong}`;

  actions.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', handleAction);
  });
}

function retryQuestion() {
  state.practiceChecked = false;
  render();

  // Auto-focus the Japanese input
  setTimeout(() => {
    const jpInput = document.getElementById('answer-jp');
    if (jpInput) jpInput.focus();
  }, 100);
}

function nextQuestion() {
  const idx = state.practiceIndex + 1;
  if (idx >= state.practiceItems.length) {
    navigate('results');
    return;
  }
  state.practiceIndex = idx;
  state.practiceChecked = false;
  render();

  // Auto-focus the Japanese input
  setTimeout(() => {
    const jpInput = document.getElementById('answer-jp');
    if (jpInput) jpInput.focus();
  }, 100);
}

function openCanvas() {
  const item = state.practiceItems[state.practiceIndex];
  canvas.open(item.japanese);
}

// ══════════════════════════════════════════════════════════════════════════
// SCREEN: RESULTS
// ══════════════════════════════════════════════════════════════════════════

function renderResults() {
  const total = state.practiceItems.length;
  const correct = state.practiceCorrect;
  const wrong = state.practiceWrong;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  let message = '';
  if (pct === 100) message = '🎉 Hoàn hảo!';
  else if (pct >= 80) message = '👏 Xuất sắc!';
  else if (pct >= 60) message = '💪 Khá tốt!';
  else if (pct >= 40) message = '📚 Cần ôn thêm';
  else message = '🔄 Hãy thử lại!';

  return `
    <div class="results-screen animate-in">
      <div class="screen-header">
        <button class="back-btn" data-action="goto-home" aria-label="Trang chủ">←</button>
        <h2>Kết quả</h2>
      </div>

      <div class="results-circle">
        <div class="results-percent">${pct}%</div>
        <div class="results-label">chính xác</div>
      </div>

      <h2 class="text-center mb-lg">${message}</h2>

      <div class="results-stats">
        <div class="results-stat">
          <div class="stat-value" style="color:var(--success)">${correct}</div>
          <div class="stat-label">Đúng</div>
        </div>
        <div class="results-stat">
          <div class="stat-value" style="color:var(--error)">${wrong}</div>
          <div class="stat-label">Sai</div>
        </div>
        <div class="results-stat">
          <div class="stat-value">${total}</div>
          <div class="stat-label">Tổng</div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        <button class="btn btn-primary btn-block btn-lg" data-action="start-practice" data-source="${state.practiceSource}" data-type="${state.practiceType}" ${state.practiceCategory ? `data-category="${escHtml(state.practiceCategory)}"` : ''}>
          🔄 Làm lại
        </button>
        <button class="btn btn-secondary btn-block" data-action="goto-practice-select">
          Chọn bài khác
        </button>
        <button class="btn btn-ghost btn-block" data-action="goto-home">
          Về trang chủ
        </button>
      </div>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════════════════
// SCREEN: ADD / EDIT WORD
// ══════════════════════════════════════════════════════════════════════════

function renderAddWord() {
  const isEdit = !!state.editingId;
  let existing = null;
  if (isEdit) {
    existing = Storage.getAll().find(w => w.id === state.editingId);
  }

  const allCategories = [...new Set([
    ...getCustomCategories('vocabulary'),
    ...getCustomCategories('grammar')
  ])];

  return `
    <div class="animate-in">
      <div class="screen-header">
        <button class="back-btn" data-action="goto-library-custom" aria-label="Quay lại">←</button>
        <h2>${isEdit ? 'Sửa' : 'Thêm mới'}</h2>
      </div>

      <div class="form-group">
        <label for="form-type">Loại</label>
        <select id="form-type">
          <option value="vocabulary" ${existing?.type === 'vocabulary' || !existing ? 'selected' : ''}>Từ vựng</option>
          <option value="grammar" ${existing?.type === 'grammar' ? 'selected' : ''}>Ngữ pháp</option>
        </select>
      </div>

      <div class="form-group">
        <label for="form-vn">Tiếng Việt</label>
        <input type="text" id="form-vn" placeholder="Ví dụ: Xin chào" value="${existing ? escHtml(existing.vietnamese) : ''}" />
      </div>

      <div class="form-group">
        <label for="form-jp">Tiếng Nhật</label>
        <input type="text" id="form-jp" class="jp-input" placeholder="Ví dụ: こんにちは" value="${existing ? escHtml(existing.japanese) : ''}" />
      </div>

      <div class="form-group">
        <label for="form-romaji">Romaji</label>
        <input type="text" id="form-romaji" placeholder="Ví dụ: konnichiwa" value="${existing ? escHtml(existing.romaji) : ''}" />
      </div>

      <div class="form-group">
        <label for="form-category">Chủ đề</label>
        <input type="text" id="form-category" placeholder="Ví dụ: Chào hỏi" value="${existing ? escHtml(existing.category) : ''}" list="category-list" />
        <datalist id="category-list">
          ${allCategories.map(c => `<option value="${escHtml(c)}">`).join('')}
        </datalist>
      </div>

      <button class="btn btn-primary btn-block btn-lg mt-lg" data-action="save-word">
        ${isEdit ? '💾 Cập nhật' : '+ Thêm'}
      </button>
    </div>
  `;
}

function saveWord() {
  const type = document.getElementById('form-type').value;
  const vietnamese = document.getElementById('form-vn').value.trim();
  const japanese = document.getElementById('form-jp').value.trim();
  const romaji = document.getElementById('form-romaji').value.trim();
  const category = document.getElementById('form-category').value.trim();

  // Validate
  if (!vietnamese || !japanese || !romaji) {
    alert('Vui lòng điền đầy đủ Tiếng Việt, Tiếng Nhật và Romaji.');
    return;
  }

  const data = { type, vietnamese, japanese, romaji, category: category || 'Chung', level: 1 };

  if (state.editingId) {
    Storage.update(state.editingId, data);
  } else {
    Storage.add(data);
  }

  navigate('library-custom', { librarySource: 'custom', libraryType: type, libraryFilter: 'Tất cả' });
}

function deleteWord(id) {
  if (confirm('Bạn có chắc muốn xóa mục này?')) {
    Storage.delete(id);
    render();
  }
}

// ══════════════════════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ══════════════════════════════════════════════════════════════════════════

document.addEventListener('keydown', (e) => {
  if (state.screen === 'practice' && !state.practiceChecked && e.key === 'Enter') {
    e.preventDefault();
    checkAnswer();
  } else if (state.screen === 'practice' && state.practiceChecked && e.key === 'Enter') {
    e.preventDefault();
    nextQuestion();
  }
});

// ══════════════════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════════════════

render();
