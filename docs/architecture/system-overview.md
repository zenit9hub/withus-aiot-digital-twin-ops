# 전체 시스템 개요

## 시스템 구성

이 프로젝트의 MVP는 크게 세 계층으로 구성됩니다.

1. 설비환경시뮬레이터
2. 엣지제어운영서버
3. 운영 대시보드 및 AI 운영지원

## 데이터 흐름

```mermaid
flowchart LR
  sim["설비환경시뮬레이터"] -->|"MQTT sensor/status"| edge["엣지제어운영서버"]
  edge -->|"MQTT control"| sim
  edge -->|"운영 상태 / 이벤트"| dash["운영 대시보드"]
  edge -->|"요약 입력"| ai["로컬 AI / 멀티에이전트 AI"]
  ai -->|"운영 권고"| edge
```

## 책임 분리

- 설비환경시뮬레이터
  - 제어 메시지 수신
  - 내부 상태 변경
  - 환경 변화 계산
  - 센서값과 상태값 발행

- 엣지제어운영서버
  - 센서/상태 수집
  - 상태 판정
  - 제어 규칙 수행
  - 이벤트 생성
  - AI 입력 생성과 결과 반영

- 운영 대시보드
  - 현재 상태 표시
  - 이벤트 이력 표시
  - 운영 권고 표시

## 참고 원문

- [설비환경시뮬레이터 아키텍처](https://github.com/zenit9hub/withus-aiot-digital-twin-ops/blob/main/%EB%A9%80%ED%8B%B0%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%20AI%20%EA%B8%B0%EB%B0%98%20IoT%20%EB%94%94%EC%A7%80%ED%84%B8%ED%8A%B8%EC%9C%88%20%EC%84%A4%EB%B9%84%20%EC%9A%B4%EC%98%81%EC%A7%80%EC%9B%90%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EA%B0%9C%EB%B0%9C/10_%EC%84%A4%EB%B9%84%ED%99%98%EA%B2%BD%EC%8B%9C%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98_%EC%84%A4%EB%B9%84%ED%99%98%EA%B2%BD%EC%8B%9C%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0.md)
- [엣지제어운영서버 아키텍처](https://github.com/zenit9hub/withus-aiot-digital-twin-ops/blob/main/%EB%A9%80%ED%8B%B0%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%20AI%20%EA%B8%B0%EB%B0%98%20IoT%20%EB%94%94%EC%A7%80%ED%84%B8%ED%8A%B8%EC%9C%88%20%EC%84%A4%EB%B9%84%20%EC%9A%B4%EC%98%81%EC%A7%80%EC%9B%90%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EA%B0%9C%EB%B0%9C/20_%EC%97%A3%EC%A7%80%EC%A0%9C%EC%96%B4%EC%9A%B4%EC%98%81%EC%84%9C%EB%B2%84/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98_%EC%97%A3%EC%A7%80%EC%A0%9C%EC%96%B4%EC%9A%B4%EC%98%81%EC%84%9C%EB%B2%84.md)
