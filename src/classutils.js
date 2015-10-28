
var trim = str => {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
}

export var hasClass = (el, cn) => {
    return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
}

export var addClass = (el, cn) => {
    if (!hasClass(el, cn)) {
        el.className = (el.className === '') ? cn : el.className + ' ' + cn;
    }
}

export var removeClass = (el, cn) => {
    el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
}
