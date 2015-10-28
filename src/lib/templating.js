
import { isArray } from './utils'


var renderDayName = (opts, day, abbr) => {
    day += opts.firstDay;

    while (day >= 7) {
        day -= 7;
    }

    return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
}

export var renderDay = (opts) => {
    if (opts.isEmpty) {
        return '<td class="is-empty"></td>';
    }

    let arr = [];

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

    return `
        <td data-day="${ opts.day }" class="${ arr.join(' ') }">
            <button class="pika-button pika-day"
                    type="button"
                    data-pika-year="${ opts.year }"
                    data-pika-month="${ opts.month }"
                    data-pika-day="${ opts.day }">
                ${ opts.day }
            </button>
        </td>
    `
}

export var renderWeek = (d, m, y) => {
    // Lifted from http://javascript.about.com/library/blweekyear.htm, lightly modified.
    let onejan = new Date(y, 0, 1),
        weekNum = Math.ceil((((new Date(y, m, d) - onejan) / 86400000) + onejan.getDay()+1)/7);

    return `
        <td class="pika-week">
            ${ weekNum }
        </td>
    `
}

export var renderRow = (days, isRTL) => `
    <tr>
        ${ (isRTL ? days.reverse() : days).join('') }
    </tr>
`

var renderBody = rows => `
    <tbody>
        ${ rows.join('') }
    </tbody>
`

var renderHead = (opts) => {
    let i, arr = [];

    if (opts.showWeekNumber) {
        arr.push('<th></th>');
    }

    for (i = 0; i < 7; i++) {
        arr.push(`
            <th scope="col">
                <abbr title="${ renderDayName(opts, i) }">
                    ${ renderDayName(opts, i, true) }
                </abbr>
            </th>
        `);
    }

    return `
        <thead>
            ${ (opts.isRTL ? arr.reverse() : arr).join('') }
        </thead>
    `
}

export var renderTitle = (instance, c, year, month, refYear) => {
    let i, j, arr,
        opts = instance.options,
        isMinYear = year === opts.minYear,
        isMaxYear = year === opts.maxYear,
        html = '<div class="pika-title">',
        monthHtml,
        yearHtml,
        prev = true,
        next = true;

    for (arr = [], i = 0; i < 12; i++) {
        arr.push(`
            <option value="${ (year === refYear ? i - c : 12 + i - c) }"
                    ${ (i === month ? ' selected': '') }
                    ${ ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled' : '') }>
                ${ opts.i18n.months[i] }
            </option>
        `);
    }

    monthHtml = `
        <div class="pika-label">${ opts.i18n.months[month] }
            <select class="pika-select pika-select-month" tabindex="-1">
                ${ arr.join('') }
            </select>
        </div>
    `

    if (isArray(opts.yearRange)) {
        i = opts.yearRange[0];
        j = opts.yearRange[1] + 1;
    } else {
        i = year - opts.yearRange;
        j = 1 + year + opts.yearRange;
    }

    for (arr = []; i < j && i <= opts.maxYear; i++) {
        if (i >= opts.minYear) {
            arr.push(`
                <option value="${ i }"
                        ${ (i === year ? ' selected': '') }>
                    ${ i }
                </option>
            `);
        }
    }

    yearHtml = `
        <div class="pika-label">${ year + opts.yearSuffix }
            <select class="pika-select pika-select-year" tabindex="-1">
                ${ arr.join('') }
            </select>
        </div>
    `

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
        html += `
            <button class="pika-prev ${ (prev ? '' : ' is-disabled') }" type="button">
                ${ opts.i18n.previousMonth }
            </button>
        `
    }

    if (c === (instance.options.numberOfMonths - 1) ) {
        html += `
            <button class="pika-next ${ (next ? '' : ' is-disabled') }" type="button">
                ${ opts.i18n.nextMonth }
            </button>
        `
    }

    return html += '</div>';
}

export var renderTable = (opts, data) => `
    <table cellpadding="0" cellspacing="0" class="pika-table">
        ${ renderHead(opts) }
        ${ renderBody(data) }
    </table>
`
