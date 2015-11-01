
import { extend } from './utils'

export const hasEventListeners = !!window.addEventListener;

/**
 * @param  {DOM element} el - DOM element to add event to
 * @param  {string} e - Event to add
 * @param  {function} callback - Callback
 * @param  {boolean} capture - Whether to capture the event
 */
export var addEvent = (el, e, callback, capture) => {
    if (hasEventListeners) {
        el.addEventListener(e, callback, !!capture);
    } else {
        el.attachEvent('on' + e, callback);
    }
}

/**
 * @param  {DOM element} el - DOM element to add event to
 * @param  {string} e - Event to add
 * @param  {function} callback - Callback
 * @param  {boolean} capture - Whether to capture the event
 */
export var removeEvent = (el, e, callback, capture) => {
    if (hasEventListeners) {
        el.removeEventListener(e, callback, !!capture);
    } else {
        el.detachEvent('on' + e, callback);
    }
}

/**
 * @param  {DOM element} el - DOM element to fire event on
 * @param  {string} eventName - Event to fire
 * @param  {hash} data - Data to fire event with
 */
export var fireEvent = (el, eventName, data) => {
    let ev;

    if (window.document.createEvent) {
        ev = window.document.createEvent('HTMLEvents');
        ev.initEvent(eventName, true, false);
        ev = extend(ev, data);
        el.dispatchEvent(ev);
    } else if (window.document.createEventObject) {
        ev = window.document.createEventObject();
        ev = extend(ev, data);
        el.fireEvent('on' + eventName, ev);
    }
}
