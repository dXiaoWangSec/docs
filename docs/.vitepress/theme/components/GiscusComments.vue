<template>
  <section v-if="!isHome" class="giscus-wrap">
    <div v-if="!enabled" class="giscus-setup">
      <strong>留言功能尚未配置</strong>
      <p>请在 GitHub 仓库开启 Discussions，安装 Giscus App，并配置仓库 ID 与分类 ID。</p>
      <a href="https://giscus.app/zh-CN" target="_blank" rel="noreferrer">打开 Giscus 配置页</a>
    </div>
    <div ref="giscusEl" class="giscus"></div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { isDark } = useData()
const route = useRoute()
const giscusEl = ref<HTMLDivElement | null>(null)
const isHome = computed(() => route.path === '/' || route.path === '/index.html')
const enabled = computed(
  () =>
    !!import.meta.env.VITE_GISCUS_REPO &&
    !!import.meta.env.VITE_GISCUS_REPO_ID &&
    !!import.meta.env.VITE_GISCUS_CATEGORY &&
    !!import.meta.env.VITE_GISCUS_CATEGORY_ID
)

let scriptEl: HTMLScriptElement | null = null

const themeName = () => (isDark.value ? 'dark_dimmed' : 'light')

function postTheme(theme: string) {
  const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme } } },
    'https://giscus.app'
  )
}

function clearGiscus() {
  scriptEl?.remove()
  scriptEl = null
  if (giscusEl.value) giscusEl.value.innerHTML = ''
}

async function mountGiscus() {
  if (isHome.value || !enabled.value || !giscusEl.value) return

  await nextTick()

  if (scriptEl) {
    scriptEl.remove()
    scriptEl = null
  }

  giscusEl.value.innerHTML = ''

  scriptEl = document.createElement('script')
  scriptEl.src = 'https://giscus.app/client.js'
  scriptEl.async = true
  scriptEl.crossOrigin = 'anonymous'
  scriptEl.setAttribute('data-repo', import.meta.env.VITE_GISCUS_REPO)
  scriptEl.setAttribute('data-repo-id', import.meta.env.VITE_GISCUS_REPO_ID)
  scriptEl.setAttribute('data-category', import.meta.env.VITE_GISCUS_CATEGORY)
  scriptEl.setAttribute('data-category-id', import.meta.env.VITE_GISCUS_CATEGORY_ID)
  scriptEl.setAttribute('data-mapping', import.meta.env.VITE_GISCUS_MAPPING || 'pathname')
  scriptEl.setAttribute('data-strict', import.meta.env.VITE_GISCUS_STRICT || '0')
  scriptEl.setAttribute(
    'data-reactions-enabled',
    import.meta.env.VITE_GISCUS_REACTIONS_ENABLED || '1'
  )
  scriptEl.setAttribute('data-emit-metadata', import.meta.env.VITE_GISCUS_EMIT_METADATA || '0')
  scriptEl.setAttribute('data-input-position', import.meta.env.VITE_GISCUS_INPUT_POSITION || 'bottom')
  scriptEl.setAttribute('data-theme', themeName())
  scriptEl.setAttribute('data-lang', import.meta.env.VITE_GISCUS_LANG || 'zh-CN')
  scriptEl.setAttribute('data-loading', import.meta.env.VITE_GISCUS_LOADING || 'lazy')
  scriptEl.setAttribute('crossorigin', 'anonymous')

  giscusEl.value.appendChild(scriptEl)
}

onMounted(mountGiscus)

watch(
  () => route.path,
  () => {
    if (isHome.value) clearGiscus()
    else mountGiscus()
  }
)

watch(isDark, () => {
  postTheme(themeName())
})

onBeforeUnmount(() => {
  clearGiscus()
})
</script>

<style scoped>
.giscus-wrap {
  --giscus-max-width: 860px;
  margin: 2.5rem auto 0;
  padding: 0 1rem;
  max-width: calc(var(--giscus-max-width) + 2rem);
}

.giscus-setup {
  max-width: var(--giscus-max-width);
  margin: 0 auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem 1.1rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-size: 0.9rem;
}

.giscus-setup strong {
  color: var(--vp-c-text-1);
}

.giscus-setup p {
  margin: 0.45rem 0 0.65rem;
}

.giscus-setup a {
  color: var(--vp-c-brand-1);
}

.giscus {
  width: 100%;
  max-width: var(--giscus-max-width);
  margin: 0 auto;
}

.giscus :deep(iframe) {
  display: block;
  width: 100%;
}
</style>
