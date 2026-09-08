import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"博客笔记","description":"个人思考、记录和短文。","frontmatter":{"title":"博客笔记","description":"个人思考、记录和短文。"},"headers":[],"relativePath":"blog/index.md","filePath":"blog/index.md"}');
const _sfc_main = { name: "blog/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="博客笔记" tabindex="-1">博客笔记 <a class="header-anchor" href="#博客笔记" aria-label="Permalink to &quot;博客笔记&quot;">​</a></h1><p>这里放日常笔记、经验总结和临时想法。</p><h2 id="适合记录" tabindex="-1">适合记录 <a class="header-anchor" href="#适合记录" aria-label="Permalink to &quot;适合记录&quot;">​</a></h2><ul><li>学习笔记</li><li>工作复盘</li><li>观察随笔</li><li>项目片段</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("blog/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
