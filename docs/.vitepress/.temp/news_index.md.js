import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"近期资讯","description":"值得跟进的更新、动态和新发现。","frontmatter":{"title":"近期资讯","description":"值得跟进的更新、动态和新发现。"},"headers":[],"relativePath":"news/index.md","filePath":"news/index.md"}');
const _sfc_main = { name: "news/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="近期资讯" tabindex="-1">近期资讯 <a class="header-anchor" href="#近期资讯" aria-label="Permalink to &quot;近期资讯&quot;">​</a></h1><p>这里放最近值得跟进的信息和短资讯。</p><h2 id="记录方式" tabindex="-1">记录方式 <a class="header-anchor" href="#记录方式" aria-label="Permalink to &quot;记录方式&quot;">​</a></h2><ul><li>时间</li><li>来源</li><li>结论</li><li>后续动作</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("news/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
