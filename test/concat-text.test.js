'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { concat_text } = require('../src/concat-text.js');

test('concatenates two strings', () => {
  assert.strictEqual(concat_text('ab', 'cd'), 'abcd');
});

test('returns empty string when both inputs are empty', () => {
  assert.strictEqual(concat_text('', ''), '');
});

test('keeps order: first argument comes first', () => {
  assert.strictEqual(concat_text('xyz', '01'), 'xyz01');
});

test('throws TypeError when second argument is not a string', () => {
  assert.throws(() => concat_text('a', 1), TypeError);
});

test('throws TypeError when first argument is not a string', () => {
  assert.throws(() => concat_text(1, 'a'), TypeError);
});

test('throws TypeError for String objects (typeof is not string)', () => {
  assert.throws(() => concat_text(new String('a'), 'b'), TypeError);
  assert.throws(() => concat_text('a', new String('b')), TypeError);
});

test('throws TypeError for null and undefined', () => {
  assert.throws(() => concat_text(null, 'a'), TypeError);
  assert.throws(() => concat_text('a', undefined), TypeError);
});
