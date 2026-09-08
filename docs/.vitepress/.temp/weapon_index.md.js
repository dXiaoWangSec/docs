import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"知识库武器库","description":"汇总实战方法、技巧和资料的核心入口。","frontmatter":{"title":"知识库武器库","description":"汇总实战方法、技巧和资料的核心入口。"},"headers":[],"relativePath":"weapon/index.md","filePath":"weapon/index.md"}');
const _sfc_main = { name: "weapon/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="知识库武器库" tabindex="-1">知识库武器库 <a class="header-anchor" href="#知识库武器库" aria-label="Permalink to &quot;知识库武器库&quot;">​</a></h1><p>这里收录偏实战的内容，适合做方法沉淀和案例归档。</p><h2 id="推荐内容" tabindex="-1">推荐内容 <a class="header-anchor" href="#推荐内容" aria-label="Permalink to &quot;推荐内容&quot;">​</a></h2><ul><li>攻防思路</li><li>复盘记录</li><li>工具技巧</li><li>模板片段</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("weapon/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
