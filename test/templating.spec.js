
import assert from 'assert';
import jsdom from 'jsdom';

import { renderDay, renderWeek, renderTitle, renderTable } from '../src/lib/templating';


describe('renderDay', () => {
    let opts = {day: 31, month: 9, year: 2015}

    let html = renderDay(opts);

    jsdom.env(html, (err, window) => {
        assert(!err);
    });
});
