import { $, $All } from '../utils.js';

const CATEGORY_STATE = {
  ACTIVE: 'active',
  OFF: '',
};

const CATEGORY_ID = {
  ALL: 'all',
  BUSINESS: 'business',
  ENTERTAINMENT: 'entertainment',
  HEALTH: 'health',
  SCIENCE: 'science',
  SPORTS: 'sports',
  TECHNOLOGY: 'technology',
};

const CATEGORY_NAME = {
  ALL: '전체보기',
  BUSINESS: '비즈니스',
  ENTERTAINMENT: '엔터테인먼트',
  HEALTH: '건강',
  SCIENCE: '과학',
  SPORTS: '스포츠',
  TECHNOLOGY: '기술',
};

export default function Nav({ $target, categories, handleClick }) {
  if (!new.target) throw new Error('Nav가 new로 호출되지 않음');
  if (!Array.isArray(categories))
    throw new Error('category데이터가 Array가 아님');

  const navHtml = `<nav class="category-list"></nav>`;
  $target.insertAdjacentHTML('beforeend', navHtml);

  this.$element = $('.category-list');
  this.$element.addEventListener('click', handleClick);

  this.template = () => {
    const categoryItems = categories
      .map(
        category =>
          `<li id="${CATEGORY_ID[category]}" class="category-item">${CATEGORY_NAME[category]}</li>`
      )
      .join('');

    return `<ul>${categoryItems}</ul>`;
  };

  this.updateCategoriesStyle = activeCategory => {
    $All('.category-item', this.$element).forEach($category => {
      $category.id === activeCategory
        ? $category.classList.add(CATEGORY_STATE.ACTIVE)
        : $category.classList.remove(CATEGORY_STATE.ACTIVE);
    });
  };

  this.render = () => {
    this.$element.replaceChildren();
    this.$element.insertAdjacentHTML('beforeend', this.template());
  };
}
