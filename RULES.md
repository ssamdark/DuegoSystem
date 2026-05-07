# DUEGO SYSTEM — 안티그라비티 작업 규칙 v1.0

> 이 문서는 모든 코딩 작업의 최우선 기준입니다.
> 새 페이지/컴포넌트 작업 전 반드시 읽고 시작할 것.
> 모든 대화는 한글로 할 것.
> 되고시스템 : https://www.duegosystem.com/ (현재 사용중인 회사 홈페이지 - 컨텐츠 구성은 현 홈페이지 참조하여 재구성)

---

## 1. 파일 & 폴더 규칙

- **파일명/폴더명 무조건 소문자** → `about/` (O) / `ABOUT/` (X)
- **새 페이지는 반드시 `_template.html` 복사해서 시작**
- 기존 페이지 복사 금지 → 반드시 템플릿 사용
- HTML/CSS/JS 파일 절대 임의로 새로 만들지 말 것

---

## 2. CSS 규칙

### 2-1. 반드시 지켜야 할 것
- **하드코딩 hex 색상 금지** → 반드시 변수 사용
- **`!important` 사용 금지** → 구조로 해결할 것
- **`body` 클래스 셀렉터 금지** → `.vision-page`, `.business-page` 등 사용 금지
- **font-weight 800 사용 금지** → 최대 700

### 2-2. CSS 파일 구조
```
variables.css  ← 변수 전용 (수정 금지)
style.css      ← 공통 + 메인 스타일
sub.css        ← 서브 페이지 공통 스타일
```
- 새 스타일은 반드시 `sub.css` 하단에 추가
- `style.css` 임의 수정 금지

### 2-3. CSS link 순서 (반드시 이 순서)
```html
<link rel="stylesheet" href="/css/variables.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/sub.css">
```

---

## 3. 컬러 규칙

### 3-1. 시맨틱 변수만 사용할 것
| 용도 | 변수명 |
|------|--------|
| 기본 텍스트 | `var(--text-primary)` |
| 보조 텍스트 | `var(--text-secondary)` |
| 비활성 텍스트 | `var(--text-disabled)` |
| 흰색 텍스트 | `var(--text-inverse)` |
| 블루 강조 텍스트 | `var(--text-accent)` |
| 기본 배경 | `var(--bg-primary)` |
| 섹션/카드 배경 | `var(--bg-secondary)` |
| 다크 배경 | `var(--bg-dark)` |
| 기본 보더 | `var(--border-color)` |
| 강조 보더 | `var(--border-strong)` |
| 메인 블루 | `var(--primary)` |
| 호버 블루 | `var(--primary-hover)` |

### 3-2. 절대 사용 금지 하드코딩 값
```
#4e6eff  →  var(--primary)
#2D65F3  →  var(--primary)
#001cff  →  var(--primary-700)
#2B3A8B  →  var(--primary-dark)
#111111  →  var(--text-primary)
#666666  →  var(--text-secondary)
#E4E4E4  →  var(--border-color)
```

---

## 4. 타이포그래피 규칙

### 4-1. 폰트 사이즈 — 이 변수만 사용
| 변수명 | 크기 | 용도 |
|--------|------|------|
| `--fs-display` | 50px+ | 메인 비주얼 전용 |
| `--fs-h1` | 42px | 서브 섹션 대제목 (국문) ★ |
| `--fs-h1-en` | 44px | 서브 섹션 대제목 (영문/Poppins) ★ |
| `--fs-sub-h1` | 50px | 서브 페이지 H1 |
| `--fs-h2` | 32px | 섹션 소제목 |
| `--fs-h3` | 24px | 카드 타이틀 |
| `--fs-h4` | 20px | 강조 본문 |
| `--fs-body` | 18px | 기본 본문 ★ |
| `--fs-small` | 16px | 보조 텍스트 |
| `--fs-caption` | 14px | 라벨/배지 |

### 4-2. 폰트 굵기
```
700 → display 전용 (비주얼 큰 타이틀)
600 → 제목류 (h1~h4)
400 → 본문
```

