'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { max_of } = require('../src/max-of.js');

test('returns the largest element', () => {
  assert.strictEqual(max_of([1, 9, 3]), 9);
});

test('returns the largest of all-negative numbers', () => {
  assert.strictEqual(max_of([-5, -2, -9]), -2);
});

test('returns the only element of a single-element array', () => {
  assert.strictEqual(max_of([7]), 7);
});

test('throws RangeError for an empty array', () => {
  assert.throws(() => max_of([]), RangeError);
});

test('throws TypeError when an element is not a number', () => {
  assert.throws(() => max_of([1, 'x']), TypeError);
});

test('throws TypeError when the argument is not an array', () => {
  assert.throws(() => max_of(5), TypeError);
  assert.throws(() => max_of('abc'), TypeError);
  assert.throws(() => max_of({ 0: 1, length: 1 }), TypeError);
});

test('returns NaN when the array contains NaN', () => {
  assert.ok(Number.isNaN(max_of([1, NaN])));
});

test('does not mutate the input array', () => {
  const input = [4, -1, 8, 2];
  const snapshot = input.slice();
  max_of(input);
  assert.deepStrictEqual(input, snapshot);
});

test('checks argument type before emptiness', () => {
  assert.throws(() => max_of({ length: 0 }), TypeError);
});

test('throws TypeError when the first element is not a number', () => {
  assert.throws(() => max_of(['x', 1]), TypeError);
});
