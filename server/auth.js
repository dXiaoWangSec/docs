import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import argon2 from '@node-rs/argon2';
import crypto from 'node:crypto';
import db from './db.js';
import { COOKIE_NAME, SESSION_TTL_DAYS } from './config.js';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 基本校验：最简，仅邮箱格式 + 密码长度/复杂度
function validatePassword(pw) {
  if (typeof pw !== 'string') return '密码格式错误';
  if (pw.length < 8) return '密码至少 8 位';
  if (pw.length > 128) return '密码过长';
  if (!/[a-zA-Z]/.test(pw) || !/[0-9]/.test(pw)) return '密码需同时包含字母和数字';
  return null;
}

// 登录/注册限流：15 分钟内最多 20 次，防爆破
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: '尝试过于频繁，请稍后再试' },
});

function cookieOpts() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: SESSION_TTL_DAYS * 86400000,
    path: '/',
  };
}

function newToken() {
  return crypto.randomBytes(32).toString('hex');
}

function createSession(userId, req) {
  const token = newToken();
  const expires = new Date(Date.now() + SESSION_TTL_DAYS * 86400000).toISOString();
  db.prepare(
    'INSERT INTO sessions (user_id, token, expires_at, ip, user_agent) VALUES (?, ?, ?, ?, ?)'
  ).run(userId, token, expires, req.ip, req.get('user-agent') || '');
  return token;
}

// 注册（最简：无邮箱验证、无管理员）
router.post('/register', authLimiter, async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !EMAIL_RE.test(String(email))) {
    return res.status(400).json({ error: '邮箱格式不正确' });
  }
  const pwErr = validatePassword(password);
  if (pwErr) return res.status(400).json({ error: pwErr });

  const emailNorm = String(email).toLowerCase().trim();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(emailNorm);
  if (existing) return res.status(409).json({ error: '该邮箱已注册' });

  const hash = await argon2.hash(password);
  const info = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(emailNorm, hash);

  // 注册成功自动登录
  const token = createSession(info.lastInsertRowid, req);
  res.cookie(COOKIE_NAME, token, cookieOpts());
  return res.json({ ok: true });
});

// 登录
router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body || {};
  const emailNorm = String(email || '').toLowerCase().trim();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(emailNorm);

  let ok = false;
  if (user) {
    try { ok = await argon2.verify(user.password_hash, password); } catch { ok = false; }
  }
  if (!user || !ok) {
    // 假哈希消耗时间，缩小"用户不存在"的时序差异
    try { await argon2.hash(password || 'x'); } catch { /* ignore */ }
    return res.status(401).json({ error: '邮箱或密码错误' });
  }

  const token = createSession(user.id, req);
  res.cookie(COOKIE_NAME, token, cookieOpts());
  return res.json({ ok: true });
});

// 登出
router.post('/logout', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  res.clearCookie(COOKIE_NAME);
  return res.json({ ok: true });
});

// 当前用户
router.get('/me', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: '未登录' });
  const session = db
    .prepare('SELECT s.expires_at, u.id AS user_id, u.email FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?')
    .get(token);
  if (!session || new Date(session.expires_at) < new Date()) {
    if (session) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    return res.status(401).json({ error: '会话已失效' });
  }
  return res.json({ id: session.user_id, email: session.email });
});

export default router;
