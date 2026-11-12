'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { subtract } = require('../src/subtract.js');

test('returns x - y for numbers', () => {
  assert.strictEqual(subtract(5, 3), 2);
  assert.strictEqual(subtract(0, 4), -4);
});

test('throws TypeError when second argument is not a number', () => {
  assert.throws(() => subtract(1, null), TypeError);
});

test('throws TypeError when first argument is not a number', () => {
  assert.throws(() => subtract('5', 3), TypeError);
});
