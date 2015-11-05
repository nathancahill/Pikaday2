var Pikaday2 =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0).default;
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _lodash3 = __webpack_require__(2);

	var _lodash4 = _interopRequireDefault(_lodash3);

	var _lodash5 = __webpack_require__(3);

	var _lodash6 = _interopRequireDefault(_lodash5);

	var _events = __webpack_require__(13);

	var _classutils = __webpack_require__(14);

	var _dateutils = __webpack_require__(15);

	var _templating = __webpack_require__(16);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	/* global moment:false */

	var hasMoment = typeof moment === 'function';

	var Pikaday2 = function Pikaday2(options) {
	    _classCallCheck(this, Pikaday2);

	    _initialiseProps.call(this);

	    var opts = this.config(options);

	    this.el = document.createElement('div');
	    this.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

	    (0, _events.addEvent)(this.el, 'mousedown', this._onMouseDown, true);
	    (0, _events.addEvent)(this.el, 'touchend', this._onMouseDown, true);
	    (0, _events.addEvent)(this.el, 'change', this._onChange);

	    if (opts.field) {
	        if (opts.container) {
	            opts.container.appendChild(this.el);
	        } else if (opts.bound) {
	            document.body.appendChild(this.el);
	        } else {
	            opts.field.parentNode.insertBefore(this.el, opts.field.nextSibling);
	        }

	        (0, _events.addEvent)(opts.field, 'change', this._onInputChange);

	        if (!opts.defaultDate) {
	            if (opts.field.value) {
	                if (hasMoment) {
	                    opts.defaultDate = moment(opts.field.value, opts.format).toDate();
	                } else {
	                    opts.defaultDate = new Date(Date.parse(opts.field.value));
	                }

	                opts.setDefaultDate = true;
	            }
	        }
	    }

	    if ((0, _lodash2.default)(opts.defaultDate)) {
	        if (opts.setDefaultDate) {
	            this.setDate(opts.defaultDate, true);
	        } else {
	            this.gotoDate(opts.defaultDate);
	        }
	    } else {
	        this.gotoDate(new Date());
	    }

	    if (opts.bound) {
	        this.hide();
	        this.el.className += ' is-bound';

	        (0, _events.addEvent)(opts.trigger, 'click', this._onInputClick);
	        (0, _events.addEvent)(opts.trigger, 'focus', this._onInputFocus);
	        (0, _events.addEvent)(opts.trigger, 'blur', this._onInputBlur);
	    } else {
	        this.show();
	    }
	}

	// Public API

	// Events

	;

	var _initialiseProps = function _initialiseProps() {
	    var _this = this;

	    this.config = function (options) {
	        if (!_this.options) {
	            _this.options = (0, _lodash6.default)({}, Pikaday2.defaults, true);
	        }

	        var opts = (0, _lodash6.default)(_this.options, options, true);

	        opts.isRTL = !!opts.isRTL;

	        opts.field = opts.field && opts.field.nodeName ? opts.field : null;

	        opts.theme = typeof opts.theme === 'string' && opts.theme ? opts.theme : null;

	        opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

	        opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field;

	        opts.disableWeekends = !!opts.disableWeekends;

	        opts.disableDayFn = typeof opts.disableDayFn === 'function' ? opts.disableDayFn : null;

	        var nom = parseInt(opts.numberOfMonths, 10) || 1;
	        opts.numberOfMonths = nom > 4 ? 4 : nom;

	        if (!(0, _lodash2.default)(opts.minDate)) {
	            opts.minDate = false;
	        }

	        if (!(0, _lodash2.default)(opts.maxDate)) {
	            opts.maxDate = false;
	        }

	        if (opts.minDate && opts.maxDate && opts.maxDate < opts.minDate) {
	            opts.maxDate = opts.minDate = false;
	        }

	        if (opts.minDate) {
	            _this.setMinDate(opts.minDate);
	        }

	        if (opts.maxDate) {
	            _this.setMaxDate(opts.maxDate);
	        }

	        if ((0, _lodash4.default)(opts.yearRange)) {
	            var fallback = new Date().getFullYear() - 10;
	            opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
	            opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
	        } else {
	            opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || Pikaday2.defaults.yearRange;
	            if (opts.yearRange > 100) {
	                opts.yearRange = 100;
	            }
	        }

	        return opts;
	    };

	    this.toString = function (format) {
	        return !(0, _lodash2.default)(_this._d) ? '' : hasMoment ? moment(_this._d).format(format || _this.options.format) : _this._d.toDateString();
	    };

	    this.getMoment = function () {
	        return hasMoment ? moment(_this._d) : null;
	    };

	    this.setMoment = function (date, preventOnSelect) {
	        if (hasMoment && moment.isMoment(date)) {
	            _this.setDate(date.toDate(), preventOnSelect);
	        }
	    };

	    this.getDate = function () {
	        return (0, _lodash2.default)(_this._d) ? new Date(_this._d.getTime()) : null;
	    };

	    this.setDate = function (date, preventOnSelect) {
	        if (!date) {
	            _this._d = null;

	            if (_this.options.field) {
	                _this.options.field.value = '';
	                (0, _events.fireEvent)(_this.options.field, 'change', { firedBy: _this });
	            }

	            return _this.draw();
	        }

	        if (typeof date === 'string') {
	            date = new Date(Date.parse(date));
	        }

	        if (!(0, _lodash2.default)(date)) {
	            return;
	        }

	        var min = _this.options.minDate,
	            max = _this.options.maxDate;

	        if ((0, _lodash2.default)(min) && date < min) {
	            date = min;
	        } else if ((0, _lodash2.default)(max) && date > max) {
	            date = max;
	        }

	        _this._d = new Date(date.getTime());

	        (0, _dateutils.setToStartOfDay)(_this._d);

	        _this.gotoDate(_this._d);

	        if (_this.options.field) {
	            _this.options.field.value = _this.toString();
	            (0, _events.fireEvent)(_this.options.field, 'change', { firedBy: _this });
	        }

	        if (!preventOnSelect && typeof _this.options.onSelect === 'function') {
	            _this.options.onSelect.call(_this, _this.getDate());
	        }
	    };

	    this.gotoDate = function (date) {
	        var newCalendar = true;

	        if (!(0, _lodash2.default)(date)) {
	            return;
	        }

	        if (_this.calendars) {
	            var firstVisibleDate = new Date(_this.calendars[0].year, _this.calendars[0].month, 1),
	                lastVisibleDate = new Date(_this.calendars[_this.calendars.length - 1].year, _this.calendars[_this.calendars.length - 1].month, 1),
	                visibleDate = date.getTime();
	            // get the end of the month
	            lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
	            lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
	            newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
	        }

	        if (newCalendar) {
	            _this.calendars = [{
	                month: date.getMonth(),
	                year: date.getFullYear()
	            }];
	            if (_this.options.mainCalendar === 'right') {
	                _this.calendars[0].month += 1 - _this.options.numberOfMonths;
	            }
	        }

	        _this.adjustCalendars();
	    };

	    this.adjustCalendars = function () {
	        _this.calendars[0] = (0, _dateutils.adjustCalendar)(_this.calendars[0]);

	        for (var c = 1; c < _this.options.numberOfMonths; c++) {
	            _this.calendars[c] = (0, _dateutils.adjustCalendar)({
	                month: _this.calendars[0].month + c,
	                year: _this.calendars[0].year
	            });
	        }

	        _this.draw();
	    };

	    this.gotoToday = function () {
	        _this.gotoDate(new Date());
	    };

	    this.gotoMonth = function (month) {
	        if (!isNaN(month)) {
	            _this.calendars[0].month = parseInt(month, 10);
	            _this.adjustCalendars();
	        }
	    };

	    this.nextMonth = function () {
	        _this.calendars[0].month++;
	        _this.adjustCalendars();
	    };

	    this.prevMonth = function () {
	        _this.calendars[0].month--;
	        _this.adjustCalendars();
	    };

	    this.gotoYear = function (year) {
	        if (!isNaN(year)) {
	            _this.calendars[0].year = parseInt(year, 10);
	            _this.adjustCalendars();
	        }
	    };

	    this.setMinDate = function (value) {
	        (0, _dateutils.setToStartOfDay)(value);

	        _this.options.minDate = value;
	        _this.options.minYear = value.getFullYear();
	        _this.options.minMonth = value.getMonth();
	    };

	    this.setMaxDate = function (value) {
	        (0, _dateutils.setToStartOfDay)(value);

	        _this.options.maxDate = value;
	        _this.options.maxYear = value.getFullYear();
	        _this.options.maxMonth = value.getMonth();
	    };

	    this.setStartRange = function (value) {
	        _this.options.startRange = value;
	    };

	    this.setEndRange = function (value) {
	        _this.options.endRange = value;
	    };

	    this.draw = function (force) {
	        if (!_this.visible && !force) {
	            return;
	        }

	        var opts = _this.options,
	            minYear = opts.minYear,
	            maxYear = opts.maxYear,
	            minMonth = opts.minMonth,
	            maxMonth = opts.maxMonth,
	            html = '';

	        if (_this._y <= minYear) {
	            _this._y = minYear;

	            if (!isNaN(minMonth) && _this._m < minMonth) {
	                _this._m = minMonth;
	            }
	        }

	        if (_this._y >= maxYear) {
	            _this._y = maxYear;

	            if (!isNaN(maxMonth) && _this._m > maxMonth) {
	                _this._m = maxMonth;
	            }
	        }

	        for (var c = 0; c < opts.numberOfMonths; c++) {
	            html += '<div class="pika-lendar">' + (0, _templating.renderTitle)(opts, c, _this.calendars[c].year, _this.calendars[c].month, _this.calendars[0].year) + _this.render(_this.calendars[c].year, _this.calendars[c].month) + '</div>';
	        }

	        _this.el.innerHTML = html;

	        if (opts.bound) {
	            if (opts.field.type !== 'hidden') {
	                setTimeout(function () {
	                    opts.trigger.focus();
	                }, 1);
	            }
	        }

	        if (typeof _this.options.onDraw === 'function') {
	            setTimeout(function () {
	                _this.options.onDraw.call(_this);
	            }, 0);
	        }
	    };

	    this.adjustPosition = function () {
	        var field = undefined,
	            pEl = undefined,
	            width = undefined,
	            height = undefined,
	            viewportWidth = undefined,
	            viewportHeight = undefined,
	            scrollTop = undefined,
	            left = undefined,
	            top = undefined,
	            clientRect = undefined,
	            opts = _this.options;

	        if (opts.container) return;

	        _this.el.style.position = 'absolute';

	        field = opts.trigger;
	        pEl = field;

	        width = _this.el.offsetWidth;
	        height = _this.el.offsetHeight;

	        viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	        viewportHeight = window.innerHeight || document.documentElement.clientHeight;

	        scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

	        if (typeof field.getBoundingClientRect === 'function') {
	            clientRect = field.getBoundingClientRect();
	            left = clientRect.left + window.pageXOffset;
	            top = clientRect.bottom + window.pageYOffset;
	        } else {
	            left = pEl.offsetLeft;
	            top = pEl.offsetTop + pEl.offsetHeight;
	            while (pEl = pEl.offsetParent) {
	                left += pEl.offsetLeft;
	                top += pEl.offsetTop;
	            }
	        }

	        // default position is bottom & left
	        if (opts.reposition && left + width > viewportWidth || opts.position.indexOf('right') > -1 && left - width + field.offsetWidth > 0) {
	            left = left - width + field.offsetWidth;
	        }
	        if (opts.reposition && top + height > viewportHeight + scrollTop || opts.position.indexOf('top') > -1 && top - height - field.offsetHeight > 0) {
	            top = top - height - field.offsetHeight;
	        }

	        _this.el.style.left = left + 'px';
	        _this.el.style.top = top + 'px';
	    };

	    this.render = function (year, month) {
	        var opts = _this.options,
	            now = new Date(),
	            days = (0, _dateutils.getDaysInMonth)(year, month),
	            before = new Date(year, month, 1).getDay(),
	            data = [],
	            row = [];

	        (0, _dateutils.setToStartOfDay)(now);

	        if (opts.firstDay > 0) {
	            before -= opts.firstDay;

	            if (before < 0) {
	                before += 7;
	            }
	        }

	        var cells = days + before,
	            after = cells;

	        while (after > 7) {
	            after -= 7;
	        }

	        cells += 7 - after;

	        for (var i = 0, r = 0; i < cells; i++) {
	            var day = new Date(year, month, 1 + (i - before)),
	                isSelected = (0, _lodash2.default)(_this._d) ? (0, _dateutils.compareDates)(day, _this._d) : false,
	                isToday = (0, _dateutils.compareDates)(day, now),
	                isEmpty = i < before || i >= days + before,
	                isStartRange = opts.startRange && (0, _dateutils.compareDates)(opts.startRange, day),
	                isEndRange = opts.endRange && (0, _dateutils.compareDates)(opts.endRange, day),
	                isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
	                isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && (0, _dateutils.isWeekend)(day) || opts.disableDayFn && opts.disableDayFn(day),
	                dayConfig = {
	                day: 1 + (i - before),
	                month: month,
	                year: year,
	                isSelected: isSelected,
	                isToday: isToday,
	                isDisabled: isDisabled,
	                isEmpty: isEmpty,
	                isStartRange: isStartRange,
	                isEndRange: isEndRange,
	                isInRange: isInRange
	            };

	            row.push((0, _templating.renderDay)(dayConfig));

	            if (++r === 7) {
	                if (opts.showWeekNumber) {
	                    row.unshift((0, _templating.renderWeek)(i - before, month, year));
	                }
	                data.push((0, _templating.renderRow)(row, opts.isRTL));
	                row = [];
	                r = 0;
	            }
	        }

	        return (0, _templating.renderTable)(opts, data);
	    };

	    this.isVisible = function () {
	        return _this.visible;
	    };

	    this.show = function () {
	        if (!_this.visible) {
	            (0, _classutils.removeClass)(_this.el, 'is-hidden');

	            _this.visible = true;
	            _this.draw();

	            if (_this.options.bound) {
	                (0, _events.addEvent)(document, 'click', _this._onClick);
	                _this.adjustPosition();
	            }

	            if (typeof _this.options.onOpen === 'function') {
	                _this.options.onOpen.call(_this);
	            }
	        }
	    };

	    this.hide = function () {
	        var v = _this.visible;

	        if (v !== false) {
	            if (_this.options.bound) {
	                (0, _events.removeEvent)(document, 'click', _this._onClick);
	            }

	            _this.el.style.position = 'static'; // reset
	            _this.el.style.left = 'auto';
	            _this.el.style.top = 'auto';

	            (0, _classutils.addClass)(_this.el, 'is-hidden');

	            _this.visible = false;

	            if (v !== undefined && typeof _this.options.onClose === 'function') {
	                _this.options.onClose.call(_this);
	            }
	        }
	    };

	    this.destroy = function () {
	        _this.hide();

	        (0, _events.removeEvent)(_this.el, 'mousedown', _this._onMouseDown, true);
	        (0, _events.removeEvent)(_this.el, 'touchend', _this._onMouseDown, true);
	        (0, _events.removeEvent)(_this.el, 'change', _this._onChange);

	        if (_this.options.field) {
	            (0, _events.removeEvent)(_this.options.field, 'change', _this._onInputChange);

	            if (_this.options.bound) {
	                (0, _events.removeEvent)(_this.options.trigger, 'click', _this._onInputClick);
	                (0, _events.removeEvent)(_this.options.trigger, 'focus', _this._onInputFocus);
	                (0, _events.removeEvent)(_this.options.trigger, 'blur', _this._onInputBlur);
	            }
	        }

	        if (_this.el.parentNode) {
	            _this.el.parentNode.removeChild(_this.el);
	        }
	    };

	    this._onMouseDown = function (e) {
	        if (!_this.visible) {
	            return;
	        }

	        e = e || window.event;

	        var target = e.target || e.srcElement;

	        if (!target) {
	            return;
	        }

	        if (!(0, _classutils.hasClass)(target.parentNode, 'is-disabled')) {
	            if ((0, _classutils.hasClass)(target, 'pika-button') && !(0, _classutils.hasClass)(target, 'is-empty')) {
	                _this.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));

	                if (_this.options.bound) {
	                    setTimeout(function () {
	                        _this.hide();

	                        if (_this.options.field) {
	                            _this.options.field.blur();
	                        }
	                    }, 100);
	                }
	            } else if ((0, _classutils.hasClass)(target, 'pika-prev')) {
	                _this.prevMonth();
	            } else if ((0, _classutils.hasClass)(target, 'pika-next')) {
	                _this.nextMonth();
	            }
	        }

	        if (!(0, _classutils.hasClass)(target, 'pika-select')) {
	            // if this is touch event prevent mouse events emulation
	            if (e.preventDefault) {
	                e.preventDefault();
	            } else {
	                e.returnValue = false;
	                return false;
	            }
	        } else {
	            _this._c = true;
	        }
	    };

	    this._onChange = function (e) {
	        e = e || window.event;

	        var target = e.target || e.srcElement;

	        if (!target) {
	            return;
	        }

	        if ((0, _classutils.hasClass)(target, 'pika-select-month')) {
	            _this.gotoMonth(target.value);
	        } else if ((0, _classutils.hasClass)(target, 'pika-select-year')) {
	            _this.gotoYear(target.value);
	        }
	    };

	    this._onInputChange = function (e) {
	        var date = undefined;

	        if (e.firedBy === _this) {
	            return;
	        }

	        if (hasMoment) {
	            date = moment(_this.options.field.value, _this.options.format);
	            date = date && date.isValid() ? date.toDate() : null;
	        } else {
	            date = new Date(Date.parse(_this.options.field.value));
	        }

	        if ((0, _lodash2.default)(date)) {
	            _this.setDate(date);
	        }

	        if (!_this.visible) {
	            _this.show();
	        }
	    };

	    this._onInputFocus = function () {
	        _this.show();
	    };

	    this._onInputClick = function () {
	        _this.show();
	    };

	    this._onInputBlur = function () {
	        // IE allows pika div to gain focus; catch blur the input field
	        var pEl = document.activeElement;

	        do {
	            if ((0, _classutils.hasClass)(pEl, 'pika-single')) {
	                return;
	            }
	        } while (pEl = pEl.parentNode);

	        if (!_this._c) {
	            _this._b = setTimeout(function () {
	                _this.hide();
	            }, 50);
	        }
	        _this._c = false;
	    };

	    this._onClick = function (e) {
	        e = e || window.event;

	        var target = e.target || e.srcElement,
	            pEl = target;

	        if (!target) {
	            return;
	        }

	        if (!_events.hasEventListeners && (0, _classutils.hasClass)(target, 'pika-select')) {
	            if (!target.onchange) {
	                target.setAttribute('onchange', 'return;');
	                (0, _events.addEvent)(target, 'change', _this._onChange);
	            }
	        }

	        do {
	            if ((0, _classutils.hasClass)(pEl, 'pika-single') || pEl === _this.options.trigger) {
	                return;
	            }
	        } while (pEl = pEl.parentNode);

	        if (_this.visible && target !== _this.options.trigger && pEl !== _this.options.trigger) {
	            _this.hide();
	        }
	    };
	};

	Pikaday2.defaults = {
	    // bind the picker to a form field
	    field: null,

	    // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
	    bound: undefined,

	    // position of the datepicker, relative to the field (default to bottom & left)
	    // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
	    position: 'bottom left',

	    // automatically fit in the viewport even if it means repositioning from the position option
	    reposition: true,

	    // the default output format for `.toString()` and `field` value
	    format: 'YYYY-MM-DD',

	    // the initial date to view when first opened
	    defaultDate: null,

	    // make the `defaultDate` the initial selected value
	    setDefaultDate: false,

	    // first day of week (0: Sunday, 1: Monday etc)
	    firstDay: 0,

	    // the minimum/earliest date that can be selected
	    minDate: null,
	    // the maximum/latest date that can be selected
	    maxDate: null,

	    // number of years either side, or array of upper/lower range
	    yearRange: 10,

	    // show week numbers at head of row
	    showWeekNumber: false,

	    // used internally (don't config outside)
	    minYear: 0,
	    maxYear: 9999,
	    minMonth: undefined,
	    maxMonth: undefined,

	    startRange: null,
	    endRange: null,

	    isRTL: false,

	    // Additional text to append to the year in the calendar title
	    yearSuffix: '',

	    // Render the month after year in the calendar title
	    showMonthAfterYear: false,

	    // how many months are visible
	    numberOfMonths: 1,

	    // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
	    // only used for the first display or when a selected date is not visible
	    mainCalendar: 'left',

	    // Specify a DOM element to render the calendar in
	    container: undefined,

	    // internationalization
	    i18n: {
	        previousMonth: 'Previous Month',
	        nextMonth: 'Next Month',
	        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	    },

	    // Theme Classname
	    theme: null,

	    // callback function
	    onSelect: null,
	    onOpen: null,
	    onClose: null,
	    onDraw: null
	};

	exports.default = Pikaday2;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var dateTag = '[object Date]';

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Date` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isDate(new Date);
	 * // => true
	 *
	 * _.isDate('Mon April 23 2012');
	 * // => false
	 */
	function isDate(value) {
	  return isObjectLike(value) && objToString.call(value) == dateTag;
	}

	module.exports = isDate;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseAssign = __webpack_require__(4),
	    createAssigner = __webpack_require__(9),
	    keys = __webpack_require__(6);

	/**
	 * A specialized version of `_.assign` for customizing assigned values without
	 * support for argument juggling, multiple sources, and `this` binding `customizer`
	 * functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 */
	function assignWith(object, source, customizer) {
	  var index = -1,
	      props = keys(source),
	      length = props.length;

	  while (++index < length) {
	    var key = props[index],
	        value = object[key],
	        result = customizer(value, source[key], key, object, source);

	    if ((result === result ? (result !== value) : (value === value)) ||
	        (value === undefined && !(key in object))) {
	      object[key] = result;
	    }
	  }
	  return object;
	}

	/**
	 * Assigns own enumerable properties of source object(s) to the destination
	 * object. Subsequent sources overwrite property assignments of previous sources.
	 * If `customizer` is provided it is invoked to produce the assigned values.
	 * The `customizer` is bound to `thisArg` and invoked with five arguments:
	 * (objectValue, sourceValue, key, object, source).
	 *
	 * **Note:** This method mutates `object` and is based on
	 * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
	 *
	 * @static
	 * @memberOf _
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	 * // => { 'user': 'fred', 'age': 40 }
	 *
	 * // using a customizer callback
	 * var defaults = _.partialRight(_.assign, function(value, other) {
	 *   return _.isUndefined(value) ? other : value;
	 * });
	 *
	 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var assign = createAssigner(function(object, source, customizer) {
	  return customizer
	    ? assignWith(object, source, customizer)
	    : baseAssign(object, source);
	});

	module.exports = assign;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseCopy = __webpack_require__(5),
	    keys = __webpack_require__(6);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(7),
	    isArguments = __webpack_require__(8),
	    isArray = __webpack_require__(2);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var bindCallback = __webpack_require__(10),
	    isIterateeCall = __webpack_require__(11),
	    restParam = __webpack_require__(12);

	/**
	 * Creates a function that assigns properties of source object(s) to a given
	 * destination object.
	 *
	 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = bindCallback;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isIterateeCall;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fireEvent = exports.removeEvent = exports.addEvent = exports.hasEventListeners = undefined;

	var _lodash = __webpack_require__(3);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hasEventListeners = exports.hasEventListeners = !!window.addEventListener;

	/**
	 * @param  {DOM element} el - DOM element to add event to
	 * @param  {string} e - Event to add
	 * @param  {function} callback - Callback
	 * @param  {boolean} capture - Whether to capture the event
	 */
	var addEvent = exports.addEvent = function addEvent(el, e, callback, capture) {
	    if (hasEventListeners) {
	        el.addEventListener(e, callback, !!capture);
	    } else {
	        el.attachEvent('on' + e, callback);
	    }
	};

	/**
	 * @param  {DOM element} el - DOM element to add event to
	 * @param  {string} e - Event to add
	 * @param  {function} callback - Callback
	 * @param  {boolean} capture - Whether to capture the event
	 */
	var removeEvent = exports.removeEvent = function removeEvent(el, e, callback, capture) {
	    if (hasEventListeners) {
	        el.removeEventListener(e, callback, !!capture);
	    } else {
	        el.detachEvent('on' + e, callback);
	    }
	};

	/**
	 * @param  {DOM element} el - DOM element to fire event on
	 * @param  {string} eventName - Event to fire
	 * @param  {hash} data - Data to fire event with
	 */
	var fireEvent = exports.fireEvent = function fireEvent(el, eventName, data) {
	    var ev = undefined;

	    if (window.document.createEvent) {
	        ev = window.document.createEvent('HTMLEvents');
	        ev.initEvent(eventName, true, false);
	        ev = (0, _lodash2.default)(ev, data);
	        el.dispatchEvent(ev);
	    } else if (window.document.createEventObject) {
	        ev = window.document.createEventObject();
	        ev = (0, _lodash2.default)(ev, data);
	        el.fireEvent('on' + eventName, ev);
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	/**
	 * Trim whitespace from start or end of string
	 * @param   {string} str - The string to trim
	 * @returns {string}
	 */
	var trim = function trim(str) {
	    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	};

	/**
	 * Check if a class is present in an element
	 * @param   {DOM element} el - The DOM element to check
	 * @param   {string} cn - The class to check for
	 * @returns {boolean}
	 */
	var hasClass = exports.hasClass = function hasClass(el, cn) {
	    return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
	};

	/**
	 * Add a class to an element if it does not already exist
	 * @param  {DOM element} el - The DOM element to add the class to
	 * @param  {string} cn - The class to add
	 */
	var addClass = exports.addClass = function addClass(el, cn) {
	    if (!hasClass(el, cn)) {
	        el.className = el.className === '' ? cn : el.className + ' ' + cn;
	    }
	};

	/**
	 * Remove a class from an element
	 * @param  {DOM element} el - The DOM element to remove the class from
	 * @param  {string} cn - The class to remove
	 */
	var removeClass = exports.removeClass = function removeClass(el, cn) {
	    el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.adjustCalendar = exports.compareDates = exports.setToStartOfDay = exports.getDaysInMonth = exports.isWeekend = undefined;

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns true if date is a weekend day, false if not
	 * @param  {date} date - Date to check
	 * @return {boolean}
	 */
	var isWeekend = exports.isWeekend = function isWeekend(date) {
	    var day = date.getDay();

	    return day === 0 || day === 6;
	};

	/**
	 * Returns true if year is a leap year, false if not
	 * @param  {number} year - Year to check
	 * @return {boolean}
	 *
	 * Solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
	 */
	var isLeapYear = function isLeapYear(year) {
	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	};

	/**
	 * Returns the number of days in a month accounting for leap years
	 * @param  {number} year - Year to return number of days for
	 * @param  {number} month - Month to return number of days for
	 * @return {number}
	 */
	var getDaysInMonth = exports.getDaysInMonth = function getDaysInMonth(year, month) {
	    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	};

	/**
	 * Sets a date's time to 0, 0, 0, 0 for comparing dates
	 * @param  {date} date - Date to set time on
	 */
	var setToStartOfDay = exports.setToStartOfDay = function setToStartOfDay(date) {
	    if ((0, _lodash2.default)(date)) date.setHours(0, 0, 0, 0);
	};

	/**
	 * Weak date comparison (use setToStartOfDay(date) to ensure correct result)
	 * @param  {date} a - Date to compare
	 * @param  {date} b - Date to compare
	 * @return {boolean}
	 */
	var compareDates = exports.compareDates = function compareDates(a, b) {
	    return a.getTime() === b.getTime();
	};

	/**
	 * Month/year wrapping
	 * @param  {object} - Calendar to adjust
	 * @return {object}
	 */
	var adjustCalendar = exports.adjustCalendar = function adjustCalendar(calendar) {
	    if (calendar.month < 0) {
	        calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
	        calendar.month += 12;
	    }
	    if (calendar.month > 11) {
	        calendar.year += Math.floor(Math.abs(calendar.month) / 12);
	        calendar.month -= 12;
	    }
	    return calendar;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.renderTable = exports.renderTitle = exports.renderRow = exports.renderWeek = exports.renderDay = undefined;

	var _lodash = __webpack_require__(2);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Returns i18n day name, either abbreviated or full
	 * @param  {object} opts - Options
	 * @param  {number} day - Day of the week
	 * @param  {boolean} abbr
	 * @return {string}
	 */
	var renderDayName = function renderDayName(opts, day, abbr) {
	    day += opts.firstDay;

	    while (day >= 7) {
	        day -= 7;
	    }

	    return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
	};

	/**
	 * Returns <td> HTML for a day table cell
	 * @param  {object} opts - Options
	 * @return {string}
	 */
	var renderDay = exports.renderDay = function renderDay(opts) {
	    if (opts.isEmpty) {
	        return '<td class="is-empty"></td>';
	    }

	    var arr = [];

	    if (opts.isDisabled) {
	        arr.push('is-disabled');
	    }

	    if (opts.isToday) {
	        arr.push('is-today');
	    }

	    if (opts.isSelected) {
	        arr.push('is-selected');
	    }

	    if (opts.isInRange) {
	        arr.push('is-inrange');
	    }

	    if (opts.isStartRange) {
	        arr.push('is-startrange');
	    }

	    if (opts.isEndRange) {
	        arr.push('is-endrange');
	    }

	    return '\n        <td data-day="' + opts.day + '" class="' + arr.join(' ') + '">\n            <button class="pika-button pika-day"\n                    type="button"\n                    data-pika-year="' + opts.year + '"\n                    data-pika-month="' + opts.month + '"\n                    data-pika-day="' + opts.day + '">\n                ' + opts.day + '\n            </button>\n        </td>\n    ';
	};

	/**
	 * Returns <td> HTML for a week cell
	 * @param  {number}
	 * @param  {number}
	 * @param  {number}
	 * @return {string}
	 *
	 * Lifted from http://javascript.about.com/library/blweekyear.htm
	 */
	var renderWeek = exports.renderWeek = function renderWeek(d, m, y) {
	    var onejan = new Date(y, 0, 1),
	        weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 86400000 + onejan.getDay() + 1) / 7);

	    return '\n        <td class="pika-week">\n            ' + weekNum + '\n        </td>\n    ';
	};

	/**
	 * Returns <tr> HTML for a day cells
	 * @param  {string[]} days - Array of day strings
	 * @param  {boolean} isRTL - Is right to left
	 * @return {string}
	 */
	var renderRow = exports.renderRow = function renderRow(days, isRTL) {
	    return '\n    <tr>\n        ' + (isRTL ? days.reverse() : days).join('') + '\n    </tr>\n';
	};

	/**
	 * Returns the <thead> HTML for day names
	 * @param  {object} opts - Options
	 * @return {string}
	 */
	var renderHead = function renderHead(opts) {
	    var i = undefined,
	        arr = [];

	    if (opts.showWeekNumber) {
	        arr.push('<th></th>');
	    }

	    for (i = 0; i < 7; i++) {
	        arr.push('\n            <th scope="col">\n                <abbr title="' + renderDayName(opts, i) + '">\n                    ' + renderDayName(opts, i, true) + '\n                </abbr>\n            </th>\n        ');
	    }

	    return '\n        <thead>\n            ' + (opts.isRTL ? arr.reverse() : arr).join('') + '\n        </thead>\n    ';
	};

	/**
	 * Returns HTML for the title with select labels for years and months
	 * @param  {object} opts - Options
	 * @param  {number} nthCalendar - The nth calendar
	 * @param  {number} year - The year
	 * @param  {number} month
	 * @param  {number} refYear - The year of the first calendar
	 * @return {string}
	 */
	var renderTitle = exports.renderTitle = function renderTitle(opts, nthCalendar, year, month, refYear) {
	    var i = undefined,
	        j = undefined,
	        arr = undefined,
	        isMinYear = year === opts.minYear,
	        isMaxYear = year === opts.maxYear,
	        html = '<div class="pika-title">',
	        monthHtml = undefined,
	        yearHtml = undefined,
	        prev = true,
	        next = true;

	    for (arr = [], i = 0; i < 12; i++) {
	        arr.push('\n            <option value="' + (year === refYear ? i - nthCalendar : 12 + i - nthCalendar) + '"\n                    ' + (i === month ? ' selected' : '') + '\n                    ' + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled' : '') + '>\n                ' + opts.i18n.months[i] + '\n            </option>\n        ');
	    }

	    monthHtml = '\n        <div class="pika-label">' + opts.i18n.months[month] + '\n            <select class="pika-select pika-select-month" tabindex="-1">\n                ' + arr.join('') + '\n            </select>\n        </div>\n    ';

	    if ((0, _lodash2.default)(opts.yearRange)) {
	        i = opts.yearRange[0];
	        j = opts.yearRange[1] + 1;
	    } else {
	        i = year - opts.yearRange;
	        j = 1 + year + opts.yearRange;
	    }

	    for (arr = []; i < j && i <= opts.maxYear; i++) {
	        if (i >= opts.minYear) {
	            arr.push('\n                <option value="' + i + '"\n                        ' + (i === year ? ' selected' : '') + '>\n                    ' + i + '\n                </option>\n            ');
	        }
	    }

	    yearHtml = '\n        <div class="pika-label">' + (year + opts.yearSuffix) + '\n            <select class="pika-select pika-select-year" tabindex="-1">\n                ' + arr.join('') + '\n            </select>\n        </div>\n    ';

	    if (opts.showMonthAfterYear) {
	        html += yearHtml + monthHtml;
	    } else {
	        html += monthHtml + yearHtml;
	    }

	    if (isMinYear && (month === 0 || opts.minMonth >= month)) {
	        prev = false;
	    }

	    if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
	        next = false;
	    }

	    if (nthCalendar === 0) {
	        html += '\n            <button class="pika-prev ' + (prev ? '' : ' is-disabled') + '" type="button">\n                ' + opts.i18n.previousMonth + '\n            </button>\n        ';
	    }

	    if (nthCalendar === opts.numberOfMonths - 1) {
	        html += '\n            <button class="pika-next ' + (next ? '' : ' is-disabled') + '" type="button">\n                ' + opts.i18n.nextMonth + '\n            </button>\n        ';
	    }

	    return html += '</div>';
	};

	/**
	 * Returns <table> HTML with table rows
	 * @param  {object} opts - Options
	 * @param  {string[]} rows - Array of row HTML
	 * @return {string}
	 */
	var renderTable = exports.renderTable = function renderTable(opts, rows) {
	    return '\n    <table cellpadding="0" cellspacing="0" class="pika-table">\n        ' + renderHead(opts) + '\n        <tbody>\n            ' + rows.join('') + '\n        </tbody>\n    </table>\n';
	};

/***/ }
/******/ ]);