import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"软件推荐","description":"常用软件与工具推荐总览。","frontmatter":{"title":"软件推荐","description":"常用软件与工具推荐总览。"},"headers":[],"relativePath":"software/index.md","filePath":"software/index.md"}');
const _sfc_main = { name: "software/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="软件推荐" tabindex="-1">软件推荐 <a class="header-anchor" href="#软件推荐" aria-label="Permalink to &quot;软件推荐&quot;">​</a></h1><p>这里汇总值得长期保留的软件清单。</p><h2 id="子页面" tabindex="-1">子页面 <a class="header-anchor" href="#子页面" aria-label="Permalink to &quot;子页面&quot;">​</a></h2><ul><li><a href="/docs/software/browser-tools">浏览器工具</a></li><li><a href="/docs/software/productivity">效率软件</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("software/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
