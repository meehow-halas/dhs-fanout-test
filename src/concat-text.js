'use strict';

/**
 * Return x + y for two strings.
 * Either argument whose typeof is not 'string' throws TypeError.
 */
function concat_text(x, y) {
  if (typeof x !== 'string' || typeof y !== 'string') {
    throw new TypeError('concat_text: both arguments must be of type string');
  }
  return x + y;
}

module.exports = { concat_text };
