import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import GiscusComments from './components/GiscusComments.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(GiscusComments)
    })
  }
}
