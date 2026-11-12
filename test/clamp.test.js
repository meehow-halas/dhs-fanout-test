'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { clamp } = require('../src/clamp.js');

test('returns 3 for clamp(5, 0, 3)', () => {
  assert.strictEqual(clamp(5, 0, 3), 3);
});

test('returns 0 for clamp(-1, 0, 3)', () => {
  assert.strictEqual(clamp(-1, 0, 3), 0);
});

test('throws RangeError for clamp(1, 4, 2)', () => {
  assert.throws(() => clamp(1, 4, 2), RangeError);
});

test('returns 2 for clamp(2, 0, 3)', () => {
  assert.strictEqual(clamp(2, 0, 3), 2);
});

test('returns 3 for clamp(3, 0, 3)', () => {
  assert.strictEqual(clamp(3, 0, 3), 3);
});

test('returns 4 for clamp(9, 4, 4)', () => {
  assert.strictEqual(clamp(9, 4, 4), 4);
});

test('throws TypeError for clamp(\'5\', 0, 3)', () => {
  assert.throws(() => clamp('5', 0, 3), TypeError);
});

test('throws TypeError for clamp(1, 0, \'3\')', () => {
  assert.throws(() => clamp(1, 0, '3'), TypeError);
});

test('type check runs before range check', () => {
  assert.throws(() => clamp('1', 4, 2), TypeError);
});
