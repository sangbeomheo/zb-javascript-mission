const $ = (selector, target = document) => target.querySelector(selector);

const getDateString = (date, join = '-') => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const stringDate = year + join + month + join + day;

  return stringDate;
};

export { $, getDateString };
