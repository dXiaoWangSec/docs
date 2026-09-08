import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"效率软件","description":"提升效率的桌面和轻量软件。","frontmatter":{"title":"效率软件","description":"提升效率的桌面和轻量软件。"},"headers":[],"relativePath":"software/productivity.md","filePath":"software/productivity.md"}');
const _sfc_main = { name: "software/productivity.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="效率软件" tabindex="-1">效率软件 <a class="header-anchor" href="#效率软件" aria-label="Permalink to &quot;效率软件&quot;">​</a></h1><p>这里整理常用的效率类软件与习惯工具。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("software/productivity.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const productivity = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  productivity as default
};
