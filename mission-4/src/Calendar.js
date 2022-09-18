import { $ } from './utils.js';
const DAY_NAME = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTH_NAME = [
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

export default function Calendar({ selectedDate }) {
  if (!new.target) {
    throw new Error('Calendarr가 new로 호출되지 않음');
  }

  this.$element = $('.calendar');
  this.$title = $('.calendar-title');
  this.grid = $('.calendar-grid');

  this.state = {
    selectedDate,
    visible: false,
  };

  this.setState = nextState => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.renderTitle();
  };

  this.renderTitle = () => {
    const monthName = MONTH_NAME[this.state.selectedDate.getMonth()];
    const year = this.state.selectedDate.getFullYear();
    $('.month', this.$title).textContent = monthName;
    $('.year', this.$title).textContent = year;
  };

  // 템플릿을 만든다
  // -> 요일 list 가져오기
  // -> 선택날짜 가지고와서 보여줄 날짜list 만들기
  // -> 요일 list, 날짜 list 가지고 map돌려서 html 만들기
  this.getCalendarDates = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevMonthDateCount = new Date(year, month).getDay();
    const nextMonthDateCount = 7 - ((prevMonthDateCount + lastDate) % 7);

    const thisMonthDates = Array.from(
      { length: lastDate },
      (_, i) => new Date(year, month, i + 1)
    );

    const prevMonthDates = Array.from(
      { length: prevMonthDateCount },
      (_, i) => new Date(year, month, 0 - i)
    ).reverse();

    const nextMonthDates = Array.from(
      { length: nextMonthDateCount },
      (_, i) => new Date(year, month, lastDate + i + 1)
    );

    return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
  };

  // this.render = () => {
  //   this.grid.innerHTML = this.getCalendarDates(date)
  //     .map(date => {
  //       return `<li class="grid-unit">${date.getDate()}</li>`;
  //     })
  //     .reduce((a, c) => a + c, '');
  // };
}

// 캘린더 생성 함수
// state: 선택 날짜 ( 기본값 : today)
// state: 너비 (기본값 지정)

// 이전달 다음달 클릭 시 캘린더 리렌더링
