# Node-RED플로우

## 1. 문서 목적
본 문서는 핵심본체 샘플 프로젝트에서 `엣지제어운영서버`를 Node-RED/FlowFuse로 구현할 때의 플로우 구성을 정의한다.  
목적은 플로우를 `수집`, `조합`, `판정`, `제어`, `AI`, `운영 대시보드` 단위로 나누어 구현과 설명을 쉽게 만드는 데 있다.

## 2. 플로우 설계 원칙
- 하나의 거대한 플로우보다 역할별 블록으로 분리한다.
- `규칙 기반 제어`와 `AI 기반 운영지원`은 서로 다른 플로우로 나눈다.
- 센서 수집 플로우와 운영 대시보드 표시 플로우를 분리한다.
- 제어 명령 발행은 상태 판정 이후에만 수행한다.
- 외부 API(Application Programming Interface) 실패가 발생해도 규칙 기반 제어는 계속 동작해야 한다.

## 3. 권장 플로우 구성
### 3.1 입력 플로우
역할:
- MQTT(Message Queuing Telemetry Transport) 메시지 수신
- 토픽별 기본 검증
- 내부 공통 형식으로 정규화

권장 입력 노드:
- `mqtt in`: `conveyor/status`
- `mqtt in`: `temp/sensor`
- `mqtt in`: `vib/sensor`

권장 처리 노드:
- `json`
- `switch`
- `change` 또는 `function`

### 3.2 스냅샷 조합 플로우
역할:
- 같은 `sampleId`를 가진 메시지를 하나의 스냅샷으로 묶음
- 불완전 스냅샷 처리

권장 초기 정책:
- 조합 대기 시간은 `1 tick` 또는 `약 2초` 이내로 시작한다.
- 온도, 진동, 설비 상태가 모두 모인 경우에만 제어 플로우로 전달한다.
- 일부만 모인 스냅샷은 운영 대시보드 표시용으로만 전달한다.

권장 처리 노드:
- `join` 또는 `function`
- `switch`

출력 객체 예시:
- `temperature`
- `vibration`
- `conveyorState`
- `sampleId`

## 4. 상태 판정 플로우
### 4.1 온도 판정
- `temperature < 45`: `NORMAL`
- `45 <= temperature < 50`: `WARNING`
- `temperature >= 50`: `CRITICAL`
- `CRITICAL`이 일정 시간 지속되면 `SHUTDOWN`

### 4.2 진동 판정
- `vibration < 0.70`: `NORMAL`
- `0.70 <= vibration < 0.85`: `VIBRATION_WARNING`
- `vibration >= 0.85`: `VIBRATION_CRITICAL`

### 4.3 종합 상태 판정
- 온도와 진동 판정 결과를 합쳐 `healthState`를 결정한다.
- `runtimeState`와 `healthState`는 별도로 유지한다.
- 셧다운 여부는 종합 상태와 지속 시간 조건을 바탕으로 결정한다.

권장 처리 노드:
- `switch`
- `function`
- `trigger` 또는 `delay`

## 5. 제어 플로우
### 5.1 냉각 제어
- 온도 WARNING 진입 시 냉각 제어를 수행한다.
- 정상 시나리오에서는 `aircon/control`로 `ON` 메시지를 발행한다.
- 냉각 실패 시나리오에서는 `aircon/control` 메시지를 시뮬레이터로 전달하지 않는다.
- 온도 회복 시 `aircon/control`로 `OFF` 메시지를 발행할 수 있다.

구현 메모:
- 시나리오 분기 블록은 `mqtt out` 직전에 두는 것이 가장 단순하다.
- 이 블록에서 `COOLING_COMMAND_SENT`와 `COOLING_COMMAND_SKIPPED` 이벤트를 함께 생성할 수 있다.

### 5.2 셧다운 제어
- 진동이 임계치 초과면 즉시 `conveyor/control`로 `SHUTDOWN` 발행
- 온도 CRITICAL 지속 시 `conveyor/control`로 `SHUTDOWN` 발행

권장 처리 노드:
- `switch`
- `function`
- `mqtt out`

## 6. 이벤트 생성 플로우
이벤트는 센서 입력 자체가 아니라 상태 판정 결과를 기준으로 만든다.

