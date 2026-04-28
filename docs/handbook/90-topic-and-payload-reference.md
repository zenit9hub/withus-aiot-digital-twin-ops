# 90. 토픽과 Payload 레퍼런스

## 네임스페이스

| 구분 | 패턴 | 설명 |
| --- | --- | --- |
| 전체 prefix | `kiot/{uniq-user-id}` | 학생별 메시지 분리 |
| 실세계 팩토리 | `kiot/{uniq-user-id}/factory/...` | 시뮬레이터 raw 데이터와 실제 제어 |
| 디지털 트윈 | `kiot/{uniq-user-id}/dt/factory/...` | Node-RED 해석, 집계, 판단 결과 |

## 시뮬레이터 발행 토픽

| 토픽 | payload |
| --- | --- |
| `kiot/{uniq-user-id}/factory/room-01/sensor/temperature` | `{ "value": 25 }` |
| `kiot/{uniq-user-id}/factory/room-01/sensor/vibration` | `{ "value": 0 }` |
| `kiot/{uniq-user-id}/factory/room-01/actuator/conveyor-belt/status` | `{ "power": "on", "overheatMode": "off" }` |
| `kiot/{uniq-user-id}/factory/room-01/actuator/aircon/status` | `{ "power": "off" }` |

## 시뮬레이터 제어 토픽

컨베이어벨트:

```text
kiot/{uniq-user-id}/factory/room-01/actuator/conveyor-belt/control
```

```json
{
  "power": "on",
  "overheatMode": "on",
  "reason": "manual-test"
}
```

에어컨:

```text
kiot/{uniq-user-id}/factory/room-01/actuator/aircon/control
```

```json
{
  "power": "on",
  "reason": "rule-warning"
}
```

## 시트1 출력 토픽

```text
kiot/{uniq-user-id}/dt/factory/room-01/sensor/temperature
kiot/{uniq-user-id}/dt/factory/room-01/sensor/vibration
kiot/{uniq-user-id}/dt/factory/room-01/actuator/conveyor-belt/status
kiot/{uniq-user-id}/dt/factory/room-01/actuator/aircon/status
kiot/{uniq-user-id}/dt/factory/room-01/state/current
```

## 시트2 룰엔진 토픽

입력:

```text
kiot/{uniq-user-id}/dt/factory/room-01/state/current
kiot/{uniq-user-id}/dt/factory/room-01/ops/recommendation
```

출력:

```text
kiot/{uniq-user-id}/dt/factory/room-01/rule/result
kiot/{uniq-user-id}/factory/room-01/actuator/aircon/control
kiot/{uniq-user-id}/factory/room-01/actuator/conveyor-belt/control
```

## 시트3 현장 분석가 토픽

입력:

```text
kiot/{uniq-user-id}/dt/factory/room-01/state/current
kiot/{uniq-user-id}/dt/factory/room-01/rule/result
```

출력:

```text
kiot/{uniq-user-id}/dt/factory/room-01/analysis/field-analyst
```

## 시트4 관리자 AI 토픽

입력:

```text
kiot/{uniq-user-id}/dt/factory/room-01/analysis/field-analyst
```

출력:

```text
kiot/{uniq-user-id}/dt/factory/room-01/analysis/manager
kiot/{uniq-user-id}/dt/factory/room-01/ops/recommendation
```

## MQTTX 구독 패턴

| 목적 | 구독 토픽 |
| --- | --- |
| 내 전체 흐름 | `kiot/{uniq-user-id}/#` |
| 내 raw 팩토리 흐름 | `kiot/{uniq-user-id}/factory/#` |
| 내 디지털 트윈 흐름 | `kiot/{uniq-user-id}/dt/factory/#` |
| 강사 전체 관제 | `kiot/#` |

## Payload 설계 원칙

- 센서 payload는 최소한 `{ "value": number }`를 포함합니다.
- 상태 payload는 `{ "power": "on" | "off" }`를 기본으로 합니다.
- 컨베이어벨트 status/control에는 `overheatMode`를 포함할 수 있습니다.
- control payload의 `reason`은 추적을 위한 권장 필드입니다.
- 공개 문서와 JSON에는 API Key를 포함하지 않습니다.
