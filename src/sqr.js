'use strict';

/**
 * Return the Euclidean length of the 2D vector (x, y): Math.sqrt(x*x + y*y).
 * Type check runs before computing: if either argument is not of type number,
 * throw TypeError.
 */
function sqr(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('sqr: both arguments must be of type number');
  }
  return Math.sqrt(x * x + y * y);
}

module.exports = { sqr };
