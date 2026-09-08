import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"GitHub Pages 指南","description":"GitHub Pages 的发布说明。","frontmatter":{"title":"GitHub Pages 指南","description":"GitHub Pages 的发布说明。"},"headers":[],"relativePath":"manual/github-pages.md","filePath":"manual/github-pages.md"}');
const _sfc_main = { name: "manual/github-pages.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="github-pages-指南" tabindex="-1">GitHub Pages 指南 <a class="header-anchor" href="#github-pages-指南" aria-label="Permalink to &quot;GitHub Pages 指南&quot;">​</a></h1><p>这里记录如何构建并发布到 GitHub Pages。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("manual/github-pages.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const githubPages = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  githubPages as default
};
