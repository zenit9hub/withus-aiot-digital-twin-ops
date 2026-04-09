# 엣지제어운영서버

## 역할

엣지제어운영서버는 센서 데이터와 설비 상태를 수집하고, 상태를 판정한 뒤 제어 규칙과 AI 운영지원을 연결하는 핵심 계층입니다.

## 핵심 기능

- 센서/상태 수집과 `sampleId` 기준 스냅샷 조합
- 온도/진동 기반 상태 판정
- 냉각 제어와 셧다운 규칙 수행
- 이벤트 생성과 대시보드 반영
- 로컬 AI, 멀티에이전트 AI 연계

## 문서 구성

- 아키텍처 문서
- Node-RED 플로우 문서
- 제어 규칙 문서
- AI 연계 문서
- Dashboard 문서

## 구현 관점에서 먼저 볼 문서

- [아키텍처_엣지제어운영서버.md](https://github.com/zenit9hub/withus-aiot-digital-twin-ops/blob/main/%EB%A9%80%ED%8B%B0%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%20AI%20%EA%B8%B0%EB%B0%98%20IoT%20%EB%94%94%EC%A7%80%ED%84%B8%ED%8A%B8%EC%9C%88%20%EC%84%A4%EB%B9%84%20%EC%9A%B4%EC%98%81%EC%A7%80%EC%9B%90%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EA%B0%9C%EB%B0%9C/20_%EC%97%A3%EC%A7%80%EC%A0%9C%EC%96%B4%EC%9A%B4%EC%98%81%EC%84%9C%EB%B2%84/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98_%EC%97%A3%EC%A7%80%EC%A0%9C%EC%96%B4%EC%9A%B4%EC%98%81%EC%84%9C%EB%B2%84.md)
- [Node-RED플로우.md](https://github.com/zenit9hub/withus-aiot-digital-twin-ops/blob/main/%EB%A9%80%ED%8B%B0%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%20AI%20%EA%B8%B0%EB%B0%98%20IoT%20%EB%94%94%EC%A7%80%ED%84%B8%ED%8A%B8%EC%9C%88%20%EC%84%A4%EB%B9%84%20%EC%9A%B4%EC%98%81%EC%A7%80%EC%9B%90%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EA%B0%9C%EB%B0%9C/20_%EC%97%A3%EC%A7%80%EC%A0%9C%EC%96%B4%EC%9A%B4%EC%98%81%EC%84%9C%EB%B2%84/Node-RED%ED%94%8C%EB%A1%9C%EC%9A%B0.md)
- [제어규칙.md](https://github.com/zenit9hub/withus-aiot-digital-twin-ops/blob/main/%EB%A9%80%ED%8B%B0%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%20AI%20%EA%B8%B0%EB%B0%98%20IoT%20%EB%94%94%EC%A7%80%ED%84%B8%ED%8A%B8%EC%9C%88%20%EC%84%A4%EB%B9%84%20%EC%9A%B4%EC%98%81%EC%A7%80%EC%9B%90%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EA%B0%9C%EB%B0%9C/20_%EC%97%A3%EC%A7%80%EC%A0%9C%EC%96%B4%EC%9A%B4%EC%98%81%EC%84%9C%EB%B2%84/%EC%A0%9C%EC%96%B4%EA%B7%9C%EC%B9%99.md)
