'use strict';

/**
 * Limit x to the inclusive range [min, max].
 * Type check runs first: any non-number argument throws TypeError,
 * then min > max throws RangeError. min === max is allowed.
 */
function clamp(x, min, max) {
  if (typeof x !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('clamp: all arguments must be of type number');
  }
  if (min > max) {
    throw new RangeError('clamp: min must not be greater than max');
  }
  if (x < min) {
    return min;
  }
  if (x > max) {
    return max;
  }
  return x;
}

module.exports = { clamp };
