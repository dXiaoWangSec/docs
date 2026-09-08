import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"关于我","description":"站点简介与维护说明。","frontmatter":{"title":"关于我","description":"站点简介与维护说明。"},"headers":[],"relativePath":"about/index.md","filePath":"about/index.md"}');
const _sfc_main = { name: "about/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="关于我" tabindex="-1">关于我 <a class="header-anchor" href="#关于我" aria-label="Permalink to &quot;关于我&quot;">​</a></h1><p>这是站点的个人介绍页，可以放定位、联系方法和维护说明。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("about/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
