import db from './db.js';
import { COOKIE_NAME, ASSET_EXT } from './config.js';

// 白名单：这些路径/资源无需登录即可访问
function isWhitelisted(pathname) {
  if (pathname === '/login') return true;
  if (pathname.startsWith('/api/auth')) return true; // 登录/注册/登出/me 本身
  if (pathname === '/favicon.ico' || pathname === '/CNAME' || pathname === '/robots.txt' || pathname === '/404.html') return true;
  if (pathname.startsWith('/_next/')) return true; // 前端 JS/CSS 资源
  const ext = pathname.split('.').pop()?.toLowerCase();
  if (ext && ASSET_EXT.has(ext)) return true; // 图片/字体等纯静态资源
  return false;
}

// 网关：未登录访问内容一律拦截
export function checkSession(req, res, next) {
  if (isWhitelisted(req.path)) return next();

  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    const session = db.prepare('SELECT expires_at FROM sessions WHERE token = ?').get(token);
    if (session && new Date(session.expires_at) > new Date()) return next();
    if (session) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  }

  // 未登录：页面请求 → 跳登录页；接口 → 401
  if (req.path.startsWith('/api/')) return res.status(401).json({ error: '未登录' });
  return res.redirect('/login');
}

export { isWhitelisted };