### 4-3. 행간 (line-height)
| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--lh-tight` | 1.1 | 대형 비주얼, hero 숫자 |
| `--lh-heading` | 1.2 | 1줄 제목 |
| `--lh-title` | 1.4 | 2줄 제목 ★ |
| `--lh-normal` | 1.5 | 일반 텍스트 |
| `--lh-body` | 1.8 | 본문 |

### 4-4. Poppins(영문) 사용 시 필수
```css
font-family: var(--font-point);
letter-spacing: var(--ls-point); /* 0.02em */
```

---

## 5. 레이아웃 규칙

### 5-1. 서브 페이지 상단 여백 기준 (반드시 준수)

모든 서브 페이지 최상단 섹션의 `padding-top`은 **반드시 `var(--sub-header-pt)` (140px)** 사용.
GNB가 fixed이므로 이 값으로 콘텐츠 겹침을 보정한다.

| 페이지 유형 | 적용 대상 | 변수 |
|------------|-----------|------|
| 브레드크럼 있는 페이지 | `.sub-header` | `var(--sub-header-pt)` |
| 히어로형 페이지 (브레드크럼 없음) | 첫 번째 섹션 (`.xxx-hero`) | `var(--sub-header-pt)` |

**브레드크럼 없는 히어로형 페이지 추가 규칙:**
- `.xxx-hero-inner`의 `padding-top`은 반드시 `var(--space-12)` (48px) 추가
- 이유: 브레드크럼 있는 페이지는 `.sub-header-title`(min-height: 200px, 수직 중앙 정렬) 구조 덕분에 첫 콘텐츠 위에 ~48px 내부 여백이 자동으로 생긴다. 히어로형은 이 구조가 없으므로 inner에 동일한 여백을 명시해야 시각적으로 균일해진다.

> ⚠️ 절대 금지
> - 하드코딩 숫자 직접 사용 (`padding-top: 140px`) → 반드시 변수 사용
> - 페이지별로 다른 값 사용 → 전 페이지 동일 변수로 통일
> - 히어로형 inner에 padding-top 생략 금지

**반응형**: `max-width: 1024px` 이하에서 `padding-top: 90px` 일괄 적용
→ `.sub-header`, 모든 `.xxx-hero` 섹션 모두 동일하게 미디어 쿼리에 포함할 것

---

### 5-2. 너비 기준
- **컨텐츠 최대 너비 1440px → `.sub-inner` 클래스로만**
- `.container` 클래스 사용 금지
- `width: 1440px !important` 절대 금지

### 5-3. 서브 페이지 HTML 구조 (반드시 준수)
```html
<header class="sub-header">
    <div class="sub-inner">
        브레드크럼 + H1 + 탭
    </div>
</header>

<main class="sub-content-wrapper">
    <div class="sub-inner">
        컨텐츠
    </div>
