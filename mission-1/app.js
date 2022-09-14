// do something!
const $ = (selector, target = document) => target.querySelector(selector);

const OPEN = 'open';
const CLOSE = 'close';
const ACTIVE = 'active';

const bodyEl = $('body');
const navEl = $('nav');
const toggleBtnEl = $('.toggle');

const getNavState = () => {
  const state = localStorage.getItem('navState');
  return state ? state : CLOSE;
};
const setNavState = state => localStorage.setItem('navState', state);

const openNav = () => (navEl.classList = ACTIVE);

const closeNav = () => (navEl.classList = '');

const handleToggleBtnClick = () => {
  switch (getNavState()) {
    case OPEN:
      setNavState(CLOSE);
      closeNav();
      break;

    case CLOSE:
    default: // 먄약 OPEN, CLOSE 둘다 아니면 CLOSE 상태로 만든다.
      setNavState(OPEN);
      openNav();
      break;
  }
};

const initEventHandler = () =>
  toggleBtnEl.addEventListener('click', handleToggleBtnClick);

const removeBlockTransitionOnBody = () => bodyEl.classList.remove('preload');

const showBody = () => (bodyEl.style.visibility = 'visible');

const init = () => {
  window.addEventListener('DOMContentLoaded', () => {
    getNavState() === OPEN ? openNav() : closeNav();
    initEventHandler();
    showBody();
  });

  window.addEventListener('load', removeBlockTransitionOnBody);
};

init();
