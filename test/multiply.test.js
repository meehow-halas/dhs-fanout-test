'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { multiply } = require('../src/multiply');

test('returns the product of two positive numbers', () => {
  assert.strictEqual(multiply(3, 4), 12);
});

test('returns a negative product for mixed signs', () => {
  assert.strictEqual(multiply(-2, 5), -10);
});

test('non-trivial operands produce the exact product, not a constant', () => {
  assert.strictEqual(multiply(7, 13), 91);
  assert.strictEqual(multiply(-6, -9), 54);
});

test('throws TypeError when the second argument is undefined', () => {
  assert.throws(() => multiply(2, undefined), /second argument/);
});

test('throws TypeError when the second argument is missing', () => {
  assert.throws(() => multiply(2), /second argument/);
});

test('throws TypeError when the first argument is a numeric string', () => {
  assert.throws(() => multiply('3', 4), /first argument/);
});

test('throws TypeError when the first argument is null', () => {
  assert.throws(() => multiply(null, 2), /first argument/);
});

test('throws TypeError when the second argument is a numeric string', () => {
  assert.throws(() => multiply(3, '4'), /second argument/);
});
