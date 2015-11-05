
/* global moment:false */

import isDate from 'lodash.isdate'
import isArray from 'lodash.isarray'
import assign from 'lodash.assign'

import { addEvent, removeEvent, fireEvent, hasEventListeners } from './lib/events'
import { addClass, removeClass, hasClass } from './lib/classutils'
import { isWeekend, getDaysInMonth, setToStartOfDay, compareDates, adjustCalendar } from './lib/dateutils'
import { renderDay, renderWeek, renderRow, renderTitle, renderTable } from './lib/templating'

const hasMoment = typeof moment === 'function';


class Pikaday2 {
    constructor (options) {
        let opts = this.config(options);

        this.el = document.createElement('div');
        this.el.className = 'pika-single' + (opts.isRTL ? ' is-rtl' : '') + (opts.theme ? ' ' + opts.theme : '');

        addEvent(this.el, 'mousedown', this._onMouseDown, true);
        addEvent(this.el, 'touchend', this._onMouseDown, true);
        addEvent(this.el, 'change', this._onChange);

        if (opts.field) {
            if (opts.container) {
                opts.container.appendChild(this.el);
            } else if (opts.bound) {
                document.body.appendChild(this.el);
            } else {
                opts.field.parentNode.insertBefore(this.el, opts.field.nextSibling);
            }

            addEvent(opts.field, 'change', this._onInputChange);

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

        if (isDate(opts.defaultDate)) {
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

            addEvent(opts.trigger, 'click', this._onInputClick);
            addEvent(opts.trigger, 'focus', this._onInputFocus);
            addEvent(opts.trigger, 'blur', this._onInputBlur);
        } else {
            this.show();
        }
    }

    // Public API

    config = (options) => {
        if (!this.options) {
            this.options = assign({}, Pikaday2.defaults, true)
        }

        let opts = assign(this.options, options, true);

        opts.isRTL = !!opts.isRTL;

        opts.field = (opts.field && opts.field.nodeName) ? opts.field : null;

        opts.theme = (typeof opts.theme) === 'string' && opts.theme ? opts.theme : null;

        opts.bound = !!(opts.bound !== undefined ? opts.field && opts.bound : opts.field);

        opts.trigger = (opts.trigger && opts.trigger.nodeName) ? opts.trigger : opts.field;

        opts.disableWeekends = !!opts.disableWeekends;

        opts.disableDayFn = (typeof opts.disableDayFn) === 'function' ? opts.disableDayFn : null;

        let nom = parseInt(opts.numberOfMonths, 10) || 1;
        opts.numberOfMonths = nom > 4 ? 4 : nom;

        if (!isDate(opts.minDate)) {
            opts.minDate = false;
        }

        if (!isDate(opts.maxDate)) {
            opts.maxDate = false;
        }

        if ((opts.minDate && opts.maxDate) && opts.maxDate < opts.minDate) {
            opts.maxDate = opts.minDate = false;
        }

        if (opts.minDate) {
            this.setMinDate(opts.minDate);
        }

        if (opts.maxDate) {
            this.setMaxDate(opts.maxDate);
        }

        if (isArray(opts.yearRange)) {
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
    }

    toString = (format) => {
        return !isDate(this._d) ? '' : hasMoment ? moment(this._d).format(format || this.options.format) : this._d.toDateString();
    }

    getMoment = () => {
        return hasMoment ? moment(this._d) : null;
    }

    setMoment = (date, preventOnSelect) => {
        if (hasMoment && moment.isMoment(date)) {
            this.setDate(date.toDate(), preventOnSelect);
        }
    }

    getDate = () => {
        return isDate(this._d) ? new Date(this._d.getTime()) : null;
    }

    setDate = (date, preventOnSelect) => {
        if (!date) {
            this._d = null;

            if (this.options.field) {
                this.options.field.value = '';
                fireEvent(this.options.field, 'change', { firedBy: this });
            }

            return this.draw();
        }

        if (typeof date === 'string') {
            date = new Date(Date.parse(date));
        }

        if (!isDate(date)) {
            return;
        }

        var min = this.options.minDate,
            max = this.options.maxDate;

        if (isDate(min) && date < min) {
            date = min;
        } else if (isDate(max) && date > max) {
            date = max;
        }

        this._d = new Date(date.getTime());

        setToStartOfDay(this._d);

        this.gotoDate(this._d);

        if (this.options.field) {
            this.options.field.value = this.toString();
            fireEvent(this.options.field, 'change', { firedBy: this });
        }

        if (!preventOnSelect && typeof this.options.onSelect === 'function') {
            this.options.onSelect.call(this, this.getDate());
        }
    }

    gotoDate = (date) => {
        var newCalendar = true;

        if (!isDate(date)) {
            return;
        }

        if (this.calendars) {
            var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
                visibleDate = date.getTime();
            // get the end of the month
            lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
            lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
            newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
        }

        if (newCalendar) {
            this.calendars = [{
                month: date.getMonth(),
                year: date.getFullYear()
            }];
            if (this.options.mainCalendar === 'right') {
                this.calendars[0].month += 1 - this.options.numberOfMonths;
            }
        }

        this.adjustCalendars();
    }

    adjustCalendars = () => {
        this.calendars[0] = adjustCalendar(this.calendars[0]);

        for (let c = 1; c < this.options.numberOfMonths; c++) {
            this.calendars[c] = adjustCalendar({
                month: this.calendars[0].month + c,
                year: this.calendars[0].year
            });
        }

        this.draw();
    }

    gotoToday = () => {
        this.gotoDate(new Date());
    }

    gotoMonth = (month) => {
        if (!isNaN(month)) {
            this.calendars[0].month = parseInt(month, 10);
            this.adjustCalendars();
        }
    }

    nextMonth = () => {
        this.calendars[0].month++;
        this.adjustCalendars();
    }

    prevMonth = () => {
        this.calendars[0].month--;
        this.adjustCalendars();
    }

    gotoYear = (year) => {
        if (!isNaN(year)) {
            this.calendars[0].year = parseInt(year, 10);
            this.adjustCalendars();
        }
    }

    setMinDate = (value) => {
        setToStartOfDay(value);

        this.options.minDate = value;
        this.options.minYear  = value.getFullYear();
        this.options.minMonth = value.getMonth();
    }

    setMaxDate = (value) => {
        setToStartOfDay(value);

        this.options.maxDate = value;
        this.options.maxYear  = value.getFullYear();
        this.options.maxMonth = value.getMonth();
    }

    setStartRange = (value) => {
        this.options.startRange = value;
    }

    setEndRange = (value) => {
        this.options.endRange = value;
    }

    draw = (force) => {
        if (!this.visible && !force) {
            return;
        }
        
        let opts = this.options,
            minYear = opts.minYear,
            maxYear = opts.maxYear,
            minMonth = opts.minMonth,
            maxMonth = opts.maxMonth,
            html = '';

        if (this._y <= minYear) {
            this._y = minYear;

            if (!isNaN(minMonth) && this._m < minMonth) {
                this._m = minMonth;
            }
        }

        if (this._y >= maxYear) {
            this._y = maxYear;

            if (!isNaN(maxMonth) && this._m > maxMonth) {
                this._m = maxMonth;
            }
        }

        for (let c = 0; c < opts.numberOfMonths; c++) {
            html += '<div class="pika-lendar">' + renderTitle(opts, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year) + this.render(this.calendars[c].year, this.calendars[c].month) + '</div>';
        }

        this.el.innerHTML = html;

        if (opts.bound) {
            if(opts.field.type !== 'hidden') {
                setTimeout(() => {
                    opts.trigger.focus();
                }, 1);
            }
        }

        if (typeof this.options.onDraw === 'function') {
            setTimeout(() => {
                this.options.onDraw.call(this);
            }, 0);
        }
    }

    adjustPosition = () => {
        let field,
            pEl,
            width,
            height,
            viewportWidth,
            viewportHeight,
            scrollTop,
            left,
            top,
            clientRect,
            opts = this.options;

        if (opts.container) return;

        this.el.style.position = 'absolute';

        field = opts.trigger;
        pEl = field;

        width = this.el.offsetWidth;
        height = this.el.offsetHeight;

        viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

        if (typeof field.getBoundingClientRect === 'function') {
            clientRect = field.getBoundingClientRect();
            left = clientRect.left + window.pageXOffset;
            top = clientRect.bottom + window.pageYOffset;
        } else {
            left = pEl.offsetLeft;
            top  = pEl.offsetTop + pEl.offsetHeight;
            while((pEl = pEl.offsetParent)) {
                left += pEl.offsetLeft;
                top  += pEl.offsetTop;
            }
        }

        // default position is bottom & left
        if ((opts.reposition && left + width > viewportWidth) ||
            (
                opts.position.indexOf('right') > -1 &&
                left - width + field.offsetWidth > 0
            )
        ) {
            left = left - width + field.offsetWidth;
        }
        if ((opts.reposition && top + height > viewportHeight + scrollTop) ||
            (
                opts.position.indexOf('top') > -1 &&
                top - height - field.offsetHeight > 0
            )
        ) {
            top = top - height - field.offsetHeight;
        }

        this.el.style.left = left + 'px';
        this.el.style.top = top + 'px';
    }

    render = (year, month) => {
        let opts   = this.options,
            now    = new Date(),
            days   = getDaysInMonth(year, month),
            before = new Date(year, month, 1).getDay(),
            data   = [],
            row    = [];

        setToStartOfDay(now);

        if (opts.firstDay > 0) {
            before -= opts.firstDay;

            if (before < 0) {
                before += 7;
            }
        }

        let cells = days + before,
            after = cells;

        while (after > 7) {
            after -= 7;
        }

        cells += 7 - after;

        for (let i = 0, r = 0; i < cells; i++) {
            let day = new Date(year, month, 1 + (i - before)),
                isSelected = isDate(this._d) ? compareDates(day, this._d) : false,
                isToday = compareDates(day, now),
                isEmpty = i < before || i >= (days + before),
                isStartRange = opts.startRange && compareDates(opts.startRange, day),
                isEndRange = opts.endRange && compareDates(opts.endRange, day),
                isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
                isDisabled = (opts.minDate && day < opts.minDate) ||
                             (opts.maxDate && day > opts.maxDate) ||
                             (opts.disableWeekends && isWeekend(day)) ||
                             (opts.disableDayFn && opts.disableDayFn(day)),
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

            row.push(renderDay(dayConfig));

            if (++r === 7) {
                if (opts.showWeekNumber) {
                    row.unshift(renderWeek(i - before, month, year));
                }
                data.push(renderRow(row, opts.isRTL));
                row = [];
                r = 0;
            }
        }

        return renderTable(opts, data);
    }

    isVisible = () => {
        return this.visible;
    }

    show = () => {
        if (!this.visible) {
            removeClass(this.el, 'is-hidden');

            this.visible = true;
            this.draw();

            if (this.options.bound) {
                addEvent(document, 'click', this._onClick);
                this.adjustPosition();
            }

            if (typeof this.options.onOpen === 'function') {
                this.options.onOpen.call(this);
            }
        }
    }

    hide = () => {
        let v = this.visible;

        if (v !== false) {
            if (this.options.bound) {
                removeEvent(document, 'click', this._onClick);
            }

            this.el.style.position = 'static'; // reset
            this.el.style.left = 'auto';
            this.el.style.top = 'auto';

            addClass(this.el, 'is-hidden');

            this.visible = false;

            if (v !== undefined && typeof this.options.onClose === 'function') {
                this.options.onClose.call(this);
            }
        }
    }

    destroy = () => {
        this.hide();

        removeEvent(this.el, 'mousedown', this._onMouseDown, true);
        removeEvent(this.el, 'touchend', this._onMouseDown, true);
        removeEvent(this.el, 'change', this._onChange);

        if (this.options.field) {
            removeEvent(this.options.field, 'change', this._onInputChange);

            if (this.options.bound) {
                removeEvent(this.options.trigger, 'click', this._onInputClick);
                removeEvent(this.options.trigger, 'focus', this._onInputFocus);
                removeEvent(this.options.trigger, 'blur', this._onInputBlur);
            }
        }

        if (this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
    }

    // Events

    _onMouseDown = (e) => {
        if (!this.visible) {
            return;
        }

        e = e || window.event;

        var target = e.target || e.srcElement;

        if (!target) {
            return;
        }

        if (!hasClass(target.parentNode, 'is-disabled')) {
            if (hasClass(target, 'pika-button') && !hasClass(target, 'is-empty')) {
                this.setDate(new Date(target.getAttribute('data-pika-year'), target.getAttribute('data-pika-month'), target.getAttribute('data-pika-day')));

                if (this.options.bound) {
                    setTimeout(() => {
                        this.hide();

                        if (this.options.field) {
                            this.options.field.blur();
                        }
                    }, 100);
                }
            } else if (hasClass(target, 'pika-prev')) {
                this.prevMonth();
            } else if (hasClass(target, 'pika-next')) {
                this.nextMonth();
            }
        }

        if (!hasClass(target, 'pika-select')) {
            // if this is touch event prevent mouse events emulation
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
                return false;
            }
        } else {
            this._c = true;
        }
    }

    _onChange = (e) => {
        e = e || window.event;

        let target = e.target || e.srcElement;

        if (!target) {
            return;
        }

        if (hasClass(target, 'pika-select-month')) {
            this.gotoMonth(target.value);
        } else if (hasClass(target, 'pika-select-year')) {
            this.gotoYear(target.value);
        }
    }

    _onInputChange = (e) => {
        let date;

        if (e.firedBy === this) {
            return;
        }

        if (hasMoment) {
            date = moment(this.options.field.value, this.options.format);
            date = (date && date.isValid()) ? date.toDate() : null;
        } else {
            date = new Date(Date.parse(this.options.field.value));
        }

        if (isDate(date)) {
          this.setDate(date);
        }

        if (!this.visible) {
            this.show();
        }
    }

    _onInputFocus = () => {
        this.show();
    }

    _onInputClick = () => {
        this.show();
    }

    _onInputBlur = () => {
        // IE allows pika div to gain focus; catch blur the input field
        let pEl = document.activeElement;

        do {
            if (hasClass(pEl, 'pika-single')) {
                return;
            }
        } while ((pEl = pEl.parentNode));

        if (!this._c) {
            this._b = setTimeout(() => {
                this.hide();
            }, 50);
        }
        this._c = false;
    }

    _onClick = (e) => {
        e = e || window.event;

        let target = e.target || e.srcElement,
            pEl = target;

        if (!target) {
            return;
        }

        if (!hasEventListeners && hasClass(target, 'pika-select')) {
            if (!target.onchange) {
                target.setAttribute('onchange', 'return;');
                addEvent(target, 'change', this._onChange);
            }
        }

        do {
            if (hasClass(pEl, 'pika-single') || pEl === this.options.trigger) {
                return;
            }
        } while ((pEl = pEl.parentNode));

        if (this.visible && target !== this.options.trigger && pEl !== this.options.trigger) {
            this.hide();
        }
    }
}

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
        previousMonth : 'Previous Month',
        nextMonth     : 'Next Month',
        months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
        weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    },

    // Theme Classname
    theme: null,

    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null
};

export default Pikaday2;
