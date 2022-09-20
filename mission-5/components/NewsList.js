import { $ } from '../utils.js';

const NEWSLIST_RENDER_OPTION = {
  REPLACE: 'replace',
  ADD: 'add',
};

export default function NewsList({ $target }) {
  if (!new.target) throw new Error('NewsList가 new로 호출되지 않음');

  const newsListHtml = `
    <div class="news-list-container">
      <article class="news-list"></article>
      <div class="scroll-observer">
        <img src="img/ball-triangle.svg" alt="Loading..." />
      </div>
    </div>
  `;

  $target.insertAdjacentHTML('beforeend', newsListHtml);

  this.$element = $('.news-list-container');
  this.$newsList = $('.news-list');
  this.$scrollObserver = $('.scroll-observer');

  this.showScrollObserver = () =>
    (this.$scrollObserver.style.display = 'block');

  this.hideScrollObserver = () => (this.$scrollObserver.style.display = 'none');

  this.templateNewsItem = ({ url, urlToImage, title, description }) => {
    const itemInnerHtml = `
      <div class="thumbnail">
        <a href="${url}" target="_blank" rel="noopener noreferrer">
          <img src="${urlToImage}" alt="thumbnail" />
        </a>
      </div>
      <div class="contents">
        <h2><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></h2>
        <p>${description}</p>
      </div>
    `;
    return `<section class="news-item">${itemInnerHtml.trim()}</section>`;
  };

  this.templateNewsList = newsListData => {
    const listInnerHtml = newsListData
      .map(item => this.templateNewsItem(item))
      .join('');

    return `<article class="news-list">${listInnerHtml}</article>`;
  };

  this.render = ({ newsListData, option }) => {
    option === NEWSLIST_RENDER_OPTION.REPLACE &&
      this.$newsList.replaceChildren();

    this.$newsList.insertAdjacentHTML(
      'beforeend',
      this.templateNewsList(newsListData)
    );
  };
}
