
import isDate from 'lodash.isdate'

/**
 * Returns true if date is a weekend day, false if not
 * @param  {date} date - Date to check
 * @return {boolean}
 */
export var isWeekend = date => {
    let day = date.getDay();

    return day === 0 || day === 6;
}

/**
 * Returns true if year is a leap year, false if not
 * @param  {number} year - Year to check
 * @return {boolean}
 *
 * Solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
 */
var isLeapYear = year => {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

/**
 * Returns the number of days in a month accounting for leap years
 * @param  {number} year - Year to return number of days for
 * @param  {number} month - Month to return number of days for
 * @return {number}
 */
export var getDaysInMonth = (year, month) => {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

/**
 * Sets a date's time to 0, 0, 0, 0 for comparing dates
 * @param  {date} date - Date to set time on
 */
export var setToStartOfDay = date => {
    if (isDate(date)) date.setHours(0, 0, 0, 0);
}

/**
 * Weak date comparison (use setToStartOfDay(date) to ensure correct result)
 * @param  {date} a - Date to compare
 * @param  {date} b - Date to compare
 * @return {boolean}
 */
export var compareDates = (a, b) => {
    return a.getTime() === b.getTime();
}

/**
 * Month/year wrapping
 * @param  {object} - Calendar to adjust
 * @return {object}
 */
export var adjustCalendar = calendar => {
    if (calendar.month < 0) {
        calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
        calendar.month += 12;
    }
    if (calendar.month > 11) {
        calendar.year += Math.floor(Math.abs(calendar.month) / 12);
        calendar.month -= 12;
    }
    return calendar;
}
