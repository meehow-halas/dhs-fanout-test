'use strict';

const concatText = require('./concat-text.js');

/**
 * Return s in upper case. Built on concat_text('', s), which validates s
 * (non-string input throws TypeError). concat_text is read from the module
 * object at call time so it can be observed or replaced.
 */
function uppercase_text(s) {
  return concatText.concat_text('', s).toUpperCase();
}

module.exports = { uppercase_text };
