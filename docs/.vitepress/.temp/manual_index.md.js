import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"工具手册","description":"工具、流程和部署说明的手册区。","frontmatter":{"title":"工具手册","description":"工具、流程和部署说明的手册区。"},"headers":[],"relativePath":"manual/index.md","filePath":"manual/index.md"}');
const _sfc_main = { name: "manual/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="工具手册" tabindex="-1">工具手册 <a class="header-anchor" href="#工具手册" aria-label="Permalink to &quot;工具手册&quot;">​</a></h1><p>这里放工具说明、部署流程和操作步骤。</p><h2 id="子页面" tabindex="-1">子页面 <a class="header-anchor" href="#子页面" aria-label="Permalink to &quot;子页面&quot;">​</a></h2><ul><li><a href="/manual/vitepress">VitePress 指南</a></li><li><a href="/manual/github-pages">GitHub Pages 指南</a></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("manual/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
