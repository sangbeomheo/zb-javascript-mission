const $ = (selector, target = document) => target.querySelector(selector);

const ONE_SECOND = 1000;

const AnalogClock = $container => {
  renderClockInner($container);
  handleClockHands($container);
  setInterval(() => handleClockHands($container), ONE_SECOND);
};

const handleClockHands = target => {
  const { hours, minutes, seconds } = getCurrentTime();

  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;
  const hourDeg = hours * 30 + minuteDeg / 12; // 정시 + 분의 정도만큼 추가로 이동

  $('.hour', target).style.setProperty('--deg', hourDeg);
  $('.minute', target).style.setProperty('--deg', minuteDeg);
  $('.second', target).style.setProperty('--deg', secondDeg);
};

const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return { hours, minutes, seconds };
};

const renderClockInner = target => {
  const hands = ['hour', 'minute', 'second'];
  const timeMarkers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handsHTML = hands.reduce(
    (html, hand) => html + `<div class="hand ${hand}"></div>`,
    ''
  );
  const timeMarkersHTML = timeMarkers.reduce(
    (html, marker) => html + `<div class="time time${marker}">|</div>`,
    ''
  );

  target.insertAdjacentHTML('afterbegin', handsHTML + timeMarkersHTML);
};

export default AnalogClock;
