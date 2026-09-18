// 像素风验证码：5x7 像素点阵字体 + 干扰线 + 噪点，风格对齐经典像素验证码。
// 存 SQLite（captchas 表），5 分钟有效、一次性使用（校验后即销毁，防重放）。
import crypto from 'node:crypto';
import db from './db.js';

const CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // 去掉易混淆的 I L O 0 1
const CODE_LEN = 4;
const TTL_MS = 5 * 60 * 1000;

// 字符调色板（深红/深绿/蓝/深灰，参考像素验证码经典配色）
const PALETTE = ['#8b2323', '#256b3f', '#2b5c9e', '#3a3a3a'];
const NOISE_COLORS = ['#b9b4a4', '#a8a496', '#c8c3b2', '#9a958a', '#c4b8a0'];

// 5x7 像素点阵字体
const FONT = {
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  B: ['####.', '#...#', '#...#', '####.', '#...#', '#...#', '####.'],
  C: ['.####', '#....', '#....', '#....', '#....', '#....', '.####'],
  D: ['####.', '#...#', '#...#', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '#....', '####.', '#....', '#....', '#####'],
  F: ['#####', '#....', '#....', '####.', '#....', '#....', '#....'],
  G: ['.###.', '#....', '#....', '#.##.', '#...#', '#...#', '.###.'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  J: ['....#', '....#', '....#', '....#', '#...#', '#...#', '.###.'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  P: ['####.', '#...#', '#...#', '####.', '#....', '#....', '#....'],
  Q: ['.###.', '#...#', '#...#', '#...#', '#.#.#', '#..#.', '.##.#'],
  R: ['####.', '#...#', '#...#', '####.', '#.#..', '#..#.', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  V: ['#...#', '#...#', '#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#...#', '#.#.#', '#.#.#', '##.##', '#...#'],
  X: ['#...#', '#...#', '.#.#.', '..#..', '.#.#.', '#...#', '#...#'],
  Y: ['#...#', '#...#', '.#.#.', '..#..', '..#..', '..#..', '..#..'],
  Z: ['#####', '....#', '...#.', '..#..', '.#...', '#....', '#####'],
  2: ['.###.', '#...#', '....#', '...#.', '..#..', '.#...', '#####'],
  3: ['.###.', '#...#', '....#', '..##.', '....#', '#...#', '.###.'],
  4: ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  5: ['#####', '#....', '#....', '####.', '....#', '#...#', '.###.'],
  6: ['.###.', '#....', '#....', '####.', '#...#', '#...#', '.###.'],
  7: ['#####', '....#', '...#.', '..#..', '.#...', '.#...', '.#...'],
  8: ['.###.', '#...#', '#...#', '.###.', '#...#', '#...#', '.###.'],
  9: ['.###.', '#...#', '#...#', '.####', '....#', '....#', '.###.'],
};

db.exec(`
CREATE TABLE IF NOT EXISTS captchas (
  id         TEXT PRIMARY KEY,
  code       TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

function rand(n) {
  return Math.floor(Math.random() * n);
}

function pick(arr) {
  return arr[rand(arr.length)];
}

function renderSvg(code) {
  const W = 160;
  const H = 54;
  const P = 5; // 像素单元尺寸（实心，无抖动，保证清晰）
  const GLYPH_W = 5 * P; // 25
  const GLYPH_H = 7 * P; // 35
  const parts = [];

  parts.push(`<rect width="${W}" height="${H}" fill="#f3f2ea"/>`);

  // 干扰线（2 条，淡色细线，弱干扰，不压字）
  for (let i = 0; i < 2; i++) {
    const c = pick(['#9bbf9b', '#c9a0a0', '#a9a9d0']);
    parts.push(
      `<line x1="${rand(W)}" y1="${rand(H)}" x2="${rand(W)}" y2="${rand(H)}" stroke="${c}" stroke-width="1" opacity="0.5"/>`
    );
  }

  // 噪点（少量、浅色、1px，仅作轻微底噪）
  for (let i = 0; i < 16; i++) {
    parts.push(
      `<rect x="${rand(W)}" y="${rand(H)}" width="1" height="1" fill="${pick(NOISE_COLORS)}" opacity="0.7"/>`
    );
  }

  // 像素字符：实心方块，无抖动，清晰对齐
  let x = 14 + rand(3);
  const y0 = Math.floor((H - GLYPH_H) / 2) + rand(2) - 1;
  for (const ch of code) {
    const glyph = FONT[ch];
    const color = pick(PALETTE);
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 5; c++) {
        if (glyph[r][c] !== '#') continue;
        parts.push(
          `<rect x="${x + c * P}" y="${y0 + r * P}" width="${P}" height="${P}" fill="${color}"/>`
        );
      }
    }
    x += GLYPH_W + 6 + rand(2);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join('')}</svg>`;
}

// 生成新验证码：返回 { id, svg }，svg 交给前端展示，id 随表单提交校验
export function createCaptcha() {
  // 顺手清理过期行，防止表膨胀
  db.prepare('DELETE FROM captchas WHERE expires_at < ?').run(new Date().toISOString());

  let code = '';
  for (let i = 0; i < CODE_LEN; i++) code += CHARS[rand(CHARS.length)];
  const id = crypto.randomBytes(16).toString('hex');
  const expires = new Date(Date.now() + TTL_MS).toISOString();
  db.prepare('INSERT INTO captchas (id, code, expires_at) VALUES (?, ?, ?)').run(id, code, expires);
  return { id, svg: renderSvg(code) };
}

// 校验：一次性——无论对错都销毁，前端失败后需刷新重试
export function verifyCaptcha(id, text) {
  if (!id || !text) return false;
  const key = String(id);
  const row = db.prepare('SELECT code, expires_at FROM captchas WHERE id = ?').get(key);
  db.prepare('DELETE FROM captchas WHERE id = ?').run(key);
  if (!row) return false;
  if (new Date(row.expires_at) < new Date()) return false;
  return String(text).trim().toUpperCase() === row.code;
}
