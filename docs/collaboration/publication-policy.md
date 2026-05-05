# 공개 운영 원칙

## 기본 원칙

이 저장소는 공개 협업용 레퍼런스 레포입니다.

- 공개 가능한 구조, 설계, 코드만 포함합니다.
- 학생 식별 정보와 운영 자료는 포함하지 않습니다.
- 새 문서는 비공개 운영 공간에서 먼저 작성한 뒤 공개 가능 여부를 검토해 반영합니다.

## 공개 제외 항목

- 학생 실명, 학번, 이메일, 전화번호
- 문의 메일 원문
- 학교 포털 화면과 제출 흔적
- 내부 운영 메모

## 협업 원칙

- 공개 가능한 설계 개선과 샘플 구현은 Pull Request로 협업
- 개인정보가 섞인 변경은 이 레포에서 다루지 않음
- 사이트 문서와 공개 원천 문서의 용어는 최대한 일관되게 유지

## 배포 원칙

- GitHub Pages는 repository 하위 경로인 `/withus-aiot-digital-twin-ops/`를 사용합니다.
- Cloudflare Workers/Pages와 커스텀 도메인은 루트 경로인 `/`를 사용합니다.
- VitePress `base`는 `VITEPRESS_BASE` 환경변수를 우선 사용하고, GitHub Actions 환경에서는 repository명을 기준으로 자동 결정합니다.
- Cloudflare 배포는 기본 빌드 명령 `npm run docs:build`와 출력 폴더 `docs/.vitepress/dist`를 사용합니다.

## 원문 정책 문서

- [00_공개 운영 원칙.md](https://github.com/zenit9hub/withus-aiot-digital-twin-ops/blob/main/00_%EA%B3%B5%EA%B0%9C%20%EC%9A%B4%EC%98%81%20%EC%9B%90%EC%B9%99.md)
