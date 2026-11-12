'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { multiply } = require('../src/multiply.js');

test('multiply(3, 4) returns 12', () => {
  assert.strictEqual(multiply(3, 4), 12);
});

test('multiply(-2, 5) returns -10', () => {
  assert.strictEqual(multiply(-2, 5), -10);
});

test('multiply returns 0 when an operand is 0', () => {
  assert.strictEqual(multiply(0, 7), 0);
});

test('multiply returns a positive product for two negatives', () => {
  assert.strictEqual(multiply(-3, -4), 12);
});

test('multiply returns a non-integer product for fractional operands', () => {
  assert.strictEqual(multiply(1.5, 2), 3);
});

test('multiply throws TypeError when y is not a number', () => {
  assert.throws(() => multiply(2, undefined), TypeError);
  assert.throws(() => multiply(2, '5'), TypeError);
  assert.throws(() => multiply(2, null), TypeError);
});

test('multiply throws TypeError when x is not a number', () => {
  assert.throws(() => multiply(undefined, 2), TypeError);
  assert.throws(() => multiply('5', 2), TypeError);
  assert.throws(() => multiply(null, 2), TypeError);
});
