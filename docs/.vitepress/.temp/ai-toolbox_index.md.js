import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"AI工具箱","description":"记录提示词、工作流和 AI 工具。","frontmatter":{"title":"AI工具箱","description":"记录提示词、工作流和 AI 工具。"},"headers":[],"relativePath":"ai-toolbox/index.md","filePath":"ai-toolbox/index.md"}');
const _sfc_main = { name: "ai-toolbox/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="ai工具箱" tabindex="-1">AI工具箱 <a class="header-anchor" href="#ai工具箱" aria-label="Permalink to &quot;AI工具箱&quot;">​</a></h1><p>这里整理和 AI 相关的日常工具、提示词与工作流。</p><h2 id="可继续扩展" tabindex="-1">可继续扩展 <a class="header-anchor" href="#可继续扩展" aria-label="Permalink to &quot;可继续扩展&quot;">​</a></h2><ul><li>提示词模板</li><li>自动化流程</li><li>模型使用笔记</li><li>结果整理方法</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("ai-toolbox/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
