# 文档站登录功能 · 设计文档

> 状态：草案（待评审，未提交）
> 日期：2026-09-17
> 范围：为现有 Fumadocs 文档站增加「全站登录才能访问」的鉴权能力

---

## 1. 背景与目标

- **现状**：本站基于 Fumadocs + Next.js 15（App Router）+ React 19，当前配置 `output: "export"`（纯静态导出），经 GitHub Pages 托管，自定义域名 `docs.xiaowang69.top`。
- **目标**：
  1. 全站内容必须登录后才能访问（未登录看不到任何文档页）。
  2. 自建 **Node 后端 + SQLite** 做注册 / 登录 / 会话管理，不引入第三方 IdP（Clerk / Auth0 / Supabase 等），数据自持。
  3. 保持技术栈轻量、可自托管、易维护。

---

## 2. 关键约束与已确认决策

### 已确认决策（来自本次沟通）
| 维度 | 决策 |
|---|---|
| 保护范围 | 整个文档站（全站受保护） |
| 认证机制 | 自建后端会话（Node + SQLite） |
| 数据库 | SQLite |
| 后端语言 | Node.js |
| 邮箱验证 | 不需要（仅基本校验：邮箱格式、密码长度/复杂度） |
| 用户角色 | 单角色，无管理员（所有账号权限相同） |

### GitHub Pages 与本方案的关系（重要澄清）⚠️
**先说结论：GitHub Pages 和 Node 后端并不冲突，两者是独立服务，可以并存。** 引入 Node 后端不会"禁用"GitHub Pages。

真正的关系是——**GitHub Pages 只是一个静态文件托管商，它托管的东西一定是公网可直读的，且它没有任何服务端逻辑能拦人。** 所以问题不是"用了 Node 就不能用 Pages"，而是"**受保护的内容到底放在哪**"：

- 若内容放在公网直读的 Pages 上 → 任何人都能 `curl` 直接抓 HTML/JS/数据，**登录形同虚设**。
- 若内容由 Node 网关在鉴权通过后才下发 → 未登录者拿不到内容 → 真正保护成立，但此时内容不再走 Pages。

由此引出两种真实落地方式（见 §10 / 开放问题 ⑤），由你定：

- **方案 A（真保护，推荐）**：Node 后端既做鉴权网关、又直接托管导出的静态站；受保护内容**不放**公网直读的 Pages。Pages 可保留做其他公开页，或直接不用。
- **方案 B（仅登录墙，内容仍公网可读）**：Pages 照常托管静态站，Node 只管登录态 + 前端守卫。实现最简、保留 Pages，但**未登录的技术用户仍能抓到内容**，不算真正安全。仅适合"挡普通访客"的场景。

> 你之前定的"整个文档站都要登录才能看"，若作为**硬安全要求**，只能选 A，Pages 对受保护内容无意义；若只是"挡住普通访客、不防技术用户"，选 B 也能保留 Pages。

---

## 3. 总体架构

```
浏览器
  │
  ▼
Node 网关 (Express)  ── 校验会话中间件 (checkSession)
  ├── /login            → 登录页（公开）
  ├── /api/auth/*       → 注册 / 登录 / 登出 / me（公开，仅这几个）
  ├── 静态资源白名单     → /_next/*、*.js、*.css、字体、图片、favicon（公开，不含内容）
  └── 其余所有路由       → 文档内容，未登录 302 → /login；已登录放行
        │
        ├── serve 静态导出目录（含 index.html 的构建产物）
        └── SQLite (users / sessions)
```

**请求流**：
1. 未登录访问任意文档 URL → 网关 302 跳转 `/login`。
2. 在 `/login` 提交 → `POST /api/auth/login` → 比对密码哈希 → 生成 session token → 写 `sessions` 表 → `Set-Cookie`（httpOnly）。
3. 后续请求自动带 Cookie → 网关查 `sessions` + `users` → 有效则放行内容。
4. 登出 → `POST /api/auth/logout` → 删 `sessions` 行 + 清 Cookie。

---

## 4. 技术选型

