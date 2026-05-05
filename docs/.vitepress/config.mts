import { defineConfig } from 'vitepress'

const githubRepository = 'zenit9hub/withus-aiot-digital-twin-ops'
const githubPagesBase = '/withus-aiot-digital-twin-ops/'
const defaultCanonicalOrigin = 'https://dt.lab.rezen.dev'

function normalizeBase(value: string): string {
  const trimmed = value.trim()

  if (trimmed === '' || trimmed === '/') {
    return '/'
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`

  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/+$/, '')
}

function isGitHubPagesBuild(): boolean {
  return process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY === githubRepository
}

function resolveBase(): string {
  if (process.env.VITEPRESS_BASE) {
    return normalizeBase(process.env.VITEPRESS_BASE)
  }

  if (isGitHubPagesBuild()) {
    return githubPagesBase
  }

  return '/'
}

function resolveCanonicalOrigin(): string {
  return normalizeOrigin(process.env.VITEPRESS_CANONICAL_ORIGIN ?? defaultCanonicalOrigin)
}

function shouldRedirectToCanonical(): boolean {
  if (process.env.VITEPRESS_REDIRECT_TO_CANONICAL) {
    return process.env.VITEPRESS_REDIRECT_TO_CANONICAL === 'true'
  }

  return isGitHubPagesBuild()
}

function pageToCanonicalPath(page: string): string {
  const withoutExtension = page.replace(/\.md$/, '')
  const cleanPath = withoutExtension.replace(/(^|\/)index$/, '$1')

  if (cleanPath === '') {
    return '/'
  }

  const path = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`

  return path.endsWith('/') ? path : path
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const siteBase = resolveBase()
const canonicalOrigin = resolveCanonicalOrigin()
const redirectToCanonical = shouldRedirectToCanonical()

export default defineConfig({
  lang: 'ko-KR',
  title: 'WITHUS AIoT Digital Twin Ops Handbook',
  description: '대학생 멘토링을 위한 AIoT 디지털 트윈 팩토리 실습 핸드북',
  base: siteBase,
  cleanUrls: true,
  sitemap: {
    hostname: canonicalOrigin
  },
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ],
  transformHead({ page, title, description }) {
    const canonicalUrl = `${canonicalOrigin}${pageToCanonicalPath(page)}`
    const head = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }]
    ]

    if (redirectToCanonical) {
      head.push(
        ['meta', { name: 'robots', content: 'noindex,follow' }],
        ['meta', { 'http-equiv': 'refresh', content: `0;url=${canonicalUrl}` }],
        [
          'script',
          {},
          `(() => {
  const canonicalUrl = ${JSON.stringify(canonicalUrl)}
  if (window.location.href !== canonicalUrl) {
    window.location.replace(canonicalUrl + window.location.search + window.location.hash)
  }
})()`
        ]
      )
    }

    return head
  },
  markdown: {
    config(md) {
      const defaultFence = md.renderer.rules.fence

      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const language = token.info.trim().split(/\s+/)[0]

        if (language === 'mermaid') {
          return `<pre class="mermaid">${escapeHtml(token.content)}</pre>`
        }

        return defaultFence
          ? defaultFence(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }
    }
  },
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '소개', link: '/' },
      { text: '프로젝트', link: '/guide/project-overview' },
      { text: '아키텍처', link: '/architecture/system-overview' },
      { text: '핸드북', link: '/handbook/' },
      { text: '협업', link: '/collaboration/publication-policy' }
    ],
    sidebar: [
      {
        text: '프로젝트 가이드',
        items: [
          { text: '프로젝트 개요', link: '/guide/project-overview' }
        ]
      },
      {
        text: '아키텍처',
        items: [
          { text: '전체 시스템 개요', link: '/architecture/system-overview' },
          { text: '설비환경시뮬레이터', link: '/architecture/simulator' },
          { text: '엣지제어운영서버', link: '/architecture/edge-server' }
        ]
      },
      {
        text: '멘토링 핸드북',
        items: [
          { text: '핸드북 시작하기', link: '/handbook/' },
          { text: '00. 학습 로드맵', link: '/handbook/00-learning-map' },
          { text: '01. 공장 시뮬레이터', link: '/handbook/01-factory-simulator' },
          { text: '02. MQTT와 Node-RED HelloWorld', link: '/handbook/02-mqtt-and-node-red-hello-world' },
          { text: '03. 시트1 인리치먼트', link: '/handbook/03-sheet1-enrichment' },
          { text: '04. 시트2 룰엔진', link: '/handbook/04-sheet2-rule-engine' },
          { text: '05. 시트3 현장 분석가 AI', link: '/handbook/05-sheet3-field-analyst-agent' },
          { text: '06. 시트4 관리자 AI', link: '/handbook/06-sheet4-manager-agent' },
          { text: '07. 운영 권고 반영', link: '/handbook/07-rule-engine-with-ops-recommendation' },
          { text: '08. 시트5 Dashboard', link: '/handbook/08-sheet5-dashboard' },
          { text: '90. 토픽과 Payload', link: '/handbook/90-topic-and-payload-reference' },
          { text: '91. 문제 해결', link: '/handbook/91-troubleshooting' }
        ]
      },
      {
        text: '협업과 공개 운영',
        items: [
          { text: '공개 운영 원칙', link: '/collaboration/publication-policy' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zenit9hub/withus-aiot-digital-twin-ops' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'WITHUS AIoT Digital Twin Ops Handbook',
      copyright: 'Copyright © 2026'
    }
  }
})
