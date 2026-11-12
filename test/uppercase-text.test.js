'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { uppercase_text } = require('../src/uppercase-text.js');
const concatModule = require('../src/concat-text.js');

test('uppercases a lowercase string', () => {
  assert.strictEqual(uppercase_text('abc'), 'ABC');
});

test('uppercases letters and leaves digits and punctuation unchanged', () => {
  assert.strictEqual(uppercase_text('aBc1!'), 'ABC1!');
});

test('returns empty string for empty input', () => {
  assert.strictEqual(uppercase_text(''), '');
});

test('throws TypeError for a non-string number', () => {
  assert.throws(() => uppercase_text(7), { name: 'TypeError', message: /must be of type string/ });
});

test('throws TypeError for a String object', () => {
  assert.throws(() => uppercase_text(new String('a')), { name: 'TypeError', message: /must be of type string/ });
});

test('calls concat_text with empty prefix and s, and uppercases its return value', () => {
  const original = concatModule.concat_text;
  const calls = [];
  const replacement = 'xyz-replaced';
  concatModule.concat_text = (x, y) => {
    calls.push([x, y]);
    return replacement;
  };
  try {
    assert.strictEqual(uppercase_text('ignored'), 'XYZ-REPLACED');
    assert.deepStrictEqual(calls, [['', 'ignored']]);
  } finally {
    concatModule.concat_text = original;
  }
});
