const $ = (selector, target = document) => target.querySelector(selector);

const getDateString = (date, join = '-') => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const stringDate = year + join + month + join + day;

  return stringDate;
};

const getCalendarDates = date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevMonthDateCount = new Date(year, month).getDay();
  const nextMonthDateCount = 7 - ((prevMonthDateCount + lastDate) % 7);

  const thisMonthDates = Array.from(
    { length: lastDate },
    (_, i) => new Date(year, month, i + 1)
  );

  const prevMonthDates =
    prevMonthDateCount < 7
      ? Array.from(
          { length: prevMonthDateCount },
          (_, i) => new Date(year, month, 0 - i)
        ).reverse()
      : [];

  const nextMonthDates =
    nextMonthDateCount < 7
      ? Array.from(
          { length: nextMonthDateCount },
          (_, i) => new Date(year, month, lastDate + i + 1)
        )
      : [];

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

const getPrevMonthDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return new Date(year, month - 1);
};

const getNextMonthDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return new Date(year, month + 1);
};

const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isToday = date => {
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};

const isSunday = date => date.getDay() === 0;

const isPrevMonth = (baseDate, date) => {
  if (baseDate.getFullYear() >= date.getFullYear()) {
    if (baseDate.getMonth() === 0 && date.getMonth() === 11) {
      return true;
    }
    return baseDate.getMonth() > date.getMonth();
  }
  return false;
};

const isNextMonth = (baseDate, date) => {
  if (baseDate.getFullYear() <= date.getFullYear()) {
    if (baseDate.getMonth() === 11 && date.getMonth() === 0) {
      return true;
    }
    return baseDate.getMonth() < date.getMonth();
  }
  return false;
};

export {
  $,
  getDateString,
  getCalendarDates,
  getPrevMonthDate,
  getNextMonthDate,
  isSameDate,
  isToday,
  isSunday,
  isPrevMonth,
  isNextMonth,
};
