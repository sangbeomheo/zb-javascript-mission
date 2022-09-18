/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _Picker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Picker.js */ "./src/Picker.js");
/* harmony import */ var _Calendar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Calendar.js */ "./src/Calendar.js");
/* harmony import */ var _CalendarNav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalendarNav.js */ "./src/CalendarNav.js");
/* harmony import */ var _CalendarGrid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CalendarGrid.js */ "./src/CalendarGrid.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");






const TODAY = new Date();

const GRID_UNIT_TYPE = {
  DATE: 'date',
  DAY: 'day',
};
const BUTTON_TYPE = {
  PREV: 'prev',
  NEXT: 'next',
};

function App() {
  this.state = {
    selectedDate: null,
    currentViewDate: TODAY,
    isOpen: false,
    calendarSize: 300,
  };

  const picker = new _Picker_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    handleClick: () => this.toggleCalendar(),
  });
  const calendar = new _Calendar_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ size: this.state.calendarSize });
  const calendarNav = new _CalendarNav_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    handleClick: event => this.navButtonClick(event),
  });
  const calendarGrid = new _CalendarGrid_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
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
        this.state.currentViewDate = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getPrevMonthDate)(
          this.state.currentViewDate
        );
        break;

      case BUTTON_TYPE.NEXT:
        this.state.currentViewDate = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.getNextMonthDate)(
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

  (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.$)('html').addEventListener('click', ({ target }) => {
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


/***/ }),

/***/ "./src/Calendar.js":
/*!*************************!*\
  !*** ./src/Calendar.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Calendar)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


function Calendar({ size }) {
  if (!new.target) {
    throw new Error('Calendar가 new로 호출되지 않음');
  }

  this.$element = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.$)('.calendar');
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


/***/ }),

/***/ "./src/CalendarGrid.js":
/*!*****************************!*\
  !*** ./src/CalendarGrid.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CalendarGrid)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


const DAY_NAME = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const UNIT_TYPE = {
  BASIC: 'basic',
  TODAY: 'today',
  SUNDAY: 'sunday',
  SELECTED: 'selected',
  PREV: 'prev',
  NEXT: 'next',
};

function CalendarGrid({ selectedDate, handleDateClick }) {
  if (!new.target) {
    throw new Error('Calendarr가 new로 호출되지 않음');
  }

  this.state = {
    selectedDate: selectedDate,
  };

  this.$element = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.$)('.calendar-grid');
  this.$element.addEventListener('click', handleDateClick);

  this.getUnitTypesString = (baseDate, date) => {
    const types = [];

    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isSunday)(date)) types.push(UNIT_TYPE.SUNDAY);
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isToday)(date)) types.push(UNIT_TYPE.TODAY);
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isPrevMonth)(baseDate, date)) types.push(UNIT_TYPE.PREV);
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isNextMonth)(baseDate, date)) types.push(UNIT_TYPE.NEXT);
    if (this.state.selectedDate && (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isSameDate)(date, this.state.selectedDate))
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
    const allDatesHtml = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getCalendarDates)(baseDate).reduce((html, date) => {
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


/***/ }),

/***/ "./src/CalendarNav.js":
/*!****************************!*\
  !*** ./src/CalendarNav.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CalendarNav)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


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

function CalendarNav({ handleClick }) {
  if (!new.target) {
    throw new Error('Calendarr가 new로 호출되지 않음');
  }

  this.$element = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.$)('.calendar-nav');
  this.$title = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.$)('.calendar-title');

  this.$element.addEventListener('click', handleClick);

  this.renderTitle = date => {
    const monthName = MONTH_NAME[date.getMonth()];
    const year = date.getFullYear();
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.$)('.month', this.$title).textContent = monthName;
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.$)('.year', this.$title).textContent = year;
  };
}


/***/ }),

