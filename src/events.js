
import { extend } from './utils'

export const hasEventListeners = !!window.addEventListener;


export var addEvent = (el, e, callback, capture) => {
    if (hasEventListeners) {
        el.addEventListener(e, callback, !!capture);
    } else {
        el.attachEvent('on' + e, callback);
    }
}

export var removeEvent = (el, e, callback, capture) => {
    if (hasEventListeners) {
        el.removeEventListener(e, callback, !!capture);
    } else {
        el.detachEvent('on' + e, callback);
    }
}

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
