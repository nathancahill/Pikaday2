
import assert from 'assert';
import jsdom from 'jsdom';

import { addEvent, removeEvent, fireEvent } from '../src/lib/events';


describe('addEvent', () => {
    it('attaches a event', (done) => {
        let callback = e => {
            done()
        }

        jsdom.env('<div id="test"></div>', (err, window) => {
            let el = window.document.getElementById('test');

            addEvent(el, 'click', callback)

            el.click()
        })
    })
})

describe('removeEvent', () => {
    it('removes a event', () => {
        let sentinel = true,
            callback = e => {
                sentinel = false
        };

        jsdom.env('<div id="test"></div>', (err, window) => {
            let el = window.document.getElementById('test');

            addEvent(el, 'click', callback)
            removeEvent(el, 'click', callback)

            el.click()

            assert(sentinel);
        })
    })
})

describe('fireEvent', () => {
    it('fires a event with data', (done) => {
        let callback = e => {
            if (e.data === 1) {
                done()
            }
        }

        jsdom.env('<div id="test"></div>', (err, window) => {
            let el = window.document.getElementById('test');

            addEvent(el, 'click', callback)

            fireEvent(el, 'click', {data: 1})
        })
    });
})
