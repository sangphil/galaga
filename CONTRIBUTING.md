# 개발 / 배포 워크플로우

이 저장소는 **PR 기반 배포**를 사용합니다. `main` 브랜치에는 직접 푸시할 수 없고,
PR을 승인·머지하면 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.

```
작업 브랜치 생성 → 커밋/푸시 → PR 생성 → 리뷰·승인 → main에 머지 → Actions가 Pages 배포
```

## 단계별

### 1. 작업 브랜치 만들기

```bash
cd /Users/sangphil/work/202606/Galaga
git switch -c feature/내-변경       # 예: feature/boss-health-bar
```

### 2. 코드 수정 후 커밋·푸시

```bash
git add .
git commit -m "Add boss health bar"
git push -u origin feature/내-변경
```

### 3. PR 생성

```bash
gh pr create --fill                  # 제목/본문 자동 채움
# 또는 제목 직접 지정
gh pr create --title "Add boss health bar" --body "보스에 체력 바 추가"
```

### 4. 리뷰 · 승인 · 머지

```bash
gh pr view --web                     # 브라우저에서 변경 내용 확인
gh pr merge --squash --delete-branch # 검토 후 머지 (작업 브랜치 자동 삭제)
```

> 머지되는 순간 `Deploy to GitHub Pages` 워크플로우가 실행되어
> 약 1~2분 뒤 https://sangphil.github.io/galaga/galaga.html 에 반영됩니다.

### 5. main 최신화

```bash
git switch main
git pull
```

## 배포 상태 확인

```bash
gh run list --workflow "Deploy to GitHub Pages"   # 실행 목록
gh run watch                                       # 진행 중인 실행 실시간 보기
```
