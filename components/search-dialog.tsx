"use client";

import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  SearchDialogFooter,
  SearchDialogClose,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useDocsSearch } from "fumadocs-core/search/client";
import { initCjkOrama } from "@/lib/search";

/**
 * 客户端静态搜索框。
 *
 * 默认 DefaultSearchDialog 的静态模式不暴露 initOrama，会用 Orama 默认
 * 英文分词器，中文搜不到。这里自己接 useDocsSearch 并注入中文分词器，
 * 与服务端导出索引用的分词器保持一致。
 */
export default function CustomSearchDialog({
  open,
  onOpenChange,
}: SharedProps) {
  const { search, setSearch, query } = useDocsSearch({
    type: "static",
    from: "/api/search",
    initOrama: initCjkOrama,
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      open={open}
      onOpenChange={onOpenChange}
      isLoading={query.isLoading}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          items={query.data === "empty" ? null : query.data}
        />
      </SearchDialogContent>
      <SearchDialogFooter />
    </SearchDialog>
  );
}
