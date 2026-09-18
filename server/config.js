// 配置：全部来自环境变量，带本地默认值
export const PORT = Number(process.env.PORT) || 4000;
export const DATABASE_PATH = process.env.DATABASE_PATH || '';
export const COOKIE_NAME = process.env.COOKIE_NAME || 'docs_session';
export const SESSION_TTL_DAYS = Number(process.env.SESSION_TTL_DAYS) || 7;
export const COOKIE_SECURE = process.env.COOKIE_SECURE === 'true';
export const TRUST_PROXY = process.env.TRUST_PROXY === 'true';

// 仅允许这些扩展名作为"静态资源"放行（注意：.html/.txt/.json 是内容/搜索数据，绝不在此列）
export const ASSET_EXT = new Set([
  'js', 'mjs', 'cjs',
  'css', 'map',
  'ico', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'avif', 'bmp',
  'woff', 'woff2', 'ttf', 'eot', 'otf',
]);
