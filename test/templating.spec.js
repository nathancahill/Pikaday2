
import assert from 'assert';
import * as eminent from 'eminent';

import { renderDay, renderWeek, renderRow, renderTitle, renderTable } from '../src/lib/templating';
import Pikaday2 from '../src/pikaday2'


describe('renderDay', () => {
    it('renders a day in a cell with a button', () => {
        let opts = {day: 31, month: 9, year: 2015}

        let html = `
            <table>
                ${ renderDay(opts) }
            </table>
        `

        eminent.domAttrsIs(html, 'table>tbody>tr>td[data-day=31 class=""]>button.pika-button.pika-day[type=button data-pika-year=2015 data-pika-month=9 data-pika-day=31]')
    });

    it('renders a day with classes when options are passed', () => {
        let opts = {
            day: 31,
            month: 9,
            year: 2015,
            isDisabled: true,
            isToday: true,
            isSelected: true,
            isInRange: true,
            isStartRange: true,
            isEndRange: true
        }

        let html = '<table>' + renderDay(opts) + '</table>';

        eminent.domAttrsIs(html, 'table>tbody>tr>td.is-disabled.is-today.is-selected.is-inrange.is-startrange.is-endrange[data-day=31]>button.pika-button.pika-day[type=button data-pika-year=2015 data-pika-month=9 data-pika-day=31]')
    });
});

describe('renderWeek', () => {
    it('renders a week in a cell', () => {
        let html = `
            <table>
                ${ renderWeek(31, 9, 2015) }
            </table>
        `

        eminent.domAttrsIs(html, 'table>tbody>tr>td.pika-week')
    })
});

describe('renderRow', () => {
    it('renders a week of days in a table row', () => {
        let days = ['<td>1</td>', '<td>2</td>', '<td>3</td>'],
            html = `
            <table>
                ${ renderRow(days) }
            </table>
        `

        eminent.domContentIs(html, 'table>tbody>tr>td{$}*3')
    })

    it('renders a week of days in reverse order in a table row', () => {
        let days = ['<td>1</td>', '<td>2</td>', '<td>3</td>'],
            html = `
            <table>
                ${ renderRow(days, true) }
            </table>
        `

        eminent.domContentIs(html, 'table>tbody>tr>td{3}+td{2}+td{1}')
    })
});

describe('renderTitle', () => {
    it('renders a div with arrows and month, year menus', () => {
        let opts = Object.assign({}, Pikaday2.defaults),
            nthCalendar = 0,
            year = 2015,
            month = 9,
            html = renderTitle(opts, nthCalendar, year, month)

        eminent.domIsLike(html, 'div.pika-title>(div.pika-label>select>option*12)+(div.pika-label>select>option*21)+button+button')
    })

    it('renders 7 years when yearRange is 3', () => {
        let html,
            opts = Object.assign({}, Pikaday2.defaults),
            nthCalendar = 0,
            year = 2015,
            month = 9;

        opts.yearRange = 3;
        html = renderTitle(opts, nthCalendar, year, month);

        eminent.domIsLike(html, 'div.pika-title>(div.pika-label>select>option*12)+(div.pika-label>select>option*7)+button+button')
    })

    it('renders 3 years when maxYear and minYear is set', () => {
        let html,
            opts = Object.assign({}, Pikaday2.defaults),
            nthCalendar = 0,
            year = 2015,
            month = 9;

        opts.minYear = 2014;
        opts.maxYear = 2016;
        html = renderTitle(opts, nthCalendar, year, month);

        eminent.domIsLike(html, 'div.pika-title>(div.pika-label>select>option*12)+(div.pika-label>select>option*3)+button+button')
    })

    it('renders 12 years when maxYear is set', () => {
        let html,
            opts = Object.assign({}, Pikaday2.defaults),
            nthCalendar = 0,
            year = 2015,
            month = 9;

        opts.maxYear = 2016;
        html = renderTitle(opts, nthCalendar, year, month);

        eminent.domIsLike(html, 'div.pika-title>(div.pika-label>select>option*12)+(div.pika-label>select>option*12)+button+button')
    })

    it('renders 12 years when minYear is set', () => {
        let html,
            opts = Object.assign({}, Pikaday2.defaults),
            nthCalendar = 0,
            year = 2015,
            month = 9;

        opts.minYear = 2014;
        html = renderTitle(opts, nthCalendar, year, month);

        eminent.domIsLike(html, 'div.pika-title>(div.pika-label>select>option*12)+(div.pika-label>select>option*12)+button+button')
    })

    it('disables next button when month is last month', () => {
        let html,
            opts = Object.assign({}, Pikaday2.defaults),
            nthCalendar = 0,
            year = 2015,
            month = 9;

        opts.maxYear = 2015;
        opts.maxMonth = 9;
        html = renderTitle(opts, nthCalendar, year, month);

        eminent.domAttrsIs(html, 'div.pika-title>(div.pika-label>select>option*12)+(div.pika-label>select>option*11)+button+button.pika-next.is-disabled')
    })

    it('disables prev button when month is first month', () => {
        let html,
            opts = Object.assign({}, Pikaday2.defaults),
            nthCalendar = 0,
            year = 2015,
            month = 9;

        opts.minYear = 2015;
        opts.minMonth = 9;
        html = renderTitle(opts, nthCalendar, year, month);

        eminent.domAttrsIs(html, 'div.pika-title>(div.pika-label>select>option*12)+(div.pika-label>select>option*11)+button.pika-prev.is-disabled+button')
    })

    it('marks the current year and month as selected', () => {
        let html,
            opts = Object.assign({}, Pikaday2.defaults),
            nthCalendar = 0,
            year = 2015,
            month = 9;

        html = renderTitle(opts, nthCalendar, year, month);

        eminent.domAttrsIs(html, 'div.pika-title>(div.pika-label>select>option*9+option[selected]+option*2)+(div.pika-label>select>option*10+option[selected]+option*10)+button+button')
    })
});
