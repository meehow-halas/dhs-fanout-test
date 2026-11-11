'use strict';

/**
 * Return the sum of two numbers.
 * Throws TypeError when either argument is not of type 'number'.
 */
function add(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('add(x, y): both arguments must be numbers');
  }
  return x + y;
}

module.exports = { add };
