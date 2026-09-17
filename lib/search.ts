import { create } from "@orama/orama";

/**
 * 与服务端 createSearchAPI("advanced") 完全一致的 Orama schema。
 * 静态搜索时浏览器端要用同一个 schema + 同一个分词器去 load 导出的索引，
 * 否则高级检索（按标题/正文/章节分字段）会失效。
 */
type Schema = NonNullable<Parameters<typeof create>[0]>["schema"];

export const advancedSchema: Schema = {
  content: "string",
  page_id: "string",
  type: "string",
  breadcrumbs: "string[]",
  tags: "enum[]",
  url: "string",
  embeddings: "vector[512]",
};

/**
 * 中文可用的自定义分词器。
 *
 * Orama 默认分词按空格/标点切词，中文整句会变成一个大词条，
 * 导致搜「组件」「鉴权」这类短词匹配不到。这里用 Intl.Segmenter
 * （基于 ICU 中文词典）切词，并把每个中文词补上「逐字 + 相邻双字」
 * 组合，保证 1~2 字短查询也能命中。
 *
 * 服务端建索引与浏览器端检索必须共用本分词器，分词结果才能对得上。
 */
const segmenter = new Intl.Segmenter("zh-Hans", { granularity: "word" });
const CJK = /[㐀-䶿一-鿿豈-﫿]/;

function tokenizeCjk(raw: string): string[] {
  if (!raw) return [];
  const tokens: string[] = [];
  for (const { segment, isWordLike } of segmenter.segment(raw.toLowerCase())) {
    if (!isWordLike) continue;
    if (CJK.test(segment)) {
      tokens.push(segment);
      for (let i = 0; i < segment.length; i++) {
        tokens.push(segment[i]);
        if (i + 1 < segment.length) tokens.push(segment.slice(i, i + 2));
      }
    } else {
      tokens.push(segment);
    }
  }
  return tokens;
}

export const cjkTokenizer = {
  language: "cjk-aware",
  normalizationCache: new Map<string, string>(),
  tokenize: (raw: string) => tokenizeCjk(raw),
};

/** 浏览器端静态搜索用：创建一个带中文分词器的高级检索 Orama 实例 */
export function initCjkOrama() {
  return create({
    schema: advancedSchema,
    components: { tokenizer: cjkTokenizer },
  });
}
