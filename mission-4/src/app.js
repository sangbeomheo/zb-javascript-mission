import Picker from './Picker.js';
import Calendar from './Calendar.js';
import CalendarNav from './CalendarNav.js';
import CalendarGrid from './CalendarGrid.js';
import { $, getPrevMonthDate, getNextMonthDate } from './utils.js';

const TODAY = new Date();

const GRID_UNIT_TYPE = {
  DATE: 'date',
  DAY: 'day',
};
const BUTTON_TYPE = {
  PREV: 'prev',
  NEXT: 'next',
};

export default function App() {
  this.state = {
    selectedDate: null,
    currentViewDate: TODAY,
    isOpen: false,
    calendarSize: 300,
  };

  const picker = new Picker({
    handleClick: () => this.toggleCalendar(),
  });
  const calendar = new Calendar({ size: this.state.calendarSize });
  const calendarNav = new CalendarNav({
    handleClick: event => this.navButtonClick(event),
  });
  const calendarGrid = new CalendarGrid({
    selectedDate: this.state.selectedDate,
    handleDateClick: event => this.selectDate(event),
  });

  this.toggleCalendar = () => {
    this.state.isOpen = !this.state.isOpen;
    this.state.isOpen ? this.openCalendar() : this.closeCalendar();
  };

  this.openCalendar = () => {
    this.state.currentViewDate = this.state.selectedDate || TODAY;
    calendar.open();
    calendarNav.renderTitle(this.state.selectedDate || TODAY);
    calendarGrid.render(this.state.selectedDate || TODAY);
  };

  this.closeCalendar = () => calendar.close();

  this.navButtonClick = ({ target }) => {
    if (target.getAttribute('type') !== 'button') return;

    switch (target.dataset.type) {
      case BUTTON_TYPE.PREV:
        this.state.currentViewDate = getPrevMonthDate(
          this.state.currentViewDate
        );
        break;

      case BUTTON_TYPE.NEXT:
        this.state.currentViewDate = getNextMonthDate(
          this.state.currentViewDate
        );
        break;
    }

    calendarNav.renderTitle(this.state.currentViewDate);
    calendarGrid.render(this.state.currentViewDate);
  };

  this.selectDate = ({ target }) => {
    if (target.dataset.unit !== GRID_UNIT_TYPE.DATE) return;

    const clickedDate = +target.textContent.trim();
    const year = this.state.currentViewDate.getFullYear();

    let month = this.state.currentViewDate.getMonth();
    if (target.classList.contains('prev')) month -= 1;
    if (target.classList.contains('next')) month += 1;

    this.state.selectedDate = new Date(year, month, clickedDate);
    calendarGrid.state.selectedDate = this.state.selectedDate;

    this.state.isOpen = false;
    calendar.close();
    picker.renderPickerValue(this.state.selectedDate);
  };

  $('html').addEventListener('click', ({ target }) => {
    if (
      this.isCalendarUI(target) ||
      target.className === 'picker' ||
      this.state.isOpen === false
    )
      return;

    this.state.isOpen = false;
    this.closeCalendar();
  });

  this.isCalendarUI = $element => {
    let isChildOfCalendar = false;

    const findParentElement = $child => {
      let $parent = $child.parentElement;
      if (!$parent) {
        isChildOfCalendar = false;
        return;
      }
      if ($parent.classList.contains('calendar')) {
        isChildOfCalendar = true;
        return;
      }
      findParentElement($parent);
    };
    findParentElement($element);

    return isChildOfCalendar;
  };
}
