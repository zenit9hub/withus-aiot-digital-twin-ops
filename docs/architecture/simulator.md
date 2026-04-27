# 설비환경시뮬레이터

## 역할

설비환경시뮬레이터는 실제 공장 환경을 대신하는 Node.js 기반 샘플 서버입니다. 온도, 진동, 컨베이어벨트, 에어컨 상태를 계산하고 MQTT 기반 raw 센서/status 메시지로 발행합니다.

## 핵심 구조

- MQTT 브로커 기본값: `mqtt://broker.emqx.io:1883`
- 사용자 토픽 prefix: `kiot/{uniq-user-id}`
- 센서/status 정기 발행 기본 주기: 10초
- actuator control 수신 시 status 즉시 추가 발행
- 로컬 제어 패널은 MVP 기준 `http://localhost:3000` 사용 가능

## 발행 토픽

- `kiot/{uniq-user-id}/factory/room-01/sensor/temperature`
- `kiot/{uniq-user-id}/factory/room-01/sensor/vibration`
- `kiot/{uniq-user-id}/factory/room-01/actuator/conveyor-belt/status`
- `kiot/{uniq-user-id}/factory/room-01/actuator/aircon/status`

## 구독 토픽

- `kiot/{uniq-user-id}/factory/room-01/actuator/conveyor-belt/control`
- `kiot/{uniq-user-id}/factory/room-01/actuator/aircon/control`

## 설계 원칙

- 시뮬레이터는 센서 발행자이자 actuator 상태 보유자입니다.
- 위험 판정, 셧다운 판단, 운영 권고 해석은 Node-RED 쪽에서 수행합니다.
- `overheatMode`는 컨베이어벨트 control payload 안에서 함께 제어합니다.
- 컨베이어벨트가 꺼져 있으면 과열 모드는 온도 상승에 관여하지 않습니다.

## 온도 모델 요약

- 평상 온도: 25도
- 에어컨 최저 온도: 22도
- 컨베이어벨트 최대 가열 온도: 50도
- 컨베이어벨트 가동: +0.2도
- 에어컨 가동: -0.3도
- 둘 다 가동: 에어컨 우세로 -0.1도
- 과열 모드: 컨베이어벨트 가동 중 추가 +1.0도

## 더 자세히 보기

- [디지털 트윈 팩토리 실습 핸드북](/handbook/digital-twin-factory-handbook)
