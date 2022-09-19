# 미션 4. Calendar & DatePicker

## 요구 사항

### 1. Calendar의 뷰를 구현한다.

- [x] 1. 현재를 기준으로 .calendar 요소의 콘텐츠를 동적으로 생성하여 초기 렌더링한다.
  - App 컴포넌트의 `this.state.currentViewDate` 상태의 초기값을 현재 날짜로 설정해 초기 렌더링을 했습니다.
  
<br>

- [x] 2. .calendar-nav 요소의 버튼을 클릭하면 익월 또는 전월을 기준으로 .calendar 요소의 컨텐츠를 동적으로 생성하여 렌더링한다.
  - `CalendarNav` 컴포넌트의 버튼 요소에 클릭 이벤트를 발생시켜 구현했습니다.
  - `this.state.currentViewDate` 상태를 이전달, 다음달로 업데이트하고 해당 상태를 가지고 캘린더를 새로 렌더링합니다.

<br>

- [x] 3. 현재 표시 중인 달의 1일 앞과 말일 뒤에 이전 달과 다음 달의 날짜를 채운다.
  - 달력의 첫줄, 마지막줄에서 중간에 짤리는 경우 이전 달, 다음 달의 날짜를 채우게 구현했습니다.
  - `src/js/utils.js` 의 `getCalendarDates` 함수
  
<br>

- [x] 4. 캘린터에 오늘이 포함되어 있으면 구별할 수 있도록 표시한다.
  - 오늘날짜의 경우 `className 'today'` 부여, css로 스타일을 구분했습니다.
  
<br>

- [x] 5. 일요일은 폰트 컬러를 빨간색으로 지정한다.
  - 일요일의 경우 `className 'sunday'` 부여, css로 스타일을 구분했습니다.

<br>

- [x] 6. 캘린터 크기는 동적으로 변경할 수 있어야 한다. 즉, 캘린터를 생성할 때 캘린터 크기를 지정할 수 있어야 한다.
  - `Calendar` 컴포넌트의 파라미터로 `size`를 받게했습니다.
  - `--calendar-size` 변수를 조정해 크기를 동적으로 조정할 수 있도록 구현했습니다.
  ```js
  export default function Calendar({ size }) {
    //...
    this.$element = $('.calendar');
    this.$element.style.setProperty('--calendar-size', `${size}px`);
    //...
  }
  ```

<br>

- [x] 7. 날짜를 클릭하면 해당 날짜를 ‘yyyy-mm-dd’ 형식의 문자열로 콘솔에 출력한다.
  - ‘yyyy-mm-dd’ 형식으로 변환하는 함수 `src/js/utils.js > getDateString`를 만들어 사용했습니다.

<br>

### 2. DatePicker

- [x] 1. DatePicker를 클릭(포커스)하면 캘린더가 렌더링된다. 이때 Date picker의 값은 빈문자열이다.
  - date picker는 `App`컴포넌트의 `this.state.selectedDate`상태를 반영하는데 초기값은 `null`이고 최초 클릭 시는 Date picker가 빈문자열로 렌더링 됩니다.
  
<br>

- [x] 2. DatePicker는 read only하다.
  - `input` 태그의 `readonly` 속성을 사용했습니다.
  
<br>

- [x] 3. 캘린더의 날짜를 클릭하면 해당 날짜가 DatePicker의 값으로 출력된다.
  - 날짜를 클릭하면 `this.state.selectedDate`상태가 클릭한 날짜로 업데이트되고, 해당 상태가 `Picker` 에 렌더링됩니다.

<br> 

- [x] 4. 캘린더와 DatePicker 이외의 영역을 클릭하면 캘린더가 사라진다.
  - html에 클릭 이벤트를 감지. 이벤트 위임처리해서 클릭된 타겟이 캘린더의 자식요소가 아닐 떄 캘린더를 `close` 하게 구현.
  - 자식요소 판단은 클릭된 타겟의 부모요소가 null이 되거나 캘린더가 될 때까지 찾는 로직으로 구현
  ```js
  // scr/App.js

  $('html').addEventListener('click', ({ target }) => {
      if (
        this.isCalendarUI(target) || // 캘린더의 자식요소인가?
        target.className === 'picker' || // picker 인가? 
        this.state.isOpen === false // 캘린더가 닫혀있는가?
      )
        return; // 위 3가지 경우 일 때는 캘린더 닫지 않음

      this.state.isOpen = false;
      this.closeCalendar();
    });

    // 파라미터의 엘리먼트가 캘린더의 자식요소인지 체크
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
  ```

<br>

- [x] 5. Date picker의 값이 존재할 때 DatePicker를 다시 클릭(포커스)하면 DatePicker의 값을 기준으로 캘린더를 렌더링한다.
  - `Date picker`의 값은 `App`컴포넌트의 `this.state.selectedDate`상태를 반영한다.
  - 다른 년/월 캘린더에서 캘린더를 닫았더라도 다시 열 때 `this.state.selectedDate`상태의 날짜 캘린더를 렌더링한다.
 