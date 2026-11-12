'use strict';

/**
 * Return the largest element of a non-empty array of numbers.
 * Check order: not an array -> TypeError, empty -> RangeError,
 * any element whose typeof is not 'number' -> TypeError.
 * An array containing NaN returns NaN (same as Math.max).
 * The input array is not mutated. No spread into Math.max (call-stack limit).
 */
function max_of(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('max_of: argument must be an array');
  }
  if (values.length === 0) {
    throw new RangeError('max_of: array must not be empty');
  }
  for (let i = 0; i < values.length; i++) {
    if (typeof values[i] !== 'number') {
      throw new TypeError('max_of: every element must be of type number');
    }
  }
  let result = values[0];
  for (let i = 1; i < values.length; i++) {
    result = Math.max(result, values[i]);
  }
  return result;
}

module.exports = { max_of };
