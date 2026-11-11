'use strict';

/**
 * Return the product x * y.
 * Throws TypeError unless both arguments have typeof 'number'.
 */
function multiply(x, y) {
  if (typeof x !== 'number') {
    throw new TypeError('multiply: first argument must be a number');
  }
  if (typeof y !== 'number') {
    throw new TypeError('multiply: second argument must be a number');
  }
  return x * y;
}

module.exports = { multiply };
