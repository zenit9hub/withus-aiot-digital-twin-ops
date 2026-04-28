import { defineConfig } from 'vitepress'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineConfig({
  lang: 'ko-KR',
  title: 'WITHUS AIoT Digital Twin Ops Handbook',
  description: '대학생 멘토링을 위한 AIoT 디지털 트윈 팩토리 실습 핸드북',
  base: '/withus-aiot-digital-twin-ops/',
  cleanUrls: true,
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
      { text: '핸드북', link: '/handbook/' },
      { text: '아키텍처', link: '/architecture/system-overview' },
      { text: '협업', link: '/collaboration/publication-policy' }
    ],
    sidebar: [
      {
        text: '멘토링 핸드북',
        items: [
          { text: '핸드북 시작하기', link: '/handbook/' },
          { text: '00. 학습 로드맵', link: '/handbook/00-learning-map' },
          { text: '01. 공장 시뮬레이터', link: '/handbook/01-factory-simulator' },
          { text: '02. MQTT와 Node-RED HelloWorld', link: '/handbook/02-mqtt-and-node-red-hello-world' },
          { text: '03. 시트1 인리치먼트', link: '/handbook/03-sheet1-enrichment' },
          { text: '04. 듀얼 트랙 리뷰', link: '/handbook/04-dual-track-review' },
          { text: '05. 시트2 룰엔진', link: '/handbook/05-sheet2-rule-engine' },
          { text: '06. 시트3 현장 분석가 AI', link: '/handbook/06-sheet3-field-analyst-agent' },
          { text: '07. 시트5 시각화', link: '/handbook/07-sheet5-dashboard-and-3d-visualization' },
          { text: '08. 시트4 관리자 AI', link: '/handbook/08-sheet4-manager-agent' },
          { text: '09. 운영 권고 반영', link: '/handbook/09-rule-engine-with-ops-recommendation' },
          { text: '90. 토픽과 Payload', link: '/handbook/90-topic-and-payload-reference' },
          { text: '91. 문제 해결', link: '/handbook/91-troubleshooting' }
        ]
      },
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
