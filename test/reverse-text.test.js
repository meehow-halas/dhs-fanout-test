'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { reverse_text } = require('../src/reverse-text.js');
const concatModule = require('../src/concat-text.js');

test('reverses an ASCII string', () => {
  assert.strictEqual(reverse_text('abc'), 'cba');
});

test('returns empty string for empty input', () => {
  assert.strictEqual(reverse_text(''), '');
});

test('throws TypeError for a non-string number', () => {
  assert.throws(() => reverse_text(42), { name: 'TypeError', message: /must be of type string/ });
});

test('keeps a surrogate pair (emoji) intact when reversing', () => {
  assert.strictEqual(reverse_text('a😀b'), 'b😀a');
});

test('throws TypeError for a String object', () => {
  assert.throws(() => reverse_text(new String('ab')), { name: 'TypeError', message: /must be of type string/ });
});

test('calls concat_text with empty prefix and s, and reverses its return value', () => {
  const original = concatModule.concat_text;
  const calls = [];
  concatModule.concat_text = (x, y) => {
    calls.push([x, y]);
    return 'xyz';
  };
  try {
    assert.strictEqual(reverse_text('ignored'), 'zyx');
    assert.deepStrictEqual(calls, [['', 'ignored']]);
  } finally {
    concatModule.concat_text = original;
  }
});
