# 미션 5. News Viewer

## 데모

![데모](https://media.giphy.com/media/XrB3HeRTQpEqiziEMq/giphy-downsized-large.gif)

<br>

## 요구 사항

### 1. 2개의 컴포넌트로 News Viewer를 구성한다.

<br>

- ### ✅ 1.1 2개의 컴포넌트로 구현 `Nav`, `Viewer`
  - `Nav`, `NewsList` 컴포넌트로 구현했습니다.

```js
// App.js
function App() {
this.$element = $('#root');

const nav = new Nav({
  $target: this.$element,
  categories: Object.keys(CATEGORY_ID),
  handleClick: event => this.handleCategoryClick(event),
});

const newsList = new NewsList({
  $target: this.$element,
});
//...
```

<br>
<br>

### 2. News API를 사용해 뉴스를 취득한다.

<br>

- ### ✅ 2.1 Nav 컴포넌트가 카테고리를 선택하면 NewsList 컴포넌트는 News API를 통해 뉴스를 취득해 렌더링한다.
  - `axios`로 데이터를 요청하는 유틸함수를 만들었습니다.
  - `category`, `page`, `pageSize`를 동적으로 할당해 api를 요청했습니다.
- ### ✅ 2.2 뉴스는 한번에 5개씩 취득한다.
  - 한번에 취득하는 개수를 상수로 저장해 사용했습니다.

```js
// utils.js
//...
const fetchDataUseAxios = async URL => {
  try {
    const { data } = await axios.get(`${URL}`);
    return data;
  } catch (error) {
    console.log(`axios get 요청 에러: ${error}`);
  }
};
//...
```

```js
// App.js
function App() {
  //...
  const INITIAL_PAGE = 1;
  const INITIAL_PAGE_SIZE = 5;
  const API_KEY = '57424bdb3427490cb6113bd70aae68cb';
  //...
  this.getNewsData = async ({ category, page }) => {
    const url =
      'https://newsapi.org/v2/top-headlines?country=kr' +
      `${category === CATEGORY_ID.ALL ? '' : '&category=' + category}` +
      `&page=${page}` +
      `&pageSize=${INITIAL_PAGE_SIZE}` +
      `&apiKey=${API_KEY}`;

    return await fetchDataUseAxios(url);
  };
  //...
}
```

<br>
<br>

### 3. 무한 스크롤(Infinite Scroll)을 사용해 페이지네이션 기능을 구현한다.

- ### ✅ 3.1 사용자가 뉴스의 마지막까지 스크롤하면 다음 뉴스를 취득해 기존 뉴스 뒤에 추가한다.
  - 스크롤 옵저버 요소가 완전히 뷰포트안에 들어왔을 때 다음 뉴스를 취득하게 조건을 작성했습니다.
  - 어떤 뉴스를 취득할지(`this.state.currentPage`)를 변경해 변경된 상태의 뉴스를 요청해 취득하도록 작성했습니다.(`Proxy 옵저버 패턴`)
  -
- ### ✅ 3.2 무한 스크롤(Infinite Scroll)은 IntersectionObserver API를 사용해 구현한다.

```js
// App.js
//...
this.scrollerObserver = new IntersectionObserver(
  ([entryTarget]) => {
    if (
      entryTarget.intersectionRatio > 0 &&
      entryTarget.isIntersecting === true
    ) {
      this.state.currentPage += 1;
    }
  },
  { threshold: 1, root: null }
);
//...
```

<br>
<br>

### 4. 전역 상태 관리

- ### ✅ 4.1 카테고리는 전역 상태로 관리한다. 전역 상태란 모든 컴포넌트가 접근 가능한 상태를 말한다. 전역 상태가 변경되면 전역 상태에 의존하는 컴포넌트의 렌더링에 영향을 준다.
- ### ✅ 4.2 Nav 컴포넌트가 카테고리를 변경되면 NewsList 컴포넌트는 새롭게 뉴스를 취득해 리렌더링한다. 즉, 카테고리 전역 상태가 변경되면 NewsList 컴포넌트가 리렌더링되어야 한다. 이러한 전역 상태 관리 기능을 Proxy와 옵저버 패턴을 통해 구현한다. 전역 상태가 변경되면 변경을 감지해 전역 상태를 subscribe하고 있는 컴포넌트를 자동 리렌더링한다.

```js
// App.js

this.state = new Proxy( // 프록시로 전역 상태 저장
  {
    currentCategory: INITIAL_CATEGORY_ID, // 현재 렌더링되어있는 카테고리
    currentPage: INITIAL_PAGE, // 현재까지 렌더링된 뉴스목록 페이지
  },
  {
    set: async (target, prop, value) => {
      switch (prop) {
        // 1. 카테고리 상태의 변경을 감지!
        case 'currentCategory': {
          this.scrollerObserver.unobserve(newsList.$scrollObserver);

          nav.updateCategoriesStyle(value);

          // 변경된 상태를 이용해 뉴스 콘텐츠를 요청하고 렌더링
          const { articles } = await this.getNewsData({
            category: value,
            page: this.state.currentPage,
          });

          newsList.render({
            newsListData: articles,
            option: NEWSLIST_RENDER_OPTION.REPLACE,
          });

          this.scrollerObserver.observe(newsList.$scrollObserver);
          break;
        }

        // 1. 어디까지 렌더링할 페이지 수의 변경을 감지!
        case 'currentPage': {
          // 변경된 상태를 이용해 뉴스 콘텐츠를 요청하고 렌더링
          const { articles } = await this.getNewsData({
            category: this.state.currentCategory,
            page: value,
          });

          if (articles.length <= 0) {
            // 더이상 받아올 뉴스가 없으면 동작 멈추고 스크롤옵저버요소 숨기기
            this.scrollerObserver.unobserve(newsList.$scrollObserver);
            newsList.hideScrollObserver();
            return;
          }

          newsList.render({
            newsListData: articles,
            option: NEWSLIST_RENDER_OPTION.ADD,
          });

          break;
        }
      }

      return Reflect.set(target, prop, value);
    },
  }
);
```
