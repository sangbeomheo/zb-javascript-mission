# 미션 3. Star Rating

## 요구 사항

### 1. 사용자가 정의한 star-rating 컨테이너 요소의 참조를 StarRating 함수에 전달해 star 요소들로 구성된 star-rating 요소를 동적 생성한다.

- [x] 동적으로 star-rating 요소들을 만들어 화면에 render하는 `renderStars`를 만들어 구현했습니다.

<br>

### 2. star-rating 요소는 재사용 가능해야 한다. 즉, 복수의 star-rating 요소를 사용할 수 있어야 한다.

- [x] `<div class="star-rating" data-max-rating="3" data-score="2"></div>` 형식으로 재사용이 가능합니다.

<br>

### 3. star-rating 요소의 재사용성을 높이기 위해 star-rating 요소 내부의 css는 JavaScript로 자동 추가한다. 사용자는 star-rating 요소의 위치나 크기 등만을 지정한다.

- 요소 내부 css를 사용하지 않고 javascript로 직접 요소에 inline으로 스타일을 지정했습니다.
- boxicons를 사용하기 위해 link를 `index.html` 에 추가했습니다.

```html
<!-- Boxicons JS -->
<link
  href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
  rel="stylesheet"
/>
```

<br>

### 4. star-rating 요소의 data-max-rating 어트리뷰트를 통해 동적으로 생성할 star 요소의 갯수를 지정한다.

- [x] `renderStars`함수에서 data-max-rating 어트리뷰트를 받아서 해당하는 개수만큼 star요소를 생성합니다.

<br>

### 6. star 요소에 마우스가 올라오면 해당 star 요소와 이전 star 요소 모두 color를 변경(#a7a7a7)한다.

- [x] `mouseover`이벤트를 사용해 변경되야 할 star요소들만 선별해서 스타일를 인라인으로 변경했습니다.

<br>

### 7. star-rating 요소에서 마우스가 벗어나면 모든 star 요소의 color를 변경(#dcdcdc)한다.

- [x] `mouseout`이벤트 발생 시 해당하는 star-rating 컨테이너의 모든 star요소의 스타일을 인라인으로 변경했습니다.

<br>

### 8. 특정 star 요소를 클릭하면 해당 star 요소와 이전 star 요소 모두 color를 변경(#db5b33)한다.

- [x] `click`이벤트를 사용해 변경된 별점 점수로 star-rating 컨테이너를 다시 렌더링했습니다.

<br>

### 9. 특정 star 요소를 클릭하면 star 요소의 rating이 결정된다. rating이 결정되면 커스텀 이벤트 'rating-change'를 통해 외부로 방출한다. 이를 캐치해 화면에 표시한다.

- [x] 요소를 클릭할 때 커스텀이벤트를 발생시켜서 구현했습니다.

<br>

### 10. ES Module(또는 Webpack)을 사용해 모듈화한다.

- [x] ES Module 사용

<br>

### 11. star 요소는 [boxicons](https://boxicons.com/)를 사용해 구현한다.

- boxicons를 사용하기 위해 link를 `index.html` 에 추가했습니다.

```html
<!-- Boxicons JS -->
<link
  href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
  rel="stylesheet"
/>
```
