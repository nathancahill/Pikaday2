
export var isArray = (obj) => {
    return (/Array/).test(Object.prototype.toString.call(obj));
}

export var isDate = (obj) => {
    return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
}

export var extend = (to, from, overwrite) => {
    let prop, hasProp;

    for (prop in from) {
        hasProp = to[prop] !== undefined;
        if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
            if (isDate(from[prop])) {
                if (overwrite) {
                    to[prop] = new Date(from[prop].getTime());
                }
            }
            else if (isArray(from[prop])) {
                if (overwrite) {
                    to[prop] = from[prop].slice(0);
                }
            } else {
                to[prop] = extend({}, from[prop], overwrite);
            }
        } else if (overwrite || !hasProp) {
            to[prop] = from[prop];
        }
    }
    return to;
}
