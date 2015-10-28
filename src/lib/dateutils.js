
import { isDate } from './utils'


export var isWeekend = (date) => {
    let day = date.getDay();

    return day === 0 || day === 6;
}

export var isLeapYear = (year) => {
    // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

export var getDaysInMonth = (year, month) => {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

export var setToStartOfDay = (date) => {
    if (isDate(date)) date.setHours(0, 0, 0, 0);
}

export var compareDates = (a, b) => {
    // weak date comparison (use setToStartOfDay(date) to ensure correct result)
    return a.getTime() === b.getTime();
}

export var adjustCalendar = (calendar) => {
    if (calendar.month < 0) {
        calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
        calendar.month += 12;
    }
    if (calendar.month > 11) {
        calendar.year += Math.floor(Math.abs(calendar.month)/12);
        calendar.month -= 12;
    }
    return calendar;
}
