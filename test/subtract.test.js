'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { subtract } = require('../src/subtract');

const NOT_NUMBER = /subtract: both arguments must be numbers/;

test('returns the difference x - y (operand order matters)', () => {
  assert.strictEqual(subtract(5, 3), 2);
  assert.strictEqual(subtract(3, 5), -2);
  assert.strictEqual(subtract(10, 4), 6);
});

test('returns a negative result when y > x', () => {
  assert.strictEqual(subtract(0, 4), -4);
  assert.strictEqual(subtract(-7, -2), -5);
});

test('throws TypeError when y is null', () => {
  assert.throws(() => subtract(1, null), { name: 'TypeError', message: NOT_NUMBER });
});

test('throws TypeError when x is a string', () => {
  assert.throws(() => subtract('5', 3), { name: 'TypeError', message: NOT_NUMBER });
});

test('throws TypeError when y is a string', () => {
  assert.throws(() => subtract(5, '3'), { name: 'TypeError', message: NOT_NUMBER });
});

test('throws TypeError when y is missing', () => {
  assert.throws(() => subtract(5), { name: 'TypeError', message: NOT_NUMBER });
});

test('throws TypeError when x is missing', () => {
  assert.throws(() => subtract(undefined, 3), { name: 'TypeError', message: NOT_NUMBER });
  assert.throws(() => subtract(), { name: 'TypeError', message: NOT_NUMBER });
});

test('accepts NaN and Infinity as numbers', () => {
  assert.ok(Number.isNaN(subtract(NaN, 1)));
  assert.strictEqual(subtract(Infinity, 1), Infinity);
});
