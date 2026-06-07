# Galaga

순수 HTML5 Canvas + JavaScript로 만든 웹 기반 갤러그 게임. 외부 의존성이 없어 `galaga.html` 파일 하나만 브라우저로 열면 바로 플레이됩니다.

## 플레이 방법

`galaga.html`을 더블클릭하거나 브라우저로 엽니다.

### 조작법

| 동작 | 키 |
|------|-----|
| 이동 | `←` `→` 또는 `A` `D` |
| 발사 | `Space` |
| 재시작 | `R` |

## 기능

- 3종 적 유닛(Bee / Butterfly / Boss), 점수 차등
- 대형 비행 + 랜덤 다이브 공격
- 적 탄막, 플레이어 피격 시 무적 시간
- 5웨이브 스테이지, 라이프 3개
- 웨이브가 오를수록 다이브 빈도·돌진/탄 속도·발사 빈도가 점진적으로 상승 (1웨이브는 쉽게 시작)
- 별 배경 스크롤, 폭발 파티클, HUD(점수·웨이브·잔기)

## 플레이 (배포된 URL)

👉 **https://sangphil.github.io/galaga/galaga.html**

## 배포 방식

`main` 브랜치에 PR이 머지되면 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.
`main`에는 직접 푸시할 수 없으며, 모든 변경은 PR을 통해 반영됩니다.
자세한 개발/배포 절차는 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고하세요.
