'use strict';

/**
 * Return `x - y` for two numbers.
 * @throws {TypeError} when either argument is not of type 'number'.
 */
function subtract(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('subtract: both arguments must be numbers');
  }
  return x - y;
}

module.exports = { subtract };
