
import assert from 'assert';
import * as eminent from 'eminent';

import { renderDay, renderWeek, renderTitle, renderTable } from '../src/lib/templating';


describe('renderDay', () => {
    it('renders a day in a cell with a button', () => {
        let opts = {day: 31, month: 9, year: 2015}

        let html = '<table>' + renderDay(opts) + '</table>';

        eminent.domAttrsIsLike(html, 'table>tbody>tr>td[data-day=31 class=""]>button.pika-button.pika-day[type=button data-pika-year=2015 data-pika-month=9 data-pika-day=31]')
    });
});