| 项 | 选型 | 备选 | 理由 |
|---|---|---|---|
| 运行时 | Node 22（已具备） | — | 环境已有 |
| Web 框架 | Express 4 | Fastify | 轻量、生态成熟、心智成本低 |
| SQLite 驱动 | `better-sqlite3` | Node 22 内置 `node:sqlite`（实验性） | 同步 API，简单可靠 |
| 密码哈希 | `argon2`（argon2id） | `bcrypt` | 当前标准，抗 GPU 暴力 |
| 会话 | DB 存储随机 token + Cookie | JWT | 可主动吊销、登出彻底、实现简单 |
| 限流 | `express-rate-limit`（内存） | 自写 | 防爆破 |
| 安全头 | `helmet` | 手写 | 一站式响应头 |
| 日志 | `pino` | console | 结构化 |

**环境变量**（不入库，提供 `.env.example`）：
`PORT`、`DATABASE_PATH`、`SESSION_SECRET`、`COOKIE_NAME`、`COOKIE_SECURE`、`SESSION_TTL_DAYS`、`TRUST_PROXY`、`NODE_ENV`

---

## 5. 认证流程

- **注册** `POST /api/auth/register` `{email, password}`
  → 校验格式 / 邮箱唯一 → `argon2` 哈希 → 写 `users`。
  （本期不做邮箱验证，预留字段。）
- **登录** `POST /api/auth/login` `{email, password}`
  → 查 `users` → `argon2.verify` → 生成随机 `token`（≥32 字节 hex）→ 写 `sessions`（含过期时间、ip、ua）→ `Set-Cookie`。
- **当前用户** `GET /api/auth/me`
  → 读 Cookie → 查 `sessions`+`users` → 返回 `{id, email}` 或 `401`。
- **登出** `POST /api/auth/logout`
  → 删 `sessions` 对应行 → 清 Cookie。
- **受保护访问** 中间件 `checkSession`
  → 取 Cookie → 查 `sessions`（未过期）→ 关联 `users` → 有效 `next()`；
  → 无效时：页面请求 `302 /login`，API 请求 `401`。
  → 静态资源白名单路径直接 `next()`，不拦截。

**防时序攻击**：用户不存在时仍执行一次假哈希比对，返回与真实失败一致的延时与文案。

---

## 6. 数据库设计（SQLite）

```sql
-- users
CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- sessions（可吊销、可过期）
CREATE TABLE sessions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  ip         TEXT,
  user_agent TEXT
);
CREATE UNIQUE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user ON sessions(user_id);

-- 可选：登录失败计数（限流/锁定）
CREATE TABLE login_attempts (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  key        TEXT NOT NULL,            -- email 或 ip
  fails      INTEGER NOT NULL DEFAULT 0,
  last_fail  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_attempts_key ON login_attempts(key);
```

- DB 文件权限设为 `600`，加入 `.gitignore`。
- 写少读多（注册/登录才写，访问只查），SQLite 完全够用。

---

## 7. 目录结构与后端接口

仓库新增 `server/` 目录（不进入 Fumadocs 构建）：

```
server/
  index.js       # Express 入口：托管静态站 + 挂载路由 + 中间件
  config.js      # 读环境变量
  db.js          # better-sqlite3 连接 + 建表（首次启动自动建）
  auth.js        # /api/auth/* 路由
  middleware.js  # checkSession、rateLimit、静态白名单
  package.json   # 后端依赖（express / better-sqlite3 / argon2 / helmet / express-rate-limit / pino）
```

启动：`node server/index.js`（生产用 `pm2` / `node --watch` 仅开发）。

前端侧：
- 在文档站新增登录页 `/login`（Fumadocs 可加一个独立页面或 MDX 占位页承载表单）。
- 客户端调用 `/api/auth/*`；根布局里 `GET /api/auth/me` 做兜底守卫（真正拦截仍靠服务端）。
- Fumadocs 的搜索 API 与内容数据走静态导出，被网关统一拦截，无需单独处理。

---

## 8. 前端登录页与客户端守卫

- 登录页 UI 复用现有配色（主色 `#2172cc`、卡片 `#fcfcfb`、边框 `#e7e5e0`、文字 `#16110c`）。
- 表单：邮箱 + 密码 + 登录按钮 + 错误提示；登录成功 `location.href = "/"`。
- 客户端守卫（兜底）：应用加载时 `fetch('/api/auth/me')`，未登录且当前非 `/login` 则跳转。
  > 注意：客户端守卫只是体验优化，**真正安全边界是服务端 `checkSession`**。即便绕过前端，未带有效 Cookie 也拿不到内容。

---

