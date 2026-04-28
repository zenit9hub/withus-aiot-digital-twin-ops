# 엣지제어운영서버

## 역할

엣지제어운영서버는 Node-RED 기반 디지털 트윈 서버입니다. 공장 시뮬레이터의 raw 메시지를 수집하고, 디지털 트윈 상태로 인리치먼트한 뒤 룰엔진, AI 에이전트, 대시보드로 연결합니다.

## 핵심 기능

- 시트 1: 센서/status 수집과 `state/current` 스냅샷 생성
- 시트 2: 룰엔진 기반 상태 판정과 최종 제어
- 시트 3: 현장 분석가 AI 에이전트
- 시트 4: 관리자 AI 에이전트와 운영 권고
- 시트 5: 2D Dashboard

## 핵심 토픽

| 구분 | 토픽 |
| --- | --- |
| 통합 상태 스냅샷 | `kiot/{uniq-user-id}/dt/factory/room-01/state/current` |
| 룰엔진 결과 | `kiot/{uniq-user-id}/dt/factory/room-01/rule/result` |
| 현장 분석가 | `kiot/{uniq-user-id}/dt/factory/room-01/analysis/field-analyst` |
| 관리자 분석 | `kiot/{uniq-user-id}/dt/factory/room-01/analysis/manager` |
| 운영 권고 | `kiot/{uniq-user-id}/dt/factory/room-01/ops/recommendation` |
| 에어컨 제어 | `kiot/{uniq-user-id}/factory/room-01/actuator/aircon/control` |
| 컨베이어벨트 제어 | `kiot/{uniq-user-id}/factory/room-01/actuator/conveyor-belt/control` |

## 제어 원칙

- 룰엔진이 최종 제어권을 갖습니다.
- AI 에이전트는 운영 권고를 발행할 수 있지만 직접 actuator control을 발행하지 않습니다.
- 데이터가 오래되었거나 불완전하면 제어를 보류합니다.
- 제어 토픽은 디지털 트윈 영역이 아니라 실제 팩토리 영역인 `factory/.../control`로 발행합니다.

## 기본 룰 기준

- 35도 이상: warning, 에어컨 on
- 45도 이상: critical, 조건 지속 시 컨베이어벨트 off
- stale 상태: 제어 보류
- 관리자 권고 수신: 룰엔진이 최종 안전 기준에 맞는 경우에만 반영

## 더 자세히 보기

- [디지털 트윈 팩토리 실습 핸드북](/handbook/)
