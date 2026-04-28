import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import './styles.css'

let mermaid: any
let zoomInstalled = false

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

function openMermaidZoom(source: HTMLElement) {
  const svg = source.querySelector('svg')
  if (!svg) return

  const overlay = document.createElement('div')
  overlay.className = 'mermaid-zoom-overlay'
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.innerHTML = `
    <button class="mermaid-zoom-close" type="button" aria-label="닫기">×</button>
    <div class="mermaid-zoom-content">${svg.outerHTML}</div>
  `

  const close = () => {
    overlay.remove()
    document.removeEventListener('keydown', onKeydown)
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close()
  }

  overlay.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (target === overlay || target.classList.contains('mermaid-zoom-close')) close()
  })

  document.addEventListener('keydown', onKeydown)
  document.body.appendChild(overlay)
}

function installMermaidZoom() {
  if (zoomInstalled || typeof window === 'undefined') return

  zoomInstalled = true
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null
    const source = target?.closest?.('.mermaid') as HTMLElement | null
    if (!source) return

    openMermaidZoom(source)
  })
}

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    onMounted(() => {
      installMermaidZoom()
      renderMermaid()
    })
    watch(
      () => route.path,
      () => {
        window.setTimeout(renderMermaid, 0)
      }
    )
  }
}