## 9. 安全要点清单

- [ ] 密码 `argon2id`，参数随硬件调优（memory/time cost）。
- [ ] Cookie：`HttpOnly` + `Secure`（HTTPS 时） + `SameSite=Lax`；名自定义。
- [ ] Session 过期（默认 7 天），可主动吊销（登出 / 改密）。
- [ ] 登录失败限流 + 渐进延迟；连续失败可临时锁定账号/IP。
- [ ] 防时序攻击（见 §5）。
- [ ] 全站强制 HTTPS（反向代理 301 跳转 + HSTS）。
- [ ] 安全响应头（helmet：CSP / X-Frame-Options / Referrer-Policy 等）。
- [ ] DB 文件权限 `600`，不入库、不日志明文密码 / 明文 token。
- [ ] CSRF：`SameSite=Lax` 已覆盖大部分场景；若日后加非简单请求可补 double-submit token。
- [ ] XSS：Fumadocs 已做内容转义；登录页输入输出不渲染未转义 HTML。

---

## 10. 部署

**结论**：受保护内容的安全边界由「内容放在哪」决定，而非「用不用 Node」。两种落地方式（对应 §2 澄清）：

**方案 A（真保护，推荐）— Node 服务直接对外 + 托管静态站**
- 域名 `docs.xiaowang69.top` 指向该 Node 服务（或前面套 Caddy / Nginx 反代 + 自动 HTTPS）。
- Node 后端既鉴权又 serve 导出的静态站；受保护内容**不走** GitHub Pages。
- SQLite 文件随服务持久化（**务必定期备份**，`cp` / `sqlite3 .backup`）。
- 提供多阶段 `Dockerfile` + 启动脚本；`.env` 不入库。
- GitHub Pages 可保留做其他公开页，或彻底不用——对受保护内容无影响。

**方案 B（保留 Pages，仅登录墙）— Pages 托管静态站 + Node 只管登录态**
- 静态站照常部署到 GitHub Pages；Node 后端（另-host）只提供 `/api/auth/*` 与登录态。
- 前端做客户端守卫（未登录跳 `/login`）。
- ⚠️ 内容仍公网可读（技术用户 `curl` 可抓 HTML/JS），**非真正安全**，仅挡普通访客。
- 仅当你接受"挡普通访客、不防技术用户"时选用。

**GitHub Actions**：原 `deploy.yml`（触发 `main`）在方案 A 下可废弃或改为「构建 → 部署 VPS/Docker」；方案 B 下保留用于部署 Pages。

---

## 11. 实施步骤（建议分期）

- **阶段 0**：`server/` 骨架 + `db.js` 建表 + 启动脚本 + `.env.example`。
- **阶段 1**：`/api/auth/register|login|logout|me` + argon2 + 会话写入。
- **阶段 2**：Express 托管静态导出目录 + `checkSession` 中间件 + 静态白名单。
- **阶段 3**：`/login` 登录页 + 客户端守卫 + 登出入口。
- **阶段 4**：限流 / 安全头 / HTTPS / Docker / 部署。
- **阶段 5（可选）**：邮箱验证、找回密码、用户管理后台。

---

## 12. 风险与开放问题（需你拍板，不代你决定）

1. **HTTPS 证书**：由 Caddy 自动申请 Let's Encrypt，还是你已有证书？
2. **邮箱验证 / 找回密码**：✅ 已定——**不需要**。注册仅做基本校验（邮箱格式、密码长度/复杂度），无 SMTP、无验证邮件、无找回密码。
3. **用户角色**：✅ 已定——**单角色，无管理员**。所有账号权限相同（登录即可看全站）。
4. **SQLite 并发**：docs 站点读多写少，注册/登录写极少，SQLite 够用；若预期高并发再换 Postgres。
5. **GitHub Pages 走向（A/B 二选一）**：见 §2 澄清与 §10。A=真保护（内容不走 Pages）；B=保留 Pages 仅做登录墙（内容公网仍可读，非真安全）。原 `deploy.yml`（触发 main）按所选方案决定保留/废弃。
6. **域名绑定**：`docs.xiaowang69.top` 解析到新 Node 服务（或反代机），需你提供/确认解析目标。

> 最关键的一条：**必须确保未登录用户无法从公网直接抓到内容**（静态产物不要单独外发到 Pages / CDN）。这是全站保护成立的前提。
