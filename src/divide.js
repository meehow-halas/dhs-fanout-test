'use strict';

/**
 * Return x / y for two numbers.
 * Type check runs before the zero check: non-number arguments throw TypeError,
 * then y === 0 or -0 throws RangeError.
 */
function divide(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('divide: both arguments must be of type number');
  }
  if (y === 0) {
    throw new RangeError('divide: divisor must not be zero');
  }
  return x / y;
}

module.exports = { divide };
