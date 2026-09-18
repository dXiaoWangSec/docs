"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "fumadocs-ui/components/layout/theme-toggle";

/**
 * 侧栏底部单行组件：邮箱 + 退出按钮（左） + 主题切换（右）。
 * 挂载方式：DocsLayout 传 themeSwitch={{ enabled: false }} 关掉内置主题切换行，
 * 再把本组件放进 sidebar.footer，保证底部只有这一行。未登录不渲染。
 */
export function UserBadge() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => {
        if (alive && u?.email) setEmail(u.email as string);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!email) return null;

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      location.href = "/login";
    }
  };

  return (
    <div className="flex w-full items-center gap-1 text-xs text-fd-muted-foreground">
      <span className="min-w-0 truncate" title={email}>
        {email}
      </span>
      <button
        onClick={logout}
        className="shrink-0 cursor-pointer rounded-md p-1 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        aria-label="退出登录"
        title="退出登录"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-3.5"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      </button>
      <ThemeToggle className="ms-auto p-0" mode="light-dark" />
    </div>
  );
}
