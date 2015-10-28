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
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Pikaday2"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _libUtils = __webpack_require__(2);

	var _libEvents = __webpack_require__(3);

	var _libClassutils = __webpack_require__(4);

	var _libDateutils = __webpack_require__(5);

	var _libTemplating = __webpack_require__(6);

	var hasMoment = typeof moment === 'function';

	var Pikaday2 = function Pikaday2(options) {
	    var _this = this;

	    _classCallCheck(this, Pikaday2);

	    this.config = function (options) {
	        if (!_this.options) {
	            _this.options = (0, _libUtils.extend)({}, Pikaday2.defaults, true);
	        }

	        var opts = (0, _libUtils.extend)(_this.options, options, true);

	        opts.isRTL = !!opts.isRTL;

	        opts.field = opts.field && opts.field.nodeName ? opts.field : null;

	        opts.theme = typeof opts.theme === 'string' && opts.theme ? opts.theme : null;

	        opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

	        opts.trigger = opts.trigger && opts.trigger.nodeName ? opts.trigger : opts.field;

	        opts.disableWeekends = !!opts.disableWeekends;

	        opts.disableDayFn = typeof opts.disableDayFn === 'function' ? opts.disableDayFn : null;

	        var nom = parseInt(opts.numberOfMonths, 10) || 1;
	        opts.numberOfMonths = nom > 4 ? 4 : nom;

	        if (!(0, _libUtils.isDate)(opts.minDate)) {
	            opts.minDate = false;
	        }

	        if (!(0, _libUtils.isDate)(opts.maxDate)) {
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

	        if ((0, _libUtils.isArray)(opts.yearRange)) {
	            var fallback = new Date().getFullYear() - 10;
	            opts.yearRange[0] = parseInt(opts.yearRange[0], 10) || fallback;
	            opts.yearRange[1] = parseInt(opts.yearRange[1], 10) || fallback;
	        } else {
	            opts.yearRange = Math.abs(parseInt(opts.yearRange, 10)) || defaults.yearRange;
	            if (opts.yearRange > 100) {
	                opts.yearRange = 100;
	            }
	        }

	        return opts;
	    };

	    this.toString = function (format) {
	        return !(0, _libUtils.isDate)(_this._d) ? '' : hasMoment ? moment(_this._d).format(format || _this.options.format) : _this._d.toDateString();
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
	        return (0, _libUtils.isDate)(_this._d) ? new Date(_this._d.getTime()) : null;
	    };

	    this.setDate = function (date, preventOnSelect) {
	        if (!date) {
	            _this._d = null;

	            if (_this.options.field) {
	                _this.options.field.value = '';
	                (0, _libEvents.fireEvent)(_this.options.field, 'change', { firedBy: _this });
	            }

	            return _this.draw();
	        }

	        if (typeof date === 'string') {
	            date = new Date(Date.parse(date));
	        }

	        if (!(0, _libUtils.isDate)(date)) {
	            return;
	        }

	        var min = _this.options.minDate,
	            max = _this.options.maxDate;

	        if ((0, _libUtils.isDate)(min) && date < min) {
	            date = min;
	        } else if ((0, _libUtils.isDate)(max) && date > max) {
	            date = max;
	        }

	        _this._d = new Date(date.getTime());

	        (0, _libDateutils.setToStartOfDay)(_this._d);

	        _this.gotoDate(_this._d);

	        if (_this.options.field) {
	            _this.options.field.value = _this.toString();
	            (0, _libEvents.fireEvent)(_this.options.field, 'change', { firedBy: _this });
	        }

	        if (!preventOnSelect && typeof _this.options.onSelect === 'function') {
	            _this.options.onSelect.call(_this, _this.getDate());
	        }
	    };

	    this.gotoDate = function (date) {
	        var newCalendar = true;

	        if (!(0, _libUtils.isDate)(date)) {
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
	        _this.calendars[0] = (0, _libDateutils.adjustCalendar)(_this.calendars[0]);

	        for (var c = 1; c < _this.options.numberOfMonths; c++) {
	            _this.calendars[c] = (0, _libDateutils.adjustCalendar)({
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
	        (0, _libDateutils.setToStartOfDay)(value);

	        _this.options.minDate = value;
	        _this.options.minYear = value.getFullYear();
	        _this.options.minMonth = value.getMonth();
	    };

	    this.setMaxDate = function (value) {
	        (0, _libDateutils.setToStartOfDay)(value);

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
	            html += '<div class="pika-lendar">' + (0, _libTemplating.renderTitle)(_this, c, _this.calendars[c].year, _this.calendars[c].month, _this.calendars[0].year) + _this.render(_this.calendars[c].year, _this.calendars[c].month) + '</div>';
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
	            days = (0, _libDateutils.getDaysInMonth)(year, month),
	            before = new Date(year, month, 1).getDay(),
	            data = [],
	            row = [];

	        (0, _libDateutils.setToStartOfDay)(now);

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
	                isSelected = (0, _libUtils.isDate)(_this._d) ? (0, _libDateutils.compareDates)(day, _this._d) : false,
	                isToday = (0, _libDateutils.compareDates)(day, now),
	                isEmpty = i < before || i >= days + before,
	                isStartRange = opts.startRange && (0, _libDateutils.compareDates)(opts.startRange, day),
	                isEndRange = opts.endRange && (0, _libDateutils.compareDates)(opts.endRange, day),
	                isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
	                isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && (0, _libDateutils.isWeekend)(day) || opts.disableDayFn && opts.disableDayFn(day),
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

	            row.push((0, _libTemplating.renderDay)(dayConfig));

	            if (++r === 7) {
	                if (opts.showWeekNumber) {
	                    row.unshift((0, _libTemplating.renderWeek)(i - before, month, year));
	                }
	                data.push((0, _libTemplating.renderRow)(row, opts.isRTL));
	                row = [];
	                r = 0;
	            }
	        }

	        return (0, _libTemplating.renderTable)(opts, data);
	    };

	    this.isVisible = function () {
	        return _this.visible;
	    };

	    this.show = function () {
	        if (!_this.visible) {
	            (0, _libClassutils.removeClass)(_this.el, 'is-hidden');

	            _this.visible = true;
	            _this.draw();

	            if (_this.options.bound) {
	                (0, _libEvents.addEvent)(document, 'click', _this._onClick);
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
	                (0, _libEvents.removeEvent)(document, 'click', _this._onClick);
	            }

	            _this.el.style.position = 'static'; // reset
	            _this.el.style.left = 'auto';
	            _this.el.style.top = 'auto';

	            (0, _libClassutils.addClass)(_this.el, 'is-hidden');

	            _this.visible = false;

	            if (v !== undefined && typeof _this.options.onClose === 'function') {
	                _this.options.onClose.call(_this);
	            }
	        }
	    };

	    this.destroy = function () {
	        _this.hide();

	        (0, _libEvents.removeEvent)(_this.el, 'mousedown', _this._onMouseDown, true);
	        (0, _libEvents.removeEvent)(_this.el, 'touchend', _this._onMouseDown, true);
	        (0, _libEvents.removeEvent)(_this.el, 'change', _this._onChange);

	        if (_this.options.field) {
	            (0, _libEvents.removeEvent)(_this.options.field, 'change', _this._onInputChange);

	            if (_this.options.bound) {
	                (0, _libEvents.removeEvent)(_this.options.trigger, 'click', _this._onInputClick);
	                (0, _libEvents.removeEvent)(_this.options.trigger, 'focus', _this._onInputFocus);
	                (0, _libEvents.removeEvent)(_this.options.trigger, 'blur', _this._onInputBlur);
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

	        if (!(0, _libClassutils.hasClass)(target.parentNode, 'is-disabled')) {
	            if ((0, _libClassutils.hasClass)(target, 'pika-button') && !(0, _libClassutils.hasClass)(target, 'is-empty')) {
	                _this.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));

	                if (_this.options.bound) {
	                    setTimeout(function () {
	                        _this.hide();

	                        if (_this.options.field) {
	                            _this.options.field.blur();
	                        }
	                    }, 100);
	                }
	            } else if ((0, _libClassutils.hasClass)(target, 'pika-prev')) {
	                _this.prevMonth();
	            } else if ((0, _libClassutils.hasClass)(target, 'pika-next')) {
	                _this.nextMonth();
	            }
	        }

	        if (!(0, _libClassutils.hasClass)(target, 'pika-select')) {
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

	        if ((0, _libClassutils.hasClass)(target, 'pika-select-month')) {
	            _this.gotoMonth(target.value);
	        } else if ((0, _libClassutils.hasClass)(target, 'pika-select-year')) {
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

	        if ((0, _libUtils.isDate)(date)) {
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
	            if ((0, _libClassutils.hasClass)(pEl, 'pika-single')) {
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

	        if (!_libEvents.hasEventListeners && (0, _libClassutils.hasClass)(target, 'pika-select')) {
	            if (!target.onchange) {
	                target.setAttribute('onchange', 'return;');
	                (0, _libEvents.addEvent)(target, 'change', _this._onChange);
	            }
	        }

	        do {
	            if ((0, _libClassutils.hasClass)(pEl, 'pika-single') || pEl === _this.options.trigger) {
	                return;
	            }
	        } while (pEl = pEl.parentNode);

	        if (_this.visible && target !== _this.options.trigger && pEl !== _this.options.trigger) {
	            _this.hide();
	        }
	    };

	    var opts = this.config(options);

	    this.el = document.createElement('div');
	    this.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

	    (0, _libEvents.addEvent)(this.el, 'mousedown', this._onMouseDown, true);
	    (0, _libEvents.addEvent)(this.el, 'touchend', this._onMouseDown, true);
	    (0, _libEvents.addEvent)(this.el, 'change', this._onChange);

	    if (opts.field) {
	        if (opts.container) {
	            opts.container.appendChild(this.el);
	        } else if (opts.bound) {
	            document.body.appendChild(this.el);
	        } else {
	            opts.field.parentNode.insertBefore(this.el, opts.field.nextSibling);
	        }

	        (0, _libEvents.addEvent)(opts.field, 'change', this._onInputChange);

	        if (!opts.defaultDate) {
	            if (hasMoment && opts.field.value) {
	                opts.defaultDate = moment(opts.field.value, opts.format).toDate();
	            } else {
	                opts.defaultDate = new Date(Date.parse(opts.field.value));
	            }
	            opts.setDefaultDate = true;
	        }
	    }

	    var defDate = opts.defaultDate;

	    if ((0, _libUtils.isDate)(defDate)) {
	        if (opts.setDefaultDate) {
	            this.setDate(defDate, true);
	        } else {
	            this.gotoDate(defDate);
	        }
	    } else {
	        this.gotoDate(new Date());
	    }

	    if (opts.bound) {
	        this.hide();
	        this.el.className += ' is-bound';

	        (0, _libEvents.addEvent)(opts.trigger, 'click', this._onInputClick);
	        (0, _libEvents.addEvent)(opts.trigger, 'focus', this._onInputFocus);
	        (0, _libEvents.addEvent)(opts.trigger, 'blur', this._onInputBlur);
	    } else {
	        this.show();
	    }
	}

	// Public API

	;

	exports['default'] = Pikaday2;

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
	module.exports = exports['default'];

	// Events

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var isArray = function isArray(obj) {
	    return (/Array/.test(Object.prototype.toString.call(obj))
	    );
	};

	exports.isArray = isArray;
	var isDate = function isDate(obj) {
	    return (/Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime())
	    );
	};

	exports.isDate = isDate;
	var extend = function extend(to, from, overwrite) {
	    var prop = undefined,
	        hasProp = undefined;

	    for (prop in from) {
	        hasProp = to[prop] !== undefined;
	        if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
	            if (isDate(from[prop])) {
	                if (overwrite) {
	                    to[prop] = new Date(from[prop].getTime());
	                }
	            } else if (isArray(from[prop])) {
	                if (overwrite) {
	                    to[prop] = from[prop].slice(0);
	                }
	            } else {
	                to[prop] = extend({}, from[prop], overwrite);
	            }
	        } else if (overwrite || !hasProp) {
	            to[prop] = from[prop];
	        }
	    }
	    return to;
	};
	exports.extend = extend;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _utils = __webpack_require__(2);

	var hasEventListeners = !!window.addEventListener;

	exports.hasEventListeners = hasEventListeners;
	var addEvent = function addEvent(el, e, callback, capture) {
	    if (hasEventListeners) {
	        el.addEventListener(e, callback, !!capture);
	    } else {
	        el.attachEvent('on' + e, callback);
	    }
	};

	exports.addEvent = addEvent;
	var removeEvent = function removeEvent(el, e, callback, capture) {
	    if (hasEventListeners) {
	        el.removeEventListener(e, callback, !!capture);
	    } else {
	        el.detachEvent('on' + e, callback);
	    }
	};

	exports.removeEvent = removeEvent;
	var fireEvent = function fireEvent(el, eventName, data) {
	    var ev = undefined;

	    if (window.document.createEvent) {
	        ev = window.document.createEvent('HTMLEvents');
	        ev.initEvent(eventName, true, false);
	        ev = (0, _utils.extend)(ev, data);
	        el.dispatchEvent(ev);
	    } else if (window.document.createEventObject) {
	        ev = window.document.createEventObject();
	        ev = (0, _utils.extend)(ev, data);
	        el.fireEvent('on' + eventName, ev);
	    }
	};
	exports.fireEvent = fireEvent;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var trim = function trim(str) {
	    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	};

	var hasClass = function hasClass(el, cn) {
	    return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
	};

	exports.hasClass = hasClass;
	var addClass = function addClass(el, cn) {
	    if (!hasClass(el, cn)) {
	        el.className = el.className === '' ? cn : el.className + ' ' + cn;
	    }
	};

	exports.addClass = addClass;
	var removeClass = function removeClass(el, cn) {
	    el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
	};
	exports.removeClass = removeClass;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _utils = __webpack_require__(2);

	var isWeekend = function isWeekend(date) {
	    var day = date.getDay();

	    return day === 0 || day === 6;
	};

	exports.isWeekend = isWeekend;
	var isLeapYear = function isLeapYear(year) {
	    // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	};

	exports.isLeapYear = isLeapYear;
	var getDaysInMonth = function getDaysInMonth(year, month) {
	    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	};

	exports.getDaysInMonth = getDaysInMonth;
	var setToStartOfDay = function setToStartOfDay(date) {
	    if ((0, _utils.isDate)(date)) date.setHours(0, 0, 0, 0);
	};

	exports.setToStartOfDay = setToStartOfDay;
	var compareDates = function compareDates(a, b) {
	    // weak date comparison (use setToStartOfDay(date) to ensure correct result)
	    return a.getTime() === b.getTime();
	};

	exports.compareDates = compareDates;
	var adjustCalendar = function adjustCalendar(calendar) {
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
	exports.adjustCalendar = adjustCalendar;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _utils = __webpack_require__(2);

	var renderDayName = function renderDayName(opts, day, abbr) {
	    day += opts.firstDay;

	    while (day >= 7) {
	        day -= 7;
	    }

	    return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
	};

	var renderDay = function renderDay(opts) {
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

	exports.renderDay = renderDay;
	var renderWeek = function renderWeek(d, m, y) {
	    // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
	    var onejan = new Date(y, 0, 1),
	        weekNum = Math.ceil(((new Date(y, m, d) - onejan) / 86400000 + onejan.getDay() + 1) / 7);

	    return '\n        <td class="pika-week">\n            ' + weekNum + '\n        </td>\n    ';
	};

	exports.renderWeek = renderWeek;
	var renderRow = function renderRow(days, isRTL) {
	    return '\n    <tr>\n        ' + (isRTL ? days.reverse() : days).join('') + '\n    </tr>\n';
	};

	exports.renderRow = renderRow;
	var renderBody = function renderBody(rows) {
	    return '\n    <tbody>\n        ' + rows.join('') + '\n    </tbody>\n';
	};

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

	var renderTitle = function renderTitle(instance, c, year, month, refYear) {
	    var i = undefined,
	        j = undefined,
	        arr = undefined,
	        opts = instance.options,
	        isMinYear = year === opts.minYear,
	        isMaxYear = year === opts.maxYear,
	        html = '<div class="pika-title">',
	        monthHtml = undefined,
	        yearHtml = undefined,
	        prev = true,
	        next = true;

	    for (arr = [], i = 0; i < 12; i++) {
	        arr.push('\n            <option value="' + (year === refYear ? i - c : 12 + i - c) + '"\n                    ' + (i === month ? ' selected' : '') + '\n                    ' + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled' : '') + '>\n                ' + opts.i18n.months[i] + '\n            </option>\n        ');
	    }

	    monthHtml = '\n        <div class="pika-label">' + opts.i18n.months[month] + '\n            <select class="pika-select pika-select-month" tabindex="-1">\n                ' + arr.join('') + '\n            </select>\n        </div>\n    ';

	    if ((0, _utils.isArray)(opts.yearRange)) {
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

	    if (c === 0) {
	        html += '\n            <button class="pika-prev ' + (prev ? '' : ' is-disabled') + '" type="button">\n                ' + opts.i18n.previousMonth + '\n            </button>\n        ';
	    }

	    if (c === instance.options.numberOfMonths - 1) {
	        html += '\n            <button class="pika-next ' + (next ? '' : ' is-disabled') + '" type="button">\n                ' + opts.i18n.nextMonth + '\n            </button>\n        ';
	    }

	    return html += '</div>';
	};

	exports.renderTitle = renderTitle;
	var renderTable = function renderTable(opts, data) {
	    return '\n    <table cellpadding="0" cellspacing="0" class="pika-table">\n        ' + renderHead(opts) + '\n        ' + renderBody(data) + '\n    </table>\n';
	};
	exports.renderTable = renderTable;

/***/ }
/******/ ]);