권장 이벤트:
- `WARNING`
- `SHUTDOWN`
- `RECOVERY`
- `COOLING_COMMAND_SENT`
- `COOLING_COMMAND_SKIPPED`
- `VIBRATION_WARNING`
- `VIBRATION_CRITICAL`

권장 처리 노드:
- `change`
- `function`
- `link out`

## 7. AI 연계 플로우
### 7.1 AI 입력 생성
- 최근 스냅샷
- 최근 이벤트
- 현재 `runtimeState`
- 현재 `healthState`
- 최근 냉각 제어 이력
- 셧다운 여부

위 정보를 바탕으로 AI 입력 요약 객체를 만든다.

### 7.2 로컬 AI 호출
- 로컬 HTTP(Hypertext Transfer Protocol) API 호출
- 상태 요약, 원인 후보, 점검 가이드 수신

### 7.3 외부 멀티에이전트 호출
- WARNING 이상 상태 또는 주요 이벤트 발생 시 호출
- 이상진단, 운영지원, 종합판단 역할로 분리 호출 가능

권장 처리 노드:
- `function`
- `http request`
- `switch`

## 8. 운영 대시보드 플로우
운영 대시보드는 원시 데이터보다 현재 상태를 빠르게 읽을 수 있어야 한다.

표시 항목:
- 현재 온도
- 현재 진동
- 설비 상태
- 최근 냉각 제어 명령 상태
- 최근 이벤트 로그
- 규칙 기반 제어 결과
- 로컬 AI 결과
- 외부 멀티에이전트 결과
- 판단 출처

상세 화면 구성 기준은 `Dashboard.md`에서 다룬다.

권장 처리 노드:
- `change`
- `function`
- Dashboard 위젯 노드

## 9. 권장 플로우 분리 구조
Node-RED 탭 또는 서브플로우를 아래처럼 나누는 것을 권장한다.

1. `01_Input`
2. `02_Snapshot`
3. `03_Rules`
4. `04_Control`
5. `05_Events`
6. `06_AI`
7. `07_Dashboard`

## 10. 예시 처리 순서
1. MQTT 입력 수신
2. JSON 파싱 및 기본 검증
3. `sampleId` 기준 스냅샷 조합
4. 온도 및 진동 상태 판정
5. 냉각 제어 메시지 전달 또는 미전달 처리
6. 셧다운 제어 발행
7. 이벤트 생성
8. AI 입력 요약 객체 생성
9. 로컬 AI 및 외부 멀티에이전트 호출
10. 운영 대시보드 통합 상태 객체 갱신

## 11. 장애 및 예외 처리
- `sampleId` 조합 실패 시 제어 판단을 보류하고 표시만 수행
- 외부 API 실패 시 로컬 AI 또는 규칙 기반 제어만 유지
- 로컬 AI 실패 시에도 운영 대시보드와 제어는 유지
- 동일 이벤트의 중복 발생은 debounce 또는 최근 이벤트 캐시로 완화

권장 초기 정책:
- `WARNING`, `RECOVERY`, `SHUTDOWN`은 상태 전이 시점에만 1회 발행한다.
- `SHUTDOWN`은 `RESET` 전까지 중복 발행하지 않는다.

## 12. 고도화 항목
아래 항목은 초기 MVP 이후 확장 대상으로 본다.

- 에어컨 `status` 기반 응답 확인
- 응답 timeout 기반 냉각 실패 판단
- 냉각 시스템 가동 중 온도 비회복 경고
- 제어 실패 상세 메시지 자동 생성

## 13. 구현 권장사항
- 상태 판정 로직은 `function` 노드 한 곳에 몰지 말고 온도, 진동, 종합 판정으로 분리한다.
- AI 호출은 주기 호출보다 상태 변화 기반 호출이 적절하다.
- 제어 메시지 발행 전 마지막 상태를 한 번 더 확인하는 보호 로직이 있으면 좋다.
- 디버깅을 위해 `sampleId`, `healthState`, `controlAction`을 로그에 남긴다.

## 14. 연결 문서
- `아키텍처_엣지제어운영서버.md`
- `../10_설비환경시뮬레이터/아키텍처_설비환경시뮬레이터.md`
- `../00_공통설계/03_데모시나리오.md`
- `../00_공통설계/04_메시지스키마.md`
- `../00_공통설계/05_에이전트설계.md`
