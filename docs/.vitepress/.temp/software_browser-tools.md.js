import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"浏览器工具","description":"浏览器相关的扩展、插件和实用工具。","frontmatter":{"title":"浏览器工具","description":"浏览器相关的扩展、插件和实用工具。"},"headers":[],"relativePath":"software/browser-tools.md","filePath":"software/browser-tools.md"}');
const _sfc_main = { name: "software/browser-tools.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="浏览器工具" tabindex="-1">浏览器工具 <a class="header-anchor" href="#浏览器工具" aria-label="Permalink to &quot;浏览器工具&quot;">​</a></h1><p>这里整理浏览器扩展、插件和页面工具。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("software/browser-tools.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const browserTools = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  browserTools as default
};
