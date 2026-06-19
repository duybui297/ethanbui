// =============================================================================
// 日本語学習 — Handwriting Canvas Component
// =============================================================================

export class WritingCanvas {
  constructor() {
    this.strokes = [];
    this.currentStroke = [];
    this.isDrawing = false;
    this.canvas = null;
    this.ctx = null;
    this.referenceChar = '';
    this.overlayEl = null;
    this.onClose = null;

    // Bound handlers
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onResize = this._onResize.bind(this);
  }

  /**
   * Open the canvas overlay with a reference character
   */
  open(referenceChar, onClose) {
    this.referenceChar = referenceChar || '';
    this.onClose = onClose;
    this.strokes = [];
    this.currentStroke = [];

    this._createOverlay();
    this._setupCanvas();
    this._attachEvents();
  }

  /**
   * Close and destroy the overlay
   */
  close() {
    this._detachEvents();
    if (this.overlayEl) {
      this.overlayEl.remove();
      this.overlayEl = null;
    }
    if (this.onClose) this.onClose();
  }

  // ── DOM Creation ──

  _createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'canvas-overlay';
    overlay.innerHTML = `
      <div class="canvas-container">
        <div class="canvas-header">
          <h3>Luyện viết</h3>
          <span class="canvas-reference jp">${this._escapeHtml(this.referenceChar)}</span>
          <button class="btn btn-ghost btn-icon" id="canvas-close" aria-label="Đóng">✕</button>
        </div>
        <div class="canvas-tools">
          <button class="btn btn-ghost btn-icon" id="canvas-undo" title="Hoàn tác">↩</button>
          <button class="btn btn-ghost btn-icon" id="canvas-clear" title="Xóa tất cả">🗑</button>
          <div style="flex:1"></div>
          <span style="font-size:0.8rem;color:var(--text-tertiary);align-self:center;">Dùng ngón tay hoặc bút để viết</span>
        </div>
        <div class="canvas-area" id="canvas-area">
          <div class="canvas-watermark jp">${this._escapeHtml(this.referenceChar)}</div>
          <canvas id="writing-canvas"></canvas>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlayEl = overlay;

    // Button events
    overlay.querySelector('#canvas-close').addEventListener('click', () => this.close());
    overlay.querySelector('#canvas-undo').addEventListener('click', () => this._undo());
    overlay.querySelector('#canvas-clear').addEventListener('click', () => this._clear());
  }

  _setupCanvas() {
    this.canvas = this.overlayEl.querySelector('#writing-canvas');
    this.ctx = this.canvas.getContext('2d');
    this._resizeCanvas();
  }

  _resizeCanvas() {
    const area = this.overlayEl.querySelector('#canvas-area');
    const rect = area.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';

    this.ctx.scale(dpr, dpr);
    this._redraw();
  }

  // ── Event Handling ──

  _attachEvents() {
    const canvas = this.canvas;
    canvas.addEventListener('pointerdown', this._onPointerDown);
    canvas.addEventListener('pointermove', this._onPointerMove);
    canvas.addEventListener('pointerup', this._onPointerUp);
    canvas.addEventListener('pointerleave', this._onPointerUp);
    canvas.addEventListener('pointercancel', this._onPointerUp);
    window.addEventListener('resize', this._onResize);
  }

  _detachEvents() {
    if (!this.canvas) return;
    const canvas = this.canvas;
    canvas.removeEventListener('pointerdown', this._onPointerDown);
    canvas.removeEventListener('pointermove', this._onPointerMove);
    canvas.removeEventListener('pointerup', this._onPointerUp);
    canvas.removeEventListener('pointerleave', this._onPointerUp);
    canvas.removeEventListener('pointercancel', this._onPointerUp);
    window.removeEventListener('resize', this._onResize);
  }

  _getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure || 0.5
    };
  }

  _onPointerDown(e) {
    e.preventDefault();
    this.isDrawing = true;
    this.currentStroke = [this._getPointerPos(e)];
    this.canvas.setPointerCapture(e.pointerId);
  }

  _onPointerMove(e) {
    if (!this.isDrawing) return;
    e.preventDefault();

    const point = this._getPointerPos(e);
    this.currentStroke.push(point);
    this._drawCurrentStroke();
  }

  _onPointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    if (this.currentStroke.length > 1) {
      this.strokes.push([...this.currentStroke]);
    }
    this.currentStroke = [];
  }

  _onResize() {
    this._resizeCanvas();
  }

  // ── Drawing ──

  _drawStroke(points) {
    if (points.length < 2) return;
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.strokeStyle = '#1C1C1E';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Move to first point
    ctx.moveTo(points[0].x, points[0].y);

    // Draw smooth curve through points
    for (let i = 1; i < points.length - 1; i++) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      const pressure = points[i].pressure || 0.5;
      ctx.lineWidth = 2 + pressure * 4; // 2-6px based on pressure

      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }

    // Draw to the last point
    const last = points[points.length - 1];
    ctx.lineWidth = 2 + (last.pressure || 0.5) * 4;
    ctx.lineTo(last.x, last.y);

    ctx.stroke();
  }

  _drawCurrentStroke() {
    // Redraw everything for clean rendering
    this._redraw();
    if (this.currentStroke.length > 1) {
      this._drawStroke(this.currentStroke);
    }
  }

  _redraw() {
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);

    // Draw grid lines (subtle guide)
    this._drawGrid();

    // Draw all completed strokes
    for (const stroke of this.strokes) {
      this._drawStroke(stroke);
    }
  }

  _drawGrid() {
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;
    const w = this.canvas.width / dpr;
    const h = this.canvas.height / dpr;

    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 8]);

    // Center cross
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.restore();
  }

  // ── Actions ──

  _undo() {
    this.strokes.pop();
    this._redraw();
  }

  _clear() {
    this.strokes = [];
    this._redraw();
  }

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
