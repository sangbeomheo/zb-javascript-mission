import { $ } from './utils.js';

const MONTH_NAME = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function CalendarNav({ handleClick }) {
  if (!new.target) {
    throw new Error('Calendarr가 new로 호출되지 않음');
  }

  this.$element = $('.calendar-nav');
  this.$title = $('.calendar-title');

  this.$element.addEventListener('click', handleClick);

  this.renderTitle = date => {
    const monthName = MONTH_NAME[date.getMonth()];
    const year = date.getFullYear();
    $('.month', this.$title).textContent = monthName;
    $('.year', this.$title).textContent = year;
  };
}
