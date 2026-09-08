import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"安全导航","description":"常用安全站点、资源与工具入口。","frontmatter":{"title":"安全导航","description":"常用安全站点、资源与工具入口。"},"headers":[],"relativePath":"navigation/index.md","filePath":"navigation/index.md"}');
const _sfc_main = { name: "navigation/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="安全导航" tabindex="-1">安全导航 <a class="header-anchor" href="#安全导航" aria-label="Permalink to &quot;安全导航&quot;">​</a></h1><p>这里放常用的安全站点、资料库和参考链接。</p><h2 id="分类" tabindex="-1">分类 <a class="header-anchor" href="#分类" aria-label="Permalink to &quot;分类&quot;">​</a></h2><ul><li>漏洞情报</li><li>研究资料</li><li>靶场练习</li><li>公开工具</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("navigation/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
