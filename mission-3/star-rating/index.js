// do something!
const INITIAL_SCORE = 0;

const STAR_TYPE = {
  BASIC: 'basic',
  HOVERED: 'hovered',
  SELECTED: 'selected',
};

const STAR_COLOR = {
  BASIC: '#dcdcdc',
  HOVERED: '#a7a7a7',
  SELECTED: '#db5b33',
};

const STAR_STYLE_COMMON = 'font-size:50px;cursor:pointer;';

const STAR_STYLE = {
  BASIC: STAR_STYLE_COMMON + `color:${STAR_COLOR.BASIC}`,
  HOVERED: STAR_STYLE_COMMON + `color:${STAR_COLOR.HOVERED}`,
  SELECTED: STAR_STYLE_COMMON + `color:${STAR_COLOR.SELECTED}`,
};

const $ = (selector, target = document) => target.querySelector(selector);

const $All = (selector, target = document) =>
  Array.from(target.querySelectorAll(selector));

const createStar = (type, index) => {
  switch (type) {
    case STAR_TYPE.HOVERED:
      return `<i class="bx bxs-star" data-type="${STAR_TYPE.HOVERED}" data-index="${index}" style="${STAR_STYLE.HOVERED}"></i>`;
    case STAR_TYPE.SELECTED:
      return `<i class="bx bxs-star" data-type="${STAR_TYPE.SELECTED}" data-index="${index}" style="${STAR_STYLE.SELECTED}"></i>`;
    case STAR_TYPE.BASIC:
    default:
      return `<i class="bx bxs-star" data-type="${STAR_TYPE.BASIC}" data-index="${index}"  style="${STAR_STYLE.BASIC}"></i>`;
  }
};

const renderStars = (target, score) => {
  const maxRating = target.dataset.maxRating;
  const basicTypeCount = maxRating - score;

  const starTypes = [
    ...Array(score).fill(STAR_TYPE.SELECTED),
    ...Array(basicTypeCount).fill(STAR_TYPE.BASIC),
  ];

  const starsHTML = starTypes.reduce(
    (html, starType, index) => html + createStar(starType, index),
    ''
  );

  target.dataset.score = score;
  target.innerHTML = starsHTML;
};

const addStarMouseoverEvent = target => {
  target.addEventListener('mouseover', ({ target }) => {
    if (target.dataset.type !== STAR_TYPE.BASIC) return;

    const starContainerEl = target.parentElement;
    const currentScore = starContainerEl.dataset.score;

    const [startIndex, endIndex] = [currentScore, +target.dataset.index];

    for (let i = startIndex; i <= endIndex; i++) {
      $(`[data-index='${i}']`, starContainerEl).dataset.type =
        STAR_TYPE.HOVERED;
      $(`[data-index='${i}']`, starContainerEl).style.cssText =
        STAR_STYLE.HOVERED;
    }
  });
};

const addStarMouseoutEvent = target => {
  target.addEventListener('mouseout', ({ target }) => {
    if (target.dataset.type !== STAR_TYPE.HOVERED) return;

    const starContainerEl = target.parentElement;
    $All(`[data-type=${STAR_TYPE.HOVERED}]`, starContainerEl).forEach(
      starEl => {
        starEl.dataset.type = STAR_TYPE.BASIC;
        starEl.style.cssText = STAR_STYLE.BASIC;
      }
    );
  });
};

const addStarClickEvent = target => {
  target.addEventListener('click', ({ target }) => {
    if (!target.dataset.type) return;
    const newScore = +target.dataset.index + 1;
    const starContainerEl = target.parentElement;

    renderStars(starContainerEl, newScore);
    starContainerEl.dispatchEvent(
      new CustomEvent('rating-change', { detail: newScore })
    );
  });
};

const StarRating = target => {
  renderStars(target, INITIAL_SCORE);
  addStarClickEvent(target);
  addStarMouseoverEvent(target);
  addStarMouseoutEvent(target);
};

export default StarRating;
