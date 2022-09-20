import { Nav, NewsList } from './components/index.js';
import { $, fetchDataUseAxios } from './utils.js';

const CATEGORY_ID = {
  ALL: 'all',
  BUSINESS: 'business',
  ENTERTAINMENT: 'entertainment',
  HEALTH: 'health',
  SCIENCE: 'science',
  SPORTS: 'sports',
  TECHNOLOGY: 'technology',
};
const INITIAL_CATEGORY_ID = CATEGORY_ID.ALL;
const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 5;
const API_KEY = '57424bdb3427490cb6113bd70aae68cb';
const NEWSLIST_RENDER_OPTION = {
  REPLACE: 'replace',
  ADD: 'add',
};

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

  this.state = new Proxy(
    {
      currentCategory: INITIAL_CATEGORY_ID,
      currentPage: INITIAL_PAGE,
    },
    {
      set: async (target, prop, value) => {
        switch (prop) {
          case 'currentCategory': {
            this.scrollerObserver.unobserve(newsList.$scrollObserver);

            nav.updateCategoriesStyle(value);

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

          case 'currentPage': {
            const { articles } = await this.getNewsData({
              category: this.state.currentCategory,
              page: value,
            });

            if (articles.length <= 0) {
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

  this.handleCategoryClick = ({ target }) => {
    if (target.className !== 'category-item') return;

    const newCategory = Object.keys(CATEGORY_ID).find(
      key => CATEGORY_ID[key] === target.id
    );
    this.state.currentCategory = CATEGORY_ID[newCategory];
  };

  this.getNewsData = async ({ category, page }) => {
    const url =
      'https://newsapi.org/v2/top-headlines?country=kr' +
      `${category === CATEGORY_ID.ALL ? '' : '&category=' + category}` +
      `&page=${page}` +
      `&pageSize=${INITIAL_PAGE_SIZE}` +
      `&apiKey=${API_KEY}`;

    return await fetchDataUseAxios(url);
  };

  this.init = async () => {
    nav.render(); // 카테고리 렌더링
    this.state.currentCategory = INITIAL_CATEGORY_ID;
    // 현재 카테고리를 변경시켜 옵저버패턴에 의해 뉴스리스트가 렌더링되고 무한 스크롤을 작동시킨다.
  };
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
