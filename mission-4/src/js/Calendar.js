import { $ } from './utils.js';

export default function Calendar({ size }) {
  if (!new.target) {
    throw new Error('Calendar가 new로 호출되지 않음');
  }

  this.$element = $('.calendar');
  this.$element.style.setProperty('--calendar-size', `${size}px`);

  this.open = () => {
    this.$element.classList.remove('close');
    this.$element.classList.add('open');
    this.$element.focus();
  };

  this.close = () => {
    this.$element.classList.remove('open');
    this.$element.classList.add('close');
  };
}
