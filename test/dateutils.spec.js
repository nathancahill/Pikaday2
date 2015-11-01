
import assert from 'assert';
import { isWeekend, isLeapYear, getDaysInMonth, setToStartOfDay, compareDates, adjustCalendar } from '../src/lib/dateutils';


describe('isWeekend', () => {
    it('returns true when date is a weekend day', () => {
        let date = new Date(2015, 9, 31);

        assert(isWeekend(date));
    });

    it('returns false when date is not a weekend day', () => {
        let date = new Date(2015, 9, 30);

        assert(!isWeekend(date));
    });
})

describe('isLeapYear', () => {
    it('returns true when year is a leap year', () => {
        assert(isLeapYear(2016));
    });

    it('returns false when year is not a leap year', () => {
        assert(!isLeapYear(1900));
    });
});

describe('getDaysInMonth', () => {
    it('returns 29 for febuary of a leap year', () => {
        assert.equal(29, getDaysInMonth(2016, 1));
    });

    it('returns undefined for invalid month', () => {
        assert.equal(undefined, getDaysInMonth(2016, 12));
    });
});

describe('setToStartOfDay', () => {
    it('sets date to start of day', () => {
        let date = new Date(2015, 9, 31, 10, 3, 5, 31, 23);

        setToStartOfDay(date);

        assert.equal(0, date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds());
    });
});

describe('compareDates', () => {
    it('returns true for same dates that are set to start of day', () => {
        let a = new Date(2015, 9, 31, 10, 3, 5, 31, 23);
        let b = new Date(2015, 9, 31, 11, 8, 9, 23, 48);

        setToStartOfDay(a);
        setToStartOfDay(b);

        assert(compareDates(a, b));
    });

    it('returns false for same dates that are not set to start of day', () => {
        let a = new Date(2015, 9, 31, 10, 3, 5, 31, 23);
        let b = new Date(2015, 9, 31, 11, 8, 9, 23, 48);

        assert(!compareDates(a, b));
    });

    it('returns false for different dates', () => {
        let a = new Date(2015, 9, 31, 10, 3, 5, 31, 23);
        let b = new Date(2015, 9, 30, 11, 8, 9, 23, 48);

        setToStartOfDay(a);
        setToStartOfDay(b);

        assert(!compareDates(a, b));
    });
});

describe('adjustCalendar', () => {
    it('wraps a calendar month to the next year when month is invalid', () => {
        let calendar = {year: 2015, month: 12};

        calendar = adjustCalendar(calendar);

        assert.deepEqual({year: 2016, month: 0}, calendar);
    });

    it('wraps a calendar to the previous year when month is invalid', () => {
        let calendar = {year: 2016, month: -1};

        calendar = adjustCalendar(calendar);

        assert.deepEqual({year: 2015, month: 11}, calendar);
    });

    it('does nothing when the month is valid', () => {
        let calendar = {year: 2015, month: 10};

        calendar = adjustCalendar(calendar);

        assert.deepEqual({year: 2015, month: 10}, calendar);
    });
});
