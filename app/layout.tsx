import { RootProvider } from "fumadocs-ui/provider";
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "@fontsource/geist-mono/400.css";
import "fumadocs-ui/style.css";
import "./global.css";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import CustomSearchDialog from "@/components/search-dialog";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider
            search={{
              SearchDialog: CustomSearchDialog,
            }}
          >
            {children}
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
