import {
  $,
  getCalendarDates,
  isSameDate,
  isSunday,
  isToday,
  isPrevMonth,
  isNextMonth,
} from './utils.js';

const DAY_NAME = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const UNIT_TYPE = {
  BASIC: 'basic',
  TODAY: 'today',
  SUNDAY: 'sunday',
  SELECTED: 'selected',
  PREV: 'prev',
  NEXT: 'next',
};

export default function CalendarGrid({ selectedDate, handleDateClick }) {
  if (!new.target) {
    throw new Error('Calendarr가 new로 호출되지 않음');
  }

  this.state = {
    selectedDate: selectedDate,
  };

  this.$element = $('.calendar-grid');
  this.$element.addEventListener('click', handleDateClick);

  this.getUnitTypesString = (baseDate, date) => {
    const types = [];

    if (isSunday(date)) types.push(UNIT_TYPE.SUNDAY);
    if (isToday(date)) types.push(UNIT_TYPE.TODAY);
    if (isPrevMonth(baseDate, date)) types.push(UNIT_TYPE.PREV);
    if (isNextMonth(baseDate, date)) types.push(UNIT_TYPE.NEXT);
    if (this.state.selectedDate && isSameDate(date, this.state.selectedDate))
      types.push(UNIT_TYPE.SELECTED);

    return types
      .reduce((typesString, type) => typesString + ` ${type}`, '')
      .trim();
  };

  this.createGridHTML = baseDate => {
    const dayNamesHtml = DAY_NAME.reduce(
      (html, dayName) =>
        html + `<li data-unit="day" class="grid-unit day">${dayName}</li>`,
      ''
    );
    const allDatesHtml = getCalendarDates(baseDate).reduce((html, date) => {
      const dateTypesString = this.getUnitTypesString(baseDate, date);
      return (
        html +
        `<li data-unit="date" class="grid-unit date ${dateTypesString}">
          ${date.getDate()}
        </li>`
      );
    }, '');

    return dayNamesHtml + allDatesHtml;
  };

  this.render = date => {
    this.$element.replaceChildren();
    this.$element.insertAdjacentHTML('beforeend', this.createGridHTML(date));
  };
}
