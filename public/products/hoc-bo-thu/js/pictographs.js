/* Hình minh hoạ nguồn gốc tượng hình của bộ thủ.
 * Vẽ bằng SVG nét, dùng currentColor nên tự đổi màu theo theme.
 * key = số thứ tự bộ thủ. Bộ nào chưa có hình thì app tự fallback sang emoji.
 */
window.PICTOGRAPHS = {

9: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <circle cx="50" cy="20" r="9"/><path d="M50 29v26"/><path d="M50 34l-16 12M50 34l16 12"/>
  <path d="M50 55l-13 30M50 55l13 30"/></svg>`,

30: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <ellipse cx="50" cy="50" rx="31" ry="22"/><path d="M22 50h56"/></svg>`,

46: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
  <path d="M8 82h84"/><path d="M14 82L34 44l14 24 16-38 22 52"/></svg>`,

61: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
  <path d="M50 84C28 66 16 54 16 40a18 18 0 0 1 34-8 18 18 0 0 1 34 8c0 14-12 26-34 44z"/>
  <path d="M50 36v34M36 48c6 5 6 13 0 18M64 48c-6 5-6 13 0 18" stroke-width="2.6" opacity=".5"/></svg>`,

64: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M50 92V54"/><path d="M32 58V26M41 55V18M59 55V18M68 58V30"/>
  <path d="M32 58c-8-4-12 4-6 10M50 54c-9-2-13 2-13 8"/></svg>`,

72: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4">
  <circle cx="50" cy="50" r="32"/><circle cx="50" cy="50" r="7" fill="currentColor"/></svg>`,

74: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M63 12a40 40 0 1 0 0 76 32 32 0 0 1 0-76z"/>
  <path d="M40 38h16M40 56h16" stroke-width="3" opacity=".6"/></svg>`,

75: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M50 12v66"/><path d="M22 36h56"/><path d="M50 60L24 88M50 60l26 28"/></svg>`,

85: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M50 10c-6 16-6 24 0 40s6 24 0 40"/>
  <path d="M28 26c-5 12-5 20 0 32M20 46c-4 10-4 16 0 26"/>
  <path d="M72 26c5 12 5 20 0 32M80 46c4 10 4 16 0 26"/></svg>`,

86: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
  <path d="M50 88c14 0 24-10 24-23 0-16-14-22-14-38 0 0-10 8-10 18 0-6-4-10-4-10s-6 8-6 16c0 0-6-4-8-10-4 8-6 14-6 24 0 13 10 23 24 23z"/></svg>`,

102: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4">
  <rect x="18" y="18" width="64" height="64" rx="2"/><path d="M50 18v64M18 50h64"/></svg>`,

109: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M10 50c12-18 26-27 40-27s28 9 40 27c-12 18-26 27-40 27s-28-9-40-27z"/>
  <circle cx="50" cy="50" r="11"/><circle cx="50" cy="50" r="3.5" fill="currentColor" stroke="none"/></svg>`,

118: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M34 90V22M66 90V22"/><path d="M28 42h12M28 62h12M60 42h12M60 62h12" stroke-width="3"/>
  <path d="M34 22c-8-8-16-8-22-2M66 22c8-8 16-8 22-2"/></svg>`,

169: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M14 18v72M86 18v72"/><path d="M14 18h30v72M86 18H56v72"/>
  <path d="M44 54h-8M56 54h8" stroke-width="3"/></svg>`,

173: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M16 34h68M50 14v20"/><path d="M20 34v46M80 34v46"/>
  <path d="M36 48v10M64 48v10M36 68v10M64 68v10"/></svg>`,

159: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4">
  <rect x="34" y="34" width="32" height="32" rx="2"/><path d="M50 10v80"/>
  <path d="M20 24h60M20 76h60" stroke-linecap="round"/></svg>`,

154: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M50 14c16 0 26 14 26 30S64 72 50 72 24 60 24 44 34 14 50 14z"/>
  <path d="M36 30c6 6 6 22 0 30M64 30c-6 6-6 22 0 30" stroke-width="3" opacity=".6"/>
  <path d="M38 72l-8 16M62 72l8 16"/></svg>`,

140: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <path d="M12 84h76"/><path d="M36 84c0-22-8-34-18-42 14 0 22 10 24 26"/>
  <path d="M64 84c0-22 8-34 18-42-14 0-22 10-24 26"/><path d="M50 84V40"/></svg>`,

184: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 52h56c0 18-12 28-28 28S22 70 22 52z"/><path d="M16 52h68"/>
  <path d="M40 36c0-6 4-8 4-14M56 34c0-5 3-7 3-12" stroke-width="3" opacity=".7"/></svg>`,

149: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">
  <ellipse cx="50" cy="72" rx="22" ry="14"/><path d="M28 72h44" stroke-width="3"/>
  <path d="M30 46h40M34 34h32M38 22h24"/></svg>`
};
