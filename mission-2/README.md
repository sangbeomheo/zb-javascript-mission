# 미션 2. Analog clock

## 요구 사항

### 1. 아날로그 시계의 HTML은 컨테이너만 선언한다. 아날로그 시계의 자식 요소들은 자바스크립트를 사용해 동적으로 생성한다.

- [x] `insertAdjacentHTML`를 사용해서 동적으로 자식 요소를 생성했습니다.

<br>

### 2. style.css를 살펴보면 시침/분침/초침의 각도를 표현하기 위해 CSS 변수(CSS custom property)를 사용하고 있다. 자바스크립트에서 CSS 변수의 값을 변경해 시침/분침/초침의 각도를 변경한다.

- [x] 매 초 마다 `style.setPropery`를 사용해 변수 `--deg`를 변경했습니다.

<br>

### 3. 아날로그 시계는 여러 개의 존재할 수 있다. 즉, 재사용할 수 있다.

- [x] 재사용 가능. 각각 시계 컨테이너마다 독립된 템플릿를 사용했고 시침/분침/초침도 개별적으로 동작하게 구현했습니다. 나중에 시계별로 다른 시간을 설정할 수 있을 수 있다는 것을 전제했습니다.

<br>