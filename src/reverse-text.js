'use strict';

const concatText = require('./concat-text.js');

/**
 * Return s with its characters in reverse order, by Unicode code point.
 * Built on concat_text('', s), which validates s (non-string input throws
 * TypeError). concat_text is read from the module object at call time so it
 * can be observed or replaced.
 */
function reverse_text(s) {
  return Array.from(concatText.concat_text('', s)).reverse().join('');
}

module.exports = { reverse_text };
