import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"VitePress 指南","description":"VitePress 的基础使用说明。","frontmatter":{"title":"VitePress 指南","description":"VitePress 的基础使用说明。"},"headers":[],"relativePath":"manual/vitepress.md","filePath":"manual/vitepress.md"}');
const _sfc_main = { name: "manual/vitepress.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="vitepress-指南" tabindex="-1">VitePress 指南 <a class="header-anchor" href="#vitepress-指南" aria-label="Permalink to &quot;VitePress 指南&quot;">​</a></h1><p>这里记录 VitePress 的配置、结构和常见用法。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("manual/vitepress.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const vitepress = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  vitepress as default
};
