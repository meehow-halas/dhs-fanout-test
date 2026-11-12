'use strict';

/**
 * Return the product x * y.
 * Type check runs before computing: if either argument is not of type number,
 * throw TypeError.
 */
function multiply(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('multiply: both arguments must be of type number');
  }
  return x * y;
}

module.exports = { multiply };
