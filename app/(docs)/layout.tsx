import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { UserBadge } from "@/components/user-badge";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions}
      tree={source.pageTree}
      themeSwitch={{ enabled: false }}
      sidebar={{ footer: <UserBadge /> }}
    >
      {children}
    </DocsLayout>
  );
}