/***/ "./src/Picker.js":
/*!***********************!*\
  !*** ./src/Picker.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Picker)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


function Picker({ handleClick }) {
  if (!new.target) {
    throw new Error('Picker가 new로 호출되지 않음');
  }

  this.$element = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.$)('.picker');

  this.$element.addEventListener('click', handleClick);

  this.renderPickerValue = date => {
    this.$element.setAttribute('value', (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getDateString)(date));
  };
}


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "getCalendarDates": () => (/* binding */ getCalendarDates),
/* harmony export */   "getDateString": () => (/* binding */ getDateString),
/* harmony export */   "getNextMonthDate": () => (/* binding */ getNextMonthDate),
/* harmony export */   "getPrevMonthDate": () => (/* binding */ getPrevMonthDate),
/* harmony export */   "isNextMonth": () => (/* binding */ isNextMonth),
/* harmony export */   "isPrevMonth": () => (/* binding */ isPrevMonth),
/* harmony export */   "isSameDate": () => (/* binding */ isSameDate),
/* harmony export */   "isSunday": () => (/* binding */ isSunday),
/* harmony export */   "isToday": () => (/* binding */ isToday)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.js */ "./src/App.js");


window.addEventListener('DOMContentLoaded', () => {
  new _App_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sa0JBQWtCO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSw0QkFBNEI7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNEJBQTRCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFhRTs7Ozs7OztVQzFHRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjJCOztBQUUzQjtBQUNBLE1BQU0sK0NBQUc7QUFDVCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvLi9zcmMvQXBwLmpzIiwid2VicGFjazovL2NhbGVuZGFyLWRhdGVfcGlja2VyLy4vc3JjL0NhbGVuZGFyLmpzIiwid2VicGFjazovL2NhbGVuZGFyLWRhdGVfcGlja2VyLy4vc3JjL0NhbGVuZGFyR3JpZC5qcyIsIndlYnBhY2s6Ly9jYWxlbmRhci1kYXRlX3BpY2tlci8uL3NyYy9DYWxlbmRhck5hdi5qcyIsIndlYnBhY2s6Ly9jYWxlbmRhci1kYXRlX3BpY2tlci8uL3NyYy9QaWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhbGVuZGFyLWRhdGVfcGlja2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYWxlbmRhci1kYXRlX3BpY2tlci8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaWNrZXIgZnJvbSAnLi9QaWNrZXIuanMnO1xuaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vQ2FsZW5kYXIuanMnO1xuaW1wb3J0IENhbGVuZGFyTmF2IGZyb20gJy4vQ2FsZW5kYXJOYXYuanMnO1xuaW1wb3J0IENhbGVuZGFyR3JpZCBmcm9tICcuL0NhbGVuZGFyR3JpZC5qcyc7XG5pbXBvcnQgeyAkLCBnZXRQcmV2TW9udGhEYXRlLCBnZXROZXh0TW9udGhEYXRlIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IFRPREFZID0gbmV3IERhdGUoKTtcblxuY29uc3QgR1JJRF9VTklUX1RZUEUgPSB7XG4gIERBVEU6ICdkYXRlJyxcbiAgREFZOiAnZGF5Jyxcbn07XG5jb25zdCBCVVRUT05fVFlQRSA9IHtcbiAgUFJFVjogJ3ByZXYnLFxuICBORVhUOiAnbmV4dCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIHRoaXMuc3RhdGUgPSB7XG4gICAgc2VsZWN0ZWREYXRlOiBudWxsLFxuICAgIGN1cnJlbnRWaWV3RGF0ZTogVE9EQVksXG4gICAgaXNPcGVuOiBmYWxzZSxcbiAgICBjYWxlbmRhclNpemU6IDMwMCxcbiAgfTtcblxuICBjb25zdCBwaWNrZXIgPSBuZXcgUGlja2VyKHtcbiAgICBoYW5kbGVDbGljazogKCkgPT4gdGhpcy50b2dnbGVDYWxlbmRhcigpLFxuICB9KTtcbiAgY29uc3QgY2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIoeyBzaXplOiB0aGlzLnN0YXRlLmNhbGVuZGFyU2l6ZSB9KTtcbiAgY29uc3QgY2FsZW5kYXJOYXYgPSBuZXcgQ2FsZW5kYXJOYXYoe1xuICAgIGhhbmRsZUNsaWNrOiBldmVudCA9PiB0aGlzLm5hdkJ1dHRvbkNsaWNrKGV2ZW50KSxcbiAgfSk7XG4gIGNvbnN0IGNhbGVuZGFyR3JpZCA9IG5ldyBDYWxlbmRhckdyaWQoe1xuICAgIHNlbGVjdGVkRGF0ZTogdGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUsXG4gICAgaGFuZGxlRGF0ZUNsaWNrOiBldmVudCA9PiB0aGlzLnNlbGVjdERhdGUoZXZlbnQpLFxuICB9KTtcblxuICB0aGlzLnRvZ2dsZUNhbGVuZGFyID0gKCkgPT4ge1xuICAgIHRoaXMuc3RhdGUuaXNPcGVuID0gIXRoaXMuc3RhdGUuaXNPcGVuO1xuICAgIHRoaXMuc3RhdGUuaXNPcGVuID8gdGhpcy5vcGVuQ2FsZW5kYXIoKSA6IHRoaXMuY2xvc2VDYWxlbmRhcigpO1xuICB9O1xuXG4gIHRoaXMub3BlbkNhbGVuZGFyID0gKCkgPT4ge1xuICAgIHRoaXMuc3RhdGUuY3VycmVudFZpZXdEYXRlID0gdGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUgfHwgVE9EQVk7XG4gICAgY2FsZW5kYXIub3BlbigpO1xuICAgIGNhbGVuZGFyTmF2LnJlbmRlclRpdGxlKHRoaXMuc3RhdGUuc2VsZWN0ZWREYXRlIHx8IFRPREFZKTtcbiAgICBjYWxlbmRhckdyaWQucmVuZGVyKHRoaXMuc3RhdGUuc2VsZWN0ZWREYXRlIHx8IFRPREFZKTtcbiAgfTtcblxuICB0aGlzLmNsb3NlQ2FsZW5kYXIgPSAoKSA9PiBjYWxlbmRhci5jbG9zZSgpO1xuXG4gIHRoaXMubmF2QnV0dG9uQ2xpY2sgPSAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgIT09ICdidXR0b24nKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKHRhcmdldC5kYXRhc2V0LnR5cGUpIHtcbiAgICAgIGNhc2UgQlVUVE9OX1RZUEUuUFJFVjpcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50Vmlld0RhdGUgPSBnZXRQcmV2TW9udGhEYXRlKFxuICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudFZpZXdEYXRlXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEJVVFRPTl9UWVBFLk5FWFQ6XG4gICAgICAgIHRoaXMuc3RhdGUuY3VycmVudFZpZXdEYXRlID0gZ2V0TmV4dE1vbnRoRGF0ZShcbiAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRWaWV3RGF0ZVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjYWxlbmRhck5hdi5yZW5kZXJUaXRsZSh0aGlzLnN0YXRlLmN1cnJlbnRWaWV3RGF0ZSk7XG4gICAgY2FsZW5kYXJHcmlkLnJlbmRlcih0aGlzLnN0YXRlLmN1cnJlbnRWaWV3RGF0ZSk7XG4gIH07XG5cbiAgdGhpcy5zZWxlY3REYXRlID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICBpZiAodGFyZ2V0LmRhdGFzZXQudW5pdCAhPT0gR1JJRF9VTklUX1RZUEUuREFURSkgcmV0dXJuO1xuXG4gICAgY29uc3QgY2xpY2tlZERhdGUgPSArdGFyZ2V0LnRleHRDb250ZW50LnRyaW0oKTtcbiAgICBjb25zdCB5ZWFyID0gdGhpcy5zdGF0ZS5jdXJyZW50Vmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgIGxldCBtb250aCA9IHRoaXMuc3RhdGUuY3VycmVudFZpZXdEYXRlLmdldE1vbnRoKCk7XG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZXYnKSkgbW9udGggLT0gMTtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmV4dCcpKSBtb250aCArPSAxO1xuXG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgY2xpY2tlZERhdGUpO1xuICAgIGNhbGVuZGFyR3JpZC5zdGF0ZS5zZWxlY3RlZERhdGUgPSB0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZTtcblxuICAgIHRoaXMuc3RhdGUuaXNPcGVuID0gZmFsc2U7XG4gICAgY2FsZW5kYXIuY2xvc2UoKTtcbiAgICBwaWNrZXIucmVuZGVyUGlja2VyVmFsdWUodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUpO1xuICB9O1xuXG4gICQoJ2h0bWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5pc0NhbGVuZGFyVUkodGFyZ2V0KSB8fFxuICAgICAgdGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ3BpY2tlcicgfHxcbiAgICAgIHRoaXMuc3RhdGUuaXNPcGVuID09PSBmYWxzZVxuICAgIClcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMuc3RhdGUuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5jbG9zZUNhbGVuZGFyKCk7XG4gIH0pO1xuXG4gIHRoaXMuaXNDYWxlbmRhclVJID0gJGVsZW1lbnQgPT4ge1xuICAgIGxldCBpc0NoaWxkT2ZDYWxlbmRhciA9IGZhbHNlO1xuXG4gICAgY29uc3QgZmluZFBhcmVudEVsZW1lbnQgPSAkY2hpbGQgPT4ge1xuICAgICAgbGV0ICRwYXJlbnQgPSAkY2hpbGQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghJHBhcmVudCkge1xuICAgICAgICBpc0NoaWxkT2ZDYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoJHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2NhbGVuZGFyJykpIHtcbiAgICAgICAgaXNDaGlsZE9mQ2FsZW5kYXIgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmaW5kUGFyZW50RWxlbWVudCgkcGFyZW50KTtcbiAgICB9O1xuICAgIGZpbmRQYXJlbnRFbGVtZW50KCRlbGVtZW50KTtcblxuICAgIHJldHVybiBpc0NoaWxkT2ZDYWxlbmRhcjtcbiAgfTtcbn1cbiIsImltcG9ydCB7ICQgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FsZW5kYXIoeyBzaXplIH0pIHtcbiAgaWYgKCFuZXcudGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYWxlbmRhcuqwgCBuZXfroZwg7Zi47Lac65CY7KeAIOyViuydjCcpO1xuICB9XG5cbiAgdGhpcy4kZWxlbWVudCA9ICQoJy5jYWxlbmRhcicpO1xuICB0aGlzLiRlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNhbGVuZGFyLXNpemUnLCBgJHtzaXplfXB4YCk7XG5cbiAgdGhpcy5vcGVuID0gKCkgPT4ge1xuICAgIHRoaXMuJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnY2xvc2UnKTtcbiAgICB0aGlzLiRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcbiAgICB0aGlzLiRlbGVtZW50LmZvY3VzKCk7XG4gIH07XG5cbiAgdGhpcy5jbG9zZSA9ICgpID0+IHtcbiAgICB0aGlzLiRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICB0aGlzLiRlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Nsb3NlJyk7XG4gIH07XG59XG4iLCJpbXBvcnQge1xuICAkLFxuICBnZXRDYWxlbmRhckRhdGVzLFxuICBpc1NhbWVEYXRlLFxuICBpc1N1bmRheSxcbiAgaXNUb2RheSxcbiAgaXNQcmV2TW9udGgsXG4gIGlzTmV4dE1vbnRoLFxufSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgREFZX05BTUUgPSBbJ1NVTicsICdNT04nLCAnVFVFJywgJ1dFRCcsICdUSFUnLCAnRlJJJywgJ1NBVCddO1xuY29uc3QgVU5JVF9UWVBFID0ge1xuICBCQVNJQzogJ2Jhc2ljJyxcbiAgVE9EQVk6ICd0b2RheScsXG4gIFNVTkRBWTogJ3N1bmRheScsXG4gIFNFTEVDVEVEOiAnc2VsZWN0ZWQnLFxuICBQUkVWOiAncHJldicsXG4gIE5FWFQ6ICduZXh0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhbGVuZGFyR3JpZCh7IHNlbGVjdGVkRGF0ZSwgaGFuZGxlRGF0ZUNsaWNrIH0pIHtcbiAgaWYgKCFuZXcudGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYWxlbmRhcnLqsIAgbmV366GcIO2YuOy2nOuQmOyngCDslYrsnYwnKTtcbiAgfVxuXG4gIHRoaXMuc3RhdGUgPSB7XG4gICAgc2VsZWN0ZWREYXRlOiBzZWxlY3RlZERhdGUsXG4gIH07XG5cbiAgdGhpcy4kZWxlbWVudCA9ICQoJy5jYWxlbmRhci1ncmlkJyk7XG4gIHRoaXMuJGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEYXRlQ2xpY2spO1xuXG4gIHRoaXMuZ2V0VW5pdFR5cGVzU3RyaW5nID0gKGJhc2VEYXRlLCBkYXRlKSA9PiB7XG4gICAgY29uc3QgdHlwZXMgPSBbXTtcblxuICAgIGlmIChpc1N1bmRheShkYXRlKSkgdHlwZXMucHVzaChVTklUX1RZUEUuU1VOREFZKTtcbiAgICBpZiAoaXNUb2RheShkYXRlKSkgdHlwZXMucHVzaChVTklUX1RZUEUuVE9EQVkpO1xuICAgIGlmIChpc1ByZXZNb250aChiYXNlRGF0ZSwgZGF0ZSkpIHR5cGVzLnB1c2goVU5JVF9UWVBFLlBSRVYpO1xuICAgIGlmIChpc05leHRNb250aChiYXNlRGF0ZSwgZGF0ZSkpIHR5cGVzLnB1c2goVU5JVF9UWVBFLk5FWFQpO1xuICAgIGlmICh0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSAmJiBpc1NhbWVEYXRlKGRhdGUsIHRoaXMuc3RhdGUuc2VsZWN0ZWREYXRlKSlcbiAgICAgIHR5cGVzLnB1c2goVU5JVF9UWVBFLlNFTEVDVEVEKTtcblxuICAgIHJldHVybiB0eXBlc1xuICAgICAgLnJlZHVjZSgodHlwZXNTdHJpbmcsIHR5cGUpID0+IHR5cGVzU3RyaW5nICsgYCAke3R5cGV9YCwgJycpXG4gICAgICAudHJpbSgpO1xuICB9O1xuXG4gIHRoaXMuY3JlYXRlR3JpZEhUTUwgPSBiYXNlRGF0ZSA9PiB7XG4gICAgY29uc3QgZGF5TmFtZXNIdG1sID0gREFZX05BTUUucmVkdWNlKFxuICAgICAgKGh0bWwsIGRheU5hbWUpID0+XG4gICAgICAgIGh0bWwgKyBgPGxpIGRhdGEtdW5pdD1cImRheVwiIGNsYXNzPVwiZ3JpZC11bml0IGRheVwiPiR7ZGF5TmFtZX08L2xpPmAsXG4gICAgICAnJ1xuICAgICk7XG4gICAgY29uc3QgYWxsRGF0ZXNIdG1sID0gZ2V0Q2FsZW5kYXJEYXRlcyhiYXNlRGF0ZSkucmVkdWNlKChodG1sLCBkYXRlKSA9PiB7XG4gICAgICBjb25zdCBkYXRlVHlwZXNTdHJpbmcgPSB0aGlzLmdldFVuaXRUeXBlc1N0cmluZyhiYXNlRGF0ZSwgZGF0ZSk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBodG1sICtcbiAgICAgICAgYDxsaSBkYXRhLXVuaXQ9XCJkYXRlXCIgY2xhc3M9XCJncmlkLXVuaXQgZGF0ZSAke2RhdGVUeXBlc1N0cmluZ31cIj5cbiAgICAgICAgICAke2RhdGUuZ2V0RGF0ZSgpfVxuICAgICAgICA8L2xpPmBcbiAgICAgICk7XG4gICAgfSwgJycpO1xuXG4gICAgcmV0dXJuIGRheU5hbWVzSHRtbCArIGFsbERhdGVzSHRtbDtcbiAgfTtcblxuICB0aGlzLnJlbmRlciA9IGRhdGUgPT4ge1xuICAgIHRoaXMuJGVsZW1lbnQucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgdGhpcy4kZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRoaXMuY3JlYXRlR3JpZEhUTUwoZGF0ZSkpO1xuICB9O1xufVxuIiwiaW1wb3J0IHsgJCB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jb25zdCBNT05USF9OQU1FID0gW1xuICAnSmFudWFyeScsXG4gICdGZWJydWFyeScsXG4gICdNYXJjaCcsXG4gICdBcHJpbCcsXG4gICdNYXknLFxuICAnSnVuZScsXG4gICdKdWx5JyxcbiAgJ0F1Z3VzdCcsXG4gICdTZXB0ZW1iZXInLFxuICAnT2N0b2JlcicsXG4gICdOb3ZlbWJlcicsXG4gICdEZWNlbWJlcicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhck5hdih7IGhhbmRsZUNsaWNrIH0pIHtcbiAgaWYgKCFuZXcudGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYWxlbmRhcnLqsIAgbmV366GcIO2YuOy2nOuQmOyngCDslYrsnYwnKTtcbiAgfVxuXG4gIHRoaXMuJGVsZW1lbnQgPSAkKCcuY2FsZW5kYXItbmF2Jyk7XG4gIHRoaXMuJHRpdGxlID0gJCgnLmNhbGVuZGFyLXRpdGxlJyk7XG5cbiAgdGhpcy4kZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrKTtcblxuICB0aGlzLnJlbmRlclRpdGxlID0gZGF0ZSA9PiB7XG4gICAgY29uc3QgbW9udGhOYW1lID0gTU9OVEhfTkFNRVtkYXRlLmdldE1vbnRoKCldO1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgJCgnLm1vbnRoJywgdGhpcy4kdGl0bGUpLnRleHRDb250ZW50ID0gbW9udGhOYW1lO1xuICAgICQoJy55ZWFyJywgdGhpcy4kdGl0bGUpLnRleHRDb250ZW50ID0geWVhcjtcbiAgfTtcbn1cbiIsImltcG9ydCB7ICQsIGdldERhdGVTdHJpbmcgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGlja2VyKHsgaGFuZGxlQ2xpY2sgfSkge1xuICBpZiAoIW5ldy50YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BpY2tlcuqwgCBuZXfroZwg7Zi47Lac65CY7KeAIOyViuydjCcpO1xuICB9XG5cbiAgdGhpcy4kZWxlbWVudCA9ICQoJy5waWNrZXInKTtcblxuICB0aGlzLiRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2spO1xuXG4gIHRoaXMucmVuZGVyUGlja2VyVmFsdWUgPSBkYXRlID0+IHtcbiAgICB0aGlzLiRlbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBnZXREYXRlU3RyaW5nKGRhdGUpKTtcbiAgfTtcbn1cbiIsImNvbnN0ICQgPSAoc2VsZWN0b3IsIHRhcmdldCA9IGRvY3VtZW50KSA9PiB0YXJnZXQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbmNvbnN0IGdldERhdGVTdHJpbmcgPSAoZGF0ZSwgam9pbiA9ICctJykgPT4ge1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IGAwJHtkYXRlLmdldE1vbnRoKCkgKyAxfWAuc2xpY2UoLTIpO1xuICBjb25zdCBkYXkgPSBgMCR7ZGF0ZS5nZXREYXRlKCl9YC5zbGljZSgtMik7XG4gIGNvbnN0IHN0cmluZ0RhdGUgPSB5ZWFyICsgam9pbiArIG1vbnRoICsgam9pbiArIGRheTtcblxuICByZXR1cm4gc3RyaW5nRGF0ZTtcbn07XG5cbmNvbnN0IGdldENhbGVuZGFyRGF0ZXMgPSBkYXRlID0+IHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gIGNvbnN0IGxhc3REYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKS5nZXREYXRlKCk7XG4gIGNvbnN0IHByZXZNb250aERhdGVDb3VudCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoKS5nZXREYXkoKTtcbiAgY29uc3QgbmV4dE1vbnRoRGF0ZUNvdW50ID0gNyAtICgocHJldk1vbnRoRGF0ZUNvdW50ICsgbGFzdERhdGUpICUgNyk7XG5cbiAgY29uc3QgdGhpc01vbnRoRGF0ZXMgPSBBcnJheS5mcm9tKFxuICAgIHsgbGVuZ3RoOiBsYXN0RGF0ZSB9LFxuICAgIChfLCBpKSA9PiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgaSArIDEpXG4gICk7XG5cbiAgY29uc3QgcHJldk1vbnRoRGF0ZXMgPVxuICAgIHByZXZNb250aERhdGVDb3VudCA8IDdcbiAgICAgID8gQXJyYXkuZnJvbShcbiAgICAgICAgICB7IGxlbmd0aDogcHJldk1vbnRoRGF0ZUNvdW50IH0sXG4gICAgICAgICAgKF8sIGkpID0+IG5ldyBEYXRlKHllYXIsIG1vbnRoLCAwIC0gaSlcbiAgICAgICAgKS5yZXZlcnNlKClcbiAgICAgIDogW107XG5cbiAgY29uc3QgbmV4dE1vbnRoRGF0ZXMgPVxuICAgIG5leHRNb250aERhdGVDb3VudCA8IDdcbiAgICAgID8gQXJyYXkuZnJvbShcbiAgICAgICAgICB7IGxlbmd0aDogbmV4dE1vbnRoRGF0ZUNvdW50IH0sXG4gICAgICAgICAgKF8sIGkpID0+IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBsYXN0RGF0ZSArIGkgKyAxKVxuICAgICAgICApXG4gICAgICA6IFtdO1xuXG4gIHJldHVybiBbLi4ucHJldk1vbnRoRGF0ZXMsIC4uLnRoaXNNb250aERhdGVzLCAuLi5uZXh0TW9udGhEYXRlc107XG59O1xuXG5jb25zdCBnZXRQcmV2TW9udGhEYXRlID0gZGF0ZSA9PiB7XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuXG4gIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEpO1xufTtcblxuY29uc3QgZ2V0TmV4dE1vbnRoRGF0ZSA9IGRhdGUgPT4ge1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcblxuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggKyAxKTtcbn07XG5cbmNvbnN0IGlzU2FtZURhdGUgPSAoZGF0ZTEsIGRhdGUyKSA9PiB7XG4gIHJldHVybiAoXG4gICAgZGF0ZTEuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZTIuZ2V0RnVsbFllYXIoKSAmJlxuICAgIGRhdGUxLmdldE1vbnRoKCkgPT09IGRhdGUyLmdldE1vbnRoKCkgJiZcbiAgICBkYXRlMS5nZXREYXRlKCkgPT09IGRhdGUyLmdldERhdGUoKVxuICApO1xufTtcblxuY29uc3QgaXNUb2RheSA9IGRhdGUgPT4ge1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIHJldHVybiAoXG4gICAgZGF0ZS5nZXREYXRlKCkgPT0gdG9kYXkuZ2V0RGF0ZSgpICYmXG4gICAgZGF0ZS5nZXRNb250aCgpID09IHRvZGF5LmdldE1vbnRoKCkgJiZcbiAgICBkYXRlLmdldEZ1bGxZZWFyKCkgPT0gdG9kYXkuZ2V0RnVsbFllYXIoKVxuICApO1xufTtcblxuY29uc3QgaXNTdW5kYXkgPSBkYXRlID0+IGRhdGUuZ2V0RGF5KCkgPT09IDA7XG5cbmNvbnN0IGlzUHJldk1vbnRoID0gKGJhc2VEYXRlLCBkYXRlKSA9PiB7XG4gIGlmIChiYXNlRGF0ZS5nZXRGdWxsWWVhcigpID49IGRhdGUuZ2V0RnVsbFllYXIoKSkge1xuICAgIGlmIChiYXNlRGF0ZS5nZXRNb250aCgpID09PSAwICYmIGRhdGUuZ2V0TW9udGgoKSA9PT0gMTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZURhdGUuZ2V0TW9udGgoKSA+IGRhdGUuZ2V0TW9udGgoKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBpc05leHRNb250aCA9IChiYXNlRGF0ZSwgZGF0ZSkgPT4ge1xuICBpZiAoYmFzZURhdGUuZ2V0RnVsbFllYXIoKSA8PSBkYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICBpZiAoYmFzZURhdGUuZ2V0TW9udGgoKSA9PT0gMTEgJiYgZGF0ZS5nZXRNb250aCgpID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGJhc2VEYXRlLmdldE1vbnRoKCkgPCBkYXRlLmdldE1vbnRoKCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IHtcbiAgJCxcbiAgZ2V0RGF0ZVN0cmluZyxcbiAgZ2V0Q2FsZW5kYXJEYXRlcyxcbiAgZ2V0UHJldk1vbnRoRGF0ZSxcbiAgZ2V0TmV4dE1vbnRoRGF0ZSxcbiAgaXNTYW1lRGF0ZSxcbiAgaXNUb2RheSxcbiAgaXNTdW5kYXksXG4gIGlzUHJldk1vbnRoLFxuICBpc05leHRNb250aCxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAuanMnO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgbmV3IEFwcCgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=