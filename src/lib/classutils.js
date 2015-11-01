
/**
 * Trim whitespace from start or end of string
 * @param   {string} str - The string to trim
 * @returns {string}
 */
var trim = str => {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
}

/**
 * Check if a class is present in an element
 * @param   {DOM element} el - The DOM element to check
 * @param   {string} cn - The class to check for
 * @returns {boolean}
 */
export var hasClass = (el, cn) => {
    return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
}

/**
 * Add a class to an element if it does not already exist
 * @param  {DOM element} el - The DOM element to add the class to
 * @param  {string} cn - The class to add
 */
export var addClass = (el, cn) => {
    if (!hasClass(el, cn)) {
        el.className = (el.className === '') ? cn : el.className + ' ' + cn;
    }
}

/**
 * Remove a class from an element
 * @param  {DOM element} el - The DOM element to remove the class from
 * @param  {string} cn - The class to remove
 */
export var removeClass = (el, cn) => {
    el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
}