</main>
```

### 5-4. 여백 기준 — 반드시 준수 (가장 많이 위반되는 규칙)

```
┌─────────────────────────────────────┐
│  sub-content-wrapper                │
│  padding-top: 100px  ← 컨텐츠 상단  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  섹션 내부 간격              │    │
│  │  section-divider: 80px 상하 │    │
│  │  섹션간 margin: 80px        │    │
│  └─────────────────────────────┘    │
│                                     │
│  padding-bottom: 150px ← 컨텐츠 하단│
└─────────────────────────────────────┘
```

| 항목 | 변수 | 값 |
|------|-----|-----|
| 컨텐츠 상단 | `var(--space-25)` | 100px |
| 섹션 내부 간격 | `var(--space-20)` | 80px |
| 컨텐츠 하단 | `var(--space-37)` | 150px |

> ⚠️ 절대 금지
> - 숫자 직접 사용 (120px, 200px 등) → 반드시 변수 사용
> - 개별 섹션에 임의 padding/margin 추가 금지
> - sub-content-wrapper 의 padding 절대 변경 금지

---

## 6. JS 규칙

- **서브 페이지는 `common.js` 만 로드**
- `main.js` 는 `index.html` 전용
- JS link 순서:
```html
<script src="/js/include.js" defer></script>
<script src="/js/common.js" defer></script>
```

---

## 7. Include 규칙

- **header/footer 는 직접 작성 금지**
- 반드시 include 방식 사용:
```html
<div id="header-wrap"></div>  ← header 자동 로드
<div id="footer-wrap"></div>  ← footer 자동 로드
```
- `components/header.html` / `components/footer.html` 수정 시
  → 전체 페이지 반영되므로 반드시 리더에게 확인 후 수정

---

## 8. Border Radius 규칙

### 8-1. 변수만 사용할 것
| 변수명 | 값 | 용도 |
|--------|-----|------|
| `--radius-none` | 0px | 라운드 없음 |
| `--radius-xs` | 2px | 배지, 태그, 필터버튼 |
| `--radius-sm` | 4px | 이미지, 카드 기본 **★ 주력** |
| `--radius-md` | 8px | 버튼, 인풋, 팝업 |
| `--radius-lg` | 16px | 큰 카드, 모달 |
| `--radius-xl` | 24px | 특수 컴포넌트 |
| `--radius-full` | 50px | 필 버튼, 태그 |
| `--radius-circle` | 50% | 프로필, 로고 원형 |

### 8-2. 기본 원칙
- 사이트 전체 기조는 **샤프(Sharp)** → `--radius-sm(4px)` 위주 사용
- 강조/인터랙티브 요소만 `--radius-md(8px)` 이상 사용
- 특수 컴포넌트(다이어그램 박스 등)는 예외적으로 하드코딩 허용

---

## 10. 버튼 규칙

### 10-1. Variant (종류)
| 클래스 | 스타일 | 용도 |
|--------|--------|------|
| `.btn-primary` | Filled Blue | 핵심 CTA — 페이지당 1개 원칙 |
| `.btn-outline` | Border | 보조 CTA, Primary와 쌍으로 사용 |
| `.btn-ghost` | 텍스트만 | 취소, 뒤로가기 등 낮은 강조 |

### 10-2. Size (반드시 Variant와 조합)
| 클래스 | Padding | Font-size | 용도 |
|--------|---------|-----------|------|
| `.btn-lg` | 14px 36px | `--fs-body (18px)` | 히어로 CTA ★ |
| `.btn-md` | 12px 28px | `--fs-small (16px)` | 섹션 내 기본 버튼 |
| `.btn-sm` | 8px 20px | `--fs-caption (14px)` | 인라인, 테이블 내 |

### 10-3. 사용 예시
```html
<!-- 히어로 CTA 쌍 -->
<a href="..." class="btn btn-primary btn-lg">무료 체험하기</a>
<a href="..." class="btn btn-outline btn-lg">도입 문의하기</a>

<!-- 섹션 CTA 단독 -->
<a href="..." class="btn btn-primary btn-md">자세히 보기</a>
```

### 10-4. 필수 규칙
- **Border Radius 고정: `var(--radius-md)` (8px)** — 버튼은 예외 없음
- **페이지 prefix 금지** → `.safer-btn-*`, `.about-btn-*` 사용 금지 → 반드시 `.btn-*`로 통일
- **CTA는 페이지당 Primary 1개** — Primary 2개 필요 시 하나를 Outline으로 변경
- **히어로 버튼은 반드시 `.btn-lg`** — 임의로 size 축소 금지
- **font-weight: 600 고정** — 버튼 텍스트는 항상 semibold

---

## 9. 작업 완료 후 검증

작업 완료 후 터미널에서 반드시 확인:
```bash
# 하드코딩 hex 잔존 여부
grep -r "#4e6eff\|#2D65F3\|#001cff\|#2B3A8B" css/

# 옛날 gray 변수 잔존 여부
grep -r "var(--gray-[0-9][^0])" css/

# !important 잔존 여부
grep -r "!important" css/
```
결과가 없어야 통과.