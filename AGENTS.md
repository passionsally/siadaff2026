# SIADAFF Windows 작업 환경 규칙

이 저장소를 Windows PC의 Codex에서 작업할 때 다음 규칙을 항상 적용한다.

## Git 실행 경로

- Codex 번들 Git을 사용하지 않는다.
- 번들 Git 경로:
  `C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe`
- 위 번들에는 `git-remote-https.exe`가 없어 GitHub HTTPS 작업이 실패한다.
- 모든 Git 명령은 아래 정상 설치본을 명시적으로 사용한다.
  `C:\Program Files\Git\cmd\git.exe`
- GitHub CLI가 필요할 때는 아래 경로를 명시적으로 사용한다.
  `C:\Program Files\GitHub CLI\gh.exe`

## GitHub 연결

- 원격 저장소는 `https://github.com/passionsally/siadaff2026.git`이다.
- 기본 브랜치는 `main`이다.
- GitHub 계정 `passionsally`의 CLI 인증과 저장소 권한은 정상 확인되었다.
- GitHub 플러그인의 파일 쓰기 API가 `403`을 반환해도 계정 권한 문제로 단정하지 않는다.
- 플러그인 재연결을 반복하지 말고 로컬 파일 수정, 시스템 Git 커밋, 시스템 Git 푸시 흐름을 사용한다.

## 네트워크와 승인

- Codex 기본 격리 환경에서는 GitHub 443 연결이 실패할 수 있다.
- 시스템 Git의 네트워크 명령이 격리 환경에서 실패하면 같은 명령을 사용자 승인 방식으로 다시 실행한다.
- Windows Defender나 Git 설치 손상으로 단정하기 전에 시스템 Git 절대 경로로 먼저 재검사한다.
- 인증 정보, 토큰 또는 비밀키를 출력하거나 파일에 기록하지 않는다.

## 작업 절차

1. 작업 시작 시 현재 폴더가 이 저장소인지 확인한다.
2. `C:\Program Files\Git\cmd\git.exe status --short --branch`로 상태를 확인한다.
3. 기존 사용자 변경을 보존하고 요청된 파일만 수정한다.
4. 로컬 검증을 마친다.
5. 시스템 Git 절대 경로로 커밋한다.
6. 시스템 Git 절대 경로로 푸시하며, 네트워크 제한 시 승인을 요청한다.
7. 배포 후 `https://www.siadaff.com/`의 실제 반영 상태를 확인한다.

