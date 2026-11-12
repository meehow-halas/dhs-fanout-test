'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { negate } = require('../src/negate.js');

test('negate(3) returns -3', () => {
  assert.strictEqual(negate(3), -3);
});

test('negate(-4) returns 4', () => {
  assert.strictEqual(negate(-4), 4);
});

test('negate(0) returns a value equal to 0', () => {
  assert.equal(negate(0), 0);
});

test('negate throws TypeError when x is a string', () => {
  assert.throws(() => negate('3'), TypeError);
});

test('negate throws TypeError when x is undefined', () => {
  assert.throws(() => negate(undefined), TypeError);
});

test('negate throws TypeError when x is null', () => {
  assert.throws(() => negate(null), TypeError);
});

test('negate returns the negation of a fractional number', () => {
  assert.strictEqual(negate(1.5), -1.5);
});
