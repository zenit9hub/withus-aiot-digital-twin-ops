import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import './styles.css'

let mermaid: any

async function getMermaid() {
  if (!mermaid) {
    const module = await import(/* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
    mermaid = module.default
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    })
  }

  return mermaid
}

async function renderMermaid() {
  if (typeof window === 'undefined') return

  await nextTick()

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>('.mermaid:not([data-processed="true"])')
  )

  if (!nodes.length) return

  const renderer = await getMermaid()
  await renderer.run({ nodes })
}

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    onMounted(renderMermaid)
    watch(
      () => route.path,
      () => {
        window.setTimeout(renderMermaid, 0)
      }
    )
  }
}
