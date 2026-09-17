import { source } from "@/lib/source";
import { createSearchAPI } from "fumadocs-core/search/server";
import { cjkTokenizer } from "@/lib/search";

// 静态导出：构建时把搜索索引导出为 /api/search 静态文件，
// 浏览器端在本地加载该索引做检索（GitHub Pages 等纯静态托管可用）。
export const dynamic = "force-static";

export const { staticGET: GET } = createSearchAPI("advanced", {
  // 注意：使用自定义 tokenizer 时不能传 language（Orama 会抛错）
  tokenizer: cjkTokenizer,
  indexes: source.getPages().map((page) => ({
    title: page.data.title ?? "Untitled",
    description: page.data.description ?? "",
    structuredData: page.data.structuredData!,
    id: page.url,
    url: page.url,
  })),
});
