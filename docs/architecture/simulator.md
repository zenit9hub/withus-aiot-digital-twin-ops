# 설비환경시뮬레이터

## 역할

설비환경시뮬레이터는 설비 상태와 환경 변화를 계산하고, 이를 MQTT 기반 센서값과 상태값으로 발행하는 구성요소입니다.

## 핵심 구조

- `conveyor/control`, `aircon/control` 구독
- 제어 메시지 수신 후 내부 상태 갱신
- 고정 tick 주기로 온도와 진동 계산
- `conveyor/status`, `temp/sensor`, `vib/sensor` 발행

## 구현 포인트

- 제어 메시지 수신부와 환경 계산부를 분리
- tick는 내부 상태를 읽고 계산만 수행
- 실패 해석과 셧다운 판단은 엣지 서버에서 담당

## 시나리오 관점

- 정상 시나리오: 냉각 제어 메시지가 전송되고 냉각 효과가 반영
- 냉각 실패 시나리오: 시뮬레이터로 제어 메시지가 전송되지 않아 냉각 효과가 반영되지 않음

## 원문 문서

- [설비환경시뮬레이터 아키텍처 원문](https://github.com/zenit9hub/withus-aiot-digital-twin-ops/blob/main/%EB%A9%80%ED%8B%B0%EC%97%90%EC%9D%B4%EC%A0%84%ED%8A%B8%20AI%20%EA%B8%B0%EB%B0%98%20IoT%20%EB%94%94%EC%A7%80%ED%84%B8%ED%8A%B8%EC%9C%88%20%EC%84%A4%EB%B9%84%20%EC%9A%B4%EC%98%81%EC%A7%80%EC%9B%90%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EA%B0%9C%EB%B0%9C/10_%EC%84%A4%EB%B9%84%ED%99%98%EA%B2%BD%EC%8B%9C%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98_%EC%84%A4%EB%B9%84%ED%99%98%EA%B2%BD%EC%8B%9C%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0.md)
