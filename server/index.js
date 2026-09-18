import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import db from './db.js';
import authRouter from './auth.js';
import { checkSession } from './middleware.js';
import { loginPageHtml } from './login-page.js';
import { PORT, COOKIE_NAME, TRUST_PROXY } from './config.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'out'); // docs-upstream/out 静态导出

const app = express();
if (TRUST_PROXY) app.set('trust proxy', 1);

// 安全头（关闭 CSP 以兼容内联脚本/样式，后续可收紧）
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(cookieParser());

// 登录/注册页（独立、自包含，不需要 Fumadocs 资源）；已登录用户直接跳转进站
app.get('/login', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    const session = db.prepare('SELECT expires_at FROM sessions WHERE token = ?').get(token);
    if (session && new Date(session.expires_at) >= new Date()) {
      return res.redirect('/');
    }
  }
  res.type('html').send(loginPageHtml());
});

// 退出（GET 便捷入口）
app.get('/logout', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  res.clearCookie(COOKIE_NAME);
  res.redirect('/login');
});

// 认证接口
app.use('/api/auth', authRouter);

// 网关：未登录访问内容一律拦截（放在静态托管之前）
app.use(checkSession);

// 托管静态导出（扩展名缺失时尝试 .html）
if (fs.existsSync(OUT_DIR)) {
  app.use(express.static(OUT_DIR, { extensions: ['html'], index: 'index.html' }));
} else {
  console.warn(`[warn] 未找到静态导出目录：${OUT_DIR}，请先执行 npm run build`);
}

// 404
app.use((req, res) => {
  res.status(404).type('html').send('<h1>404</h1><p>页面不存在</p>');
});

app.listen(PORT, () => {
  console.log(`文档鉴权服务已启动：http://localhost:${PORT}`);
  console.log(`静态目录：${OUT_DIR}`);
});
