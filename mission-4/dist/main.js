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
/* harmony import */ var _js_Picker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/Picker.js */ "./src/js/Picker.js");
/* harmony import */ var _js_Calendar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/Calendar.js */ "./src/js/Calendar.js");
/* harmony import */ var _js_CalendarNav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/CalendarNav.js */ "./src/js/CalendarNav.js");
/* harmony import */ var _js_CalendarGrid_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/CalendarGrid.js */ "./src/js/CalendarGrid.js");
/* harmony import */ var _js_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/utils.js */ "./src/js/utils.js");






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

  const picker = new _js_Picker_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    handleClick: () => this.toggleCalendar(),
  });
  const calendar = new _js_Calendar_js__WEBPACK_IMPORTED_MODULE_1__["default"]({ size: this.state.calendarSize });
  const calendarNav = new _js_CalendarNav_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
    handleClick: event => this.navButtonClick(event),
  });
  const calendarGrid = new _js_CalendarGrid_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
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
        this.state.currentViewDate = (0,_js_utils_js__WEBPACK_IMPORTED_MODULE_4__.getPrevMonthDate)(
          this.state.currentViewDate
        );
        break;

      case BUTTON_TYPE.NEXT:
        this.state.currentViewDate = (0,_js_utils_js__WEBPACK_IMPORTED_MODULE_4__.getNextMonthDate)(
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
    console.log((0,_js_utils_js__WEBPACK_IMPORTED_MODULE_4__.getDateString)(this.state.selectedDate));
  };

  (0,_js_utils_js__WEBPACK_IMPORTED_MODULE_4__.$)('html').addEventListener('click', ({ target }) => {
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

/***/ "./src/js/Calendar.js":
/*!****************************!*\
  !*** ./src/js/Calendar.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Calendar)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");


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

/***/ "./src/js/CalendarGrid.js":
/*!********************************!*\
  !*** ./src/js/CalendarGrid.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CalendarGrid)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");


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

/***/ "./src/js/CalendarNav.js":
/*!*******************************!*\
  !*** ./src/js/CalendarNav.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CalendarNav)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");


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

/***/ "./src/js/Picker.js":
/*!**************************!*\
  !*** ./src/js/Picker.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Picker)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");


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

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW9DO0FBQ0k7QUFDTTtBQUNFO0FBTXpCOztBQUV2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixxREFBTTtBQUMzQjtBQUNBLEdBQUc7QUFDSCx1QkFBdUIsdURBQVEsR0FBRywrQkFBK0I7QUFDakUsMEJBQTBCLDBEQUFXO0FBQ3JDO0FBQ0EsR0FBRztBQUNILDJCQUEyQiwyREFBWTtBQUN2QztBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMkJBQTJCLFFBQVE7QUFDbkM7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQyw4REFBZ0I7QUFDckQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLDhEQUFnQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLFFBQVE7QUFDL0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwyREFBYTtBQUM3Qjs7QUFFQSxFQUFFLCtDQUFDLHNDQUFzQyxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzlIK0I7O0FBRWhCLG9CQUFvQixNQUFNO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsNENBQUM7QUFDbkIsd0RBQXdELEtBQUs7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1pvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHdCQUF3QiwrQkFBK0I7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsNENBQUM7QUFDbkI7O0FBRUE7QUFDQTs7QUFFQSxRQUFRLG1EQUFRO0FBQ2hCLFFBQVEsa0RBQU87QUFDZixRQUFRLHNEQUFXO0FBQ25CLFFBQVEsc0RBQVc7QUFDbkIsbUNBQW1DLHFEQUFVO0FBQzdDOztBQUVBO0FBQ0EsdURBQXVELEtBQUs7QUFDNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsUUFBUTtBQUNwRTtBQUNBO0FBQ0EseUJBQXlCLDJEQUFnQjtBQUN6QztBQUNBO0FBQ0E7QUFDQSxzREFBc0QsZ0JBQWdCO0FBQ3RFLFlBQVk7QUFDWjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RStCOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHVCQUF1QixhQUFhO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsNENBQUM7QUFDbkIsZ0JBQWdCLDRDQUFDOztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDRDQUFDO0FBQ0wsSUFBSSw0Q0FBQztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQzhDOztBQUUvQixrQkFBa0IsYUFBYTtBQUM5QztBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLDRDQUFDOztBQUVuQjs7QUFFQTtBQUNBLHdDQUF3Qyx3REFBYTtBQUNyRDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QyxrQkFBa0IsZUFBZTtBQUNqQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sa0JBQWtCO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSw0QkFBNEI7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNEJBQTRCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFhRTs7Ozs7OztVQzFHRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjJCOztBQUUzQjtBQUNBLE1BQU0sK0NBQUc7QUFDVCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvLi9zcmMvQXBwLmpzIiwid2VicGFjazovL2NhbGVuZGFyLWRhdGVfcGlja2VyLy4vc3JjL2pzL0NhbGVuZGFyLmpzIiwid2VicGFjazovL2NhbGVuZGFyLWRhdGVfcGlja2VyLy4vc3JjL2pzL0NhbGVuZGFyR3JpZC5qcyIsIndlYnBhY2s6Ly9jYWxlbmRhci1kYXRlX3BpY2tlci8uL3NyYy9qcy9DYWxlbmRhck5hdi5qcyIsIndlYnBhY2s6Ly9jYWxlbmRhci1kYXRlX3BpY2tlci8uL3NyYy9qcy9QaWNrZXIuanMiLCJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvLi9zcmMvanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhbGVuZGFyLWRhdGVfcGlja2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2FsZW5kYXItZGF0ZV9waWNrZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYWxlbmRhci1kYXRlX3BpY2tlci8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQaWNrZXIgZnJvbSAnLi9qcy9QaWNrZXIuanMnO1xuaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vanMvQ2FsZW5kYXIuanMnO1xuaW1wb3J0IENhbGVuZGFyTmF2IGZyb20gJy4vanMvQ2FsZW5kYXJOYXYuanMnO1xuaW1wb3J0IENhbGVuZGFyR3JpZCBmcm9tICcuL2pzL0NhbGVuZGFyR3JpZC5qcyc7XG5pbXBvcnQge1xuICAkLFxuICBnZXRQcmV2TW9udGhEYXRlLFxuICBnZXROZXh0TW9udGhEYXRlLFxuICBnZXREYXRlU3RyaW5nLFxufSBmcm9tICcuL2pzL3V0aWxzLmpzJztcblxuY29uc3QgVE9EQVkgPSBuZXcgRGF0ZSgpO1xuXG5jb25zdCBHUklEX1VOSVRfVFlQRSA9IHtcbiAgREFURTogJ2RhdGUnLFxuICBEQVk6ICdkYXknLFxufTtcbmNvbnN0IEJVVFRPTl9UWVBFID0ge1xuICBQUkVWOiAncHJldicsXG4gIE5FWFQ6ICduZXh0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgdGhpcy5zdGF0ZSA9IHtcbiAgICBzZWxlY3RlZERhdGU6IG51bGwsXG4gICAgY3VycmVudFZpZXdEYXRlOiBUT0RBWSxcbiAgICBpc09wZW46IGZhbHNlLFxuICAgIGNhbGVuZGFyU2l6ZTogMzAwLFxuICB9O1xuXG4gIGNvbnN0IHBpY2tlciA9IG5ldyBQaWNrZXIoe1xuICAgIGhhbmRsZUNsaWNrOiAoKSA9PiB0aGlzLnRvZ2dsZUNhbGVuZGFyKCksXG4gIH0pO1xuICBjb25zdCBjYWxlbmRhciA9IG5ldyBDYWxlbmRhcih7IHNpemU6IHRoaXMuc3RhdGUuY2FsZW5kYXJTaXplIH0pO1xuICBjb25zdCBjYWxlbmRhck5hdiA9IG5ldyBDYWxlbmRhck5hdih7XG4gICAgaGFuZGxlQ2xpY2s6IGV2ZW50ID0+IHRoaXMubmF2QnV0dG9uQ2xpY2soZXZlbnQpLFxuICB9KTtcbiAgY29uc3QgY2FsZW5kYXJHcmlkID0gbmV3IENhbGVuZGFyR3JpZCh7XG4gICAgc2VsZWN0ZWREYXRlOiB0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSxcbiAgICBoYW5kbGVEYXRlQ2xpY2s6IGV2ZW50ID0+IHRoaXMuc2VsZWN0RGF0ZShldmVudCksXG4gIH0pO1xuXG4gIHRoaXMudG9nZ2xlQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zdGF0ZS5pc09wZW4gPSAhdGhpcy5zdGF0ZS5pc09wZW47XG4gICAgdGhpcy5zdGF0ZS5pc09wZW4gPyB0aGlzLm9wZW5DYWxlbmRhcigpIDogdGhpcy5jbG9zZUNhbGVuZGFyKCk7XG4gIH07XG5cbiAgdGhpcy5vcGVuQ2FsZW5kYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50Vmlld0RhdGUgPSB0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSB8fCBUT0RBWTtcbiAgICBjYWxlbmRhci5vcGVuKCk7XG4gICAgY2FsZW5kYXJOYXYucmVuZGVyVGl0bGUodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUgfHwgVE9EQVkpO1xuICAgIGNhbGVuZGFyR3JpZC5yZW5kZXIodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUgfHwgVE9EQVkpO1xuICB9O1xuXG4gIHRoaXMuY2xvc2VDYWxlbmRhciA9ICgpID0+IGNhbGVuZGFyLmNsb3NlKCk7XG5cbiAgdGhpcy5uYXZCdXR0b25DbGljayA9ICh7IHRhcmdldCB9KSA9PiB7XG4gICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSAhPT0gJ2J1dHRvbicpIHJldHVybjtcblxuICAgIHN3aXRjaCAodGFyZ2V0LmRhdGFzZXQudHlwZSkge1xuICAgICAgY2FzZSBCVVRUT05fVFlQRS5QUkVWOlxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRWaWV3RGF0ZSA9IGdldFByZXZNb250aERhdGUoXG4gICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50Vmlld0RhdGVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQlVUVE9OX1RZUEUuTkVYVDpcbiAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50Vmlld0RhdGUgPSBnZXROZXh0TW9udGhEYXRlKFxuICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudFZpZXdEYXRlXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhbGVuZGFyTmF2LnJlbmRlclRpdGxlKHRoaXMuc3RhdGUuY3VycmVudFZpZXdEYXRlKTtcbiAgICBjYWxlbmRhckdyaWQucmVuZGVyKHRoaXMuc3RhdGUuY3VycmVudFZpZXdEYXRlKTtcbiAgfTtcblxuICB0aGlzLnNlbGVjdERhdGUgPSAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGlmICh0YXJnZXQuZGF0YXNldC51bml0ICE9PSBHUklEX1VOSVRfVFlQRS5EQVRFKSByZXR1cm47XG5cbiAgICBjb25zdCBjbGlja2VkRGF0ZSA9ICt0YXJnZXQudGV4dENvbnRlbnQudHJpbSgpO1xuICAgIGNvbnN0IHllYXIgPSB0aGlzLnN0YXRlLmN1cnJlbnRWaWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgbGV0IG1vbnRoID0gdGhpcy5zdGF0ZS5jdXJyZW50Vmlld0RhdGUuZ2V0TW9udGgoKTtcbiAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJldicpKSBtb250aCAtPSAxO1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXh0JykpIG1vbnRoICs9IDE7XG5cbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBjbGlja2VkRGF0ZSk7XG4gICAgY2FsZW5kYXJHcmlkLnN0YXRlLnNlbGVjdGVkRGF0ZSA9IHRoaXMuc3RhdGUuc2VsZWN0ZWREYXRlO1xuICAgIHRoaXMuc3RhdGUuaXNPcGVuID0gZmFsc2U7XG4gICAgY2FsZW5kYXIuY2xvc2UoKTtcbiAgICBwaWNrZXIucmVuZGVyUGlja2VyVmFsdWUodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUpO1xuICAgIGNvbnNvbGUubG9nKGdldERhdGVTdHJpbmcodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUpKTtcbiAgfTtcblxuICAkKCdodG1sJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoeyB0YXJnZXQgfSkgPT4ge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaXNDYWxlbmRhclVJKHRhcmdldCkgfHxcbiAgICAgIHRhcmdldC5jbGFzc05hbWUgPT09ICdwaWNrZXInIHx8XG4gICAgICB0aGlzLnN0YXRlLmlzT3BlbiA9PT0gZmFsc2VcbiAgICApXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnN0YXRlLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuY2xvc2VDYWxlbmRhcigpO1xuICB9KTtcblxuICB0aGlzLmlzQ2FsZW5kYXJVSSA9ICRlbGVtZW50ID0+IHtcbiAgICBsZXQgaXNDaGlsZE9mQ2FsZW5kYXIgPSBmYWxzZTtcblxuICAgIGNvbnN0IGZpbmRQYXJlbnRFbGVtZW50ID0gJGNoaWxkID0+IHtcbiAgICAgIGxldCAkcGFyZW50ID0gJGNoaWxkLnBhcmVudEVsZW1lbnQ7XG4gICAgICBpZiAoISRwYXJlbnQpIHtcbiAgICAgICAgaXNDaGlsZE9mQ2FsZW5kYXIgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCRwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYWxlbmRhcicpKSB7XG4gICAgICAgIGlzQ2hpbGRPZkNhbGVuZGFyID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZmluZFBhcmVudEVsZW1lbnQoJHBhcmVudCk7XG4gICAgfTtcbiAgICBmaW5kUGFyZW50RWxlbWVudCgkZWxlbWVudCk7XG5cbiAgICByZXR1cm4gaXNDaGlsZE9mQ2FsZW5kYXI7XG4gIH07XG59XG4iLCJpbXBvcnQgeyAkIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENhbGVuZGFyKHsgc2l6ZSB9KSB7XG4gIGlmICghbmV3LnRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2FsZW5kYXLqsIAgbmV366GcIO2YuOy2nOuQmOyngCDslYrsnYwnKTtcbiAgfVxuXG4gIHRoaXMuJGVsZW1lbnQgPSAkKCcuY2FsZW5kYXInKTtcbiAgdGhpcy4kZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jYWxlbmRhci1zaXplJywgYCR7c2l6ZX1weGApO1xuXG4gIHRoaXMub3BlbiA9ICgpID0+IHtcbiAgICB0aGlzLiRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2Nsb3NlJyk7XG4gICAgdGhpcy4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgdGhpcy4kZWxlbWVudC5mb2N1cygpO1xuICB9O1xuXG4gIHRoaXMuY2xvc2UgPSAoKSA9PiB7XG4gICAgdGhpcy4kZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgdGhpcy4kZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtcbiAgJCxcbiAgZ2V0Q2FsZW5kYXJEYXRlcyxcbiAgaXNTYW1lRGF0ZSxcbiAgaXNTdW5kYXksXG4gIGlzVG9kYXksXG4gIGlzUHJldk1vbnRoLFxuICBpc05leHRNb250aCxcbn0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IERBWV9OQU1FID0gWydTVU4nLCAnTU9OJywgJ1RVRScsICdXRUQnLCAnVEhVJywgJ0ZSSScsICdTQVQnXTtcbmNvbnN0IFVOSVRfVFlQRSA9IHtcbiAgQkFTSUM6ICdiYXNpYycsXG4gIFRPREFZOiAndG9kYXknLFxuICBTVU5EQVk6ICdzdW5kYXknLFxuICBTRUxFQ1RFRDogJ3NlbGVjdGVkJyxcbiAgUFJFVjogJ3ByZXYnLFxuICBORVhUOiAnbmV4dCcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDYWxlbmRhckdyaWQoeyBzZWxlY3RlZERhdGUsIGhhbmRsZURhdGVDbGljayB9KSB7XG4gIGlmICghbmV3LnRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2FsZW5kYXJy6rCAIG5ld+uhnCDtmLjstpzrkJjsp4Ag7JWK7J2MJyk7XG4gIH1cblxuICB0aGlzLnN0YXRlID0ge1xuICAgIHNlbGVjdGVkRGF0ZTogc2VsZWN0ZWREYXRlLFxuICB9O1xuXG4gIHRoaXMuJGVsZW1lbnQgPSAkKCcuY2FsZW5kYXItZ3JpZCcpO1xuICB0aGlzLiRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRGF0ZUNsaWNrKTtcblxuICB0aGlzLmdldFVuaXRUeXBlc1N0cmluZyA9IChiYXNlRGF0ZSwgZGF0ZSkgPT4ge1xuICAgIGNvbnN0IHR5cGVzID0gW107XG5cbiAgICBpZiAoaXNTdW5kYXkoZGF0ZSkpIHR5cGVzLnB1c2goVU5JVF9UWVBFLlNVTkRBWSk7XG4gICAgaWYgKGlzVG9kYXkoZGF0ZSkpIHR5cGVzLnB1c2goVU5JVF9UWVBFLlRPREFZKTtcbiAgICBpZiAoaXNQcmV2TW9udGgoYmFzZURhdGUsIGRhdGUpKSB0eXBlcy5wdXNoKFVOSVRfVFlQRS5QUkVWKTtcbiAgICBpZiAoaXNOZXh0TW9udGgoYmFzZURhdGUsIGRhdGUpKSB0eXBlcy5wdXNoKFVOSVRfVFlQRS5ORVhUKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5zZWxlY3RlZERhdGUgJiYgaXNTYW1lRGF0ZShkYXRlLCB0aGlzLnN0YXRlLnNlbGVjdGVkRGF0ZSkpXG4gICAgICB0eXBlcy5wdXNoKFVOSVRfVFlQRS5TRUxFQ1RFRCk7XG5cbiAgICByZXR1cm4gdHlwZXNcbiAgICAgIC5yZWR1Y2UoKHR5cGVzU3RyaW5nLCB0eXBlKSA9PiB0eXBlc1N0cmluZyArIGAgJHt0eXBlfWAsICcnKVxuICAgICAgLnRyaW0oKTtcbiAgfTtcblxuICB0aGlzLmNyZWF0ZUdyaWRIVE1MID0gYmFzZURhdGUgPT4ge1xuICAgIGNvbnN0IGRheU5hbWVzSHRtbCA9IERBWV9OQU1FLnJlZHVjZShcbiAgICAgIChodG1sLCBkYXlOYW1lKSA9PlxuICAgICAgICBodG1sICsgYDxsaSBkYXRhLXVuaXQ9XCJkYXlcIiBjbGFzcz1cImdyaWQtdW5pdCBkYXlcIj4ke2RheU5hbWV9PC9saT5gLFxuICAgICAgJydcbiAgICApO1xuICAgIGNvbnN0IGFsbERhdGVzSHRtbCA9IGdldENhbGVuZGFyRGF0ZXMoYmFzZURhdGUpLnJlZHVjZSgoaHRtbCwgZGF0ZSkgPT4ge1xuICAgICAgY29uc3QgZGF0ZVR5cGVzU3RyaW5nID0gdGhpcy5nZXRVbml0VHlwZXNTdHJpbmcoYmFzZURhdGUsIGRhdGUpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgaHRtbCArXG4gICAgICAgIGA8bGkgZGF0YS11bml0PVwiZGF0ZVwiIGNsYXNzPVwiZ3JpZC11bml0IGRhdGUgJHtkYXRlVHlwZXNTdHJpbmd9XCI+XG4gICAgICAgICAgJHtkYXRlLmdldERhdGUoKX1cbiAgICAgICAgPC9saT5gXG4gICAgICApO1xuICAgIH0sICcnKTtcblxuICAgIHJldHVybiBkYXlOYW1lc0h0bWwgKyBhbGxEYXRlc0h0bWw7XG4gIH07XG5cbiAgdGhpcy5yZW5kZXIgPSBkYXRlID0+IHtcbiAgICB0aGlzLiRlbGVtZW50LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgIHRoaXMuJGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzLmNyZWF0ZUdyaWRIVE1MKGRhdGUpKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7ICQgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgTU9OVEhfTkFNRSA9IFtcbiAgJ0phbnVhcnknLFxuICAnRmVicnVhcnknLFxuICAnTWFyY2gnLFxuICAnQXByaWwnLFxuICAnTWF5JyxcbiAgJ0p1bmUnLFxuICAnSnVseScsXG4gICdBdWd1c3QnLFxuICAnU2VwdGVtYmVyJyxcbiAgJ09jdG9iZXInLFxuICAnTm92ZW1iZXInLFxuICAnRGVjZW1iZXInLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2FsZW5kYXJOYXYoeyBoYW5kbGVDbGljayB9KSB7XG4gIGlmICghbmV3LnRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2FsZW5kYXJy6rCAIG5ld+uhnCDtmLjstpzrkJjsp4Ag7JWK7J2MJyk7XG4gIH1cblxuICB0aGlzLiRlbGVtZW50ID0gJCgnLmNhbGVuZGFyLW5hdicpO1xuICB0aGlzLiR0aXRsZSA9ICQoJy5jYWxlbmRhci10aXRsZScpO1xuXG4gIHRoaXMuJGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljayk7XG5cbiAgdGhpcy5yZW5kZXJUaXRsZSA9IGRhdGUgPT4ge1xuICAgIGNvbnN0IG1vbnRoTmFtZSA9IE1PTlRIX05BTUVbZGF0ZS5nZXRNb250aCgpXTtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICQoJy5tb250aCcsIHRoaXMuJHRpdGxlKS50ZXh0Q29udGVudCA9IG1vbnRoTmFtZTtcbiAgICAkKCcueWVhcicsIHRoaXMuJHRpdGxlKS50ZXh0Q29udGVudCA9IHllYXI7XG4gIH07XG59XG4iLCJpbXBvcnQgeyAkLCBnZXREYXRlU3RyaW5nIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBpY2tlcih7IGhhbmRsZUNsaWNrIH0pIHtcbiAgaWYgKCFuZXcudGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQaWNrZXLqsIAgbmV366GcIO2YuOy2nOuQmOyngCDslYrsnYwnKTtcbiAgfVxuXG4gIHRoaXMuJGVsZW1lbnQgPSAkKCcucGlja2VyJyk7XG5cbiAgdGhpcy4kZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrKTtcblxuICB0aGlzLnJlbmRlclBpY2tlclZhbHVlID0gZGF0ZSA9PiB7XG4gICAgdGhpcy4kZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgZ2V0RGF0ZVN0cmluZyhkYXRlKSk7XG4gIH07XG59XG4iLCJjb25zdCAkID0gKHNlbGVjdG9yLCB0YXJnZXQgPSBkb2N1bWVudCkgPT4gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG5jb25zdCBnZXREYXRlU3RyaW5nID0gKGRhdGUsIGpvaW4gPSAnLScpID0+IHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBgMCR7ZGF0ZS5nZXRNb250aCgpICsgMX1gLnNsaWNlKC0yKTtcbiAgY29uc3QgZGF5ID0gYDAke2RhdGUuZ2V0RGF0ZSgpfWAuc2xpY2UoLTIpO1xuICBjb25zdCBzdHJpbmdEYXRlID0geWVhciArIGpvaW4gKyBtb250aCArIGpvaW4gKyBkYXk7XG5cbiAgcmV0dXJuIHN0cmluZ0RhdGU7XG59O1xuXG5jb25zdCBnZXRDYWxlbmRhckRhdGVzID0gZGF0ZSA9PiB7XG4gIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICBjb25zdCBsYXN0RGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xuICBjb25zdCBwcmV2TW9udGhEYXRlQ291bnQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCkuZ2V0RGF5KCk7XG4gIGNvbnN0IG5leHRNb250aERhdGVDb3VudCA9IDcgLSAoKHByZXZNb250aERhdGVDb3VudCArIGxhc3REYXRlKSAlIDcpO1xuXG4gIGNvbnN0IHRoaXNNb250aERhdGVzID0gQXJyYXkuZnJvbShcbiAgICB7IGxlbmd0aDogbGFzdERhdGUgfSxcbiAgICAoXywgaSkgPT4gbmV3IERhdGUoeWVhciwgbW9udGgsIGkgKyAxKVxuICApO1xuXG4gIGNvbnN0IHByZXZNb250aERhdGVzID1cbiAgICBwcmV2TW9udGhEYXRlQ291bnQgPCA3XG4gICAgICA/IEFycmF5LmZyb20oXG4gICAgICAgICAgeyBsZW5ndGg6IHByZXZNb250aERhdGVDb3VudCB9LFxuICAgICAgICAgIChfLCBpKSA9PiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMCAtIGkpXG4gICAgICAgICkucmV2ZXJzZSgpXG4gICAgICA6IFtdO1xuXG4gIGNvbnN0IG5leHRNb250aERhdGVzID1cbiAgICBuZXh0TW9udGhEYXRlQ291bnQgPCA3XG4gICAgICA/IEFycmF5LmZyb20oXG4gICAgICAgICAgeyBsZW5ndGg6IG5leHRNb250aERhdGVDb3VudCB9LFxuICAgICAgICAgIChfLCBpKSA9PiBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgbGFzdERhdGUgKyBpICsgMSlcbiAgICAgICAgKVxuICAgICAgOiBbXTtcblxuICByZXR1cm4gWy4uLnByZXZNb250aERhdGVzLCAuLi50aGlzTW9udGhEYXRlcywgLi4ubmV4dE1vbnRoRGF0ZXNdO1xufTtcblxuY29uc3QgZ2V0UHJldk1vbnRoRGF0ZSA9IGRhdGUgPT4ge1xuICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcblxuICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxKTtcbn07XG5cbmNvbnN0IGdldE5leHRNb250aERhdGUgPSBkYXRlID0+IHtcbiAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG5cbiAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoICsgMSk7XG59O1xuXG5jb25zdCBpc1NhbWVEYXRlID0gKGRhdGUxLCBkYXRlMikgPT4ge1xuICByZXR1cm4gKFxuICAgIGRhdGUxLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUyLmdldEZ1bGxZZWFyKCkgJiZcbiAgICBkYXRlMS5nZXRNb250aCgpID09PSBkYXRlMi5nZXRNb250aCgpICYmXG4gICAgZGF0ZTEuZ2V0RGF0ZSgpID09PSBkYXRlMi5nZXREYXRlKClcbiAgKTtcbn07XG5cbmNvbnN0IGlzVG9kYXkgPSBkYXRlID0+IHtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICByZXR1cm4gKFxuICAgIGRhdGUuZ2V0RGF0ZSgpID09IHRvZGF5LmdldERhdGUoKSAmJlxuICAgIGRhdGUuZ2V0TW9udGgoKSA9PSB0b2RheS5nZXRNb250aCgpICYmXG4gICAgZGF0ZS5nZXRGdWxsWWVhcigpID09IHRvZGF5LmdldEZ1bGxZZWFyKClcbiAgKTtcbn07XG5cbmNvbnN0IGlzU3VuZGF5ID0gZGF0ZSA9PiBkYXRlLmdldERheSgpID09PSAwO1xuXG5jb25zdCBpc1ByZXZNb250aCA9IChiYXNlRGF0ZSwgZGF0ZSkgPT4ge1xuICBpZiAoYmFzZURhdGUuZ2V0RnVsbFllYXIoKSA+PSBkYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICBpZiAoYmFzZURhdGUuZ2V0TW9udGgoKSA9PT0gMCAmJiBkYXRlLmdldE1vbnRoKCkgPT09IDExKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGJhc2VEYXRlLmdldE1vbnRoKCkgPiBkYXRlLmdldE1vbnRoKCk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgaXNOZXh0TW9udGggPSAoYmFzZURhdGUsIGRhdGUpID0+IHtcbiAgaWYgKGJhc2VEYXRlLmdldEZ1bGxZZWFyKCkgPD0gZGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgaWYgKGJhc2VEYXRlLmdldE1vbnRoKCkgPT09IDExICYmIGRhdGUuZ2V0TW9udGgoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBiYXNlRGF0ZS5nZXRNb250aCgpIDwgZGF0ZS5nZXRNb250aCgpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCB7XG4gICQsXG4gIGdldERhdGVTdHJpbmcsXG4gIGdldENhbGVuZGFyRGF0ZXMsXG4gIGdldFByZXZNb250aERhdGUsXG4gIGdldE5leHRNb250aERhdGUsXG4gIGlzU2FtZURhdGUsXG4gIGlzVG9kYXksXG4gIGlzU3VuZGF5LFxuICBpc1ByZXZNb250aCxcbiAgaXNOZXh0TW9udGgsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQXBwIGZyb20gJy4vQXBwLmpzJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIG5ldyBBcHAoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9