'use strict';

/**
 * Return the negation -x of x.
 * Type check runs before computing: if x is not of type number,
 * throw TypeError.
 */
function negate(x) {
  if (typeof x !== 'number') {
    throw new TypeError('negate: argument must be of type number');
  }
  return -x;
}

module.exports = { negate };
