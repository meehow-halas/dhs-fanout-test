'use strict';

/**
 * Return x - y for two numbers.
 * Throws TypeError when either argument is not a number.
 */
function subtract(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('subtract: both arguments must be of type number');
  }
  return x - y;
}

module.exports = { subtract };
