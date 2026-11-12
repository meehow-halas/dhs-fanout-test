'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { sqr } = require('../src/sqr.js');

test('sqr(3, 4) returns 5', () => {
  assert.strictEqual(sqr(3, 4), 5);
});

test('sqr(0, 0) returns 0', () => {
  assert.strictEqual(sqr(0, 0), 0);
});

test('sqr(-3, -4) returns 5', () => {
  assert.strictEqual(sqr(-3, -4), 5);
});

test('sqr returns Euclidean length for non-trivial inputs', () => {
  assert.strictEqual(sqr(5, 12), 13);
  assert.strictEqual(sqr(6, 8), 10);
  assert.strictEqual(sqr(0, 7), 7);
  assert.strictEqual(sqr(-7, 0), 7);
  assert.strictEqual(sqr(1.5, 2), 2.5);
});

test('sqr throws TypeError when y is not a number', () => {
  assert.throws(() => sqr(3, '4'), TypeError);
  assert.throws(() => sqr(3, null), TypeError);
  assert.throws(() => sqr(3, undefined), TypeError);
});

test('sqr throws TypeError when x is not a number', () => {
  assert.throws(() => sqr('3', 4), TypeError);
  assert.throws(() => sqr(null, 4), TypeError);
  assert.throws(() => sqr(undefined, 4), TypeError);
});
