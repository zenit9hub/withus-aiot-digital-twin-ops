import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ko-KR',
  title: 'WITHUS AIoT Digital Twin Ops',
  description: '멀티에이전트 AI 기반 IoT 디지털트윈 설비 운영지원 시스템 공개 레퍼런스',
  base: '/withus-aiot-digital-twin-ops/',
  cleanUrls: true,
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '소개', link: '/' },
      { text: '가이드', link: '/guide/project-overview' },
      { text: '아키텍처', link: '/architecture/system-overview' },
      { text: '협업', link: '/collaboration/publication-policy' }
    ],
    sidebar: [
      {
        text: '프로젝트 가이드',
        items: [
          { text: '프로젝트 개요', link: '/guide/project-overview' },
          { text: '저장소 구조', link: '/guide/repository-structure' }
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
      message: 'WITHUS AIoT Digital Twin Ops Public Reference',
      copyright: 'Copyright © 2026'
    }
  }
})
