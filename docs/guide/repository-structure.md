# 저장소 구조

## 역할

이 저장소는 산학 협력 멘토링에서 공개 가능한 AIoT 디지털 트윈 팩토리 학습 자료를 웹사이트 형태로 제공하는 공개 레퍼런스입니다.

포함 범위:

- 디지털 트윈 팩토리 실습 핸드북
- 프로젝트 개요와 학습 목표
- 설비환경시뮬레이터와 엣지제어운영서버 아키텍처
- 공개 운영 및 협업 기준
- 향후 공개 가능한 샘플 코드와 다이어그램

제외 범위:

- 학생 실명, 학번, 이메일, 전화번호
- 문의 메일 원문
- 학교 포털 화면과 제출 흔적
- 내부 운영 메모와 비공개 피드백
- API Key, 토큰, 접속 정보

## 현재 사이트 구조

```text
.
├─ package.json
├─ package-lock.json
└─ docs/
   ├─ index.md
   ├─ .vitepress/
   │  └─ config.mts
   ├─ handbook/
   │  └─ digital-twin-factory-handbook.md
   ├─ guide/
   │  ├─ project-overview.md
   │  └─ repository-structure.md
   ├─ architecture/
   │  ├─ system-overview.md
   │  ├─ simulator.md
   │  └─ edge-server.md
   ├─ collaboration/
   │  └─ publication-policy.md
   └─ public/
      └─ favicon.svg
```

## 배포 흐름

```text
Private Obsidian Vault
  20_공개_레퍼런스레포/docs/
        |
        | push 감지
        v
Public GitHub Repository
  withus-aiot-digital-twin-ops/docs/
        |
        | VitePress build
        v
GitHub Pages
```

## 운영 원칙

- 원천 문서는 비공개 Vault의 `20_공개_레퍼런스레포/docs/`에서 관리합니다.
- 공개 레포의 `docs/`는 자동 동기화 대상으로 보고 직접 수정하지 않습니다.
- 공개 전 개인정보, 내부 메모, 인증 정보 포함 여부를 확인합니다.
- 공개 협업이 필요한 경우 별도 브랜치와 Pull Request로 검토합니다.
