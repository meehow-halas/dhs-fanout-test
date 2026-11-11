'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { add } = require('../src/add');

test('add(2, 3) returns 5', () => {
  // arrange
  const x = 2;
  const y = 3;
  // act
  const result = add(x, y);
  // assert
  assert.equal(result, 5);
});

test('add(-1, 1) returns 0', () => {
  assert.equal(add(-1, 1), 0);
});

test('sum is computed, not hardcoded (varied inputs)', () => {
  assert.equal(add(17.5, 0.25), 17.75);
  assert.equal(add(-40, -2), -42);
});

test('NaN and Infinity pass through normal addition', () => {
  assert.ok(Number.isNaN(add(NaN, 1)));
  assert.equal(add(Infinity, 1), Infinity);
});

test("add('2', 3) throws TypeError", () => {
  assert.throws(() => add('2', 3), TypeError);
});

test("add(2, '3') throws TypeError", () => {
  assert.throws(() => add(2, '3'), TypeError);
});

test('add(1, null) throws TypeError', () => {
  assert.throws(() => add(1, null), TypeError);
});

test('add(1) throws TypeError (missing second argument)', () => {
  assert.throws(() => add(1), TypeError);
});

test('other non-number types throw TypeError (undefined, boolean, object, array)', () => {
  for (const bad of [undefined, true, {}, [1]]) {
    assert.throws(() => add(bad, 1), TypeError);
    assert.throws(() => add(1, bad), TypeError);
  }
});
