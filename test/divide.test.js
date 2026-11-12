'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { divide } = require('../src/divide.js');

test('returns x / y for numbers', () => {
  assert.strictEqual(divide(10, 2), 5);
  assert.strictEqual(divide(7, 2), 3.5);
});

test('throws RangeError for zero divisor', () => {
  assert.throws(() => divide(1, 0), RangeError);
});

test('throws RangeError for negative zero divisor', () => {
  assert.throws(() => divide(1, -0), RangeError);
});

test('throws TypeError when first argument is not a number', () => {
  assert.throws(() => divide('1', 2), TypeError);
});

test('throws TypeError when second argument is not a number', () => {
  assert.throws(() => divide(1, '2'), TypeError);
});

test('type check runs before zero check', () => {
  assert.throws(() => divide('1', 0), TypeError);
});
